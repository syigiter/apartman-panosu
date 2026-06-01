create extension if not exists pgcrypto;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_alias text not null default 'Anonim kullanıcı',
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references auth.users(id) on delete set null,
  type text not null check (type in ('ilan', 'duvar-yazisi')),
  category text not null,
  title text not null,
  body text not null,
  status text not null default 'published' check (status in ('draft', 'published', 'hidden', 'removed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.replies (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_id uuid references auth.users(id) on delete set null,
  body text not null,
  visibility text not null default 'public' check (visibility in ('public', 'private')),
  created_at timestamptz not null default now()
);

create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  owner_id uuid references auth.users(id) on delete set null,
  responder_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (post_id, owner_id, responder_id)
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid references auth.users(id) on delete set null,
  body text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.replies enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

create policy "Published posts are readable" on public.posts for select using (status = 'published');
create policy "Visitors can create anonymous posts" on public.posts for insert with check (author_id is null and status = 'published');
create policy "Authenticated users can create posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "Authors can update own posts" on public.posts for update using (auth.uid() = author_id);
create policy "Public replies are readable" on public.replies for select using (visibility = 'public');
create policy "Visitors can create anonymous public replies" on public.replies for insert with check (author_id is null and visibility = 'public');
create policy "Authenticated users can create replies" on public.replies for insert with check (auth.uid() = author_id);
create policy "Conversation participants can read" on public.conversations for select using (auth.uid() = owner_id or auth.uid() = responder_id);
create policy "Conversation participants can insert" on public.conversations for insert with check (auth.uid() = owner_id or auth.uid() = responder_id);
create policy "Message participants can read" on public.messages for select using (exists (select 1 from public.conversations c where c.id = conversation_id and (c.owner_id = auth.uid() or c.responder_id = auth.uid())));
create policy "Message participants can insert" on public.messages for insert with check (auth.uid() = sender_id and exists (select 1 from public.conversations c where c.id = conversation_id and (c.owner_id = auth.uid() or c.responder_id = auth.uid())));
