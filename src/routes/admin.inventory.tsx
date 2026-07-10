import { createFileRoute } from "@tanstack/react-router";
import { doc, updateDoc } from "firebase/firestore";
import { AdminShell } from "@/components/admin/AdminShell";
import { useProducts } from "@/lib/data-hooks";
import { firebaseConfigured, getDb } from "@/lib/firebase";

export const Route = createFileRoute("/admin/inventory")({ component: Inventory });

function Inventory() {
  const { data } = useProducts();
  const setStock = async (id: string, stock: number) => {
    if (!firebaseConfigured) return;
    await updateDoc(doc(getDb(), "products", id), { stock });
  };
  return (
    <AdminShell title="Inventory">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3">Product</th><th className="p-3">Category</th><th className="p-3 w-40">Stock</th></tr>
          </thead>
          <tbody>
            {data.map((p) => (
              <tr key={p.id} className={`border-t border-border ${(p.stock ?? 0) < 5 ? "bg-destructive/5" : ""}`}>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-muted-foreground">{p.categoryName ?? "—"}</td>
                <td className="p-3">
                  <input type="number" defaultValue={p.stock ?? 0} onBlur={(e) => setStock(p.id, Number(e.target.value))} className="w-24 rounded-xl border border-border bg-background px-3 py-1.5 text-sm" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}