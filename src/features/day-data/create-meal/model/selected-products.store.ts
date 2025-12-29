import { create } from "zustand";
import type { Product } from "@/shared/api/generated/nutriAIFoodCalorieTrackerAPI";

export type SelectedProduct = {
  product: Product;
  quantity: number | null;
};

type SelectedProductsStore = {
  products: Map<string, SelectedProduct>;
  toggle: (product: Product) => void;
  setQuantity: (productId: string, quantity: number | null) => void;
  clear: () => void;
  get: (productId: string) => SelectedProduct | undefined;
  getAll: () => SelectedProduct[];
  isValid: () => boolean;
};

export const useSelectedProducts = create<SelectedProductsStore>((set, get) => ({
  products: new Map(),

  toggle: (product) => {
    set((state) => {
      const id = String(product.id);
      const newMap = new Map(state.products);

      if (newMap.has(id)) {
        newMap.delete(id);
      } else {
        newMap.set(id, { product, quantity: null });
      }

      return { products: newMap };
    });
  },

  setQuantity: (productId, quantity) => {
    set((state) => {
      const existing = state.products.get(productId);
      if (!existing) return state;

      const newMap = new Map(state.products);
      newMap.set(productId, { ...existing, quantity });
      return { products: newMap };
    });
  },

  clear: () => set({ products: new Map() }),

  get: (productId) => get().products.get(productId),

  getAll: () => Array.from(get().products.values()),

  isValid: () => {
    const products = get().products;
    if (products.size === 0) return false;
    return Array.from(products.values()).every(
      (item) => item.quantity !== null && item.quantity > 0
    );
  },
}));
