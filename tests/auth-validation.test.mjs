import assert from "node:assert/strict";
import test from "node:test";
import {
  isValidEmail,
  passwordRules,
  validateSignIn,
  validateSignUp,
} from "../src/lib/auth/validation.ts";

test("email sekolah dan pribadi diterima tanpa batas domain sekolah", () => {
  for (const email of [
    "siswa@sekolah.sch.id",
    "nama@gmail.com",
    "nama+belajar@contoh.id",
    "  siswa@contoh.id  ",
  ])
    assert.equal(isValidEmail(email), true);
});

test("email kosong, tidak lengkap, dan terlalu panjang ditolak", () => {
  for (const email of [
    "",
    " ",
    "budi@sekolah",
    "nama@@contoh.id",
    "nama siswa@contoh.id",
    "@contoh.id",
    "a".repeat(250) + "@contoh.id",
  ])
    assert.equal(isValidEmail(email), false);
});

test("login tidak menerapkan aturan password baru pada akun yang sudah ada", () => {
  assert.deepEqual(
    validateSignIn({ email: "siswa@contoh.id", password: "legacy" }),
    {},
  );
  assert.equal(
    validateSignIn({ email: "siswa@contoh.id", password: "" }).password,
    "Masukkan kata sandimu.",
  );
});

test("signup memvalidasi batas panjang dan kombinasi huruf angka", () => {
  for (const password of ["abc1234", "abcdefgh", "12345678"])
    assert.ok(
      validateSignUp({ email: "siswa@contoh.id", password, consent: true })
        .password,
    );
  assert.deepEqual(
    validateSignUp({
      email: "siswa@contoh.id",
      password: "Belajar9",
      consent: true,
    }),
    {},
  );
});

test("signup memerlukan persetujuan aktif dan tidak mengubah nilai input", () => {
  const values = Object.freeze({
    email: "  siswa@contoh.id  ",
    password: "Belajar9",
    consent: false,
  });
  const errors = validateSignUp(values);
  assert.ok(errors.consent);
  assert.equal(errors.email, undefined);
  assert.equal(values.email, "  siswa@contoh.id  ");
});

test("pola umum merupakan saran yang terpisah dari syarat signup", () => {
  assert.equal(passwordRules("Belajar9").commonPattern, true);
  assert.equal(passwordRules("password9").commonPattern, false);
  assert.deepEqual(
    validateSignUp({
      email: "siswa@contoh.id",
      password: "password9",
      consent: true,
    }),
    {},
  );
});
