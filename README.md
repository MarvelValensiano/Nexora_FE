# Nexalora Frontend

Repository: [Nexora_FE](https://github.com/MarvelValensiano/Nexora_FE).

Frontend Nexalora dibangun dengan Next.js App Router, TypeScript, dan Tailwind CSS.

## Prasyarat

- Node.js 22 atau versi LTS terbaru
- npm 10 atau lebih baru

## Menjalankan project

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Script

```bash
npm run dev        # development server
npm run build      # production build
npm run start      # menjalankan production server
npm run lint       # pemeriksaan ESLint
npm run typecheck  # pemeriksaan TypeScript
npm run format     # merapikan format kode di src
npm run format:check # memeriksa konsistensi format
```

Kode aplikasi berada di `src/app` dan aset statis berada di `public`.

## Implementasi UI awal

- `/`: landing page dengan hero, cara kerja, tiga misi, batas produk, dan CTA.
- `/pilihan-akses`: pilihan mode demo atau akun pribadi.
- `/demo`: workspace dengan profil sintetis, pencarian, pemilihan pembanding,
  reset demo, contoh skenario biaya, dan dialog ajakan membuat akun.
- `/masuk`: form login dengan validasi email, toggle kata sandi, dan preferensi perangkat.
- `/daftar`: form signup dengan checklist kata sandi serta dialog persetujuan data.
- `/pulihkan-akses`: form pemulihan akses dan panduan mandiri.
- `/onboarding`: persetujuan data, konteks siswa, preferensi opsional, akademik,
  12 aktivitas minat, dan ringkasan dari jawaban aktual.
- `/beranda`: dashboard dengan profil contoh Dimas/Rani atau draf onboarding,
  ringkasan progres, agenda contoh, dan pilihan studi.
- `/jelajah`: katalog enam program sintetis dengan pencarian, filter, simpan,
  detail, bukti, dan perbandingan maksimal tiga prodi.
- `/rekomendasi`: contoh susunan rekomendasi, bukti terkait profil, dan panel
  riwayat/perbandingan tiga versi sintetis. `?tab=tersemat` membuka koleksi sematan.
- `/prodi/[id]`: detail enam prodi, dengan tab ringkasan, kurikulum, bantuan,
  dan karier. Contoh: `/prodi/informatika-a?tab=kurikulum`.

Implementasi ini mengonversi desain UX-01–UX-16, UX-28, UX-29, UX-43–UX-46 yang diberikan.
Autentikasi server, penyimpanan server, editor/runner simulasi, planner pribadi, serta
ekspor paspor belum diimplementasikan. Data demo tetap terpisah dari data siswa;
state demo berlaku selama halaman terbuka dan kembali ke awal saat reload.

Komponen halaman berada di `src/components/landing` dan `src/components/demo`.
Token desain Tailwind CSS 4 berada di `src/styles/design-tokens.css`. Font,
ikon, logo, dan gambar referensi disimpan lokal di `public/fonts` dan
`public/images`, sehingga build tidak memerlukan Google Fonts atau Tailwind CDN.

Pada Windows PowerShell yang memblokir `npm.ps1`, gunakan `npm.cmd`.

## Form akses dan batas integrasi

Komponen form berada di `src/components/auth`, validasi di
`src/lib/auth/validation.ts`, dan batas integrasi provider di `src/lib/auth/client.ts`.
Adapter saat ini mengembalikan status layanan belum tersedia. Tidak ada request
autentikasi, pengiriman email, penyimpanan password, atau sesi login palsu.
Checkbox ingat perangkat belum menetapkan sesi 30 hari sebelum provider dihubungkan.
Persetujuan pada form belum disimpan; penjelasan retensi/backup perlu difinalisasi
bersama konfigurasi layanan data sebelum pilot.

Seluruh link pendaftaran mengarah ke `/daftar`; link lama `/masuk?mode=daftar`
tetap membuka form signup. Pemulihan menerima email sekolah maupun pribadi.
Pesan keberhasilan dan status akun harus berasal dari penyedia autentikasi saat
integrasi tersedia, bukan dari timer atau daftar akun lokal di browser.

Jalankan pengujian aturan validasi dengan `npm run test:auth`.

## Onboarding

Alur dapat dicoba melalui link **Lihat Pratinjau Onboarding** di halaman signup.
Adapter autentikasi tetap belum terhubung; ketika provider nanti mengembalikan
status `authenticated`, signup mengarahkan pengguna ke `/onboarding`.
Tidak ada akun atau sesi palsu yang dibuat untuk mengakses pratinjau.

Komponen berada di `src/components/onboarding`. Aturan minat, validasi nilai,
dan validasi anggaran berada di `src/lib/onboarding/domain.ts`.
`src/lib/onboarding/store.ts` menyimpan draf pratinjau di `sessionStorage`
setelah persetujuan, dengan debounce 400 ms, simpan saat navigasi, pemulihan saat
reload, pesan gagal, coba ulang, dan hapus draf. Tidak ada sinkronisasi akun atau
server; namespace pratinjau terpisah dari data demo. Jangan memakai draf tab
sebagai tempat penyimpanan permanen atau mencampurnya dengan profil akun kelak.

Nilai menyimpan pelajaran, semester, dan skala asal. Skala baru tidak mengubah
nilai lama. Anggaran adalah rupiah bulat per bulan serta batas biaya awal yang
terpisah. Nilai kosong tetap unknown, berbeda dari nol. Preferensi/akademik yang
dilewati tetap dapat diedit; drafnya tidak digunakan pada ringkasan aktif.

Instrumen awal berisi empat dimensi, masing-masing tiga aktivitas. Dimensi
tersedia jika minimal dua jawaban skala ada; personalisasi membutuhkan tiga
dimensi tersedia. Belum tahu dan Lewati tidak dianggap nol. Ringkasan berisi
bukti jawaban dan kelengkapan, tanpa skor bakat/peluang masuk. Pertanyaan masih
berupa konten awal tim dan perlu ditinjau sebelum pilot.

Rekomendasi personal dan riwayat versi server belum tersedia. Selesai onboarding
menyimpan penanda penyelesaian draf dan menawarkan akses beranda, tidak
menampilkan hasil rekomendasi yang dibuat-buat. Jalankan `npm run test:onboarding`
untuk memeriksa aturan domain dan pemulihan draf.

## Dashboard dan katalog

`src/app/(workspace)` menyediakan layout aplikasi bersama untuk `/beranda`
dan `/jelajah`. Komponen berada di `src/components/workspace`; data dan aturan
filter di `src/lib/workspace/domain.ts`. Gambar dari desain telah disimpan lokal.

Mode otomatis membaca draf onboarding jika tersedia; jika tidak, menampilkan
profil sintetis Dimas. Pilih Rani untuk empty/partial state. Pilihan simpan dan
bandingkan terpisah per profil dan disimpan pada namespace sessionStorage
`nexalora:workspace:preview:v1`, berbeda dari draf onboarding dan demo lama.
Tidak ada request akun, klaim data terverifikasi, atau ranking personal yang
dibuat-buat. Status autentikasi berhasil diarahkan ke beranda pada integrasi
login kelak; onboarding selesai menyediakan link menuju beranda.

Pencarian mencakup prodi, kampus, kota, dan contoh peran karier. Filter bidang,
lokasi, biaya pendidikan tahunan, serta simpanan bekerja bersama. Filter biaya
menggunakan batas atas rentang dan mengecualikan data unknown, tanpa mengubah
profil atau memperlebar filter secara diam-diam. Hasil kosong menyediakan aksi
melepas filter satu per satu. Perbandingan tidak menyimpulkan keterjangkauan
total karena data hidup dan biaya awal belum ada.

Agenda Dimas memakai tiga tugas sintetis dalam rentang 13 Oktober–11 November 2026. Mengubah tanggal/status hanya mengubah contoh pada tab. Rani dan draf
onboarding tidak menerima progres tugas/misi contoh. Panel simulasi hanya brief;
engine misi dan planner akun pribadi tetap belum terhubung. Panel perubahan
rekomendasi hanya contoh peninjauan, tidak menjalankan peringkat rekomendasi.

Jalankan `npm run test:workspace` untuk memeriksa filter, batas slot,
pemisahan profil, tanggal, serta penyimpanan dan pemulihan state workspace.

## Jelajah lanjutan

Katalog, hasil eksplorasi, sematan, dan detail menggunakan pilihan yang sama.
Sematan maksimal lima prodi, terpisah dari komparasi maksimal tiga. Draf lama
yang sudah memiliki enam simpanan tetap dipertahankan dan dapat dikurangi;
tidak ada penghapusan pilihan secara diam-diam. Filter katalog disimpan pada URL
dan diteruskan pada tautan kembali dari detail, dengan whitelist rute lokal.

Panel bukti membaca jawaban dimensi terkait dari onboarding, tanpa mengubah
unknown/lewati menjadi skor nol. Dimas memakai bukti dan tiga snapshot contoh
yang jelas ditandai sintetis. Mengganti susunan contoh memerlukan konfirmasi dan
tidak mengubah sematan, komparasi, nilai, atau jawaban minat. Rani dan draf siswa
tidak diberi riwayat rekomendasi rekaan. Engine ranking dan versi akun belum ada.

Rincian kurikulum hanya tersedia untuk semester 1 Informatika (enam mata kuliah,
19 SKS). Semester dan prodi lain menampilkan keadaan belum tersedia. Tombol cetak
menggunakan dialog browser dan dapat disimpan sebagai PDF oleh pengguna; bukan
ekspor paspor belajar resmi. Tidak ada klaim kurikulum terverifikasi.

Bantuan pendidikan A/B sepenuhnya ilustratif, tanpa tautan resmi, tenggat aktif,
atau jaminan manfaat. Simpan referensi dan tugas cek syarat adalah state nyata
pada tab per profil, berbeda dari sematan prodi. Tugas ditambahkan idempoten,
muncul di agenda/dashboard, dan dapat ditandai selesai; tidak mendaftar bantuan.
Ekstensi state kompatibel dengan workspace lama dan dihapus oleh reset workspace,
tanpa menghapus onboarding. Jalankan `npm run test:exploration` untuk verifikasi.
