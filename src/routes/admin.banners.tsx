import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CrudTable } from "@/lib/admin-crud";

export const Route = createFileRoute("/admin/banners")({
  component: () => (
    <AdminShell title="Banners">
      <CrudTable collectionName="banners" title="Banner" fields={[
        { name: "title", label: "Title", required: true },
        { name: "subtitle", label: "Subtitle" },
        { name: "image", label: "Image URL", type: "url" },
        { name: "cta", label: "CTA text" },
        { name: "link", label: "Link" },
        { name: "order", label: "Order", type: "number" },
        { name: "active", label: "Active", type: "checkbox" },
      ]} />
    </AdminShell>
  ),
});