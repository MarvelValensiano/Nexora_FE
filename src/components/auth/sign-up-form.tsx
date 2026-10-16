"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { submitAuth } from "@/lib/auth/client";
import {
  isValidEmail,
  passwordRules,
  validateSignUp,
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

export function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const rules = passwordRules(password);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current) return;
    const nextErrors = validateSignUp({ email, password, consent });
    setErrors(nextErrors);
    setNotice("");
    if (Object.keys(nextErrors).length) {
      const name = nextErrors.email
        ? "email"
        : nextErrors.password
          ? "password"
          : "consent";
      form.current
        ?.querySelector<HTMLInputElement>(`[name="${name}"]`)
        ?.focus();
      return;
    }
    submitting.current = true;
    setLoading(true);
    try {
      const result = await submitAuth({
        operation: "signup",
        email: email.trim(),
        password,
        consentVersion: "eksplorasi-1",
      });
      if (result.status === "authenticated") {
        setPassword("");
        router.push("/onboarding");
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
      <div className="relative w-full rounded-xl bg-surface-default p-6 shadow-sm sm:p-8">
        <AuthIntro
          variant="signup"
          title="Buat Akun Nexalora"
          description="Eksplorasi jurusan dan karier secara terarah tanpa tekanan."
        />
        {notice && (
          <ServiceNotice message={notice} onClose={() => setNotice("")} />
        )}
        <form
          ref={form}
          id="signup-form"
          method="post"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-email"
              className="text-body-strong text-text-primary"
            >
              Email Siswa atau Belajar
            </label>
            <div className="relative">
              <input
                id="signup-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoCapitalize="none"
                spellCheck={false}
                maxLength={254}
                required
                disabled={loading}
                value={email}
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
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "signup-email-error" : "signup-email-help"
                }
                placeholder="nama@sekolah.sch.id atau gmail.com"
                className={`${inputClasses} bg-white pr-11`}
              />
              {isValidEmail(email) && (
                <Icon
                  name="check_circle"
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-xl text-status-success-text"
                />
              )}
            </div>
            <FieldError id="signup-email-error">{errors.email}</FieldError>
            <p
              id="signup-email-help"
              className="text-caption-meta text-text-secondary"
            >
              Gunakan email aktif untuk menyimpan progres eksplorasimu.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-password"
              className="text-body-strong text-text-primary"
            >
              Password
            </label>
            <PasswordField
              id="signup-password"
              name="password"
              autoComplete="new-password"
              required
              minLength={8}
              disabled={loading}
              value={password}
              error={errors.password}
              describedBy="password-requirements"
              placeholder="Minimal 8 karakter"
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({ ...current, password: undefined }));
              }}
            />
            <div
              id="password-requirements"
              className="mt-1 flex flex-col gap-1.5 rounded-lg bg-surface-subtle p-3"
            >
              <p className="mb-0.5 text-caption-badge tracking-wider text-text-secondary uppercase">
                Ketentuan Kata Sandi
              </p>
              <ul className="flex flex-col gap-1.5 text-caption-meta">
                {[
                  ["Minimal 8 karakter", rules.length],
                  ["Kombinasi huruf dan angka", rules.combination],
                ].map(([label, valid]) => (
                  <li
                    key={String(label)}
                    className={`flex items-center gap-2 ${valid ? "text-status-success-text" : "text-text-secondary"}`}
                  >
                    <span className="flex size-4 shrink-0 items-center justify-center">
                      {valid ? (
                        <Icon name="check_circle" className="text-base" />
                      ) : (
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-text-secondary"
                        />
                      )}
                    </span>
                    <span>
                      {String(label)}
                      <span className="sr-only">
                        {valid ? ": terpenuhi" : ": belum terpenuhi"}
                      </span>
                    </span>
                  </li>
                ))}
                <li className="flex items-start gap-2 text-text-secondary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 ml-1 size-1.5 shrink-0 rounded-full bg-text-secondary"
                  />
                  <span>
                    Hindari tanggal lahir, nama depan, dan pola umum seperti
                    1234.
                  </span>
                </li>
              </ul>
              {password && !rules.commonPattern && (
                <p className="text-caption-meta text-status-warning-text">
                  Saran: gunakan kata sandi yang lebih sulit ditebak.
                </p>
              )}
            </div>
          </div>
          <div className="pt-1">
            <div className="flex items-start gap-2">
              <input
                id="signup-consent"
                name="consent"
                type="checkbox"
                checked={consent}
                disabled={loading}
                required
                onChange={(event) => {
                  setConsent(event.target.checked);
                  setErrors((current) => ({ ...current, consent: undefined }));
                }}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? "signup-consent-error" : undefined
                }
                className="mt-1 size-4 shrink-0 cursor-pointer accent-primary"
              />
              <div>
                <label
                  htmlFor="signup-consent"
                  className="cursor-pointer text-body-default text-on-surface-variant"
                >
                  Saya memahami dan menyetujui penjelasan pemrosesan data dan
                  privasi belajar.
                </label>
                <button
                  type="button"
                  onClick={() => setPrivacyOpen(true)}
                  className="mt-1 block rounded text-label-default text-primary underline underline-offset-2 hover:text-primary-container"
                >
                  Baca penjelasan pemrosesan data
                </button>
              </div>
            </div>
            <div className="mt-2">
              <FieldError id="signup-consent-error">
                {errors.consent}
              </FieldError>
            </div>
          </div>
          <SubmitButton loading={loading} loadingText="Menyiapkan Akun...">
            Buat Akun
          </SubmitButton>
          <p className="flex flex-wrap items-center justify-center gap-1.5 pt-1 text-body-default text-text-secondary">
            Sudah punya akun?
            <Link
              href="/masuk"
              className="text-body-strong text-primary underline underline-offset-2"
            >
              Masuk
            </Link>
          </p>
        </form>
      </div>
      <PrivacyBadge signup />
      <Link
        href="/onboarding"
        className="mt-3 rounded-lg border border-border-default bg-white px-4 py-3 text-center text-label-default text-primary hover:bg-surface-container-low"
      >
        Lihat Pratinjau Onboarding
      </Link>
      <Modal
        open={privacyOpen}
        onClose={() => setPrivacyOpen(false)}
        labelledBy="privacy-title"
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 id="privacy-title" className="text-headline-h2">
              Penjelasan Pemrosesan Data
            </h2>
            <button
              type="button"
              onClick={() => setPrivacyOpen(false)}
              aria-label="Tutup penjelasan privasi"
              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-surface-subtle"
            >
              <Icon name="close" className="text-lg" />
            </button>
          </div>
          <p className="mt-3 text-caption-meta text-text-secondary">
            Rancangan penjelasan · versi eksplorasi-1
          </p>
          <div className="mt-5 space-y-4 text-body-default text-secondary">
            <p>
              Akun pribadi ditujukan untuk menyimpan profil, jawaban minat,
              pengalaman misi, dan rencana tindakan agar dapat dilanjutkan.
            </p>
            <p>
              Nilai, anggaran, dan wilayah dapat dilengkapi kemudian. Nexalora
              tidak meminta NIK, NISN, alamat rumah rinci, foto rapor, atau
              dokumen penghasilan.
            </p>
            <p>
              Data perjalanan pribadi ditujukan untuk pemilik akun. Guru BK dan
              keluarga hanya menerima informasi yang kamu pilih untuk dibagikan,
              misalnya melalui paspor.
            </p>
            <p>
              Saat layanan data tersedia, pengaturan akan menyediakan kontrol
              persetujuan dan penghapusan data. Penjelasan retensi serta backup
              perlu ditetapkan sebelum akun pribadi digunakan.
            </p>
            <p className="rounded-lg bg-status-info-bg p-3 text-status-info-text">
              Saat ini layanan akun belum terhubung. Mengisi form atau
              mencentang persetujuan belum mengirim atau menyimpan data apa pun.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setPrivacyOpen(false)}
            className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-body-strong text-white"
          >
            Kembali ke Form
          </button>
        </div>
      </Modal>
    </>
  );
}
