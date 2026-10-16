"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";
import { useWorkspace } from "./workspace-context";

const navigation = [
  { label: "Beranda", icon: "home", href: "/beranda" },
  { label: "Jelajah", icon: "explore", href: "/jelajah" },
  { label: "Simulasi", icon: "science", action: "missions" as const },
  { label: "Rencana", icon: "calendar_today", href: "/beranda#rencana" },
  { label: "Profil", icon: "person", href: "/onboarding" },
];

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const {
    state,
    profile,
    selection,
    hydrated,
    error,
    saved,
    setMode,
    setPanel,
    retrySave,
  } = useWorkspace();
  const active = ["/jelajah", "/rekomendasi", "/prodi", "/bantuan/"].some(
    (path) => pathname.startsWith(path),
  )
    ? "Jelajah"
    : "Beranda";
  return (
    <div className="min-h-dvh bg-canvas text-text-primary">
      <aside
        aria-label="Navigasi aplikasi"
        className="fixed inset-y-0 left-0 z-40 hidden w-[220px] flex-col justify-between border-r border-border-subtle bg-white shadow-[0_1px_8px_rgba(0,0,0,0.03)] xl:flex"
      >
        <div>
          <Link
            href="/"
            className="flex h-16 items-center border-b border-border-subtle px-5"
            aria-label="Beranda publik Nexalora"
          >
            <Brand className="h-7 w-auto" />
          </Link>
          <p className="px-5 pt-5 pb-2 text-[11px] font-bold tracking-wider text-text-secondary uppercase">
            Menu Utama
          </p>
          <nav className="flex flex-col gap-1 px-3">
            {navigation.map((item) => {
              const classes = `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition-colors ${active === item.label ? "bg-[#EEF2FF] font-semibold text-primary-container" : "font-medium text-secondary hover:bg-surface-subtle hover:text-text-primary"}`;
              return item.href ? (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={active === item.label ? "page" : undefined}
                  className={classes}
                >
                  <Icon name={item.icon} className="text-xl" />
                  {item.label}
                </Link>
              ) : (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPanel({ kind: "missions" })}
                  className={classes}
                >
                  <Icon name={item.icon} className="text-xl" />
                  {item.label}
                </button>
              );
            })}
          </nav>
          <p className="px-5 pt-6 pb-2 text-[11px] font-bold tracking-wider text-text-secondary uppercase">
            Pengaturan
          </p>
          <nav className="flex flex-col gap-1 px-3">
            {[
              {
                label: "Pengaturan",
                icon: "settings",
                kind: "settings" as const,
              },
              {
                label: "Bantuan & Batas",
                icon: "help_outline",
                kind: "help" as const,
              },
            ].map((item) => (
              <button
                key={item.kind}
                type="button"
                onClick={() => setPanel({ kind: item.kind })}
                className="flex items-center gap-3 rounded-xl px-3.5 py-2 text-sm font-medium text-secondary hover:bg-surface-subtle"
              >
                <Icon name={item.icon} className="text-xl" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="border-t border-border-subtle p-4">
          <p className="rounded-xl border border-border-default bg-surface-subtle p-2 text-caption-meta text-secondary">
            {saved ? "Pilihan tersimpan di tab" : "Pratinjau · penyimpanan tab"}
          </p>
        </div>
      </aside>
      <div className="workspace-body min-w-0 xl:pl-[220px]">
        <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle bg-white px-4 py-3 sm:px-6 xl:min-h-16">
          <Link
            href="/beranda"
            aria-label="Beranda aplikasi Nexalora"
            className="xl:hidden"
          >
            <Brand className="h-7 w-auto" />
          </Link>
          <form
            action="/jelajah"
            method="get"
            role="search"
            className="relative order-3 w-full md:order-none md:w-72 lg:w-80"
          >
            <label htmlFor="workspace-search" className="sr-only">
              Cari prodi, kampus, atau peran karier
            </label>
            <Icon
              name="search"
              className="absolute top-3 left-3 text-lg text-secondary"
            />
            <input
              id="workspace-search"
              type="search"
              name="q"
              maxLength={120}
              placeholder="Cari prodi, kampus, atau karier..."
              className="h-10 w-full rounded-xl border border-border-subtle bg-surface-subtle pr-9 pl-9 text-xs placeholder:text-secondary focus:border-primary-container focus:bg-white"
            />
            <button
              type="submit"
              aria-label="Cari dalam katalog"
              className="absolute inset-y-0 right-0 flex w-9 items-center justify-center rounded-r-xl text-primary-container"
            >
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </form>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Pengaturan pratinjau"
              onClick={() => setPanel({ kind: "settings" })}
              className="flex size-8 items-center justify-center rounded-full text-secondary hover:bg-surface-subtle xl:hidden"
            >
              <Icon name="settings" className="text-lg" />
            </button>
            <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-800">
              {profile.isDraft ? "Draf Tab" : "Mode Demo"}
            </span>
            <button
              type="button"
              onClick={() => setPanel({ kind: "compare" })}
              className="flex items-center gap-1.5 rounded-full border border-indigo-100 bg-[#EEF2FF] px-2.5 py-1 text-[11px] font-semibold text-primary-container"
            >
              <Icon name="balance" className="text-base" />
              <span className="hidden sm:inline">Bandingkan </span>(
              {selection.compareIds.length}/3)
            </button>
            <Link
              href="/onboarding"
              className="flex items-center gap-2.5 border-l border-border-default pl-3"
              aria-label={`Tinjau profil ${profile.name}`}
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-white">
                {profile.name.slice(0, 1).toLocaleUpperCase("id-ID")}
              </span>
              <span className="hidden max-w-28 flex-col sm:flex">
                <span className="truncate text-[13px] font-semibold leading-none">
                  {profile.name}
                </span>
                <span className="mt-0.5 text-[11px] text-secondary">
                  {profile.grade && profile.grade !== "other"
                    ? `Kelas ${profile.grade} SMA`
                    : "Profil eksplorasi"}
                </span>
              </span>
            </Link>
          </div>
        </header>
        <main
          id="main-content"
          className="mx-auto flex w-full max-w-[1120px] flex-col gap-6 px-4 pt-5 pb-40 sm:px-6 xl:pb-24"
        >
          <div className="no-print flex flex-col justify-between gap-3 rounded-xl border border-border-subtle bg-white px-4 py-3 text-caption-meta text-secondary sm:flex-row sm:items-center">
            <p className="max-w-xl">
              {profile.isDraft
                ? "Profil memakai draf onboarding tab ini. Katalog tetap sintetis; progres contoh tidak dicampurkan ke drafmu."
                : "Profil Dimas dan Rani serta seluruh kampus adalah data sintetis untuk pratinjau desain."}
            </p>
            <label className="flex shrink-0 items-center gap-2">
              <span className="text-[11px] font-semibold">Profil tampilan</span>
              <select
                value={state.mode}
                disabled={!hydrated}
                onChange={(event) =>
                  setMode(event.target.value as typeof state.mode)
                }
                className="max-w-48 rounded-lg border border-border-default bg-surface-subtle px-2 py-2 text-xs"
              >
                <option value="auto">Draf onboarding / otomatis</option>
                <option value="dimas">Dimas · Kelas XI</option>
                <option value="rani">Rani · Kelas XII</option>
              </select>
            </label>
          </div>
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-status-warning-bg p-3 text-caption-meta text-status-warning-text"
            >
              <p>{error}</p>
              <button
                type="button"
                onClick={retrySave}
                className="mt-2 rounded font-semibold underline"
              >
                Coba Simpan Pilihan
              </button>
            </div>
          )}
          {children}
        </main>
      </div>
      <nav
        aria-label="Navigasi mobile aplikasi"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border-subtle bg-white/95 px-1 py-2 backdrop-blur-xl xl:hidden"
      >
        {navigation.map((item) => {
          const classes = `flex flex-col items-center gap-1 rounded-lg px-1 py-1 text-[10px] ${item.label === active ? "font-semibold text-primary-container" : "text-secondary"}`;
          return item.href ? (
            <Link
              key={item.label}
              href={item.href}
              aria-current={item.label === active ? "page" : undefined}
              className={classes}
            >
              <Icon name={item.icon} className="text-xl" />
              {item.label}
            </Link>
          ) : (
            <button
              type="button"
              key={item.label}
              onClick={() => setPanel({ kind: "missions" })}
              className={classes}
            >
              <Icon name={item.icon} className="text-xl" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
