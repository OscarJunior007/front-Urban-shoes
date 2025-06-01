<template>
  <MenuComponent />

  <v-container fluid>
    <v-row class="justify-center align-center" dense>
      <v-col
        v-for="(card, i) in cards"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        class="d-flex"
      >
        <v-card class="mb-4 bg-white" height="140" style="width: 100%">
          <v-card-text>
            <v-card-subtitle>{{ card.title }}</v-card-subtitle>
            <strong>
              <span class="ml-4 text-h5">{{ card.value }}</span>
            </strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const cards = [
  { title: "Gastos del mes", value: "$1.000.000" },
  { title: "Presupuesto del mes", value: "5" },
  { title: "Ingresos totales", value: "$1.000.000" },
];
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>