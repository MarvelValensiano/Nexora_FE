import { Suspense } from "react";
import { CatalogPage } from "@/components/workspace/catalog-page";
import { parseCatalogFilters, catalogHref } from "@/lib/workspace/exploration";

export const metadata = { title: "Jelajah Program Studi" };

async function RequestedCatalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const filters = parseCatalogFilters(params);
  return <CatalogPage key={catalogHref(filters)} initial={filters} />;
}

export default function Catalog({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <div role="status" className="rounded-2xl bg-white p-6 text-secondary">
          Menyiapkan katalog program studi...
        </div>
      }
    >
      <RequestedCatalog searchParams={searchParams} />
    </Suspense>
  );
}
