import type { CatalogFilters, Program } from "./domain";
import type { summarizeInterests } from "../onboarding/domain";

export type DetailTab = "ringkasan" | "kurikulum" | "bantuan" | "karier";
export function parseDetailTab(value: unknown): DetailTab {
  return value === "kurikulum" || value === "bantuan" || value === "karier"
    ? value
    : "ringkasan";
}
export function parseCatalogFilters(
  params: Record<string, string | string[] | undefined>,
): CatalogFilters {
  const one = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  return {
    query: one("q").slice(0, 120),
    field: ["it", "industry", "visual", "business"].includes(one("field"))
      ? (one("field") as CatalogFilters["field"])
      : "all",
    city: ["Kota Contoh 1", "Kota Contoh 2", "Kota Contoh 3"].includes(
      one("city"),
    )
      ? one("city")
      : "all",
    budget: ["under10", "under20", "10to25", "over25"].includes(one("budget"))
      ? (one("budget") as CatalogFilters["budget"])
      : "all",
    sort:
      one("sort") === "name" || one("sort") === "cost"
        ? (one("sort") as CatalogFilters["sort"])
        : "default",
    savedOnly: one("saved") === "1",
  };
}
export function catalogHref(filters: CatalogFilters) {
  const params = new URLSearchParams();
  if (filters.query) params.set("q", filters.query.slice(0, 120));
  if (filters.field !== "all") params.set("field", filters.field);
  if (filters.city !== "all") params.set("city", filters.city);
  if (filters.budget !== "all") params.set("budget", filters.budget);
  if (filters.sort !== "default") params.set("sort", filters.sort);
  if (filters.savedOnly) params.set("saved", "1");
  return `/jelajah${params.size ? `?${params}` : ""}`;
}
export function safeReturnTo(value: unknown): string {
  if (
    typeof value !== "string" ||
    value.length > 1500 ||
    !value.startsWith("/")
  )
    return "/jelajah";
  try {
    const url = new URL(value, "https://preview.invalid");
    if (url.origin !== "https://preview.invalid") return "/jelajah";
    if (url.pathname === "/jelajah")
      return catalogHref(
        parseCatalogFilters(Object.fromEntries(url.searchParams)),
      );
    if (url.pathname === "/rekomendasi")
      return url.searchParams.get("tab") === "tersemat"
        ? "/rekomendasi?tab=tersemat"
        : "/rekomendasi";
  } catch {
    /* Invalid links always return to the catalogue. */
  }
  return "/jelajah";
}
export function programHref(
  id: string,
  returnTo = "/jelajah",
  tab: DetailTab = "ringkasan",
) {
  const params = new URLSearchParams({ from: safeReturnTo(returnTo) });
  if (tab !== "ringkasan") params.set("tab", tab);
  return `/prodi/${encodeURIComponent(id)}?${params}`;
}

export const exampleVersions = [
  {
    id: 3 as const,
    title: "Skenario biaya & lokasi",
    date: "16 Okt 2026, 09.20 WIB",
    trigger:
      "Contoh penyesuaian kriteria mandiri, bukan perubahan kemampuan atau minat.",
    order: ["informatika-a", "dkv-c", "industri-b"],
  },
  {
    id: 2 as const,
    title: "Refleksi Misi Informatika",
    date: "15 Okt 2026, 15.00 WIB",
    trigger:
      "Contoh refleksi sesudah misi mengubah susunan eksplorasi. Log dan refleksi ini sintetis.",
    order: ["informatika-a", "industri-b", "dkv-c"],
  },
  {
    id: 1 as const,
    title: "Kuesioner awal",
    date: "15 Okt 2026, 14.35 WIB",
    trigger:
      "Contoh susunan awal dari kuesioner. Bukan hasil engine pada akunmu.",
    order: ["industri-b", "informatika-a", "dkv-c"],
  },
];
export function versionPrograms(items: Program[], version: number) {
  const snapshot = exampleVersions.find((item) => item.id === version);
  return snapshot
    ? snapshot.order.flatMap((id) => items.filter((item) => item.id === id))
    : [];
}
export function evidenceFor(
  program: Program,
  summary: ReturnType<typeof summarizeInterests>,
) {
  const dimension =
    program.field === "industry"
      ? "process"
      : program.field === "visual"
        ? "visual"
        : "logic";
  return (
    summary.dimensions.find((item) => item.id === dimension)?.evidence ?? []
  );
}
export const syntheticEvidence: Record<
  string,
  { survey: string; simulation: string; reflection: string }
> = {
  "informatika-a": {
    survey:
      "Contoh jawaban 4/5 dan 5/5: tertarik menyusun langkah logis serta mencari penyebab gangguan sistem.",
    simulation: "Contoh misi Sortir Pesanan Kantin selesai 12 menit.",
    reflection:
      "Saya suka melihat alur berjalan rapi. Saya ingin mencoba aktivitas logika lagi.",
  },
  "industri-b": {
    survey:
      "Contoh ketertarikan pada pengaturan antrean dan efisiensi tata kerja.",
    simulation: "Contoh draf aktivitas antrean 65%; belum ada refleksi akhir.",
    reflection:
      "Belum tersedia. Progres draf bukan bukti ketuntasan atau kemampuan.",
  },
  "dkv-c": {
    survey:
      "Contoh minat pada tata letak, tipografi, dan penyampaian pesan visual.",
    simulation: "Belum ada catatan simulasi lengkap pada skenario ini.",
    reflection: "Belum tersedia; tidak diisi dari asumsi sistem.",
  },
};
export const semesterOne = [
  {
    name: "Algoritma & Pemrograman Dasar",
    tag: "Wajib Prodi · Praktikum",
    credits: 4,
    description:
      "Menyusun langkah, percabangan, dan perulangan untuk memecahkan persoalan sederhana.",
  },
  {
    name: "Matematika Komputasi & Struktur Diskrit",
    tag: "Teori Fondasi",
    credits: 3,
    description:
      "Himpunan, graf, dan logika boolean sebagai bekal penalaran komputasi.",
  },
  {
    name: "Pengantar Teknologi Informasi & Etika Rekayasa",
    tag: "Pengantar",
    credits: 2,
    description:
      "Mengenali perangkat lunak, keamanan informasi, dan tanggung jawab dalam membuat teknologi.",
  },
  {
    name: "Dasar Desain Antarmuka Pengguna (UI/UX)",
    tag: "Prinsip Desain",
    credits: 3,
    description:
      "Mempelajari tata letak, keterbacaan, dan aksesibilitas antarmuka.",
  },
  {
    name: "Bahasa Inggris Komunikasi Teknis",
    tag: "Komunikasi",
    credits: 2,
    description:
      "Membaca dokumentasi dan menyampaikan penjelasan teknis secara tertulis.",
  },
  {
    name: "Mata Kuliah Wajib Umum (MKWU)",
    tag: "Contoh Muatan Umum",
    credits: 5,
    description:
      "Contoh gabungan Pancasila dan komunikasi ilmiah Bahasa Indonesia.",
  },
];
