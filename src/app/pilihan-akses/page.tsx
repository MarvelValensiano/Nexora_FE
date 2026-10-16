import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Pilihan Akses" };
export default function AccessPage() {
  return (
    <main
      id="main-content"
      className="w-full min-h-screen flex items-center justify-center p-4"
    >
      <div className="flex flex-col w-full">
        <div className="w-full max-w-5xl mx-auto px-4 py-8 md:py-14 flex flex-col items-center">
          <header className="flex flex-col items-center text-center max-w-2xl mb-12">
            <div className="flex items-center justify-center mb-5">
              <Brand />
            </div>
            <h1 className="font-headline-h1 text-headline-h1 text-text-primary mb-3">
              Pilih Cara Kamu Mengeksplorasi Nexalora
            </h1>
            <p className="font-body-default text-body-default text-text-secondary leading-relaxed">
              Kamu bebas mencoba fitur utama langsung dalam mode demo, atau
              membuat akun pribadi untuk menyimpan progres belajar di Nexalora.
            </p>
          </header>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8 items-stretch">
            <div className="group relative flex flex-col justify-between p-7 lg:p-8 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-caption-badge px-2.5 py-1 rounded-full bg-surface-subtle text-text-secondary uppercase font-semibold text-[11px] tracking-wider whitespace-nowrap">
                    Bebas Masuk · Tanpa Registrasi
                  </span>
                </div>
                <span className="font-label-default text-label-default text-text-secondary mb-1">
                  Mode Demo
                </span>
                <h2 className="font-headline-h2 text-headline-h2 text-text-primary mb-3">
                  Mulai Eksplorasi Instan Tanpa Buat Akun
                </h2>
                <p className="font-body-default text-body-default text-text-secondary mb-6 leading-relaxed">
                  Cocok untuk kamu yang ingin melihat langsung cara kerja
                  simulasi, mencoba komparasi jurusan, dan merasakan antarmuka
                  Nexalora.
                </p>
                <div className="flex flex-col gap-3.5 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Menggunakan data sintetis contoh (Univ Contoh A, B, C)
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Lihat contoh misi Informatika, Teknik Industri, dan DKV
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Pratinjau perbandingan minat, akademik, dan biaya
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Tanpa perlu email atau kata sandi
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-status-warning-bg/40 border border-status-warning-text/20 mb-6">
                  <Icon
                    name="info"
                    className="text-status-warning-text text-[18px] shrink-0 mt-0.5"
                  />
                  <p className="font-caption-meta text-caption-meta text-status-warning-text leading-tight">
                    <strong>Catatan:</strong> Hasil simulasi dan catatanmu tidak
                    tersimpan permanen saat browser ditutup.
                  </p>
                </div>
                <Link
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-default text-label-default transition-colors shadow-sm focus:outline-none"
                  href="/demo"
                >
                  <span className="">Masuk ke Mode Demo</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </Link>
              </div>
            </div>
            <div className="group relative flex flex-col justify-between p-7 lg:p-8 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-caption-badge px-2.5 py-1 rounded-full bg-surface-subtle text-text-secondary uppercase font-semibold text-[11px] tracking-wider whitespace-nowrap">
                    Tersimpan Aman · Fitur Lengkap
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-default text-label-default text-primary">
                    Akun Siswa Pribadi
                  </span>
                  <span className="font-caption-badge text-[10px] px-2 py-0.5 rounded-full bg-surface-subtle text-text-secondary border border-border-default uppercase font-medium tracking-wide whitespace-nowrap">
                    Akun Pribadi
                  </span>
                </div>
                <h2 className="font-headline-h2 text-headline-h2 text-text-primary mb-3">
                  Simpan Progres &amp; Bangun Paspor Studi
                </h2>
                <p className="font-body-default text-body-default text-text-secondary mb-6 leading-relaxed">
                  Untuk siswa yang ingin menyimpan riwayat refleksi misi,
                  menyusun Rencana 30 Hari, dan mengunduh portofolio bukti untuk
                  Guru BK.
                </p>
                <div className="flex flex-col gap-3.5 mb-6">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Seluruh data eksplorasi dan draf tersimpan otomatis
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Kustomisasi Rencana Eksplorasi 30 Hari mandiri
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Unduh ringkasan Paspor Belajar format PDF
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-status-success-bg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon
                        name="check"
                        className="text-status-success-text text-[14px]"
                      />
                    </span>
                    <span className="font-body-default text-body-default text-on-surface">
                      Transparansi penuh: persetujuan data bertahap &amp;
                      kendali privasi
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col pt-4">
                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-surface-subtle border border-border-default mb-6">
                  <Icon
                    name="lock"
                    className="text-text-secondary text-[18px] shrink-0 mt-0.5"
                  />
                  <p className="font-caption-meta text-caption-meta text-text-secondary leading-tight">
                    Sebelum menyimpan data, kamu akan diminta meninjau tujuan
                    pemrosesan dan pilihan privasimu.
                  </p>
                </div>
                <Link
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-on-primary-fixed-variant text-on-primary font-label-default text-label-default shadow-sm transition-colors mb-3 focus:outline-none"
                  href="/daftar"
                >
                  <span className="">Buat Akun Siswa Baru</span>
                  <Icon name="person_add" className="text-[18px]" />
                </Link>
                <div className="text-center">
                  <Link
                    className="font-body-default text-body-default text-text-secondary hover:text-primary transition-colors inline-flex items-center gap-1"
                    href="/masuk"
                  >
                    <span className="">Sudah punya akun?</span>
                    <span className="font-body-strong text-body-strong text-primary hover:underline">
                      Masuk di sini
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full max-w-2xl flex items-center justify-center gap-3 p-4 rounded-xl bg-surface-container-lowest shadow-sm">
            <Icon
              name="sync_saved_locally"
              className="text-primary text-[20px] shrink-0"
            />
            <p className="font-caption-meta text-caption-meta text-text-secondary text-center sm:text-left">
              Demo memakai profil sintetis. Akun pribadi akan memulai eksplorasi
              menggunakan data yang kamu pilih untuk disimpan.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
