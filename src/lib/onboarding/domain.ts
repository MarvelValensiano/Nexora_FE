export const CONSENT_VERSION = "eksplorasi-1";
export const INSTRUMENT_VERSION = "activities-v0.1";
export const steps = [
  "consent",
  "context",
  "preferences",
  "academics",
  "interests",
  "summary",
] as const;
export type OnboardingStep = (typeof steps)[number];
export type DimensionId = "logic" | "process" | "visual" | "collaboration";
export type Answer = 1 | 2 | 3 | 4 | 5 | "unknown" | "skipped";
export type AcademicScale = "100" | "4" | "letter";
export type AcademicRecord = {
  subject: string;
  semester: number;
  scale: AcademicScale;
  value: string;
  status: "provided" | "unknown" | "not_applicable";
};
export type OnboardingDraft = {
  schemaVersion: 1;
  instrumentVersion: typeof INSTRUMENT_VERSION;
  consent: { version: string; acceptedAt: string } | null;
  step: OnboardingStep;
  questionIndex: number;
  context: {
    nickname: string;
    grade: "XI" | "XII" | "other" | "";
    graduationYear: string;
  };
  preferences: {
    regions: string[];
    relocation: "stay" | "open" | "selected" | "";
    housing: "family" | "rent" | "dormitory" | "unknown";
    budgetMin: string;
    budgetMax: string;
    upfrontMax: string;
    scholarshipInterest: boolean;
  };
  preferencesSkipped: boolean;
  academicsSkipped: boolean;
  academicScale: AcademicScale;
  academicSemester: number;
  academicRecords: AcademicRecord[];
  answers: Partial<Record<string, Answer>>;
  answerVersion: number;
  completedAt: string | null;
};

