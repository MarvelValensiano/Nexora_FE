"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  describedBy?: string;
  children: ReactNode;
  wide?: boolean;
  side?: boolean;
};

export function Modal({
  open,
  onClose,
  labelledBy,
  describedBy,
  children,
  wide = false,
  side = false,
}: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    if (!element || !open) return;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open]);

  return (
    <dialog
      ref={dialog}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      className={`app-dialog ${side ? "m-0 ml-auto h-dvh max-h-dvh w-full max-w-[520px] overflow-hidden" : `m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] ${wide ? "max-w-5xl" : "max-w-[560px]"} overflow-y-auto rounded-2xl`} border-0 bg-white p-0 text-on-surface shadow-xl`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === dialog.current) onClose();
      }}
    >
      {open && children}
    </dialog>
  );
}
