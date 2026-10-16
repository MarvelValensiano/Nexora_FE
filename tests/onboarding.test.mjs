import assert from "node:assert/strict";
import test from "node:test";
import {
  CONSENT_VERSION,
  createEmptyDraft,
  parseBudget,
  validateContext,
  validatePreferences,
  isValidAcademic,
  summarizeInterests,
  updateAnswer,
  upsertAcademic,
  restoreDraft,
} from "../src/lib/onboarding/domain.ts";

test("draf baru tidak mengasumsikan consent, profil, nilai, atau minat", () => {
  const draft = createEmptyDraft();
  assert.equal(draft.consent, null);
  assert.equal(draft.context.nickname, "");
  assert.deepEqual(draft.academicRecords, []);
  assert.deepEqual(draft.answers, {});
  assert.equal(parseBudget(draft.preferences.budgetMax), null);
  assert.equal(summarizeInterests(draft.answers).sufficient, false);
});

test("anggaran kosong berbeda dari nol; satuan rupiah diparsing konsisten", () => {
  assert.equal(parseBudget(""), null);
  assert.equal(parseBudget("  "), null);
  assert.equal(parseBudget("0"), 0);
  assert.equal(parseBudget("2.800.000"), 2800000);
  assert.equal(parseBudget("2800000"), 2800000);
  for (const value of [
    "-1",
    "2,8",
    "2.8",
    "Rp 1000",
    "1e6",
    "999999999999999999999",
  ])
    assert.equal(parseBudget(value), "invalid");
});

test("preferensi opsional tetap memvalidasi rentang bila diisi", () => {
  const preferences = createEmptyDraft().preferences;
  assert.deepEqual(validatePreferences(preferences), {});
  assert.ok(
    validatePreferences({
      ...preferences,
      budgetMin: "3.000.000",
      budgetMax: "2.000.000",
    }).budgetMax,
  );
  assert.ok(
    validatePreferences({ ...preferences, upfrontMax: "-5" }).upfrontMax,
  );
  assert.ok(
    validatePreferences({ ...preferences, relocation: "selected" }).regions,
  );
  assert.deepEqual(
    validatePreferences({
      ...preferences,
      relocation: "selected",
      regions: ["Jawa Barat"],
      budgetMin: "0",
      budgetMax: "0",
    }),
    {},
  );
});

test("konteks minimum perlu nama, kelas, dan tahun; nama tidak harus resmi", () => {
  assert.deepEqual(
    validateContext({
      nickname: "  Nia  ",
      grade: "other",
      graduationYear: "2027",
    }),
    {},
  );
  assert.ok(
    validateContext({ nickname: " ", grade: "", graduationYear: "" }).nickname,
  );
  assert.ok(
    validateContext({
      nickname: "a".repeat(31),
      grade: "XI",
      graduationYear: "2027",
    }).nickname,
  );
  assert.ok(
    validateContext({ nickname: "Nia", grade: "XI", graduationYear: "2027.5" })
      .graduationYear,
  );
});

test("nilai menghormati skala, nol, dan status unknown tanpa konversi", () => {
  const record = {
    subject: "Matematika Umum",
    semester: 1,
    scale: "100",
    value: "0",
    status: "provided",
  };
  assert.equal(isValidAcademic(record), true);
  assert.equal(isValidAcademic({ ...record, value: "101" }), false);
  assert.equal(isValidAcademic({ ...record, scale: "4", value: "3,75" }), true);
  assert.equal(isValidAcademic({ ...record, scale: "4", value: "85" }), false);
  assert.equal(
    isValidAcademic({ ...record, scale: "letter", value: "B" }),
    true,
  );
  assert.equal(
    isValidAcademic({ ...record, scale: "letter", value: "F" }),
    false,
  );
  assert.equal(
    isValidAcademic({ ...record, value: "", status: "unknown" }),
    true,
  );
});

