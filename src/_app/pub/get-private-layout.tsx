import { NextPageLayout } from "@/shared/lib/next";
import { PrivateLayout } from "../layouts/private-layout";
import { PrivateLoader } from "../loaders/private-loader";
import { PrivateProvider } from "../providers/private-provider";

export const getPrivateLayout: NextPageLayout = (children, data) => (
  <PrivateLoader data={data}>
    <PrivateProvider>
      <PrivateLayout>{children}</PrivateLayout>
    </PrivateProvider>
  </PrivateLoader>
);
