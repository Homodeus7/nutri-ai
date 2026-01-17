"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/css";

type NavLinkButtonProps = {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
};

export function NavLinkButton({
  href,
  icon: Icon,
  label,
  isActive,
}: NavLinkButtonProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center justify-center rounded-full transition-all duration-300",
        "w-12 h-12 md:w-[80px] md:h-[80px]",
        isActive
          ? "bg-primary text-white"
          : "bg-border text-zinc-500 hover:text-zinc-300 active:scale-95",
      )}
    >
      <Icon
        className={cn(
          "w-5 h-5 md:w-[30px] md:h-[30px] transition-transform duration-300",
          isActive && "scale-110",
        )}
        strokeWidth={isActive ? 2.5 : 2}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </Link>
  );
}
