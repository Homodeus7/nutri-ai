"use client";

import { User, Moon, Settings, LogOut, Languages, Palette } from "lucide-react";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import { useI18n } from "../i18n";
import { MenuItemLink } from "./menu-item-link";

interface MainMenuViewProps {
  currentThemeLabel: string;
  currentLangLabel: string;
  currentColorLabel: string;
  onThemeClick: () => void;
  onLanguageClick: () => void;
  onColorThemeClick: () => void;
  onLogout: () => void;
}

export function MainMenuView({
  currentThemeLabel,
  currentLangLabel,
  currentColorLabel,
  onThemeClick,
  onLanguageClick,
  onColorThemeClick,
  onLogout,
}: MainMenuViewProps) {
  const { t } = useI18n();

  return (
    <div className="py-1">
      <DropdownMenuItem disabled>
        <User className="w-4 h-4" />
        <span>{t("profile")}</span>
      </DropdownMenuItem>

      <MenuItemLink
        icon={Moon}
        label={t("theme")}
        value={currentThemeLabel}
        onClick={onThemeClick}
      />

      <MenuItemLink
        icon={Languages}
        label={t("language")}
        value={currentLangLabel}
        onClick={onLanguageClick}
      />

      <MenuItemLink
        icon={Palette}
        label={t("colorTheme")}
        value={currentColorLabel}
        onClick={onColorThemeClick}
      />

      <DropdownMenuItem disabled>
        <Settings className="w-4 h-4" />
        <span>{t("settings")}</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem variant="destructive" onClick={onLogout}>
        <LogOut className="w-4 h-4" />
        <span>{t("logout")}</span>
      </DropdownMenuItem>
    </div>
  );
}
