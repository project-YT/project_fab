import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/lib/store";
import { formatMoney } from "@/lib/format";
import { cldOptimized } from "@/lib/cloudinary";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Aurelle" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartSubtotal } = useStore();
  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Your bag</h1>
        {cart.length === 0 ? (
          <div className="mt-10 grid place-items-center rounded-3xl border border-dashed border-border py-24">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">Your bag is empty.</p>
            <Link to="/shop" className="mt-6 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background">Start shopping</Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
            <ul className="divide-y divide-border rounded-3xl border border-border bg-card">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 p-4">
                  <img src={cldOptimized(item.image, 200)} alt={item.name} className="h-28 w-24 rounded-2xl object-cover" />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium">{item.name}</div>
                        {item.size && <div className="mt-1 text-xs text-muted-foreground">Size {item.size}</div>}
                      </div>
                      <button onClick={() => removeFromCart(item.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-border">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="grid h-8 w-8 place-items-center"><Minus className="h-3 w-3" /></button>
                        <span className="min-w-6 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="grid h-8 w-8 place-items-center"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="font-medium">{formatMoney(item.price * item.qty)}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit rounded-3xl border border-border bg-card p-6">
              <h2 className="font-display text-2xl">Summary</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(cartSubtotal)}</dd></div>
                <div className="flex justify-between text-muted-foreground"><dt>Shipping</dt><dd>{cartSubtotal >= 1499 ? "Free" : formatMoney(99)}</dd></div>
              </dl>
              <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
                <span>Total</span>
                <span>{formatMoney(cartSubtotal + (cartSubtotal >= 1499 ? 0 : 99))}</span>
              </div>
              <Link to="/checkout" className="mt-6 grid place-items-center rounded-full bg-foreground py-4 text-sm font-medium text-background hover:opacity-90">Checkout</Link>
              <Link to="/shop" className="mt-3 grid place-items-center rounded-full border border-border py-3 text-sm">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}