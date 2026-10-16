"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import {
  regions,
  validatePreferences,
  type OnboardingDraft,
} from "@/lib/onboarding/domain";
import {
  ChoiceGroup,
  FieldError,
  Notice,
  StepActions,
  StepTitle,
  fieldClass,
} from "./step-ui";

export function PreferencesStep({
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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const form = useRef<HTMLFormElement>(null);
  const preferences = draft.preferences;
  function change(values: Partial<OnboardingDraft["preferences"]>) {
    update((current) => ({
      ...current,
      preferences: { ...current.preferences, ...values },
      preferencesSkipped: false,
      completedAt: null,
    }));
    setErrors({});
  }
  function toggleRegion(region: string) {
    change({
      regions: preferences.regions.includes(region)
        ? preferences.regions.filter((value) => value !== region)
        : [...preferences.regions, region],
    });
  }
  return (
    <form
      ref={form}
      method="post"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const result = validatePreferences(preferences);
        setErrors(result);
        if (Object.keys(result).length) {
          if (result.regions)
            form.current
              ?.querySelector<HTMLDetailsElement>("details")
              ?.setAttribute("open", "");
          form.current
            ?.querySelector<HTMLElement>(
              result.regions ? "summary" : `[name="${Object.keys(result)[0]}"]`,
            )
            ?.focus();
          return;
        }
        next();
      }}
      className="flex flex-col gap-7"
    >
      <Notice>
        <strong className="text-text-primary">Opsional.</strong> Kamu bisa
        melewati langkah ini jika belum menentukan preferensi.
      </Notice>
      <StepTitle
        eyebrow="Langkah 2 dari 4"
        title="Preferensi Lokasi & Dukungan Praktis"
      >
        Pertimbangkan lokasi, tempat tinggal, dan biaya secara terpisah dari
        minatmu. Semua pertanyaan di langkah ini opsional.
      </StepTitle>
      <div className="rounded-xl bg-surface-subtle p-4">
        <p className="text-body-strong text-text-primary">
          Pilihan wilayah awal
        </p>
        <p className="mt-1 text-caption-meta text-text-secondary">
          Daftar wilayah pratinjau masih terbatas. Preferensi ini tidak
          menyatakan ketersediaan prodi atau kampus.
        </p>
      </div>
      <div className="space-y-2">
        <p className="text-headline-h3 text-text-primary">
          Pilihan Wilayah Kampus
        </p>
        <p id="regions-help" className="text-caption-meta text-text-secondary">
          Pilih lebih dari satu wilayah jika kamu masih membandingkan pilihan.
        </p>
        {preferences.regions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {preferences.regions.map((region) => (
              <button
                key={region}
                type="button"
                aria-label={`Hapus pilihan ${region}`}
                onClick={() => toggleRegion(region)}
                className="inline-flex items-center gap-1 rounded-lg border border-border-default bg-surface-subtle px-2.5 py-1.5 text-label-default text-text-primary"
              >
                {region}
                <Icon name="close" className="text-sm" />
              </button>
            ))}
          </div>
        )}
        <details className="rounded-xl border border-border-default bg-surface-subtle p-3">
          <summary
            aria-describedby={errors.regions ? "regions-error" : "regions-help"}
            className="rounded text-label-default text-primary"
          >
            Pilih atau ubah wilayah ({preferences.regions.length} dipilih)
          </summary>
          <fieldset className="mt-3 grid max-h-64 grid-cols-1 gap-2 overflow-auto sm:grid-cols-2">
            <legend className="sr-only">Daftar wilayah kampus pratinjau</legend>
            {regions.map((region) => (
              <label
                key={region}
                className="flex cursor-pointer items-center gap-2 rounded-lg bg-white p-2.5 text-body-default text-text-primary"
              >
                <input
                  type="checkbox"
                  checked={preferences.regions.includes(region)}
                  onChange={() => toggleRegion(region)}
                  className="size-4 accent-primary"
                />
                {region}
              </label>
            ))}
          </fieldset>
        </details>
        <FieldError id="regions-error" message={errors.regions} />
      </div>
      <ChoiceGroup
        name="relocation"
        legend="Kesediaan Relokasi / Merantau"
        value={preferences.relocation}
        onChange={(relocation) => change({ relocation })}
        options={[
          {
            value: "open",
            label: "Terbuka merantau",
            description: "Masih ingin memeriksa berbagai wilayah.",
          },
          {
            value: "stay",
            label: "Dekat domisili",
            description: "Preferensi, belum menjadi filter wajib.",
          },
          {
            value: "selected",
            label: "Wilayah tertentu",
            description: "Mengikuti pilihan wilayah di atas.",
          },
          {
            value: "",
            label: "Belum tahu",
            description: "Bisa ditentukan kemudian.",
          },
        ]}
      />
      <ChoiceGroup
        name="housing"
        legend="Rencana Tempat Tinggal Saat Kuliah"
        value={preferences.housing}
        onChange={(housing) => change({ housing })}
        options={[
          {
            value: "family",
            label: "Bersama keluarga",
            description: "Biaya hidup tetap perlu diperiksa.",
          },
          {
            value: "rent",
            label: "Kos mandiri",
            description: "Cari estimasi sesuai wilayah.",
          },
          {
            value: "dormitory",
            label: "Asrama kampus",
            description: "Ketersediaan dan biaya belum diketahui.",
          },
          {
            value: "unknown",
            label: "Belum tahu",
            description: "Tidak dianggap sebagai biaya nol.",
          },
        ]}
      />
      <fieldset className="space-y-3">
        <legend className="text-headline-h3 text-text-primary">
          Rentang Anggaran Bulanan
        </legend>
        <p className="text-caption-meta text-text-secondary">
          Pendidikan, biaya hidup, dan penunjang berulang. Biaya awal dihitung
          terpisah; kosong berarti belum diketahui.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            ["budgetMin", "Batas Minimum"],
            ["budgetMax", "Batas Maksimum"],
          ].map(([key, label]) => (
            <div key={key} className="space-y-1.5">
              <label
                htmlFor={key}
                className="text-caption-meta text-text-secondary"
              >
                {label} (Rp / bulan)
              </label>
              <input
                id={key}
                name={key}
                type="text"
                inputMode="numeric"
                maxLength={30}
                value={preferences[key as "budgetMin" | "budgetMax"]}
                onChange={(event) => change({ [key]: event.target.value })}
                placeholder="Belum ditentukan"
                aria-invalid={Boolean(errors[key])}
                aria-describedby={errors[key] ? `${key}-error` : undefined}
                className={fieldClass}
              />
              <FieldError id={`${key}-error`} message={errors[key]} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => change({ budgetMax: "2.000.000" })}
            className="rounded-lg border border-border-default bg-surface-subtle px-3 py-1.5 text-label-default text-secondary hover:bg-surface-container"
          >
            Maks. Rp2 juta / bulan
          </button>
          <button
            type="button"
            onClick={() => change({ budgetMin: "", budgetMax: "" })}
            className="rounded-lg border border-border-default bg-surface-subtle px-3 py-1.5 text-label-default text-secondary hover:bg-surface-container"
          >
            Belum tahu
          </button>
        </div>
      </fieldset>
      <div className="space-y-1.5">
        <label
          htmlFor="upfrontMax"
          className="text-body-strong text-text-primary"
        >
          Batas Biaya Awal (Rp · sekali bayar)
        </label>
        <input
          id="upfrontMax"
          name="upfrontMax"
          type="text"
          inputMode="numeric"
          maxLength={30}
          value={preferences.upfrontMax}
          onChange={(event) => change({ upfrontMax: event.target.value })}
          placeholder="Belum ditentukan"
          aria-invalid={Boolean(errors.upfrontMax)}
          aria-describedby={errors.upfrontMax ? "upfrontMax-error" : undefined}
          className={fieldClass}
        />
        <FieldError id="upfrontMax-error" message={errors.upfrontMax} />
      </div>
      <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-border-default p-3">
        <input
          type="checkbox"
          checked={preferences.scholarshipInterest}
          onChange={(event) =>
            change({ scholarshipInterest: event.target.checked })
          }
          className="mt-1 size-4 shrink-0 accent-primary"
        />
        <span>
          <span className="text-body-strong text-text-primary">
            Saya ingin mengeksplorasi bantuan pendidikan
          </span>
          <span className="mt-1 block text-caption-meta text-text-secondary">
            Bantuan belum diperoleh dan tidak mengurangi asumsi biaya dasar.
          </span>
        </span>
      </label>
      <StepActions
        back={back}
        backLabel="Kembali ke Konteks"
        skip={skip}
        nextLabel="Lanjut ke Akademik"
      />
    </form>
  );
}
