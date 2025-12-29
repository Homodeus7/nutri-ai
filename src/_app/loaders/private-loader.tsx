import { useAuthStore } from "@/entities/auth";
import { ROUTER_PATHS } from "@/shared/constants/routes";
import { ComposeChildren, useEventCallback } from "@/shared/lib/react";
import { UiPageSpinner } from "@/shared/ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const loadPrivateLoaderData = async () => {
  return {};
};

export function PrivateLoader({
  children,
  data: defaultData,
}: {
  children?: React.ReactNode;
  data?: Awaited<ReturnType<typeof loadPrivateLoaderData>>;
}) {
  const [data, setData] = useState(defaultData);
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const token = useAuthStore((s) => s.token);

  const [isLoading, setIsLoading] = useState(true);

  const routerReplace = useEventCallback(router.replace);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      routerReplace(ROUTER_PATHS.SIGN_IN);
      return;
    }

    setIsLoading(false);
  }, [isAuthenticated, token, routerReplace]);

  return (
    <>
      <UiPageSpinner isLoading={isLoading} />
      {isLoading ? null : <ComposeChildren>{children}</ComposeChildren>}
    </>
  );
}
