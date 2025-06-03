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

    <v-row class="mb-4 mt-6 justify-space-between" dense>
      <v-col cols="12" sm="6" md="6" class="d-flex">
        <v-card class="mb-4 bg-white" height="300" style="width: 100%">
          <v-card-text class="pa-0" style="height: 100%">
            <GraficaZapatos />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="6" class="d-flex">
        <v-card class="mb-4 bg-white" height="300" style="width: 100%">
          <v-card-text>
            <strong>
              <span class="ml-4 text-h5">Vendedores con más ventas</span>
            </strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from "vuetify";
import {onMounted} from "vue";
import {useUserLoginStore} from "@/stores/userLogin"; 
import { useRouter } from 'vue-router'

const display = useDisplay();
const router = useRouter();
const loginStore = useUserLoginStore(); 

const cards = [
  { title: "Ingresos totales", value: "$1.000.000" },
  { title: "Ordenes totales", value: "100" },
  { title: "Vendedores activos", value: "15" },
];

onMounted(async ()  => {
  try{


   const dataUser =  await loginStore.getMe();
   
   console.log("Datos del usuario:", dataUser);
   if (dataUser.status !== 200) router.push("/");
    
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    router.push("/");
  }
});
</script>

<style scoped>
span {
  font-weight: bold;
}
</style>