test("mengubah skala tidak menafsirkan ulang nilai lama", () => {
  let draft = upsertAcademic(createEmptyDraft(), "Matematika Umum", {
    value: "85",
  });
  const original = draft;
  draft = { ...draft, academicScale: "4" };
  draft = upsertAcademic(draft, "Matematika Umum", { value: "86" });
  assert.equal(draft.academicRecords[0].scale, "100");
  assert.equal(original.academicRecords[0].value, "85");
  draft = upsertAcademic(draft, "Matematika Umum", { value: "" });
  draft = upsertAcademic(draft, "Matematika Umum", { value: "3.5" });
  assert.equal(draft.academicRecords[0].scale, "4");
  draft = upsertAcademic({ ...draft, academicSemester: 2 }, "Matematika Umum", {
    value: "3.8",
  });
  assert.equal(draft.academicRecords.length, 2);
  assert.equal(draft.academicRecords[0].semester, 1);
});

test("Belum tahu dan Lewati tidak menjadi skor nol atau dimensi lengkap", () => {
  const summary = summarizeInterests({
    "logic-1": "unknown",
    "logic-2": "skipped",
    "logic-3": 5,
  });
  assert.equal(summary.reviewed, 3);
  assert.equal(summary.answered, 1);
  assert.equal(summary.dimensions[0].available, false);
  assert.equal(summary.dimensions[0].evidence[0].value, 5);
  assert.equal(summary.sufficient, false);
});

test("personalisasi memerlukan dua jawaban pada sedikitnya tiga dimensi", () => {
  const answers = {
    "logic-1": 4,
    "logic-2": 5,
    "logic-3": 3,
    "process-1": 4,
    "process-2": 3,
    "process-3": 2,
  };
  assert.equal(summarizeInterests(answers).sufficient, false);
  const summary = summarizeInterests({
    ...answers,
    "visual-1": 1,
    "visual-2": 2,
  });
  assert.equal(summary.sufficient, true);
  assert.equal(summary.availableDimensions, 3);
  assert.equal(summary.dimensions[2].liked, 0);
  assert.equal(summary.dimensions[3].answered, 0);
});

test("revisi jawaban menaikkan versi tanpa mengubah draf sebelumnya", () => {
  const first = updateAnswer(createEmptyDraft(), "logic-1", 4);
  const revised = updateAnswer(first, "logic-1", "unknown");
  assert.equal(first.answers["logic-1"], 4);
  assert.equal(revised.answerVersion, first.answerVersion + 1);
  assert.equal(updateAnswer(revised, "logic-1", "unknown"), revised);
  assert.equal(updateAnswer(first, "foreign-question", 5), first);
});

test("pemulihan draf memeriksa versi, consent, enum, dan duplikasi nilai", () => {
  const draft = {
    ...createEmptyDraft(),
    consent: {
      version: CONSENT_VERSION,
      acceptedAt: "2026-10-16T08:00:00.000Z",
    },
    context: { nickname: "Nia", grade: "XI", graduationYear: "2027" },
    step: "interests",
  };
  assert.deepEqual(restoreDraft(JSON.parse(JSON.stringify(draft))), draft);
  assert.equal(restoreDraft({ ...draft, schemaVersion: 2 }), null);
  assert.equal(restoreDraft({ ...draft, consent: null }), null);
  assert.equal(restoreDraft({ ...draft, answers: { "logic-1": 0 } }), null);
  assert.equal(restoreDraft({ ...draft, academicSemester: 7 }), null);
  assert.equal(
    restoreDraft({
      ...draft,
      preferences: { ...draft.preferences, regions: ["Wilayah rekaan"] },
    }),
    null,
  );
  const withRecord = upsertAcademic(
    { ...draft, step: "academics" },
    "Matematika Umum",
    { value: "85" },
  );
  assert.equal(
    restoreDraft({
      ...withRecord,
      academicRecords: [
        ...withRecord.academicRecords,
        ...withRecord.academicRecords,
      ],
    }),
    null,
  );
});
