import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { AdminShell } from "@/components/admin/AdminShell";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import { formatMoney } from "@/lib/format";
import type { Order, Product } from "@/lib/types";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!firebaseConfigured) return;
    const u1 = onSnapshot(collection(getDb(), "orders"), (s) => setOrders(s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as Order)));
    const u2 = onSnapshot(collection(getDb(), "products"), (s) => setProducts(s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as Product)));
    return () => { u1(); u2(); };
  }, []);

  const revenue = orders.filter((o) => o.status !== "cancelled").reduce((a, b) => a + (b.total ?? 0), 0);
  const pending = orders.filter((o) => o.status === "pending").length;
  const lowStock = products.filter((p) => (p.stock ?? 0) < 5).length;

  const byDay: Record<string, number> = {};
  orders.forEach((o) => {
    const ts = o.createdAt?.toDate?.() ?? new Date();
    const key = ts.toISOString().slice(5, 10);
    byDay[key] = (byDay[key] ?? 0) + (o.total ?? 0);
  });
  const chart = Object.entries(byDay).slice(-14).map(([d, v]) => ({ d, v }));

  const stats = [
    { label: "Revenue", value: formatMoney(revenue) },
    { label: "Orders", value: orders.length },
    { label: "Pending", value: pending },
    { label: "Products", value: products.length },
    { label: "Low stock", value: lowStock },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
            <div className="mt-2 font-display text-3xl">{s.value}</div>
          </div>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl">Revenue (last 14 days)</h2>
        </div>
        <div className="h-64">
          <ResponsiveContainer>
            <AreaChart data={chart}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="d" stroke="currentColor" fontSize={12} />
              <YAxis stroke="currentColor" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="v" stroke="hsl(var(--primary))" fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {!firebaseConfigured && (
        <div className="rounded-2xl border border-primary/40 bg-primary/10 p-4 text-sm">
          Firebase is not configured yet. See <code>firebase-setup.md</code> to connect Firestore and start managing live data.
        </div>
      )}
    </AdminShell>
  );
}