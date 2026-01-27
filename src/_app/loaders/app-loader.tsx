import { ReactNode } from "react";
import { useApplayAppInterceptor } from "../interceptors/app-interceptor";

export function AppLoader({
  children,
}: {
  children?: ReactNode;
  data?: Record<string, unknown>;
}) {
  useApplayAppInterceptor();

  return <>{children}</>;
}
