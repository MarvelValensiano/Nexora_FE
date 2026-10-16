"use client";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import { ProgramRows } from "./program-rows";

type DemoContentProps = {
  query: string;
  selectedPrograms: string[];
  toggleProgram: (id: string) => void;
  resetDemo: () => void;
  setAccountOpen: (open: boolean) => void;
  showFeature: (feature: string) => void;
};

export function DemoContent({
  query,
  selectedPrograms,
  toggleProgram,
  resetDemo,
  setAccountOpen,
  showFeature,
}: DemoContentProps) {
  return (
    <main
      id="main-content"
      className="pt-6 px-4 md:px-8 pb-24 max-w-7xl mx-auto flex flex-col gap-6"
    >
      <div
        className="sticky top-32 md:top-20 z-30 rounded-xl bg-[#FEF3C7] border border-[#FDE68A] px-6 py-3 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-300"
        id="demo-global-banner"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0">
            <Icon name="info" className="text-[18px]" />
          </div>
          <p className="text-sm font-semibold text-[#92400E] leading-snug">
            Mode demo: data di sini contoh dan tidak tersimpan ke akunmu.
          </p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0 self-end sm:self-center">
          <button
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-[#92400E] bg-[#FFFFFF] border border-[#FCD34D] hover:bg-[#FFFBEB] transition-colors shadow-sm whitespace-nowrap"
            onClick={resetDemo}
            type="button"
          >
            Reset Demo
          </button>
          <button
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5B5BD6] hover:bg-[#4241BC] transition-colors shadow-sm whitespace-nowrap"
            onClick={() => setAccountOpen(true)}
            type="button"
          >
            Buat Akun
          </button>
        </div>
      </div>
      <section className="rounded-2xl bg-gradient-to-r from-[#5B5BD6] to-[#6E6EED] p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-white border border-white/20">
            <span className="">
              PROFIL CONTOH · KELAS XI SMA · Sesi Demo Sandbox
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mt-1">
            Selamat Datang di Mode Demo Nexalora
          </h1>
          <p className="text-sm lg:text-base text-[#EDE8FF] leading-relaxed max-w-2xl">
            Jelajahi fitur rekomendasi, lihat contoh simulasi prodi, dan lihat
            transparansi alasan tanpa skor vonis. Seluruh informasi di halaman
            ini merupakan contoh tampilan.
          </p>
          <div className="flex flex-wrap items-center gap-2.5 mt-2 pt-4 border-t border-white/15">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold backdrop-blur-sm">
              <Icon
                name="check_circle"
                className="text-[16px] text-[#A7F3D0]"
              />
              <span id="hero-stat-mission" className="">
                1 Misi Contoh Ditampilkan
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold backdrop-blur-sm">
              <Icon
                name="compare_arrows"
                className="text-[16px] text-[#FDE68A]"
              />
              <span id="hero-stat-compare" className="">
                {selectedPrograms.length} Prodi dalam Bandingkan
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-semibold backdrop-blur-sm">
              <Icon name="dns" className="text-[16px] text-white" />
              <span className="">Penyimpanan Lokal Sementara</span>
            </div>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#111827]">
              Skenario Uji Coba Pilihan
            </h2>
            <p className="text-xs text-[#6B7280]">
              Coba simulasi interaktif tanpa perlu mengisi data pribadi terlebih
              dahulu.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B5BD6] bg-[#EEF2FF] px-2.5 py-1 rounded-full border border-[#E0E7FF]">
            3 Opsi Simulasi
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-5 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-[#F3F4F8] text-[#4B5563] text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
                  Informatika · Logika
                </span>
                <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">
                  15 Menit
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111827]">
                Menyusun Alur Pesanan Kantin
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Uji kemampuan logika algoritma lewat studi kasus nyata antrean
                kantin.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EEF0F6] flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#4B5563] bg-[#F3F4F8] px-2 py-0.5 rounded whitespace-nowrap">
                Siap Diuji
              </span>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#5B5BD6] hover:bg-[#4241BC] transition-colors whitespace-nowrap"
                onClick={() => showFeature("Simulasi Misi Informatika")}
                type="button"
              >
                Mulai Uji
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-5 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-[#F3F4F8] text-[#4B5563] text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
                  Multi-Dimensi
                </span>
                <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">
                  Matriks
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111827]">
                Komparasi 3 Program Studi
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Lihat perbandingan berdampingan syarat akademik dan kelayakan
                biaya.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EEF0F6] flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#4B5563] bg-[#F3F4F8] px-2 py-0.5 rounded whitespace-nowrap">
                {selectedPrograms.length} Prodi Terpilih
              </span>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#5B5BD6] bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors whitespace-nowrap"
                onClick={() => showFeature("Bandingkan Program Studi")}
                type="button"
              >
                Bandingkan
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-5 shadow-sm flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-[#F3F4F8] text-[#4B5563] text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap">
                  Kelayakan Praktis
                </span>
                <span className="text-xs text-[#6B7280] font-medium whitespace-nowrap">
                  Real-time
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#111827]">
                Eksplorasi Skenario &ldquo;Bagaimana Jika?&rdquo;
              </h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">
                Uji penyesuaian biaya, beasiswa, dan lokasi kampus terhadap
                rekomendasi.
              </p>
            </div>
            <div className="pt-3 border-t border-[#EEF0F6] flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-[#4B5563] bg-[#F3F4F8] px-2 py-0.5 rounded whitespace-nowrap">
                Simulator
              </span>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#4B5563] bg-[#F3F4F8] hover:bg-[#E5E7EB] transition-colors whitespace-nowrap"
                onClick={() => showFeature("Simulator Skenario")}
                type="button"
              >
                Ubah Parameter
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-[#EEF0F6]">
              <div>
                <h3 className="text-base font-bold text-[#111827]">
                  Evaluasi Berdasarkan Bukti Belajar (Data Sintetis Dimas Arkan)
                </h3>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Tinjauan multidimensi tanpa vonis skor tunggal. Contoh
                  penyajian minat, akademik, dan biaya secara terpisah.
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3F4F8] text-[#464553] text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B5BD6]"></span>
                  Data Contoh Terbuka
                </span>
              </div>
            </div>
            <div id="evaluasi" className="overflow-x-auto mt-4">
              <table className="demo-evaluation-table w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] font-bold text-[#6B7280] uppercase tracking-wider bg-[#F8F9FC] border-y border-[#EEF0F6]">
                    <th className="py-3 px-4 rounded-l-lg">
                      Program Studi &amp; Status
                    </th>
                    <th className="py-3 px-4">Minat Belajar</th>
                    <th className="py-3 px-4">Kesiapan Akademik</th>
                    <th className="py-3 px-4 rounded-r-lg">
                      Kelayakan Praktis &amp; Biaya
                    </th>
                  </tr>
                </thead>
                <ProgramRows
                  query={query}
                  selectedPrograms={selectedPrograms}
                  onToggle={toggleProgram}
                />
              </table>
            </div>
            <div className="mt-4 pt-3 border-t border-[#EEF0F6] flex items-center justify-between text-[11px] text-[#6B7280]">
              <span className="flex items-center gap-1">
                <Icon name="verified" className="text-[14px]" />
                Data universitas di atas sepenuhnya sintetis untuk tujuan demo
                simulasi.
              </span>
              <Link
                className="text-[#5B5BD6] font-semibold hover:underline"
                href="/#batas-produk"
              >
                Pelajari Metrik Penilaian
              </Link>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-[#111827]">
              <div className="w-8 h-8 rounded-lg bg-[#F3F4F8] text-[#4B5563] flex items-center justify-center shrink-0">
                <Icon name="lightbulb" className="text-[18px]" />
              </div>
              <h4 className="text-sm font-bold text-[#111827]">
                Cara Kerja Mode Demo
              </h4>
            </div>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Semua tindakan yang kamu lakukan bersifat sementara di peramban
              ini. Data kembali ke kondisi awal saat kamu memuat ulang halaman
              atau mengeklik tombol <strong>Reset demo</strong>.
            </p>
            <div className="pt-3 border-t border-[#EEF0F6] flex items-center justify-between text-[11px] font-semibold text-[#6B7280]">
              <span className="">STATUS SESI</span>
              <span className="text-[#5B5BD6] bg-[#EEF2FF] px-2 py-0.5 rounded">
                TIDAK TERSIMPAN KE SERVER
              </span>
            </div>
          </div>
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-5 shadow-sm flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#111827]">
                Rencana 30 Hari Contoh
              </h4>
              <span className="text-[11px] font-bold text-[#5B5BD6] bg-[#EEF2FF] px-2 py-0.5 rounded-full">
                Minggu 1
              </span>
            </div>
            <p className="text-xs text-[#6B7280]">
              Daftar kegiatan bertahap untuk mengenali prodi incaran:
            </p>
            <div className="space-y-2.5">
              <div className="p-2.5 rounded-xl bg-[#F8F9FC] border border-[#EEF0F6] flex items-start gap-2.5">
                <Icon
                  name="check_circle"
                  className="text-[#15803D] text-[18px] shrink-0 mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#111827] line-through text-[#9CA3AF]">
                    Eksplorasi Minat Logika &amp; Desain
                  </span>
                  <span className="text-[11px] text-[#6B7280]">
                    Selesai dalam profil contoh Dimas
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#EEF2FF] border border-[#E0E7FF] flex items-start gap-2.5">
                <Icon
                  name="play_circle"
                  className="text-[#5B5BD6] text-[18px] shrink-0 mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#5B5BD6]">
                    Kerjakan Simulasi Misi Informatika
                  </span>
                  <span className="text-[11px] text-[#4F46E5]">
                    Target hari ini (15 menit)
                  </span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-[#FFFFFF] border border-[#EEF0F6] flex items-start gap-2.5">
                <Icon
                  name="radio_button_unchecked"
                  className="text-[#9CA3AF] text-[18px] shrink-0 mt-0.5"
                />
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-[#4B5563]">
                    Diskusi Ringkasan dengan Orang Tua
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">
                    Contoh tindakan yang bisa kamu rencanakan
                  </span>
                </div>
              </div>
            </div>
            <button
              className="w-full py-2 rounded-lg text-xs font-semibold text-[#5B5BD6] bg-[#EEF2FF] hover:bg-[#E0E7FF] transition-colors text-center mt-1"
              onClick={() => showFeature("Buka Rencana Lengkap")}
              type="button"
            >
              Lihat Kalender Lengkap
            </button>
          </div>
          <div className="rounded-2xl bg-[#EEF2FF] border border-[#E0E7FF] p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#5B5BD6]">
              <Icon name="badge" className="text-[20px]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Paspor Belajar
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#111827] leading-snug">
              Simpan ke Paspor Belajar
            </h4>
            <p className="text-xs text-[#4B5563] leading-relaxed">
              Akun pribadi akan menyimpan perjalanan eksplorasi milikmu. Data
              sintetis Dimas pada demo ini tetap terpisah dari data pribadimu.
            </p>
            <button
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-[#5B5BD6] hover:bg-[#4241BC] transition-colors shadow-sm text-center mt-1"
              onClick={() => setAccountOpen(true)}
              type="button"
            >
              Daftar Akun Sekarang
            </button>
          </div>
        </div>
      </div>
      <section className="rounded-2xl bg-[#FFFFFF] border border-[#EEF0F6] p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#F3F4F8] text-[#4B5563] flex items-center justify-center shrink-0">
            <Icon name="bookmark" className="text-[20px]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#111827]">
              Ingin menyimpan hasil eksplorasi simulasi ini?
            </h4>
            <p className="text-xs text-[#6B7280] mt-0.5">
              Simpan bukti refleksi belajar dan hasil komparasi ke akun
              pribadimu secara gratis.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            className="px-4 py-2.5 rounded-lg text-xs font-semibold text-[#4B5563] bg-[#FFFFFF] border border-[#E5E7EB] hover:bg-[#F3F4F8] transition-colors"
            onClick={resetDemo}
            type="button"
          >
            Bersihkan Riwayat Demo
          </button>
          <button
            className="px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-[#5B5BD6] hover:bg-[#4241BC] transition-colors shadow-sm"
            onClick={() => setAccountOpen(true)}
            type="button"
          >
            Buat Akun Gratis
          </button>
        </div>
      </section>
    </main>
  );
}
