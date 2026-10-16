import assert from "node:assert/strict";
import test from "node:test";
import {
  CONSENT_VERSION,
  createEmptyDraft,
  restoreDraft,
} from "../src/lib/onboarding/domain.ts";
import {
  createDraftStore,
  DRAFT_STORAGE_KEY,
} from "../src/lib/onboarding/draft-store.ts";

const now = () => "2026-10-16T08:00:00.000Z";

test("autosave tertunda tidak membuat kembali draf yang sudah dihapus", async () => {
  const { options, data } = harness();
  const store = createDraftStore({ ...options, debounceMs: 1 });
  store.hydrate();
  store.update(accept);
  assert.equal(store.getSnapshot().saveState, "pending");
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.equal(store.getSnapshot().saveState, "saved");
  store.update((draft) => ({
    ...draft,
    context: { ...draft.context, nickname: "Nia" },
  }));
  assert.equal(store.clearDraft(), true);
  await new Promise((resolve) => setTimeout(resolve, 15));
  assert.equal(data.has(DRAFT_STORAGE_KEY), false);
  assert.equal(store.getSnapshot().draft.consent, null);
});
function harness() {
  const data = new Map();
  let failWrite = false,
    failRemove = false;
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      if (failWrite) throw new Error("quota");
      data.set(key, value);
    },
    removeItem: (key) => {
      if (failRemove) throw new Error("blocked");
      data.delete(key);
    },
  };
  const options = {
    storage: () => storage,
    createDraft: createEmptyDraft,
    restore: restoreDraft,
    now,
  };
  return {
    data,
    options,
    store: createDraftStore(options),
    setFailWrite: (value) => {
      failWrite = value;
    },
    setFailRemove: (value) => {
      failRemove = value;
    },
  };
}
function accept(draft) {
  return {
    ...draft,
    consent: { version: CONSENT_VERSION, acceptedAt: now() },
    step: "context",
  };
}

test("penyimpanan tidak berjalan sebelum persetujuan", () => {
  const { store, data } = harness();
  store.hydrate();
  store.update(
    (draft) => ({ ...draft, context: { ...draft.context, nickname: "Nia" } }),
    true,
  );
  assert.equal(store.saveNow(), false);
  assert.equal(data.size, 0);
  assert.equal(store.getSnapshot().saveState, "idle");
});

test("simpan setelah consent dan restore mempertahankan langkah serta isian", () => {
  const { store, data, options } = harness();
  store.hydrate();
  store.update(accept, true);
  store.update(
    (draft) => ({
      ...draft,
      context: { nickname: "Nia", grade: "XI", graduationYear: "2027" },
      step: "preferences",
    }),
    true,
  );
  assert.equal(store.getSnapshot().saveState, "saved");
  assert.equal(store.getSnapshot().savedAt, now());
  assert.ok(data.has(DRAFT_STORAGE_KEY));
  const restored = createDraftStore(options);
  restored.hydrate();
  assert.equal(restored.getSnapshot().draft.step, "preferences");
  assert.equal(restored.getSnapshot().draft.context.nickname, "Nia");
});

test("quota gagal tidak diberi label tersimpan dan isian tetap tersedia untuk retry", () => {
  const { store, setFailWrite } = harness();
  store.hydrate();
  setFailWrite(true);
  store.update(
    (draft) => ({
      ...accept(draft),
      context: { ...draft.context, nickname: "Nia" },
    }),
    true,
  );
  assert.equal(store.getSnapshot().saveState, "failed");
  assert.equal(store.getSnapshot().savedAt, null);
  assert.equal(store.getSnapshot().draft.context.nickname, "Nia");
  setFailWrite(false);
  assert.equal(store.saveNow(), true);
  assert.equal(store.getSnapshot().saveState, "saved");
});

test("draf korup ditolak tanpa menghapus data tersimpan secara diam-diam", () => {
  const { store, data } = harness();
  data.set(DRAFT_STORAGE_KEY, "{broken json");
  store.hydrate();
  assert.equal(store.getSnapshot().saveState, "failed");
  assert.equal(store.getSnapshot().draft.consent, null);
  assert.equal(data.get(DRAFT_STORAGE_KEY), "{broken json");
});

test("hapus draf hanya menyentuh namespace onboarding dan gagal hapus dilaporkan", () => {
  const { store, data, setFailRemove } = harness();
  store.hydrate();
  store.update(accept, true);
  data.set("unrelated-demo", "retained");
  setFailRemove(true);
  assert.equal(store.clearDraft(), false);
  assert.equal(store.getSnapshot().saveState, "failed");
  assert.ok(store.getSnapshot().draft.consent);
  setFailRemove(false);
  assert.equal(store.clearDraft(), true);
  assert.equal(store.getSnapshot().draft.step, "consent");
  assert.equal(store.getSnapshot().draft.consent, null);
  assert.equal(data.has(DRAFT_STORAGE_KEY), false);
  assert.equal(data.get("unrelated-demo"), "retained");
});
