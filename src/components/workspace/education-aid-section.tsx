"use client";

import type { Program } from "@/lib/workspace/domain";
import {
  panelClass,
  primaryButton,
  secondaryButton,
  SectionPanel,
  useExploration,
} from "./exploration-ui";

export function EducationAidSection({ program }: { program: Program }) {
  const { aid, updateAid, hydrated, saved, setPanel } = useExploration();
  if (!["informatika-a", "industri-b"].includes(program.id))
    return (
      <SectionPanel title="Informasi Bantuan Belum Tersedia">
        <p className="text-sm leading-relaxed text-secondary">
          Belum ada referensi bantuan untuk {program.campus} pada lampiran.
          Tidak ada asumsi kelayakan atau jaminan beasiswa.
        </p>
      </SectionPanel>
    );
  return (
    <div className="space-y-5">
      <p className="rounded-xl border border-border-default bg-white p-4 text-xs leading-relaxed text-secondary">
        <strong className="block text-text-primary">
          Transparansi &amp; Batas Informasi
        </strong>
        <span className="mt-1 block">
          Program berikut sepenuhnya ilustratif. Status pendaftaran,
          persyaratan, manfaat, jadwal, dan sumber belum diverifikasi; bukan
          tawaran atau jaminan penerimaan bantuan.
        </span>
      </p>
      <section className={`${panelClass} space-y-5`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="rounded-full bg-status-warning-bg px-3 py-1 text-[11px] font-semibold text-status-warning-text">
            Status Pendaftaran Belum Diketahui
          </span>
          <span className="text-[11px] text-secondary">
            Contoh dari desain · Oktober 2026
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-wider text-secondary uppercase">
            Bantuan Pendidikan Contoh
          </p>
          <h2 className="mt-2 text-xl font-bold leading-snug">
            Bantuan Biaya Pendidikan Contoh
          </h2>
          <p className="mt-2 text-xs text-secondary">
            Universitas Contoh A &amp; Institut Contoh B · Ilustrasi S1 / D4
          </p>
          <p className="mt-3 text-sm leading-relaxed text-secondary">
            Contoh penyajian bantuan pembiayaan studi untuk menyusun daftar
            pertanyaan sebelum menghubungi penyelenggara.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <AidBlock
            title="Cakupan & Manfaat (Ilustrasi)"
            items={[
              "Contoh pembebasan biaya pendidikan sampai 8 semester.",
              "Contoh uang saku Rp800 ribu–Rp1,4 juta per bulan.",
              "Jumlah, cakupan, dan pencairan aktual belum diketahui.",
            ]}
          />
          <AidBlock
            title="Hal yang Perlu Dikonfirmasi"
            items={[
              "Ketentuan angkatan, jenjang, dan program studi.",
              "Dokumen pendukung kondisi keluarga.",
              "Seleksi dan perpanjangan bantuan setiap periode.",
            ]}
          />
          <AidBlock
            title="Periode Pendaftaran"
            items={[
              "Lampiran memakai ilustrasi Februari–Mei 2027.",
              "Belum ada tenggat resmi terverifikasi.",
              "Tidak dibuat pengingat tenggat dari tanggal contoh.",
            ]}
          />
          <AidBlock
            title="Sumber & Verifikasi"
            items={[
              "Tautan resmi penyelenggara belum tersedia.",
              "Tidak ada status ‘tervalidasi’ atau klaim pendaftaran dibuka.",
              "Konfirmasikan rincian sebelum mengambil keputusan.",
            ]}
          />
        </div>
        <div className="no-print flex flex-wrap gap-3 border-t border-border-default pt-4">
          <button
            type="button"
            disabled={!hydrated}
            aria-pressed={aid.saved}
            onClick={() => updateAid({ saved: !aid.saved })}
            className={secondaryButton}
          >
            {aid.saved
              ? "Lepas Referensi Tersimpan"
              : "Simpan Referensi Bantuan"}
          </button>
          <button
            type="button"
            disabled={!hydrated || aid.task}
            onClick={() => updateAid({ task: true, done: false })}
            className={primaryButton}
          >
            {aid.task
              ? "Tugas Sudah Ada di Agenda Tab"
              : "+ Buat Tugas Cek Syarat"}
          </button>
        </div>
        <p role="status" className="text-[11px] leading-relaxed text-secondary">
          {aid.saved || aid.task
            ? saved
              ? "Pilihan referensi dan tugas tersimpan pada tab ini."
              : "Perubahan ada di halaman ini; penyimpanan tab belum berhasil."
            : "Simpan referensi terpisah dari sematan prodi. Membuat tugas tidak mendaftarkanmu pada bantuan."}
        </p>
      </section>
      <SectionPanel title="Hubungkan ke Rencana 30 Hari">
        <p className="text-xs leading-relaxed text-secondary">
          Satu langkah ringan: cek dokumen syarat bantuan contoh dan catat
          pertanyaan yang perlu ditanyakan pada penyelenggara. Saran minggu
          pertama, sekitar 30 menit; tanpa tenggat resmi.
        </p>
        {aid.task ? (
          <div className="rounded-xl bg-surface-subtle p-4">
            <p className="text-sm font-semibold">
              Cek syarat bantuan pendidikan contoh
            </p>
            <p className="mt-1 text-xs text-secondary">
              {aid.done
                ? "Ditandai selesai di tab ini"
                : "Belum selesai · Tidak ada tenggat"}
            </p>
          </div>
        ) : (
          <p className="text-xs text-secondary">
            Belum ditambahkan ke agenda. Gunakan tombol Buat Tugas Cek Syarat
            bila ingin menyimpannya.
          </p>
        )}
        <button
          type="button"
          onClick={() => setPanel({ kind: "agenda" })}
          className={secondaryButton}
        >
          Buka Agenda Eksplorasi
        </button>
      </SectionPanel>
      <SectionPanel title="Bantuan Lain di Kampus Ini">
        <p className="text-xs leading-relaxed text-secondary">
          Belum ada program lain terverifikasi. Keringanan UKT dan bantuan
          daerah pada desain hanya kategori pertanyaan untuk ditelusuri, bukan
          peluang aktif.
        </p>
      </SectionPanel>
    </div>
  );
}

function AidBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="space-y-3 rounded-xl border border-border-default bg-surface-subtle p-4">
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="list-disc space-y-2 pl-4 text-xs leading-relaxed text-secondary">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
