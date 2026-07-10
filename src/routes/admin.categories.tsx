import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudTable } from "@/lib/admin-crud";

export const Route = createFileRoute("/admin/categories")({
  component: () => (
    <AdminShell title="Categories">
      <CrudTable collectionName="categories" title="Category" fields={[
        { name: "name", label: "Name", required: true },
        { name: "slug", label: "Slug", required: true },
        { name: "image", label: "Image URL", type: "url" },
      ]} />
    </AdminShell>
  ),
});