import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { firebaseConfigured, getDb } from "@/lib/firebase";
import type { StoreSettings } from "@/lib/types";

export const Route = createFileRoute("/admin/settings")({ component: SettingsPage });

const defaults: StoreSettings = {
  storeName: "Aurelle",
  tagline: "Modern women's fashion boutique",
  email: "hello@aurelle.co",
  phone: "+91 98765 43210",
  address: "Mumbai, India",
  shippingFee: 99,
  freeShippingAbove: 1499,
  currency: "INR",
};

function SettingsPage() {
  const [s, setS] = useState<StoreSettings>(defaults);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (!firebaseConfigured) return;
    getDoc(doc(getDb(), "settings", "store")).then((snap) => {
      if (snap.exists()) setS({ ...defaults, ...(snap.data() as StoreSettings) });
    });
  }, []);
  const save = async () => {
    if (!firebaseConfigured) return toast.error("Configure Firebase first.");
    setSaving(true);
    try {
      await setDoc(doc(getDb(), "settings", "store"), s, { merge: true });
      toast.success("Saved");
    } finally {
      setSaving(false);
    }
  };
  const input = "w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary";
  return (
    <AdminShell title="Settings">
      <div className="grid gap-3 rounded-3xl border border-border bg-card p-6 sm:grid-cols-2">
        {(Object.keys(defaults) as (keyof StoreSettings)[]).map((k) => (
          <label key={k} className="block text-xs uppercase tracking-widest text-muted-foreground">
            {k}
            <input
              type={typeof defaults[k] === "number" ? "number" : "text"}
              value={(s[k] as any) ?? ""}
              onChange={(e) =>
                setS({ ...s, [k]: typeof defaults[k] === "number" ? Number(e.target.value) : e.target.value } as StoreSettings)
              }
              className={`mt-1 ${input}`}
            />
          </label>
        ))}
      </div>
      <button disabled={saving} onClick={save} className="rounded-full bg-foreground px-6 py-2.5 text-sm text-background disabled:opacity-60">
        {saving ? "Saving…" : "Save settings"}
      </button>
    </AdminShell>
  );
}