<template>
  <MenuComponent></MenuComponent>
  <v-container fluid>
    <!-- Header y botón en desktop -->
    <v-row
      class="mb-6 mt-4 d-none d-md-flex"
      align="center"
      justify="space-between"
    >
      <v-col cols="auto">
        <h5 class="text-h5 font-weight-bold ml-3 mb-0">
          Gestionar pedidos por vendedor
        </h5>
      </v-col>
    </v-row>

    <!-- Header y botón en mobile -->
    <v-row class="d-flex d-md-none mb-4" align="center" justify="space-between">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h5 class="text-h6 font-weight-bold mb-0">Gestión de Proveedores</h5>
      </v-col>
    </v-row>

    <v-row class="pa-2" dense>
      <v-col
        v-for="(pedido, index) in allPedidos"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card class="rounded-lg bg-white pa-4 mb-4" style="width: 100%">
          <v-card-text class="text-subtitle1">
            <div class="d-flex flex-column">
              <v-title class="text-h6 font-weight-bold mt-0">
                <div class="d-flex align-center">
                  <span>{{ pedido.nombreVendedor }}</span>
                  <v-chip
                    class="ml-2 text-center"
                    color="green"
                    variant="outlined"
                    size="small"
                  >
                    {{ pedido.estado }}
                  </v-chip>
                </div>
              </v-title>

              <strong class="mb-2 mt-3">
                <span class="text-grey-darken-3">
                  Nombre:
                  <span class="text-grey-darken-1">{{
                    pedido.nombreVendedor
                  }}</span>
                </span>
              </strong>

              <strong class="mb-2">
                <span class="text-grey-darken-3">
                  Fecha del pedido:
                  <span class="text-grey-darken-1">
                    {{ pedido.fechaPedido.split("T")[0] }}
                  </span>
                </span>
              </strong>

              <strong class="mb-2">
                <span class="text-grey-darken-3">
                  Cantidad de productos:
                  <span class="text-grey-darken-1">{{
                    pedido.cantidadProductos
                  }}</span>
                </span>
              </strong>

              <strong class="mb-2">
                <span class="text-grey-darken-3">
                  Cantidad de clientes:
                  <span class="text-grey-darken-1">{{
                    pedido.compradores.length
                  }}</span>
                </span>
              </strong>

              <strong class="mb-2">
                <span class="text-grey-darken-3">
                  Total del pedido:
                  <span class="text-grey-darken-1">${{ pedido.total }}</span>
                </span>
              </strong>
            </div>
          </v-card-text>

          <v-card-item>
            <div class="d-flex justify-center align-center">
              <router-link
                :to="`/PedidosVendedoresFull/${pedido.id}`"
                style="text-decoration: none"
              >
                <v-btn
                  class="text-capitalize"
                  color="primary"
                  variant="outlined"
                  size="large"
                  block
                >
                  Ver pedido completo
                </v-btn>
              </router-link>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import MenuComponent from "@/components/MenuComponent.vue";
import { usePedidosStore } from "@/stores/Pedidos";
import { storeToRefs } from "pinia";

import { onMounted } from "vue";
const pedidoStore = usePedidosStore();

const { allPedidos } = storeToRefs(pedidoStore);

console.log("array pedido:", allPedidos.value);
onMounted(async () => {
  await pedidoStore.getAllPedidos();
});
</script>

<style>
</style>