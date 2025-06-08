<template>
  <v-container>
    <v-form
      @submit.prevent="enviarFormulario()"
      ref="formRef"
      v-model="isValid"
    >
      <!-- INFO DEL PEDIDO -->
      <v-card class="pa-4 mb-4" elevation="2">
        <div class="d-flex justify-space-between">
          <v-card-title>Información del Pedido</v-card-title>
          <v-btn to="/Dashboard" prepend-icon="mdi-arrow-left" color="red">
            Regresar al home</v-btn
          >
        </div>

        <v-card-text>
          <v-text-field
            v-model="pedidoStore.pedidoObj.fechaPedido"
            label="Fecha del Pedido"
            type="datetime-local"
            required
            :rules="[rules.required]"
          />

          <v-textarea
            v-model="pedidoStore.notas"
            label="Deja una nota aqui (opcional)"
          ></v-textarea>
          <!-- <v-text-field
            v-model="pedidoStore.cantidadZapatos"
            label="Cantidad de Zapatos (pares totales)"
            type="number"
            required
            :rules="[rules.required]"
          /> -->
          <!-- <v-text-field
            v-model="pedidoStore.total"
            label="Total del Pedido"
            type="number"
            :rules="[rules.required]"
          /> -->
        </v-card-text>
      </v-card>

      <!-- COMPRADORES -->
      <v-card class="pa-4 mb-4" elevation="2">
        <div v-if="pedidoStore.pedidoObj.compradores.length == 0">
          <v-card-title>
            Clientes
            <v-spacer></v-spacer>
            <v-btn icon @click="pedidoStore.agregarComprador">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
        </div>

        <v-card-text>
          <v-container
            v-for="(comprador, index) in pedidoStore.pedidoObj.compradores"
            :key="index"
            class="border rounded pa-3 mb-4"
          >
            <div v-if="pedidoStore.pedidoObj.compradores.length != 0">
              <div class="d-flex justify-space-between">
                <v-card-title>
                  Cliente #{{ index + 1 }}
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-btn @click="pedidoStore.eliminarCliente(index)" color="red">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>

            <v-row dense>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.nombre"
                  label="Nombre"
                  required
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.telefonoPersona"
                  label="Teléfono"
                  required
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.direccionPersona"
                  label="Dirección"
                  required
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.documentoPersona"
                  label="Documento"
                  required
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.cantidadZapatos"
                  label="Cantidad Zapatos"
                  type="number"
                  required
                  :rules="[rules.required]"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.abono"
                  label="Abono"
                  type="number"
                  :rules="[rules.required]"
                />
              </v-col>
              <!-- <v-col cols="12" md="6">
                <v-switch v-model="comprador.pago" label="Pago realizado" />
              </v-col> -->
              <!-- <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.total"
                  label="Total a pagar"
                  type="number"
         

                />
              </v-col> -->
            </v-row>

            <!-- ZAPATOS -->
            <v-divider class="my-3" />
            <v-card-title class="text-subtitle-1">
              Cantidad de zapatos del cliente
              {{ pedidoStore.pedidoObj.compradores[index].cantidadZapatos }}
              <v-spacer></v-spacer>
              <v-btn icon @click="pedidoStore.agregarZapato(index)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-card-title>

            <div
              v-if="pedidoStore.pedidoObj.compradores[index].cantidadZapatos"
            >
              <v-container
                v-for="(zapato, zIndex) in comprador.zapatos"
                :key="zIndex"
                class="border rounded pa-2 mb-2"
              >
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="zapato.modelo"
                      label="Modelo"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.talla"
                      label="Talla EUR"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="zapato.color"
                      label="Color"
                      required
                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.precio"
                      label="Precio Venta"
                      type="number"
                    />
                  </v-col>
                  <!-- <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.cantidad"
                      label="Cantidad"
                      type="number"
                    />
                  </v-col> -->
                </v-row>
              </v-container>
            </div>
          </v-container>
        </v-card-text>
      </v-card>

      <div class="d-flex ga-3">
        <v-btn type="submit" color="primary" :disabled="!isValid"
          >Enviar Pedido</v-btn
        >
        <v-btn
          v-if="pedidoStore.pedidoObj.compradores.length != 0"
          @click="pedidoStore.agregarComprador"
        >
          <v-icon>mdi-plus</v-icon>
          Agregar otro cliente
        </v-btn>
      </div>
    </v-form>
    <SnackBarComponent></SnackBarComponent>
  </v-container>
</template>

<script setup>
import { usePedidosStore } from "@/stores/Pedidos";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const pedidoStore = usePedidosStore();
import { useUserLoginStore } from "@/stores/userLogin";
import { useRouter } from "vue-router";
const { getMe } = useUserLoginStore();
// watch(mensaje, (nuevoValor) => {
//   console.log(nuevoValor);
// });

const rules = {
  required: (v) => !!v || "Campo obligatorio",
};

const isValid = ref(false);
const formRef = ref();
const nombreUser = ref("");
const idUser = ref("");

onMounted(async () => {
  try {
    const response = await getMe();
    const nombre =  response.data.first_name
    const apellido =  response.data.last_name
    nombreUser.value = nombre+apellido
    idUser.value = response.data.id
  } catch (error) {
    console.log(error.response.data.first_name);
  }

  //   if (response.status !== 200) router.push("/");
});



const enviarFormulario = async () => {
  const valid = await formRef.value?.validate();
  console.log("el formulario no es valido");

  if (!valid) return;
  try {
    const response = await pedidoStore.crearPedido(nombreUser.value, idUser.value);
    return;
  } catch (error) {
    console.error("Error al enviar pedido:", error);
    alert("Hubo un error al enviar el pedido");
  }
};
</script>
