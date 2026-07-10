import { useMemo } from "react";
import { useCollection } from "./db";
import { firebaseConfigured } from "./firebase";
import { demoBanners, demoCategories, demoProducts } from "./demo-data";
import type { Banner, Category, Product } from "./types";

export function useProducts(): { data: Product[]; loading: boolean } {
  const { data, loading } = useCollection<Product>("products");
  return useMemo(() => {
    if (!firebaseConfigured) return { data: demoProducts, loading: false };
    if (loading) return { data: [], loading: true };
    return { data: data.length ? data : demoProducts, loading: false };
  }, [data, loading]);
}

export function useCategories(): { data: Category[]; loading: boolean } {
  const { data, loading } = useCollection<Category>("categories");
  return useMemo(() => {
    if (!firebaseConfigured) return { data: demoCategories, loading: false };
    if (loading) return { data: [], loading: true };
    return { data: data.length ? data : demoCategories, loading: false };
  }, [data, loading]);
}

export function useBanners(): { data: Banner[]; loading: boolean } {
  const { data, loading } = useCollection<Banner>("banners");
  return useMemo(() => {
    if (!firebaseConfigured) return { data: demoBanners, loading: false };
    if (loading) return { data: [], loading: true };
    return { data: data.length ? data : demoBanners, loading: false };
  }, [data, loading]);
}

export function useProduct(id: string | undefined): { data: Product | null; loading: boolean } {
  const { data } = useProducts();
  return useMemo(() => {
    if (!id) return { data: null, loading: false };
    return { data: data.find((p) => p.id === id) ?? null, loading: false };
  }, [id, data]);
}