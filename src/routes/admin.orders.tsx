import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { AdminShell } from "@/components/admin/AdminShell";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import { formatMoney } from "@/lib/format";
import type { Order, OrderStatus } from "@/lib/types";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const statuses: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (!firebaseConfigured) return;
    const q = query(collection(getDb(), "orders"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (s) => setOrders(s.docs.map((d) => ({ id: d.id, ...(d.data() as any) }) as Order)));
  }, []);
  const setStatus = async (id: string, status: OrderStatus) => {
    await updateDoc(doc(getDb(), "orders", id), { status });
  };
  return (
    <AdminShell title="Orders">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3">Order</th><th className="p-3">Customer</th><th className="p-3">Items</th><th className="p-3">Total</th><th className="p-3">Status</th></tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-t border-border align-top">
                <td className="p-3 font-mono text-xs">#{o.id.slice(0, 8)}</td>
                <td className="p-3"><div className="font-medium">{o.customerName}</div><div className="text-xs text-muted-foreground">{o.email} · {o.phone}</div></td>
                <td className="p-3 text-muted-foreground">{o.items.length}</td>
                <td className="p-3">{formatMoney(o.total)}</td>
                <td className="p-3">
                  <select value={o.status} onChange={(e) => setStatus(o.id, e.target.value as OrderStatus)} className="rounded-full border border-border bg-background px-3 py-1.5 text-xs uppercase tracking-widest">
                    {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}