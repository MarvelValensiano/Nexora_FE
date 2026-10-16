import Link from "next/link";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

export function AccountDialogContent({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-describedby="dialog-subtitle"
      aria-labelledby="dialog-title"
      className="relative w-full bg-surface-default rounded-2xl shadow-xl transition-all transform duration-300 scale-100 flex flex-col overflow-hidden"
      id="create-account-dialog"
    >
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-primary-fixed/60 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute -top-12 -left-12 w-36 h-36 bg-status-info-bg/70 rounded-full blur-xl pointer-events-none"></div>
      <div className="relative pt-6 px-7 pb-2 flex items-start justify-between">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-status-info-bg flex items-center justify-center text-primary-container shadow-sm flex-shrink-0">
            <Icon
              name="bookmark_added"
              className=""
              style={{ fontVariationSettings: "'FILL' 1", fontSize: "26px" }}
            />
          </div>
          <div className="flex flex-col">
            <Brand />
            <span className="inline-flex items-center gap-1.5 text-primary text-caption-badge font-caption-badge tracking-wider uppercase mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Simpan Misi Eksplorasi
            </span>
            <span className="text-caption-meta font-caption-meta text-text-secondary">
              Akun Tamu (Mode Demo Aktif)
            </span>
          </div>
        </div>
        <button
          aria-label="Tutup dialog pendaftaran"
          className="w-8 h-8 rounded-full bg-surface-subtle text-secondary hover:text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center cursor-pointer focus:outline-none"
          id="btn-close-modal"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" className="" style={{ fontSize: "18px" }} />
        </button>
      </div>
      <div className="px-7 pt-3 pb-1 relative">
        <h2
          className="font-headline-h2 text-headline-h2 text-text-primary tracking-tight"
          id="dialog-title"
        >
          Simpan Progres Belajarmu ke Akun Pribadi
        </h2>
        <p
          className="mt-2 text-text-secondary font-body-default text-body-default leading-relaxed"
          id="dialog-subtitle"
        >
          Gunakan akun pribadi untuk perjalanan eksplorasimu sendiri. Data
          contoh dalam demo tetap terpisah dan tidak dipindahkan ke profil
          siswa.
        </p>
      </div>
      <div className="px-7 py-4">
        <div className="text-caption-badge font-caption-badge uppercase tracking-wider text-text-secondary mb-3 flex items-center gap-2">
          <span className="">Apa yang tersimpan saat kamu membuat akun</span>
          <span className="h-px flex-1 bg-surface-subtle"></span>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-container-low transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-default border border-border-default text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon
                name="psychology_alt"
                className=""
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-body-strong text-body-strong text-text-primary ">
                  Hasil &amp; Catatan Refleksi Misi
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-default border border-border-default text-secondary text-[11px] font-semibold flex-shrink-0 whitespace-nowrap">
                  Informatika &amp; DKV
                </span>
              </div>
              <p className="mt-0.5 text-text-secondary text-caption-meta leading-snug">
                Misi kantin Informatika dan draf DKV tetap tersimpan dan siap
                dilanjutkan.
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-container-low transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-default border border-border-default text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon
                name="compare_arrows"
                className=""
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-body-strong text-body-strong text-text-primary truncate">
                  Matriks Bandingkan Jurusan
                </span>
                <span className="px-2 py-0.5 rounded-full bg-surface-default border border-border-default text-secondary text-[11px] font-semibold flex-shrink-0 whitespace-nowrap">
                  Maks. 3 Pilihan
                </span>
              </div>
              <p className="mt-0.5 text-text-secondary text-caption-meta leading-snug">
                Pilihan prodi dan skenario anggaran pribadi dapat ditinjau
                kembali.
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-container-low transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-default border border-border-default text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon
                name="calendar_today"
                className=""
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-body-strong text-body-strong text-text-primary truncate">
                  Rencana Eksplorasi 30 Hari
                </span>
              </div>
              <p className="mt-0.5 text-text-secondary text-caption-meta leading-snug">
                Tindakan mingguan dengan tanggal, status, dan catatan bukti.
              </p>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-surface-subtle hover:bg-surface-container-low transition-colors flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-default border border-border-default text-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon
                name="description"
                className=""
                style={{ fontSize: "18px" }}
              />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-body-strong text-body-strong text-text-primary truncate">
                  Paspor Belajar PDF Siap Cetak
                </span>
              </div>
              <p className="mt-0.5 text-text-secondary text-caption-meta leading-snug">
                Ringkasan profil minat yang siap diunduh untuk diskusi dengan
                orang tua &amp; BK.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-7 pt-1 pb-4">
        <div className="p-3 rounded-xl bg-canvas border border-border-default flex items-start gap-2.5">
          <Icon
            name="verified_user"
            className="text-status-success-text mt-0.5 flex-shrink-0"
            style={{ fontSize: "18px", fontVariationSettings: "'FILL' 1" }}
          />
          <div className="text-caption-meta text-text-secondary leading-relaxed">
            <span className="font-body-strong text-text-primary">
              Privasi Siswa Terjamin:
            </span>{" "}
            Data minat dan rapormu hanya untuk membantumu mengeksplorasi. Tidak
            ada skor vonis bakat dan tidak dibagikan ke pihak ketiga tanpa
            izinmu.
          </div>
        </div>
      </div>
      <div className="px-7 pt-2 pb-7 flex flex-col gap-2.5">
        <Link
          className="w-full py-3 px-5 rounded-lg bg-primary-container hover:bg-primary text-on-primary font-body-strong text-body-strong shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
          href="/daftar"
        >
          <span className="">Buat Akun &amp; Simpan Progres</span>
          <Icon
            name="arrow_forward"
            className=""
            style={{ fontSize: "18px" }}
          />
        </Link>
        <button
          className="w-full py-2.5 px-4 rounded-lg bg-transparent hover:bg-surface-subtle text-text-secondary hover:text-text-primary font-body-default text-label-default transition-colors text-center cursor-pointer focus:outline-none"
          id="btn-continue-demo"
          onClick={onClose}
          type="button"
        >
          Lanjut Demo Tanpa Menyimpan
        </button>
        <div className="flex items-center justify-center gap-1.5 text-caption-meta font-caption-meta text-text-secondary pt-1">
          <Icon
            name="check"
            className="text-status-success-text"
            style={{ fontSize: "14px" }}
          />
          <span className="">Akun pribadi akan memakai autentikasi email.</span>
        </div>
      </div>
    </div>
  );
}
