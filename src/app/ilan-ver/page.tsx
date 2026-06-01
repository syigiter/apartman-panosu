import { createPost } from "@/app/actions";
import { Header } from "@/components/Header";
import { categories } from "@/lib/mock-data";
import { getPaperOption, paperOptions } from "@/lib/paper-options";
import { hasSupabaseEnv } from "@/lib/supabase";
import { PencilLine, ShieldCheck } from "lucide-react";
import Link from "next/link";

type CreatePostSearchParams = {
  category?: string;
  error?: string;
  paper?: string;
  type?: string;
};

export default async function CreatePostPage({ searchParams }: { searchParams: Promise<CreatePostSearchParams> }) {
  const params = await searchParams;
  const selectedType = params.type === "duvar-yazisi" ? "duvar-yazisi" : "ilan";
  const selectedCategory = params.category && categories.includes(params.category) ? params.category : categories[0];
  const selectedPaper = getPaperOption(params.paper);
  const paperQueryBase = `type=${selectedType}&category=${encodeURIComponent(selectedCategory)}`;

  return (
    <main>
      <Header />
      <section className="mx-auto max-w-4xl px-4 py-10">
        <div className="cork-board board-shadow rounded-[32px] border-[10px] border-amber-950/75 p-4 md:p-7">
          <div className={`paper-note pin-note paper-shadow rotate-[-0.6deg] border p-7 md:p-9 ${selectedPaper.shape} ${selectedPaper.shell}`}>
            <p className="inline-flex items-center gap-2 rounded-full bg-amber-200 px-4 py-2 text-sm font-black text-amber-950">
              <PencilLine size={16} />
              {selectedPaper.label}
            </p>
            <h1 className="mt-4 text-3xl font-black text-stone-950 md:text-5xl">Panoya ne asalım?</h1>
            <p className="mt-3 max-w-2xl text-stone-700">
              İlanlar anonim yayınlanır. Telefon, e-posta ve gerçek ad alanı istemiyoruz;
              cevaplaşma sistem içinden ilerler.
            </p>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold text-emerald-950">
              <ShieldCheck size={19} className="mt-0.5 shrink-0" />
              Kişisel bilgi yazmadan da anlaşabilirsiniz. Notu açık, kısa ve komşuca tutmak yeterli.
            </div>

            {!hasSupabaseEnv() && (
              <div className="mt-5 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-100/70 p-4 text-sm font-semibold text-amber-950">
                Kayıt yapabilmek için önce <code className="rounded bg-amber-200 px-1">.env.local</code> içine Supabase URL ve anon key eklenmeli.
              </div>
            )}

            {params.error && (
              <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-900">
                İlan kaydedilemedi. Bilgileri kontrol edip tekrar deneyin.
              </div>
            )}

            <div className="mt-8">
              <p className="text-sm font-black text-stone-800">Kağıt tipi</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
                {paperOptions.map((paper, index) => {
                  const isSelected = paper.id === selectedPaper.id;
                  return (
                    <Link
                      key={paper.id}
                      href={`/ilan-ver?${paperQueryBase}&paper=${paper.id}`}
                      className={`paper-choice paper-note ${paper.shape} ${paper.shell} border p-3 text-stone-900 transition hover:-translate-y-1 ${isSelected ? "ring-4 ring-stone-950/80" : ""}`}
                      style={{ transform: `rotate(${index % 2 === 0 ? -1 : 1}deg)` }}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <span className="paper-tape" aria-hidden="true" />
                      <span className="block text-xs font-black uppercase text-stone-600">{paper.shortLabel}</span>
                      <span className="mt-2 block text-sm font-black leading-tight">{paper.sample}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            <form action={createPost} className="mt-8 grid gap-5">
              <input type="hidden" name="paper" value={selectedPaper.id} />
              <label className="grid gap-2 text-sm font-bold text-stone-800">
                Tür
                <select name="type" className="rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 shadow-sm" defaultValue={selectedType}>
                  <option value="ilan">İlan</option>
                  <option value="duvar-yazisi">Duvar Yazısı</option>
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-800">
                Kategori
                <select name="category" className="rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 shadow-sm" defaultValue={selectedCategory}>
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-800">
                Başlık
                <input name="title" required minLength={3} className="rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 shadow-sm" placeholder="Örn. Bina girişinde anahtar bulundu" />
              </label>
              <label className="grid gap-2 text-sm font-bold text-stone-800">
                Mesaj
                <textarea name="body" required minLength={10} className="min-h-40 rounded-2xl border-2 border-stone-200 bg-white px-4 py-3 shadow-sm" placeholder="Kişisel telefon/e-posta yazmamanızı öneririz. Sistem anonim cevaplaşma sağlayacak." />
              </label>
              <button type="submit" className="rounded-full border-2 border-stone-950 bg-amber-300 px-5 py-3 font-black text-stone-950 shadow-lg shadow-stone-900/20 transition hover:-translate-y-0.5">
                Panoya as
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
