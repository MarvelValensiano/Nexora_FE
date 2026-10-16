"use client";

import Link from "next/link";
import { useState } from "react";
import { CONSENT_VERSION, type OnboardingDraft } from "@/lib/onboarding/domain";
import { Icon } from "@/components/ui/icon";
import { Notice, StepTitle } from "./step-ui";

export function ConsentStep({
  draft,
  onAccept,
  hydrated,
}: {
  draft: OnboardingDraft;
  onAccept: () => void;
  hydrated: boolean;
}) {
  const [checked, setChecked] = useState(Boolean(draft.consent));
  return (
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        if (checked && hydrated) onAccept();
      }}
      className="relative flex flex-col gap-6"
    >
      <div className="flex flex-wrap justify-between gap-2">
        <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-caption-badge tracking-wider text-text-secondary uppercase">
          Transparansi &amp; Privasi
        </span>
        <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-caption-meta text-text-secondary">
          Versi: {CONSENT_VERSION}
        </span>
      </div>
      <StepTitle title="Persetujuan Penggunaan Data Nexalora">
        Pahami data yang digunakan sebelum memulai eksplorasi studi dan
        kariermu.
      </StepTitle>
      <Notice>
        Ini pratinjau onboarding. Setelah kamu menyetujui, draf disimpan hanya
        pada tab browser ini. Belum ada penyimpanan ke akun atau server.
      </Notice>
      <div className="flex flex-col gap-4">
        {[
          [
            "Tujuan Penggunaan Data",
            "Nama panggilan, konteks sekolah, dan jawaban aktivitas digunakan untuk menyusun perjalanan eksplorasi. Ringkasan minat adalah aturan awal yang belum tervalidasi secara psikometrik.",
          ],
          [
            "Data yang Diproses",
            "Kelas, tahun kelulusan, jawaban minat, serta preferensi wilayah, anggaran, dan nilai yang kamu pilih untuk diisi. Nilai, lokasi, dan anggaran boleh ditunda.",
          ],
          [
            "Data yang Tidak Diminta",
            "Kami tidak meminta NIK, NISN, alamat rumah rinci, KK, foto rapor, slip gaji, atau dokumen penghasilan.",
          ],
          [
            "Kendali di Tanganmu",
            "Draf pratinjau dapat dihapus melalui tombol Hapus Draf. Data tidak dibagikan kepada guru BK, keluarga, kampus, atau pihak lain melalui alur ini.",
          ],
        ].map(([title, text]) => (
          <section
            key={title}
            className="rounded-xl bg-surface-subtle/70 p-4 sm:p-5"
          >
            <h2 className="text-headline-h3 text-text-primary">{title}</h2>
            <p className="mt-1 text-body-default leading-relaxed text-text-secondary">
              {text}
            </p>
          </section>
        ))}
      </div>
      <div className="flex items-start gap-2.5 rounded-xl bg-surface-container-low p-4">
        <input
          id="onboarding-consent"
          name="consent"
          type="checkbox"
          checked={checked}
          disabled={!hydrated}
          onChange={(event) => setChecked(event.target.checked)}
          className="mt-1 size-4 shrink-0 accent-primary"
        />
        <label
          htmlFor="onboarding-consent"
          className="cursor-pointer text-body-default text-text-primary"
        >
          Saya telah membaca dan menyetujui penggunaan data terbatas untuk
          pratinjau eksplorasi ini serta penyimpanan draf pada tab browser.
        </label>
      </div>
      <div className="flex flex-col-reverse items-center justify-between gap-3 sm:flex-row">
        <Link
          href="/daftar"
          className="flex w-full items-center justify-center gap-1 rounded-lg px-4 py-3 text-label-default text-text-secondary hover:bg-surface-subtle sm:w-auto"
        >
          <Icon name="arrow_back" className="text-lg" />
          Kembali ke Signup
        </Link>
        <button
          type="submit"
          disabled={!checked || !hydrated}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-6 py-3 text-label-default text-white shadow-sm hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          Setujui dan Lanjut
          <Icon name="arrow_forward" className="text-lg" />
        </button>
      </div>
    </form>
  );
}
