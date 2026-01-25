import Head from "next/head";
import { AppHeader } from "@/widgets/app-header";
import { AppSidebar } from "@/widgets/app-sidebar";
import { MobileBottomTabs } from "@/widgets/mobile-bottom-tabs";

export function PrivateLayout({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen flex">
      <div className="hidden xl:flex">
        <AppSidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <AppHeader />
        <main className="grow bg-background text-foreground">
          <div className="px-4 py-6 xl:px-8 xl:py-12 pb-[calc(6.5rem+env(safe-area-inset-bottom,0px))] xl:pb-12">
            <div className="max-w-7xl mx-auto space-y-6">{children}</div>
          </div>
        </main>
      </div>
      <div className="xl:hidden">
        <MobileBottomTabs />
      </div>
      </div>
    </>
  );
}
