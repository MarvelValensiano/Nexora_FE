"use client";

import Link from "next/link";
import { isValidAcademic } from "@/lib/onboarding/domain";
import { formatCost, type Program } from "@/lib/workspace/domain";
import { programHref, type DetailTab } from "@/lib/workspace/exploration";
import { CurriculumSection } from "./curriculum-section";
import { EducationAidSection } from "./education-aid-section";
import {
  ComparisonCart,
  EvidenceSummary,
  MissionPanel,
  panelClass,
  ProgramActions,
  SectionPanel,
  useExploration,
} from "./exploration-ui";

const detailTabs: { id: DetailTab; label: string }[] = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "kurikulum", label: "Kurikulum & Beban Belajar" },
  { id: "bantuan", label: "Bantuan Pendidikan & Beasiswa" },
  { id: "karier", label: "Karier Terkait" },
];
export function ProgramDetailPage({
  program,
  tab,
  returnTo,
}: {
  program: Program;
  tab: DetailTab;
  returnTo: string;
}) {
  const { profile, draft, interests } = useExploration();
  const academicCount = draft.academicsSkipped
    ? 0
    : draft.academicRecords.filter(
        (record) =>
          record.status === "provided" &&
          record.value.trim() &&
          isValidAcademic(record),
      ).length;
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="no-print flex flex-wrap items-center gap-2 text-xs text-secondary"
      >
        <Link href={returnTo} className="rounded hover:text-primary-container">
          Kembali ke{" "}
          {returnTo.startsWith("/rekomendasi")
            ? "Rekomendasi Studi"
            : "Jelajah & Filter"}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-text-primary">{program.name}</span>
      </nav>
      <section className={`${panelClass} space-y-5`}>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-border-default bg-surface-subtle px-3 py-1 text-[10px] font-bold tracking-wider uppercase">
            {program.major}
          </span>
          <span className="rounded-full bg-status-warning-bg px-3 py-1 text-[10px] font-semibold text-status-warning-text">
            Data Sintetis · Belum Terverifikasi
          </span>
        </div>
        <div>
          <h1 className="text-[26px] font-bold leading-snug tracking-tight">
            {program.name} ({program.degree}) — {program.campus}
          </h1>
          <p className="mt-2 text-xs leading-relaxed text-secondary">
            {program.city} · Pendidikan: {formatCost(program)} / tahun
            {program.id === "informatika-a"
              ? " · Ilustrasi 144 SKS / 8 semester"
              : " · Beban studi belum tersedia"}
          </p>
        </div>
        <ProgramActions program={program} detail={false} />
        <nav
          aria-label="Informasi program studi"
          className="no-print flex gap-1 overflow-x-auto border-t border-border-default pt-4"
        >
          {detailTabs.map((item) => (
            <Link
              key={item.id}
              href={programHref(program.id, returnTo, item.id)}
              aria-current={item.id === tab ? "page" : undefined}
              className={`shrink-0 rounded-xl px-3 py-2.5 text-xs font-semibold transition-colors ${tab === item.id ? "bg-surface-container-low text-primary-container" : "text-secondary hover:bg-surface-subtle"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>
      {tab === "ringkasan" && (
        <section
          aria-label="Ringkasan informasi prodi"
          className="grid gap-4 sm:grid-cols-3"
        >
          <Summary
            title="Estimasi Biaya Kuliah"
            value={formatCost(program)}
            note={`Ilustrasi pendidikan / tahun ${program.costYear}. Biaya awal dan hidup belum diketahui.`}
          />
          <Summary
            title="Lokasi Kampus"
            value={program.city}
            note="Alamat, akses transportasi, dan kebutuhan hunian belum terverifikasi."
          />
          <Summary
            title="Daya Tampung & Penerimaan"
            value="Belum Tersedia"
            note="Tidak ada rasio keketatan, ambang nilai, atau peluang penerimaan yang diasumsikan."
          />
        </section>
      )}
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="min-w-0 space-y-5 lg:col-span-8">
          {tab === "ringkasan" && (
            <>
              <SectionPanel title="3 Dimensi Eksplorasi Studi">
                <p className="text-xs leading-relaxed text-secondary">
                  Minat, catatan akademik, dan biaya dibaca terpisah. Belum ada
                  penilaian kelayakan personal untuk prodi contoh ini.
                </p>
                <div className="space-y-3">
                  <StudyDimension
                    title="Minat Belajar"
                    status={
                      profile.isDraft
                        ? `${interests.answered} jawaban skala tersedia`
                        : profile.key === "dimas"
                          ? "Skenario eksplorasi Dimas"
                          : "Informasi parsial"
                    }
                    note={program.interest}
                  />
                  <StudyDimension
                    title="Kesiapan Studi"
                    status={
                      profile.isDraft
                        ? `${academicCount} nilai valid tercatat`
                        : "Belum Dinilai"
                    }
                    note="Tidak ada perbandingan dengan syarat penerimaan kampus. Nilai bukan prediksi kelulusan seleksi."
                  />
                  <StudyDimension
                    title="Kelayakan Biaya"
                    status="Belum Dapat Disimpulkan"
                    note="Biaya hidup, biaya awal, serta bantuan terverifikasi belum tersedia. Anggaran bulanan tidak dibandingkan langsung dengan pendidikan tahunan."
                  />
                </div>
              </SectionPanel>
              <SectionPanel title="Fokus Aktivitas Belajar">
                <h3 className="text-sm font-semibold">{program.focus}</h3>
                <p className="text-sm leading-relaxed text-secondary">
                  {program.description}
                </p>
                <p className="text-xs leading-relaxed text-secondary">
                  Kegiatan ini hanya cuplikan. Pengalaman satu misi tidak
                  mewakili seluruh jurusan.
                </p>
              </SectionPanel>
              <CareerSection program={program} />
            </>
          )}
          {tab === "kurikulum" && (
            <CurriculumSection key={program.id} program={program} />
          )}
          {tab === "bantuan" && <EducationAidSection program={program} />}
          {tab === "karier" && <CareerSection program={program} />}
        </div>
        <aside
          aria-label="Konteks eksplorasi prodi"
          className="no-print min-w-0 space-y-5 lg:col-span-4"
        >
          <SectionPanel title="Kesesuaian Bukti Belajarmu">
            <EvidenceSummary program={program} />
          </SectionPanel>
          <MissionPanel program={program} />
          <ComparisonCart />
        </aside>
      </div>
    </>
  );
}
function Summary({
  title,
  value,
  note,
}: {
  title: string;
  value: string;
  note: string;
}) {
  return (
    <div className={`${panelClass} space-y-2`}>
      <h2 className="text-[10px] font-semibold tracking-wider text-secondary uppercase">
        {title}
      </h2>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs leading-relaxed text-secondary">{note}</p>
    </div>
  );
}
function StudyDimension({
  title,
  status,
  note,
}: {
  title: string;
  status: string;
  note: string;
}) {
  return (
    <div className="flex flex-col justify-between gap-3 rounded-xl border border-border-default bg-surface-subtle p-4 sm:flex-row">
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        <p className="mt-1 max-w-sm text-xs leading-relaxed text-secondary">
          {note}
        </p>
      </div>
      <p className="shrink-0 text-xs font-semibold text-primary-container">
        {status}
      </p>
    </div>
  );
}
function CareerSection({ program }: { program: Program }) {
  return (
    <SectionPanel title="Arah Karier & Portofolio Belajar">
      <p className="text-xs leading-relaxed text-secondary">
        Contoh peran terkait, bukan daftar pekerjaan eksklusif jurusan atau
        jaminan penempatan. Jalur pendidikan dan tuntutan pekerjaan dapat
        beragam.
      </p>
      <div className="space-y-3">
        {program.careers.map((career) => (
          <article
            key={career}
            className="rounded-xl border border-border-default bg-surface-subtle p-4"
          >
            <h3 className="text-sm font-semibold">{career}</h3>
            <p className="mt-2 text-xs leading-relaxed text-secondary">
              Pertanyaan eksplorasi: tugas apa yang dilakukan, keterampilan apa
              yang dipakai, dan karya apa yang bisa dibuat untuk mencoba
              aktivitasnya?
            </p>
          </article>
        ))}
      </div>
      <p className="text-xs text-secondary">
        Sumber profesi, persyaratan kerja, dan data pasar kerja belum
        dihubungkan.
      </p>
    </SectionPanel>
  );
}
