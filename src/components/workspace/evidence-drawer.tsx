"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/ui/modal";
import { Icon } from "@/components/ui/icon";
import { selectExampleVersion, programs } from "@/lib/workspace/domain";
import {
  evidenceFor,
  exampleVersions,
  syntheticEvidence,
} from "@/lib/workspace/exploration";
import {
  primaryButton,
  secondaryButton,
  useExploration,
} from "./exploration-ui";

export function EvidenceDrawer() {
  const {
    panel,
    setPanel,
    profile,
    draft,
    interests,
    exploration,
    update,
    hydrated,
    notify,
  } = useExploration();
  const [comparedVersion, setComparedVersion] = useState(1);
  const open = panel?.kind === "evidence" || panel?.kind === "history";
  const history = panel?.kind === "history";
  const program =
    programs.find((item) => item.id === panel?.programId) ?? programs[0];
  const evidence = evidenceFor(program, interests);
  const example = syntheticEvidence[program.id];
  const active = exampleVersions.find(
    (item) => item.id === exploration.exampleVersion,
  )!;
  const comparison = exampleVersions.find(
    (item) => item.id === comparedVersion,
  )!;
  const names = (ids: string[]) =>
    ids.map((id) => programs.find((item) => item.id === id)?.name).join(" → ");
  return (
    <Modal
      open={open}
      side
      onClose={() => setPanel(null)}
      labelledBy="evidence-drawer-title"
    >
      {open && (
        <div className="flex h-full flex-col bg-canvas">
          <div className="shrink-0 space-y-4 border-b border-border-default bg-white p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="evidence-drawer-title" className="text-lg font-bold">
                  {history
                    ? "Riwayat Versi Rekomendasi"
                    : "Bukti & Dasar Eksplorasi"}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-secondary">
                  {program.name} — {program.campus}
                </p>
              </div>
              <button
                type="button"
                aria-label="Tutup panel bukti dan riwayat"
                onClick={() => setPanel(null)}
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle"
              >
                <Icon name="close" className="text-lg" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-surface-subtle p-1">
              {[false, true].map((isHistory) => (
                <button
                  key={String(isHistory)}
                  type="button"
                  aria-pressed={history === isHistory}
                  onClick={() =>
                    setPanel({
                      kind: isHistory ? "history" : "evidence",
                      programId: program.id,
                    })
                  }
                  className={`rounded-lg px-2 py-2 text-xs font-semibold ${history === isHistory ? "bg-white text-primary-container shadow-sm" : "text-secondary"}`}
                >
                  {isHistory ? "Riwayat Versi" : "Bukti Eksplorasi"}
                </button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5 sm:p-6">
            <p className="rounded-xl border border-border-default bg-white p-3 text-xs leading-relaxed text-secondary">
              {profile.key === "dimas"
                ? "Pratinjau sintetis. Riwayat dan refleksi di sini bukan log aktivitas akun, serta tidak mengubah draf onboarding."
                : "Hanya data draf yang tersedia ditampilkan. Belum ada engine rekomendasi atau riwayat versi rekomendasi akun."}
            </p>
            {history ? (
              profile.key === "dimas" ? (
                <>
                  <p className="text-[10px] font-bold tracking-wider text-secondary uppercase">
                    3 Snapshot Contoh · Aktif v{active.id}
                  </p>
                  {exampleVersions.map((version) => (
                    <section
                      key={version.id}
                      className={`space-y-3 rounded-xl border bg-white p-4 ${version.id === active.id ? "border-primary-container ring-1 ring-primary-container" : "border-border-default"}`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="rounded bg-surface-container-low px-2 py-1 text-[11px] font-semibold text-primary-container">
                          Versi {version.id}
                          {version.id === active.id
                            ? " · Contoh Aktif"
                            : " · Snapshot"}
                        </span>
                        <span className="text-[10px] text-secondary">
                          {version.date}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold">{version.title}</h3>
                      <p className="text-xs leading-relaxed text-secondary">
                        {version.trigger}
                      </p>
                      <p className="rounded-lg bg-surface-subtle p-2 text-xs leading-relaxed">
                        {names(version.order)}
                      </p>
                      <button
                        type="button"
                        onClick={() => setComparedVersion(version.id)}
                        className="rounded text-xs font-semibold text-primary-container underline"
                      >
                        Bandingkan dengan contoh aktif
                      </button>
                      {version.id !== active.id && (
                        <details className="rounded-lg border border-border-default p-3">
                          <summary className="text-xs font-semibold">
                            Gunakan susunan contoh ini
                          </summary>
                          <p className="mt-2 text-xs leading-relaxed text-secondary">
                            Hanya mengganti tampilan Dimas pada tab ini.
                            Sematan, keranjang, dan draf onboarding tidak
                            berubah; tidak membuat versi akun.
                          </p>
                          <button
                            type="button"
                            disabled={!hydrated}
                            onClick={() => {
                              update((state) =>
                                selectExampleVersion(
                                  state,
                                  profile.key,
                                  version.id,
                                ),
                              );
                              notify(
                                `Susunan contoh Dimas memakai versi ${version.id}. Sematan tidak berubah.`,
                              );
                            }}
                            className={`${primaryButton} mt-3`}
                          >
                            Ya, Gunakan Contoh v{version.id}
                          </button>
                        </details>
                      )}
                    </section>
                  ))}
                  <section
                    className="space-y-3 rounded-xl border border-border-default bg-white p-4"
                    aria-live="polite"
                  >
                    <h3 className="text-sm font-bold">
                      Perbandingan Susunan Contoh
                    </h3>
                    <p className="text-xs leading-relaxed text-secondary">
                      Aktif v{active.id}: {names(active.order)}
                    </p>
                    <p className="text-xs leading-relaxed text-secondary">
                      Dipilih v{comparison.id}: {names(comparison.order)}
                    </p>
                    <ol className="space-y-2 text-xs">
                      {comparison.order.map((id, index) => {
                        const before = active.order.indexOf(id);
                        return (
                          <li
                            key={id}
                            className="flex justify-between gap-3 rounded-lg bg-surface-subtle p-2"
                          >
                            <span>
                              {programs.find((item) => item.id === id)?.name}
                            </span>
                            <span className="shrink-0">
                              #{before + 1} → #{index + 1}
                            </span>
                          </li>
                        );
                      })}
                    </ol>
                    <p className="text-[11px] text-secondary">
                      Perubahan urutan tidak menunjukkan peningkatan kemampuan
                      atau peluang masuk.
                    </p>
                  </section>
                </>
              ) : (
                <section className="space-y-3 rounded-xl border border-border-default bg-white p-5">
                  <h3 className="text-sm font-bold">
                    Belum Ada Versi Rekomendasi
                  </h3>
                  <p className="text-xs leading-relaxed text-secondary">
                    {profile.isDraft
                      ? `Draf jawaban lokal versi ${draft.answerVersion}. Riwayat rekomendasi akan tersedia setelah engine dan penyimpanan akun terhubung.`
                      : "Profil contoh Rani belum memiliki riwayat rekomendasi. Mulai dari katalog atau lengkapi draf onboarding."}
                  </p>
                  <Link
                    href="/jelajah"
                    onClick={() => setPanel(null)}
                    className={secondaryButton}
                  >
                    Jelajahi Katalog
                  </Link>
                </section>
              )
            ) : (
              <>
                <section className="space-y-3 rounded-xl border border-border-default bg-white p-4">
                  <h3 className="text-sm font-bold">
                    Bukti 1 · Kuesioner Minat
                  </h3>
                  {profile.isDraft ? (
                    <>
                      {evidence.length ? (
                        evidence.map((item) => (
                          <div
                            key={item.question.id}
                            className="rounded-xl bg-surface-subtle p-3"
                          >
                            <p className="text-[10px] font-semibold text-secondary">
                              {item.question.id} · Versi jawaban{" "}
                              {draft.answerVersion}
                            </p>
                            <p className="mt-2 text-xs leading-relaxed">
                              {item.question.prompt}
                            </p>
                            <p className="mt-2 text-xs font-semibold text-primary-container">
                              Jawaban {item.value}/5
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs leading-relaxed text-secondary">
                          Belum ada jawaban skala untuk aktivitas terkait. Belum
                          tahu atau Lewati bukan nilai nol.
                        </p>
                      )}
                      <p className="text-[11px] leading-relaxed text-secondary">
                        Jawaban minat bukan skor bakat atau kesiapan akademik.
                        Ketersediaan dimensi memerlukan sedikitnya dua jawaban
                        skala.
                      </p>
                    </>
                  ) : (
                    <p className="text-xs leading-relaxed text-secondary">
                      {profile.key === "dimas" && example
                        ? example.survey
                        : "Belum ada jawaban rinci pada profil contoh ini."}
                    </p>
                  )}
                </section>
                <section className="space-y-3 rounded-xl border border-border-default bg-white p-4">
                  <h3 className="text-sm font-bold">
                    Bukti 2 · Simulasi & Refleksi
                  </h3>
                  <p className="text-xs leading-relaxed text-secondary">
                    {profile.key === "dimas" && example
                      ? example.simulation
                      : "Belum ada catatan simulasi tersimpan untuk profil ini."}
                  </p>
                  <div className="rounded-xl bg-surface-subtle p-3">
                    <h4 className="text-xs font-semibold">
                      Refleksi Pengalaman
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-secondary">
                      {profile.key === "dimas" && example
                        ? example.reflection
                        : "Belum tersedia. Membuka brief tidak dianggap menyelesaikan misi."}
                    </p>
                  </div>
                </section>
                <p className="rounded-xl bg-status-info-bg p-3 text-xs leading-relaxed text-status-info-text">
                  Informasi kosong tetap tidak diketahui. Tidak ada prediksi
                  penerimaan, diagnosis bakat, atau jaminan pekerjaan dari bukti
                  ini.
                </p>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center justify-between gap-3 border-t border-border-default bg-white p-5">
            <button
              type="button"
              onClick={() => setPanel({ kind: "help" })}
              className="rounded text-xs font-semibold text-secondary underline"
            >
              Batas & Privasi Data
            </button>
            <button
              type="button"
              onClick={() => setPanel(null)}
              className={primaryButton}
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
