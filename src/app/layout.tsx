import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apartman Panosu",
  description: "Anonim ilanlar, duvar yazıları ve güvenli apartman içi yazışmalar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
