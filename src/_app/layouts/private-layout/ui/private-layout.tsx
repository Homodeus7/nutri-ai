import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/app-sidebar";
import { MobileBottomTabs } from "@/widgets/mobile-bottom-tabs";

export function PrivateLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="grow flex flex-col bg-background text-foreground">
          <div className="px-4 py-6 md:px-8 md:py-12 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] md:pb-12">
            <div className="max-w-7xl mx-auto">{children}</div>
          </div>
        </main>
      </div>
      <MobileBottomTabs />
    </div>
  );
}
