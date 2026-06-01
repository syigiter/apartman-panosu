import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { categories } from "@/lib/mock-data";
import { getPosts } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase";
import { LockKeyhole, Megaphone, MessageSquareReply } from "lucide-react";

const features = [
  { icon: Megaphone, title: "Serbest konu", text: "Duyuru, kayıp eşya, yardım, satış veya komşu notu." },
  { icon: MessageSquareReply, title: "Cevaplaşma", text: "İlanlara açık cevap veya anonim özel mesaj." },
  { icon: LockKeyhole, title: "Gizlilik", text: "İletişim bilgileri otomatik gösterilmez." }
];

export default async function Home() {
  const posts = await getPosts();
  return (
    <main><Header /><section className="mx-auto max-w-6xl px-4 py-10 md:py-14"><div className="board-shadow rounded-[28px] border-8 border-amber-900/70 bg-[#fffaf0] p-5 md:p-8"><div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"><div><p className="mb-3 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900">Apartman panosu, ama dijital ve anonim</p><h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-950 md:text-6xl">İlan bırak, duvara yaz, cevapları gizlilikle al.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">Ziyaretçiler istedikleri konuda ilan veya duvar yazısı yayınlar. Cevaplar sistem içinde ilerler; telefon, e-posta ve kişi bilgileri karşı tarafla otomatik paylaşılmaz.</p><div className="mt-7 flex flex-wrap gap-3"><a href="/ilan-ver" className="rounded-full bg-amber-700 px-5 py-3 font-bold text-white">İlan Ver</a><a href="#pano" className="rounded-full border border-stone-300 px-5 py-3 font-bold text-stone-900">Panoyu Oku</a></div></div><div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">{features.map((item) => <div key={item.title} className="rounded-2xl border border-stone-200 bg-white p-5"><item.icon className="mb-3 text-amber-700" /><h2 className="font-bold text-stone-950">{item.title}</h2><p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p></div>)}</div></div></div></section>{!hasSupabaseEnv() && <section className="mx-auto max-w-6xl px-4 pb-4"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">Supabase ortam değişkenleri girilmediği için pano örnek verilerle gösteriliyor. Gerçek kayıt için <code className="rounded bg-amber-100 px-1">.env.local</code> dosyasını doldurun.</div></section>}<section id="pano" className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 lg:grid-cols-[240px_1fr]"><aside className="h-fit rounded-2xl border border-stone-200 bg-white p-5"><h2 className="font-bold text-stone-950">Kategoriler</h2><div className="mt-4 flex flex-wrap gap-2 lg:flex-col">{categories.map((category) => <span key={category} className="rounded-full bg-stone-100 px-3 py-2 text-sm text-stone-700">{category}</span>)}</div></aside><div className="grid gap-4">{posts.map((post) => <PostCard key={post.id} post={post} />)}</div></section></main>
  );
}
