import { has } from "lodash-es"
import { defineStore } from "pinia"
import { pinia } from "~/modules/pinia"

export const HoppBgColors = ["system", "light", "dark", "black"] as const

export type HoppBgColor = typeof HoppBgColors[number]

export const HoppAccentColors = [
  "green",
  "teal",
  "blue",
  "indigo",
  "purple",
  "yellow",
  "orange",
  "red",
  "pink",
] as const

export type HoppAccentColor = typeof HoppAccentColors[number]

export const HoppFontSizes = ["small", "medium", "large"] as const

export type HoppFontSize = typeof HoppFontSizes[number]

export type SettingsType = {
  syncCollections: boolean
  syncHistory: boolean
  syncEnvironments: boolean

  THEME_COLOR: HoppAccentColor
  BG_COLOR: HoppBgColor
  TELEMETRY_ENABLED: boolean
  EXPAND_NAVIGATION: boolean
  SIDEBAR: boolean
  SIDEBAR_ON_LEFT: boolean
  ZEN_MODE: boolean
  FONT_SIZE: HoppFontSize
  COLUMN_LAYOUT: boolean
}

export const defaultSettings: SettingsType = {
  syncCollections: true,
  syncHistory: true,
  syncEnvironments: true,
  THEME_COLOR: "indigo",
  BG_COLOR: "system",
  TELEMETRY_ENABLED: true,
  EXPAND_NAVIGATION: true,
  SIDEBAR: true,
  SIDEBAR_ON_LEFT: true,
  ZEN_MODE: false,
  FONT_SIZE: "small",
  COLUMN_LAYOUT: true,
}

const validKeys = Object.keys(defaultSettings)

export const useSettingsStore = defineStore("app-settings-store", {
  state: (): SettingsType => defaultSettings,

  actions: {
    toggleSetting<K extends keyof SettingsType>(settingKey: K) {
      if (!has(this.$state, settingKey)) {
        return {}
      }

      // @ts-ignore
      this.$state[settingKey] = !this.$state[settingKey]
    },
    applySetting<K extends keyof SettingsType>(
      settingKey: K,
      value: SettingsType[K]
    ) {
      if (!validKeys.includes(settingKey)) {
        return {}
      }
      // @ts-ignore
      this[settingKey] = value
    },
  },
  persist: {},
})

export const settingsStore = useSettingsStore(pinia)

export function toggleSetting<K extends keyof SettingsType>(settingKey: K) {
  settingsStore.toggleSetting(settingKey)
}

export function applySetting<K extends keyof SettingsType>(
  settingKey: K,
  value: SettingsType[K]
) {
  settingsStore.applySetting(settingKey, value)
}
