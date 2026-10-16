"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import {
  budgetLabels,
  fieldLabels,
  filterPrograms,
  initialFilters,
  programs,
  type CatalogFilters,
} from "@/lib/workspace/domain";
import { ProgramCard } from "./program-card";
import { useWorkspace } from "./workspace-context";
import { catalogHref } from "@/lib/workspace/exploration";
import { primaryButton, secondaryButton } from "./exploration-ui";

const filterClass =
  "h-11 w-full min-w-0 rounded-xl border border-transparent bg-surface-subtle px-3.5 text-[13px] text-text-primary focus:border-primary-container focus:bg-white";

export function CatalogPage({
  initial = initialFilters,
}: {
  initial?: CatalogFilters;
}) {
  const [filters, setFilters] = useState<CatalogFilters>(initial);
  useEffect(() => {
    window.history.replaceState(
      null,
      "",
      catalogHref(filters) + window.location.hash,
    );
  }, [filters]);
  const { selection, setPanel } = useWorkspace();
  const result = filterPrograms(filters, selection.savedIds);
  const chips = [
    ...(filters.query
      ? [
          {
            label: `Cari: ${filters.query}`,
            reset: () => setFilters((current) => ({ ...current, query: "" })),
          },
        ]
      : []),
    ...(filters.field !== "all"
      ? [
          {
            label: fieldLabels[filters.field],
            reset: () =>
              setFilters((current) => ({ ...current, field: "all" })),
          },
        ]
      : []),
    ...(filters.city !== "all"
      ? [
          {
            label: filters.city,
            reset: () => setFilters((current) => ({ ...current, city: "all" })),
          },
        ]
      : []),
    ...(filters.budget !== "all"
      ? [
          {
            label: budgetLabels[filters.budget],
            reset: () =>
              setFilters((current) => ({ ...current, budget: "all" })),
          },
        ]
      : []),
    ...(filters.savedOnly
      ? [
          {
            label: "Hanya Tersimpan",
            reset: () =>
              setFilters((current) => ({ ...current, savedOnly: false })),
          },
        ]
      : []),
  ];
  return (
    <>
      <nav aria-label="Bagian Jelajah" className="flex flex-wrap gap-2">
        <Link href="/jelajah" aria-current="page" className={primaryButton}>
          Katalog Umum
        </Link>
        <Link href="/rekomendasi" className={secondaryButton}>
          Rekomendasi &amp; Bukti
        </Link>
        <Link href="/rekomendasi?tab=tersemat" className={secondaryButton}>
          Pilihan Tersemat ({selection.savedIds.length})
        </Link>
      </nav>
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">
        <div className="max-w-2xl space-y-2.5">
          <span className="inline-flex rounded-full border border-border-default bg-surface-subtle px-2.5 py-0.5 text-[11px] font-bold text-secondary">
            Katalog Ilustrasi · 6 Pilihan
          </span>
          <h1 className="text-[26px] leading-snug font-bold tracking-tight">
            Katalog Program Studi &amp; Kampus
          </h1>
          <p className="text-sm leading-relaxed text-secondary">
            Eksplorasi aktivitas belajar dan contoh komponen biaya. Seluruh nama
            kampus serta tarif di katalog ini adalah data sintetis.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPanel({ kind: "compare" })}
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-primary-container px-4 py-3 text-[13px] font-semibold text-white shadow-sm hover:bg-primary"
        >
          <Icon name="balance" className="text-lg" />
          Bandingkan ({selection.compareIds.length}/3)
        </button>
      </section>
      <section
        id="filter-katalog"
        aria-label="Pencarian dan filter katalog"
        className="space-y-4 rounded-2xl border border-border-subtle bg-white p-5 shadow-sm"
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="relative sm:col-span-2 lg:col-span-2">
            <span className="sr-only">
              Cari prodi, universitas, atau karier
            </span>
            <Icon
              name="search"
              className="absolute top-3 left-3 text-lg text-secondary"
            />
            <input
              type="search"
              maxLength={120}
              value={filters.query}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  query: event.target.value,
                }))
              }
              placeholder="Cari prodi, universitas, atau karier..."
              className={`${filterClass} pl-10`}
            />
          </label>
          <label>
            <span className="sr-only">Bidang studi</span>
            <select
              value={filters.field}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  field: event.target.value as CatalogFilters["field"],
                }))
              }
              className={filterClass}
            >
              {Object.entries(fieldLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Lokasi kampus</span>
            <select
              value={filters.city}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  city: event.target.value,
                }))
              }
              className={filterClass}
            >
              <option value="all">Semua Lokasi</option>
              {["Kota Contoh 1", "Kota Contoh 2", "Kota Contoh 3"].map(
                (city) => (
                  <option key={city}>{city}</option>
                ),
              )}
            </select>
          </label>
          <label>
            <span className="sr-only">Batas biaya pendidikan per tahun</span>
            <select
              value={filters.budget}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  budget: event.target.value as CatalogFilters["budget"],
                }))
              }
              className={filterClass}
            >
              {Object.entries(budgetLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border-subtle pt-3">
          <div className="flex flex-wrap gap-2">
            {chips.length ? (
              chips.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  aria-label={`Hapus filter ${chip.label}`}
                  onClick={chip.reset}
                  className="flex items-center gap-1.5 rounded-full border border-border-default bg-surface-subtle px-2.5 py-1 text-[11px] font-semibold text-secondary"
                >
                  {chip.label}
                  <Icon name="close" className="text-sm" />
                </button>
              ))
            ) : (
              <span className="text-xs text-secondary">
                Tidak ada filter aktif
              </span>
            )}
          </div>
          <p
            role="status"
            aria-live="polite"
            className="text-xs text-secondary"
          >
            Menampilkan{" "}
            <strong className="text-text-primary">
              {result.length} program
            </strong>{" "}
            dari {programs.length} pilihan contoh
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-secondary">
            <input
              type="checkbox"
              checked={filters.savedOnly}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  savedOnly: event.target.checked,
                }))
              }
              className="size-4 accent-primary-container"
            />
            Hanya pilihan tersimpan ({selection.savedIds.length})
          </label>
          <label className="flex items-center gap-2 text-xs text-secondary">
            Urutan
            <select
              value={filters.sort}
              onChange={(event) =>
                setFilters((current) => ({
                  ...current,
                  sort: event.target.value as CatalogFilters["sort"],
                }))
              }
              className="rounded-lg border border-border-default bg-surface-subtle px-2 py-1.5"
            >
              <option value="default">Urutan katalog</option>
              <option value="name">Nama A–Z</option>
              <option value="cost">Biaya pendidikan terendah</option>
            </select>
          </label>
        </div>
        {filters.budget !== "all" && (
          <p className="rounded-lg bg-status-info-bg p-3 text-caption-meta text-status-info-text">
            Filter menggunakan batas atas biaya pendidikan tahunan. Pilihan
            dengan biaya belum tersedia tidak masuk hasil filter ini. Ini tidak
            menyatakan keterjangkauan total.
          </p>
        )}
      </section>
      {result.length ? (
        <section
          aria-label="Hasil katalog program studi"
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {result.map((program) => (
            <ProgramCard
              key={program.id}
              program={program}
              returnTo={catalogHref(filters)}
            />
          ))}
        </section>
      ) : (
        <section className="space-y-4 rounded-2xl border border-border-default bg-white p-6 shadow-sm">
          <h2 className="text-headline-h2">Tidak Ada Hasil yang Cocok</h2>
          <p className="text-body-default leading-relaxed text-secondary">
            Tidak ada pilihan untuk{" "}
            {chips.map((chip) => chip.label).join(" · ") || "filter saat ini"}.
            Tidak ada filter yang diubah otomatis.
          </p>
          <div className="flex flex-wrap gap-3">
            {filters.budget !== "all" && (
              <button
                type="button"
                onClick={() =>
                  setFilters((current) => ({ ...current, budget: "all" }))
                }
                className="rounded-xl bg-primary-container px-4 py-2.5 text-label-default text-white"
              >
                Lepaskan Filter Biaya
              </button>
            )}
            {filters.city !== "all" && (
              <button
                type="button"
                onClick={() =>
                  setFilters((current) => ({ ...current, city: "all" }))
                }
                className="rounded-xl border border-border-default px-4 py-2.5 text-label-default text-primary-container"
              >
                Semua Lokasi
              </button>
            )}
            <button
              type="button"
              onClick={() => setFilters({ ...initialFilters })}
              className="rounded-xl bg-surface-subtle px-4 py-2.5 text-label-default text-secondary"
            >
              Reset Semua Filter
            </button>
          </div>
        </section>
      )}
      <div className="flex items-start gap-3 rounded-2xl border border-border-subtle bg-white p-4 text-caption-meta leading-relaxed text-secondary">
        <Icon name="info" className="mt-0.5 text-xl text-primary-container" />
        <div>
          <h2 className="text-label-default text-text-primary">
            Batas Katalog Pratinjau
          </h2>
          <p className="mt-1">
            Enam kartu ilustrasi dari desain, belum katalog kampus
            terverifikasi. Biaya pendidikan, biaya hidup, dan biaya awal tetap
            dibedakan; data kosong bukan Rp0. Simpan dan Bandingkan tidak
            mengubah profil minat atau anggaran.
          </p>
        </div>
      </div>
      {selection.compareIds.length > 0 && (
        <div className="fixed right-3 bottom-[4.5rem] left-3 z-30 mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 rounded-2xl border border-border-default bg-white/95 px-4 py-3 shadow-lg backdrop-blur-xl xl:right-6 xl:bottom-4 xl:left-[244px]">
          <p className="text-xs font-semibold text-text-primary">
            {selection.compareIds.length} dari 3 slot dipilih
          </p>
          <button
            type="button"
            onClick={() => setPanel({ kind: "compare" })}
            className="rounded-xl bg-primary-container px-4 py-2.5 text-xs font-semibold text-white"
          >
            Buka Perbandingan ({selection.compareIds.length})
          </button>
        </div>
      )}
    </>
  );
}
