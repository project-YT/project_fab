import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/format";
import { cldOptimized } from "@/lib/cloudinary";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [{ title: "Wishlist — Aurelle" }, { name: "robots", content: "noindex" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, toggleWish } = useStore();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-3xl border border-dashed border-border py-24">
            <Heart className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Nothing saved yet.</p>
            <Link to="/shop" className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">Discover pieces</Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((w) => (
              <div key={w.id} className="group relative overflow-hidden rounded-3xl bg-card">
                <Link to="/product/$id" params={{ id: w.id }} className="block aspect-[4/5] overflow-hidden bg-muted">
                  <img src={cldOptimized(w.image, 600)} alt={w.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <button onClick={() => toggleWish(w)} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur"><X className="h-4 w-4" /></button>
                <div className="p-3">
                  <div className="truncate text-sm font-medium">{w.name}</div>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm">{formatMoney(w.price)}</span>
                    <Link to="/product/$id" params={{ id: w.id }} className="rounded-full bg-foreground px-3 py-1.5 text-xs text-background font-medium">Enquire</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SiteLayout>
  );
}