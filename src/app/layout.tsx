import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jakarta = localFont({
  src: "../../public/fonts/plus-jakarta-sans-latin.woff2",
  variable: "--font-jakarta",
  display: "swap",
  weight: "400 800",
});

export const metadata: Metadata = {
  title: {
    default: "Nexalora",
    template: "%s | Nexalora",
  },
  description:
    "Eksplorasi jurusan dan karier lewat pengalaman belajar, perbandingan pilihan, dan rencana 30 hari bersama Nexalora.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main-content">
          Lewati ke konten utama
        </a>
        {children}
      </body>
    </html>
  );
}
