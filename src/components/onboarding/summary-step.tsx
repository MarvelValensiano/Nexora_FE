"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import {
  isValidAcademic,
  parseBudget,
  questions,
  ratingLabels,
  subjects,
  summarizeInterests,
  type OnboardingDraft,
  type OnboardingStep,
} from "@/lib/onboarding/domain";
import { Notice, StepTitle } from "./step-ui";

function money(value: string) {
  const amount = parseBudget(value);
  return typeof amount === "number"
    ? new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(amount)
    : "Belum diketahui";
}

export function SummaryStep({
  draft,
  goTo,
  finish,
}: {
  draft: OnboardingDraft;
  goTo: (step: OnboardingStep) => void;
  finish: () => void;
}) {
  const summary = summarizeInterests(draft.answers);
  const filled = draft.academicRecords.filter(
    (record) =>
      record.status === "provided" &&
      record.value.trim() &&
      isValidAcademic(record),
  );
  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <span className="mb-3 inline-flex rounded-full bg-primary-fixed px-3 py-1 text-caption-badge tracking-wider text-on-primary-fixed uppercase">
          Hasil Eksplorasi Awal
        </span>
        <StepTitle title="Peta Minat Belajarmu">
          Ringkasan dari aktivitas yang kamu nyatakan menarik saat ini. Jawaban
          dapat ditinjau dan diubah kembali.
        </StepTitle>
      </div>
      <Notice>
        Ringkasan ini bukan tes bakat, penentu IQ, persentase kecocokan, atau
        jaminan diterima kampus. Nilai dan biaya tidak mengubah ketertarikanmu.
      </Notice>
      <div className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container-low p-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full border-4 border-primary-container bg-white text-headline-h3 text-text-primary">
            {summary.answered}/12
          </span>
          <div>
            <h2 className="text-headline-h3 text-text-primary">
              Jawaban Minat yang Tersedia
            </h2>
            <p className="text-caption-meta text-secondary">
              {summary.availableDimensions} dari 4 dimensi memiliki sedikitnya 2
              jawaban skala.
            </p>
          </div>
        </div>
        <span className="self-start rounded-full bg-white px-3 py-1 text-caption-badge text-secondary">
          Instrumen {draft.instrumentVersion} · versi jawaban{" "}
          {draft.answerVersion}
        </span>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {summary.dimensions.map((dimension) => (
          <section
            key={dimension.id}
            className="flex flex-col gap-4 rounded-xl border border-border-default bg-white p-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h2 className="text-headline-h3 text-text-primary">
                {dimension.title}
              </h2>
              <span
                className={`rounded-full px-2 py-1 text-caption-badge ${dimension.tone}`}
              >
                {dimension.answered}/3 terjawab
              </span>
            </div>
            <p className="text-caption-meta text-secondary">
              {dimension.available
                ? `${dimension.liked} dari ${dimension.answered} jawaban tersedia menyatakan Tertarik / Sangat tertarik.`
                : "Data dimensi belum cukup. Lengkapi sedikitnya 2 dari 3 aktivitas untuk ringkasan dimensi ini."}
            </p>
            <div className="rounded-lg bg-surface-subtle p-3">
              <h3 className="text-caption-badge tracking-wider text-secondary uppercase">
                Bukti Jawabanmu
              </h3>
              {dimension.evidence.length > 0 ? (
                <ul className="mt-2 space-y-3">
                  {dimension.evidence.map(({ question, value }) => (
                    <li
                      key={question.id}
                      className="text-caption-meta leading-relaxed text-secondary"
                    >
                      <p>{question.prompt}</p>
                      <p className="mt-1 font-semibold text-text-primary">
                        {ratingLabels[value - 1]} ({value}/5)
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-caption-meta text-secondary">
                  Belum ada jawaban skala. Belum tahu dan Lewati tidak menjadi
                  nilai nol.
                </p>
              )}
            </div>
            <Link
              href="/#simulasi-misi"
              className="mt-auto flex items-center justify-between gap-2 rounded-lg border border-border-subtle p-2 text-label-default text-primary hover:bg-surface-subtle"
            >
              <span>Contoh aktivitas: {dimension.mission}</span>
              <Icon name="chevron_right" className="text-lg" />
            </Link>
          </section>
        ))}
      </div>
      <section className="space-y-4 rounded-xl bg-surface-container-low p-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-headline-h3 text-text-primary">
            Konteks &amp; Bekal yang Kamu Isi
          </h2>
          <button
            type="button"
            onClick={() => goTo("context")}
            className="rounded text-label-default text-primary underline"
          >
            Ubah
          </button>
        </div>
        <p className="text-body-default text-secondary">
          {draft.context.nickname} ·{" "}
          {draft.context.grade === "other"
            ? "Kelas lainnya"
            : `Kelas ${draft.context.grade}`}{" "}
          · Kelulusan {draft.context.graduationYear}
        </p>
        <div className="rounded-lg bg-white p-3">
          <h3 className="text-body-strong text-text-primary">
            Preferensi Praktis
          </h3>
          {draft.preferencesSkipped ? (
            <p className="mt-1 text-caption-meta text-secondary">
              Langkah dilewati. Draf preferensi tidak digunakan.
            </p>
          ) : (
            <div className="mt-2 space-y-1 text-caption-meta text-secondary">
              <p>
                Wilayah:{" "}
                {draft.preferences.regions.join(", ") || "Belum ditentukan"}
              </p>
              <p>
                Anggaran bulanan: {money(draft.preferences.budgetMin)} –{" "}
                {money(draft.preferences.budgetMax)}
              </p>
              <p>Batas biaya awal: {money(draft.preferences.upfrontMax)}</p>
              <p>
                Minat bantuan pendidikan:{" "}
                {draft.preferences.scholarshipInterest
                  ? "Ingin mengeksplorasi; bantuan belum diperoleh"
                  : "Belum ditentukan"}
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => goTo("preferences")}
            className="mt-3 rounded text-label-default text-primary underline"
          >
            Tinjau Preferensi
          </button>
        </div>
        <div className="rounded-lg bg-white p-3">
          <h3 className="text-body-strong text-text-primary">
            Riwayat Akademik
          </h3>
          {draft.academicsSkipped || filled.length === 0 ? (
            <p className="mt-1 text-caption-meta text-secondary">
              Kesiapan akademik belum diisi atau langkah dilewati. Ini tidak
              mengurangi minat.
            </p>
          ) : (
            <ul className="mt-2 space-y-2 text-caption-meta text-secondary">
              {subjects
                .filter((subject) =>
                  filled.some((record) => record.subject === subject),
                )
                .map((subject) => {
                  const records = filled
                    .filter((record) => record.subject === subject)
                    .sort((a, b) => a.semester - b.semester);
                  return (
                    <li key={subject}>
                      <strong className="text-text-primary">{subject}</strong> ·{" "}
                      {records.length} semester
                      <ul className="mt-1 space-y-1 pl-3">
                        {records.map((record) => (
                          <li key={record.semester}>
                            Semester {record.semester}: {record.value}{" "}
                            {record.scale === "letter"
                              ? "(predikat huruf)"
                              : `(skala 0–${record.scale})`}
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
            </ul>
          )}
          <button
            type="button"
            onClick={() => goTo("academics")}
            className="mt-3 rounded text-label-default text-primary underline"
          >
            Tinjau Akademik
          </button>
        </div>
      </section>
      <section className="relative overflow-hidden rounded-xl border border-border-subtle bg-white p-5 shadow-sm">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-container to-hero-gradient-end" />
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-caption-badge ${summary.sufficient ? "bg-status-success-bg text-status-success-text" : "bg-status-warning-bg text-status-warning-text"}`}
        >
          {summary.sufficient
            ? "Data minat cukup untuk eksplorasi awal"
            : "Jawaban minat belum cukup"}
        </span>
        <h2 className="mt-3 text-headline-h2 text-text-primary">
          {summary.sufficient
            ? "Siap Melanjutkan Eksplorasi?"
            : "Kamu Tetap Bisa Menjelajah"}
        </h2>
        <p className="mt-2 text-body-default text-secondary">
          {summary.sufficient
            ? "Ringkasan ini dapat menjadi masukan rekomendasi ketika layanan personalisasi tersedia. Kamu tetap memegang pilihanmu."
            : "Kami belum punya cukup jawaban untuk menyusun rekomendasi personal. Jawab beberapa aktivitas lagi atau lihat contoh misi umum."}
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={finish}
            className="rounded-lg bg-primary-container px-5 py-3 text-label-default text-white hover:bg-primary"
          >
            {draft.completedAt
              ? "Perbarui Ringkasan di Tab"
              : "Selesaikan Onboarding"}
          </button>
          <button
            type="button"
            onClick={() => goTo("interests")}
            className="rounded-lg bg-surface-subtle px-4 py-3 text-label-default text-primary hover:bg-surface-container"
          >
            Ubah Jawaban Minat
          </button>
        </div>
      </section>
      {draft.completedAt && (
        <div
          role="status"
          className="space-y-3 rounded-xl bg-status-success-bg p-4 text-status-success-text"
        >
          <h2 className="text-headline-h3">
            Alur onboarding telah selesai ditinjau.
          </h2>
          <p className="text-body-default">
            Ringkasan belum tersimpan ke akun. Status penyimpanan draf di tab
            dapat dilihat di atas. Layanan rekomendasi personal masih akan
            dihubungkan.
          </p>
          <Link
            href="/beranda"
            className="inline-flex items-center gap-1 rounded text-label-default underline"
          >
            Buka Beranda Eksplorasi
            <Icon name="arrow_forward" className="text-base" />
          </Link>
        </div>
      )}
      <p className="text-center text-caption-meta text-secondary">
        {questions.length} aktivitas · 4 dimensi · pilihan dapat ditinjau ulang
        setelah mencoba pengalaman belajar.
      </p>
    </div>
  );
}
