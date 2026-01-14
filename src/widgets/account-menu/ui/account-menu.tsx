"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "@/shared/ui/primitives/dropdown-menu";
import { useAccountMenu } from "../model/use-account-menu";
import { useMenuLabels } from "../model/use-menu-labels";
import { getSlideClasses, getMainViewClasses } from "../lib/get-slide-classes";
import { AccountMenuTrigger } from "./account-menu-trigger";
import { AccountMenuHeader } from "./account-menu-header";
import { MainMenuView } from "./main-menu-view";
import { ThemeSubmenuView } from "./theme-submenu-view";
import { LanguageSubmenuView } from "./language-submenu-view";
import { ColorThemeSubmenuView } from "./color-theme-submenu-view";

export function AccountMenu() {
  const {
    isOpen,
    setIsOpen,
    currentView,
    slideDirection,
    mounted,
    user,
    avatarUrl,
    displayName,
    email,
    theme,
    lang,
    colorTheme,
    navigateTo,
    navigateBack,
    handleThemeChange,
    handleLangChange,
    handleColorThemeChange,
    handleLogout,
  } = useAccountMenu();

  const { getThemeLabel, getLangLabel, getColorLabel } = useMenuLabels(mounted);

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <AccountMenuTrigger avatarUrl={avatarUrl} />
      <DropdownMenuContent
        align="end"
        className="w-64 overflow-hidden"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="relative">
          {/* Main Menu View */}
          <div className={getMainViewClasses(currentView, slideDirection)}>
            <AccountMenuHeader
              avatarUrl={avatarUrl}
              displayName={displayName}
              email={email}
            />
            <DropdownMenuSeparator />
            <MainMenuView
              currentThemeLabel={getThemeLabel(theme)}
              currentLangLabel={getLangLabel(lang)}
              currentColorLabel={getColorLabel(colorTheme)}
              onThemeClick={() => navigateTo("theme")}
              onLanguageClick={() => navigateTo("language")}
              onColorThemeClick={() => navigateTo("colorTheme")}
              onLogout={handleLogout}
            />
          </div>

          {/* Theme Submenu View */}
          <div className={getSlideClasses("theme", currentView, slideDirection)}>
            <ThemeSubmenuView
              currentTheme={theme}
              onThemeChange={handleThemeChange}
              onBack={navigateBack}
            />
          </div>

          {/* Language Submenu View */}
          <div className={getSlideClasses("language", currentView, slideDirection)}>
            <LanguageSubmenuView
              currentLang={lang}
              onLangChange={handleLangChange}
              onBack={navigateBack}
            />
          </div>

          {/* Color Theme Submenu View */}
          <div className={getSlideClasses("colorTheme", currentView, slideDirection)}>
            <ColorThemeSubmenuView
              currentColorTheme={colorTheme}
              onColorThemeChange={handleColorThemeChange}
              onBack={navigateBack}
            />
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
