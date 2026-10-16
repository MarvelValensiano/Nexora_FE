"use client";

import { useSyncExternalStore } from "react";
import { createEmptyDraft, restoreDraft } from "./domain";
import { createDraftStore } from "./draft-store";

const store = createDraftStore({
  storage: () => window.sessionStorage,
  createDraft: createEmptyDraft,
  restore: restoreDraft,
});

function subscribe(listener: () => void) {
  const unsubscribe = store.subscribe(listener);
  const flush = () => {
    if (store.getSnapshot().saveState === "pending") store.saveNow();
  };
  window.addEventListener("pagehide", flush);
  return () => {
    flush();
    unsubscribe();
    window.removeEventListener("pagehide", flush);
  };
}

export function useOnboardingDraft() {
  const snapshot = useSyncExternalStore(
    subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  return {
    ...snapshot,
    update: store.update,
    saveNow: store.saveNow,
    clearDraft: store.clearDraft,
  };
}
