<template>
  <SmartTabs
    v-model="selectedNavigationTab"
    styles="sticky overflow-x-auto flex-shrink-0 bg-primary z-10 top-0"
    vertical
    render-inactive-tabs
  >
    <SmartTab :id="'history'" :icon="IconClock" :label="`${t('tab.history')}`">
      <div class="flex flex-col flex-1 justify-center items-center">
        History
      </div>
      <!-- <History :page="'rest'" /> -->
    </SmartTab>
    <SmartTab
      :id="'collections'"
      :icon="IconFolder"
      :label="`${t('tab.collections')}`"
    >
      <div class="flex flex-col flex-1 justify-center items-center">
        Collections
      </div>
      <!-- <Collections /> -->
    </SmartTab>
  </SmartTabs>
</template>

<script setup lang="ts">
import IconClock from "~icons/lucide/clock"
import IconFolder from "~icons/lucide/folder"
import { ref } from "vue"
import { useI18n } from "@composables/i18n"

const t = useI18n()

type Tabs = "history" | "collections"

let selectedNavigationTab = ref<Tabs>("history")
</script>
