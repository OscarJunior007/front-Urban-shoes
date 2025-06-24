<template>
  <MenuComponent></MenuComponent>

  <v-container>
    <section class="d-flex justify-space-between align-center">
      <v-col cols="auto">
        <h5 class="text-h5 font-weight-bold ml-3 mb-0">
          Productos disponibles
        </h5>
      </v-col>
      <div>
        <v-btn @click="verModalCarrito = true">
          <v-badge
            v-bind:dot="carrito.length == 0"
            floating
            color="red"
            :content="carrito.length"
          >
            <v-icon size="x-large"> mdi-cart</v-icon>
          </v-badge>
        </v-btn>
      </div>
    </section>

    <section class="py-8" style="width: 100%">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- <aside class="lg:w-1/4">
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-lg font-semibold mb-4 text-gray-900">Filtrar Productos</h3>
                        
                    
                        <div class="mb-6">
                            <h4 class="font-medium mb-3 text-gray-800">Categoría</h4>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2">
                                    <span class="text-gray-700">Zapatillas (12)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2">
                                    <span class="text-gray-700">Botas (8)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2">
                                    <span class="text-gray-700">Zapatos Casuales (15)</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="checkbox" class="mr-2">
                                    <span class="text-gray-700">Sandalias (6)</span>
                                </label>
                            </div>
                        </div>
                     
                        <div class="mb-6">
                            <h4 class="font-medium mb-3 text-gray-800">Rango de Precio</h4>
                            <div class="space-y-2">
                                <label class="flex items-center">
                                    <input type="radio" name="precio" class="mr-2">
                                    <span class="text-gray-700">Menos de 50€</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="precio" class="mr-2">
                                    <span class="text-gray-700">50€ - 100€</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="precio" class="mr-2">
                                    <span class="text-gray-700">100€ - 150€</span>
                                </label>
                                <label class="flex items-center">
                                    <input type="radio" name="precio" class="mr-2">
                                    <span class="text-gray-700">Más de 150€</span>
                                </label>
                            </div>
                        </div>
                        
         
                        <div class="mb-6">
                            <h4 class="font-medium mb-3 text-gray-800">Talla</h4>
                            <div class="grid grid-cols-3 gap-2">
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">38</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">39</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">40</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">41</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">42</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">43</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">44</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">45</button>
                                <button class="border border-gray-300 py-1 px-2 text-sm hover:bg-blue-600 hover:text-white transition">46</button>
                            </div>
                        </div>
                    </div>
                </aside> -->

          <!-- Grid principal de productos -->
          <main class="lg:w-3/4" style="width: 100%">
            <!-- Barra de ordenación -->
            <h1 class="ml-4 text-h5 md:ml-8 md:text-h4">Filtros</h1>
            <div
              class="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row gap-4 md:justify-between md:items-center w-full"
            >
              <v-text-field
                variant="outlined"
                prepend-icon="mdi-magnify"
                label="Buscar productos"
                v-model="nombreZapato"
                class="w-full md:w-1/2"
              ></v-text-field>

              <v-select
                :items="['Nike', 'Adidas', 'Puma', 'Reebok']"
                label="Marca"
                variant="outlined"
                v-model="filtroMarca"
                clearable
                class="w-full md:w-1/2"
              ></v-select>
            </div>

            <!-- Grid de productos -->
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <!-- Producto 1 -->
              <div
                v-for="(item, index) in dataFiltrada"
                :key="index"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <!-- box para la imagen -->
                <div
                  class="h-64 bg-gray-200 flex items-center justify-center relative"
                >
                  <!-- <i class="fas fa-shoe-prints text-6xl text-gray-400"></i> -->
                  <v-img cover :src="item.imagenes[0]"> </v-img>
                  <!-- <span class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs rounded">-20%</span> por si en algun momento se le pone descuento -->
                </div>

                <div class="p-4">
                  <h3 class="font-semibold mb-2 text-gray-900">
                    {{ item.marca }} ({{ item.genero }})
                  </h3>
                  <p class="text-sm text-gray-600 mb-3">
                    {{ item.referencia }}
                  </p>
                  <div class="flex justify-between items-center">
                    <div>
                      <span class="text-lg font-bold text-blue-600"
                        >${{ item.precioVenta }}</span
                      >
                      <!-- <span class="text-sm text-gray-500 line-through ml-2">129€</span> -->
                    </div>
                    <button
                      @click="activarModal(item)"
                      class="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition"
                    >
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Paginación -->
            <!-- <div class="mt-8 flex justify-center">
              <nav class="flex space-x-2">
                <button
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Anterior
                </button>
                <button class="px-3 py-2 bg-blue-600 text-white rounded">
                  1
                </button>
                <button
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  2
                </button>
                <button
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  3
                </button>
                <button
                  class="px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
                >
                  Siguiente
                </button>
              </nav>
            </div> -->
          </main>
        </div>
      </div>
    </section>

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
                  <strong>Color:</strong> {{ item.color }}
                </v-col>

                <v-col cols="12">
                  <strong>Precio:</strong> ${{
                    item.precioVenta.toLocaleString()
                  }}
                </v-col>
              </v-row>
              <div class="d-flex justify-end">
                <v-btn
                  @click="eliminarProducto(index)"
                  color="red d-flex justify-end"
                  >eliminar</v-btn
                >
              </div>
            </v-card>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="grey-darken-1" @click="verModalCarrito = false">
              Cancelar
            </v-btn>
            <v-btn
              color="primary"
              v-if="inventarioStore.carrito.length != 0"
              @click="confirmarPedido()"
            >
              Crear pedido
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>

    <section>
      <v-dialog v-model="verModal" max-width="500">
        <v-card>
          <v-card-title class="text-h6">
            Selecciona talla y color
          </v-card-title>

          <v-card-text>
            <!-- Selección de Tallas -->
            <div class="mb-4">
              <p class="font-weight-medium mb-2">Tallas disponibles:</p>

              <v-btn-toggle v-model="tallaSeleccionada" mandatory>
                <v-btn
                  v-for="(talla, index) in productoSeleccionado.talla"
                  :key="talla[index]"
                  :value="talla"
                  class="ma-1"
                  color="gray"
                  variant="outlined"
                >
                  {{ talla }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-card-text>

          <v-card-text>
            <!-- Selección de color -->
            <div class="mb-4">
              <p class="font-weight-medium mb-2">Colores disponibles:</p>

              <v-btn-toggle v-model="colorSeleccionado" mandatory>
                <v-btn
                  v-for="(color, index) in productoSeleccionado.color"
                  :key="color[index]"
                  :value="color"
                  class="ma-1"
                  color="gray"
                  variant="outlined"
                >
                  {{ color }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey-darken-1" text @click="verModal = false">
              Cancelar
            </v-btn>
            <v-btn color="primary" @click="agregarCarrito()"> Confirmar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </section>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useInventarioStore } from "@/stores/Inventario";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { computed } from "vue";
import { watch } from "vue";
const verModal = ref(false);
const inventarioStore = useInventarioStore();
const tallaSeleccionada = ref("");
const colorSeleccionado = ref("");

const productoSeleccionado = ref<any>(null);
const verModalCarrito = ref(false);
const { carrito } = storeToRefs(inventarioStore);
const router = useRouter();

const nombreZapato = ref("");
const filtroMarca = ref("");

// watch(
//   () => filtroMarca.value,
//   (newValue) => {
//     console.log("Carrito actualizado:", newValue);
//   },
//   { deep: true }
// );

const dataFiltrada = computed(() => {
  // if (!nombreZapato.value) {
  //   return inventarioStore.inventario;
  // }
  return inventarioStore.inventario?.filter(
    (item) =>
      item.referencia
        .toLowerCase()
        .includes(nombreZapato.value.toLowerCase()) &&
      (!filtroMarca.value ||
        item.marca.toLowerCase() === filtroMarca.value.toLowerCase())
  );
});

const activarModal = (obj: any) => {
  console.log("se activa metodo");
  productoSeleccionado.value = { ...obj };
  tallaSeleccionada.value = "";
  colorSeleccionado.value = "";
  verModal.value = true;
};

const eliminarProducto = (index:number) => {
  carrito.value.splice(index, 1);
};

const confirmarPedido = () => {
  router.push("/RealizarPedido");
};

const agregarCarrito = () => {
  if (!tallaSeleccionada.value) {
    alert("Por favor selecciona una talla");
    return;
  }

  if (!colorSeleccionado.value) {
    alert("Por favor selecciona un color");
    return;
  }
  const { genero, marca, referencia, precioVenta } = productoSeleccionado.value;
  const productoConTalla = {
    genero,
    marca,
    referencia,
    precioVenta,
    talla: tallaSeleccionada.value,
    color: colorSeleccionado.value,
  };
  if (Array.isArray(inventarioStore.carrito)) {
    inventarioStore.carrito.push(productoConTalla);
  }
  console.log(carrito.value);
  verModal.value = false;
};

onMounted(async () => {
  const error = await inventarioStore.getInventario();
  console.log("se ejecuto el onMounted");
});
</script>

<style>
</style>