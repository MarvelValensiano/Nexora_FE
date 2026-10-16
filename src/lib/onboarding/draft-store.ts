import type { OnboardingDraft } from "./domain";

type StoragePort = {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
};
export type DraftSnapshot = {
  draft: OnboardingDraft;
  hydrated: boolean;
  saveState: "idle" | "pending" | "saved" | "failed";
  savedAt: string | null;
  message: string;
};
type Options = {
  storage: () => StoragePort;
  createDraft: () => OnboardingDraft;
  restore: (value: unknown) => OnboardingDraft | null;
  now?: () => string;
  debounceMs?: number;
};
export const DRAFT_STORAGE_KEY = "nexalora:onboarding:preview:v1";

export function createDraftStore({
  storage,
  createDraft,
  restore,
  now = () => new Date().toISOString(),
  debounceMs = 400,
}: Options) {
  const serverSnapshot: DraftSnapshot = {
    draft: createDraft(),
    hydrated: false,
    saveState: "idle",
    savedAt: null,
    message: "",
  };
  let snapshot = serverSnapshot;
  let timer: ReturnType<typeof setTimeout> | null = null;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  function cancelTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function hydrate() {
    if (snapshot.hydrated) return;
    try {
      const saved = storage().getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const envelope: unknown = JSON.parse(saved);
        const candidate =
          typeof envelope === "object" && envelope !== null
            ? (envelope as Record<string, unknown>)
            : null;
        const draft = restore(candidate?.draft);
        if (!draft || !draft.consent) throw new Error("Invalid draft");
        const savedAt =
          typeof candidate?.savedAt === "string" &&
          Number.isFinite(Date.parse(candidate.savedAt))
            ? candidate.savedAt
            : null;
        snapshot = {
          draft,
          hydrated: true,
          saveState: "saved",
          savedAt,
          message: "",
        };
      } else snapshot = { ...serverSnapshot, hydrated: true };
    } catch {
      snapshot = {
        ...serverSnapshot,
        hydrated: true,
        saveState: "failed",
        message:
          "Draf sebelumnya tidak dapat dipulihkan. Mulai dari persetujuan atau hapus draf lama. Tidak ada data akun yang diubah.",
      };
    }
    emit();
  }

  function saveNow() {
    cancelTimer();
    if (!snapshot.hydrated || !snapshot.draft.consent) return false;
    try {
      const savedAt = now();
      storage().setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ draft: snapshot.draft, savedAt }),
      );
      snapshot = { ...snapshot, saveState: "saved", savedAt, message: "" };
      emit();
      return true;
    } catch {
      snapshot = {
        ...snapshot,
        saveState: "failed",
        message:
          "Draf belum berhasil disimpan di tab ini. Isian tetap tersedia; coba simpan ulang atau izinkan penyimpanan browser.",
      };
      emit();
      return false;
    }
  }

  function update(
    updater: (draft: OnboardingDraft) => OnboardingDraft,
    immediate = false,
  ) {
    if (!snapshot.hydrated) return;
    const draft = updater(snapshot.draft);
    if (draft === snapshot.draft) return;
    snapshot = {
      ...snapshot,
      draft,
      saveState: draft.consent ? "pending" : "idle",
      message: "",
    };
    emit();
    cancelTimer();
    if (draft.consent) {
      if (immediate) saveNow();
      else timer = setTimeout(saveNow, debounceMs);
    }
  }

  function clearDraft() {
    cancelTimer();
    try {
      storage().removeItem(DRAFT_STORAGE_KEY);
      snapshot = { ...serverSnapshot, draft: createDraft(), hydrated: true };
      emit();
      return true;
    } catch {
      snapshot = {
        ...snapshot,
        saveState: "failed",
        message:
          "Draf tidak berhasil dihapus dari penyimpanan tab. Coba ulang sebelum meninggalkan perangkat bersama.",
      };
      emit();
      return false;
    }
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    hydrate();
    return () => {
      listeners.delete(listener);
    };
  }
  return {
    getSnapshot: () => snapshot,
    getServerSnapshot: () => serverSnapshot,
    hydrate,
    subscribe,
    update,
    saveNow,
    clearDraft,
  };
}
