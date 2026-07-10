import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/lib/auth-context";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import { formatMoney } from "@/lib/format";
import type { Order } from "@/lib/types";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [{ title: "My Account — Aurelle" }, { name: "robots", content: "noindex" }],
  }),
  component: AccountPage,
});

function AccountPage() {
  const { user, loading, signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!firebaseConfigured || !user) return;
    const q = query(collection(getDb(), "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setOrders(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as Order));
    });
  }, [user]);

  const initial = useMemo(() => (user?.displayName ?? user?.email ?? "A").slice(0, 1).toUpperCase(), [user]);

  if (!user) return null;
  return (
    <SiteLayout>
      <div className="mx-auto max-w-5xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-soft font-display text-2xl">{initial}</div>
            <div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Welcome</div>
              <h1 className="font-display text-3xl">{user.displayName ?? user.email}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            {isAdmin && <Link to="/admin" className="rounded-full border border-primary bg-primary/10 px-4 py-2 text-sm">Admin</Link>}
            <button onClick={signOut} className="rounded-full border border-border px-4 py-2 text-sm">Sign out</button>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-display text-2xl">Your orders</h2>
          {orders.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-border py-16 text-center text-muted-foreground">
              No orders yet. <Link to="/shop" className="story-link">Start shopping</Link>
            </div>
          ) : (
            <ul className="mt-6 space-y-3">
              {orders.map((o) => (
                <li key={o.id} className="rounded-2xl border border-border bg-card p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                    <div className="font-mono text-xs text-muted-foreground">#{o.id.slice(0, 8)}</div>
                    <div className="rounded-full bg-muted px-3 py-0.5 text-xs uppercase tracking-widest">{o.status}</div>
                    <div className="font-semibold">{formatMoney(o.total)}</div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">{o.items.length} items · {o.address.city}</div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </SiteLayout>
  );
}