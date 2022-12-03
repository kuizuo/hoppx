/// <reference types="vite/client" />

// Environment Variables Intellisense
interface ImportMetaEnv {
  readonly VITE_GA_ID: string

  readonly VITE_GTM_ID: string

  readonly VITE_API_KEY: string
  readonly VITE_AUTH_DOMAIN: string
  readonly VITE_DATABASE_URL: string
  readonly VITE_PROJECT_ID: string
  readonly VITE_STORAGE_BUCKET: string
  readonly VITE_MESSAGING_SENDER_ID: string
  readonly VITE_APP_ID: string
  readonly VITE_MEASUREMENT_ID: string

  readonly VITE_BASE_URL: string
  readonly VITE_SHORTCODE_BASE_URL: string

  readonly VITE_SENTRY_DSN?: string
  readonly VITE_SENTRY_ENVIRONMENT?: string
  readonly VITE_SENTRY_RELEASE_TAG?: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
