import type { WorkspaceState } from "./domain";

type StoragePort = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export const WORKSPACE_KEY = "nexalora:workspace:preview:v1";
type Snapshot = {
  state: WorkspaceState;
  hydrated: boolean;
  error: string;
  saved: boolean;
  today: string;
};

export function createWorkspaceStore(options: {
  create: () => WorkspaceState;
  restore: (value: unknown) => WorkspaceState | null;
  storage: () => StoragePort;
  today: () => string;
}) {
  const serverSnapshot: Snapshot = {
    state: options.create(),
    hydrated: false,
    error: "",
    saved: false,
    today: "2026-10-16",
  };
  let snapshot = serverSnapshot;
  const listeners = new Set<() => void>();
  const emit = () => listeners.forEach((listener) => listener());
  function hydrate() {
    if (snapshot.hydrated) return;
    try {
      const raw = options.storage().getItem(WORKSPACE_KEY);
      const state = raw ? options.restore(JSON.parse(raw)) : options.create();
      if (!state) throw new Error("Invalid workspace draft");
      snapshot = {
        state,
        hydrated: true,
        saved: Boolean(raw),
        error: "",
        today: options.today(),
      };
    } catch {
      snapshot = {
        ...serverSnapshot,
        hydrated: true,
        today: options.today(),
        error:
          "Pilihan tab sebelumnya tidak dapat dipulihkan. Pilihan baru tetap bisa dicoba tanpa mengubah draf onboarding.",
      };
    }
    emit();
  }
  function persist() {
    try {
      options.storage().setItem(WORKSPACE_KEY, JSON.stringify(snapshot.state));
      snapshot = { ...snapshot, saved: true, error: "" };
      emit();
      return true;
    } catch {
      snapshot = {
        ...snapshot,
        saved: false,
        error:
          "Pilihan belum tersimpan di tab. Perubahan tetap ada selama halaman terbuka; coba simpan ulang.",
      };
      emit();
      return false;
    }
  }
  function update(updater: (state: WorkspaceState) => WorkspaceState) {
    if (!snapshot.hydrated) return;
    snapshot = { ...snapshot, state: updater(snapshot.state), saved: false };
    persist();
  }
  function reset() {
    try {
      options.storage().removeItem(WORKSPACE_KEY);
      snapshot = { ...serverSnapshot, hydrated: true, today: options.today() };
      emit();
      return true;
    } catch {
      snapshot = {
        ...snapshot,
        error: "Pilihan tab tidak berhasil dihapus. Coba kembali.",
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
    subscribe,
    update,
    persist,
    reset,
  };
}
