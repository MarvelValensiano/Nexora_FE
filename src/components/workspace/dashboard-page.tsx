"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { programs, taskIsOverdue } from "@/lib/workspace/domain";
import { useExploration } from "./exploration-ui";
import { ProgramCard } from "./program-card";

export function DashboardPage() {
  const {
    profile,
    draft,
    state,
    selection,
    setPanel,
    toggleCompare,
    hydrated,
    today,
    aid,
  } = useExploration();
  const hasProgress = profile.key === "dimas";
  const needsOnboarding = profile.isDraft && !draft.completedAt;
  const tasks = hasProgress ? state.tasks : [];
  const remaining =
    tasks.filter((task) => !task.done).length + (aid.task && !aid.done ? 1 : 0);
  const overdue = tasks.filter((task) => taskIsOverdue(task, today)).length;
  const selected = programs.filter((program) =>
    selection.compareIds.includes(program.id),
  );
  const metrics = [
    {
      title: "Misi Dicoba",
      icon: "science",
      value: `${profile.missions}/3 Misi`,
      note: hasProgress ? "Contoh: Informatika selesai" : "Belum dimulai",
      tone: hasProgress ? "bg-emerald-500" : "bg-gray-400",
    },
    {
      title: "Pilihan Disimpan",
      icon: "bookmark",
      value: `${selection.savedIds.length} Prodi`,
      note: selection.savedIds.length
        ? "Simpanan tab profil ini"
        : "Simpan dari katalog",
      tone: "bg-indigo-500",
    },
    {
      title: "Rencana 30 Hari",
      icon: "calendar_today",
      value: `${remaining} Tugas`,
      note: overdue
        ? `${overdue} lewat tanggal target`
        : tasks.length || aid.task
          ? `${tasks.filter((task) => task.done).length + (aid.done ? 1 : 0)} tugas tab selesai`
          : "Belum ada rencana aktif",
      tone: overdue ? "bg-amber-500" : "bg-gray-400",
    },
    {
      title: "Progres Profil",
      icon: "pie_chart",
      value: `${profile.profileSteps}/4 Bagian`,
      note: "Berisi / sudah ditinjau",
      tone: profile.profileSteps === 4 ? "bg-emerald-500" : "bg-gray-400",
    },
  ];
  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-8">
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container to-hero-gradient-end p-6 text-white shadow-sm sm:p-7">
          <span className="inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold tracking-wider uppercase">
            {profile.grade && profile.grade !== "other"
              ? `Kelas ${profile.grade} SMA`
              : "Eksplorasi Siswa"}{" "}
            ·{" "}
            {profile.isDraft
              ? "Draf Onboarding"
              : hasProgress
                ? "Contoh Sesi Mandiri"
                : "Contoh Sesi Awal"}
          </span>
          <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight">
            {hasProgress
              ? "Selamat Datang Kembali"
              : "Selamat Datang di Nexalora"}
            , {profile.name}!
          </h1>
          <p className="mt-2 text-[13px] leading-relaxed text-white/90">
            {needsOnboarding
              ? "Lanjutkan draf profilmu dari langkah terakhir. Preferensi dan nilai dapat dilengkapi kemudian."
              : hasProgress
                ? "Lihat contoh perjalanan eksplorasi: draf misi, pilihan studi, dan tugas mingguan yang dapat ditinjau kembali."
                : "Mulai dengan satu aktivitas belajar, lalu pertimbangkan pilihan studi tanpa tekanan atau skor vonis."}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {needsOnboarding ? (
              <Link
                href="/onboarding"
                className="rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-primary-container shadow-sm"
              >
                Lanjutkan Onboarding
              </Link>
            ) : (
              <button
                type="button"
                onClick={() => setPanel({ kind: "missions" })}
                className="rounded-xl bg-white px-4 py-2.5 text-[13px] font-semibold text-primary-container shadow-sm"
              >
                {hasProgress
                  ? "Lihat Contoh Misi: Teknik Industri"
                  : "Pilih Simulasi Pertama"}
              </button>
            )}
            <Link
              href={hasProgress ? "/rekomendasi" : "/jelajah"}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-white hover:bg-white/10"
            >
              {hasProgress ? "Lihat Pilihan Studi" : "Jelajahi Katalog Umum"}
              <Icon name="arrow_forward" className="text-base" />
            </Link>
          </div>
        </section>
        <section
          aria-label="Ringkasan perjalanan eksplorasi"
          className="grid grid-cols-2 gap-3 md:grid-cols-4"
        >
          {metrics.map((metric) => (
            <div
              key={metric.title}
              className="flex min-h-[132px] min-w-0 flex-col justify-between rounded-2xl border border-border-default bg-white p-3.5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-1">
                <h2 className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                  {metric.title}
                </h2>
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-secondary">
                  <Icon name={metric.icon} className="text-base" />
                </span>
              </div>
              <p className="my-2 text-xl leading-none font-bold tracking-tight">
                {metric.value}
              </p>
              <p className="flex items-start gap-1.5 text-[10px] leading-relaxed text-secondary">
                <span
                  className={`mt-1 size-1.5 shrink-0 rounded-full ${metric.tone}`}
                />
                {metric.note}
              </p>
            </div>
          ))}
        </section>
        <section className="space-y-3" id="simulasi-pertama">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-bold">
              {hasProgress
                ? "Lanjutkan Simulasi Belajar"
                : "Simulasi Belajar Pertama"}
            </h2>
            <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
              {hasProgress ? "1 Draf Contoh" : "3 Pilihan Misi"}
            </span>
          </div>
          <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border-subtle bg-white p-5 shadow-sm sm:flex-row sm:items-center">
            <div className="flex min-w-0 items-start gap-3.5">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border-default bg-surface-subtle text-primary-container">
                <Icon name="play_circle" className="text-2xl" />
              </span>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
                  {hasProgress
                    ? "Teknik Industri · Cuplikan Draf"
                    : "Informatika · Teknik Industri · DKV"}
                </span>
                <h3 className="mt-1 text-sm font-bold leading-relaxed">
                  {hasProgress
                    ? "Mengatur Antrean Kantin — Langkah 2/3"
                    : "Coba Aktivitas Belajar Sebelum Memilih"}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-secondary">
                  {hasProgress
                    ? "Contoh progres 65%. Belum merupakan draf runner yang tersimpan."
                    : "Misi dapat dijelajahi tanpa menerima rekomendasi terlebih dahulu."}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setPanel({ kind: "missions" })}
              className="shrink-0 rounded-xl bg-primary-container px-5 py-2.5 text-[13px] font-semibold text-white hover:bg-primary"
            >
              {hasProgress ? "Lihat Brief Misi" : "Pilih Misi"}
            </button>
          </div>
        </section>
        <section className="space-y-3.5" id="pilihan-studi">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
            <div>
              <h2 className="text-base font-bold">
                {hasProgress
                  ? "Contoh Pilihan Berdasarkan Bukti"
                  : "Eksplorasi Katalog Umum (Belum Diurutkan)"}
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-secondary">
                {profile.isDraft
                  ? profile.sufficient
                    ? "Jawaban minat awal tersedia. Kartu ini tetap katalog sintetis; mesin rekomendasi personal belum dihubungkan."
                    : "Jawaban minat belum cukup. Kamu tetap bisa meninjau semua pilihan umum."
                  : hasProgress
                    ? "Ilustrasi penyajian minat, akademik, dan biaya secara terpisah."
                    : "Data parsial tetap bisa dipakai untuk memulai eksplorasi umum."}
              </p>
            </div>
            <Link
              href="/rekomendasi"
              className="inline-flex shrink-0 items-center gap-1 rounded text-xs font-semibold text-primary-container hover:underline"
            >
              Buka Rekomendasi &amp; Bukti
              <Icon name="arrow_forward" className="text-sm" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                variant="dashboard"
              />
            ))}
          </div>
        </section>
      </div>
      <div className="flex min-w-0 flex-col gap-6 lg:col-span-4">
        <section className="space-y-3.5 rounded-2xl border border-border-default bg-white p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-low text-primary-container">
              <Icon
                name={hasProgress ? "notifications_active" : "lightbulb"}
                className="text-lg"
              />
            </span>
            <div>
              <p className="text-[10px] font-semibold tracking-wider text-primary-container uppercase">
                {hasProgress ? "Pemberitahuan Contoh" : "Langkah Berikutnya"}
              </p>
              <h2 className="mt-1 text-sm leading-snug font-bold">
                {hasProgress
                  ? state.reviewApplied
                    ? "Contoh Perubahan Sudah Ditinjau"
                    : "Pratinjau Perubahan Rekomendasi"
                  : needsOnboarding
                    ? "Lengkapi Konteks Eksplorasimu"
                    : "Mulai dengan Satu Aktivitas"}
              </h2>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-secondary">
            {hasProgress
              ? "Lihat bagaimana refleksi dapat menjadi alasan untuk meninjau pilihan. Contoh ini tidak mengubah urutan rekomendasi aktual."
              : needsOnboarding
                ? "Drafmu dapat dilanjutkan. Nilai dan anggaran tetap boleh ditunda."
                : "Coba pengalaman belajar dan catat apa yang menarik, sulit, atau ingin kamu pelajari lagi."}
          </p>
          {needsOnboarding ? (
            <Link
              href="/onboarding"
              className="block rounded-xl bg-primary-container px-4 py-2.5 text-center text-xs font-semibold text-white"
            >
              Lanjutkan Profil
            </Link>
          ) : (
            <button
              type="button"
              onClick={() =>
                setPanel({ kind: hasProgress ? "review" : "missions" })
              }
              className="w-full rounded-xl bg-primary-container px-4 py-2.5 text-xs font-semibold text-white hover:bg-primary"
            >
              {hasProgress
                ? "Tinjau Contoh Perubahan"
                : "Pilih Simulasi Pertama"}
            </button>
          )}
        </section>
        <section
          className="space-y-3.5 rounded-2xl border border-border-default bg-white p-5 shadow-sm"
          id="rencana"
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold">Tugas Minggu Ini</h2>
              <p className="mt-0.5 text-xs text-secondary">
                {hasProgress
                  ? "Contoh Rencana 30 Hari"
                  : aid.task
                    ? "Agenda Referensi Tab Ini"
                    : "Belum Ada Rencana Aktif"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPanel({ kind: "agenda" })}
              className="rounded text-xs font-semibold text-primary-container hover:underline"
            >
              Buka Agenda
            </button>
          </div>
          {hasProgress ? (
            <div className="space-y-2">
              {tasks.map((task) => {
                const isOverdue = taskIsOverdue(task, today);
                return (
                  <button
                    key={task.id}
                    type="button"
                    onClick={() => setPanel({ kind: "agenda" })}
                    className={`flex w-full items-start justify-between gap-2 rounded-xl border p-3 text-left ${isOverdue ? "border-amber-200 bg-amber-50" : "border-border-default bg-surface-subtle"}`}
                  >
                    <span className="min-w-0">
                      <span
                        className={`block text-xs font-semibold leading-relaxed ${task.done ? "text-secondary line-through" : ""}`}
                      >
                        {task.title}
                      </span>
                      <span
                        className={`mt-1 block text-[11px] ${isOverdue ? "text-amber-800" : "text-secondary"}`}
                      >
                        {task.done
                          ? "Selesai"
                          : isOverdue
                            ? "Lewat tanggal target · Jadwalkan ulang"
                            : `Target ${task.dueDate}`}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-lg border border-border-default bg-white px-2 py-0.5 text-[10px] text-secondary">
                      {task.done ? "Tinjau" : "Jadwal"}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {[
                "Coba satu aktivitas simulasi",
                "Tinjau data profil yang ingin dilengkapi",
                "Bandingkan dua pilihan studi",
              ].map((title, index) => (
                <div
                  key={title}
                  className="rounded-xl border border-border-default bg-surface-subtle p-3"
                >
                  <p className="text-xs font-semibold">{title}</p>
                  <p className="mt-1 text-[11px] text-secondary">
                    {index === 1
                      ? "Opsional, bukan syarat menjelajah"
                      : "Saran langkah, belum menjadi tugas aktif"}
                  </p>
                </div>
              ))}
            </div>
          )}
          {aid.task && (
            <button
              type="button"
              onClick={() => setPanel({ kind: "agenda" })}
              className="w-full rounded-xl border border-border-default bg-surface-subtle p-3 text-left"
            >
              <span
                className={`block text-xs font-semibold ${aid.done ? "line-through text-secondary" : ""}`}
              >
                Cek syarat bantuan pendidikan contoh
              </span>
              <span className="mt-1 block text-[11px] text-secondary">
                {aid.done
                  ? "Selesai di tab ini"
                  : "Tugas tab · Tanpa tenggat resmi"}
              </span>
            </button>
          )}
        </section>
        <section className="space-y-3.5 rounded-2xl border border-border-default bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold">Slot Bandingkan</h2>
            <span className="rounded-full border border-border-default bg-surface-subtle px-2 py-0.5 text-[11px] font-semibold text-secondary">
              {selection.compareIds.length} / 3
            </span>
          </div>
          {selected.length ? (
            <div className="space-y-2">
              {selected.map((program) => (
                <div
                  key={program.id}
                  className="flex items-center justify-between gap-2 rounded-xl border border-border-default bg-surface-subtle p-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold">{program.name}</p>
                    <p className="mt-1 text-[11px] text-secondary">
                      {program.campus}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={!hydrated}
                    onClick={() => toggleCompare(program.id)}
                    aria-label={`Hapus ${program.name} dari perbandingan`}
                    className="flex size-7 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-white"
                  >
                    <Icon name="close" className="text-base" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-border-default bg-surface-subtle p-4 text-center text-xs leading-relaxed text-secondary">
              <Icon name="balance" className="mb-2 text-xl" />
              <p>
                Pilih tombol Bandingkan di katalog untuk melihat perbandingan
                prodi.
              </p>
            </div>
          )}
          {selected.length < 3 && (
            <Link
              href="/jelajah"
              className="flex items-center justify-center gap-1 rounded-xl border border-dashed border-outline-variant p-2.5 text-xs text-secondary hover:text-primary-container"
            >
              <Icon name="add" className="text-base" />
              Tambah Pilihan
            </Link>
          )}
          <button
            type="button"
            disabled={selected.length === 0}
            onClick={() => setPanel({ kind: "compare" })}
            className="w-full rounded-xl bg-text-primary px-3 py-3 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Buka Matriks Perbandingan ({selected.length})
          </button>
        </section>
      </div>
    </div>
  );
}
