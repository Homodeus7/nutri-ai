import { Apple, Zap, Utensils, LucideIcon, Notebook } from "lucide-react";
import { ROUTER_PATHS } from "./routes";

export type NavItem = {
  key: "diary" | "products" | "boost" | "lunch";
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { key: "diary", href: ROUTER_PATHS.DIARY, icon: Notebook },
  { key: "products", href: ROUTER_PATHS.PRODUCTS, icon: Apple },
  { key: "boost", href: ROUTER_PATHS.BOOST, icon: Zap },
  { key: "lunch", href: ROUTER_PATHS.LUNCH, icon: Utensils },
] as const;
