import { Header } from "@/components/Header";
import { InteractiveBoard } from "@/components/InteractiveBoard";
import { categories } from "@/lib/mock-data";
import { getPosts } from "@/lib/posts";
import { hasSupabaseEnv } from "@/lib/supabase";
import { LockKeyhole, Megaphone, MessageSquareReply, Sparkles } from "lucide-react";

const features = [
  { icon: Megaphone, title: "Her şey ilan olabilir", text: "Kayıp anahtar, boş koltuk, sessiz saat ricası veya pazar planı." },
  { icon: MessageSquareReply, title: "Cevaplar panoda", text: "Herkes görebilir ya da sonraki fazda anonim özel mesaja döner." },
  { icon: LockKeyhole, title: "Kimlik perdesi", text: "Telefon ve e-posta otomatik paylaşılmaz; sohbet sistem içinde kalır." },
];

const featurePapers = [
  "pin-blue torn-paper folded-corner paper-blue grid-paper rotate-[2deg]",
  "pin-purple receipt-paper paper-pink dot-paper rotate-[-1.8deg]",
  "pin-green bookmark-paper paper-green lined-paper rotate-[1.2deg]",
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
              <div className="paper-note pin-note torn-paper crumpled paper-shadow rotate-[-1.2deg] border border-yellow-200 paper-yellow p-7 md:p-9">
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
                    className={`paper-note pin-note paper-shadow border p-5 ${featurePapers[index]}`}
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

      <InteractiveBoard posts={posts} categories={categories} />
    </main>
  );
}
