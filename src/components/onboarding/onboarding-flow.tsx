"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import {
  CONSENT_VERSION,
  academicErrors,
  validateContext,
  validatePreferences,
  type OnboardingStep,
} from "@/lib/onboarding/domain";
import { useOnboardingDraft } from "@/lib/onboarding/store";
import { ConsentStep } from "./consent-step";
import { ContextStep } from "./context-step";
import { PreferencesStep } from "./preferences-step";
import { AcademicsStep } from "./academics-step";
import { InterestsStep } from "./interests-step";
import { SummaryStep } from "./summary-step";

const navigation = [
  ["context", "Konteks"],
  ["preferences", "Preferensi"],
  ["academics", "Akademik"],
  ["interests", "Minat"],
] as const;

export function OnboardingFlow() {
  const {
    draft,
    hydrated,
    saveState,
    savedAt,
    message,
    update,
    saveNow,
    clearDraft,
  } = useOnboardingDraft();
  const [helpOpen, setHelpOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const current = draft.consent ? draft.step : "consent";
  const index =
    current === "summary"
      ? 4
      : navigation.findIndex(([step]) => step === current);
  const time = savedAt
    ? new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Jakarta",
      }).format(new Date(savedAt))
    : "";
  const status = !hydrated
    ? "Memeriksa draf tab..."
    : saveState === "pending"
      ? "Menyimpan ke tab..."
      : saveState === "saved"
        ? `Tersimpan di tab${time ? ` pukul ${time} WIB` : ""}`
        : saveState === "failed"
          ? "Draf belum tersimpan"
          : "Belum ada draf tersimpan";

  useEffect(() => {
    if (!hydrated) return;
    document
      .getElementById("onboarding-heading")
      ?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [draft.step, draft.questionIndex, hydrated]);

  function goTo(step: OnboardingStep) {
    const target =
      step !== "consent" && !draft.consent
        ? "consent"
        : !["consent", "context"].includes(step) &&
            Object.keys(validateContext(draft.context)).length
          ? "context"
          : step;
    update((currentDraft) => ({ ...currentDraft, step: target }), true);
  }

  function finish() {
    if (Object.keys(validateContext(draft.context)).length) {
      goTo("context");
      return;
    }
    if (
      !draft.preferencesSkipped &&
      Object.keys(validatePreferences(draft.preferences)).length
    ) {
      goTo("preferences");
      return;
    }
    if (
      !draft.academicsSkipped &&
      academicErrors(draft.academicRecords).length
    ) {
      goTo("academics");
      return;
    }
    update(
      (currentDraft) => ({
        ...currentDraft,
        completedAt: new Date().toISOString(),
        step: "summary",
      }),
      true,
    );
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-canvas">
      <header className="sticky top-0 z-40 bg-white/95 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" aria-label="Beranda Nexalora">
            <Brand className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              className="rounded px-2 py-2 text-label-default text-secondary hover:text-text-primary"
            >
              Bantuan
            </button>
            <span
              className="flex size-8 items-center justify-center rounded-full bg-primary text-white"
              aria-label="Pratinjau profil siswa"
            >
              <Icon name="person" className="text-lg" />
            </span>
          </div>
        </div>
      </header>
      <main
        id="main-content"
        className="mx-auto flex w-full max-w-[880px] flex-1 flex-col gap-4 px-4 py-6 sm:px-6 sm:py-8"
      >
        <div className="mx-auto flex w-full max-w-[760px] flex-wrap items-center justify-between gap-2 text-caption-meta text-secondary">
          <span className="rounded-full bg-status-info-bg px-3 py-1.5 text-status-info-text">
            Pratinjau Onboarding · belum terhubung ke akun
          </span>
          <button
            type="button"
            disabled={!hydrated}
            onClick={() => setResetOpen(true)}
            className="rounded px-2 py-1.5 underline underline-offset-2 disabled:opacity-50"
          >
            Hapus Draf
          </button>
        </div>
        <div className="mx-auto flex w-full max-w-[760px] flex-col gap-4">
          <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
            {current !== "consent" && (
              <nav aria-label="Langkah onboarding">
                <ol className="grid grid-cols-4 gap-1 sm:gap-2">
                  {navigation.map(([step, label], itemIndex) => (
                    <li key={step}>
                      <button
                        type="button"
                        disabled={itemIndex > index || !hydrated}
                        aria-current={current === step ? "step" : undefined}
                        onClick={() => goTo(step)}
                        className={`flex w-full flex-col items-center gap-1.5 rounded-lg px-1 py-2 text-[11px] disabled:cursor-default disabled:opacity-50 sm:flex-row sm:justify-center sm:text-label-default ${current === step ? "bg-surface-container-low text-primary" : "text-secondary"}`}
                      >
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full ${itemIndex < index ? "bg-status-success-bg text-status-success-text" : current === step ? "bg-primary-container text-white" : "bg-surface-subtle text-secondary"}`}
                        >
                          {itemIndex < index ? (
                            <Icon name="check" className="text-base" />
                          ) : (
                            itemIndex + 1
                          )}
                        </span>
                        {label}
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                role="status"
                aria-live="polite"
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-caption-meta ${saveState === "failed" ? "bg-status-warning-bg text-status-warning-text" : "bg-surface-subtle text-secondary"}`}
              >
                <span
                  aria-hidden="true"
                  className={`size-1.5 rounded-full ${saveState === "saved" ? "bg-status-success-text" : "bg-secondary"}`}
                />
                {status}
              </span>
              <span className="text-caption-meta text-secondary">
                Draf sementara · hanya di tab ini
              </span>
            </div>
          </div>
          {saveState === "failed" && (
            <div
              role="alert"
              className="rounded-xl bg-status-warning-bg p-4 text-caption-meta leading-relaxed text-status-warning-text"
            >
              <p>{message}</p>
              {draft.consent && (
                <button
                  type="button"
                  onClick={saveNow}
                  className="mt-2 rounded text-label-default underline"
                >
                  Coba Simpan Ulang
                </button>
              )}
            </div>
          )}
          <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
            {current === "consent" && (
              <ConsentStep
                key={hydrated ? "ready" : "loading"}
                draft={draft}
                hydrated={hydrated}
                onAccept={() =>
                  update(
                    (currentDraft) => ({
                      ...currentDraft,
                      consent: {
                        version: CONSENT_VERSION,
                        acceptedAt: new Date().toISOString(),
                      },
                      step: "context",
                    }),
                    true,
                  )
                }
              />
            )}
            {current === "context" && (
              <ContextStep
                draft={draft}
                update={update}
                back={() => goTo("consent")}
                next={() => goTo("preferences")}
              />
            )}
            {current === "preferences" && (
              <PreferencesStep
                draft={draft}
                update={update}
                back={() => goTo("context")}
                next={() =>
                  update(
                    (currentDraft) => ({
                      ...currentDraft,
                      preferencesSkipped: false,
                      step: "academics",
                    }),
                    true,
                  )
                }
                skip={() =>
                  update(
                    (currentDraft) => ({
                      ...currentDraft,
                      preferencesSkipped: true,
                      step: "academics",
                    }),
                    true,
                  )
                }
              />
            )}
            {current === "academics" && (
              <AcademicsStep
                draft={draft}
                update={update}
                back={() => goTo("preferences")}
                next={() =>
                  update(
                    (currentDraft) => ({
                      ...currentDraft,
                      academicsSkipped: false,
                      step: "interests",
                    }),
                    true,
                  )
                }
                skip={() =>
                  update(
                    (currentDraft) => ({
                      ...currentDraft,
                      academicsSkipped: true,
                      step: "interests",
                    }),
                    true,
                  )
                }
              />
            )}
            {current === "interests" && (
              <InterestsStep
                draft={draft}
                update={update}
                back={() => goTo("academics")}
              />
            )}
            {current === "summary" && (
              <SummaryStep draft={draft} goTo={goTo} finish={finish} />
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white px-4 py-6">
        <div className="mx-auto flex max-w-[840px] flex-col justify-between gap-2 text-center text-caption-meta text-secondary sm:flex-row sm:text-left">
          <p>Minat, nilai, dan pertimbangan biaya ditampilkan terpisah.</p>
          <p>© 2026 Nexalora Indonesia.</p>
        </div>
      </footer>
      <Modal
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        labelledBy="onboarding-help-title"
      >
        <div className="space-y-4 p-6 sm:p-8">
          <h2 id="onboarding-help-title" className="text-headline-h2">
            Bantuan Onboarding
          </h2>
          <p className="text-body-default text-secondary">
            Isi konteks dasar, lalu tentukan apakah ingin mengisi preferensi dan
            akademik. Kedua langkah tersebut boleh dilewati.
          </p>
          <p className="text-body-default text-secondary">
            Pada minat, pilih skala 1–5, Belum tahu, atau Lewati. Sedikitnya 2
            jawaban skala pada 3 dari 4 dimensi diperlukan untuk masukan
            personalisasi awal.
          </p>
          <p className="text-body-default text-secondary">
            Draf tersimpan hanya pada tab ini setelah persetujuan. Jika simpan
            gagal, isian tetap tersedia selama halaman terbuka. Jangan
            mengandalkan draf ini sebagai penyimpanan akun.
          </p>
          <button
            type="button"
            onClick={() => setHelpOpen(false)}
            className="w-full rounded-lg bg-primary-container px-4 py-3 text-label-default text-white"
          >
            Mengerti
          </button>
        </div>
      </Modal>
      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        labelledBy="onboarding-reset-title"
      >
        <div className="space-y-4 p-6 sm:p-8">
          <h2 id="onboarding-reset-title" className="text-headline-h2">
            Hapus Draf Onboarding?
          </h2>
          <p className="text-body-default text-secondary">
            Nama, preferensi, nilai, dan jawaban minat dalam draf tab ini akan
            dihapus. Tindakan ini tidak mengubah data akun atau demo lain.
          </p>
          {saveState === "failed" && message.includes("dihapus") && (
            <p
              role="alert"
              className="rounded-lg bg-status-error-bg p-3 text-caption-meta text-status-error-text"
            >
              {message}
            </p>
          )}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setResetOpen(false)}
              className="flex-1 rounded-lg bg-surface-subtle px-4 py-3 text-label-default text-secondary"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={() => {
                if (clearDraft()) setResetOpen(false);
              }}
              className="flex-1 rounded-lg bg-status-error-text px-4 py-3 text-label-default text-white"
            >
              Hapus Draf Ini
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
