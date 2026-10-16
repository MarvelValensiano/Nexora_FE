import { Suspense } from "react";
import { RecommendationsPage } from "@/components/workspace/recommendations-page";

export const metadata = { title: "Rekomendasi & Pilihan Tersemat" };
async function RequestedRecommendations({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  const { tab } = await searchParams;
  return <RecommendationsPage pinned={tab === "tersemat"} />;
}
export default function Recommendations({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string | string[] }>;
}) {
  return (
    <Suspense fallback={<p role="status">Menyiapkan eksplorasi studi...</p>}>
      <RequestedRecommendations searchParams={searchParams} />
    </Suspense>
  );
}
