import Link from "next/link";
import { Brand } from "@/components/ui/brand";

export function SiteFooter() {
  return (
    <footer id="privasi" className="w-full bg-surface-container-low py-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-6 md:flex-row md:items-center lg:px-12">
        <div className="flex max-w-md flex-col gap-2">
          <Link href="/" aria-label="Nexalora beranda">
            <Brand />
          </Link>
          <p className="text-caption-meta text-on-surface-variant">
            Platform simulasi tugas mini dan eksplorasi jurusan kuliah untuk
            siswa SMA kelas XI &amp; XII.
          </p>
          <p className="text-caption-meta text-on-surface-variant">
            Demo menggunakan data sintetis dan tidak meminta data pribadi.
            Penyimpanan profil pribadi memerlukan persetujuan siswa.
          </p>
          <span className="text-caption-meta text-secondary">
            © 2026 Nexalora Indonesia.
          </span>
        </div>
        <nav
          aria-label="Informasi produk"
          className="flex flex-wrap gap-x-5 gap-y-3 text-caption-meta text-on-surface-variant"
        >
          <Link href="/#privasi" className="hover:text-primary">
            Data &amp; Privasi
          </Link>
          <Link href="/#batas-produk" className="hover:text-primary">
            Batasan Produk
          </Link>
          <Link href="/pilihan-akses" className="hover:text-primary">
            Pilihan Akses
          </Link>
        </nav>
      </div>
    </footer>
  );
}
