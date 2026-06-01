"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, MessageSquarePlus, MoveUpRight, PenLine, ShieldCheck, StickyNote, X } from "lucide-react";
import type { BoardPost } from "@/lib/mock-data";

type BoardNoteVars = CSSProperties & {
  "--x": string;
  "--y": string;
  "--w": string;
  "--mx": string;
  "--my": string;
  "--mw": string;
  "--r": string;
};

const categoryColors = [
  "bg-amber-100 text-amber-950 border-amber-200",
  "bg-sky-100 text-sky-950 border-sky-200",
  "bg-emerald-100 text-emerald-950 border-emerald-200",
  "bg-rose-100 text-rose-950 border-rose-200",
  "bg-violet-100 text-violet-950 border-violet-200",
  "bg-orange-100 text-orange-950 border-orange-200",
];

const layouts = [
  { x: 3, y: 14, w: 34, mx: 5, my: 13, mw: 82, r: -5, z: 12 },
  { x: 28, y: 23, w: 46, mx: 13, my: 37, mw: 80, r: 3, z: 16 },
  { x: 58, y: 9, w: 34, mx: 4, my: 63, mw: 76, r: -2, z: 10 },
  { x: 11, y: 55, w: 38, mx: 20, my: 88, mw: 74, r: 5, z: 14 },
  { x: 47, y: 51, w: 42, mx: 8, my: 113, mw: 78, r: -4, z: 9 },
  { x: 69, y: 43, w: 28, mx: 24, my: 139, mw: 70, r: 7, z: 11 },
  { x: 22, y: 6, w: 30, mx: 10, my: 164, mw: 72, r: 6, z: 8 },
  { x: 39, y: 69, w: 36, mx: 18, my: 189, mw: 76, r: -6, z: 7 },
];

const paperStyles = [
  { shell: "paper-yellow dot-paper border-amber-200 tape-wide pin-orange", shape: "torn-paper folded-corner", label: "Duyuru" },
  { shell: "paper-blue grid-paper border-sky-200 tape-left pin-blue", shape: "torn-paper folded-corner", label: "Kayıp notu" },
  { shell: "paper-green lined-paper border-emerald-200 tape-right pin-green", shape: "receipt-paper", label: "Yardım çağrısı" },
  { shell: "paper-pink crumpled border-rose-200 tape-wide pin-purple", shape: "bookmark-paper", label: "Satılık etiketi" },
  { shell: "paper-purple dot-paper border-violet-200 tape-left pin-purple", shape: "torn-paper folded-corner", label: "Komşu karalaması" },
  { shell: "paper-orange grid-paper border-orange-200 tape-right pin-orange", shape: "receipt-paper", label: "Öneri fişi" },
];

