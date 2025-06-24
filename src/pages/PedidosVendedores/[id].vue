<template>
  <v-container>
    <v-card>
      <v-card-title class="text-h6">Listado de Productos</v-card-title>
      <v-card-text class="overflow-x-auto">
        <v-table class="w-full min-w-600 border-collapse">
          <thead class="s">
            <tr>
              <th class="p-2 text-left">Género</th>
              <th class="p-2 text-left">Marca</th>
              <th class="p-2 text-left">Precio Venta</th>
              <th class="p-2 text-left">Referencia</th>
              <th class="p-2 text-left">Talla</th>
              <th class="p-2 text-left">Color</th>
              <th class="p-2 text-left">Estado</th>

              <th class="p-2 text-left">Acciones</th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" class="border-b">
              <td class="p-2">{{ item.genero }}</td>
              <td class="p-2">{{ item.marca }}</td>
              <td class="p-2">${{ item.precioVenta.toFixed(2) }}</td>
              <td class="p-2">{{ item.referencia }}</td>
              <td class="p-2">{{ item.talla }}</td>
              <td class="p-2">{{ item.color }}</td>
                <td class="p-2">
                    <v-chip color="green" text-color="white" class="ma-1">
                    Aprobado
                    </v-chip>
                </td>
              <td ><v-btn icon="mdi-check-circle-outline" color="green"></v-btn> <v-btn  icon="mdi-close-thick" color="red" ></v-btn></td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  {
    genero: 'Hombre',
    marca: 'Nike',
    precioVenta: 199.99,
    referencia: 'NK1234',
    talla: '42',
    color: 'Negro'
  },
  {
    genero: 'Mujer',
    marca: 'Adidas',
    precioVenta: 149.99,
    referencia: 'AD5678',
    talla: '38',
    color: 'Blanco'
  }
])
</script>

<style scoped>
.overflow-x-auto {
  overflow-x: auto;
}
.min-w-600 {
  min-width: 600px;
}
.border-b {
  border-bottom: 1px solid #e0e0e0;
}
</style>
