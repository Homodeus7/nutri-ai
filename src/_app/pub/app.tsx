import { AppProps } from "next/app";
import Head from "next/head";
import { generateDefaultSeo } from "next-seo/pages";
import { AppLoader } from "../loaders/app-loader";
import { AppProvider } from "../providers/app-provider";
import { AppLayout } from "../layouts/app-layout";
import { NextPage } from "next";
import { NextPageLayout } from "@/shared/lib/next";
import { defaultSeoConfig } from "../config/seo.config";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: NextPageLayout;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppLoader data={pageProps}>
      <AppProvider>
        <Head>{generateDefaultSeo(defaultSeoConfig)}</Head>
        <AppLayout>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </AppLayout>
      </AppProvider>
    </AppLoader>
  );
}
