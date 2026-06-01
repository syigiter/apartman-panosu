import { createReply } from "@/app/actions";
import { Header } from "@/components/Header";
import { getPost, getReplies } from "@/lib/posts";
import { ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [post, replies] = await Promise.all([getPost(id), getReplies(id)]);
  if (!post) notFound();

  return (
    <main><Header /><section className="mx-auto max-w-3xl px-4 py-10"><article className="rounded-3xl border border-stone-200 bg-white p-6 paper-shadow md:p-8"><span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{post.category}</span><h1 className="mt-4 text-3xl font-black text-stone-950">{post.title}</h1><p className="mt-5 text-lg leading-8 text-stone-700">{post.body}</p><div className="mt-6 flex items-center gap-2 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900"><ShieldCheck size={18} />Bu ilanda cevaplaşma anonimdir. Telefon ve e-posta bilgileri otomatik paylaşılmaz.</div></article><section className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 paper-shadow md:p-8"><h2 className="text-xl font-bold text-stone-950">Cevaplar</h2><div className="mt-5 grid gap-3">{replies.length === 0 ? <p className="rounded-2xl bg-stone-50 p-4 text-sm text-stone-600">Henüz cevap yok. İlk anonim cevabı sen yazabilirsin.</p> : replies.map((reply) => <div key={reply.id} className="rounded-2xl border border-stone-200 bg-stone-50 p-4"><div className="mb-2 flex items-center justify-between gap-3 text-xs font-semibold text-stone-500"><span>{reply.alias}</span><span>{reply.createdAt}</span></div><p className="text-sm leading-6 text-stone-700">{reply.body}</p></div>)}</div></section><section className="mt-6 rounded-3xl border border-stone-200 bg-white p-6 paper-shadow md:p-8"><h2 className="text-xl font-bold text-stone-950">Anonim cevap yaz</h2><form action={createReply} className="mt-5 grid gap-4"><input type="hidden" name="post_id" value={post.id} /><textarea name="body" required minLength={3} className="min-h-32 rounded-xl border border-stone-300 px-4 py-3" placeholder="Cevabınızı yazın..." /><button type="submit" className="rounded-full bg-amber-700 px-5 py-3 font-bold text-white">Cevabı Gönder</button></form></section></section></main>
  );
}
