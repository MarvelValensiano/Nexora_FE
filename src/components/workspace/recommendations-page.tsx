"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { isValidAcademic } from "@/lib/onboarding/domain";
import { formatCost, programs, type Program } from "@/lib/workspace/domain";
import { exampleVersions, versionPrograms } from "@/lib/workspace/exploration";
import {
  ComparisonCart,
  EvidenceSummary,
  panelClass,
  primaryButton,
  ProgramActions,
  secondaryButton,
  SectionPanel,
  useExploration,
} from "./exploration-ui";

export function RecommendationsPage({ pinned = false }: { pinned?: boolean }) {
  const { profile, draft, selection, interests, setPanel, exploration } =
    useExploration();
  const sample = profile.key === "dimas";
  const active = exampleVersions.find(
    (version) => version.id === exploration.exampleVersion,
  )!;
  const saved = selection.savedIds.flatMap((id) =>
    programs.filter((program) => program.id === id),
  );
  const items = pinned
    ? saved
    : sample
      ? versionPrograms(programs, active.id)
      : programs.slice(0, 3);
  const returnTo = pinned ? "/rekomendasi?tab=tersemat" : "/rekomendasi";
  const academicCount = draft.academicsSkipped
    ? 0
    : draft.academicRecords.filter(
        (record) =>
          record.status === "provided" &&
          record.value.trim() &&
          isValidAcademic(record),
      ).length;
  function studyCard(program: Program) {
    return (
      <article key={program.id} className={`${panelClass} space-y-4`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-lg border border-border-default bg-surface-subtle px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase">
            {program.major}
          </span>
          <span className="text-[11px] text-secondary">
            Data sintetis · Belum terverifikasi
          </span>
        </div>
        <div>
          <h2 className="text-xl font-bold leading-snug">
            {program.name} — {program.campus}
          </h2>
          <p className="mt-1.5 text-xs text-secondary">
            {program.city} · {program.degree} · Akreditasi belum tersedia
          </p>
        </div>
        <div className="rounded-xl border border-border-subtle bg-surface-subtle p-3 text-xs leading-relaxed text-secondary">
          <strong className="text-text-primary">
            {pinned
              ? "Catatan Pilihan: "
              : sample
                ? "Dasar Ilustrasi: "
                : "Fokus Eksplorasi: "}
          </strong>
          {program.description}
          {!sample && " Kartu ini bukan hasil ranking personal."}
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          <Dimension
            label="Minat Belajar"
            title={
              profile.isDraft
                ? `${interests.answered} jawaban skala`
                : sample
                  ? "Contoh eksplorasi"
                  : "Informasi parsial"
            }
            note={program.interest}
          />
          <Dimension
            label="Kesiapan Akademik"
            title={
              profile.isDraft
                ? academicCount
                  ? `${academicCount} nilai tercatat`
                  : "Belum tersedia"
                : sample
                  ? "Contoh catatan nilai"
                  : "Belum diisi"
            }
            note="Belum dinilai terhadap syarat prodi; bukan peluang masuk."
          />
          <Dimension
            label="Biaya & Akses"
            title={formatCost(program)}
            note={`Pendidikan / tahun · ${program.costYear}. Biaya hidup dan biaya awal belum diketahui.`}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-4">
          <ProgramActions program={program} returnTo={returnTo} />
          <button
            type="button"
            onClick={() =>
              setPanel({ kind: "evidence", programId: program.id })
            }
            className="rounded text-xs font-semibold text-primary-container hover:underline"
          >
            Lihat Bukti & Alasan
          </button>
        </div>
      </article>
    );
  }
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-2 text-xs text-secondary"
      >
        <Link href="/jelajah" className="rounded hover:text-primary-container">
          Jelajah
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-text-primary">
          Rekomendasi Studi
        </span>
      </nav>
      <div className="space-y-2">
        <h1 className="text-[26px] font-bold tracking-tight">
          Eksplorasi &amp; Rekomendasi Studi
        </h1>
        <p className="max-w-3xl text-sm leading-relaxed text-secondary">
          {pinned
            ? "Pilihan yang kamu sematkan untuk ditinjau dan dibandingkan. Sematan tidak berubah saat susunan contoh diganti."
            : "Tinjau aktivitas belajar, catatan akademik, dan biaya secara terpisah dengan alasan yang dapat dibuka."}
        </p>
      </div>
      <nav
        aria-label="Tampilan eksplorasi"
        className="flex flex-wrap items-center gap-2 border-b border-border-default pb-4"
      >
        <Link
          href="/rekomendasi"
          aria-current={!pinned ? "page" : undefined}
          className={!pinned ? primaryButton : secondaryButton}
        >
          Rekomendasi Personal
          <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">
            {sample ? `Contoh v${active.id}` : "Belum Aktif"}
          </span>
        </Link>
        <Link
          href="/rekomendasi?tab=tersemat"
          aria-current={pinned ? "page" : undefined}
          className={pinned ? primaryButton : secondaryButton}
        >
          <Icon name="bookmark" className="text-base" />
          Pilihan Tersemat ({saved.length})
        </Link>
        <div className="flex flex-wrap gap-2 lg:ml-auto">
          <button
            type="button"
            onClick={() => setPanel({ kind: "history" })}
            className={secondaryButton}
          >
            Riwayat Versi
          </button>
          <Link href="/jelajah#filter-katalog" className={secondaryButton}>
            Atur Kriteria
          </Link>
        </div>
      </nav>
      {pinned ? (
        <p className="rounded-xl border border-border-default bg-white p-4 text-xs leading-relaxed text-secondary">
          {saved.length} dari 5 sematan. Koleksi tersimpan pada tab ini, bukan
          penyimpanan akun permanen atau sinkronisasi server.
          {saved.length > 5 &&
            " Simpanan lama tetap dipertahankan; lepas pilihan agar kembali ke batas lima."}
        </p>
      ) : (
        <div className="flex flex-col justify-between gap-4 rounded-xl border border-border-default bg-white p-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-bold">
              {sample
                ? `Pratinjau Susunan · Versi ${active.id}`
                : profile.sufficient
                  ? "Minat Awal Tersedia, Engine Belum Terhubung"
                  : "Eksplorasi Umum — Data Minat Belum Cukup"}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              {sample
                ? active.trigger
                : "Belum ada ranking personal. Kamu tetap bisa melihat katalog, menyimpan, serta membandingkan pilihan tanpa melengkapi semua data."}
            </p>
          </div>
          {sample ? (
            <button
              type="button"
              onClick={() => setPanel({ kind: "history" })}
              className={`${secondaryButton} shrink-0`}
            >
              Bandingkan Versi
            </button>
          ) : (
            <Link href="/onboarding" className={`${secondaryButton} shrink-0`}>
              Tinjau Draf Profil
            </Link>
          )}
        </div>
      )}
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="min-w-0 space-y-5 lg:col-span-8">
          {pinned && (
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-bold">
                Daftar Program Studi Tersemat
              </h2>
              <span className="text-xs text-secondary">
                {saved.length} pilihan
              </span>
            </div>
          )}
          {items.length ? (
            items.map(studyCard)
          ) : (
            <section className={`${panelClass} space-y-3 text-center`}>
              <Icon name="bookmark" className="text-3xl text-secondary" />
              <h2 className="text-lg font-bold">Belum Ada Prodi Tersemat</h2>
              <p className="text-sm leading-relaxed text-secondary">
                Sematkan pilihan dari katalog untuk menyusun bahan diskusi
                bersama guru BK atau keluarga.
              </p>
              <Link href="/jelajah" className={primaryButton}>
                Jelajahi Katalog
              </Link>
            </section>
          )}
        </div>
        <aside
          aria-label="Bukti dan pilihan eksplorasi"
          className="min-w-0 space-y-5 lg:col-span-4"
        >
          {pinned ? (
            <ComparisonCart />
          ) : (
            <>
              <SectionPanel title="Panel Bukti & Jejak Eksplorasi">
                <p className="text-sm font-semibold">
                  {items[0]?.name} — bukti apa yang tersedia?
                </p>
                <EvidenceSummary program={items[0] ?? programs[0]} compact />
              </SectionPanel>
              <SectionPanel title="Riwayat Versi Rekomendasi">
                {sample ? (
                  <ol className="space-y-3">
                    {exampleVersions.map((version) => (
                      <li
                        key={version.id}
                        className="border-l-2 border-border-default pl-3"
                      >
                        <p className="text-xs font-semibold">
                          Versi {version.id}
                          {version.id === active.id ? " · Contoh Aktif" : ""}
                        </p>
                        <p className="mt-1 text-[11px] leading-relaxed text-secondary">
                          {version.date} · {version.title}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-xs leading-relaxed text-secondary">
                    Belum ada versi rekomendasi akun. Revisi jawaban onboarding
                    tidak dibuat menjadi riwayat rekomendasi palsu.
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setPanel({ kind: "history" })}
                  className={`${secondaryButton} w-full`}
                >
                  Buka Riwayat & Perbandingan
                </button>
              </SectionPanel>
              <SectionPanel title={`Pilihan Tersemat · ${saved.length}/5`}>
                <p className="text-xs leading-relaxed text-secondary">
                  Daftar tetap tersimpan saat susunan contoh ditinjau ulang.
                </p>
                {saved.slice(0, 3).map((program) => (
                  <p
                    key={program.id}
                    className="rounded-lg bg-surface-subtle p-3 text-xs font-semibold"
                  >
                    {program.name}
                    <span className="mt-1 block text-[11px] font-normal text-secondary">
                      {program.campus}
                    </span>
                  </p>
                ))}
                {!saved.length && (
                  <p className="text-xs text-secondary">
                    Belum ada pilihan disematkan.
                  </p>
                )}
                <Link
                  href="/rekomendasi?tab=tersemat"
                  className={`${secondaryButton} w-full`}
                >
                  Kelola Tersemat
                </Link>
              </SectionPanel>
            </>
          )}
          <p className="rounded-xl border border-border-default bg-white p-4 text-xs leading-relaxed text-secondary">
            Keputusan tetap milikmu. Sematan tidak menyatakan kecocokan pasti,
            kelayakan biaya total, atau peluang diterima.
          </p>
        </aside>
      </div>
    </>
  );
}

function Dimension({
  label,
  title,
  note,
}: {
  label: string;
  title: string;
  note: string;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-border-default bg-surface-subtle p-3">
      <h3 className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
        {label}
      </h3>
      <p className="text-xs font-bold leading-relaxed">{title}</p>
      <p className="text-[11px] leading-relaxed text-secondary">{note}</p>
    </div>
  );
}
