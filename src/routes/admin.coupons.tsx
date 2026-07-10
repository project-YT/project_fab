import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudTable } from "@/lib/admin-crud";

export const Route = createFileRoute("/admin/coupons")({
  component: () => (
    <AdminShell title="Coupons">
      <CrudTable collectionName="coupons" title="Coupon" fields={[
        { name: "code", label: "Code", required: true },
        { name: "type", label: "Type (percent|flat)" },
        { name: "value", label: "Value", type: "number" },
        { name: "minOrder", label: "Min order", type: "number" },
        { name: "active", label: "Active", type: "checkbox" },
      ]} />
    </AdminShell>
  ),
});