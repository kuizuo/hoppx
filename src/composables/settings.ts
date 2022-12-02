import { Ref } from "vue"
import { useSettingsStore, SettingsType } from "~/store/settings"
import { storeToRefs } from "pinia"

export function useSetting<K extends keyof SettingsType>(
  settingKey: K
): Ref<SettingsType[K]> {
  const settingsStore = useSettingsStore()
  return storeToRefs(settingsStore)[settingKey]
}