import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  size?: string;
  qty: number;
}

export interface WishItem {
  id: string;
  name: string;
  image: string;
  price: number;
}

interface StoreCtx {
  cart: CartItem[];
  wishlist: WishItem[];
  addToCart: (item: Omit<CartItem, "id" | "qty">, qty?: number) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWish: (item: WishItem) => void;
  isWished: (id: string) => boolean;
  cartCount: number;
  cartSubtotal: number;
}

const StoreContext = createContext<StoreCtx | null>(null);

const CART_KEY = "aurelle_cart_v1";
const WISH_KEY = "aurelle_wish_v1";

function readLS<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishItem[]>([]);

  useEffect(() => {
    setCart(readLS<CartItem[]>(CART_KEY, []));
    setWishlist(readLS<WishItem[]>(WISH_KEY, []));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(WISH_KEY, JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  const value = useMemo<StoreCtx>(() => {
    return {
      cart,
      wishlist,
      addToCart: (item, qty = 1) => {
        setCart((prev) => {
          const key = `${item.productId}-${item.size ?? ""}`;
          const idx = prev.findIndex((p) => p.id === key);
          if (idx >= 0) {
            const next = [...prev];
            next[idx] = { ...next[idx], qty: next[idx].qty + qty };
            return next;
          }
          return [...prev, { ...item, id: key, qty }];
        });
      },
      removeFromCart: (id) => setCart((p) => p.filter((i) => i.id !== id)),
      updateQty: (id, qty) =>
        setCart((p) =>
          p
            .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        ),
      clearCart: () => setCart([]),
      toggleWish: (item) =>
        setWishlist((p) =>
          p.find((w) => w.id === item.id) ? p.filter((w) => w.id !== item.id) : [...p, item],
        ),
      isWished: (id) => wishlist.some((w) => w.id === id),
      cartCount: cart.reduce((a, b) => a + b.qty, 0),
      cartSubtotal: cart.reduce((a, b) => a + b.qty * b.price, 0),
    };
  }, [cart, wishlist]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreCtx {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}