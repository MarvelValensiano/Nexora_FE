"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";
import {
  getExploration,
  programs,
  updateAidReference,
  type Program,
} from "@/lib/workspace/domain";
import {
  evidenceFor,
  programHref,
  syntheticEvidence,
} from "@/lib/workspace/exploration";
import { useWorkspace } from "./workspace-context";

export const primaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-primary disabled:opacity-50";
export const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-border-default bg-white px-4 py-2.5 text-xs font-semibold text-text-primary transition-colors hover:bg-surface-subtle disabled:opacity-50";
export const panelClass =
  "rounded-2xl border border-border-subtle bg-white p-5 shadow-sm sm:p-6";

export function useExploration() {
  const workspace = useWorkspace();
  const exploration = getExploration(workspace.state);
  const aid = exploration.aid[workspace.profile.key];
  function updateAid(change: Partial<typeof aid>) {
    workspace.update((state) =>
      updateAidReference(state, workspace.profile.key, change),
    );
  }
  return { ...workspace, exploration, aid, updateAid };
}

export function SectionPanel({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`${panelClass} space-y-4`}>
      <h2 className="text-base font-bold text-text-primary">{title}</h2>
      {children}
    </section>
  );
}

export function ProgramActions({
  program,
  returnTo = "/rekomendasi",
  detail = true,
}: {
  program: Program;
  returnTo?: string;
  detail?: boolean;
}) {
  const { selection, hydrated, toggleSaved, toggleCompare } = useWorkspace();
  const pinned = selection.savedIds.includes(program.id);
  const compared = selection.compareIds.includes(program.id);
  return (
    <div className="no-print flex flex-wrap gap-2">
      {detail && (
        <Link
          href={programHref(program.id, returnTo)}
          className={primaryButton}
        >
          Lihat Detail
          <Icon name="arrow_forward" className="text-base" />
        </Link>
      )}
      <button
        type="button"
        disabled={!hydrated}
        aria-pressed={compared}
        onClick={() => toggleCompare(program.id)}
        className={secondaryButton}
      >
        <Icon name={compared ? "check" : "balance"} className="text-base" />
        {compared ? "Di Bandingkan" : "Bandingkan"}
      </button>
      <button
        type="button"
        disabled={!hydrated}
        aria-pressed={pinned}
        onClick={() => toggleSaved(program.id)}
        className={`${secondaryButton} ${pinned ? "!bg-surface-container-low !text-primary-container" : ""}`}
      >
        <Icon name="bookmark" className="text-base" />
        {pinned ? "Lepas Sematan" : "Sematkan Pilihan"}
      </button>
    </div>
  );
}

