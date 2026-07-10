import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatMoney } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cldOptimized } from "@/lib/cloudinary";

export function ProductCard({ p }: { p: Product }) {
  const { toggleWish, isWished } = useStore();
  const img = p.images?.[0]?.url;
  const wished = isWished(p.id);
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group relative overflow-hidden rounded-3xl bg-card shadow-soft"
    >
      <Link to="/product/$id" params={{ id: p.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {img ? (
            <img
              src={cldOptimized(img, 600)}
              alt={p.name}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center font-display text-4xl text-muted-foreground/40">
              Aurelle
            </div>
          )}
          {p.compareAtPrice && p.compareAtPrice > p.price && (
            <span className="absolute left-3 top-3 rounded-full bg-secondary px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-secondary-foreground">
              Save {Math.round(((p.compareAtPrice - p.price) / p.compareAtPrice) * 100)}%
            </span>
          )}
        </div>
        <div className="space-y-1 px-4 pb-4 pt-3">
          {p.brandName && (
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {p.brandName}
            </div>
          )}
          <div className="line-clamp-1 text-sm font-medium">{p.name}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-semibold">{formatMoney(p.price)}</span>
            {p.compareAtPrice && p.compareAtPrice > p.price && (
              <span className="text-xs text-muted-foreground line-through">
                {formatMoney(p.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        aria-label="Toggle wishlist"
        onClick={() =>
          toggleWish({ id: p.id, name: p.name, image: img ?? "", price: p.price })
        }
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 backdrop-blur transition hover:scale-110"
      >
        <Heart className={`h-4 w-4 ${wished ? "fill-secondary text-secondary" : ""}`} />
      </button>
    </motion.div>
  );
}