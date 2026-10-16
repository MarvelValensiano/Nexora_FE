import type { OnboardingDraft } from "../onboarding/domain";

export type ProfileMode = "auto" | "dimas" | "rani";
export type ProfileKey = "draft" | "dimas" | "rani";
export type CatalogField = "all" | "it" | "industry" | "visual" | "business";
export type BudgetFilter = "all" | "under10" | "under20" | "10to25" | "over25";
export type CatalogFilters = {
  query: string;
  field: CatalogField;
  city: string;
  budget: BudgetFilter;
  savedOnly: boolean;
  sort: "default" | "name" | "cost";
};
export type Program = {
  id: string;
  name: string;
  major: string;
  campus: string;
  city: string;
  degree: string;
  field: Exclude<CatalogField, "all">;
  interest: string;
  focus: string;
  description: string;
  annualCost: { min: number; max: number } | null;
  costYear: number;
  image: string;
  mission: string | null;
  careers: string[];
};

export const programs: Program[] = [
  {
    id: "informatika-a",
    name: "Informatika",
    major: "INFORMATIKA",
    campus: "Universitas Contoh A",
    city: "Kota Contoh 1",
    degree: "S1",
    field: "it",
    interest: "Logika & Sistem",
    focus: "Matematika & Pemrograman",
    description:
      "Contoh eksplorasi penyusunan aturan, pengujian alur, dan perbaikan sistem perangkat lunak.",
    annualCost: { min: 18500000, max: 18500000 },
    costYear: 2026,
    image: "/images/catalog-informatika.webp",
    mission: "Pesanan Tanpa Tabrakan",
    careers: ["Pengembang perangkat lunak", "Penguji perangkat lunak / QA"],
  },
  {
    id: "industri-b",
    name: "Teknik Industri",
    major: "TEKNIK INDUSTRI",
    campus: "Institut Contoh B",
    city: "Kota Contoh 2",
    degree: "S1",
    field: "industry",
    interest: "Proses & Data",
    focus: "Kalkulus & Sistem",
    description:
      "Contoh eksplorasi kapasitas, antrean, dan pengaruh pembagian sumber daya.",
    annualCost: { min: 14000000, max: 22000000 },
    costYear: 2026,
    image: "/images/catalog-industri.webp",
    mission: "Antrean Bergerak",
    careers: ["Analis proses / operasional", "Perencana produksi"],
  },
  {
    id: "dkv-c",
    name: "Desain Komunikasi Visual",
    major: "DKV",
    campus: "Politeknik Contoh C",
    city: "Kota Contoh 1",
    degree: "S1",
    field: "visual",
    interest: "Komunikasi Visual",
    focus: "Hierarki Informasi & Desain",
    description:
      "Contoh eksplorasi penyampaian pesan melalui tata letak, tipografi, serta revisi berdasarkan umpan balik.",
    annualCost: null,
    costYear: 2024,
    image: "/images/catalog-dkv.webp",
    mission: "Menu yang Terbaca",
    careers: ["Desainer komunikasi visual", "Desainer antarmuka"],
  },
  {
    id: "sistem-informasi-d",
    name: "Sistem Informasi",
    major: "SISTEM INFORMASI",
    campus: "Universitas Contoh D",
    city: "Kota Contoh 1",
    degree: "S1",
    field: "business",
    interest: "Bisnis Digital & Sistem",
    focus: "Basis Data & Proses Bisnis",
    description:
      "Kartu ilustrasi hubungan teknologi, data, dan kegiatan organisasi; belum memiliki misi khusus.",
    annualCost: { min: 16000000, max: 16000000 },
    costYear: 2026,
    image: "/images/catalog-sistem-informasi.webp",
    mission: null,
    careers: ["Analis proses / operasional", "Pengembang perangkat lunak"],
  },
  {
    id: "logistik-e",
    name: "Teknik Logistik",
    major: "TEKNIK LOGISTIK",
    campus: "Institut Contoh E",
    city: "Kota Contoh 2",
    degree: "S1",
    field: "industry",
    interest: "Distribusi & Pergudangan",
    focus: "Fisika & Matematika Terapan",
    description:
      "Kartu ilustrasi alur distribusi dan penggunaan sumber daya; belum memiliki misi khusus.",
    annualCost: { min: 12500000, max: 12500000 },
    costYear: 2026,
    image: "/images/catalog-logistik.webp",
    mission: null,
    careers: ["Analis proses / operasional", "Perencana produksi"],
  },
  {
    id: "produk-digital-c",
    name: "Desain Produk Digital",
    major: "DESAIN PRODUK DIGITAL",
    campus: "Politeknik Contoh C",
    city: "Kota Contoh 1",
    degree: "D4",
    field: "visual",
    interest: "Riset Pengguna & UI/UX",
    focus: "Kebutuhan Pengguna & Logika Visual",
    description:
      "Kartu ilustrasi perancangan serta pengujian antarmuka; belum memiliki misi khusus.",
    annualCost: { min: 9500000, max: 9500000 },
    costYear: 2026,
    image: "/images/catalog-produk-digital.webp",
    mission: null,
    careers: ["Desainer antarmuka", "Desainer komunikasi visual"],
  },
];

