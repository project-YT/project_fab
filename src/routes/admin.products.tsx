import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { ImageDropzone, type UploadedImage } from "@/components/admin/ImageDropzone";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import { useProducts, useCategories } from "@/lib/data-hooks";
import { formatMoney, slugify } from "@/lib/format";
import type { Product } from "@/lib/types";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

const empty: Partial<Product> & { images: UploadedImage[] } = {
  name: "", description: "", price: 0, stock: 0, images: [], sizes: [], categoryId: "",
};

function AdminProducts() {
  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const [editing, setEditing] = useState<(Partial<Product> & { images: UploadedImage[] }) | null>(null);
  const [saving, setSaving] = useState(false);

  const cats = useMemo(() => new Map(categories.map((c) => [c.id, c.name])), [categories]);

  const save = async () => {
    if (!editing) return;
    if (!firebaseConfigured) return toast.error("Configure Firebase to save products.");
    if (!editing.name || !editing.price) return toast.error("Name and price are required");
    setSaving(true);
    try {
      const cat = categories.find((c) => c.id === editing.categoryId);
      const payload = {
        name: editing.name,
        slug: slugify(editing.name!),
        description: editing.description ?? "",
        price: Number(editing.price),
        compareAtPrice: editing.compareAtPrice ? Number(editing.compareAtPrice) : null,
        stock: Number(editing.stock ?? 0),
        images: editing.images,
        sizes: editing.sizes ?? [],
        categoryId: editing.categoryId ?? "",
        categoryName: cat?.name ?? "",
        featured: editing.featured ?? false,
        newArrival: editing.newArrival ?? true,
        updatedAt: serverTimestamp(),
      };
      if (editing.id) {
        await updateDoc(doc(getDb(), "products", editing.id), payload);
        toast.success("Product updated");
      } else {
        await addDoc(collection(getDb(), "products"), { ...payload, createdAt: serverTimestamp() });
        toast.success("Product added");
      }
      setEditing(null);
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!firebaseConfigured) return;
    if (!confirm("Delete this product?")) return;
    await deleteDoc(doc(getDb(), "products", id));
    toast.success("Deleted");
  };

  const input = "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <AdminShell title="Products">
      <div className="flex justify-end">
        <button onClick={() => setEditing({ ...empty })} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
          <Plus className="h-4 w-4" /> Add product
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3">Image</th><th className="p-3">Name</th><th className="p-3">Category</th><th className="p-3">Price</th><th className="p-3">Stock</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3"><div className="h-12 w-12 overflow-hidden rounded-lg bg-muted">{p.images?.[0] && <img src={p.images[0].url} alt="" className="h-full w-full object-cover" />}</div></td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-muted-foreground">{cats.get(p.categoryId ?? "") ?? p.categoryName ?? "—"}</td>
                <td className="p-3">{formatMoney(p.price)}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing({ ...p, images: p.images ?? [] })} className="grid h-8 w-8 place-items-center rounded-full border border-border"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => remove(p.id)} className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl">{editing.id ? "Edit product" : "New product"}</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input placeholder="Name" className={input} value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} />
              <select className={input} value={editing.categoryId ?? ""} onChange={(e) => setEditing({ ...editing, categoryId: e.target.value })}>
                <option value="">Select category</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
              <input placeholder="Price" type="number" className={input} value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} />
              <input placeholder="Compare-at price (optional)" type="number" className={input} value={editing.compareAtPrice ?? ""} onChange={(e) => setEditing({ ...editing, compareAtPrice: Number(e.target.value) })} />
              <input placeholder="Stock" type="number" className={input} value={editing.stock ?? 0} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} />
              <input placeholder="Sizes (comma separated)" className={input} value={editing.sizes?.join(", ") ?? ""} onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
              <textarea placeholder="Description" rows={3} className={`sm:col-span-2 ${input}`} value={editing.description ?? ""} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </div>
            <div className="mt-4">
              <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Images</div>
              <ImageDropzone value={editing.images} onChange={(imgs) => setEditing({ ...editing, images: imgs })} />
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2 text-sm">Cancel</button>
              <button disabled={saving} onClick={save} className="rounded-full bg-foreground px-5 py-2 text-sm text-background disabled:opacity-60">{saving ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}