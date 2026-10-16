"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import {
  formatCost,
  programs,
  taskIsOverdue,
  validDate,
} from "@/lib/workspace/domain";
import { useExploration } from "./exploration-ui";

const panelTitles = {
  compare: "Matriks Perbandingan",
  evidence: "Bukti & Batas Informasi",
  history: "Riwayat Versi Contoh",
  missions: "Pilih Contoh Misi Belajar",
  review: "Tinjau Contoh Perubahan",
  agenda: "Agenda Eksplorasi Contoh",
  settings: "Pengaturan Pratinjau",
  help: "Bantuan & Batas Produk",
};

export function WorkspaceDialogs() {
  const {
    panel,
    setPanel,
    state,
    profile,
    selection,
    hydrated,
    error,
    update,
    toggleCompare,
    reset,
    notify,
    today,
    aid,
    updateAid,
  } = useExploration();
  const compared = programs.filter((item) =>
    selection.compareIds.includes(item.id),
  );
  return (
    <Modal
      open={
        panel !== null && panel.kind !== "evidence" && panel.kind !== "history"
      }
      onClose={() => setPanel(null)}
      labelledBy="workspace-dialog-title"
      wide={panel?.kind === "compare"}
    >
      {panel && (
        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <h2
              id="workspace-dialog-title"
              className="text-headline-h2 text-text-primary"
            >
              {panelTitles[panel.kind]}
            </h2>
            <button
              type="button"
              aria-label="Tutup panel"
              onClick={() => setPanel(null)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle text-secondary"
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>
          <p className="mt-2 text-caption-meta leading-relaxed text-secondary">
            Pratinjau lokal. Kampus, tarif, dan progres contoh bukan fakta
            kampus atau hasil aktivitas akun.
          </p>
          {panel.kind === "compare" && (
            <div className="mt-5 space-y-4">
              {compared.length === 0 ? (
                <div className="rounded-xl bg-surface-subtle p-5 text-body-default text-secondary">
                  Belum ada prodi dipilih.{" "}
                  <Link
                    href="/jelajah"
                    onClick={() => setPanel(null)}
                    className="text-primary-container underline"
                  >
                    Pilih dari katalog
                  </Link>
                  .
                </div>
              ) : (
                <>
                  <p className="rounded-lg bg-status-info-bg p-3 text-caption-meta text-status-info-text">
                    Perbandingan memakai biaya pendidikan per tahun. Kelayakan
                    total belum dapat disimpulkan karena biaya hidup dan biaya
                    awal belum tersedia.
                  </p>
                  <div
                    className={`grid gap-4 ${compared.length === 2 ? "md:grid-cols-2" : compared.length === 3 ? "md:grid-cols-3" : ""}`}
                  >
                    {compared.map((item) => (
                      <article
                        key={item.id}
                        className="space-y-4 rounded-xl border border-border-default p-4"
                      >
                        <div>
                          <h3 className="text-headline-h3">
                            {item.name} ({item.degree})
                          </h3>
                          <p className="mt-1 text-caption-meta text-secondary">
                            {item.campus} · {item.city}
                          </p>
                        </div>
                        <dl className="space-y-3 text-caption-meta">
                          <div>
                            <dt className="text-secondary">Aktivitas</dt>
                            <dd className="mt-1 font-semibold">
                              {item.interest}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-secondary">
                              Pendidikan / tahun
                            </dt>
                            <dd className="mt-1 font-semibold">
                              {formatCost(item)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-secondary">
                              Biaya hidup / awal
                            </dt>
                            <dd className="mt-1">Belum diketahui</dd>
                          </div>
                          <div>
                            <dt className="text-secondary">Misi terkait</dt>
                            <dd className="mt-1">
                              {item.mission || "Belum ada misi khusus"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-secondary">
                              Tahun &amp; sumber
                            </dt>
                            <dd className="mt-1">
                              Ilustrasi {item.costYear}; belum ada sumber resmi.
                            </dd>
                          </div>
                        </dl>
                        <button
                          type="button"
                          disabled={!hydrated}
                          onClick={() => toggleCompare(item.id)}
                          className="w-full rounded-lg bg-surface-subtle px-3 py-2 text-label-default text-secondary"
                        >
                          Hapus dari Perbandingan
                        </button>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {panel.kind === "missions" && (
            <div className="mt-5 space-y-3">
              {programs
                .filter((item) => item.mission)
                .map((item) => (
                  <section
                    key={item.id}
                    className="rounded-xl border border-border-default p-4"
                  >
                    <p className="text-caption-badge tracking-wider text-secondary uppercase">
                      {item.major} · sekitar 10–15 menit
                    </p>
                    <h3 className="mt-1 text-headline-h3">{item.mission}</h3>
                    <p className="mt-2 text-caption-meta leading-relaxed text-secondary">
                      {item.description}
                    </p>
                  </section>
                ))}
              <p className="rounded-lg bg-surface-subtle p-3 text-caption-meta text-secondary">
                Panel ini adalah brief. Editor dan runner misi belum terhubung;
                membuka brief tidak menambah progres misi.
              </p>
              <Link
                href="/#simulasi-misi"
                onClick={() => setPanel(null)}
                className="inline-flex items-center gap-1 rounded text-label-default text-primary-container underline"
              >
                Lihat Cuplikan Misi
                <Icon name="arrow_forward" className="text-base" />
              </Link>
            </div>
          )}
          {panel.kind === "review" && (
            <div className="mt-5 space-y-4">
              <h3 className="text-headline-h3">Contoh refleksi Dimas</h3>
              <p className="text-body-default text-secondary">
                Setelah mencoba aktivitas logika, Dimas menyatakan ingin belajar
                lebih jauh. Contoh ini menunjukkan bagaimana alasan rekomendasi
                dapat ditinjau sebelum diterapkan.
              </p>
              <p className="rounded-xl bg-surface-container-low p-3 text-caption-meta text-secondary">
                Belum ada engine rekomendasi atau perubahan urutan aktual.
                Meninjau contoh tidak mengubah minat, nilai, atau draf
                onboardingmu.
              </p>
              <button
                type="button"
                disabled={state.reviewApplied}
                onClick={() => {
                  update((current) => ({ ...current, reviewApplied: true }));
                  setPanel(null);
                  notify(
                    "Contoh perubahan ditandai sudah ditinjau. Draf onboarding tidak berubah.",
                  );
                }}
                className="w-full rounded-xl bg-primary-container px-4 py-3 text-label-default text-white disabled:opacity-50"
              >
                {state.reviewApplied
                  ? "Contoh Sudah Ditinjau"
                  : "Tandai Contoh Sudah Ditinjau"}
              </button>
            </div>
          )}
          {panel.kind === "agenda" && (
            <div className="mt-5 space-y-4">
              {aid.task && (
                <section className="space-y-3 rounded-xl border border-border-default bg-surface-container-low p-4">
                  <label className="flex items-start gap-2 text-body-strong">
                    <input
                      type="checkbox"
                      checked={aid.done}
                      disabled={!hydrated}
                      onChange={(event) =>
                        updateAid({ done: event.target.checked })
                      }
                      className="mt-1 size-4 accent-primary-container"
                    />
                    <span>Cek syarat bantuan pendidikan contoh</span>
                  </label>
                  <p className="text-caption-meta text-secondary">
                    Tugas referensi tab ini · Saran minggu 1, sekitar 30 menit.
                    Tidak ada tenggat resmi.{" "}
                    {aid.done ? "Ditandai selesai." : "Belum selesai."}
                  </p>
                </section>
              )}
              {profile.key === "dimas" ? (
                <>
                  <p className="text-caption-meta text-secondary">
                    Tiga tugas sintetis untuk contoh rencana 30 hari. Status dan
                    tanggal dapat diubah pada tab ini; ini bukan planner akun
                    pribadi.
                  </p>
                  {state.tasks.map((task) => (
                    <section
                      key={task.id}
                      className="rounded-xl border border-border-default p-4"
                    >
                      <label className="flex cursor-pointer items-start gap-2">
                        <input
                          type="checkbox"
                          checked={task.done}
                          onChange={(event) =>
                            update((current) => ({
                              ...current,
                              tasks: current.tasks.map((item) =>
                                item.id === task.id
                                  ? { ...item, done: event.target.checked }
                                  : item,
                              ),
                            }))
                          }
                          className="mt-1 size-4 shrink-0 accent-primary-container"
                        />
                        <span
                          className={`text-body-strong ${task.done ? "text-secondary line-through" : ""}`}
                        >
                          {task.title}
                        </span>
                      </label>
                      <label className="mt-3 flex flex-wrap items-center gap-2 text-caption-meta text-secondary">
                        Tanggal target
                        <input
                          type="date"
                          value={task.dueDate}
                          min="2026-10-13"
                          max="2026-11-11"
                          onChange={(event) => {
                            const dueDate = event.target.value;
                            if (
                              validDate(dueDate) &&
                              dueDate >= "2026-10-13" &&
                              dueDate <= "2026-11-11"
                            )
                              update((current) => ({
                                ...current,
                                tasks: current.tasks.map((item) =>
                                  item.id === task.id
                                    ? { ...item, dueDate }
                                    : item,
                                ),
                              }));
                          }}
                          className="rounded-lg border border-border-default px-2 py-1"
                        />
                      </label>
                      <p className="mt-2 text-caption-meta text-secondary">
                        {task.done
                          ? "Selesai"
                          : taskIsOverdue(task, today)
                            ? "Lewat tanggal target; boleh dijadwalkan ulang tanpa hukuman."
                            : "Belum selesai"}
                      </p>
                    </section>
                  ))}
                </>
              ) : (
                <>
                  <p className="text-body-default text-secondary">
                    {aid.task
                      ? "Tugas referensi tercatat di atas. Langkah eksplorasi lain yang bisa disiapkan:"
                      : "Belum ada rencana aktif pada profil ini. Contoh langkah yang bisa disiapkan:"}
                  </p>
                  <ol className="list-decimal space-y-3 pl-5 text-body-default text-secondary">
                    <li>Coba satu aktivitas dan tuliskan pengalaman.</li>
                    <li>
                      Bandingkan dua pilihan dari informasi studi yang
                      bersumber.
                    </li>
                    <li>
                      Tinjau biaya dan diskusikan pertanyaan dengan BK atau
                      keluarga.
                    </li>
                  </ol>
                  <p className="text-caption-meta text-secondary">
                    Pembuatan rencana pribadi, bukti tugas, dan aktivasi planner
                    akan diimplementasikan pada layar rencana.
                  </p>
                </>
              )}
            </div>
          )}
          {panel.kind === "settings" && (
            <div className="mt-5 space-y-4">
              <p className="text-body-default text-secondary">
                Pilihan simpan, slot perbandingan, dan perubahan tugas contoh
                berada di tab ini. Autentikasi dan penyimpanan akun belum
                terhubung.
              </p>
              <Link
                href="/onboarding"
                onClick={() => setPanel(null)}
                className="block rounded-xl bg-surface-container-low px-4 py-3 text-label-default text-primary-container"
              >
                Tinjau / Hapus Draf Onboarding
              </Link>
              <button
                type="button"
                onClick={() => setPanel({ kind: "help" })}
                className="block w-full rounded-xl bg-surface-subtle px-4 py-3 text-left text-label-default text-primary-container"
              >
                Bantuan &amp; Batas Produk
              </button>
              <details className="rounded-xl border border-border-default p-4">
                <summary className="rounded text-label-default text-status-error-text">
                  Reset Pilihan dan Tugas Contoh
                </summary>
                <p className="mt-3 text-caption-meta text-secondary">
                  Daftar simpan, perbandingan, dan perubahan tugas contoh akan
                  kembali ke kondisi awal. Draf onboarding tidak dihapus.
                </p>
                {error && (
                  <p
                    role="alert"
                    className="mt-2 text-caption-meta text-status-error-text"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (reset()) {
                      setPanel(null);
                      notify(
                        "Pilihan workspace kembali ke kondisi awal. Draf onboarding tetap ada.",
                      );
                    }
                  }}
                  className="mt-3 rounded-lg bg-status-error-text px-4 py-2 text-label-default text-white"
                >
                  Ya, Reset Workspace
                </button>
              </details>
            </div>
          )}
          {panel.kind === "help" && (
            <div className="mt-5 space-y-4 text-body-default text-secondary">
              <p>
                Beranda menyediakan satu langkah berikutnya. Jelajah berisi enam
                program contoh yang bisa dicari, difilter, disimpan, dan
                dibandingkan maksimal tiga sekaligus.
              </p>
              <p>
                Pilihan Simpan berbeda dari Bandingkan. Filter biaya memakai
                batas atas rentang pendidikan per tahun; data yang belum
                diketahui tidak dianggap Rp0.
              </p>
              <p>
                Profil Dimas dan Rani adalah skenario sintetis. Mode otomatis
                membaca draf onboarding yang kamu setujui, tanpa memasukkan
                progres contoh ke dalamnya.
              </p>
              <p>
                Satu misi tidak menggambarkan seluruh jurusan. Produk tidak
                mendiagnosis bakat, memprediksi penerimaan, atau menjamin
                beasiswa dan pekerjaan.
              </p>
              <Link
                href="/#batas-produk"
                onClick={() => setPanel(null)}
                className="inline-block rounded text-label-default text-primary-container underline"
              >
                Baca Batas Produk
              </Link>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
