<template>
  <v-container class="bg-black">
    <v-form v-model="valid" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="12" sm="6">
          <v-text-field
            v-model="pedidoStore.pedidoProvObj.personRealizoPedido"
            label="Persona que realizó el pedido"
            required
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="pedidoStore.pedidoProvObj.proveedorId"
            label="ID del proveedor"
            required
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-text-field
            v-model="pedidoStore.pedidoProvObj.fechaPedido"
            label="Fecha del pedido"
            type="datetime-local"
            required
          />
        </v-col>

        <v-col cols="12" sm="6">
          <v-select
            v-model="pedidoStore.pedidoProvObj.estado"
            :items="estados"
            label="Estado del pedido"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="pedidoStore.pedidoProvObj.direccionEnvio"
            label="Dirección de envío"
            required
          />
        </v-col>

        <v-col cols="12">
          <v-textarea
            v-model="pedidoStore.pedidoProvObj.notas"
            label="Notas adicionales"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <div class="d-flex">
            <v-text-field
              v-model.number="pedidoStore.pedidoProvObj.cantidadZapatos"
              label="Cantidad de zapatos"
              type="number"
              min="0"
            />
            <v-btn
              color="success"
              class="mt-2 ml-3"
              @click="pedidoStore.agregarZapato(null, route.path)"
              >Agregar zapatos</v-btn
            >
          </div>
        </v-col>

        <v-col cols="12">
          <v-card class="pa-4" variant="outlined">
            <h4>Zapatos</h4>
            <v-row
              v-for="(z, index) in pedidoStore.pedidoProvObj.zapatos"
              :key="index"
            >
              <v-col cols="12" sm="3">
                <v-text-field v-model="z.marca" label="Marca" />
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field v-model="z.talla" label="Talla" />
              </v-col>
              <v-col cols="12" sm="3">
                <v-select
                  v-model="z.sexo"
                  :items="['Hombre', 'Mujer', 'Unisex']"
                  label="Sexo"
                />
              </v-col>
              <v-col cols="12" sm="3">
                <v-text-field
                  v-model.number="z.precioUnitario"
                  label="Precio unitario"
                  type="number"
                  min="0"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pedidoStore.pedidoProvObj.costoEnvio"
            label="Costo de envío"
            type="number"
            min="0"
          />
        </v-col>

        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pedidoStore.pedidoProvObj.subtotal"
            label="Subtotal"
            type="number"
            min="0"
            :value="subtotalPedidoProveedor"
            readonly="true"
            variant="outlined"
          />
        </v-col>
        <v-col cols="12" sm="4">
          <v-text-field
            v-model.number="pedidoStore.pedidoProvObj.total"
            label="Total"
            type="number"
            min="0"
            :value="totalPedidoProveedor"
            readonly="true"
            variant="outlined"
          />
        </v-col>

        <v-col cols="12">
          <v-card class="pa-4" variant="outlined">
            <h4>Historial de Estados</h4>
            <v-row
              v-for="(h, index) in pedidoStore.pedidoProvObj.historialEstados"
              :key="index"
            >
              <v-col cols="6">
                <v-text-field v-model="h.estado" label="Estado" />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="h.fecha"
                  label="Fecha"
                  type="datetime-local"
                />
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-btn color="primary" type="submit">Enviar Pedido</v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePedidosStore } from "@/stores/Pedidos";
import { useRoute } from "vue-router";
import { useUserLoginStore } from "@/stores/Userlogin";
import { storeToRefs } from "pinia";
const valid = ref(false);
const route = useRoute();
const pedidoStore = usePedidosStore();
const userStore = useUserLoginStore();

const { subtotalPedidoProveedor, totalPedidoProveedor } = storeToRefs(pedidoStore);
const estados = [
  "Pedido realizado - por enviar",
  "Enviado",
  "Entregado",
  "Cancelado",
];

const nombreUser = ref("");
const idUser = ref("");

pedidoStore.pedidoProvObj.subtotal = subtotalPedidoProveedor
pedidoStore.pedidoProvObj.total = totalPedidoProveedor


onMounted(async () => {
  try {
    const response = await userStore.getMe();
    if (dataUser.status !== 200 || dataUser.data.rol != "ADMIN") route.push("/");

    console.log(response.data)
    const nombre = response.data.first_name;
    const apellido = response.data.last_name;
    nombreUser.value = nombre + apellido;
    idUser.value = response.data.id;
  } catch (error) {
    console.log(error.response.data);
  }

  //   if (response.status !== 200) router.push("/");
});

const submitForm = async () => {
  try {
    await pedidoStore.crearPedido(nombreUser.value, idUser.value, route.path);
  } catch (error) {
    throw error;
  }
};
</script>
