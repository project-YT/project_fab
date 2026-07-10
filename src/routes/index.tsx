import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Truck, ShieldCheck, RefreshCw, Sparkles } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useBanners, useCategories, useProducts } from "@/lib/data-hooks";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const { data: banners } = useBanners();
  const banner = banners[0];
  const featured = products.filter((p) => p.featured).slice(0, 8);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 8);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary/60 px-3 py-1 text-[11px] uppercase tracking-widest text-secondary-foreground">
              <Sparkles className="h-3 w-3" /> Spring 2026 Edit
            </div>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Softly spoken,
              <br />
              <span className="italic text-primary">effortlessly worn.</span>
            </h1>
            <p className="mt-5 max-w-md text-base text-muted-foreground">
              {banner?.subtitle ??
                "Discover breathable weaves, sky-lit hues, and considered silhouettes designed for the modern everyday."}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition hover:opacity-90"
              >
                Shop the edit
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-medium hover:bg-muted"
              >
                Browse categories
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="gradient-hero absolute inset-0 -z-10 rounded-[2.5rem] blur-3xl opacity-70" />
            <div className="relative overflow-hidden rounded-[2rem] shadow-elevated">
              <img
                src={
                  banner?.image ??
                  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=1200&q=80"
                }
                alt="Editorial hero"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-6 hidden gap-2 rounded-2xl bg-background/90 p-4 shadow-soft backdrop-blur md:flex">
              <div className="h-10 w-10 rounded-full bg-primary" />
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Now trending</div>
                <div className="text-sm font-medium">Sky Linen Collection</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* USP STRIP */}
      <section className="border-y border-border/60 bg-muted/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { icon: Truck, label: "Free shipping over ₹1499" },
            { icon: RefreshCw, label: "Easy 7-day returns" },
            { icon: ShieldCheck, label: "Secure checkout" },
            { icon: Sparkles, label: "Ethically crafted" },
          ].map((u) => (
            <div key={u.label} className="flex items-center gap-3">
              <u.icon className="h-4 w-4 text-primary" />
              <span className="text-xs text-foreground/80 sm:text-sm">{u.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Explore</div>
            <h2 className="font-display text-3xl sm:text-4xl">Shop by category</h2>
          </div>
          <Link to="/categories" className="text-sm story-link">View all</Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/categories/$slug"
              params={{ slug: c.slug }}
              className="group relative aspect-square overflow-hidden rounded-3xl bg-muted"
            >
              {c.image && (
                <img
                  src={c.image}
                  alt={c.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 text-sm font-medium text-background">
                {c.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Just in</div>
              <h2 className="font-display text-3xl sm:text-4xl">New arrivals</h2>
            </div>
            <Link to="/shop" className="text-sm story-link">Shop all</Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* EDITORIAL BANNER */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="gradient-soft relative overflow-hidden rounded-[2rem] px-6 py-14 sm:px-12 sm:py-20">
          <div className="relative z-10 max-w-xl">
            <div className="text-xs uppercase tracking-widest text-secondary-foreground/80">Aurelle Atelier</div>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl">
              Considered pieces,<br />worn on repeat.
            </h2>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              Each capsule is designed in small batches, in natural fibres, with care for the hands that make them.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3 text-sm text-background"
            >
              Our story <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 right-10 h-72 w-72 rounded-full bg-secondary/50 blur-3xl" />
        </div>
      </section>

      {/* FEATURED */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Editors' picks</div>
              <h2 className="font-display text-3xl sm:text-4xl">Featured</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
