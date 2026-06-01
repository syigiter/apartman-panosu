export type PostType = "ilan" | "duvar-yazisi";

export type BoardPost = {
  id: string;
  type: PostType;
  category: string;
  title: string;
  body: string;
  alias: string;
  replyCount: number;
  createdAt: string;
};

export const categories = ["Duyuru", "Kayıp Eşya", "Yardım", "Satılık", "Komşu Notu", "Şikayet/Öneri"];

export const posts: BoardPost[] = [
  { id: "1", type: "ilan", category: "Kayıp Eşya", title: "Bina girişinde anahtar bulundu", body: "Akşam saatlerinde posta kutularının yanında tekli anahtar bulundu. Sahibine anonim mesajla teslim detayını konuşabiliriz.", alias: "Daire sakini", replyCount: 3, createdAt: "Bugün" },
  { id: "2", type: "duvar-yazisi", category: "Komşu Notu", title: "Asansör kapısını açık bırakmayalım", body: "Özellikle sabah saatlerinde asansör uzun süre bekliyor. Küçük bir rica: kapıyı kapalı bırakalım.", alias: "Anonim komşu", replyCount: 8, createdAt: "Dün" },
  { id: "3", type: "ilan", category: "Yardım", title: "Yaşlı komşumuz için market desteği", body: "Hafta sonu markete gidecek olan biri varsa ufak bir alışveriş listesi için yardımcı olabilir mi? Kişisel bilgiler sistem içinde gizli kalacak.", alias: "Gizli kullanıcı", replyCount: 5, createdAt: "2 gün önce" }
];
