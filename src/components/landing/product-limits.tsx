import Link from "next/link";
import { Icon } from "@/components/ui/icon";

export function ProductLimitsSection() {
  return (
    <section
      id="batas-produk"
      className="w-full bg-surface-container-lowest py-16 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative rounded-3xl bg-surface-container-low p-8 md:p-12 overflow-hidden shadow-sm">
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-fixed opacity-40 blur-3xl pointer-events-none"></div>
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-2 flex flex-col items-start">
              <div className="w-16 h-16 rounded-2xl bg-surface-default text-primary flex items-center justify-center shadow-sm">
                <Icon
                  name="balance"
                  className="text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                />
              </div>
            </div>
            <div className="lg:col-span-10 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-surface-subtle text-secondary font-caption-badge text-caption-badge uppercase tracking-wider whitespace-nowrap">
                  Etika &amp; Batasan Nexalora
                </div>
                <h2 className="font-headline-h1 text-headline-h1 text-on-surface tracking-tight">
                  Prinsip Kejujuran Data &amp; Batasan Nexalora
                </h2>
              </div>
              <div className="p-4 md:p-5 rounded-2xl bg-surface-default shadow-sm flex items-start gap-4">
                <Icon
                  name="info"
                  className="text-status-warning-text text-2xl flex-shrink-0 mt-0.5"
                />
                <p className="font-body-strong text-body-strong text-on-surface">
                  “Rekomendasi membantu eksplorasi, bukan memutuskan masa
                  depanmu. Tanpa skor bakat atau persentase kecocokan.”
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-on-surface-variant font-body-default text-body-default">
                <div className="flex flex-col gap-2">
                  <span className="font-body-strong text-body-strong text-on-surface">
                    Ruang Eksperimen yang Aman
                  </span>
                  <p className="">
                    Nexalora dirancang sebagai ruang eksperimen mandiri. Kami
                    secara sadar menolak memberikan vonis label kecerdasan,
                    peringkat kuota mutlak, atau janji instan kelulusan seleksi
                    nasional.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-body-strong text-body-strong text-on-surface">
                    Keputusan Tetap Bersama
                  </span>
                  <p className="">
                    Seluruh hasil simulasi disiapkan sebagai materi obrolan yang
                    kaya konteks antara siswa, orang tua di rumah, dan Guru BK
                    di sekolah—bukan keputusan final algoritma.
                  </p>
                </div>
              </div>
              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-secondary font-caption-meta text-caption-meta">
                  <Icon name="database" className="text-primary text-sm" />
                  <span className="">
                    Cakupan awal: Informatika, Teknik Industri, dan DKV. Katalog
                    demo memakai data sintetis; informasi kampus nyata
                    memerlukan sumber resmi.
                  </span>
                </div>
                <Link
                  className="inline-flex items-center gap-1 font-label-default text-label-default text-primary hover:underline flex-shrink-0"
                  href="/demo#evaluasi"
                >
                  <span className="">Pelajari Batasan Lengkap</span>
                  <Icon name="chevron_right" className="text-sm" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
