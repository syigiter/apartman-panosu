# Apartman Panosu

Anonim ilan, duvar yazısı ve güvenli cevaplaşma uygulaması.

## Amaç

Ziyaretçiler ilan veya duvar yazısı bırakabilir. Diğer kullanıcılar cevap verebilir. Telefon, e-posta ve kişi bilgileri otomatik paylaşılmaz; özel yazışma sistem içinden anonim yürür.

## Teknoloji

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth + PostgreSQL + RLS

## Sayfalar

- / pano ve son ilanlar
- /ilan-ver yeni ilan/duvar yazısı formu
- /ilan/[id] ilan detayı ve cevap formu
- /mesajlar anonim mesaj kutusu taslağı

## Supabase

supabase/schema.sql dosyası temel tablo ve RLS politikalarını içerir.

1. Supabase'de yeni proje oluşturun.
2. SQL editor içinde `supabase/schema.sql` dosyasını çalıştırın.
3. `.env.example` dosyasını `.env.local` olarak kopyalayın.
4. Supabase Project Settings > API ekranındaki URL ve anon public key değerlerini girin.

## Çalıştırma

```bash
npm install
npm run dev
```
