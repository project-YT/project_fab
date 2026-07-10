import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Aurelle" },
      { name: "description", content: "Aurelle is a modern women's fashion boutique built on craft, comfort, and considered design." },
      { property: "og:title", content: "About — Aurelle" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteLayout>
      <div className="mx-auto max-w-4xl px-4 pt-12 pb-24 sm:px-6 lg:px-8">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">Our story</div>
        <h1 className="mt-2 font-display text-5xl sm:text-6xl">Softly modern, quietly confident.</h1>
        <p className="mt-6 text-lg text-muted-foreground">
          Aurelle began with a simple idea: everyday pieces that feel like a celebration. We work with small ateliers to make elevated wardrobes for women who love softness with a touch of edge.
        </p>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {[
            { t: "Considered", d: "Small runs, thoughtful fabrics, and gentle finishing." },
            { t: "Comfortable", d: "Fits designed on real bodies, tested through long days." },
            { t: "Kind", d: "Fair partnerships and long-life materials." },
          ].map((b) => (
            <div key={b.t} className="rounded-3xl bg-gradient-soft p-6">
              <div className="font-display text-2xl">{b.t}</div>
              <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}