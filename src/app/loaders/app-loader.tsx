import { ReactNode } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";
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

  useApplayAppInterceptor();

  // useEffect(() => {
  //   if (isData) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   api
  //     .getSession()
  //     .then(setSession)
  //     .finally(() => {
  //       setIsLoading(false);
  //     })
  //     .catch(() => {});
  // }, [isData]);

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
