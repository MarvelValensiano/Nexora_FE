"use client";

import { createContext, useContext } from "react";
import type {
  OnboardingDraft,
  summarizeInterests,
} from "@/lib/onboarding/domain";
import type {
  deriveProfile,
  ProfileMode,
  WorkspaceState,
} from "@/lib/workspace/domain";

export type WorkspacePanel = {
  kind:
    | "compare"
    | "evidence"
    | "history"
    | "missions"
    | "review"
    | "agenda"
    | "settings"
    | "help";
  programId?: string;
} | null;
export type WorkspaceContextValue = {
  state: WorkspaceState;
  profile: ReturnType<typeof deriveProfile>;
  draft: OnboardingDraft;
  interests: ReturnType<typeof summarizeInterests>;
  selection: WorkspaceState["selections"]["dimas"];
  hydrated: boolean;
  saved: boolean;
  error: string;
  today: string;
  panel: WorkspacePanel;
  setPanel: (panel: WorkspacePanel) => void;
  setMode: (mode: ProfileMode) => void;
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
  update: (updater: (state: WorkspaceState) => WorkspaceState) => void;
  retrySave: () => boolean;
  reset: () => boolean;
  notify: (message: string) => void;
};

export const WorkspaceContext = createContext<WorkspaceContextValue | null>(
  null,
);
export function useWorkspace() {
  const value = useContext(WorkspaceContext);
  if (!value) throw new Error("WorkspaceProvider is required");
  return value;
}
