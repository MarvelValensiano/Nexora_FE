"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { submitAuth } from "@/lib/auth/client";
import { isValidEmail } from "@/lib/auth/validation";
import {
  AuthIntro,
  FieldError,
  ServiceNotice,
  SubmitButton,
  inputClasses,
} from "./auth-ui";

export function RecoveryForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const submitting = useRef(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    setNotice("");
    if (!isValidEmail(email)) {
      setError(
        email.trim()
          ? "Periksa lagi penulisan emailmu. Contoh: nama@sekolah.sch.id atau nama@gmail.com."
          : "Masukkan email akun yang ingin kamu pulihkan.",
      );
      input.current?.focus();
      return;
    }
    setError("");
    setLoading(true);
    submitting.current = true;
    try {
      const result = await submitAuth({
        operation: "recovery",
        email: email.trim(),
      });
      setNotice(result.message);
    } finally {
      setLoading(false);
      submitting.current = false;
    }
  }

  return (
    <div className="relative flex w-full flex-col rounded-xl bg-white p-6 shadow-sm sm:p-8">
      <Link
        href="/masuk"
        className="mb-4 inline-flex items-center gap-1 self-start text-label-default text-text-secondary hover:text-on-surface"
      >
        <Icon name="arrow_back" className="text-lg" />
        Kembali ke halaman Masuk
      </Link>
      <AuthIntro
        variant="recovery"
        title="Pemulihan Akses Akun"
        description="Gunakan email akunmu untuk meminta petunjuk mengatur ulang kata sandi."
      />
      {notice && (
        <ServiceNotice message={notice} onClose={() => setNotice("")} />
      )}
      <form
        id="recovery-form"
        method="post"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={loading}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="recovery-email"
            className="text-body-strong text-text-primary"
          >
            Email Akun Nexalora
          </label>
          <div className="relative">
            <input
              ref={input}
              id="recovery-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              maxLength={254}
              required
              value={email}
              disabled={loading}
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? "recovery-email-error" : "recovery-email-help"
              }
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="nama@sekolah.sch.id"
              className={`${inputClasses} bg-white pr-11`}
            />
            {isValidEmail(email) && (
              <Icon
                name="check_circle"
                className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xl text-status-success-text"
              />
            )}
          </div>
          <FieldError id="recovery-email-error">{error}</FieldError>
          <p
            id="recovery-email-help"
            className="mt-0.5 text-caption-meta text-text-secondary"
          >
            Gunakan email sekolah atau email pribadi yang dipakai saat
            mendaftar.
          </p>
        </div>
        <SubmitButton loading={loading} loadingText="Mengirim Instruksi...">
          Kirim Instruksi Pemulihan
        </SubmitButton>
      </form>
      <div className="relative my-6 flex items-center justify-center">
        <div className="h-px w-full bg-surface-variant" />
        <span className="absolute bg-white px-2 text-caption-meta text-text-secondary">
          Pilihan Lain
        </span>
      </div>
      <p className="text-center text-body-default text-text-secondary">
        Ingat kata sandimu?{" "}
        <Link
          href="/masuk"
          className="ml-1 text-body-strong text-primary hover:underline"
        >
          Masuk kembali
        </Link>
      </p>
      <details className="mt-4 rounded-lg bg-surface-subtle p-3 text-caption-meta text-text-secondary">
        <summary className="rounded text-label-default text-text-primary">
          Butuh bantuan lebih lanjut?{" "}
          <span className="text-primary">Buka Panduan</span>
        </summary>
        <ol className="mt-3 list-decimal space-y-2 pl-4 leading-relaxed">
          <li>Periksa ejaan email yang digunakan saat mendaftar.</li>
          <li>
            Saat layanan pemulihan aktif, periksa kotak masuk serta folder spam
            atau promosi.
          </li>
          <li>
            Jangan membagikan kata sandi atau tautan pemulihan kepada orang
            lain.
          </li>
          <li>
            Jika belum pernah membuat akun, pilih{" "}
            <Link href="/daftar" className="text-primary underline">
              Daftar
            </Link>{" "}
            atau{" "}
            <Link href="/demo" className="text-primary underline">
              Mode Demo
            </Link>
            .
          </li>
        </ol>
      </details>
      <div className="mt-6 flex items-start justify-center gap-1.5 rounded-lg bg-surface-subtle px-3 py-2 text-center text-caption-meta text-text-secondary">
        <Icon name="lock" className="mt-0.5 text-base" />
        <span>
          Status pemulihan tidak akan mengungkap apakah suatu email memiliki
          akun.
        </span>
      </div>
    </div>
  );
}
