import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useStore } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import { formatMoney } from "@/lib/format";
import { firebaseConfigured, getDb } from "@/lib/firebase";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().email("Enter a valid email").max(120),
  phone: z.string().trim().min(7, "Enter a valid phone").max(20),
  line1: z.string().trim().min(3).max(120),
  line2: z.string().trim().max(120).optional(),
  city: z.string().trim().min(2).max(60),
  state: z.string().trim().min(2).max(60),
  zip: z.string().trim().min(3).max(12),
  country: z.string().trim().min(2).max(60),
});

type FormValues = z.infer<typeof schema>;

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — Aurelle" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const shipping = cartSubtotal >= 1499 ? 0 : 99;
  const total = cartSubtotal + shipping;

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.displayName ?? "",
      email: user?.email ?? "",
      country: "India",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (cart.length === 0) return toast.error("Your bag is empty");
    setSubmitting(true);
    try {
      const order = {
        userId: user?.uid ?? "guest",
        customerName: values.name,
        email: values.email,
        phone: values.phone,
        address: {
          line1: values.line1,
          line2: values.line2 ?? "",
          city: values.city,
          state: values.state,
          zip: values.zip,
          country: values.country,
        },
        items: cart.map((i) => ({
          productId: i.productId,
          name: i.name,
          image: i.image,
          price: i.price,
          qty: i.qty,
          size: i.size ?? "",
        })),
        subtotal: cartSubtotal,
        shipping,
        discount: 0,
        total,
        paymentMethod: "cod" as const,
        status: "pending" as const,
        createdAt: serverTimestamp(),
      };
      if (firebaseConfigured) {
        await addDoc(collection(getDb(), "orders"), order);
      }
      clearCart();
      toast.success("Order placed! We'll be in touch.");
      navigate({ to: "/" });
    } catch (e: any) {
      toast.error(e?.message ?? "Could not place order");
    } finally {
      setSubmitting(false);
    }
  };

  const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <SiteLayout>
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl sm:text-5xl">Checkout</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6 rounded-3xl border border-border bg-card p-6">
            <div>
              <h2 className="font-display text-2xl">Contact</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div><input placeholder="Full name" className={input} {...register("name")} />{errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}</div>
                <div><input placeholder="Email" className={input} {...register("email")} />{errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}</div>
                <div className="sm:col-span-2"><input placeholder="Phone" className={input} {...register("phone")} />{errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}</div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl">Shipping address</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="sm:col-span-2"><input placeholder="Address line 1" className={input} {...register("line1")} />{errors.line1 && <p className="mt-1 text-xs text-destructive">{errors.line1.message}</p>}</div>
                <div className="sm:col-span-2"><input placeholder="Address line 2 (optional)" className={input} {...register("line2")} /></div>
                <div><input placeholder="City" className={input} {...register("city")} />{errors.city && <p className="mt-1 text-xs text-destructive">{errors.city.message}</p>}</div>
                <div><input placeholder="State" className={input} {...register("state")} />{errors.state && <p className="mt-1 text-xs text-destructive">{errors.state.message}</p>}</div>
                <div><input placeholder="ZIP / Postal" className={input} {...register("zip")} />{errors.zip && <p className="mt-1 text-xs text-destructive">{errors.zip.message}</p>}</div>
                <div><input placeholder="Country" className={input} {...register("country")} />{errors.country && <p className="mt-1 text-xs text-destructive">{errors.country.message}</p>}</div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl">Payment</h2>
              <div className="mt-3 rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm">
                <div className="font-medium">Cash on Delivery</div>
                <div className="text-muted-foreground">Pay with cash when your order arrives.</div>
              </div>
            </div>
          </div>
          <aside className="h-fit rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <ul className="mt-4 space-y-3">
              {cart.map((i) => (
                <li key={i.id} className="flex items-center gap-3 text-sm">
                  <img src={i.image} alt="" className="h-14 w-12 rounded-lg object-cover" />
                  <div className="flex-1 truncate">
                    <div className="truncate">{i.name}</div>
                    <div className="text-xs text-muted-foreground">Qty {i.qty}{i.size ? ` · ${i.size}` : ""}</div>
                  </div>
                  <div>{formatMoney(i.price * i.qty)}</div>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{formatMoney(cartSubtotal)}</dd></div>
              <div className="flex justify-between text-muted-foreground"><dt>Shipping</dt><dd>{shipping === 0 ? "Free" : formatMoney(shipping)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2 text-base font-semibold"><dt>Total</dt><dd>{formatMoney(total)}</dd></div>
            </dl>
            <button disabled={submitting} type="submit" className="mt-6 w-full rounded-full bg-foreground py-4 text-sm font-medium text-background disabled:opacity-60">
              {submitting ? "Placing order…" : "Place order"}
            </button>
          </aside>
        </form>
      </div>
    </SiteLayout>
  );
}