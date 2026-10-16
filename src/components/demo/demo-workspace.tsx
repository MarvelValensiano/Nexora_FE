"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { AccountDialogContent } from "./account-dialog-content";
import { DemoContent } from "./demo-content";
import { demoPrograms } from "./demo-data";

const navigation = [
  ["Beranda", "home", "/beranda"],
  ["Jelajah", "explore", "/jelajah"],
  ["Simulasi", "sports_esports", "/#simulasi-misi"],
  ["Rencana", "calendar_today", "rencana"],
  ["Profil", "person", "profil"],
] as const;

export function DemoWorkspace() {
  const [query, setQuery] = useState("");
  const [selectedPrograms, setSelectedPrograms] = useState([
    "informatika",
    "industri",
  ]);
  const [accountOpen, setAccountOpen] = useState(false);
  const [feature, setFeature] = useState<string | null>(null);
  const [toast, setToast] = useState("");
  const [budget, setBudget] = useState(2800000);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  function notify(message: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(""), 4000);
  }

  function resetDemo() {
    setQuery("");
    setSelectedPrograms(["informatika", "industri"]);
    setBudget(2800000);
    setFeature(null);
    notify("Data demo berhasil di-reset ke kondisi awal.");
  }

  function toggleProgram(id: string) {
    setSelectedPrograms((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id].slice(0, 3),
    );
  }

  function showFeature(name: string) {
    setFeature(name);
  }

  const navItems = navigation.map(([label, icon, href]) => {
    const classes = `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${label === "Jelajah" ? "bg-[#EEF2FF] text-primary-container" : "text-text-secondary hover:bg-surface-subtle hover:text-text-primary"}`;
    return href.startsWith("/") ? (
      <Link
        key={label}
        href={href}
        className={classes}
        aria-current={label === "Jelajah" ? "page" : undefined}
      >
        <Icon name={icon} className="text-xl" />
        <span>{label}</span>
      </Link>
    ) : (
      <button
        key={label}
        type="button"
        className={classes}
        onClick={() =>
          showFeature(
            href === "rencana" ? "Buka Rencana Lengkap" : "Profil Demo",
          )
        }
      >
        <Icon name={icon} className="text-xl" />
        <span>{label}</span>
      </button>
    );
  });

  return (
    <div className="min-h-screen bg-canvas">
      <aside
        aria-label="Navigasi aplikasi"
        className="fixed inset-y-0 left-0 z-40 hidden w-[240px] flex-col justify-between border-r border-border-subtle bg-white py-6 xl:flex"
      >
        <div>
          <Link
            href="/"
            className="mb-7 flex px-6"
            aria-label="Nexalora beranda"
          >
            <Brand className="h-8 w-auto max-w-[160px]" />
          </Link>
          <div className="px-3">
            <p className="mb-2 px-3 text-[11px] font-bold tracking-wider text-secondary uppercase">
              Menu Utama
            </p>
            <nav className="flex flex-col gap-1">{navItems}</nav>
          </div>
        </div>
        <div className="mx-3 flex items-start gap-2.5 rounded-xl border border-status-info-bg bg-surface-container-low p-3">
          <Icon name="info" className="mt-0.5 text-lg text-primary-container" />
          <p className="text-[11px] leading-snug text-secondary">
            Data contoh interaktif tidak disimpan permanen.
          </p>
        </div>
      </aside>
      <div className="xl:pl-[240px]">
        <header className="sticky top-0 z-40 flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-white px-4 py-3 md:px-8">
          <Link href="/" className="xl:hidden" aria-label="Nexalora beranda">
            <Brand className="h-8 w-auto" />
          </Link>
          <label className="order-3 flex w-full items-center gap-2.5 rounded-xl border border-border-subtle bg-canvas px-3.5 py-2 focus-within:border-primary-container md:order-none md:max-w-sm">
            <Icon name="search" className="text-lg text-secondary" />
            <span className="sr-only">Cari program studi demo</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-secondary"
              placeholder="Cari jurusan atau kampus contoh..."
            />
          </label>
          <div className="flex items-center gap-2 md:gap-3">
            <span className="rounded-full border border-[#FDE68A] bg-status-warning-bg px-2.5 py-1.5 text-xs font-semibold text-status-warning-text">
              Mode Demo
            </span>
            <button
              type="button"
              onClick={() => showFeature("Bandingkan Program Studi")}
              className="flex items-center gap-1.5 rounded-full border border-status-info-bg bg-[#EEF2FF] px-2.5 py-1.5 text-xs font-semibold text-primary-container"
            >
              <Icon name="compare_arrows" className="text-base" />
              <span className="hidden md:inline">Bandingkan </span>(
              {selectedPrograms.length}/3)
            </button>
            <button
              type="button"
              onClick={() => showFeature("Profil Demo")}
              className="flex items-center gap-2 border-l border-border-subtle pl-2"
              aria-label="Lihat profil sintetis Dimas"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">
                DA
              </span>
              <span className="hidden flex-col text-left md:flex">
                <span className="text-xs font-semibold">Dimas</span>
                <span className="text-[11px] text-text-secondary">
                  Tamu Demo
                </span>
              </span>
            </button>
          </div>
        </header>
        <DemoContent
          query={query}
          selectedPrograms={selectedPrograms}
          toggleProgram={toggleProgram}
          resetDemo={resetDemo}
          setAccountOpen={setAccountOpen}
          showFeature={showFeature}
        />
      </div>
      <nav
        aria-label="Navigasi aplikasi mobile"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border-subtle bg-white/95 px-1 py-2 backdrop-blur-xl xl:hidden"
      >
        {navigation.map(([label, icon, href]) =>
          href.startsWith("/") ? (
            <Link
              key={label}
              href={href}
              aria-current={label === "Jelajah" ? "page" : undefined}
              className={`flex flex-col items-center gap-1 rounded-lg px-1 py-1 text-[10px] ${label === "Jelajah" ? "text-primary" : "text-secondary"}`}
            >
              <Icon name={icon} className="text-xl" />
              {label}
            </Link>
          ) : (
            <button
              key={label}
              type="button"
              onClick={() =>
                showFeature(
                  href === "rencana" ? "Buka Rencana Lengkap" : "Profil Demo",
                )
              }
              className="flex flex-col items-center gap-1 rounded-lg px-1 py-1 text-[10px] text-secondary"
            >
              <Icon name={icon} className="text-xl" />
              {label}
            </button>
          ),
        )}
      </nav>
      <Modal
        open={accountOpen}
        onClose={() => setAccountOpen(false)}
        labelledBy="dialog-title"
        describedBy="dialog-subtitle"
      >
        <AccountDialogContent
          onClose={() => {
            setAccountOpen(false);
            notify(
              "Mode Demo tetap aktif. Data contoh hanya tersedia sementara.",
            );
          }}
        />
      </Modal>
      <Modal
        open={feature !== null}
        onClose={() => setFeature(null)}
        labelledBy="feature-title"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="feature-title" className="text-headline-h2">
              {feature}
            </h2>
            <button
              type="button"
              onClick={() => setFeature(null)}
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle"
              aria-label="Tutup pratinjau"
            >
              <Icon name="close" />
            </button>
          </div>
          <p className="mt-3 text-caption-meta text-secondary">
            Pratinjau dengan data sintetis.
          </p>
          {feature === "Bandingkan Program Studi" ? (
            <div className="mt-5 flex flex-col gap-3">
              {selectedPrograms.length === 0 && (
                <p>
                  Belum ada prodi dipilih. Gunakan kotak Bandingkan pada daftar.
                </p>
              )}
              {demoPrograms
                .filter((program) => selectedPrograms.includes(program.id))
                .map((program) => (
                  <article
                    key={program.id}
                    className="rounded-xl border border-border-subtle p-4"
                  >
                    <h3 className="text-body-strong">{program.name}</h3>
                    <p className="mt-2 text-secondary">
                      Minat: {program.interest}
                    </p>
                    <p className="text-secondary">
                      Akademik: {program.academic}
                    </p>
                    <p className="text-secondary">Biaya: {program.cost}</p>
                    <p className="mt-2 text-caption-meta text-secondary">
                      {program.costNote}
                    </p>
                  </article>
                ))}
            </div>
          ) : feature === "Simulator Skenario" ? (
            <div className="mt-5 space-y-4">
              <p>
                Contoh estimasi bulanan Rp2.600.000–Rp3.100.000. Biaya awal
                dinilai terpisah.
              </p>
              <label className="block text-body-strong" htmlFor="demo-budget">
                Anggaran maksimum bulanan
              </label>
              <input
                id="demo-budget"
                type="range"
                min="1000000"
                max="5000000"
                step="100000"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full accent-primary"
              />
              <output htmlFor="demo-budget" className="block text-headline-h2">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  maximumFractionDigits: 0,
                }).format(budget)}
              </output>
              <p
                aria-live="polite"
                className="rounded-xl bg-surface-container-low p-4 font-semibold"
              >
                {budget >= 3100000
                  ? "Dalam rentang anggaran berdasarkan estimasi"
                  : budget >= 2600000
                    ? "Bergantung pada skenario biaya; perlu diperiksa"
                    : "Memerlukan bantuan biaya atau perubahan rencana"}
              </p>
              <p className="text-caption-meta text-secondary">
                Skenario ini tidak mengubah profil. Seluruh angka adalah contoh
                perhitungan.
              </p>
            </div>
          ) : feature === "Profil Demo" ? (
            <div className="mt-5 space-y-3">
              <p>Nama: Dimas Arkan · Kelas XI SMA</p>
              <p>
                Profil ini dibuat untuk demonstrasi. Nilai, pilihan, dan
                pengalaman yang ditampilkan adalah data sintetis.
              </p>
              <p className="text-secondary">
                Data pribadi siswa akan dikelola melalui akun terpisah.
              </p>
            </div>
          ) : feature === "Buka Rencana Lengkap" ? (
            <ol className="mt-5 list-decimal space-y-4 pl-5">
              <li>
                Coba satu aktivitas logika atau visual dan tulis hal yang
                dipelajari.
              </li>
              <li>
                Bandingkan dua prodi melalui kurikulum dan persyaratan resmi.
              </li>
              <li>
                Periksa biaya dan diskusikan satu pertanyaan dengan BK atau
                keluarga.
              </li>
              <li>Tinjau satu arah karier dan tentukan langkah berikutnya.</li>
            </ol>
          ) : (
            <div className="mt-5 space-y-4">
              <p>
                Susun aturan pesanan kantin, amati perubahan stok dan tiket,
                lalu revisi alur untuk kasus pembayaran gagal atau stok habis.
              </p>
              <p className="rounded-xl bg-surface-container-low p-4 text-secondary">
                Editor blok dan runner simulasi akan diimplementasikan pada
                tahap layar simulasi. Halaman ini menampilkan brief misi.
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setFeature(null)}
            className="mt-6 w-full rounded-xl bg-primary-container px-5 py-3 text-body-strong text-white hover:bg-primary"
          >
            Kembali ke Demo
          </button>
        </div>
      </Modal>
      <div
        role="status"
        aria-live="polite"
        className={
          toast
            ? "fixed inset-x-4 bottom-24 z-50 mx-auto w-fit max-w-lg rounded-xl bg-inverse-surface px-5 py-3 text-xs text-inverse-on-surface shadow-lg xl:inset-x-auto xl:right-6 xl:bottom-6"
            : "sr-only"
        }
      >
        {toast}
      </div>
    </div>
  );
}
