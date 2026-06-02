export type PaperOption = {
  id: string;
  label: string;
  shortLabel: string;
  sample: string;
  shell: string;
  shape: string;
};

export const paperOptions: PaperOption[] = [
  {
    id: "sari-yirtik",
    label: "Sarı yırtık duyuru",
    shortLabel: "Sarı yırtık",
    sample: "Mahalle duyurusu",
    shell: "paper-yellow dot-paper border-amber-200 tape-wide pin-orange",
    shape: "torn-paper folded-corner",
  },
  {
    id: "mavi-kareli",
    label: "Mavi kareli not",
    shortLabel: "Mavi kareli",
    sample: "Anahtar bulundu",
    shell: "paper-blue grid-paper border-sky-200 tape-left pin-blue",
    shape: "torn-paper folded-corner",
  },
  {
    id: "yesil-cizgili",
    label: "Yeşil çizgili kağıt",
    shortLabel: "Yeşil çizgili",
    sample: "Market desteği",
    shell: "paper-green lined-paper border-emerald-200 tape-right pin-green",
    shape: "receipt-paper",
  },
  {
    id: "pembe-etiket",
    label: "Pembe satış etiketi",
    shortLabel: "Pembe etiket",
    sample: "Bisiklet satılık",
    shell: "paper-pink crumpled border-rose-200 tape-wide pin-purple",
    shape: "bookmark-paper",
  },
  {
    id: "mor-noktali",
    label: "Mor noktalı karalama",
    shortLabel: "Mor noktalı",
    sample: "Sessiz olalım",
    shell: "paper-purple dot-paper border-violet-200 tape-left pin-purple",
    shape: "torn-paper folded-corner",
  },
  {
    id: "turuncu-fis",
    label: "Turuncu fiş kağıdı",
    shortLabel: "Turuncu fiş",
    sample: "Kargo geldi",
    shell: "paper-orange grid-paper border-orange-200 tape-right pin-orange",
    shape: "receipt-paper",
  },
];

export function getPaperOption(id?: string) {
  return paperOptions.find((paper) => paper.id === id) ?? paperOptions[0];
}
