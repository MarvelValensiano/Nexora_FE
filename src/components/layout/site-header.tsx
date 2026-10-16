"use client";

import Link from "next/link";
import { useState } from "react";
import { Brand } from "@/components/ui/brand";
import { Icon } from "@/components/ui/icon";

const navigation = [
  ["Beranda", "/#beranda"],
  ["Cara Kerja", "/#cara-kerja"],
  ["Simulasi Misi", "/#simulasi-misi"],
  ["Komparasi Jurusan", "/jelajah"],
  ["Batas Produk", "/#batas-produk"],
] as const;

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-surface-default/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6 lg:px-12">
        <Link
          href="/"
          aria-label="Nexalora beranda"
          onClick={() => setMenuOpen(false)}
        >
          <Brand />
        </Link>
        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-5 lg:flex"
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="text-[13px] font-medium text-on-surface-variant transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/pilihan-akses"
            className="rounded-lg bg-primary-container px-4 py-2 text-label-default text-on-primary transition-colors hover:bg-primary"
          >
            Mulai Eksplorasi
          </Link>
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg hover:bg-surface-subtle lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Navigasi mobile"
          className="flex flex-col gap-1 border-t border-border-subtle bg-white px-6 py-3 lg:hidden"
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenuOpen(false);
          }}
        >
          {navigation.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-3 py-3 text-body-strong hover:bg-surface-container-low"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
