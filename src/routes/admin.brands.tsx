import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudTable } from "@/lib/admin-crud";

export const Route = createFileRoute("/admin/brands")({
  component: () => (
    <AdminShell title="Brands">
      <CrudTable collectionName="brands" title="Brand" fields={[
        { name: "name", label: "Name", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "logo", label: "Logo URL", type: "url" },
      ]} />
    </AdminShell>
  ),
});