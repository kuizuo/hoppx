import { has } from "lodash-es"
import { defineStore } from "pinia"

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
  THEME_COLOR: HoppAccentColor
  BG_COLOR: HoppBgColor
  EXPAND_NAVIGATION: boolean
  SIDEBAR: boolean
  SIDEBAR_ON_LEFT: boolean
  ZEN_MODE: boolean
  FONT_SIZE: HoppFontSize
  COLUMN_LAYOUT: boolean
}

export const defaultSettings: SettingsType = {
  THEME_COLOR: "indigo",
  BG_COLOR: "system",
  EXPAND_NAVIGATION: true,
  SIDEBAR: true,
  SIDEBAR_ON_LEFT: false,
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
