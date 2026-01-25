import Head from "next/head";
import { generateNextSeo, type NextSeoProps } from "next-seo/pages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutri-ai-gules.vercel.app";

export interface PageSeoProps {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  openGraph?: NextSeoProps["openGraph"];
}

export function PageSeo({
  title,
  description,
  path,
  noindex = false,
  openGraph,
}: PageSeoProps) {
  const url = path ? `${SITE_URL}${path}` : undefined;

  return (
    <Head>
      {generateNextSeo({
        title,
        description,
        canonical: url,
        noindex,
        nofollow: noindex,
        openGraph: {
          title,
          description,
          url,
          ...openGraph,
        },
      })}
    </Head>
  );
}
