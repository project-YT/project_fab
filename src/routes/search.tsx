import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useProducts } from "@/lib/data-hooks";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [
      { title: "Search — Aurelle" },
      { name: "description", content: "Search Aurelle for dresses, tops, accessories, and more." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const { data } = useProducts();
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return data.filter((p) =>
      p.name.toLowerCase().includes(s) ||
      p.categoryName?.toLowerCase().includes(s) ||
      p.brandName?.toLowerCase().includes(s) ||
      p.description?.toLowerCase().includes(s),
    );
  }, [q, data]);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 pt-10 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl">Search</h1>
        <div className="relative mt-6">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search dresses, tops, brands…" className="w-full rounded-full border border-border bg-card py-4 pl-11 pr-4 text-sm outline-none focus:border-primary" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {results.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {q && results.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-border py-24 text-center text-muted-foreground">No matches for "{q}".</div>
        )}
      </div>
    </SiteLayout>
  );
}