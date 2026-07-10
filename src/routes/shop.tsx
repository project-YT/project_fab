import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCategories, useProducts } from "@/lib/data-hooks";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — Aurelle" },
      { name: "description", content: "Shop the full Aurelle collection of dresses, tops, bottoms, outerwear, and accessories." },
      { property: "og:title", content: "Shop All — Aurelle" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

function Shop() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const [cat, setCat] = useState<string>("all");
  const [sort, setSort] = useState<string>("featured");
  const [maxPrice, setMaxPrice] = useState<number>(6000);

  const filtered = useMemo(() => {
    let list = [...products];
    if (cat !== "all") list = list.filter((p) => p.categoryId === cat);
    list = list.filter((p) => p.price <= maxPrice);
    if (sort === "priceAsc") list.sort((a, b) => a.price - b.price);
    else if (sort === "priceDesc") list.sort((a, b) => b.price - a.price);
    else if (sort === "new") list = list.filter((p) => p.newArrival).concat(list.filter((p) => !p.newArrival));
    return list;
  }, [products, cat, sort, maxPrice]);

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Collection</div>
          <h1 className="font-display text-4xl sm:text-5xl">Shop all</h1>
          <p className="mt-2 text-sm text-muted-foreground">{filtered.length} pieces, curated for you.</p>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-3 rounded-2xl border border-border bg-card p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setCat("all")} className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition ${cat === "all" ? "bg-foreground text-background" : "bg-muted text-foreground/70 hover:bg-muted/70"}`}>All</button>
            {categories.map((c) => (
              <button key={c.id} onClick={() => setCat(c.id)} className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-widest transition ${cat === c.id ? "bg-foreground text-background" : "bg-muted text-foreground/70 hover:bg-muted/70"}`}>{c.name}</button>
            ))}
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              Max ₹{maxPrice}
              <input type="range" min={500} max={6000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="accent-primary" />
            </label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-full border border-border bg-background px-4 py-2 text-xs uppercase tracking-widest">
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="priceAsc">Price: low → high</option>
              <option value="priceDesc">Price: high → low</option>
            </select>
          </div>
        </div>
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border py-24 text-center text-muted-foreground">No pieces match your filters yet.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {filtered.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}