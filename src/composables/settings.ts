import { Ref } from "vue"
import { settingsStore, SettingsType } from "~/store/settings"
import { storeToRefs } from "pinia"

export function useSetting<K extends keyof SettingsType>(
  settingKey: K
): Ref<SettingsType[K]> {
  return storeToRefs(settingsStore)[settingKey]
}