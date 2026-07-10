import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-muted/40 pb-24 md:pb-12">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-4 max-w-sm">
            <Link to="/" className="inline-block">
              <img src="/logo.jpg" alt="ILLAM THULIR FABRICS" className="h-20 w-20 rounded-full object-cover shadow-sm border border-border/40" />
            </Link>
            <div>
              <div className="font-display text-xl font-bold tracking-tight text-foreground uppercase">
                ILLAM THULIR FABRICS
              </div>
              <div className="text-sm font-medium text-primary mt-1">
                Premium Fabrics for Every Occasion
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-16">
            <div className="space-y-2 text-sm">
              <h3 className="font-semibold text-foreground uppercase tracking-wider text-xs">Contact Us</h3>
              <p className="text-muted-foreground">Phone: +91 96292 26235</p>
              <p className="text-muted-foreground">WhatsApp: +91 96292 26235</p>
            </div>
            <div className="space-y-2 text-sm">
              <h3 className="font-semibold text-foreground uppercase tracking-wider text-xs">Address</h3>
              <address className="not-italic text-muted-foreground whitespace-pre-line leading-relaxed">
                ILLAM THULIR FABRICS,
                Jallipatti,
                Sulur Taluk,
                Coimbatore – 641671,
                Tamil Nadu, India
              </address>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ILLAM THULIR FABRICS. All rights reserved.
      </div>
    </footer>
  );
}