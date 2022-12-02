/* eslint-disable no-restricted-globals, no-restricted-syntax */

import { useSettingsStore } from "./settings"
import { StorageLike } from "@vueuse/core"

function setupSettingsPersistence() {
  const settingsData = JSON.parse(
    window.localStorage.getItem("settings") || "{}"
  )

  const settingsStore = useSettingsStore()

  settingsStore.$subscribe((settings) => {
    window.localStorage.setItem("settings", JSON.stringify(settings))
  })
}

export function setupLocalPersistence() {
  setupSettingsPersistence()
}

/**
 * Gets a value in LocalStorage.
 *
 * NOTE: Use LocalStorage to only store non-reactive simple data
 * For more complex data, use stores and connect it to localpersistence
 */
export function getLocalConfig(name: string) {
  return window.localStorage.getItem(name)
}

/**
 * Sets a value in LocalStorage.
 *
 * NOTE: Use LocalStorage to only store non-reactive simple data
 * For more complex data, use stores and connect it to localpersistence
 */
export function setLocalConfig(key: string, value: string) {
  window.localStorage.setItem(key, value)
}

/**
 * Clear config value in LocalStorage.
 * @param key Key to be cleared
 */
export function removeLocalConfig(key: string) {
  window.localStorage.removeItem(key)
}

/**
 * The storage system we are using in the application.
 * NOTE: This is a placeholder for being used in app.
 * This entire redirection of localStorage is to allow for
 * not refactoring the entire app code when we refactor when
 * we are building the native (which may lack localStorage,
 * or use a custom system)
 */
export const hoppLocalConfigStorage: StorageLike = localStorage
