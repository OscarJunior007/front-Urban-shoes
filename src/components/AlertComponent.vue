<template>
  <v-alert
    
    v-if="errorSuccessStore.messageError"
    type="error"
    class="mt-4"
    rounded="xl"
  >
    {{ errorSuccessStore.messageError }}
  </v-alert>
  <v-alert
    v-if="errorSuccessStore.messageSucces"
    type="success"
    class="mt-4"
    rounded="xl"
  >
    {{ errorSuccessStore.messageSucces }}
  </v-alert>
</template>

<script setup>
import { useErrorSuccessStore } from '@/stores/ErrorSucces'
import { watch } from 'vue'
const errorSuccessStore = useErrorSuccessStore()

watch(
  () => [errorSuccessStore.messageError, errorSuccessStore.messageSucces],
  ([error, success]) => {
    if (error || success) {
      setTimeout(() => {
        errorSuccessStore.clearMessages()
      }, 2000)
    }
  }
)
</script>

<style>

</style>