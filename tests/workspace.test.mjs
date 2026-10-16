import assert from "node:assert/strict";
import test from "node:test";
import { createEmptyDraft } from "../src/lib/onboarding/domain.ts";
import {
  createWorkspaceState,
  restoreWorkspace,
  filterPrograms,
  initialFilters,
  programs,
  toggleComparison,
  deriveProfile,
  taskIsOverdue,
  validDate,
} from "../src/lib/workspace/domain.ts";
import {
  createWorkspaceStore,
  WORKSPACE_KEY,
} from "../src/lib/workspace/preview-store.ts";

test("katalog berisi tepat enam entri stabil dan semua tampil tanpa filter", () => {
  assert.equal(programs.length, 6);
  assert.equal(new Set(programs.map((program) => program.id)).size, 6);
  assert.deepEqual(
    filterPrograms(initialFilters).map((program) => program.id),
    programs.map((program) => program.id),
  );
});

test("pencarian mencakup prodi, kampus, dan karier dengan huruf besar atau spasi", () => {
  assert.equal(
    filterPrograms({ ...initialFilters, query: "  INFORMATIKA  " }).length,
    1,
  );
  assert.equal(
    filterPrograms({ ...initialFilters, query: "Institut Contoh B" })[0].id,
    "industri-b",
  );
  assert.ok(
    filterPrograms({
      ...initialFilters,
      query: "Penguji perangkat lunak",
    }).some((program) => program.id === "informatika-a"),
  );
});

test("filter biaya memakai batas atas rentang dan tidak menganggap unknown nol", () => {
  const result = filterPrograms({ ...initialFilters, budget: "under20" });
  assert.ok(!result.some((program) => program.id === "industri-b"));
  assert.ok(!result.some((program) => program.id === "dkv-c"));
  assert.ok(result.some((program) => program.id === "informatika-a"));
  assert.deepEqual(
    filterPrograms({ ...initialFilters, budget: "under10" }).map(
      (program) => program.id,
    ),
    ["produk-digital-c"],
  );
});

test("kombinasi filter boleh kosong tanpa mengubah filter atau memperlebar hasil", () => {
  const filters = Object.freeze({
    ...initialFilters,
    city: "Kota Contoh 3",
    budget: "under10",
  });
  assert.deepEqual(filterPrograms(filters), []);
  assert.equal(filters.city, "Kota Contoh 3");
  assert.equal(filterPrograms({ ...filters, city: "all" }).length, 1);
});

test("filter simpanan dan sortir hanya memengaruhi tampilan", () => {
  const before = programs.map((program) => program.id);
  assert.equal(
    filterPrograms({ ...initialFilters, savedOnly: true }, []).length,
    0,
  );
  assert.deepEqual(
    filterPrograms({ ...initialFilters, savedOnly: true }, ["dkv-c"]).map(
      (program) => program.id,
    ),
    ["dkv-c"],
  );
  const sorted = filterPrograms({ ...initialFilters, sort: "cost" });
  assert.equal(sorted[0].id, "produk-digital-c");
  assert.equal(sorted.at(-1).id, "dkv-c");
  assert.deepEqual(
    programs.map((program) => program.id),
    before,
  );
});

test("perbandingan maksimum tiga, tanpa duplikasi, dan tetap bisa menghapus slot", () => {
  const ids = ["informatika-a", "industri-b", "dkv-c"];
  assert.equal(toggleComparison(ids, "logistik-e").ids, ids);
  assert.ok(toggleComparison(ids, "logistik-e").error);
  assert.deepEqual(toggleComparison(ids, "industri-b").ids, [
    "informatika-a",
    "dkv-c",
  ]);
  assert.deepEqual(toggleComparison([], "informatika-a").ids, [
    "informatika-a",
  ]);
  assert.ok(toggleComparison([], "foreign-program").error);
});

test("profil parsial dan onboarding tidak menerima progres misi Dimas", () => {
  const empty = createEmptyDraft();
  const rani = deriveProfile(empty, "rani", false);
  assert.equal(rani.missions, 0);
  assert.equal(rani.hasMissionDraft, false);
  const actualDraft = {
    ...empty,
    consent: { version: "eksplorasi-1", acceptedAt: "2026-10-16T08:00:00Z" },
    context: { nickname: "Nia", grade: "XII", graduationYear: "2027" },
  };
  const profile = deriveProfile(actualDraft, "auto", false);
  assert.equal(profile.key, "draft");
  assert.equal(profile.name, "Nia");
  assert.equal(profile.missions, 0);
  assert.equal(profile.hasMissionDraft, false);
  assert.equal(deriveProfile(actualDraft, "dimas", true).name, "Dimas");
});

