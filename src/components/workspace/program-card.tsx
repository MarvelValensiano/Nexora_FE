"use client";

import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { isValidAcademic } from "@/lib/onboarding/domain";
import { formatCost, type Program } from "@/lib/workspace/domain";
import { useWorkspace } from "./workspace-context";
import { programHref } from "@/lib/workspace/exploration";

export function ProgramCard({
  program,
  variant = "catalog",
  returnTo = "/jelajah",
}: {
  program: Program;
  variant?: "dashboard" | "catalog";
  returnTo?: string;
}) {
  const {
    profile,
    draft,
    selection,
    hydrated,
    toggleSaved,
    toggleCompare,
    setPanel,
  } = useWorkspace();
  const saved = selection.savedIds.includes(program.id);
  const compared = selection.compareIds.includes(program.id);
  const notes = !draft.academicsSkipped
    ? draft.academicRecords.filter(
        (record) =>
          record.status === "provided" &&
          record.value.trim() &&
          isValidAcademic(record),
      ).length
    : 0;
  const photo = (
    <div
      className={`relative overflow-hidden bg-surface-subtle ${variant === "catalog" ? "h-32 rounded-xl" : "h-40"}`}
    >
      <Image
        src={program.image}
        alt={`Ilustrasi aktivitas ${program.name}`}
        fill
        sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 360px"
        className="object-cover"
      />
      {variant === "catalog" && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-2.5 pt-6 pb-2.5">
          <span className="inline-flex max-w-full items-center gap-1 rounded-lg bg-white/95 px-2 py-1 text-[11px] font-semibold text-primary-container">
            <Icon name="play_circle" className="text-sm" />
            {program.mission
              ? `Misi: ${program.mission}`
              : "Contoh fokus pembelajaran"}
          </span>
        </div>
      )}
    </div>
  );
  return (
    <article
      className={`flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition-shadow hover:shadow-md ${compared ? "border-primary-container/40" : "border-border-default"}`}
    >
      {variant === "dashboard" && photo}
      <div
        className={`flex flex-1 flex-col gap-4 ${variant === "catalog" ? "p-5 sm:p-6" : "p-5"}`}
      >
        <div>
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-bold tracking-wider text-secondary uppercase">
              {program.major}
            </span>
            <span className="rounded-full bg-surface-subtle px-2 py-0.5 text-[10px] font-semibold text-secondary">
              Contoh Sintetis
            </span>
          </div>
          <h2
            className={
              variant === "catalog"
                ? "text-lg font-bold leading-snug text-text-primary"
                : "text-[15px] font-bold leading-snug text-text-primary"
            }
          >
            {program.name} ({program.degree})
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-secondary">
            {program.campus} · {program.city}
          </p>
        </div>
        {variant === "catalog" && photo}
        <dl className="space-y-2 rounded-xl border border-border-default bg-surface-subtle p-3 text-xs">
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-b border-border-default/50 pb-2">
            <dt className="text-secondary">
              {variant === "catalog" ? "Contoh Aktivitas" : "Fokus Aktivitas"}
            </dt>
            <dd className="text-right font-semibold text-text-primary">
              {program.interest}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1 border-b border-border-default/50 pb-2">
            <dt className="text-secondary">
              {variant === "catalog" ? "Fokus Belajar" : "Catatan Akademik"}
            </dt>
            <dd className="text-right font-semibold text-text-primary">
              {variant === "catalog"
                ? program.focus
                : profile.isDraft
                  ? notes
                    ? `${notes} nilai tercatat`
                    : "Belum diisi"
                  : profile.key === "rani"
                    ? "Belum diisi"
                    : "Contoh nilai tersedia"}
            </dd>
          </div>
          <div className="flex flex-wrap justify-between gap-x-3 gap-y-1">
            <dt className="text-secondary">Pendidikan / tahun</dt>
            <dd className="text-right font-semibold text-text-primary">
              {formatCost(program)}
            </dd>
          </div>
        </dl>
        <p className="text-[11px] leading-relaxed text-secondary">
          {variant === "catalog"
            ? `Angka sintetis ${program.costYear}. Biaya hidup dan biaya awal belum tersedia.`
            : program.description}
        </p>
        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-border-subtle pt-3">
          {variant === "catalog" ? (
            <Link
              href={programHref(program.id, returnTo)}
              className="rounded-xl border border-border-default px-3 py-2.5 text-center text-xs font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
            >
              Lihat Detail
            </Link>
          ) : (
            <button
              type="button"
              onClick={() =>
                setPanel({
                  kind: "evidence",
                  programId: program.id,
                })
              }
              className="rounded-xl border border-border-default px-3 py-2.5 text-xs font-semibold text-text-primary transition-colors hover:bg-surface-subtle"
            >
              Lihat Bukti
            </button>
          )}
          <button
            type="button"
            disabled={!hydrated}
            aria-pressed={saved}
            aria-label={`${saved ? "Lepas simpan" : "Simpan"} ${program.name} ${program.campus}`}
            onClick={() => toggleSaved(program.id)}
            className={`flex items-center justify-center gap-1 rounded-xl border px-2 py-2.5 text-xs font-semibold disabled:opacity-50 ${saved ? "border-indigo-100 bg-[#EEF2FF] text-primary-container" : "border-border-default text-secondary hover:bg-surface-subtle"}`}
          >
            <Icon name="bookmark" className="text-sm" />
            {saved ? "Tersimpan" : "Simpan"}
          </button>
          <button
            type="button"
            disabled={!hydrated}
            aria-pressed={compared}
            onClick={() => toggleCompare(program.id)}
            aria-label={`${compared ? "Hapus dari perbandingan" : "Bandingkan"} ${program.name} ${program.campus}`}
            className={`col-span-2 flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-xs font-semibold disabled:opacity-50 ${compared ? "bg-primary-container text-white hover:bg-primary" : "bg-surface-subtle text-primary-container hover:bg-status-info-bg"}`}
          >
            <Icon name={compared ? "check" : "add"} className="text-base" />
            {compared ? "Terpilih di Bandingkan" : "Bandingkan"}
          </button>
        </div>
      </div>
    </article>
  );
}
