"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageCircle, MessageSquarePlus, MoveUpRight, PenLine, ShieldCheck, StickyNote, X } from "lucide-react";
import type { BoardPost } from "@/lib/mock-data";
import { paperOptions } from "@/lib/paper-options";

type BoardNoteVars = CSSProperties & {
  "--x": string;
  "--y": string;
  "--w": string;
  "--mx": string;
  "--my": string;
  "--mw": string;
  "--r": string;
  "--h": string;
  "--mh": string;
  "--cr": string;
  "--sx": string;
  "--sy": string;
  "--tape-r": string;
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
  { x: 16, y: 31, w: 24, h: 205, mx: 5, my: 13, mw: 78, mh: 232, r: -7, cr: 1.6, sx: 2, sy: -3, tr: 2, z: 12 },
  { x: 38, y: 35, w: 34, h: 180, mx: 13, my: 38, mw: 82, mh: 285, r: 2, cr: -1.2, sx: -2, sy: 3, tr: -4, z: 16 },
  { x: 62, y: 22, w: 20, h: 230, mx: 4, my: 66, mw: 72, mh: 218, r: -3, cr: 2.4, sx: 3, sy: 2, tr: 8, z: 10 },
  { x: 18, y: 56, w: 31, h: 280, mx: 20, my: 92, mw: 74, mh: 245, r: 5, cr: -2.1, sx: -3, sy: -2, tr: -7, z: 14 },
  { x: 53, y: 54, w: 25, h: 290, mx: 8, my: 120, mw: 78, mh: 258, r: -4, cr: 1.2, sx: 1, sy: 4, tr: 4, z: 9 },
  { x: 69, y: 43, w: 18, h: 250, mx: 24, my: 148, mw: 66, mh: 238, r: 8, cr: -2.8, sx: -2, sy: 1, tr: -10, z: 11 },
  { x: 24, y: 22, w: 21, h: 185, mx: 10, my: 176, mw: 70, mh: 218, r: 6, cr: 2.2, sx: 2, sy: 2, tr: 7, z: 8 },
  { x: 44, y: 63, w: 31, h: 245, mx: 18, my: 205, mw: 80, mh: 228, r: -6, cr: -1.8, sx: -1, sy: -3, tr: -5, z: 7 },
];

const localLayouts = [
  { x: 36, y: 42, w: 22, h: 190, mx: 8, my: 18, mw: 72, mh: 210, r: -3, cr: 1.4, sx: 1, sy: -2, tr: 3, z: 18 },
  { x: 52, y: 50, w: 20, h: 215, mx: 16, my: 47, mw: 70, mh: 220, r: 4, cr: -1.5, sx: -2, sy: 2, tr: -5, z: 17 },
  { x: 28, y: 58, w: 24, h: 185, mx: 10, my: 76, mw: 74, mh: 205, r: 2, cr: 2, sx: 2, sy: 1, tr: 6, z: 16 },
  { x: 66, y: 34, w: 18, h: 225, mx: 20, my: 105, mw: 66, mh: 215, r: -5, cr: -2, sx: -1, sy: 3, tr: -8, z: 15 },
];

const attachmentStyles = ["attach-tape-pin", "attach-double-tape", "attach-corner-pin", "attach-side-tape", "attach-thumbtack"];

function hashText(value: string) {
  return [...value].reduce((hash, char) => hash + char.charCodeAt(0), 0);
}

function noteMeta(post: BoardPost, index: number) {
  const hash = hashText(post.id + post.category + post.title);
  const isLocal = post.id.startsWith("local-");
  const layoutSet = isLocal ? localLayouts : layouts;
  const layout = layoutSet[(hash + index) % layoutSet.length];
  const style = paperOptions.find((paper) => paper.id === post.paperId) ?? paperOptions[(hash + index * 3) % paperOptions.length];
  const attachment = attachmentStyles[(hash + index * 5) % attachmentStyles.length];
  return { attachment, layout, style };
}

