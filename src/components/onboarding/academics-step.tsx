"use client";

import { useState } from "react";
import {
  academicErrors,
  isValidAcademic,
  subjects,
  upsertAcademic,
  type AcademicRecord,
  type AcademicScale,
  type OnboardingDraft,
} from "@/lib/onboarding/domain";
import { Notice, StepActions, StepTitle, fieldClass } from "./step-ui";

export function AcademicsStep({
  draft,
  update,
  next,
  back,
  skip,
}: {
  draft: OnboardingDraft;
  update: (updater: (draft: OnboardingDraft) => OnboardingDraft) => void;
  next: () => void;
  back: () => void;
  skip: () => void;
}) {
  const [errors, setErrors] = useState<string[]>([]);
  function setRecord(
    subject: string,
    changes: Partial<Pick<AcademicRecord, "value" | "status">>,
  ) {
    update((current) => upsertAcademic(current, subject, changes));
    setErrors([]);
  }
  const filled = draft.academicRecords.filter(
    (record) =>
      record.status === "provided" &&
      record.value.trim() &&
      isValidAcademic(record),
  );
  return (
    <form
      method="post"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const result = academicErrors(draft.academicRecords);
        setErrors(result);
        if (result.length) {
          document.getElementById("academic-errors")?.focus();
          return;
        }
        next();
      }}
      className="flex flex-col gap-6"
    >
      <StepTitle
        eyebrow="Langkah 3 dari 4 · Eksplorasi Akademik"
        title="Kesiapan Akademik (Nilai Rapor / Perkiraan)"
      >
        Nilai dicatat sebagai bekal belajar yang terpisah dari minat. Kamu bisa
        mengisi sebagian, menandai belum tahu, atau melewati langkah ini.
      </StepTitle>
      <Notice>
        Masukkan nilai per pelajaran dan semester. Nilai tidak dikonversi
        otomatis antar-skala dan tidak digunakan sebagai prediksi diterima
        kampus.
      </Notice>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="academic-semester"
            className="text-body-strong text-text-primary"
          >
            Semester
          </label>
          <select
            id="academic-semester"
            value={draft.academicSemester}
            onChange={(event) => {
              update((current) => ({
                ...current,
                academicSemester: Number(event.target.value),
              }));
              setErrors([]);
            }}
            className={fieldClass}
          >
            {[1, 2, 3, 4, 5, 6].map((semester) => (
              <option key={semester} value={semester}>
                Semester {semester}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="academic-scale"
            className="text-body-strong text-text-primary"
          >
            Skala untuk Isian Baru / Kosong
          </label>
          <select
            id="academic-scale"
            value={draft.academicScale}
            onChange={(event) =>
              update((current) => ({
                ...current,
                academicScale: event.target.value as AcademicScale,
              }))
            }
            className={fieldClass}
          >
            <option value="100">Skala 0–100</option>
            <option value="4">Skala 0–4,00</option>
            <option value="letter">Predikat Huruf A–E</option>
          </select>
        </div>
      </div>
      <p className="text-caption-meta text-text-secondary">
        Nilai yang sudah diisi mempertahankan skala asal. Kosongkan nilainya
        terlebih dahulu jika ingin mengganti skala.
      </p>
      {errors.length > 0 && (
        <div
          id="academic-errors"
          tabIndex={-1}
          role="alert"
          className="rounded-lg bg-status-error-bg p-3 text-caption-meta text-status-error-text"
        >
          <ul className="list-disc space-y-1 pl-4">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex flex-col gap-3">
        {subjects.map((subject, index) => {
          const record = draft.academicRecords.find(
            (item) =>
              item.subject === subject &&
              item.semester === draft.academicSemester,
          );
          const scale = record?.value ? record.scale : draft.academicScale;
          const value = record?.status === "provided" ? record.value : "";
          const invalid = record ? !isValidAcademic(record) : false;
          const status =
            record?.status === "unknown"
              ? "Belum tahu"
              : record?.status === "not_applicable"
                ? "Tidak berlaku"
                : value?.trim()
                  ? invalid
                    ? "Periksa nilai"
                    : "Terisi"
                  : "Belum diisi";
          return (
            <section
              key={subject}
              className="rounded-xl bg-surface-container-low p-3 sm:p-4"
            >
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <label
                    htmlFor={`academic-${index}`}
                    className="text-body-strong text-text-primary"
                  >
                    {subject}
                  </label>
                  <p
                    id={`academic-help-${index}`}
                    className="mt-1 text-caption-meta text-text-secondary"
                  >
                    Semester {draft.academicSemester} ·{" "}
                    {scale === "letter" ? "Predikat A–E" : `Skala 0–${scale}`}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <input
                    id={`academic-${index}`}
                    type="text"
                    inputMode={scale === "letter" ? "text" : "decimal"}
                    maxLength={10}
                    value={value || ""}
                    onChange={(event) =>
                      setRecord(subject, {
                        value: event.target.value,
                        status: "provided",
                      })
                    }
                    placeholder={scale === "letter" ? "A–E" : "Nilai"}
                    aria-invalid={invalid}
                    aria-describedby={`academic-help-${index} academic-status-${index}`}
                    className={`${fieldClass} max-w-28 bg-white text-center`}
                  />
                  <span
                    id={`academic-status-${index}`}
                    className={`rounded-full px-2 py-1 text-caption-badge ${invalid ? "bg-status-error-bg text-status-error-text" : status === "Terisi" ? "bg-status-success-bg text-status-success-text" : "bg-white text-secondary"}`}
                  >
                    {status}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap justify-end gap-2">
                {[
                  ["unknown", "Belum tahu"],
                  ["not_applicable", "Tidak berlaku di kurikulumku"],
                ].map(([statusValue, label]) => (
                  <button
                    key={statusValue}
                    type="button"
                    onClick={() =>
                      setRecord(subject, {
                        value: "",
                        status: statusValue as AcademicRecord["status"],
                      })
                    }
                    className="rounded bg-white px-2 py-1 text-caption-meta text-secondary hover:bg-surface-subtle"
                  >
                    {label}
                  </button>
                ))}
                {value && (
                  <button
                    type="button"
                    onClick={() =>
                      setRecord(subject, { value: "", status: "provided" })
                    }
                    className="rounded bg-white px-2 py-1 text-caption-meta text-secondary hover:bg-surface-subtle"
                  >
                    Kosongkan
                  </button>
                )}
              </div>
            </section>
          );
        })}
      </div>
      <div className="rounded-xl bg-surface-container-low p-4">
        <h2 className="text-body-strong text-text-primary">
          {filled.length} Catatan Nilai Terisi
        </h2>
        <p className="mt-1 text-caption-meta text-text-secondary">
          Dari {new Set(filled.map((record) => record.subject)).size} mata
          pelajaran. Tidak ada rata-rata lintas pelajaran atau penilaian
          kemampuan otomatis.
        </p>
      </div>
      <StepActions back={back} skip={skip} nextLabel="Lanjut ke Minat" />
    </form>
  );
}
