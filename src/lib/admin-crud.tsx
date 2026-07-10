import { useState } from "react";
import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import { useCollection } from "@/lib/db";

export interface CrudField {
  name: string;
  label: string;
  type?: "text" | "number" | "url" | "checkbox";
  required?: boolean;
}

export function CrudTable<T extends { id: string }>({
  collectionName,
  fields,
  title,
}: {
  collectionName: string;
  fields: CrudField[];
  title: string;
}) {
  const { data } = useCollection<T>(collectionName);
  const [editing, setEditing] = useState<Partial<T> | null>(null);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    if (!editing) return;
    if (!firebaseConfigured) return toast.error("Configure Firebase first.");
    setSaving(true);
    try {
      const { id, ...rest } = editing as any;
      if (id) {
        await updateDoc(doc(getDb(), collectionName, id), { ...rest, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(getDb(), collectionName), { ...rest, createdAt: serverTimestamp() });
      }
      toast.success("Saved");
      setEditing(null);
    } catch (e: any) {
      toast.error(e?.message ?? "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm(`Delete this ${title.toLowerCase()}?`)) return;
    await deleteDoc(doc(getDb(), collectionName, id));
  };

  const input = "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";

  return (
    <>
      <div className="flex justify-end">
        <button onClick={() => setEditing({} as any)} className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
          <Plus className="h-4 w-4" /> Add {title}
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr>{fields.map((f) => <th key={f.name} className="p-3">{f.label}</th>)}<th></th></tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t border-border">
                {fields.map((f) => {
                  const v = (row as any)[f.name];
                  return <td key={f.name} className="p-3">{typeof v === "boolean" ? (v ? "✓" : "—") : String(v ?? "—")}</td>;
                })}
                <td className="p-3">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setEditing(row)} className="grid h-8 w-8 place-items-center rounded-full border border-border"><Pencil className="h-3.5 w-3.5" /></button>
                    <button onClick={() => remove(row.id)} className="grid h-8 w-8 place-items-center rounded-full border border-border text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
            {data.length === 0 && <tr><td colSpan={fields.length + 1} className="p-8 text-center text-muted-foreground">Nothing here yet.</td></tr>}
          </tbody>
        </table>
      </div>
      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4" onClick={() => setEditing(null)}>
          <div className="w-full max-w-lg space-y-3 rounded-3xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-2xl">{(editing as any).id ? `Edit ${title}` : `New ${title}`}</h2>
            {fields.map((f) => (
              <label key={f.name} className="block text-xs uppercase tracking-widest text-muted-foreground">
                {f.label}
                {f.type === "checkbox" ? (
                  <input type="checkbox" checked={Boolean((editing as any)[f.name])} onChange={(e) => setEditing({ ...(editing as any), [f.name]: e.target.checked })} className="mt-2 h-5 w-5" />
                ) : (
                  <input
                    type={f.type ?? "text"}
                    className={`mt-1 ${input}`}
                    value={(editing as any)[f.name] ?? ""}
                    onChange={(e) => setEditing({ ...(editing as any), [f.name]: f.type === "number" ? Number(e.target.value) : e.target.value })}
                  />
                )}
              </label>
            ))}
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="rounded-full border border-border px-5 py-2 text-sm">Cancel</button>
              <button disabled={saving} onClick={save} className="rounded-full bg-foreground px-5 py-2 text-sm text-background disabled:opacity-60">{saving ? "Saving…" : "Save"}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}