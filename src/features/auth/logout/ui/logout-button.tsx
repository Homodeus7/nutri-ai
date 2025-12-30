"use client";

import { UiButton } from "@/shared/ui";
import { LogOut } from "lucide-react";
import { cn } from "@/shared/lib/css";
import { useLogout } from "../model/use-logout";
import { useI18n } from "../i18n";

export interface LogoutButtonProps {
  className?: string;
  showIcon?: boolean;
  showText?: boolean;
}

export function LogoutButton({
  className,
  showIcon = true,
  showText = true,
}: LogoutButtonProps) {
  const { logout } = useLogout();
  const { t } = useI18n();

  return (
    <UiButton onClick={logout} className={cn("gap-2", className)}>
      {showIcon && <LogOut />}
      {showText && t("logout")}
    </UiButton>
  );
}