function hashText(value: string) {
  return [...value].reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

function noteMeta(post: BoardPost, index: number) {
  const hash = hashText(post.id + post.category + post.title);
  const layout = layouts[(hash + index) % layouts.length];
  const style = paperStyles[(hash + index * 3) % paperStyles.length];
  return { layout, style };
}

export function InteractiveBoard({ posts, categories, missingEnv }: { posts: BoardPost[]; categories: string[]; missingEnv?: boolean }) {
  const [activeId, setActiveId] = useState(posts[0]?.id ?? "");
  const [stack, setStack] = useState<Record<string, number>>({});
  const [counter, setCounter] = useState(40);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);

  function bringToFront(id: string) {
    setActiveId(id);
    setMenu(null);
    setCounter((value) => value + 1);
    setStack((value) => ({ ...value, [id]: counter + 1 }));
  }

  function openBoardMenu(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 16), rect.width - 276);
    const y = Math.min(Math.max(event.clientY - rect.top, 16), rect.height - 332);
    setMenu({ x, y });
  }

  return (
    <section id="pano" className="h-screen p-2 md:p-4">
      <div
        className="cork-board board-shadow relative h-full overflow-hidden rounded-[28px] border-[10px] border-amber-950/75 p-4"
        onPointerDown={openBoardMenu}
      >
        <div className="pointer-events-none absolute inset-5 rounded-[24px] border border-white/20 bg-white/8" />

        <div
          className="absolute right-5 top-5 z-[36] hidden rounded-2xl border-2 border-stone-950 bg-amber-300 px-4 py-3 text-sm font-black text-stone-950 shadow-lg md:block"
          onPointerDown={(event) => event.stopPropagation()}
        >
          Apartman Panosu
          <span className="block text-[11px] font-bold">Komşu notları burada</span>
        </div>

        <div
          className="absolute left-5 top-5 z-[35] max-w-[calc(100%-40px)] rounded-3xl border border-stone-200 bg-white/82 p-3 paper-shadow backdrop-blur md:max-w-[620px]"
          onPointerDown={(event) => event.stopPropagation()}
        >
          <div className="mb-2 flex items-center gap-2">
            <StickyNote className="text-amber-700" size={18} />
            <h2 className="font-black text-stone-950">Pano köşeleri</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <span key={category} className={`rounded-full border px-3 py-2 text-xs font-bold md:text-sm ${categoryColors[index % categoryColors.length]}`}>
                {category}
              </span>
            ))}
          </div>
        </div>

        <p
          className="absolute bottom-5 left-5 z-[35] rounded-full bg-amber-100/90 px-4 py-2 text-xs font-black text-amber-950 shadow-sm"
          onPointerDown={(event) => event.stopPropagation()}
        >
          Boş yere tıkla, seçenekler açılsın
        </p>

        {missingEnv && (
          <div
            className="absolute bottom-5 right-5 z-[35] hidden max-w-md rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/95 p-4 text-xs font-semibold text-amber-950 shadow-lg md:block"
            onPointerDown={(event) => event.stopPropagation()}
          >
            Supabase bağlantısı henüz yok; pano şimdilik örnek notlarla dolu.
          </div>
        )}

        {menu && (
          <div
            className="absolute z-[120] w-60 rounded-3xl border-2 border-stone-950 bg-yellow-50 p-3 paper-shadow"
            style={{ left: menu.x, top: menu.y }}
            onPointerDown={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-sm font-black text-stone-950">Panoya ne asalım?</p>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm"
                onClick={() => setMenu(null)}
                aria-label="Menüyü kapat"
              >
                <X size={16} />
              </button>
            </div>
            <div className="grid gap-2">
              <Link href="/ilan-ver?type=ilan" className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-100 px-3 py-3 text-sm font-black text-amber-950 transition hover:-translate-y-0.5">
                <MessageSquarePlus size={18} />
                Yeni ilan as
              </Link>
              <Link href="/ilan-ver?type=duvar-yazisi" className="flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-100 px-3 py-3 text-sm font-black text-sky-950 transition hover:-translate-y-0.5">
                <PenLine size={18} />
                Duvar yazısı bırak
              </Link>
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((category, index) => (
              <Link key={category} href={`/ilan-ver?category=${encodeURIComponent(category)}`} className={`rounded-full border px-2.5 py-1.5 text-xs font-bold ${categoryColors[index % categoryColors.length]}`}>
              {category}
              </Link>
          ))}
            </div>
          </div>
        )}

        {posts.map((post, index) => {
          const { layout, style } = noteMeta(post, index);
          const isActive = activeId === post.id;
          const noteVars: BoardNoteVars = {
            "--x": `${layout.x}%`,
            "--y": `${layout.y}%`,
            "--w": `${layout.w}%`,
            "--mx": `${layout.mx}%`,
            "--my": `${layout.my}%`,
            "--mw": `${layout.mw}%`,
            "--r": `${layout.r}deg`,
            zIndex: stack[post.id] ?? (isActive ? 80 : layout.z),
          };

          return (
            <article
              key={post.id}
              onPointerDown={(event) => {
                event.stopPropagation();
                bringToFront(post.id);
              }}
              className={`board-note-position paper-note ${style.shape} ${style.shell} paper-shadow border p-5 transition duration-200 ${isActive ? "scale-[1.025]" : "hover:scale-[1.015]"}`}
              style={noteVars}
            >
              <span className="paper-tape" aria-hidden="true" />
              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  bringToFront(post.id);
                }}
                className="absolute -right-2 -top-2 z-[5] flex h-9 w-9 items-center justify-center rounded-full border-2 border-stone-950 bg-amber-300 text-stone-950 shadow-lg"
                aria-label={`${post.title} notunu öne getir`}
              >
                <MoveUpRight size={16} />
              </button>

              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
                <span className="rounded-full bg-white/80 px-3 py-1 text-stone-800 shadow-sm">{style.label}</span>
                <span className="rounded-full bg-white/70 px-3 py-1 text-stone-700 shadow-sm">{post.category}</span>
                <span className="rounded-full border border-stone-900 bg-amber-200 px-3 py-1 text-stone-950">{post.type === "ilan" ? "İlan" : "Duvar Yazısı"}</span>
                <span className="text-stone-500">{post.createdAt}</span>
              </div>
              <h3 className="text-xl font-black leading-tight text-stone-950">{post.title}</h3>
              <p className="mt-3 line-clamp-4 text-sm leading-6 text-stone-700">{post.body}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-900/10 pt-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                  <ShieldCheck size={16} className="text-emerald-700" />
                  {post.alias} - gizli
                </div>
                <Link
                  href={"/ilan/" + post.id}
                  onPointerDown={(event) => event.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-stone-800 shadow-sm transition hover:bg-stone-950 hover:text-white"
                >
                  <MessageCircle size={17} />
                  {post.replyCount} cevap
                </Link>
              </div>
            </article>
          );
        })}
        </div>
    </section>
  );
}
