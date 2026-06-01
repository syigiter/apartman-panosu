import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import type { BoardPost } from "@/lib/mock-data";

export function PostCard({ post }: { post: BoardPost }) {
  const colors = {
    Duyuru: "bg-amber-50 border-amber-200 rotate-[-0.6deg]",
    "Kayıp Eşya": "bg-sky-50 border-sky-200 rotate-[0.7deg]",
    Yardım: "bg-emerald-50 border-emerald-200 rotate-[-0.3deg]",
    Satılık: "bg-rose-50 border-rose-200 rotate-[0.4deg]",
    "Komşu Notu": "bg-violet-50 border-violet-200 rotate-[-0.4deg]",
    "Şikayet/Öneri": "bg-orange-50 border-orange-200 rotate-[0.5deg]",
  } as const;
  const color = colors[post.category as keyof typeof colors] ?? "bg-white border-stone-200";

  return (
    <article className={`paper-note paper-shadow rounded-2xl border p-5 transition hover:rotate-0 hover:-translate-y-1 ${color}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className="rounded-full bg-white/80 px-3 py-1 text-stone-800 shadow-sm">{post.category}</span>
        <span className="rounded-full border border-stone-900 bg-amber-200 px-3 py-1 text-stone-950">{post.type === "ilan" ? "İlan" : "Duvar Yazısı"}</span>
        <span className="text-stone-500">{post.createdAt}</span>
      </div>
      <h2 className="text-xl font-bold text-stone-950">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-700">{post.body}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-900/10 pt-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
          <ShieldCheck size={16} className="text-emerald-700" />
          {post.alias} - kimlik bilgisi gizli
        </div>
        <Link href={"/ilan/" + post.id} className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-sm font-bold text-stone-800 shadow-sm transition hover:bg-stone-950 hover:text-white">
          <MessageCircle size={17} />
          {post.replyCount} cevap
        </Link>
      </div>
    </article>
  );
}
