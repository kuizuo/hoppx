<template>
  <SmartModal
    v-if="show"
    dialog
    :title="t('support.title')"
    styles="sm:max-w-md"
    @close="emit('hide-modal')"
  >
    <template #body>
      <div class="flex flex-col space-y-2">
        <SmartItem
          :icon="IconZap"
          :label="t('app.keyboard_shortcuts')"
          :description="t('support.shortcuts')"
          :info-icon="IconChevronRight"
          active
          @click="showShortcuts()"
        />
        <SmartItem
          :icon="IconGitHub"
          :label="t('app.github')"
          to="https://github/kuizuo/hoppx"
          blank
          :description="t('support.github')"
          :info-icon="IconChevronRight"
          active
          @click="hideModal()"
        />
      </div>
    </template>
  </SmartModal>
</template>

<script setup lang="ts">
import IconGitHub from "~icons/hopp/github"
import IconZap from "~icons/lucide/zap"
import IconChevronRight from "~icons/lucide/chevron-right"
import { invokeAction } from "@helpers/actions"
import { useI18n } from "@composables/i18n"

const t = useI18n()

defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  (e: "hide-modal"): void
}>()

const showShortcuts = () => {
  invokeAction("flyouts.keybinds.toggle")
  hideModal()
}

const hideModal = () => {
  emit("hide-modal")
}
</script>
