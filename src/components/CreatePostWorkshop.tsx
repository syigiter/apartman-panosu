"use client";

import { createPost } from "@/app/actions";
import type { PostType } from "@/lib/mock-data";
import { getPaperOption, paperOptions } from "@/lib/paper-options";
import { ArrowLeft, Bell, Check, Eye, MessageSquarePlus, PenLine, Send, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type CreatePostWorkshopProps = {
  categories: string[];
  error?: string;
  initialCategory: string;
  initialPaper: string;
  initialType: PostType;
  missingEnv: boolean;
};

const categoryColors = [
  "bg-amber-100 text-amber-950 border-amber-200",
  "bg-sky-100 text-sky-950 border-sky-200",
  "bg-emerald-100 text-emerald-950 border-emerald-200",
  "bg-rose-100 text-rose-950 border-rose-200",
  "bg-violet-100 text-violet-950 border-violet-200",
  "bg-orange-100 text-orange-950 border-orange-200",
];

export function CreatePostWorkshop({ categories, error, initialCategory, initialPaper, initialType, missingEnv }: CreatePostWorkshopProps) {
  const [type, setType] = useState<PostType>(initialType);
  const [category, setCategory] = useState(initialCategory);
  const [paperId, setPaperId] = useState(initialPaper);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const selectedPaper = getPaperOption(paperId);

  return (
    <main className="min-h-screen p-2 md:p-4">
      <section className="cork-board board-shadow relative min-h-[calc(100vh-16px)] overflow-hidden rounded-[30px] border-[10px] border-amber-950/80 p-3 md:min-h-[calc(100vh-32px)] md:p-5">
        <div className="pointer-events-none absolute inset-5 rounded-[24px] border border-white/20 bg-white/8" />
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border-2 border-stone-950 bg-white/90 px-4 py-2 text-sm font-black text-stone-950 shadow-lg transition hover:-translate-y-0.5">
            <ArrowLeft size={17} />
            Panoya dön
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-stone-950 bg-amber-300 px-4 py-2 text-sm font-black text-stone-950 shadow-lg">
            <Bell size={17} />
            Yeni not hazırlığı
          </div>
        </div>

        <div className="relative z-10 mt-5 grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)_320px]">
          <aside className="rounded-[28px] border-2 border-stone-950 bg-yellow-50 p-4 paper-shadow">
            <div className="flex items-center gap-2">
              <Sparkles className="text-amber-700" size={19} />
              <h1 className="text-lg font-black text-stone-950">Not atölyesi</h1>
            </div>
            <p className="mt-2 text-sm font-semibold leading-6 text-stone-700">Önce türü, sonra panoya yakışacak kağıdı seç.</p>

            <div className="mt-5 grid gap-2">
              <button
                type="button"
                onClick={() => setType("ilan")}
                className={`flex items-center justify-between rounded-2xl border-2 px-3 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 ${type === "ilan" ? "border-stone-950 bg-amber-200 text-stone-950" : "border-amber-200 bg-white/75 text-amber-950"}`}
              >
                <span className="inline-flex items-center gap-2">
                  <MessageSquarePlus size={18} />
                  İlan
                </span>
                {type === "ilan" && <Check size={17} />}
              </button>
              <button
                type="button"
                onClick={() => setType("duvar-yazisi")}
                className={`flex items-center justify-between rounded-2xl border-2 px-3 py-3 text-left text-sm font-black transition hover:-translate-y-0.5 ${type === "duvar-yazisi" ? "border-stone-950 bg-sky-200 text-stone-950" : "border-sky-200 bg-white/75 text-sky-950"}`}
              >
                <span className="inline-flex items-center gap-2">
                  <PenLine size={18} />
                  Duvar yazısı
                </span>
                {type === "duvar-yazisi" && <Check size={17} />}
              </button>
            </div>

            <div className="mt-6">
              <p className="text-xs font-black uppercase text-stone-500">Kategori</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((item, index) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`rounded-full border px-3 py-2 text-xs font-black transition hover:-translate-y-0.5 ${category === item ? "border-stone-950 ring-2 ring-stone-950/20" : "border-transparent"} ${categoryColors[index % categoryColors.length]}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-bold leading-6 text-emerald-950">
              <ShieldCheck className="mb-2" size={19} />
              Telefon, e-posta ve gerçek ad istemiyoruz. Cevaplaşma sistem içinde gizli kalır.
            </div>
          </aside>

          <section className="grid gap-5">
            <div className="rounded-[28px] border-2 border-stone-950 bg-white/88 p-4 paper-shadow backdrop-blur">
              <div className="flex items-center gap-2">
                <Eye className="text-sky-700" size={18} />
                <h2 className="text-base font-black text-stone-950">Kağıt seç</h2>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {paperOptions.map((paper, index) => {
                  const isSelected = paper.id === paperId;
                  return (
                    <button
                      key={paper.id}
                      type="button"
                      onClick={() => setPaperId(paper.id)}
                      className={`paper-choice paper-note ${paper.shape} ${paper.shell} border p-3 text-left text-stone-900 transition hover:-translate-y-1 ${isSelected ? "ring-4 ring-stone-950/80" : ""}`}
                      style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
                      aria-pressed={isSelected}
                    >
                      <span className="paper-tape" aria-hidden="true" />
                      <span className="block text-xs font-black uppercase text-stone-600">{paper.shortLabel}</span>
                      <span className="mt-2 block text-sm font-black leading-tight">{paper.sample}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <form action={createPost} className={`paper-note pin-note paper-shadow rotate-[-0.4deg] border p-5 md:p-7 ${selectedPaper.shape} ${selectedPaper.shell}`}>
              <input type="hidden" name="paper" value={paperId} />
              <input type="hidden" name="type" value={type} />
              <input type="hidden" name="category" value={category} />

              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-black text-stone-800 shadow-sm">{selectedPaper.label}</span>
                <span className="rounded-full border border-stone-950 bg-amber-200 px-3 py-1.5 text-xs font-black text-stone-950">{type === "ilan" ? "İlan" : "Duvar Yazısı"}</span>
                <span className="rounded-full bg-white/75 px-3 py-1.5 text-xs font-black text-stone-700 shadow-sm">{category}</span>
              </div>

              <div className="mt-5 grid gap-4">
                <label className="grid gap-2 text-sm font-black text-stone-800">
                  Başlık
                  <input
                    name="title"
                    required
                    minLength={3}
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    className="rounded-2xl border-2 border-stone-950/15 bg-white/80 px-4 py-3 text-lg font-black text-stone-950 shadow-sm outline-none transition focus:border-stone-950"
                    placeholder="Örn. Bina girişinde anahtar bulundu"
                  />
                </label>
                <label className="grid gap-2 text-sm font-black text-stone-800">
                  Mesaj
                  <textarea
                    name="body"
                    required
                    minLength={10}
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    className="min-h-44 resize-y rounded-2xl border-2 border-stone-950/15 bg-white/80 px-4 py-3 text-base leading-7 text-stone-800 shadow-sm outline-none transition focus:border-stone-950"
                    placeholder="Kişisel telefon/e-posta yazmadan, notu kısa ve anlaşılır bırak."
                  />
                </label>
              </div>

              {missingEnv && (
                <div className="mt-5 rounded-2xl border-2 border-dashed border-amber-400 bg-amber-100/80 p-4 text-sm font-bold text-amber-950">
                  Kayıt için <code className="rounded bg-amber-200 px-1">.env.local</code> içine Supabase URL ve anon key eklenmeli.
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
                  İlan kaydedilemedi. Bilgileri kontrol edip tekrar deneyin.
                </div>
              )}

              <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-stone-950 bg-amber-300 px-5 py-4 font-black text-stone-950 shadow-lg shadow-stone-900/20 transition hover:-translate-y-0.5 sm:w-auto">
                <Send size={18} />
                Panoya as
              </button>
            </form>
          </section>

          <aside className="lg:pt-10">
            <div className={`paper-note ${selectedPaper.shape} ${selectedPaper.shell} paper-shadow min-h-[320px] rotate-[2deg] border p-5`}>
              <span className="paper-tape" aria-hidden="true" />
              <p className="inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-black text-stone-700 shadow-sm">Canlı önizleme</p>
              <h2 className="mt-5 text-2xl font-black leading-tight text-stone-950">{title || "Başlık burada belirecek"}</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-stone-700">{body || "Mesajını yazdıkça bu kağıdın üstünde nasıl görüneceğini burada izleyeceğiz."}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs font-black">
                <span className="rounded-full border border-stone-950 bg-amber-200 px-3 py-1 text-stone-950">{type === "ilan" ? "İlan" : "Duvar Yazısı"}</span>
                <span className="rounded-full bg-white/75 px-3 py-1 text-stone-700">{category}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
