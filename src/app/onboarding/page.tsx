import { OnboardingFlow } from "@/components/onboarding/onboarding-flow";

export const metadata = {
  title: "Onboarding Siswa",
  robots: { index: false, follow: true },
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