export const dimensions: {
  id: DimensionId;
  title: string;
  mission: string;
  tone: string;
}[] = [
  {
    id: "logic",
    title: "Logika & Sistem",
    mission: "Informatika",
    tone: "bg-pill-informatika-bg text-pill-informatika-text",
  },
  {
    id: "process",
    title: "Proses & Data",
    mission: "Teknik Industri",
    tone: "bg-pill-industri-bg text-pill-industri-text",
  },
  {
    id: "visual",
    title: "Komunikasi Visual",
    mission: "DKV",
    tone: "bg-pill-dkv-bg text-pill-dkv-text",
  },
  {
    id: "collaboration",
    title: "Eksplorasi & Kolaborasi",
    mission: "Lintas bidang",
    tone: "bg-status-info-bg text-status-info-text",
  },
];
export const questions: {
  id: string;
  dimension: DimensionId;
  prompt: string;
  example: string;
}[] = [
  {
    id: "logic-1",
    dimension: "logic",
    prompt:
      "Seberapa menarik bagimu menyusun langkah-langkah berurutan agar sebuah tugas berjalan otomatis?",
    example:
      "Menyusun alur pengingat tugas atau aturan pesanan kantin. Tidak perlu sudah bisa coding.",
  },
  {
    id: "logic-2",
    dimension: "logic",
    prompt:
      "Seberapa tertarik kamu mencoba mencari penyebab suatu aturan menghasilkan hasil yang berbeda dari harapan?",
    example:
      "Mencari mengapa tiket pesanan tetap muncul saat pembayaran belum berhasil.",
  },
  {
    id: "logic-3",
    dimension: "logic",
    prompt:
      "Seberapa tertarik kamu membandingkan beberapa cara untuk menyelesaikan masalah yang sama?",
    example:
      "Membandingkan dua susunan langkah agar pencatatan pesanan tidak terlewat.",
  },
  {
    id: "process-1",
    dimension: "process",
    prompt:
      "Seberapa menarik bagimu mencari bagian proses yang membuat antrean menjadi panjang?",
    example:
      "Mengamati apakah antrean tertahan saat memesan, menyiapkan, atau menyerahkan makanan.",
  },
  {
    id: "process-2",
    dimension: "process",
    prompt:
      "Seberapa tertarik kamu membaca data sederhana untuk mencoba memperbaiki sebuah kegiatan?",
    example:
      "Membandingkan jumlah pesanan selesai sebelum dan setelah pembagian petugas berubah.",
  },
  {
    id: "process-3",
    dimension: "process",
    prompt:
      "Seberapa menarik bagimu mencoba membagi sumber daya yang terbatas untuk beberapa kebutuhan?",
    example:
      "Membagi empat petugas ke tiga tahap pelayanan dan mengamati akibatnya.",
  },
  {
    id: "visual-1",
    dimension: "visual",
    prompt:
      "Seberapa tertarik kamu menata informasi agar orang lain lebih cepat memahaminya?",
    example:
      "Menata nama menu, kategori, dan harga sehingga mudah ditemukan saat antre.",
  },
  {
    id: "visual-2",
    dimension: "visual",
    prompt:
      "Seberapa menarik bagimu mencoba berbagai ukuran teks, warna, atau tata letak untuk menyampaikan pesan?",
    example:
      "Membandingkan dua susunan poster. Tidak perlu sudah bisa menggambar.",
  },
  {
    id: "visual-3",
    dimension: "visual",
    prompt:
      "Seberapa tertarik kamu memperbaiki rancangan setelah melihat cara orang lain membacanya?",
    example:
      "Mengubah menu setelah teman kesulitan menemukan makanan sesuai anggarannya.",
  },
  {
    id: "collaboration-1",
    dimension: "collaboration",
    prompt:
      "Seberapa menarik bagimu mendiskusikan beberapa solusi dan alasan memilih salah satunya?",
    example:
      "Membahas pertimbangan di balik dua usulan perbaikan kantin bersama teman.",
  },
  {
    id: "collaboration-2",
    dimension: "collaboration",
    prompt:
      "Seberapa tertarik kamu mencoba aktivitas yang belum familiar sebelum menentukan pendapat?",
    example:
      "Mencoba menyusun alur logika atau menu meskipun belum pernah melakukannya.",
  },
  {
    id: "collaboration-3",
    dimension: "collaboration",
    prompt:
      "Seberapa menarik bagimu meminta umpan balik lalu memikirkan langkah belajar selanjutnya?",
    example:
      "Meminta teman mencoba hasil kerjamu dan mencatat hal yang ingin dipelajari lagi.",
  },
];
export const regions = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "DI Yogyakarta",
  "Jawa Timur",
  "Banten",
  "Bali",
  "Sumatera Utara",
  "Sumatera Barat",
  "Sumatera Selatan",
  "Kalimantan Timur",
  "Sulawesi Selatan",
];
export const subjects = [
  "Matematika Umum",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Informatika / Komputer",
  "Fisika",
  "Matematika Lanjut",
];
export const ratingLabels = [
  "Sangat tidak tertarik",
  "Kurang tertarik",
  "Netral",
  "Tertarik",
  "Sangat tertarik",
];

export function createEmptyDraft(): OnboardingDraft {
  return {
    schemaVersion: 1,
    instrumentVersion: INSTRUMENT_VERSION,
    consent: null,
    step: "consent",
    questionIndex: 0,
    context: { nickname: "", grade: "", graduationYear: "" },
    preferences: {
      regions: [],
      relocation: "",
      housing: "unknown",
      budgetMin: "",
      budgetMax: "",
      upfrontMax: "",
      scholarshipInterest: false,
    },
    preferencesSkipped: false,
    academicsSkipped: false,
    academicScale: "100",
    academicSemester: 1,
    academicRecords: [],
    answers: {},
    answerVersion: 1,
    completedAt: null,
  };
}

// Empty is unknown. Zero is a deliberate amount and remains zero.
export function parseBudget(value: string): number | null | "invalid" {
  const text = value.trim();
  if (!text) return null;
  if (!/^(?:\d+|\d{1,3}(?:\.\d{3})+)$/.test(text)) return "invalid";
  const amount = Number(text.replaceAll(".", ""));
  return Number.isSafeInteger(amount) && amount >= 0 ? amount : "invalid";
}

