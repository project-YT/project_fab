import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Aurelle" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  if (loading) return <div className="grid min-h-screen place-items-center text-muted-foreground">Loading…</div>;
  if (!user) return null;
  if (!isAdmin) {
    return (
      <div className="grid min-h-screen place-items-center px-6 text-center">
        <div>
          <h1 className="font-display text-3xl">Admin access only</h1>
          <p className="mt-2 text-sm text-muted-foreground">Your email is not on the admin allowlist.</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-foreground px-6 py-2 text-sm text-background">Back to store</Link>
        </div>
      </div>
    );
  }
  return <Outlet />;
}