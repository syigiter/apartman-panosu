"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Link from "next/link";
import { CornerUpRight, MessageCircle, MoveUpRight, ShieldCheck } from "lucide-react";
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
  { x: 4, y: 9, w: 43, mx: 4, my: 7, mw: 82, r: -4, z: 12 },
  { x: 36, y: 16, w: 53, mx: 16, my: 28, mw: 80, r: 3, z: 16 },
  { x: 14, y: 46, w: 44, mx: 3, my: 51, mw: 78, r: -2, z: 10 },
  { x: 53, y: 41, w: 38, mx: 21, my: 73, mw: 76, r: 5, z: 14 },
  { x: 7, y: 67, w: 36, mx: 7, my: 91, mw: 72, r: 2, z: 9 },
  { x: 41, y: 70, w: 46, mx: 20, my: 111, mw: 78, r: -5, z: 11 },
  { x: 24, y: 28, w: 34, mx: 9, my: 132, mw: 74, r: 6, z: 8 },
  { x: 62, y: 10, w: 31, mx: 23, my: 153, mw: 70, r: -6, z: 7 },
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

export function InteractiveBoard({ posts, categories }: { posts: BoardPost[]; categories: string[] }) {
  const [activeId, setActiveId] = useState(posts[0]?.id ?? "");
  const [stack, setStack] = useState<Record<string, number>>({});
  const [counter, setCounter] = useState(40);

  function bringToFront(id: string) {
    setActiveId(id);
    setCounter((value) => value + 1);
    setStack((value) => ({ ...value, [id]: counter + 1 }));
  }

  return (
    <section id="pano" className="mx-auto max-w-6xl px-4 pb-14">
      <div className="mb-5 rounded-3xl border border-stone-200 bg-white/85 p-5 paper-shadow backdrop-blur">
        <div className="mb-4 flex items-center gap-2">
          <CornerUpRight className="text-amber-700" size={20} />
          <h2 className="font-black text-stone-950">Pano köşeleri</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category, index) => (
            <span key={category} className={`rounded-full border px-3 py-2 text-sm font-bold ${categoryColors[index % categoryColors.length]}`}>
              {category}
            </span>
          ))}
        </div>
      </div>

      <div className="cork-board board-shadow relative min-h-[1180px] overflow-hidden rounded-[32px] border-[10px] border-amber-950/75 p-4 md:min-h-[760px]">
        <div className="pointer-events-none absolute inset-5 rounded-[24px] border border-white/20 bg-white/8" />
        <p className="absolute left-6 top-5 z-[3] rounded-full bg-amber-100/90 px-4 py-2 text-xs font-black text-amber-950 shadow-sm">
          Kağıdın ucuna tıkla, öne gelsin
        </p>

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
              onPointerDown={() => bringToFront(post.id)}
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
                <Link href={"/ilan/" + post.id} className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-stone-800 shadow-sm transition hover:bg-stone-950 hover:text-white">
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