export function validateContext(context: OnboardingDraft["context"]) {
  const errors: Record<string, string> = {};
  const length = Array.from(context.nickname.trim()).length;
  if (length < 1 || length > 30)
    errors.nickname = "Gunakan nama panggilan 1–30 karakter.";
  if (!["XI", "XII", "other"].includes(context.grade))
    errors.grade = "Pilih tingkat kelasmu.";
  if (
    !/^\d{4}$/.test(context.graduationYear) ||
    Number(context.graduationYear) < 2020 ||
    Number(context.graduationYear) > 2100
  )
    errors.graduationYear = "Masukkan tahun kelulusan antara 2020 dan 2100.";
  return errors;
}

export function validatePreferences(
  preferences: OnboardingDraft["preferences"],
) {
  const errors: Record<string, string> = {};
  const min = parseBudget(preferences.budgetMin),
    max = parseBudget(preferences.budgetMax),
    upfront = parseBudget(preferences.upfrontMax);
  if (min === "invalid")
    errors.budgetMin = "Isi rupiah bulat tanpa desimal, misalnya 1.500.000.";
  if (max === "invalid")
    errors.budgetMax = "Isi rupiah bulat tanpa desimal, misalnya 3.000.000.";
  if (upfront === "invalid")
    errors.upfrontMax = "Biaya awal harus berupa rupiah bulat, minimal 0.";
  if (typeof min === "number" && typeof max === "number" && min > max)
    errors.budgetMax = "Batas maksimum tidak boleh lebih kecil dari minimum.";
  if (preferences.relocation === "selected" && preferences.regions.length === 0)
    errors.regions =
      "Pilih sedikitnya satu wilayah atau ubah preferensi merantau.";
  return errors;
}

export function isValidAcademic(record: AcademicRecord) {
  if (record.status !== "provided" || !record.value.trim()) return true;
  if (record.scale === "letter") return /^[A-E]$/i.test(record.value.trim());
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(record.value.trim())) return false;
  const value = Number(record.value.replace(",", "."));
  return value >= 0 && value <= Number(record.scale);
}

export function academicErrors(records: AcademicRecord[]) {
  return records
    .filter((record) => !isValidAcademic(record))
    .map(
      (record) =>
        `${record.subject} · Semester ${record.semester}: gunakan ${record.scale === "letter" ? "predikat A–E" : `nilai 0–${record.scale}`} sesuai skala asal.`,
    );
}

export function summarizeInterests(answers: OnboardingDraft["answers"]) {
  const summary = dimensions.map((dimension) => {
    const items = questions.filter(
      (question) => question.dimension === dimension.id,
    );
    const evidence = items.flatMap((question) => {
      const answer = answers[question.id];
      return typeof answer === "number" && answer >= 1 && answer <= 5
        ? [{ question, value: answer }]
        : [];
    });
    return {
      ...dimension,
      answered: evidence.length,
      available: evidence.length >= 2,
      liked: evidence.filter((item) => item.value >= 4).length,
      evidence,
    };
  });
  return {
    dimensions: summary,
    answered: summary.reduce(
      (total, dimension) => total + dimension.answered,
      0,
    ),
    reviewed: questions.filter((question) => answers[question.id] !== undefined)
      .length,
    availableDimensions: summary.filter((dimension) => dimension.available)
      .length,
    sufficient: summary.filter((dimension) => dimension.available).length >= 3,
  };
}

export function updateAnswer(
  draft: OnboardingDraft,
  questionId: string,
  answer: Answer,
): OnboardingDraft {
  if (
    !questions.some((question) => question.id === questionId) ||
    draft.answers[questionId] === answer
  )
    return draft;
  return {
    ...draft,
    answers: { ...draft.answers, [questionId]: answer },
    answerVersion: draft.answerVersion + 1,
    completedAt: null,
  };
}

