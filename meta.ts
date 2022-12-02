import { IHTMLTag } from "vite-plugin-html-config"

export const APP_INFO = {
  name: "Hoppx",
  shortDescription: "",
  description:
    "仿 Hoppscotch 网站工具模板",
  keywords:
    "Hoppscotch, Hoppx",
  app: {
    background: "#202124",
  },
} as const

export const META_TAGS = (env: Record<string, string>): IHTMLTag[] => [
  {
    name: "keywords",
    content: APP_INFO.keywords,
  },
  {
    name: "X-UA-Compatible",
    content: "IE=edge, chrome=1",
  },
  {
    name: "name",
    content: `${APP_INFO.name} • ${APP_INFO.shortDescription}`,
  },
  {
    name: "description",
    content: APP_INFO.description,
  },
  {
    name: "image",
    content: `${env.VITE_BASE_URL}/banner.png`,
  },
  // Open Graph tags
  {
    name: "og:title",
    content: `${APP_INFO.name} • ${APP_INFO.shortDescription}`,
  },
  {
    name: "og:description",
    content: APP_INFO.description,
  },
  {
    name: "og:image",
    content: `${env.VITE_BASE_URL}/banner.png`,
  },
  // Add to homescreen for Chrome on Android. Fallback for PWA (handled by nuxt)
  {
    name: "application-name",
    content: APP_INFO.name,
  },
  // Windows phone tile icon
  {
    name: "msapplication-TileImage",
    content: `${env.VITE_BASE_URL}/icon.png`,
  },
  {
    name: "msapplication-TileColor",
    content: APP_INFO.app.background,
  },
  {
    name: "msapplication-tap-highlight",
    content: "no",
  },
  // iOS Safari
  {
    name: "apple-mobile-web-app-title",
    content: APP_INFO.name,
  },
  {
    name: "apple-mobile-web-app-capable",
    content: "yes",
  },
  {
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent",
  },
  // PWA
  {
    name: "theme-color",
    content: APP_INFO.app.background,
  },
  {
    name: "mask-icon",
    content: "/icon.png",
    color: APP_INFO.app.background,
  },
]
