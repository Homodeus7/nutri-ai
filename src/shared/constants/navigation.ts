import { Home, Package, Zap, Utensils, Settings, LucideIcon } from "lucide-react";
import { ROUTER_PATHS } from "./routes";

export type NavItem = {
  key: "board" | "products" | "boost" | "lunch" | "more";
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { key: "board", href: ROUTER_PATHS.BOARD, icon: Home },
  { key: "products", href: ROUTER_PATHS.PRODUCTS, icon: Package },
  { key: "boost", href: ROUTER_PATHS.BOOST, icon: Zap },
  { key: "lunch", href: ROUTER_PATHS.LUNCH, icon: Utensils },
  { key: "more", href: ROUTER_PATHS.MORE, icon: Settings },
] as const;
