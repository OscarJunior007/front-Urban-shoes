<template  >
  <MenuComponent />

  <v-container
    fluid
    class="d-flex flex-column"
    style="height: 100%; width: 100%"
  >
    <section class="d-flex justify-space-evenly align-center flex-wrap">
      <v-card width="200px" height="100px" class="mb-4 bg-white">
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text>
          <v-card-subtitle> Ingresos totales </v-card-subtitle>
          <strong> <span class="ml-4 text-h5"> $1.000.000</span></strong>
        </v-card-text>
      </v-card>

      <v-card width="200px" height="100px" class="mb-4 bg-white">
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text>
          <v-card-subtitle> Pedidos del mes pasado </v-card-subtitle>
          <strong> <span class="ml-4 text-h5"> 5</span></strong>
        </v-card-text>
      </v-card>

      <v-card width="200px" height="100px" class="mb-4 bg-white">
        <v-card-subtitle> </v-card-subtitle>
        <v-card-text>
          <v-card-subtitle> Ingresos totales </v-card-subtitle>
          <strong> <span class="ml-4 text-h5"> $1.000.000</span></strong>
        </v-card-text>
      </v-card>
    </section>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>