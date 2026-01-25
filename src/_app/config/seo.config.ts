import type { DefaultSeoProps } from "next-seo/pages";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://nutri-ai-gules.vercel.app";
const SITE_NAME = "Nutri AI";

export const defaultSeoConfig: DefaultSeoProps = {
  defaultTitle: "Nutri AI - AI-Powered Calorie Tracker",
  titleTemplate: "%s | Nutri AI",
  description:
    "Track your calories effortlessly with AI-powered meal parsing. Simply describe your meals and let Nutri AI calculate the nutrition for you.",
  canonical: SITE_URL,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Nutri AI - AI-Powered Calorie Tracker",
    description:
      "Track your calories effortlessly with AI-powered meal parsing. Simply describe your meals and let Nutri AI calculate the nutrition for you.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Nutri AI - AI-Powered Calorie Tracker",
        type: "image/png",
      },
    ],
  },
  twitter: {
    handle: "@nutriai",
    site: "@nutriai",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "application-name",
      content: SITE_NAME,
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "apple-mobile-web-app-title",
      content: SITE_NAME,
    },
    {
      name: "theme-color",
      content: "#ffffff",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
};

export const seoConfig = {
  siteUrl: SITE_URL,
  siteName: SITE_NAME,
} as const;
