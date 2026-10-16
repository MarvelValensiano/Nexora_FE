import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ProgramDetailPage } from "@/components/workspace/program-detail-page";
import { programs } from "@/lib/workspace/domain";
import { parseDetailTab, safeReturnTo } from "@/lib/workspace/exploration";

export const metadata = { title: "Detail Program Studi" };
export function generateStaticParams() {
  return programs.map((program) => ({ id: program.id }));
}
async function RequestedProgram({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string | string[]; from?: string | string[] }>;
}) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const program = programs.find((item) => item.id === id);
  if (!program) notFound();
  return (
    <ProgramDetailPage
      program={program}
      tab={parseDetailTab(query.tab)}
      returnTo={safeReturnTo(query.from)}
    />
  );
}
export default function ProgramDetail(props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ tab?: string | string[]; from?: string | string[] }>;
}) {
  return (
    <Suspense
      fallback={<p role="status">Menyiapkan detail program studi...</p>}
    >
      <RequestedProgram {...props} />
    </Suspense>
  );
}
