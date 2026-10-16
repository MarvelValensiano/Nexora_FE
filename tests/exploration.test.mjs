import assert from "node:assert/strict";
import test from "node:test";
import { summarizeInterests } from "../src/lib/onboarding/domain.ts";
import {
  createWorkspaceState,
  getExploration,
  restoreWorkspace,
  programs,
  togglePinned,
  selectExampleVersion,
  updateAidReference,
  initialFilters,
} from "../src/lib/workspace/domain.ts";
import {
  catalogHref,
  parseCatalogFilters,
  safeReturnTo,
  programHref,
  parseDetailTab,
  versionPrograms,
  exampleVersions,
  evidenceFor,
  semesterOne,
} from "../src/lib/workspace/exploration.ts";
import {
  createWorkspaceStore,
  WORKSPACE_KEY,
} from "../src/lib/workspace/preview-store.ts";

test("sematan dibatasi lima, tetapi pilihan keenam lama tetap bisa dilepas", () => {
  const ids = programs.slice(0, 5).map((program) => program.id);
  const blocked = togglePinned(ids, programs[5].id);
  assert.equal(blocked.ids, ids);
  assert.ok(blocked.error);
  assert.equal(togglePinned(ids, ids[0]).ids.length, 4);
  const legacy = programs.map((program) => program.id);
  assert.equal(togglePinned(legacy, legacy[0]).ids.length, 5);
  const state = createWorkspaceState();
  state.selections.dimas.savedIds = legacy;
  assert.deepEqual(restoreWorkspace(state).selections.dimas.savedIds, legacy);
});

test("sematan bukan komparasi dan tidak menerima ID asing atau duplikasi", () => {
  const state = createWorkspaceState();
  assert.deepEqual(togglePinned([], "foreign").ids, []);
  assert.ok(togglePinned([], "foreign").error);
  const saved = togglePinned(state.selections.dimas.savedIds, "dkv-c").ids;
  assert.ok(saved.includes("dkv-c"));
  assert.ok(!state.selections.dimas.compareIds.includes("dkv-c"));
  assert.equal(togglePinned(saved, "dkv-c").ids.includes("dkv-c"), false);
});

test("susunan contoh berubah hanya untuk Dimas dan tidak mengubah sematan atau tugas", () => {
  const state = createWorkspaceState();
  const next = selectExampleVersion(state, "dimas", 1);
  assert.equal(getExploration(next).exampleVersion, 1);
  assert.equal(getExploration(state).exampleVersion, 2);
  assert.equal(next.selections, state.selections);
  assert.equal(next.tasks, state.tasks);
  assert.equal(selectExampleVersion(state, "draft", 3), state);
  assert.equal(selectExampleVersion(state, "rani", 3), state);
  assert.equal(selectExampleVersion(state, "dimas", 99), state);
});

test("draf workspace lama tetap dapat dipulihkan tanpa ekstensi baru", () => {
  const state = createWorkspaceState();
  assert.equal(state.exploration, undefined);
  assert.deepEqual(restoreWorkspace(JSON.parse(JSON.stringify(state))), state);
  const extension = getExploration(state);
  extension.aid.rani.saved = true;
  assert.equal(getExploration(createWorkspaceState()).aid.rani.saved, false);
  assert.notEqual(extension.aid.dimas, extension.aid.draft);
});

test("referensi bantuan dan tugas terpisah untuk setiap profil serta idempoten", () => {
  const state = createWorkspaceState();
  const once = updateAidReference(state, "draft", { saved: true, task: true });
  const twice = updateAidReference(once, "draft", { task: true });
  assert.deepEqual(getExploration(once), getExploration(twice));
  assert.deepEqual(getExploration(twice).aid.draft, {
    saved: true,
    task: true,
    done: false,
  });
  assert.deepEqual(getExploration(twice).aid.dimas, {
    saved: false,
    task: false,
    done: false,
  });
  assert.deepEqual(getExploration(twice).aid.rani, {
    saved: false,
    task: false,
    done: false,
  });
  assert.equal(twice.tasks, state.tasks);
  assert.equal(twice.selections, state.selections);
  assert.deepEqual(restoreWorkspace(JSON.parse(JSON.stringify(twice))), twice);
});

test("status selesai memerlukan tugas, melepas referensi tidak menghapus tugas", () => {
  const state = createWorkspaceState();
  assert.equal(
    getExploration(updateAidReference(state, "rani", { done: true })).aid.rani
      .done,
    false,
  );
  let next = updateAidReference(state, "rani", { saved: true, task: true });
  next = updateAidReference(next, "rani", { done: true, saved: false });
  assert.deepEqual(getExploration(next).aid.rani, {
    saved: false,
    task: true,
    done: true,
  });
});

test("pemulihan menolak ekstensi rusak dan status selesai tanpa tugas", () => {
  const state = createWorkspaceState();
  const extension = getExploration(state);
  for (const invalid of [
    null,
    {},
    { ...extension, exampleVersion: 4 },
    { ...extension, aid: {} },
    {
      ...extension,
      aid: {
        ...extension.aid,
        dimas: { saved: false, task: false, done: true },
      },
    },
    {
      ...extension,
      aid: {
        ...extension.aid,
        draft: { saved: "yes", task: false, done: false },
      },
    },
  ]) {
    assert.equal(restoreWorkspace({ ...state, exploration: invalid }), null);
  }
});

