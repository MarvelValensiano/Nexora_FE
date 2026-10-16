import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function FinalCtaSection() {
  return (
    <section id="mulai" className="w-full bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-3xl bg-gradient-to-r from-primary to-hero-gradient-end text-on-primary p-10 md:p-16 shadow-xl overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-8">
          <div className="absolute inset-0 bg-radial-gradient from-on-primary/10 to-transparent pointer-events-none"></div>
          <div className="relative z-10 flex flex-col gap-4 max-w-2xl text-center lg:text-left">
            <h2 className="font-display text-display text-on-primary tracking-tight">
              Siap Menemukan Jalur Kuliahmu Sendiri?
            </h2>
            <p className="font-body-default text-body-default text-primary-fixed opacity-95">
              Coba langsung simulasi dalam 2 menit tanpa perlu membuat akun,
              atau daftar gratis untuk menyimpan riwayat progres dan membuat
              paspor belajarmu.
            </p>
          </div>
          <div className="relative z-10 flex flex-col sm:flex-row xl:flex-col items-center gap-4 flex-shrink-0">
            <Link
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-default text-primary font-label-default text-label-default shadow-md hover:bg-surface-subtle transition-all"
              href="/demo"
            >
              <Icon name="play_circle" className="text-xl" />
              <span className="">Coba Mode Demo Sekarang</span>
            </Link>
            <Link
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-4 rounded-xl bg-primary-container text-on-primary font-label-default text-label-default hover:bg-on-primary-fixed-variant transition-all"
              href="/pilihan-akses"
            >
              Daftar Akun Baru
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
