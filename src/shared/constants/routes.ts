export const ROUTER_PATHS = {
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  BOARD: "/board",
  PRODUCTS: "/products",
  PRODUCT_DETAIL: "/products/[id]",
  BOOST: "/boost",
  LUNCH: "/lunch",
  MORE: "/more",
  403: "/403",
} as const;

export const getProductDetailPath = (id: string | number) =>
  `/products/${id}` as const;
