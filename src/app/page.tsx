import { Header } from "@/components/Header";
import { PostCard } from "@/components/PostCard";
import { categories } from "@/lib/mock-data";
import { getPosts } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase";
import { LockKeyhole, Megaphone, MessageSquareReply, Paintbrush, Sparkles } from "lucide-react";

const features = [
  { icon: Megaphone, title: "Her şey ilan olabilir", text: "Kayıp anahtar, boş koltuk, sessiz saat ricası veya pazar planı." },
  { icon: MessageSquareReply, title: "Cevaplar panoda", text: "Herkes görebilir ya da sonraki fazda anonim özel mesaja döner." },
  { icon: LockKeyhole, title: "Kimlik perdesi", text: "Telefon ve e-posta otomatik paylaşılmaz; sohbet sistem içinde kalır." },
];

const categoryColors = [
  "bg-amber-100 text-amber-950 border-amber-200",
  "bg-sky-100 text-sky-950 border-sky-200",
  "bg-emerald-100 text-emerald-950 border-emerald-200",
  "bg-rose-100 text-rose-950 border-rose-200",
  "bg-violet-100 text-violet-950 border-violet-200",
  "bg-orange-100 text-orange-950 border-orange-200",
];

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <Header />

      <section className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        <div className="cork-board board-shadow rounded-[32px] border-[10px] border-amber-950/75 p-4 md:p-7">
          <div className="rounded-[22px] border border-white/20 bg-white/12 p-3 backdrop-blur-[1px] md:p-5">
            <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
              <div className="paper-note paper-shadow rotate-[-1.2deg] rounded-3xl border border-yellow-200 bg-yellow-50 p-6 md:p-8">
                <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2 text-sm font-black text-amber-950">
                  <Sparkles size={16} />
                  Apartmanın neşeli duyuru duvarı
                </p>
                <h1 className="max-w-3xl text-4xl font-black tracking-tight text-stone-950 md:text-6xl">
                  İlan bırak, duvara yaz, komşudan cevap gelsin.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
                  Burası dijital apartman panosu: ziyaretçiler not asar, ilan bırakır, cevap verir.
                  Kişisel bilgiler otomatik paylaşılmaz; herkes biraz daha rahat konuşur.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <a href="/ilan-ver" className="rounded-full border-2 border-stone-950 bg-amber-300 px-5 py-3 font-black text-stone-950 shadow-lg shadow-stone-900/20 transition hover:-translate-y-0.5">
                    Panoya not as
                  </a>
                  <a href="#pano" className="rounded-full border-2 border-stone-950 bg-white px-5 py-3 font-black text-stone-950 transition hover:-translate-y-0.5">
                    Notları oku
                  </a>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {features.map((item, index) => (
                  <div
                    key={item.title}
                    className={`paper-note paper-shadow rounded-2xl border bg-white p-5 ${
                      index === 0 ? "rotate-[1deg] border-sky-200" : index === 1 ? "rotate-[-1deg] border-rose-200" : "rotate-[0.5deg] border-emerald-200"
                    }`}
                  >
                    <item.icon className="mb-3 text-amber-700" />
                    <h2 className="font-black text-stone-950">{item.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {!hasSupabaseEnv() && (
        <section className="mx-auto max-w-6xl px-4 pb-4">
          <div className="rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-950">
            Supabase bağlantısı henüz yok; pano şimdilik örnek notlarla dolu. Gerçek kayıt için <code className="rounded bg-amber-100 px-1">.env.local</code> dosyasını dolduracağız.
          </div>
        </section>
      )}

      <section id="pano" className="mx-auto grid max-w-6xl gap-8 px-4 pb-14 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-3xl border border-stone-200 bg-white/85 p-5 paper-shadow backdrop-blur">
          <div className="mb-4 flex items-center gap-2">
            <Paintbrush className="text-amber-700" size={20} />
            <h2 className="font-black text-stone-950">Pano köşeleri</h2>
          </div>
          <div className="flex flex-wrap gap-2 lg:flex-col">
            {categories.map((category, index) => (
              <span key={category} className={`rounded-full border px-3 py-2 text-sm font-bold ${categoryColors[index % categoryColors.length]}`}>
                {category}
              </span>
            ))}
          </div>
        </aside>

        <div className="grid gap-5">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
