import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in — Aurelle" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { signIn, signUp, configured } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!configured) return toast.error("Firebase is not configured. See firebase-setup.md.");
    setLoading(true);
    try {
      if (mode === "signin") await signIn(email, password);
      else await signUp(email, password, name);
      toast.success("Welcome to Aurelle");
      navigate({ to: "/account" });
    } catch (err: any) {
      toast.error(err?.message ?? "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";

  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-md px-4 pt-12 pb-20 sm:px-6">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <img src="/logo.jpg" alt="ILLAM THULIR FABRICS" className="h-20 w-20 rounded-full object-cover shadow-sm border border-border/40" />
            </div>
            <h1 className="mt-2 font-display text-3xl">{mode === "signin" ? "Welcome back" : "Create your account"}</h1>
          </div>
          <form onSubmit={submit} className="mt-8 space-y-3">
            {mode === "signup" && (
              <input required placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className={input} />
            )}
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={input} minLength={6} />
            <button disabled={loading} className="w-full rounded-full bg-foreground py-3.5 text-sm font-medium text-background disabled:opacity-60">
              {loading ? "Please wait…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? (
              <>New here? <button onClick={() => setMode("signup")} className="story-link">Create account</button></>
            ) : (
              <>Already have an account? <button onClick={() => setMode("signin")} className="story-link">Sign in</button></>
            )}
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <Link to="/">← Back to home</Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}