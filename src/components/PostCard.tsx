import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import type { BoardPost } from "@/lib/mock-data";

export function PostCard({ post }: { post: BoardPost }) {
  const styles = {
    Duyuru: {
      shell: "paper-yellow dot-paper border-amber-200 rotate-[-2.2deg] md:ml-3 md:max-w-[92%] tape-wide",
      shape: "torn-paper folded-corner",
      label: "Duyuru",
    },
    "Kayıp Eşya": {
      shell: "paper-blue grid-paper border-sky-200 rotate-[1.7deg] md:mr-10 tape-left",
      shape: "torn-paper folded-corner",
      label: "Kayıp notu",
    },
    Yardım: {
      shell: "paper-green lined-paper border-emerald-200 rotate-[-1.4deg] md:ml-12 tape-right",
      shape: "receipt-paper",
      label: "Yardım çağrısı",
    },
    Satılık: {
      shell: "paper-pink crumpled border-rose-200 rotate-[2.4deg] md:max-w-[86%] md:ml-auto tape-wide",
      shape: "bookmark-paper",
      label: "Satılık etiketi",
    },
    "Komşu Notu": {
      shell: "paper-purple dot-paper border-violet-200 rotate-[-1.8deg] md:mr-16 tape-left",
      shape: "torn-paper folded-corner",
      label: "Komşu karalaması",
    },
    "Şikayet/Öneri": {
      shell: "paper-orange grid-paper border-orange-200 rotate-[1.2deg] md:ml-8 tape-right",
      shape: "receipt-paper",
      label: "Öneri fişi",
    },
  } as const;
  const style = styles[post.category as keyof typeof styles] ?? {
    shell: "paper-cream crumpled border-stone-200 rotate-[0.8deg] tape-wide",
    shape: "torn-paper folded-corner",
    label: "Pano notu",
  };

  return (
    <article className={`paper-note ${style.shape} paper-shadow border p-6 transition hover:rotate-0 hover:-translate-y-1 ${style.shell}`}>
      <span className="paper-tape" aria-hidden="true" />
      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold">
        <span className="rounded-full bg-white/80 px-3 py-1 text-stone-800 shadow-sm">{style.label}</span>
        <span className="rounded-full bg-white/70 px-3 py-1 text-stone-700 shadow-sm">{post.category}</span>
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
