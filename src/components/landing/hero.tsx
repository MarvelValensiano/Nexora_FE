import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/ui/icon";

export function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative w-full overflow-hidden bg-surface py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div className="inline-flex max-w-full items-center px-3 py-1 rounded-full bg-surface-subtle border border-border-default text-secondary shadow-sm">
              <span className="font-caption-badge text-caption-badge tracking-wider uppercase">
                Eksplorasi Jurusan &amp; Karier · Kelas XI &amp; XII
              </span>
            </div>
            <h1 className="font-display text-display text-on-surface tracking-tight text-balance leading-tight">
              Rasakan belajarnya. <br className="hidden sm:inline" />
              Pertimbangkan pilihannya. <br />
              <span className="text-primary-container">
                Rencanakan langkah berikutnya.
              </span>
            </h1>
            <p className="font-body-default text-body-default text-on-surface-variant max-w-xl text-pretty">
              Bantu temukan jurusan kuliah yang tepat lewat cuplikan simulasi
              nyata 10–15 menit, perbandingan biaya &amp; lokasi yang
              transparan, tanpa vonis bakat dan tanpa tekanan nilai.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary font-label-default text-label-default shadow-sm hover:bg-primary transition-all group"
                href="/demo"
              >
                <span className="">Coba Mode Demo (Tanpa Daftar)</span>
                <Icon
                  name="arrow_forward"
                  className="text-sm group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-surface-default text-primary font-label-default text-label-default shadow-sm hover:bg-surface-subtle transition-all"
                href="/pilihan-akses"
              >
                Mulai Buat Akun Siswa
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-secondary font-caption-meta text-caption-meta">
              <div className="flex items-center gap-1.5">
                <Icon
                  name="verified_user"
                  className="text-status-success-text text-sm"
                />
                <span className="">Bisa dicoba tanpa daftar</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5">
                <Icon
                  name="psychology_alt"
                  className="text-status-warning-text text-sm"
                />
                <span className="">Tanpa Skor Bakat Permanen</span>
              </div>
              <span className="text-outline-variant">•</span>
              <div className="flex items-center gap-1.5">
                <Icon name="lock" className="text-primary text-sm" />
                <span className="">Kendali atas data pribadi</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-primary-fixed blur-3xl opacity-60 pointer-events-none"></div>
            <div className="relative bg-surface-default rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-status-error-bg"></div>
                  <div className="w-3 h-3 rounded-full bg-status-warning-bg"></div>
                  <div className="w-3 h-3 rounded-full bg-status-success-bg"></div>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-status-success-bg text-status-success-text font-caption-badge text-caption-badge">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success-text animate-pulse"></span>
                  <span className="">Pratinjau Simulasi</span>
                </div>
              </div>
              <div className="relative rounded-xl overflow-hidden bg-surface-subtle aspect-[16/10] flex flex-col justify-end p-4">
                <Image
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90"
                  src="/images/hero-student.webp"
                  alt="Indonesian high school student smiling calmly while using a modern web-based study simulator on a clean white laptop, soft afternoon natural library light, subtle violet and cool slate background hues, photorealistic modern edtech setting"
                  width={800}
                  height={500}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/30 to-transparent"></div>
                <div className="relative z-10 text-on-primary flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-primary-container font-caption-badge text-caption-badge tracking-wider uppercase">
                      Contoh Misi
                    </span>
                    <span className="text-caption-meta font-caption-meta text-surface-variant">
                      Durasi: 12 Menit
                    </span>
                  </div>
                  <h2 className="font-headline-h3 text-headline-h3 leading-snug">
                    Menata Alur Logika Sistem Antrean
                  </h2>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-caption-meta text-caption-meta text-on-surface-variant font-medium">
                  Jelajahi Rumpun Keilmuan:
                </span>
                <div className="flex flex-wrap gap-2">
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-subtle text-secondary font-caption-badge text-caption-badge whitespace-nowrap">
                    INFORMATIKA
                  </div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-subtle text-secondary font-caption-badge text-caption-badge whitespace-nowrap">
                    TEKNIK INDUSTRI
                  </div>
                  <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-subtle text-secondary font-caption-badge text-caption-badge whitespace-nowrap">
                    DKV
                  </div>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                    <Icon name="rule" className="text-base" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-body-strong text-body-strong text-on-surface">
                      Uji Pola Pikir Mahasiswa
                    </span>
                    <span className="font-caption-meta text-caption-meta text-on-surface-variant">
                      Bukan tes psikotes akademis baku
                    </span>
                  </div>
                </div>
                <Icon name="play_circle" className="text-primary text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
