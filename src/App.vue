<template>
  <v-app>
    <template v-if="route.path !== '/' && route.path !== '/RealizarPedido'  && route.path !== '/PedidoProveedor'">
      <NavigationComponent></NavigationComponent>
    </template>

       <template v-if="route.path == '/' || route.path == '/RealizarPedido' || route.path == '/PedidoProveedor' ">
          <router-view />

    </template>
  </v-app>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style>
body {
  font-family: "Inter", sans-serif;
}
</style>