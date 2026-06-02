import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sokak Panosu",
  description: "Anonim ilanlar, duvar yazıları ve güvenli mahalle yazışmaları.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
