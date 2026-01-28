import { Apple, BookOpen, LucideIcon, Target } from "lucide-react";
import { ROUTER_PATHS } from "./routes";

export type NavItem = {
  key: "diary" | "products" | "goals";
  href: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { key: "diary", href: ROUTER_PATHS.DIARY, icon: BookOpen },
  { key: "goals", href: ROUTER_PATHS.GOALS, icon: Target },
  { key: "products", href: ROUTER_PATHS.PRODUCTS, icon: Apple },
  // { key: "boost", href: ROUTER_PATHS.BOOST, icon: Zap },
  // { key: "lunch", href: ROUTER_PATHS.LUNCH, icon: Utensils },
] as const;
