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
            <v-btn icon @click="verClientes = true">
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
              <!-- <v-col cols="12" md="6">
                <v-text-field
                  v-model="comprador.cantidadZapatos"
                  label="Cantidad Zapatos"
                  type="number"
                  required
                  :rules="[rules.required]"
                />
              </v-col> -->
        
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
              {{ pedidoStore.pedidoObj.compradores[index].productos.length }}
              <v-spacer></v-spacer>
              <v-btn
                color="green"
                @click="(verModalCarrito = true), (indexCliente = index)"
              >
                <v-icon>mdi-plus</v-icon>
                agregar zapato
              </v-btn>
            </v-card-title>

            <div>
              <v-container
                v-for="(zapato, zIndex) in pedidoStore.pedidoObj.compradores[
                  index
                ].productos"
                :key="zIndex"
                class="border rounded pa-2 mb-2"
              >
              <div class="d-flex justify-end">
                  <v-btn @click="pedidoStore.eliminarZapatoCliente(zIndex,index)" icon="mdi-delete" color="red">
              
                </v-btn>
              </div>
         
                <v-row dense>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="zapato.genero"
                      label="Genero"
                      required
                      :value="zapato.genero"
                      readonly="true"
                      variant="outlined"

                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.talla"
                      label="Talla EUR"
                      required
                      :value="zapato.talla"
                      readonly="true"
                      variant="outlined"

                    />
                  </v-col>
                  <!-- <v-col cols="12" md="3">
                    <v-text-field
                      v-model="zapato.color"
                      label="Color"
                      required
                      :value = zapato.talla

                    />
                  </v-col> -->
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.precioVenta"
                      label="Precio Venta"
                      type="number"
                      :value="zapato.precioVenta"
                      readonly="true"
                      variant="outlined"

                    />
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field
                      v-model="zapato.marca"
                      label="Marca zapato"
                      :value="zapato.marca"
                      readonly="true"
                      variant="outlined"

                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="zapato.referencia"
                      label="Referencia"
                      :value="zapato.referencia"
                      readonly="true"
                      variant="outlined"

                    />
                  </v-col>
                </v-row>
              </v-container>
            </div>
          </v-container>
        </v-card-text>
      </v-card>

      <section>
        <v-dialog v-model="verModalCarrito" max-width="500">
          <v-card>
            <v-card-title v-if="carrito.length > 0" class="text-h6">
              Pedido actual:
            </v-card-title>
            <v-card-title v-else class="text-h6">
              Aun no tienes nada en el carrito:
            </v-card-title>

            <v-card-text v-for="(item, index) in carrito" :key="index">
              <v-card class="bg-white pa-2">
                <v-row dense>
                  <v-col cols="12">
                    <strong>Género:</strong> {{ item.genero }}
                  </v-col>
                  <v-col cols="12">
                    <strong>Marca:</strong> {{ item.marca }}
                  </v-col>
                  <v-col cols="12">
                    <strong>Referencia:</strong>
                    {{ item.referencia }}
                  </v-col>

                  <v-col cols="12">
                    <strong>Talla:</strong> {{ item.talla }} EUR
                  </v-col>

                  <v-col cols="12">
                    <strong>Precio:</strong> ${{
                      item.precioVenta.toLocaleString()
                    }}
                  </v-col>
                </v-row>
                <div class="d-flex justify-end">
                  <v-btn
                    @click="eliminarProducto(item)"
                    color="green d-flex justify-end"
                    >asignar a este cliente</v-btn
                  >
                </div>
              </v-card>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="grey-darken-1"
                @click="verModalCarrito = false"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </section>

       <section>
        <v-dialog v-model="verClientes" max-width="500">
          <v-card>
            <v-card-title v-if="listClientes?.length > 0" class="text-h6">
              Clientes disponibles:
            </v-card-title>
            <v-card-title v-else class="text-h6">
              Aun no tienes clientes, registralos para poder realizar perdidos
            </v-card-title>

            <v-card-text v-for="(item, index) in listClientes" :key="index">
              <v-card class="bg-white pa-2">
                <v-row dense>
                  <v-col cols="12">
                    <strong>Nombre:</strong> {{ item.nombre }}
                  </v-col>
                
                </v-row>
                <div class="d-flex justify-end">
                  <v-btn
                    @click="agregarComprador(item)"
                    color="green d-flex justify-end"
                    >Agregar este cliente</v-btn
                  >
                </div>
              </v-card>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                text
                color="grey-darken-1"
                @click="verClientes = false"
              >
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </section>

      <div class="d-flex ga-3">
        <v-btn type="submit" color="primary" v-if="pedidoStore.pedidoObj.compradores.length !=0" :disabled="!isValid"
          >Enviar Pedido</v-btn
        >
        <v-btn
          v-if="pedidoStore.pedidoObj.compradores.length != 0"
          @click="verClientes = true"
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
import { onMounted, ref } from "vue";
import { useUserLoginStore } from "@/stores/Userlogin";
import { useRoute } from "vue-router";
import { useInventarioStore } from "@/stores/Inventario";
const userLoginStore = useUserLoginStore();


const {listClientes} = storeToRefs(userLoginStore);
const {clientesByVendedor} = userLoginStore;
// watch(mensaje, (nuevoValor) => {
//   console.log(nuevoValor);
// });

const pedidoStore = usePedidosStore();
const {agregarComprador} = pedidoStore;
const indexCliente = ref();
const inventarioStore = useInventarioStore();
const verModalCarrito = ref(false);
const { carrito } = storeToRefs(inventarioStore);


const  verClientes = ref(false);

const route = useRoute();
const rules = {
  required: (v) => !!v || "Campo obligatorio",
};

const isValid = ref(false);
const formRef = ref();
const nombreUser = ref("");
const idUser = ref("");

const eliminarProducto = (item) => {
  // console.log("obj: ",item)
  // console.log("indice del cliente:",indexCliente.value)
  pedidoStore.agregarZapato(indexCliente.value, route.path, item);

  // carrito.value.splice(index, 1);
};

onMounted(async () => {
  try {
    const response = await userLoginStore.getMe();

    clientesByVendedor(response.data.id);

    if (response.status !== 200) route.push("/");

    console.log(response.data)
    const nombre = response.data.first_name;
    const apellido = response.data.last_name;
    nombreUser.value = nombre + apellido;
    idUser.value = response.data.id;
  } catch (error) {
    console.log(error.response)
    // if (error.response.status !== 200) route.push("/");
  }

  //   if (response.status !== 200) router.push("/");
});

const enviarFormulario = async () => {
  const valid = await formRef.value?.validate();

  if (!valid) return;
  try {
   let pedido = await pedidoStore.crearPedido(nombreUser.value, idUser.value, route.path);
    console.log(pedido)
    if (pedido) inventarioStore.carrito = []
  } catch (error) {
    console.error("Error al enviar pedido:", error.response.data);
    alert("Hubo un error al enviar el pedido");
  }
};
</script>
