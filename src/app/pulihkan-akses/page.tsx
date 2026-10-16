import { AuthShell } from "@/components/auth/auth-shell";
import { RecoveryForm } from "@/components/auth/recovery-form";

export const metadata = {
  title: "Pemulihan Akses",
  robots: { index: false, follow: true },
};

export default function RecoveryPage() {
  return (
    <AuthShell>
      <RecoveryForm />
    </AuthShell>
  );
}