export const initialFilters: CatalogFilters = {
  query: "",
  field: "all",
  city: "all",
  budget: "all",
  savedOnly: false,
  sort: "default",
};
export const budgetLabels: Record<BudgetFilter, string> = {
  all: "Semua Biaya Pendidikan",
  under10: "≤ Rp10 juta / tahun",
  under20: "≤ Rp20 juta / tahun",
  "10to25": "Rp10–25 juta / tahun",
  over25: "> Rp25 juta / tahun",
};
export const fieldLabels: Record<CatalogField, string> = {
  all: "Semua Bidang",
  it: "Informatika & Logika",
  industry: "Teknik & Proses",
  visual: "Seni & Desain",
  business: "Bisnis & Sistem",
};

export function filterPrograms(
  filters: CatalogFilters,
  savedIds: string[] = [],
) {
  const query = filters.query.trim().toLocaleLowerCase("id-ID");
  const result = programs.filter((program) => {
    if (
      query &&
      ![
        program.name,
        program.major,
        program.campus,
        program.city,
        program.degree,
        ...program.careers,
      ]
        .join(" ")
        .toLocaleLowerCase("id-ID")
        .includes(query)
    )
      return false;
    if (filters.field !== "all" && program.field !== filters.field)
      return false;
    if (filters.city !== "all" && program.city !== filters.city) return false;
    if (filters.savedOnly && !savedIds.includes(program.id)) return false;
    if (filters.budget !== "all") {
      if (program.annualCost === null) return false;
      const { min, max } = program.annualCost;
      if (filters.budget === "under10" && max > 10000000) return false;
      if (filters.budget === "under20" && max > 20000000) return false;
      if (filters.budget === "10to25" && (min < 10000000 || max > 25000000))
        return false;
      if (filters.budget === "over25" && min <= 25000000) return false;
    }
    return true;
  });
  if (filters.sort === "name")
    result.sort(
      (a, b) =>
        a.name.localeCompare(b.name, "id-ID") || a.id.localeCompare(b.id),
    );
  if (filters.sort === "cost")
    result.sort(
      (a, b) =>
        (a.annualCost?.max ?? Infinity) - (b.annualCost?.max ?? Infinity) ||
        a.id.localeCompare(b.id),
    );
  return result;
}

export function toggleComparison(
  ids: string[],
  id: string,
): { ids: string[]; error?: string } {
  if (!programs.some((program) => program.id === id))
    return { ids, error: "Pilihan tidak ditemukan dalam katalog." };
  if (ids.includes(id)) return { ids: ids.filter((value) => value !== id) };
  if (ids.length >= 3)
    return {
      ids,
      error:
        "Maksimal 3 prodi. Hapus salah satu pilihan sebelum menambah yang lain.",
    };
  return { ids: [...ids, id] };
}

