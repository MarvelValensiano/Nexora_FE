"use client";

import type { ReactNode } from "react";
import { Icon } from "@/components/ui/icon";

export const fieldClass =
  "w-full min-w-0 rounded-lg border border-border-default bg-surface-subtle px-3.5 py-2.5 text-body-default text-text-primary transition-colors placeholder:text-text-secondary focus:border-primary focus:bg-white disabled:opacity-50 aria-invalid:border-status-error-text";

export function Notice({
  children,
  warning = false,
}: {
  children: ReactNode;
  warning?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2 rounded-xl p-3 text-caption-meta leading-relaxed ${warning ? "bg-status-warning-bg text-status-warning-text" : "bg-surface-container-low text-text-secondary"}`}
    >
      <Icon name="info" className="mt-0.5 text-lg" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}

export function StepTitle({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      {eyebrow && (
        <p className="text-caption-badge tracking-wider text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <h1
        id="onboarding-heading"
        tabIndex={-1}
        className="text-headline-h1 tracking-tight text-text-primary"
      >
        {title}
      </h1>
      <p className="text-body-default leading-relaxed text-text-secondary">
        {children}
      </p>
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? (
    <p
      id={id}
      role="alert"
      className="mt-1 text-caption-meta text-status-error-text"
    >
      {message}
    </p>
  ) : null;
}

export function ChoiceGroup<T extends string>({
  name,
  legend,
  value,
  options,
  onChange,
  errorId,
}: {
  name: string;
  legend: string;
  value: T;
  options: readonly { value: T; label: string; description?: string }[];
  onChange: (value: T) => void;
  errorId?: string;
}) {
  return (
    <fieldset className="space-y-2.5" aria-describedby={errorId}>
      <legend className="text-headline-h3 text-text-primary">{legend}</legend>
      <div
        className={`grid grid-cols-1 gap-2.5 ${options.length <= 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}
      >
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-2.5 rounded-xl border p-3.5 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${value === option.value ? "border-primary-container bg-status-info-bg" : "border-border-default bg-surface-default hover:bg-surface-subtle"}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 size-4 shrink-0 accent-primary"
            />
            <span className="min-w-0">
              <span
                className={`block text-body-strong ${value === option.value ? "text-primary" : "text-text-primary"}`}
              >
                {option.label}
              </span>
              {option.description && (
                <span className="mt-1 block text-caption-meta leading-relaxed text-text-secondary">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function StepActions({
  back,
  backLabel = "Kembali",
  skip,
  nextLabel,
  disabled = false,
}: {
  back: () => void;
  backLabel?: string;
  skip?: () => void;
  nextLabel: string;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-col-reverse justify-between gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={back}
        className="flex items-center justify-center gap-1 rounded-lg px-3 py-2.5 text-label-default text-text-secondary hover:bg-surface-subtle"
      >
        <Icon name="arrow_back" className="text-lg" />
        {backLabel}
      </button>
      <div className="flex flex-col-reverse gap-2 sm:flex-row">
        {skip && (
          <button
            type="button"
            onClick={skip}
            className="rounded-lg px-3 py-2.5 text-label-default text-primary hover:bg-surface-container-low"
          >
            Lewati langkah ini
          </button>
        )}
        <button
          type="submit"
          disabled={disabled}
          className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-container px-5 py-3 text-label-default text-white shadow-sm hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
        >
          {nextLabel}
          <Icon name="arrow_forward" className="text-lg" />
        </button>
      </div>
    </div>
  );
}
