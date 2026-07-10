import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  Package,
  Tags,
  ShoppingBag,
  Users,
  Image as ImageIcon,
  BadgePercent,
  Boxes,
  Settings,
  Bookmark,
  ArrowLeft,
} from "lucide-react";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/brands", label: "Brands", icon: Bookmark },
  { to: "/admin/banners", label: "Banners", icon: ImageIcon },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/inventory", label: "Inventory", icon: Boxes },
  { to: "/admin/coupons", label: "Coupons", icon: BadgePercent },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="mx-auto flex max-w-[1400px] gap-6 px-3 py-4 sm:px-6 lg:py-8">
        <aside className="hidden w-60 shrink-0 rounded-3xl border border-border bg-card p-4 lg:block">
          <Link to="/" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to store
          </Link>
          <div className="mb-4 px-3 font-display text-2xl">Aurelle Admin</div>
          <nav className="space-y-1">
            {nav.map((n) => {
              const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${active ? "bg-foreground text-background" : "hover:bg-muted"}`}
                >
                  <n.icon className="h-4 w-4" /> {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="font-display text-3xl sm:text-4xl">{title}</h1>
            <Link to="/" className="rounded-full border border-border bg-card px-4 py-2 text-xs lg:hidden">Store</Link>
          </div>
          <div className="overflow-x-auto pb-2 lg:hidden">
            <div className="flex gap-2">
              {nav.map((n) => {
                const active = n.exact ? pathname === n.to : pathname.startsWith(n.to);
                return (
                  <Link
                    key={n.to}
                    to={n.to}
                    className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs ${active ? "bg-foreground text-background" : "border border-border bg-card"}`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}