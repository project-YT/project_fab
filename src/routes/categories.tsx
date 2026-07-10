import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useCategories } from "@/lib/data-hooks";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Aurelle" },
      { name: "description", content: "Browse all Aurelle women's fashion categories." },
      { property: "og:title", content: "Categories — Aurelle" },
      { property: "og:url", content: "/categories" },
    ],
    links: [{ rel: "canonical", href: "/categories" }],
  }),
  component: Categories,
});

function Categories() {
  const { data: categories } = useCategories();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Explore</div>
          <h1 className="font-display text-4xl sm:text-5xl">Categories</h1>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {categories.map((c) => (
            <Link key={c.id} to="/categories/$slug" params={{ slug: c.slug }} className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
              {c.image && <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-display text-2xl text-background">{c.name}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-background/80">Shop now →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}