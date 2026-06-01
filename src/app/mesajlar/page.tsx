import { Header } from "@/components/Header";
import { LockKeyhole } from "lucide-react";

export default function MessagesPage() {
  return <main><Header /><section className="mx-auto max-w-4xl px-4 py-10"><div className="rounded-3xl border border-stone-200 bg-white p-8 paper-shadow"><LockKeyhole className="text-amber-700" size={34} /><h1 className="mt-4 text-3xl font-black text-stone-950">Anonim mesaj kutusu</h1><p className="mt-3 max-w-2xl leading-7 text-stone-600">Burada ilan sahibi ve cevap veren kişi birbirinin telefon, e-posta veya gerçek adını görmeden konuşabilecek. Bu ekran Supabase oturum sistemi bağlandıktan sonra aktif hale gelecek.</p></div></section></main>;
}
