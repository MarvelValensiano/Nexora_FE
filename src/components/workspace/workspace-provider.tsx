"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { summarizeInterests } from "@/lib/onboarding/domain";
import { useOnboardingDraft } from "@/lib/onboarding/store";
import {
  createWorkspaceState,
  deriveProfile,
  restoreWorkspace,
  toggleComparison,
  togglePinned,
} from "@/lib/workspace/domain";
import { createWorkspaceStore } from "@/lib/workspace/preview-store";
import {
  WorkspaceContext,
  type WorkspaceContextValue,
  type WorkspacePanel,
} from "./workspace-context";
import { WorkspaceDialogs } from "./workspace-dialogs";
import { EvidenceDrawer } from "./evidence-drawer";

const store = createWorkspaceStore({
  create: createWorkspaceState,
  restore: restoreWorkspace,
  storage: () => window.sessionStorage,
  today: () => {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).formatToParts(new Date());
    return ["year", "month", "day"]
      .map((type) => parts.find((part) => part.type === type)!.value)
      .join("-");
  },
});

export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const workspace = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getServerSnapshot,
  );
  const onboarding = useOnboardingDraft();
  const [panel, setPanel] = useState<WorkspacePanel>(null);
  const [toast, setToast] = useState("");
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(timer);
  }, [toast]);
  const interests = summarizeInterests(onboarding.draft.answers);
  const profile = deriveProfile(
    onboarding.draft,
    workspace.state.mode,
    interests.sufficient,
  );
  const selection = workspace.state.selections[profile.key];

  const value: WorkspaceContextValue = {
    ...workspace,
    profile,
    draft: onboarding.draft,
    interests,
    selection,
    panel,
    setPanel,
    hydrated: workspace.hydrated && onboarding.hydrated,
    setMode: (mode) => {
      store.update((state) => ({ ...state, mode }));
      setPanel(null);
    },
    toggleSaved: (id) => {
      const result = togglePinned(selection.savedIds, id);
      if (result.error) {
        setToast(result.error);
        return;
      }
      const removing = selection.savedIds.includes(id);
      store.update((state) => ({
        ...state,
        selections: {
          ...state.selections,
          [profile.key]: {
            ...state.selections[profile.key],
            savedIds: result.ids,
          },
        },
      }));
      setToast(
        removing
          ? "Pilihan dilepas dari daftar simpan pada tab ini."
          : "Pilihan ditambahkan ke daftar simpan pada tab ini.",
      );
    },
    toggleCompare: (id) => {
      const result = toggleComparison(selection.compareIds, id);
      if (result.error) {
        setToast(result.error);
        return;
      }
      store.update((state) => ({
        ...state,
        selections: {
          ...state.selections,
          [profile.key]: {
            ...state.selections[profile.key],
            compareIds: result.ids,
          },
        },
      }));
    },
    update: store.update,
    retrySave: store.persist,
    reset: store.reset,
    notify: setToast,
  };
  return (
    <WorkspaceContext.Provider value={value}>
      {children}
      <WorkspaceDialogs />
      <EvidenceDrawer />
      <div
        role="status"
        aria-live="polite"
        className={
          toast
            ? "fixed inset-x-4 bottom-36 z-[60] mx-auto w-fit max-w-lg rounded-xl bg-text-primary px-5 py-3 text-caption-meta text-white shadow-lg xl:bottom-24"
            : "sr-only"
        }
      >
        {toast}
      </div>
    </WorkspaceContext.Provider>
  );
}
