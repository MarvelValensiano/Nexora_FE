"use client";

import { useState } from "react";
import type { Program } from "@/lib/workspace/domain";
import { semesterOne } from "@/lib/workspace/exploration";
import { panelClass, secondaryButton, SectionPanel } from "./exploration-ui";

export function CurriculumSection({ program }: { program: Program }) {
  const [semester, setSemester] = useState(1);
  if (program.id !== "informatika-a")
    return (
      <SectionPanel title="Kurikulum Belum Tersedia">
        <p className="text-sm leading-relaxed text-secondary">
          Lampiran belum memuat rincian kurikulum {program.name}. Data
          Informatika tidak digunakan untuk mengisi prodi ini.
        </p>
        <p className="text-xs leading-relaxed text-secondary">
          Sebelum memilih, cari struktur semester, mata kuliah inti, bentuk
          tugas, dan beban praktikum pada sumber resmi kampus.
        </p>
      </SectionPanel>
    );
  const courses = semester === 1 ? semesterOne : [];
  const credits = courses.reduce((sum, course) => sum + course.credits, 0);
  return (
    <div className="space-y-5">
      <SectionPanel title="Panduan Eksplorasi: Apa yang Kamu Pelajari?">
        <p className="text-xs leading-relaxed text-secondary">
          Peta belajar ilustratif dari desain, bukan kurikulum resmi kampus.
          Beban total 144 SKS / 8 semester pada contoh belum diverifikasi.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            [
              "1",
              "Tahun 1: Fondasi Logika",
              "Logika komputasi, algoritma dasar, dan pembiasaan menulis instruksi.",
            ],
            [
              "2",
              "Tahun 2: Struktur & Sistem",
              "Mengenali struktur data, objek, dan hubungan antarkomponen sistem.",
            ],
            [
              "3–4",
              "Tahun 3–4: Spesialisasi",
              "Contoh peminatan, proyek, magang, dan tugas akhir. Rincian belum tersedia.",
            ],
          ].map(([year, title, description]) => (
            <div
              key={year}
              className="space-y-3 rounded-xl border border-border-default bg-surface-subtle p-4"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface-container-low text-xs font-bold text-primary-container">
                {year}
              </span>
              <h3 className="text-xs font-bold leading-relaxed">{title}</h3>
              <p className="text-[11px] leading-relaxed text-secondary">
                {description}
              </p>
            </div>
          ))}
        </div>
      </SectionPanel>
      <section className={`${panelClass} space-y-4`}>
        <div>
          <h2 className="text-base font-bold">
            Daftar Mata Kuliah per Semester
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-secondary">
            Hanya semester 1 yang memiliki rincian pada lampiran. Semester lain
            tidak diisi dengan asumsi.
          </p>
        </div>
        <div
          aria-label="Pilih semester kurikulum"
          className="no-print flex gap-2 overflow-x-auto pb-2"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={semester === value}
              onClick={() => setSemester(value)}
              className={`shrink-0 rounded-xl px-3 py-2 text-xs font-semibold ${semester === value ? "bg-primary-container text-white" : "border border-border-default bg-surface-subtle text-secondary"}`}
            >
              Semester {value}
              {value === 1 ? " · 19 SKS" : ""}
            </button>
          ))}
        </div>
        <div aria-live="polite" className="space-y-3">
          <div className="rounded-xl bg-surface-container-low p-4">
            <h3 className="text-sm font-bold text-primary-container">
              Semester {semester}
              {courses.length
                ? `: ${credits} SKS (Ilustrasi)`
                : " · Rincian Belum Tersedia"}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-secondary">
              {courses.length
                ? "Contoh aktivitas fondasi logika dan adaptasi belajar di perguruan tinggi."
                : "Pergantian semester tidak membuat mata kuliah baru. Konfirmasikan susunan dan beban belajar ke kampus."}
            </p>
          </div>
          {courses.length ? (
            <ol className="divide-y divide-border-default">
              {courses.map((course, index) => (
                <li
                  key={course.name}
                  className="flex break-inside-avoid items-start gap-3 py-4"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-surface-subtle text-xs font-semibold text-secondary">
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h4 className="text-sm font-semibold">{course.name}</h4>
                      <span className="rounded-lg bg-surface-container-low px-2 py-1 text-[11px] font-semibold text-primary-container">
                        {course.credits} SKS
                      </span>
                    </div>
                    <p className="mt-1 text-[10px] font-semibold text-secondary">
                      {course.tag}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-secondary">
                      {course.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="rounded-xl border border-dashed border-outline-variant p-5 text-sm leading-relaxed text-secondary">
              Belum ada daftar mata kuliah untuk semester {semester}. Kamu bisa
              kembali ke semester 1 untuk meninjau contoh yang tersedia.
            </p>
          )}
        </div>
        <p className="rounded-xl bg-status-warning-bg p-3 text-xs leading-relaxed text-status-warning-text">
          Kurikulum, SKS, bentuk tugas, dan aturan akademik dapat berbeda di
          setiap kampus. Belum ada sumber resmi atau pemantauan pembaruan pada
          pratinjau ini.
        </p>
      </section>
      <section className={`${panelClass} no-print space-y-3`}>
        <h2 className="text-base font-bold">Bahan Diskusi Belajar</h2>
        <p className="text-xs leading-relaxed text-secondary">
          Cetak tampilan semester yang sedang dibuka. Pilih “Simpan sebagai PDF”
          pada dialog cetak browser untuk membawanya ke guru BK atau keluarga.
          Dokumen tetap memuat penanda ilustrasi, bukan paspor belajar resmi.
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className={secondaryButton}
        >
          Cetak / Simpan sebagai PDF
        </button>
      </section>
    </div>
  );
}