export function InteractiveBoard({ posts, categories, missingEnv }: { posts: BoardPost[]; categories: string[]; missingEnv?: boolean }) {
  const [boardPosts, setBoardPosts] = useState(posts);
  const [activeId, setActiveId] = useState(posts[0]?.id ?? "");
  const [stack, setStack] = useState<Record<string, number>>({});
  const [counter, setCounter] = useState(40);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [menuStep, setMenuStep] = useState<"type" | "paper">("type");
  const [selectedType, setSelectedType] = useState<"ilan" | "duvar-yazisi">("ilan");
  const [localCount, setLocalCount] = useState(0);

  useEffect(() => {
    const rawPosts = window.localStorage.getItem("sokak-panosu-posts");
    if (!rawPosts) {
      setLocalCount(0);
      return;
    }

    try {
      const localPosts = JSON.parse(rawPosts) as BoardPost[];
      const existingIds = new Set(posts.map((post) => post.id));
      const mergedPosts = [...localPosts.filter((post) => !existingIds.has(post.id)), ...posts];
      setBoardPosts(mergedPosts);
      setLocalCount(localPosts.length);
      setActiveId(mergedPosts[0]?.id ?? "");
    } catch {
      window.localStorage.removeItem("sokak-panosu-posts");
      setLocalCount(0);
    }
  }, [posts]);

  function clearLocalPosts() {
    window.localStorage.removeItem("sokak-panosu-posts");
    setBoardPosts(posts);
    setLocalCount(0);
    setActiveId(posts[0]?.id ?? "");
    setStack({});
    setMenu(null);
  }

  function bringToFront(id: string) {
    setActiveId(id);
    setMenu(null);
    setCounter((value) => value + 1);
    setStack((value) => ({ ...value, [id]: counter + 1 }));
  }

  function openBoardMenu(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(Math.max(event.clientX - rect.left, 16), rect.width - 336);
    const y = Math.min(Math.max(event.clientY - rect.top, 16), rect.height - 430);
    setMenuStep("type");
    setMenu({ x, y });
  }

  function chooseType(type: "ilan" | "duvar-yazisi") {
    setSelectedType(type);
    setMenuStep("paper");
  }

  return (
    <section id="pano" className="h-screen p-2 md:p-4">
      <div
        className="cork-board board-shadow relative h-full overflow-hidden rounded-[28px] border-[10px] border-amber-950/75 p-4"
        onClick={openBoardMenu}
      >
        <div className="pointer-events-none absolute inset-5 rounded-[24px] border border-white/20 bg-white/8" />

        <div
          className="absolute right-5 top-5 z-[36] hidden rounded-2xl border-2 border-stone-950 bg-amber-300 px-4 py-3 text-sm font-black text-stone-950 shadow-lg md:block"
          onMouseDown={(event) => event.stopPropagation()}
        >
          Sokak Panosu
          <span className="block text-[11px] font-bold">Mahalle notları burada</span>
        </div>

        <div
          className="absolute left-5 top-5 z-[35] max-w-[calc(100%-40px)] rounded-3xl border border-stone-200 bg-white/82 p-3 paper-shadow backdrop-blur md:max-w-[620px]"
          onMouseDown={(event) => event.stopPropagation()}
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
          onMouseDown={(event) => event.stopPropagation()}
        >
          Boş yere tıkla, seçenekler açılsın
        </p>

        {missingEnv && (
          <div
            className="absolute bottom-5 right-5 z-[35] hidden max-w-md rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/95 p-4 text-xs font-semibold text-amber-950 shadow-lg md:block"
            onMouseDown={(event) => event.stopPropagation()}
          >
            Supabase bağlantısı henüz yok; yeni notlar bu tarayıcıda demo olarak saklanır.
            {localCount > 0 && (
              <button
                type="button"
                onClick={clearLocalPosts}
                className="mt-3 block rounded-full bg-stone-950 px-3 py-2 text-xs font-black text-white transition hover:bg-amber-700"
              >
                Demo notları temizle
              </button>
            )}
          </div>
        )}

        {menu && (
          <div
            className="absolute z-[120] w-72 rounded-3xl border-2 border-stone-950 bg-yellow-50 p-3 paper-shadow"
            style={{ left: menu.x, top: menu.y }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="mb-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {menuStep === "paper" && (
                  <button
                    type="button"
                    onClick={() => setMenuStep("type")}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm"
                    aria-label="Geri dön"
                  >
                    <ArrowLeft size={16} />
                  </button>
                )}
                <p className="text-sm font-black text-stone-950">{menuStep === "type" ? "Panoya ne asalım?" : "Kağıdını seç"}</p>
              </div>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-stone-800 shadow-sm"
                onClick={() => setMenu(null)}
                aria-label="Menüyü kapat"
              >
                <X size={16} />
              </button>
            </div>
            {menuStep === "type" ? (
              <>
                <div className="grid gap-2">
                  <button type="button" onClick={() => chooseType("ilan")} className="flex items-center gap-2 rounded-2xl border border-amber-200 bg-amber-100 px-3 py-3 text-left text-sm font-black text-amber-950 transition hover:-translate-y-0.5">
                    <MessageSquarePlus size={18} />
                    Yeni ilan as
                  </button>
                  <button type="button" onClick={() => chooseType("duvar-yazisi")} className="flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-100 px-3 py-3 text-left text-sm font-black text-sky-950 transition hover:-translate-y-0.5">
                    <PenLine size={18} />
                    Duvar yazısı bırak
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {categories.map((category, index) => (
                    <Link key={category} href={`/ilan-ver?category=${encodeURIComponent(category)}`} className={`rounded-full border px-2.5 py-1.5 text-xs font-bold ${categoryColors[index % categoryColors.length]}`}>
                      {category}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                {paperOptions.map((paper, index) => (
                  <Link
                    key={paper.id}
                    href={`/ilan-ver?type=${selectedType}&paper=${paper.id}`}
                    className={`paper-choice paper-note ${paper.shape} ${paper.shell} border p-3 text-left text-stone-900 transition hover:-translate-y-1`}
                    style={{ transform: `rotate(${index % 2 === 0 ? -1.5 : 1.5}deg)` }}
                  >
                    <span className="paper-tape" aria-hidden="true" />
                    <span className="block text-[11px] font-black uppercase tracking-wide text-stone-600">{paper.shortLabel}</span>
                    <span className="mt-2 block text-sm font-black leading-tight">{paper.sample}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {boardPosts.map((post, index) => {
          const { attachment, layout, style } = noteMeta(post, index);
          const isActive = activeId === post.id;
          const noteVars: BoardNoteVars = {
            "--x": `${layout.x}%`,
            "--y": `${layout.y}%`,
            "--w": `${layout.w}%`,
            "--mx": `${layout.mx}%`,
            "--my": `${layout.my}%`,
            "--mw": `${layout.mw}%`,
            "--r": `${layout.r}deg`,
            "--h": `${layout.h}px`,
            "--mh": `${layout.mh}px`,
            "--cr": `${layout.cr}deg`,
            "--sx": `${layout.sx}px`,
            "--sy": `${layout.sy}px`,
            "--tape-r": `${layout.tr}deg`,
            zIndex: stack[post.id] ?? (isActive ? 80 : layout.z),
          };

          return (
            <article
              key={post.id}
              onMouseDown={(event) => {
                event.stopPropagation();
                bringToFront(post.id);
              }}
              className={`board-note-position paper-note realistic-note ${attachment} ${style.shape} ${style.shell} paper-shadow border p-5 transition duration-200 ${isActive ? "scale-[1.015]" : "hover:scale-[1.01]"}`}
              style={noteVars}
            >
              <span className="paper-tape" aria-hidden="true" />
              <span className="paper-pin" aria-hidden="true" />
              <span className="paper-curl" aria-hidden="true" />
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
                <span className="rounded-full bg-white/80 px-3 py-1 text-stone-800 shadow-sm">{style.shortLabel}</span>
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
                  onMouseDown={(event) => event.stopPropagation()}
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
