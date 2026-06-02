import Link from "next/link";
import { BellRing, MessageSquareText, PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-amber-900/10 bg-[#fffaf0]/88 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3 font-black text-stone-950">
          <span className="flex h-11 w-11 rotate-[-4deg] items-center justify-center rounded-2xl bg-amber-700 text-white shadow-lg shadow-amber-900/20">
            <MessageSquareText size={22} />
          </span>
          <span>
            Sokak Panosu
            <span className="block text-xs font-bold text-amber-800">Mahalle notları burada</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-bold text-stone-700 md:flex">
          <Link className="rounded-full px-4 py-2 hover:bg-amber-100" href="/">Pano</Link>
          <Link className="rounded-full px-4 py-2 hover:bg-sky-100" href="/ilan-ver">İlan Ver</Link>
          <Link className="rounded-full px-4 py-2 hover:bg-pink-100" href="/mesajlar">Anonim Mesajlar</Link>
        </nav>
        <Link href="/ilan-ver" className="inline-flex items-center gap-2 rounded-full border-2 border-stone-950 bg-amber-300 px-4 py-2 text-sm font-black text-stone-950 shadow-lg shadow-stone-900/20 transition hover:-translate-y-0.5">
          <PlusCircle size={18} />
          Yaz
          <BellRing size={15} />
        </Link>
      </div>
    </header>
  );
}
