import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useCategories, useProducts } from "@/lib/data-hooks";

export const Route = createFileRoute("/categories/$slug")({
  component: CategoryPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Aurelle` },
      { property: "og:url", content: `/categories/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `/categories/${params.slug}` }],
  }),
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: categories } = useCategories();
  const { data: products } = useProducts();
  const category = categories.find((c) => c.slug === slug);
  const items = products.filter((p) => p.categoryId === category?.id);
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <Link to="/categories" className="text-xs uppercase tracking-widest text-muted-foreground">← All categories</Link>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{category?.name ?? "Category"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{items.length} pieces</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
        {items.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-border py-24 text-center text-muted-foreground">Nothing here yet — new pieces landing soon.</div>
        )}
      </div>
    </SiteLayout>
  );
}