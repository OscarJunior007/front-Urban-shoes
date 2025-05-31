<template>
  <v-toolbar class="bg-white text-black" :elevation="2" bordered>
    <!-- Botón hamburguesa solo visible en mobile -->
    <v-btn
      icon="mdi-menu"
      class="d-md-none mr-2"
      @click="appStore.toggleDrawer"
      variant="text"
    ></v-btn>
    <v-toolbar-title class="text-h6">
      <strong> {{ route.path.split("/")[1] }} </strong>
    </v-toolbar-title>
    <!-- Info usuario: oculto en xs, visible en md+ -->
    <div
      class="d-none d-md-flex justify-end align-center mr-4"
      style="height: 100%; width: 30%; gap: 10px"
    >
      <v-avatar size="30" color="surface-variant">
        <span class="text-h7">OM</span>
      </v-avatar>
      <span>Oscar Mejia</span>
      <v-chip variant="outlined">
        <span class="text-h7">admin</span>
      </v-chip>
    </div>
    <!-- Info usuario compacta solo en mobile -->
    <div
      class="d-flex d-md-none justify-end align-center mr-3"
      style="height: 100%; gap: 6px"
    >
      <v-avatar size="30" color="surface-variant">
        <span class="text-h7">OM</span>
      </v-avatar>
      <v-chip variant="outlined">
        <span class="text-h7">admin</span>
      </v-chip>
    </div>
  </v-toolbar>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { useAppStore } from "@/stores/app";

const route = useRoute();
const appStore = useAppStore();
</script>

<style scoped>
.v-toolbar {
  width: 100%;
  margin-left: 0 !important;
}
</style>