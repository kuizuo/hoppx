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
        <!-- <SmartItem
          :icon="IconBook"
          :label="t('app.documentation')"
          to="https://docs.hoppscotch.io"
          :description="t('support.documentation')"
          :info-icon="IconChevronRight"
          active
          blank
          @click="hideModal()"
        /> -->
        <SmartItem
          :icon="IconZap"
          :label="t('app.keyboard_shortcuts')"
          :description="t('support.shortcuts')"
          :info-icon="IconChevronRight"
          active
          @click="showShortcuts()"
        />
        <SmartItem
          :icon="IconGift"
          :label="t('app.whats_new')"
          to="https://docs.hoppscotch.io/changelog"
          :description="t('support.changelog')"
          :info-icon="IconChevronRight"
          active
          blank
          @click="hideModal()"
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
import IconGift from "~icons/lucide/gift"
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
