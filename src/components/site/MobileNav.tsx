import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useStore } from "@/lib/store";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/search", label: "Search", icon: Search },
  { to: "/wishlist", label: "Wishlist", icon: Heart },
  { to: "/account", label: "Me", icon: User },
];

export function MobileNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { cartCount, wishlist } = useStore();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/60 bg-background/95 backdrop-blur-lg md:hidden">
      <ul className="grid grid-cols-4">
        {items.map((it) => {
          const active = it.to === "/" ? pathname === "/" : pathname.startsWith(it.to);
          const badge =
            it.to === "/cart" ? cartCount : it.to === "/wishlist" ? wishlist.length : 0;
          return (
            <li key={it.to}>
              <Link
                to={it.to}
                className={`relative flex flex-col items-center gap-1 py-2.5 text-[10px] tracking-wide ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <it.icon className="h-5 w-5" />
                <span>{it.label}</span>
                {badge > 0 && (
                  <span className="absolute right-1/2 top-1 ml-4 grid h-4 min-w-4 translate-x-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground">
                    {badge}
                  </span>
                )}
                {active && (
                  <span className="absolute inset-x-6 top-0 h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}