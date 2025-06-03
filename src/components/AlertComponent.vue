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
const errorSuccessStore = useErrorSuccessStore()
</script>

<style>

</style>