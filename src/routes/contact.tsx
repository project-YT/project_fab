import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Aurelle" },
      { name: "description", content: "Reach the Aurelle team for orders, styling advice, or partnerships." },
      { property: "og:title", content: "Contact — Aurelle" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sending, setSending] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Thanks! We'll respond within one business day.");
    (e.target as HTMLFormElement).reset();
    setSending(false);
  };
  const input = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";
  return (
    <SiteLayout>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">Say hello</div>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">We'd love to hear from you</h1>
          <p className="mt-4 text-muted-foreground">Questions, styling help, or a partnership idea — write to us anytime.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> hello@aurelle.co</div>
            <div className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</div>
            <div className="flex items-center gap-3"><MapPin className="h-4 w-4 text-primary" /> Mumbai, India</div>
          </div>
        </div>
        <form onSubmit={submit} className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-elegant">
          <input required placeholder="Your name" maxLength={80} className={input} />
          <input required type="email" placeholder="Email" maxLength={120} className={input} />
          <textarea required placeholder="Message" maxLength={1000} rows={5} className={`${input} resize-none`} />
          <button disabled={sending} className="w-full rounded-full bg-foreground py-3.5 text-sm text-background disabled:opacity-60">
            {sending ? "Sending…" : "Send message"}
          </button>
        </form>
      </div>
    </SiteLayout>
  );
}