export function upsertAcademic(
  draft: OnboardingDraft,
  subject: string,
  changes: Partial<Pick<AcademicRecord, "value" | "status">>,
): OnboardingDraft {
  const found = draft.academicRecords.find(
    (record) =>
      record.subject === subject && record.semester === draft.academicSemester,
  );
  const record: AcademicRecord = {
    subject,
    semester: draft.academicSemester,
    scale: found?.value ? found.scale : draft.academicScale,
    value: "",
    status: "provided",
    ...found,
    ...changes,
  };
  if (changes.value !== undefined && !found?.value)
    record.scale = draft.academicScale;
  return {
    ...draft,
    academicsSkipped: false,
    academicRecords: [
      ...draft.academicRecords.filter(
        (item) =>
          !(
            item.subject === subject && item.semester === draft.academicSemester
          ),
      ),
      record,
    ],
    completedAt: null,
  };
}

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown, max = 500): value is string {
  return typeof value === "string" && value.length <= max;
}
function isoDate(value: unknown): value is string {
  return text(value, 40) && Number.isFinite(Date.parse(value));
}

// Browser drafts are untrusted input. Reject incompatible or malformed versions.
export function restoreDraft(value: unknown): OnboardingDraft | null {
  if (
    !object(value) ||
    value.schemaVersion !== 1 ||
    value.instrumentVersion !== INSTRUMENT_VERSION ||
    !steps.includes(value.step as OnboardingStep)
  )
    return null;
  const { context: c, preferences: p, consent } = value;
  if (
    !object(c) ||
    !text(c.nickname, 100) ||
    !["", "XI", "XII", "other"].includes(String(c.grade)) ||
    !text(c.graduationYear, 10)
  )
    return null;
  if (
    !object(p) ||
    !Array.isArray(p.regions) ||
    p.regions.length > regions.length ||
    !p.regions.every(
      (region) => typeof region === "string" && regions.includes(region),
    ) ||
    new Set(p.regions).size !== p.regions.length
  )
    return null;
  if (
    !["", "stay", "open", "selected"].includes(String(p.relocation)) ||
    !["family", "rent", "dormitory", "unknown"].includes(String(p.housing)) ||
    !text(p.budgetMin, 50) ||
    !text(p.budgetMax, 50) ||
    !text(p.upfrontMax, 50) ||
    typeof p.scholarshipInterest !== "boolean"
  )
    return null;
  if (
    consent !== null &&
    (!object(consent) ||
      consent.version !== CONSENT_VERSION ||
      !isoDate(consent.acceptedAt))
  )
    return null;
  if (consent === null && value.step !== "consent") return null;
  if (
    !Number.isInteger(value.questionIndex) ||
    Number(value.questionIndex) < 0 ||
    Number(value.questionIndex) >= questions.length ||
    !Number.isSafeInteger(value.answerVersion) ||
    Number(value.answerVersion) < 1
  )
    return null;
  if (
    !["100", "4", "letter"].includes(String(value.academicScale)) ||
    !Number.isInteger(value.academicSemester) ||
    Number(value.academicSemester) < 1 ||
    Number(value.academicSemester) > 6 ||
    typeof value.preferencesSkipped !== "boolean" ||
    typeof value.academicsSkipped !== "boolean"
  )
    return null;
  if (
    !Array.isArray(value.academicRecords) ||
    value.academicRecords.length > subjects.length * 6 ||
    !value.academicRecords.every(
      (record) =>
        object(record) &&
        subjects.includes(String(record.subject)) &&
        Number.isInteger(record.semester) &&
        Number(record.semester) >= 1 &&
        Number(record.semester) <= 6 &&
        ["100", "4", "letter"].includes(String(record.scale)) &&
        text(record.value, 30) &&
        ["provided", "unknown", "not_applicable"].includes(
          String(record.status),
        ),
    )
  )
    return null;
  if (
    new Set(
      value.academicRecords.map(
        (record) => `${record.subject}:${record.semester}`,
      ),
    ).size !== value.academicRecords.length
  )
    return null;
  if (
    !object(value.answers) ||
    !Object.entries(value.answers).every(
      ([key, answer]) =>
        questions.some((question) => question.id === key) &&
        [1, 2, 3, 4, 5, "unknown", "skipped"].includes(answer as Answer),
    )
  )
    return null;
  if (value.completedAt !== null && !isoDate(value.completedAt)) return null;
  if (
    value.step !== "consent" &&
    value.step !== "context" &&
    Object.keys(validateContext(c as OnboardingDraft["context"])).length
  )
    return null;
  return value as OnboardingDraft;
}