export function ComparisonCart() {
  const { selection, toggleCompare, update, profile, setPanel, hydrated } =
    useWorkspace();
  const selected = selection.compareIds.flatMap((id) =>
    programs.filter((program) => program.id === id),
  );
  return (
    <SectionPanel title="Keranjang Komparasi">
      <p className="text-xs leading-relaxed text-secondary">
        {selected.length} / 3 pilihan. Sematan dan keranjang komparasi adalah
        dua daftar berbeda.
      </p>
      <div className="space-y-2">
        {selected.map((program) => (
          <div
            key={program.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-border-default bg-surface-subtle p-3"
          >
            <div>
              <p className="text-xs font-semibold">{program.name}</p>
              <p className="mt-1 text-[11px] text-secondary">
                {program.campus}
              </p>
            </div>
            <button
              type="button"
              disabled={!hydrated}
              onClick={() => toggleCompare(program.id)}
              aria-label={`Hapus ${program.name} dari komparasi`}
              className="flex size-8 shrink-0 items-center justify-center rounded-lg hover:bg-white"
            >
              <Icon name="close" className="text-base" />
            </button>
          </div>
        ))}
        {!selected.length && (
          <p className="rounded-xl bg-surface-subtle p-4 text-xs text-secondary">
            Belum ada pilihan untuk dibandingkan.
          </p>
        )}
      </div>
      {selected.length < 3 && (
        <Link
          href="/jelajah"
          className="block rounded-xl border border-dashed border-outline-variant p-3 text-center text-xs text-secondary"
        >
          + Tambah pilihan dari katalog
        </Link>
      )}
      <button
        type="button"
        disabled={!selected.length}
        onClick={() => setPanel({ kind: "compare" })}
        className={`${primaryButton} w-full`}
      >
        Buka Perbandingan ({selected.length})
      </button>
      {selected.length > 0 && (
        <button
          type="button"
          disabled={!hydrated}
          onClick={() =>
            update((state) => ({
              ...state,
              selections: {
                ...state.selections,
                [profile.key]: {
                  ...state.selections[profile.key],
                  compareIds: [],
                },
              },
            }))
          }
          className="w-full rounded text-xs text-secondary underline"
        >
          Kosongkan Keranjang
        </button>
      )}
    </SectionPanel>
  );
}

export function EvidenceSummary({
  program,
  compact = false,
}: {
  program: Program;
  compact?: boolean;
}) {
  const { profile, interests, setPanel } = useWorkspace();
  const evidence = evidenceFor(program, interests);
  const example = syntheticEvidence[program.id];
  return (
    <div className="space-y-3">
      <p className="text-xs leading-relaxed text-secondary">
        {profile.isDraft
          ? `${evidence.length} jawaban skala terkait aktivitas tersedia dari draf onboarding. Ini belum merupakan hasil rekomendasi.`
          : profile.key === "dimas"
            ? "Skenario Dimas berikut adalah contoh bentuk penjelasan, bukan aktivitas akunmu."
            : "Profil Rani masih parsial. Tidak ada bukti simulasi atau ranking personal."}
      </p>
      {profile.isDraft ? (
        <>
          {evidence.slice(0, compact ? 1 : 2).map((item) => (
            <div
              key={item.question.id}
              className="rounded-xl border border-border-default bg-surface-subtle p-3"
            >
              <p className="text-xs leading-relaxed text-secondary">
                {item.question.prompt}
              </p>
              <p className="mt-1 text-xs font-semibold">
                Jawaban {item.value}/5 · {item.question.id}
              </p>
            </div>
          ))}
          {!evidence.length && (
            <p className="text-xs text-secondary">
              Belum ada jawaban skala terkait; tidak dianggap sebagai skor nol.
            </p>
          )}
        </>
      ) : profile.key === "dimas" && example ? (
        <p className="rounded-xl bg-surface-subtle p-3 text-xs leading-relaxed text-secondary">
          {example.survey}
        </p>
      ) : null}
      <button
        type="button"
        onClick={() => setPanel({ kind: "evidence", programId: program.id })}
        className="inline-flex items-center gap-1 rounded text-xs font-semibold text-primary-container hover:underline"
      >
        Buka Panel Bukti
        <Icon name="arrow_forward" className="text-sm" />
      </button>
    </div>
  );
}

export function MissionPanel({ program }: { program: Program }) {
  const { setPanel } = useWorkspace();
  return (
    <section className="no-print space-y-3 rounded-2xl bg-primary-container p-5 text-white shadow-sm">
      <p className="text-[10px] font-semibold tracking-wider uppercase">
        Simulasi Nexalora · Brief Contoh
      </p>
      <h2 className="text-base font-bold">Rasakan Cuplikan Belajar</h2>
      <p className="text-xs leading-relaxed text-white/90">
        {program.mission
          ? `${program.mission}: ${program.description}`
          : "Misi khusus untuk prodi ini belum tersedia. Kamu tetap bisa melihat tiga brief aktivitas umum."}
      </p>
      <button
        type="button"
        onClick={() => setPanel({ kind: "missions" })}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-3 py-3 text-xs font-semibold text-primary-container"
      >
        <Icon name="play_circle" className="text-base" />
        Lihat Brief Misi
      </button>
      <p className="text-[11px] text-white/80">
        Membuka brief tidak menambah progres misi.
      </p>
    </section>
  );
}