export function formatRupiah(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}
export function formatCost(program: Program) {
  return program.annualCost
    ? program.annualCost.min === program.annualCost.max
      ? formatRupiah(program.annualCost.min)
      : `${formatRupiah(program.annualCost.min)}–${formatRupiah(program.annualCost.max)}`
    : "Belum tersedia";
}

export type PreviewTask = {
  id: string;
  title: string;
  dueDate: string;
  done: boolean;
  kind: "study" | "mission" | "compare";
};
export type WorkspaceState = {
  version: 1;
  mode: ProfileMode;
  selections: Record<ProfileKey, { savedIds: string[]; compareIds: string[] }>;
  tasks: PreviewTask[];
  reviewApplied: boolean;
  exploration?: ExplorationState;
};
export type ExplorationState = {
  exampleVersion: 1 | 2 | 3;
  aid: Record<ProfileKey, { saved: boolean; task: boolean; done: boolean }>;
};
export function getExploration(state: WorkspaceState): ExplorationState {
  return (
    state.exploration ?? {
      exampleVersion: 2,
      aid: {
        dimas: { saved: false, task: false, done: false },
        rani: { saved: false, task: false, done: false },
        draft: { saved: false, task: false, done: false },
      },
    }
  );
}

export function updateAidReference(
  state: WorkspaceState,
  key: ProfileKey,
  change: Partial<ExplorationState["aid"]["dimas"]>,
): WorkspaceState {
  const current = getExploration(state);
  const next = { ...current.aid[key], ...change };
  if (!next.task) next.done = false;
  return {
    ...state,
    exploration: { ...current, aid: { ...current.aid, [key]: next } },
  };
}
export function selectExampleVersion(
  state: WorkspaceState,
  key: ProfileKey,
  version: 1 | 2 | 3,
): WorkspaceState {
  if (key !== "dimas" || ![1, 2, 3].includes(version)) return state;
  return {
    ...state,
    exploration: { ...getExploration(state), exampleVersion: version },
  };
}

export function togglePinned(
  ids: string[],
  id: string,
): { ids: string[]; error?: string } {
  if (!programs.some((program) => program.id === id))
    return { ids, error: "Pilihan tidak ditemukan dalam katalog." };
  if (ids.includes(id)) return { ids: ids.filter((value) => value !== id) };
  if (ids.length >= 5)
    return {
      ids,
      error:
        "Maksimal 5 prodi tersemat. Lepas satu sematan sebelum menambah pilihan.",
    };
  return { ids: [...ids, id] };
}
export const demoTasks: PreviewTask[] = [
  {
    id: "silabus",
    title: "Tinjau silabus Informatika",
    dueDate: "2026-10-15",
    done: false,
    kind: "study",
  },
  {
    id: "misi",
    title: "Coba aktivitas Teknik Industri",
    dueDate: "2026-10-19",
    done: false,
    kind: "mission",
  },
  {
    id: "bandingkan",
    title: "Bandingkan dua pilihan studi",
    dueDate: "2026-10-22",
    done: false,
    kind: "compare",
  },
];

