"use client";

import Link from "next/link";
import { useState, type ComponentProps, type ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export function AuthIntro({
  title,
  description,
  variant = "login",
}: {
  title: string;
  description: string;
  variant?: "login" | "signup" | "recovery";
}) {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <div
        className={`mb-3 flex size-12 items-center justify-center rounded-xl shadow-sm ${variant === "login" ? "bg-primary-container text-white" : "bg-surface-container-low text-primary"}`}
      >
        {variant === "signup" ? (
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            aria-hidden="true"
          >
            <path
              d="m2 9 10-5 10 5-10 5L2 9Zm4 2v6c3.5 3 8.5 3 12 0v-6M22 9v7"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <Icon name="lock" className="text-2xl" />
        )}
      </div>
      {variant === "signup" && (
        <span className="mb-1 rounded-full bg-surface-subtle px-2.5 py-0.5 text-caption-badge tracking-wider text-text-secondary uppercase">
          Akses Siswa SMA
        </span>
      )}
      <h1
        className={
          variant === "recovery"
            ? "text-headline-h2 tracking-tight text-text-primary"
            : "text-headline-h1 tracking-tight text-text-primary"
        }
      >
        {title}
      </h1>
      <p className="mt-1 max-w-sm text-body-default leading-relaxed text-text-secondary">
        {description}
      </p>
    </div>
  );
}

export const inputClasses =
  "w-full min-w-0 rounded-[10px] border border-border-default bg-surface-subtle px-3.5 py-3 text-body-default text-text-primary shadow-sm transition-colors placeholder:text-text-secondary focus:border-primary focus:bg-white disabled:opacity-60 aria-invalid:border-status-error-text aria-invalid:bg-status-error-bg/30";

export function FieldError({
  id,
  children,
}: {
  id: string;
  children?: string;
}) {
  if (!children) return null;
  return (
    <p
      id={id}
      className="flex items-start gap-1.5 rounded-md bg-status-error-bg px-2 py-1.5 text-caption-meta text-status-error-text"
    >
      <Icon name="info" className="mt-0.5 text-base" />
      {children}
    </p>
  );
}

export function PasswordField({
  id,
  error,
  describedBy,
  disabled,
  ...props
}: ComponentProps<"input"> & {
  id: string;
  error?: string;
  describedBy?: string;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <div className="relative">
        <input
          {...props}
          id={id}
          type={visible ? "text" : "password"}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [describedBy, error && `${id}-error`].filter(Boolean).join(" ") ||
            undefined
          }
          className={`${inputClasses} pr-12`}
        />
        <button
          type="button"
          disabled={disabled}
          aria-label={
            visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"
          }
          aria-pressed={visible}
          aria-controls={id}
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-1 flex w-11 items-center justify-center rounded-md text-text-secondary transition-colors hover:text-text-primary disabled:opacity-50"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
            <circle cx="12" cy="12" r="3" />
            {visible && <path d="m3 3 18 18" />}
          </svg>
        </button>
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </>
  );
}

export function SubmitButton({
  loading,
  loadingText,
  children,
}: {
  loading: boolean;
  loadingText: string;
  children: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="flex min-h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-primary px-4 py-3.5 text-body-strong text-on-primary shadow-sm transition-colors hover:bg-on-primary-fixed-variant disabled:cursor-wait disabled:opacity-70"
    >
      {loading ? (
        <>
          <span
            aria-hidden="true"
            className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
          />
          {loadingText}
        </>
      ) : (
        <>
          {children}
          <Icon name="arrow_forward" className="text-lg" />
        </>
      )}
    </button>
  );
}

export function ServiceNotice({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div
      role="alert"
      className="mb-4 flex items-start gap-2.5 rounded-[10px] border border-status-warning-text/20 bg-status-warning-bg p-3 text-status-warning-text"
    >
      <Icon name="info" className="mt-0.5 text-lg" />
      <div className="min-w-0 flex-1">
        <p className="text-body-strong">Layanan akun belum tersedia</p>
        <p className="mt-1 text-caption-meta leading-relaxed">{message}</p>
        <Link
          href="/demo"
          className="mt-2 inline-flex text-label-default underline underline-offset-2"
        >
          Lanjut ke Mode Demo
        </Link>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup pemberitahuan layanan"
        className="flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-white/40"
      >
        <Icon name="close" className="text-lg" />
      </button>
    </div>
  );
}

export function PrivacyBadge({ signup = false }: { signup?: boolean }) {
  return (
    <div className="mt-5 flex items-start justify-center gap-2 rounded-xl bg-surface-container-low/70 px-4 py-3 text-caption-meta leading-relaxed text-text-secondary">
      <Icon name="lock" className="mt-0.5 text-lg" />
      <p>
        {signup ? (
          <>
            <strong className="text-text-primary">
              Kendalikan data pribadimu.
            </strong>{" "}
            Nexalora tidak meminta NIK, NISN, atau berkas rahasia.
          </>
        ) : (
          <>
            Data eksplorasi pribadi ditujukan untuk membantumu meninjau pilihan
            studi dan karier.
          </>
        )}
      </p>
    </div>
  );
}
