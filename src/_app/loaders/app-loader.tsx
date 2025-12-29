import { ReactNode } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export const loadAppLoaderData = async () => {
  return {};
};

export function AppLoader({
  children,
  data,
}: {
  children?: ReactNode;
  data?: Awaited<ReturnType<typeof loadAppLoaderData>>;
}) {
  useApplayAppInterceptor();

  return <>{children}</>;
}
