import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useCollection } from "@/lib/db";
import type { UserRecord } from "@/lib/types";

export const Route = createFileRoute("/admin/customers")({ component: Customers });

function Customers() {
  const { data } = useCollection<UserRecord>("users");
  return (
    <AdminShell title="Customers">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th></tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.uid || (u as any).id} className="border-t border-border">
                <td className="p-3 font-medium">{u.displayName ?? "—"}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 text-muted-foreground">{u.phone ?? "—"}</td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr><td colSpan={3} className="p-8 text-center text-muted-foreground">No customers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}