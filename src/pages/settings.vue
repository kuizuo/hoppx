<template>
  <div>
    <div class="container space-y-8 divide-y divide-dividerLight">
      <div class="md:grid md:gap-4 md:grid-cols-3">
        <div class="p-8 md:col-span-1">
          <h3 class="heading">
            {{ t("settings.theme") }}
          </h3>
          <p class="my-1 text-secondaryLight">
            {{ t("settings.theme_description") }}
          </p>
        </div>
        <div class="p-8 space-y-8 md:col-span-2">
          <section>
            <h4 class="font-semibold text-secondaryDark">
              {{ t("settings.background") }}
            </h4>
            <div class="my-1 text-secondaryLight">
              {{ t(getColorModeName(colorMode.preference)) }}
              <span v-if="colorMode.preference === 'system'">
                ({{ t(getColorModeName(colorMode.value)) }})
              </span>
            </div>
            <div class="mt-4">
              <SmartColorModePicker />
            </div>
          </section>
          <section>
            <h4 class="font-semibold text-secondaryDark">
              {{ t("settings.accent_color") }}
            </h4>
            <div class="my-1 text-secondaryLight">
              {{ ACCENT_COLOR.charAt(0).toUpperCase() + ACCENT_COLOR.slice(1) }}
            </div>
            <div class="mt-4">
              <SmartAccentModePicker />
            </div>
          </section>
          <section>
            <h4 class="font-semibold text-secondaryDark">
              {{ t("settings.font_size") }}
            </h4>
            <div class="mt-4">
              <SmartFontSizePicker />
            </div>
          </section>
          <section>
            <h4 class="font-semibold text-secondaryDark">
              {{ t("settings.language") }}
            </h4>
            <div class="mt-4">
              <SmartChangeLanguage />
            </div>
          </section>
          <section>
            <h4 class="font-semibold text-secondaryDark">
              {{ t("settings.experiments") }}
            </h4>
            <div class="my-1 text-secondaryLight">
              {{ t("settings.experiments_notice") }}
              <SmartAnchor
                class="link"
                to="https://github.com/hoppscotch/hoppscotch/issues/new/choose"
                blank
                :label="t('app.contact_us')"
              />.
            </div>
            <div class="py-4 space-y-4">
              <div class="flex items-center">
                <SmartToggle :on="TELEMETRY_ENABLED" @change="showConfirmModal">
                  {{ t("settings.telemetry") }}
                </SmartToggle>
              </div>
              <div class="flex items-center">
                <SmartToggle
                  :on="EXPAND_NAVIGATION"
                  @change="toggleSetting('EXPAND_NAVIGATION')"
                >
                  {{ t("settings.expand_navigation") }}
                </SmartToggle>
              </div>
              <div class="flex items-center">
                <SmartToggle
                  :on="SIDEBAR_ON_LEFT"
                  @change="toggleSetting('SIDEBAR_ON_LEFT')"
                >
                  {{ t("settings.sidebar_on_left") }}
                </SmartToggle>
              </div>
              <div class="flex items-center">
                <SmartToggle :on="ZEN_MODE" @change="toggleSetting('ZEN_MODE')">
                  {{ t("layout.zen_mode") }}
                </SmartToggle>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <SmartConfirmModal
      :show="confirmRemove"
      :title="`${t('confirm.remove_telemetry')} ${t(
        'settings.telemetry_helps_us'
      )}`"
      @hide-modal="confirmRemove = false"
      @resolve="
        () => {
          toggleSetting('TELEMETRY_ENABLED')
          confirmRemove = false
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { applySetting, toggleSetting } from "~/store/settings"
import { useSetting } from "@composables/settings"
import { useI18n } from "@composables/i18n"
import { useColorMode } from "@composables/theming"
import { usePageHead } from "@composables/head"

const t = useI18n()
const colorMode = useColorMode()

usePageHead({
  title: computed(() => t("navigation.settings")),
})

const ACCENT_COLOR = useSetting("THEME_COLOR")
const TELEMETRY_ENABLED = useSetting("TELEMETRY_ENABLED")
const EXPAND_NAVIGATION = useSetting("EXPAND_NAVIGATION")
const SIDEBAR_ON_LEFT = useSetting("SIDEBAR_ON_LEFT")
const ZEN_MODE = useSetting("ZEN_MODE")

const confirmRemove = ref(false)

watch(ZEN_MODE, (mode) => {
  applySetting("EXPAND_NAVIGATION", !mode)
})

const showConfirmModal = () => {
  if (TELEMETRY_ENABLED.value) confirmRemove.value = true
  else toggleSetting("TELEMETRY_ENABLED")
}

const getColorModeName = (colorMode: string) => {
  switch (colorMode) {
    case "system":
      return "settings.system_mode"
    case "light":
      return "settings.light_mode"
    case "dark":
      return "settings.dark_mode"
    case "black":
      return "settings.black_mode"
    default:
      return "settings.system_mode"
  }
}
</script>