"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { submitAuth } from "@/lib/auth/client";
import {
  isValidEmail,
  validateSignIn,
  type AuthFieldErrors,
} from "@/lib/auth/validation";
import {
  AuthIntro,
  FieldError,
  PasswordField,
  PrivacyBadge,
  ServiceNotice,
  SubmitButton,
  inputClasses,
} from "./auth-ui";

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberDevice, setRememberDevice] = useState(false);
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);
  const form = useRef<HTMLFormElement>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateSignIn({ email, password });
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) {
      form.current
        ?.querySelector<HTMLInputElement>(
          `[name="${nextErrors.email ? "email" : "password"}"]`,
        )
        ?.focus();
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const result = await submitAuth({
        operation: "signin",
        email: email.trim(),
        password,
        rememberDevice,
      });
      if (result.status === "authenticated") {
        setPassword("");
        router.push("/beranda");
        return;
      }
      setNotice(result.message);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 rounded-full border border-border-default bg-surface-subtle px-3.5 py-2 text-caption-meta text-text-secondary shadow-sm">
        <span className="flex min-w-0 items-center gap-1.5">
          <Icon name="info" className="text-base" />
          <span>Mode Demo tanpa akun tersedia</span>
        </span>
        <Link
          href="/demo"
          className="inline-flex shrink-0 items-center gap-0.5 text-caption-badge text-primary hover:underline"
        >
          Mulai Demo
          <Icon name="arrow_forward" className="text-sm" />
        </Link>
      </div>
      <div className="flex flex-col overflow-hidden rounded-2xl bg-surface-default p-6 shadow-sm sm:p-8">
        <AuthIntro
          title="Masuk ke Akunmu"
          description="Lanjutkan draf simulasi dan tinjau rencana 30 harimu dengan tenang."
        />
        {notice && (
          <ServiceNotice message={notice} onClose={() => setNotice("")} />
        )}
        <form
          ref={form}
          id="signin-form"
          method="post"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="login-email"
              className="flex items-center justify-between gap-2 text-body-strong text-text-primary"
            >
              Email Terdaftar
              <span className="text-caption-meta font-normal text-text-secondary">
                SMA / Personal
              </span>
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              autoCapitalize="none"
              spellCheck={false}
              required
              maxLength={254}
              value={email}
              disabled={loading}
              onChange={(event) => {
                setEmail(event.target.value);
                setErrors((current) => ({ ...current, email: undefined }));
              }}
              onBlur={() => {
                if (email.trim() && !isValidEmail(email))
                  setErrors((current) => ({
                    ...current,
                    email: "Periksa lagi penulisan emailmu.",
                  }));
              }}
              placeholder="nama@sekolah.sch.id"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              className={inputClasses}
            />
            <FieldError id="login-email-error">{errors.email}</FieldError>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="login-password"
                className="text-body-strong text-text-primary"
              >
                Kata Sandi
              </label>
              <Link
                href="/pulihkan-akses"
                className="text-label-default text-primary hover:underline"
              >
                Lupa kata sandi?
              </Link>
            </div>
            <PasswordField
              id="login-password"
              name="password"
              autoComplete="current-password"
              required
              value={password}
              disabled={loading}
              error={errors.password}
              placeholder="Ketik kata sandi"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
            />
          </div>
          <div className="flex items-start gap-2 pt-0.5">
            <input
              id="remember-device"
              type="checkbox"
              checked={rememberDevice}
              disabled={loading}
              onChange={(event) => setRememberDevice(event.target.checked)}
              className="mt-0.5 size-4 shrink-0 cursor-pointer accent-primary"
              aria-describedby="remember-device-help"
            />
            <div>
              <label
                htmlFor="remember-device"
                className="cursor-pointer text-caption-meta text-text-secondary"
              >
                Ingat perangkat ini selama 30 hari
              </label>
              <p
                id="remember-device-help"
                className="mt-1 text-caption-meta text-text-secondary"
              >
                Gunakan hanya pada perangkat pribadi. Berlaku saat layanan akun
                terhubung.
              </p>
            </div>
          </div>
          <div className="pt-2">
            <SubmitButton loading={loading} loadingText="Menghubungkan Akun...">
              Masuk ke Dashboard
            </SubmitButton>
          </div>
        </form>
        <div className="-mx-6 -mb-6 mt-6 flex flex-col items-center gap-1 bg-surface-subtle/50 p-4 text-center sm:-mx-8 sm:-mb-8">
          <p className="text-body-default text-text-secondary">
            Belum punya akun Nexalora?
          </p>
          <Link
            href="/daftar"
            className="inline-flex items-center gap-1 text-body-strong text-primary hover:underline"
          >
            Daftar akun baru siswa SMA
            <Icon name="chevron_right" className="text-base" />
          </Link>
        </div>
      </div>
      <PrivacyBadge />
    </>
  );
}
