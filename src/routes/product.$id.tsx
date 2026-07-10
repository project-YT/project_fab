import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, MessageCircle, Truck, RefreshCw, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ProductCard } from "@/components/site/ProductCard";
import { useProduct, useProducts } from "@/lib/data-hooks";
import { formatMoney } from "@/lib/format";
import { useStore } from "@/lib/store";
import { cldOptimized } from "@/lib/cloudinary";

export const Route = createFileRoute("/product/$id")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `Product — Aurelle` },
      { property: "og:url", content: `/product/${params.id}` },
      { property: "og:type", content: "product" },
    ],
    links: [{ rel: "canonical", href: `/product/${params.id}` }],
  }),
});

function ProductPage() {
  const { id } = Route.useParams();
  const { data: product } = useProduct(id);
  const { data: all } = useProducts();
  const { addToCart, toggleWish, isWished } = useStore();
  const [imgIdx, setImgIdx] = useState(0);
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="font-display text-3xl">Product not found</h1>
          <Link to="/shop" className="mt-6 inline-block story-link text-sm">Back to shop</Link>
        </div>
      </SiteLayout>
    );
  }

  const related = all.filter((p) => p.id !== product.id && p.categoryId === product.categoryId).slice(0, 4);

  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-8 pb-16 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <motion.div key={imgIdx} initial={{ opacity: 0.4 }} animate={{ opacity: 1 }} className="aspect-[4/5] overflow-hidden rounded-3xl bg-muted">
            {product.images?.[imgIdx]?.url && <img src={cldOptimized(product.images[imgIdx].url, 1200)} alt={product.name} className="h-full w-full object-cover" />}
          </motion.div>
          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((im, i) => (
                <button key={im.public_id + i} onClick={() => setImgIdx(i)} className={`aspect-square h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition ${i === imgIdx ? "border-primary" : "border-transparent"}`}>
                  <img src={cldOptimized(im.url, 200)} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          {product.brandName && <div className="text-xs uppercase tracking-widest text-muted-foreground">{product.brandName}</div>}
          <h1 className="mt-1 font-display text-3xl sm:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatMoney(product.price)}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && <span className="text-sm text-muted-foreground line-through">{formatMoney(product.compareAtPrice)}</span>}
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
          {product.sizes && product.sizes.length > 0 && (
            <div className="mt-8">
              <div className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">Size</div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSize(s)} className={`min-w-12 rounded-full border px-4 py-2 text-sm transition ${size === s ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground/40"}`}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 flex gap-3">
            <button
              onClick={() => {
                if (product.sizes && product.sizes.length > 0 && !size) {
                  toast.error("Please select a size");
                  return;
                }
                const messageText = `Hello,\n\nI'm interested in this product.\n\nProduct: ${product.name}\nSize: ${size || "N/A"}\nPrice: ${formatMoney(product.price)}\n\nPlease let me know the availability.`;
                const whatsappUrl = `https://wa.me/919629226235?text=${encodeURIComponent(messageText)}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-sm font-medium text-white transition hover:bg-[#20ba5a]"
            >
              <MessageCircle className="h-4 w-4 fill-current" /> Enquire on WhatsApp
            </button>
            <button
              onClick={() => toggleWish({ id: product.id, name: product.name, image: product.images?.[0]?.url ?? "", price: product.price })}
              aria-label="Toggle wishlist"
              className="grid h-14 w-14 place-items-center rounded-full border border-border hover:bg-muted"
            >
              <Heart className={`h-5 w-5 ${isWished(product.id) ? "fill-secondary text-secondary" : ""}`} />
            </button>
          </div>
          <div className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-4 text-sm">
            <div className="flex items-center gap-3"><Truck className="h-4 w-4 text-primary" /> Free shipping over ₹1499</div>
            <div className="flex items-center gap-3"><RefreshCw className="h-4 w-4 text-primary" /> Easy 7-day returns</div>
            <div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-primary" /> Quick reply & enquiry support</div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <h2 className="mb-6 font-display text-2xl sm:text-3xl">You may also love</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        </section>
      )}
    </SiteLayout>
  );
}