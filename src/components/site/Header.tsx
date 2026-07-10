import { Link, useRouterState } from "@tanstack/react-router";
import { Heart, Search, ShoppingBag, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useStore } from "@/lib/store";

const nav = [
  { label: "Shop", to: "/shop" },
  { label: "Categories", to: "/categories" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const { user } = useAuth();
  const { cartCount, wishlist } = useStore();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center"
        >
          <img src="/logo.jpg" alt="ILLAM THULIR FABRICS" className="h-12 w-12 rounded-full object-cover shadow-sm border border-border/40 sm:h-14 sm:w-14" />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`text-sm tracking-wide uppercase transition-colors story-link ${
                pathname.startsWith(n.to)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/search"
            aria-label="Search"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-muted"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-muted"
          >
            <Heart className="h-[18px] w-[18px]" />
            {wishlist.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-secondary px-1 text-[10px] font-semibold text-secondary-foreground">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to={user ? "/account" : "/auth"}
            aria-label="Account"
            className="grid h-10 w-10 place-items-center rounded-full text-foreground/80 hover:bg-muted"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>

        </div>
      </div>
    </header>
  );
}