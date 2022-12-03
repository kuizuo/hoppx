<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <SmartSpinner v-if="signingInWithEmail" />
    <AppLogo v-else class="w-16 h-16 rounded" />
    <pre v-if="error" class="mt-4 text-secondaryLight">{{ error }}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useI18n } from "@composables/i18n"

export default defineComponent({
  setup() {
    return {
      t: useI18n(),
    }
  },
  data() {
    return {
      signingInWithEmail: false,
      error: null,
    }
  },
  beforeMount() {},
  async mounted() {},
})
</script>

<route lang="yaml">
meta:
  layout: empty
</route>
