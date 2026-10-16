export type AuthRequest =
  | {
      operation: "signin";
      email: string;
      password: string;
      rememberDevice: boolean;
    }
  | {
      operation: "signup";
      email: string;
      password: string;
      consentVersion: string;
    }
  | { operation: "recovery"; email: string };

export type AuthResult =
  | { status: "unavailable"; message: string }
  | { status: "authenticated"; message: string }
  | { status: "verification_required"; message: string };

// UI integration boundary. Replace this adapter when the team's auth provider
// and API contract are ready. Credentials never enter persistent browser storage.
export async function submitAuth(request: AuthRequest): Promise<AuthResult> {
  return {
    status: "unavailable",
    message:
      request.operation === "recovery"
        ? "Layanan pemulihan belum terhubung. Email belum dikirim. Kamu bisa kembali ke halaman masuk atau mencoba mode demo."
        : "Layanan akun belum terhubung. Data form belum dikirim atau disimpan. Kamu tetap bisa mencoba mode demo tanpa membuat akun.",
  };
}