test("filter katalog pulih utuh dari URL, termasuk anggaran dan urutan", () => {
  const filters = {
    query: "Teknik & proses",
    field: "industry",
    city: "Kota Contoh 2",
    budget: "under20",
    sort: "cost",
    savedOnly: true,
  };
  const href = catalogHref(filters);
  const url = new URL(href, "https://preview.invalid");
  assert.deepEqual(
    parseCatalogFilters(Object.fromEntries(url.searchParams)),
    filters,
  );
  assert.equal(catalogHref(initialFilters), "/jelajah");
});

test("parser filter menolak enum dan parameter berulang serta membatasi pencarian", () => {
  assert.deepEqual(
    parseCatalogFilters({
      field: "hacked",
      city: "real city",
      budget: "free",
      sort: "score",
      saved: "true",
      q: ["a", "b"],
    }),
    initialFilters,
  );
  assert.equal(parseCatalogFilters({ q: "a".repeat(200) }).query.length, 120);
});

test("tautan kembali hanya menerima rute eksplorasi lokal yang diizinkan", () => {
  for (const value of [
    undefined,
    ["/jelajah"],
    "https://evil.test",
    "//evil.test",
    "/\\evil.test",
    "javascript:alert(1)",
    "/onboarding",
    "/prodi/x",
    "/jelajah/../masuk",
  ])
    assert.equal(safeReturnTo(value), "/jelajah");
  assert.equal(
    safeReturnTo("/rekomendasi?tab=tersemat&unsafe=1"),
    "/rekomendasi?tab=tersemat",
  );
  assert.equal(safeReturnTo("/jelajah?field=it&unsafe=1"), "/jelajah?field=it");
});

test("tautan detail mempertahankan kriteria dan tab; tab asing kembali ke ringkasan", () => {
  const back = "/jelajah?field=industry&budget=under20";
  const url = new URL(
    programHref("industri-b", back, "kurikulum"),
    "https://preview.invalid",
  );
  assert.equal(url.pathname, "/prodi/industri-b");
  assert.equal(url.searchParams.get("from"), back);
  assert.equal(url.searchParams.get("tab"), "kurikulum");
  assert.equal(parseDetailTab("bantuan"), "bantuan");
  assert.equal(parseDetailTab("karier"), "karier");
  assert.equal(parseDetailTab(["kurikulum"]), "ringkasan");
  assert.equal(parseDetailTab("invalid"), "ringkasan");
});

test("panel bukti mengambil jawaban dimensi yang sesuai, bukan unknown atau data contoh", () => {
  const summary = summarizeInterests({
    "logic-1": 4,
    "logic-2": "unknown",
    "process-1": 2,
    "visual-1": 5,
    "visual-2": "skipped",
  });
  assert.deepEqual(
    evidenceFor(programs[0], summary).map((item) => item.value),
    [4],
  );
  assert.deepEqual(
    evidenceFor(programs[1], summary).map((item) => item.value),
    [2],
  );
  assert.deepEqual(
    evidenceFor(programs[2], summary).map((item) => item.value),
    [5],
  );
  assert.deepEqual(evidenceFor(programs[0], summarizeInterests({})), []);
});

test("snapshot memakai ID katalog stabil tanpa mengurutkan ulang data global", () => {
  const before = programs.map((program) => program.id);
  for (const version of exampleVersions) {
    assert.equal(new Set(version.order).size, 3);
    assert.deepEqual(
      versionPrograms(programs, version.id).map((program) => program.id),
      version.order,
    );
  }
  assert.deepEqual(versionPrograms(programs, 0), []);
  assert.deepEqual(
    programs.map((program) => program.id),
    before,
  );
  assert.equal(semesterOne.length, 6);
  assert.equal(
    semesterOne.reduce((total, course) => total + course.credits, 0),
    19,
  );
});

test("referensi, tugas, dan contoh versi pulih dari penyimpanan tab tanpa menyentuh onboarding", () => {
  const data = new Map([["nexalora:onboarding:preview:v1", "private-draft"]]);
  const storage = {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => data.set(key, value),
    removeItem: (key) => data.delete(key),
  };
  const options = {
    create: createWorkspaceState,
    restore: restoreWorkspace,
    storage: () => storage,
    today: () => "2026-10-16",
  };
  const store = createWorkspaceStore(options);
  store.subscribe(() => {});
  store.update((state) =>
    updateAidReference(selectExampleVersion(state, "dimas", 3), "rani", {
      saved: true,
      task: true,
    }),
  );
  const reloaded = createWorkspaceStore(options);
  reloaded.subscribe(() => {});
  assert.equal(getExploration(reloaded.getSnapshot().state).exampleVersion, 3);
  assert.equal(
    getExploration(reloaded.getSnapshot().state).aid.rani.task,
    true,
  );
  assert.equal(data.get("nexalora:onboarding:preview:v1"), "private-draft");
  assert.equal(reloaded.reset(), true);
  assert.equal(data.has(WORKSPACE_KEY), false);
  assert.equal(data.get("nexalora:onboarding:preview:v1"), "private-draft");
});
