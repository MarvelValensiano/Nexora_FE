import Link from "next/link";
import type { ReactNode } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col justify-between bg-canvas">
      <header className="sticky top-0 z-40 w-full bg-surface-default/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 lg:px-8">
          <Link href="/" aria-label="Beranda Nexalora" className="shrink-0">
            <Brand className="h-8 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-1.5 rounded-full bg-surface-subtle px-2 py-1 text-caption-meta text-text-secondary md:flex">
              <span className="size-2 rounded-full bg-pill-industri-text" />
              Mode Eksplorasi Aman
            </span>
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-label-default text-text-secondary transition-colors hover:text-on-surface"
            >
              <Icon name="arrow_back" className="text-lg" />
              <span className="hidden sm:inline">Kembali ke </span>Beranda
            </Link>
          </div>
        </div>
      </header>
      <main
        id="main-content"
        className="flex w-full flex-1 items-center justify-center px-4 py-8 sm:py-12"
      >
        <div className="mx-auto flex w-full max-w-[460px] flex-col">
          {children}
        </div>
      </main>
      <footer className="w-full bg-surface-default py-6 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 text-center text-caption-meta text-text-secondary sm:flex-row sm:text-left lg:px-8">
          <p className="flex items-center justify-center gap-1.5">
            <Icon
              name="verified_user"
              className="text-base text-status-success-text"
            />
            Kamu memegang kendali atas data eksplorasi belajarmu.
          </p>
          <p>© 2026 Nexalora Indonesia. Untuk siswa SMA kelas XI &amp; XII.</p>
        </div>
      </footer>
    </div>
  );
}
