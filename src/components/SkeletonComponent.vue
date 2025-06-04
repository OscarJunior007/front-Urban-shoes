<template>
  <v-skeleton-loader v-if="type === 'table'" type="table-heading"></v-skeleton-loader>
  <v-skeleton-loader v-if="type === 'text'" type="text"></v-skeleton-loader>
</template>

<script setup lang="ts">
const props = defineProps({
  skeletonActive: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: 'table' 
  }
})
</script>

<style>

</style>