export function createWorkspaceState(): WorkspaceState {
  return {
    version: 1,
    mode: "auto",
    selections: {
      dimas: {
        savedIds: ["informatika-a", "industri-b"],
        compareIds: ["informatika-a", "industri-b"],
      },
      rani: { savedIds: [], compareIds: [] },
      draft: { savedIds: [], compareIds: [] },
    },
    tasks: demoTasks.map((task) => ({ ...task })),
    reviewApplied: false,
  };
}
export function restoreWorkspace(value: unknown): WorkspaceState | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const candidate = value as Record<string, unknown>;
  if (
    candidate.version !== 1 ||
    !["auto", "dimas", "rani"].includes(String(candidate.mode)) ||
    typeof candidate.reviewApplied !== "boolean" ||
    !candidate.selections ||
    typeof candidate.selections !== "object"
  )
    return null;
  // Older workspace drafts have no exploration extension; retain their choices.
  if (candidate.exploration !== undefined) {
    const extension = candidate.exploration as ExplorationState | null;
    if (
      !extension ||
      typeof extension !== "object" ||
      ![1, 2, 3].includes(extension.exampleVersion) ||
      !extension.aid ||
      typeof extension.aid !== "object"
    )
      return null;
    for (const key of ["dimas", "rani", "draft"] as const) {
      const aid = extension.aid[key];
      if (
        !aid ||
        typeof aid !== "object" ||
        [aid.saved, aid.task, aid.done].some(
          (value) => typeof value !== "boolean",
        ) ||
        (aid.done && !aid.task)
      )
        return null;
    }
  }
  for (const key of ["dimas", "rani", "draft"]) {
    const selection = (candidate.selections as Record<string, unknown>)[key] as
      Record<string, unknown> | undefined;
    if (
      !selection ||
      !Array.isArray(selection.savedIds) ||
      !Array.isArray(selection.compareIds) ||
      selection.compareIds.length > 3
    )
      return null;
    for (const ids of [selection.savedIds, selection.compareIds])
      if (
        new Set(ids).size !== ids.length ||
        !ids.every(
          (id) =>
            typeof id === "string" &&
            programs.some((program) => program.id === id),
        )
      )
        return null;
  }
  if (
    !Array.isArray(candidate.tasks) ||
    candidate.tasks.length !== demoTasks.length ||
    !candidate.tasks.every(
      (task) =>
        task &&
        typeof task === "object" &&
        demoTasks.some(
          (original) =>
            original.id === task.id &&
            original.title === task.title &&
            original.kind === task.kind,
        ) &&
        typeof task.done === "boolean" &&
        validDate(task.dueDate),
    ) ||
    new Set(candidate.tasks.map((task) => task.id)).size !== demoTasks.length
  )
    return null;
  return candidate as WorkspaceState;
}
export function validDate(value: unknown): value is string {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false;
  const date = new Date(`${value}T00:00:00Z`);
  return (
    Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value
  );
}
export function taskIsOverdue(task: PreviewTask, today: string) {
  return !task.done && task.dueDate < today;
}

export function deriveProfile(
  draft: OnboardingDraft,
  mode: ProfileMode,
  hasSufficientInterests: boolean,
) {
  const useDraft = mode === "auto" && Boolean(draft.consent);
  const key: ProfileKey = useDraft
    ? "draft"
    : mode === "rani"
      ? "rani"
      : "dimas";
  const profileSteps = [
    Boolean(
      draft.context.nickname.trim() &&
      draft.context.grade &&
      draft.context.graduationYear,
    ),
    draft.preferencesSkipped ||
      Boolean(
        draft.preferences.regions.length ||
        draft.preferences.budgetMax ||
        draft.preferences.housing !== "unknown",
      ),
    draft.academicsSkipped ||
      draft.academicRecords.some((record) => record.value.trim()),
    Object.keys(draft.answers).length === 12,
  ].filter(Boolean).length;
  return {
    key,
    isDraft: useDraft,
    name: useDraft
      ? draft.context.nickname.trim() || "Siswa"
      : key === "rani"
        ? "Rani"
        : "Dimas",
    grade: useDraft ? draft.context.grade : key === "rani" ? "XII" : "XI",
    missions: key === "dimas" ? 1 : 0,
    hasMissionDraft: key === "dimas",
    profileSteps: useDraft ? profileSteps : key === "dimas" ? 4 : 2,
    sufficient: useDraft ? hasSufficientInterests : key === "dimas",
  };
}
