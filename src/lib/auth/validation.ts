export type SignUpValues = {
  email: string;
  password: string;
  consent: boolean;
};
export type SignInValues = { email: string; password: string };
export type AuthFieldErrors = Partial<
  Record<"email" | "password" | "consent", string>
>;

export function isValidEmail(value: string) {
  const email = value.trim();
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function passwordRules(value: string) {
  return {
    length: value.length >= 8,
    combination: /[a-zA-Z]/.test(value) && /[0-9]/.test(value),
    commonPattern: value.length > 0 && !/(password|qwerty|1234)/i.test(value),
  };
}

export function validateSignIn(values: SignInValues): AuthFieldErrors {
  const errors: AuthFieldErrors = {};
  if (!values.email.trim()) errors.email = "Masukkan email akunmu.";
  else if (!isValidEmail(values.email))
    errors.email = "Periksa lagi penulisan emailmu.";
  if (!values.password) errors.password = "Masukkan kata sandimu.";
  return errors;
}

export function validateSignUp(values: SignUpValues): AuthFieldErrors {
  const errors = validateSignIn(values);
  const rules = passwordRules(values.password);
  if (values.password && (!rules.length || !rules.combination)) {
    errors.password =
      "Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.";
  }
  if (!values.consent)
    errors.consent =
      "Tinjau dan setujui penjelasan pemrosesan data terlebih dahulu.";
  return errors;
}