test("simpanan dan pembanding masing-masing profil tidak berbagi array", () => {
  const state = createWorkspaceState();
  state.selections.dimas.savedIds.push("logistik-e");
  assert.deepEqual(state.selections.rani.savedIds, []);
  assert.deepEqual(state.selections.draft.savedIds, []);
  assert.equal(state.selections.dimas.compareIds.includes("logistik-e"), false);
  assert.equal(
    createWorkspaceState().selections.dimas.savedIds.includes("logistik-e"),
    false,
  );
});

test("tanggal kalender divalidasi dan tugas selesai tidak dianggap terlambat", () => {
  assert.equal(validDate("2026-02-31"), false);
  assert.equal(validDate("2028-02-29"), true);
  const task = createWorkspaceState().tasks[0];
  assert.equal(taskIsOverdue(task, "2026-10-16"), true);
  assert.equal(taskIsOverdue({ ...task, done: true }, "2026-10-16"), false);
  assert.equal(taskIsOverdue(task, "2026-10-15"), false);
});

test("restore menolak versi, ID, tanggal, duplikasi, dan slot tidak valid", () => {
  const state = createWorkspaceState();
  assert.deepEqual(restoreWorkspace(JSON.parse(JSON.stringify(state))), state);
  assert.equal(restoreWorkspace({ ...state, version: 2 }), null);
  assert.equal(
    restoreWorkspace({
      ...state,
      selections: {
        ...state.selections,
        rani: { savedIds: [], compareIds: ["foreign"] },
      },
    }),
    null,
  );
  assert.equal(
    restoreWorkspace({
      ...state,
      selections: {
        ...state.selections,
        rani: {
          savedIds: [],
          compareIds: programs.slice(0, 4).map((program) => program.id),
        },
      },
    }),
    null,
  );
  assert.equal(
    restoreWorkspace({
      ...state,
      selections: {
        ...state.selections,
        rani: { savedIds: ["dkv-c", "dkv-c"], compareIds: [] },
      },
    }),
    null,
  );
  assert.equal(
    restoreWorkspace({
      ...state,
      tasks: state.tasks.map((task, index) =>
        index === 0 ? { ...task, dueDate: "2026-02-31" } : task,
      ),
    }),
    null,
  );
});

function harness() {
  const data = new Map();
  let fail = false;
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => {
      if (fail) throw new Error("quota");
      data.set(key, value);
    },
    removeItem: (key) => {
      if (fail) throw new Error("blocked");
      data.delete(key);
    },
  };
  const options = {
    create: createWorkspaceState,
    restore: restoreWorkspace,
    storage: () => storage,
    today: () => "2026-10-16",
  };
  return {
    data,
    store: createWorkspaceStore(options),
    options,
    setFail: (value) => {
      fail = value;
    },
  };
}

test("reload workspace memulihkan profil dan pilihan pada tab", () => {
  const { store, options } = harness();
  store.subscribe(() => {});
  store.update((state) => ({ ...state, mode: "rani" }));
  const restored = createWorkspaceStore(options);
  restored.subscribe(() => {});
  assert.equal(restored.getSnapshot().state.mode, "rani");
  assert.equal(restored.getSnapshot().saved, true);
});

test("gagal menyimpan mempertahankan state dan retry memperbaiki status", () => {
  const { store, setFail } = harness();
  store.subscribe(() => {});
  setFail(true);
  store.update((state) => ({ ...state, mode: "rani" }));
  assert.equal(store.getSnapshot().state.mode, "rani");
  assert.equal(store.getSnapshot().saved, false);
  assert.ok(store.getSnapshot().error);
  setFail(false);
  assert.equal(store.persist(), true);
  assert.equal(store.getSnapshot().saved, true);
});

test("reset workspace tidak menghapus draf onboarding dan gagal reset dilaporkan", () => {
  const { store, data, setFail } = harness();
  data.set("nexalora:onboarding:preview:v1", "private-draft");
  store.subscribe(() => {});
  store.update((state) => ({ ...state, mode: "rani" }));
  setFail(true);
  assert.equal(store.reset(), false);
  assert.equal(store.getSnapshot().state.mode, "rani");
  setFail(false);
  assert.equal(store.reset(), true);
  assert.equal(data.has(WORKSPACE_KEY), false);
  assert.equal(data.get("nexalora:onboarding:preview:v1"), "private-draft");
});
