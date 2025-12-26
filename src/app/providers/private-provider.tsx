import { useApplayAppInterceptor } from "@/app/interceptors/app-interceptor";

export function PrivateProvider({ children }: { children: React.ReactNode }) {
  useApplayAppInterceptor();

  return <>{children}</>;
}
