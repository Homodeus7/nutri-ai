import { Home, Package, Zap, Utensils, Settings, LucideIcon } from "lucide-react";

export type NavItem = {
  key: "board" | "products" | "boost" | "lunch" | "more";
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { key: "board", href: "/board", icon: Home },
  { key: "products", href: "/products", icon: Package },
  { key: "boost", href: "/boost", icon: Zap },
  { key: "lunch", href: "/lunch", icon: Utensils },
  { key: "more", href: "/more", icon: Settings },
] as const;
