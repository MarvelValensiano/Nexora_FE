import { Icon } from "@/components/ui/icon";

export function HowItWorksSection() {
  return (
    <section
      id="cara-kerja"
      className="w-full bg-surface-container-lowest py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col gap-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-3xl">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-1.5 text-primary font-caption-badge text-caption-badge uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span className="">Metodologi Eksplorasi Aman</span>
            </div>
            <h2 className="font-headline-h1 text-headline-h1 text-on-surface tracking-tight">
              Cara Kerja Nexalora dalam 4 Langkah Nyata
            </h2>
            <p className="font-body-default text-body-default text-on-surface-variant">
              Langkah bertahap terstruktur yang menghormati ritme belajarmu
              tanpa membebankan tes kepribadian instan.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-surface-default shadow-sm hover:shadow-md transition-shadow gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle text-secondary flex items-center justify-center">
                  <Icon name="person" className="text-xl" />
                </div>
                <span className="font-caption-badge text-caption-badge text-outline whitespace-nowrap">
                  TAHAP 01
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-h3 text-headline-h3 text-on-surface group-hover:text-primary transition-colors">
                  1. Profil &amp; Minat Awal
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Eksplorasi minat tanpa vonis. Pilihan “Belum tahu” sepenuhnya
                  diakomodasi.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-status-success-text font-caption-meta text-caption-meta whitespace-nowrap">
              <Icon name="check_circle" className="text-sm" />
              <span className="">Bebas asumsi awal</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-surface-default shadow-sm hover:shadow-md transition-shadow gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle text-secondary flex items-center justify-center">
                  <Icon name="play_lesson" className="text-xl" />
                </div>
                <span className="font-caption-badge text-caption-badge text-outline whitespace-nowrap">
                  TAHAP 02
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-h3 text-headline-h3 text-on-surface group-hover:text-primary transition-colors">
                  2. Misi Belajar 10–15 Mnt
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Uji langsung cara pikir mahasiswa lewat mini-kasus interaktif
                  dan aplikatif.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-secondary font-caption-meta text-caption-meta whitespace-nowrap">
              <Icon name="schedule" className="text-sm" />
              <span className="">Format ringkas &amp; adaptif</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-surface-default shadow-sm hover:shadow-md transition-shadow gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle text-secondary flex items-center justify-center">
                  <Icon name="account_balance_wallet" className="text-xl" />
                </div>
                <span className="font-caption-badge text-caption-badge text-outline whitespace-nowrap">
                  TAHAP 03
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-h3 text-headline-h3 text-on-surface group-hover:text-primary transition-colors">
                  3. Komparasi Biaya Jujur
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Bandingkan biaya pendidikan, estimasi hidup, dan bantuan yang
                  perlu diperiksa.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-secondary font-caption-meta text-caption-meta whitespace-nowrap">
              <Icon name="fact_check" className="text-sm" />
              <span className="">Asumsi biaya terlihat</span>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 rounded-2xl bg-surface-default shadow-sm hover:shadow-md transition-shadow gap-6 group">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-surface-subtle text-secondary flex items-center justify-center">
                  <Icon name="assignment_turned_in" className="text-xl" />
                </div>
                <span className="font-caption-badge text-caption-badge text-outline whitespace-nowrap">
                  TAHAP 04
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-headline-h3 text-headline-h3 text-on-surface group-hover:text-primary transition-colors">
                  4. Paspor &amp; Rencana Aksi
                </h3>
                <p className="font-body-default text-body-default text-secondary">
                  Dapatkan portofolio eksplorasi siap unduh untuk diskusi dengan
                  BK &amp; ortu.
                </p>
              </div>
            </div>
            <div className="pt-3 flex items-center gap-1.5 text-secondary font-caption-meta text-caption-meta whitespace-nowrap">
              <Icon name="download" className="text-sm" />
              <span className="">Dokumen siap unduh</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
