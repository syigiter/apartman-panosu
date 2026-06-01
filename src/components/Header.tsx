import Link from "next/link";
import { MessageSquareText, PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-stone-300/70 bg-[#fffaf0]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-stone-950"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-700 text-white"><MessageSquareText size={21} /></span><span>Apartman Panosu</span></Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-stone-700 md:flex"><Link href="/">Pano</Link><Link href="/ilan-ver">İlan Ver</Link><Link href="/mesajlar">Anonim Mesajlar</Link></nav>
        <Link href="/ilan-ver" className="inline-flex items-center gap-2 rounded-full bg-stone-950 px-4 py-2 text-sm font-semibold text-white"><PlusCircle size={18} />Yaz</Link>
      </div>
    </header>
  );
}
