import { UiPageSpinner } from "@/shared/ui/ui-page-spinner";
import { ReactNode, useEffect, useState } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
import { useTheme } from "@/features/theme";
// import { api } from "@/shared/api";

export const loadAppLoaderData = async () => {
  // try {
  //   const session = await api.getSession();
  //   return { session };
  // } catch {
  //   return {};
  // }
  return {};
};

export function AppLoader({
  children,
  data,
}: {
  children?: ReactNode;
  data?: Awaited<ReturnType<typeof loadAppLoaderData>>;
}) {
  // const [session, setSession] = useState<Session | undefined>(data?.session);
  // const isData = !!session;

  const loadTheme = useTheme((s) => s.loadTheme);

  const [isLoading, setIsLoading] = useState(false);

  useApplayAppInterceptor();

  useEffect(() => {
    // if (isData) {
    //   return;
    // }
    setIsLoading(true);
    loadTheme();
    setIsLoading(false);

    // api
    //   .getSession()
    //   .then(setSession)
    //   .finally(() => {
    //     setIsLoading(false);
    //   })
    //   .catch(() => {});
  }, [loadTheme /*, loadLang, isData*/]);

  return (
    <>
      {/* <UiPageSpinner isLoading={false} /> */}
      {/* {!isLoading ? (
        <SessionProvider
          value={{
            session,
          }}
        >
          {children}
        </SessionProvider>
      ) : null} */}
      {children}
    </>
  );
}
