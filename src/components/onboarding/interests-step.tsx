"use client";

import { useState } from "react";
import {
  dimensions,
  questions,
  ratingLabels,
  summarizeInterests,
  updateAnswer,
  type Answer,
  type OnboardingDraft,
} from "@/lib/onboarding/domain";
import { Notice, StepActions, StepTitle } from "./step-ui";

export function InterestsStep({
  draft,
  update,
  back,
}: {
  draft: OnboardingDraft;
  update: (
    updater: (draft: OnboardingDraft) => OnboardingDraft,
    immediate?: boolean,
  ) => void;
  back: () => void;
}) {
  const [error, setError] = useState("");
  const question = questions[draft.questionIndex];
  const dimension = dimensions.find((item) => item.id === question.dimension)!;
  const answer = draft.answers[question.id];
  const summary = summarizeInterests(draft.answers);
  function choose(value: Answer) {
    update((current) => updateAnswer(current, question.id, value));
    setError("");
  }
  function next(skip = false) {
    if (!skip && answer === undefined) {
      setError("Pilih ketertarikan, Belum tahu, atau Lewati pertanyaan ini.");
      return;
    }
    update((current) => {
      const updated = skip
        ? updateAnswer(current, question.id, "skipped")
        : current;
      return {
        ...updated,
        questionIndex: Math.min(
          current.questionIndex + 1,
          questions.length - 1,
        ),
        step:
          current.questionIndex === questions.length - 1
            ? "summary"
            : "interests",
      };
    }, true);
    setError("");
  }
  return (
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        next();
      }}
      className="flex flex-col gap-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-2.5 py-1 text-caption-badge tracking-wider uppercase ${dimension.tone}`}
        >
          {dimension.title}
        </span>
        <p className="text-label-default text-primary">
          Pertanyaan {draft.questionIndex + 1}{" "}
          <span className="text-caption-meta text-secondary">
            dari {questions.length}
          </span>
        </p>
      </div>
      <div>
        <div
          role="progressbar"
          aria-label="Pertanyaan yang telah ditinjau"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={summary.reviewed}
          className="h-2 w-full overflow-hidden rounded-full bg-secondary-fixed"
        >
          <div
            style={{ width: `${(summary.reviewed / questions.length) * 100}%` }}
            className="h-full rounded-full bg-primary-container transition-[width]"
          />
        </div>
        <p className="mt-2 text-caption-meta text-secondary">
          {summary.answered} jawaban skala ·{" "}
          {summary.reviewed - summary.answered} belum tahu / dilewati
        </p>
      </div>
      <StepTitle
        eyebrow="Langkah 4 dari 4 · Aktivitas Belajar & Minat"
        title={question.prompt}
      >
        Tidak ada jawaban benar atau salah. Jawab sesuai ketertarikanmu saat
        ini, bukan seberapa mahir kamu melakukannya.
      </StepTitle>
      <Notice>
        Belum tahu tetap valid dan tidak dihitung sebagai skor nol. Instrumen
        awal ini belum merupakan tes psikologi tervalidasi.
      </Notice>
      <fieldset className="space-y-3">
        <legend className="sr-only">
          Pilih skala ketertarikan dari 1 hingga 5
        </legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-5">
          {ratingLabels.map((label, index) => {
            const value = (index + 1) as Answer;
            const checked = answer === value;
            return (
              <label
                key={label}
                className={`relative flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 sm:flex-col sm:text-center ${checked ? "border-primary-container bg-status-info-bg" : "border-transparent bg-surface-subtle hover:bg-surface-container"}`}
              >
                <input
                  type="radio"
                  name={`interest-${question.id}`}
                  value={index + 1}
                  checked={checked}
                  onChange={() => choose(value)}
                  className="size-4 shrink-0 accent-primary sm:absolute sm:top-2 sm:left-2"
                />
                <span
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-headline-h3 shadow-sm ${checked ? "bg-primary-container text-white" : "bg-white text-text-primary"}`}
                >
                  {index + 1}
                </span>
                <span
                  className={`text-caption-meta leading-snug ${checked ? "font-semibold text-primary" : "text-text-secondary"}`}
                >
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          aria-pressed={answer === "unknown"}
          onClick={() => choose("unknown")}
          className={`rounded-full border px-4 py-2 text-caption-meta ${answer === "unknown" ? "border-primary bg-status-info-bg text-primary" : "border-border-default bg-surface-subtle text-secondary hover:bg-surface-container"}`}
        >
          Belum tahu
        </button>
        <button
          type="button"
          aria-pressed={answer === "skipped"}
          onClick={() => next(true)}
          className="rounded-full border border-border-default bg-surface-subtle px-4 py-2 text-caption-meta text-secondary hover:bg-surface-container"
        >
          Lewati pertanyaan ini
        </button>
      </div>
      <p aria-live="polite" className="text-caption-meta text-secondary">
        {answer === "unknown"
          ? "Jawaban saat ini: Belum tahu."
          : answer === "skipped"
            ? "Pertanyaan ini ditandai dilewati. Kamu bisa mengubah jawabannya."
            : typeof answer === "number"
              ? `Jawaban saat ini: ${ratingLabels[answer - 1]}.`
              : "Belum memilih jawaban."}
      </p>
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-status-error-bg p-3 text-caption-meta text-status-error-text"
        >
          {error}
        </p>
      )}
      <div className="rounded-xl border border-border-default bg-surface-subtle/70 p-4">
        <h2 className="text-label-default text-text-primary">
          Contoh Aktivitas Nyata
        </h2>
        <p className="mt-1 text-caption-meta leading-relaxed text-text-secondary">
          {question.example}
        </p>
      </div>
      <StepActions
        back={() => {
          setError("");
          if (draft.questionIndex === 0) back();
          else
            update(
              (current) => ({
                ...current,
                questionIndex: current.questionIndex - 1,
              }),
              true,
            );
        }}
        backLabel={
          draft.questionIndex === 0
            ? "Kembali ke Akademik"
            : "Pertanyaan Sebelumnya"
        }
        nextLabel={
          draft.questionIndex === questions.length - 1
            ? "Lihat Ringkasan Minat"
            : "Pertanyaan Berikutnya"
        }
      />
    </form>
  );
}
