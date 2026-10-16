import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

export function MissionsSection() {
  return (
    <section id="simulasi-misi" className="w-full bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-primary font-caption-badge text-caption-badge uppercase tracking-wider">
              <Icon name="science" className="text-sm" />
              <span className="">Mini-Simulasi Langsung</span>
            </div>
            <h2 className="font-headline-h1 text-headline-h1 text-on-surface tracking-tight">
              3 Contoh Cuplikan Misi Belajar (10–15 Menit)
            </h2>
            <p className="font-body-default text-body-default text-on-surface-variant">
              Uji bagaimana mahasiswa memecahkan masalah harian di bidangnya
              masing-masing sebelum memutuskan mengambil jurusan tersebut.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-primary font-label-default text-label-default hover:text-on-primary-fixed-variant transition-colors self-start md:self-end"
            href="/#simulasi-misi"
          >
            <span className="">Lihat Semua Katalog Misi</span>
            <Icon name="arrow_forward" className="text-base" />
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-surface-default rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
            <div className="relative h-48 w-full bg-surface-subtle overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="/images/mission-informatika.webp"
                alt="Student coding interface preview"
                width={800}
                height={500}
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-default/90 backdrop-blur-md text-on-surface font-caption-badge text-caption-badge tracking-wider uppercase shadow-sm whitespace-nowrap">
                  INFORMATIKA • LOGIKA
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-surface-default/90 backdrop-blur-md px-2.5 py-1 rounded-md text-secondary font-caption-meta text-caption-meta flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Icon name="timer" className="text-xs" />
                <span className="">10–15 Menit</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-h2 text-headline-h2 text-on-surface leading-snug">
                  Menyusun Alur Pesanan Kantin
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Uji logika pemrograman menyortir antrean pesanan makanan jam
                  sibuk secara efisien.
                </p>
                <div className="mt-2 p-3 rounded-xl bg-surface-subtle flex flex-col gap-2">
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Bentuk Simulasi</span>
                    <span className="font-body-strong text-on-surface whitespace-nowrap">
                      Visual Block Logic
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Prasyarat Coding</span>
                    <span className="font-body-strong text-status-success-text whitespace-nowrap">
                      Nol (Pemula Total)
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-subtle text-primary font-label-default text-label-default hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap"
                  href="/demo"
                >
                  <span className="">Coba Misi di Demo</span>
                  <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-surface-default rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
            <div className="relative h-48 w-full bg-surface-subtle overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="/images/mission-industri.webp"
                alt="Industrial engineering queue management layout"
                width={800}
                height={500}
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-default/90 backdrop-blur-md text-on-surface font-caption-badge text-caption-badge tracking-wider uppercase shadow-sm whitespace-nowrap">
                  TEKNIK INDUSTRI • PROSES
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-surface-default/90 backdrop-blur-md px-2.5 py-1 rounded-md text-secondary font-caption-meta text-caption-meta flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Icon name="timer" className="text-xs" />
                <span className="">10–15 Menit</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-h2 text-headline-h2 text-on-surface leading-snug">
                  Mengatur Petugas Loket
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Optimalkan rasio petugas dan waktu tunggu antrean tanpa
                  pemborosan kapasitas.
                </p>
                <div className="mt-2 p-3 rounded-xl bg-surface-subtle flex flex-col gap-2">
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Bentuk Simulasi</span>
                    <span className="font-body-strong text-on-surface whitespace-nowrap">
                      Grafik Interaktif
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Prasyarat Hitung</span>
                    <span className="font-body-strong text-status-success-text whitespace-nowrap">
                      Aritmatika Dasar SMA
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-subtle text-primary font-label-default text-label-default hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap"
                  href="/demo"
                >
                  <span className="">Coba Misi di Demo</span>
                  <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-surface-default rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden">
            <div className="relative h-48 w-full bg-surface-subtle overflow-hidden">
              <Image
                className="w-full h-full object-cover"
                src="/images/mission-dkv.webp"
                alt="Graphic design student workspace canvas"
                width={800}
                height={500}
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-default/90 backdrop-blur-md text-on-surface font-caption-badge text-caption-badge tracking-wider uppercase shadow-sm whitespace-nowrap">
                  DKV • KREASI VISUAL
                </span>
              </div>
              <div className="absolute bottom-3 right-3 bg-surface-default/90 backdrop-blur-md px-2.5 py-1 rounded-md text-secondary font-caption-meta text-caption-meta flex items-center gap-1 shadow-sm whitespace-nowrap">
                <Icon name="timer" className="text-xs" />
                <span className="">10–15 Menit</span>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-1 justify-between gap-6">
              <div className="flex flex-col gap-3">
                <h3 className="font-headline-h2 text-headline-h2 text-on-surface leading-snug">
                  Merancang Menu Ramah Baca
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Eksplorasi kontras WCAG, hierarki tipe, dan keterbacaan menu
                  dari jarak 2 meter.
                </p>
                <div className="mt-2 p-3 rounded-xl bg-surface-subtle flex flex-col gap-2">
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Bentuk Simulasi</span>
                    <span className="font-body-strong text-on-surface whitespace-nowrap">
                      Kanvas Poster Live
                    </span>
                  </div>
                  <div className="flex items-center justify-between font-caption-meta text-caption-meta">
                    <span className="text-secondary">Prasyarat Menggambar</span>
                    <span className="font-body-strong text-status-success-text whitespace-nowrap">
                      Bukan Ujian Portofolio
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <Link
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-surface-subtle text-primary font-label-default text-label-default hover:bg-primary hover:text-on-primary transition-all whitespace-nowrap"
                  href="/demo"
                >
                  <span className="">Coba Misi di Demo</span>
                  <Icon name="arrow_forward" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
