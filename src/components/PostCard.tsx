import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import type { BoardPost } from "@/lib/mock-data";

export function PostCard({ post }: { post: BoardPost }) {
  return (
    <article className="paper-shadow rounded-2xl border border-stone-200 bg-white p-5">
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-semibold"><span className="rounded-full bg-amber-100 px-3 py-1 text-amber-800">{post.category}</span><span className="rounded-full bg-stone-100 px-3 py-1 text-stone-700">{post.type === "ilan" ? "İlan" : "Duvar Yazısı"}</span><span className="text-stone-500">{post.createdAt}</span></div>
      <h2 className="text-xl font-bold text-stone-950">{post.title}</h2>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-700">{post.body}</p>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4"><div className="flex items-center gap-2 text-xs text-stone-500"><ShieldCheck size={16} className="text-emerald-700" />{post.alias} - kimlik bilgisi gizli</div><Link href={"/ilan/" + post.id} className="inline-flex items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800"><MessageCircle size={17} />{post.replyCount} cevap</Link></div>
    </article>
  );
}
