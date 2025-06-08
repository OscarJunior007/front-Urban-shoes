<template>
  <div class="text-center">
    <v-snackbar :color="color" v-model="snackbar" :timeout="timeout">
      {{ text }}
      <template v-slot:actions>
        <v-btn color="blue" variant="text" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { usePedidosStore } from "@/stores/Pedidos";
import { storeToRefs } from "pinia";

const pedidoStore = usePedidosStore();
const { mensaje } = storeToRefs(pedidoStore);

const color = ref();
const snackbar = ref(false);
const timeout = ref(2000);
const text = ref("");

watch(mensaje, (nuevoValor) => {
  if (nuevoValor) {
    text.value = nuevoValor;
    if (text.value.includes("faltan") || text.value.includes("Error")) {
      color.value = "red";
      snackbar.value = true;
      setTimeout(() => {
        pedidoStore.mensaje = "";
      }, timeout.value);
      return;
    }
    color.value = "green";
    snackbar.value = true;
    setTimeout(() => {
      pedidoStore.mensaje = "";
    }, timeout.value);
  }
});
</script>