"use client";

import { UiButton } from "@/shared/ui";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/css";
import { useLogout } from "../model/use-logout";
import { useI18n } from "../i18n";

export interface LogoutButtonProps {
  className?: string;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  showText?: boolean;
}

export function LogoutButton({
  className,
  variant = "ghost",
  size = "default",
  showIcon = true,
  showText = true,
}: LogoutButtonProps) {
  const { logout } = useLogout();
  const { t } = useI18n();

  return (
    <UiButton
      variant={variant}
      size={size}
      onClick={logout}
      className={cn("gap-2", className)}
    >
      {showIcon && <LogOut className="w-5 h-5" />}
      {showText && t("logout")}
    </UiButton>
  );
}
