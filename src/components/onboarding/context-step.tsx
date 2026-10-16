"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { validateContext, type OnboardingDraft } from "@/lib/onboarding/domain";
import {
  ChoiceGroup,
  FieldError,
  StepActions,
  StepTitle,
  fieldClass,
} from "./step-ui";

export function ContextStep({
  draft,
  update,
  next,
  back,
}: {
  draft: OnboardingDraft;
  update: (updater: (draft: OnboardingDraft) => OnboardingDraft) => void;
  next: () => void;
  back: () => void;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);
  function change(values: Partial<OnboardingDraft["context"]>) {
    update((current) => ({
      ...current,
      context: { ...current.context, ...values },
      completedAt: null,
    }));
    setErrors({});
  }
  return (
    <form
      ref={form}
      method="post"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const result = validateContext(draft.context);
        setErrors(result);
        if (Object.keys(result).length) {
          form.current
            ?.querySelector<HTMLElement>(`[name="${Object.keys(result)[0]}"]`)
            ?.focus();
          return;
        }
        next();
      }}
      className="flex flex-col gap-6"
    >
      <StepTitle
        eyebrow="Langkah 1 dari 4 · Profil Dasar"
        title="Ceritakan sedikit tentang dirimu"
      >
        Nama panggilan dan jenjang sekolah memberi konteks untuk perjalanan
        eksplorasi belajarmu.
      </StepTitle>
      <div className="space-y-1.5">
        <label
          htmlFor="nickname-input"
          className="text-body-strong text-text-primary"
        >
          Nama Panggilanmu
        </label>
        <p id="nickname-help" className="text-caption-meta text-text-secondary">
          1–30 karakter. Tidak harus nama lengkap resmi.
        </p>
        <div className="relative">
          <input
            id="nickname-input"
            name="nickname"
            value={draft.context.nickname}
            onChange={(event) => change({ nickname: event.target.value })}
            maxLength={60}
            autoComplete="nickname"
            placeholder="Nama panggilan"
            required
            aria-invalid={Boolean(errors.nickname)}
            aria-describedby={
              errors.nickname ? "nickname-error" : "nickname-help"
            }
            className={`${fieldClass} pr-12`}
          />
          {draft.context.nickname && (
            <button
              type="button"
              aria-label="Hapus nama panggilan"
              onClick={() => {
                change({ nickname: "" });
                form.current
                  ?.querySelector<HTMLInputElement>("#nickname-input")
                  ?.focus();
              }}
              className="absolute inset-y-0 right-1 flex w-10 items-center justify-center rounded text-secondary"
            >
              <Icon name="close" className="text-lg" />
            </button>
          )}
        </div>
        <FieldError id="nickname-error" message={errors.nickname} />
      </div>
      <div>
        <ChoiceGroup
          name="grade"
          errorId={errors.grade ? "grade-error" : undefined}
          legend="Kamu saat ini duduk di kelas berapa?"
          value={draft.context.grade}
          onChange={(grade) => change({ grade })}
          options={[
            {
              value: "XI",
              label: "Kelas XI",
              description: "Mulai mengenali aktivitas dan pilihan studi.",
            },
            {
              value: "XII",
              label: "Kelas XII",
              description: "Tinjau studi, kesiapan, dan langkah berikutnya.",
            },
            {
              value: "other",
              label: "Lainnya",
              description: "Tetap bisa mengikuti alur eksplorasi.",
            },
          ]}
        />
        <FieldError id="grade-error" message={errors.grade} />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="graduation-year"
          className="text-body-strong text-text-primary"
        >
          Perkiraan tahun kamu lulus SMA/MA/SMK
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[2026, 2027, 2028].map((year) => (
            <button
              key={year}
              type="button"
              aria-pressed={draft.context.graduationYear === String(year)}
              onClick={() => change({ graduationYear: String(year) })}
              className={`rounded-lg border px-3 py-2.5 text-headline-h3 ${draft.context.graduationYear === String(year) ? "border-primary bg-status-info-bg text-primary" : "border-border-default bg-surface-subtle text-secondary hover:bg-surface-container-low"}`}
            >
              {year}
            </button>
          ))}
        </div>
        <input
          id="graduation-year"
          name="graduationYear"
          type="number"
          min="2020"
          max="2100"
          required
          value={draft.context.graduationYear}
          onChange={(event) => change({ graduationYear: event.target.value })}
          placeholder="Atau isi tahun lain"
          aria-invalid={Boolean(errors.graduationYear)}
          aria-describedby={
            errors.graduationYear ? "graduation-year-error" : undefined
          }
          className={fieldClass}
        />
        <FieldError
          id="graduation-year-error"
          message={errors.graduationYear}
        />
      </div>
      <StepActions back={back} nextLabel="Lanjut ke Preferensi" />
      <p className="text-center text-caption-meta text-text-secondary">
        Konteks kelas dan tahun kelulusan tidak digunakan untuk memeringkat
        minatmu.
      </p>
    </form>
  );
}
