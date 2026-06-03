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
    shell: "paper-yellow aged-paper dot-paper border-amber-200 tape-wide pin-orange",
    shape: "torn-paper torn-left folded-corner",
  },
  {
    id: "mavi-kareli",
    label: "Mavi kareli not",
    shortLabel: "Mavi kareli",
    sample: "Anahtar bulundu",
    shell: "paper-blue worn-paper grid-paper border-sky-200 tape-left pin-blue",
    shape: "ragged-paper folded-corner",
  },
  {
    id: "yesil-cizgili",
    label: "Yeşil çizgili kağıt",
    shortLabel: "Yeşil çizgili",
    sample: "Market desteği",
    shell: "paper-green aged-paper lined-paper border-emerald-200 tape-right pin-green",
    shape: "receipt-paper torn-bottom",
  },
  {
    id: "pembe-etiket",
    label: "Pembe satış etiketi",
    shortLabel: "Pembe etiket",
    sample: "Bisiklet satılık",
    shell: "paper-pink stained-paper crumpled border-rose-200 tape-wide pin-purple",
    shape: "ticket-paper",
  },
  {
    id: "mor-noktali",
    label: "Mor noktalı karalama",
    shortLabel: "Mor noktalı",
    sample: "Sessiz olalım",
    shell: "paper-purple worn-paper dot-paper border-violet-200 tape-left pin-purple",
    shape: "torn-paper torn-right folded-corner",
  },
  {
    id: "turuncu-fis",
    label: "Turuncu fiş kağıdı",
    shortLabel: "Turuncu fiş",
    sample: "Kargo geldi",
    shell: "paper-orange stained-paper grid-paper border-orange-200 tape-right pin-orange",
    shape: "receipt-paper torn-bottom",
  },
];

export function getPaperOption(id?: string) {
  return paperOptions.find((paper) => paper.id === id) ?? paperOptions[0];
}
