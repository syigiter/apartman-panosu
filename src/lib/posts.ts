import { posts as mockPosts, type BoardPost, type PostType } from "@/lib/mock-data";
import { createSupabaseServerClient } from "@/lib/supabase";

export type BoardReply = { id: string; body: string; alias: string; createdAt: string };
type PostRow = { id: string; type: PostType; category: string; title: string; body: string; created_at: string };
type ReplyRow = { id: string; post_id: string; body: string; created_at: string };

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value));
}

function toBoardPost(row: PostRow, replyCount = 0): BoardPost {
  return { id: row.id, type: row.type, category: row.category, title: row.title, body: row.body, alias: "Anonim ziyaretçi", replyCount, createdAt: formatDate(row.created_at) };
}

export async function getPosts() {
  const supabase = createSupabaseServerClient();
  if (!supabase) return mockPosts;

  const { data: postRows, error: postsError } = await supabase.from("posts").select("id,type,category,title,body,created_at").eq("status", "published").order("created_at", { ascending: false });
  if (postsError || !postRows) {
    console.error("posts fetch failed", postsError);
    return mockPosts;
  }

  const { data: replyRows } = await supabase.from("replies").select("post_id").eq("visibility", "public");
  const replyCounts = new Map<string, number>();
  for (const reply of replyRows ?? []) replyCounts.set(reply.post_id, (replyCounts.get(reply.post_id) ?? 0) + 1);

  return postRows.map((row) => toBoardPost(row, replyCounts.get(row.id) ?? 0));
}

export async function getPost(id: string) {
  const supabase = createSupabaseServerClient();
  if (!supabase) return mockPosts.find((post) => post.id === id) ?? mockPosts[0];

  const { data, error } = await supabase.from("posts").select("id,type,category,title,body,created_at").eq("id", id).eq("status", "published").single();
  if (error || !data) {
    console.error("post fetch failed", error);
    return null;
  }

  const replies = await getReplies(id);
  return toBoardPost(data, replies.length);
}

export async function getReplies(postId: string): Promise<BoardReply[]> {
  const supabase = createSupabaseServerClient();
  if (!supabase) return [];

  const { data, error } = await supabase.from("replies").select("id,post_id,body,created_at").eq("post_id", postId).eq("visibility", "public").order("created_at", { ascending: true });
  if (error || !data) {
    console.error("replies fetch failed", error);
    return [];
  }

  return (data as ReplyRow[]).map((reply, index) => ({ id: reply.id, body: reply.body, alias: "Anonim cevap #" + (index + 1), createdAt: formatDate(reply.created_at) }));
}
