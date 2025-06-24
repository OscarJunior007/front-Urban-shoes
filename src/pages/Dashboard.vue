<template>
  <MenuComponent />

  <v-container fluid>
    <v-row class="justify-center align-center" dense>
      <v-col
       
      >
        <v-card class="mb-4 bg-white" height="140" style="width: 100%">
          <v-card-text>
            <v-card-subtitle>Ingresos totales</v-card-subtitle>
            <strong>
              <span class="ml-4 text-h5">1.000.000</span>
            </strong>
          </v-card-text>
        </v-card>
      </v-col>

        <v-col
       
      >
        <v-card class="mb-4 bg-white" height="140" style="width: 100%">
          <v-card-text>
            <v-card-subtitle>Usuarios activos</v-card-subtitle>
            <strong>
              <span class="ml-4 text-h5">{{ totalUsersActivos }}</span>
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
import { useUserLoginStore } from "@/stores/Userlogin";
import { useRouter } from 'vue-router'
import { storeToRefs } from "pinia";
const display = useDisplay();
const router = useRouter();
const loginStore = useUserLoginStore(); 

const {totalUsersActivos} = storeToRefs(loginStore);


const cards = [
  { title: "Ingresos totales", value: "$1.000.000" },
  { title: "Ordenes totales", value: "100" },


];

onMounted(async ()  => {
  try{


   const dataUser =  await loginStore.getMe();
   loginStore.getAllUsers();
   console.log("Datos del usuario:", dataUser);
       if (dataUser.status !== 200 || dataUser.data.rol != "ADMIN") router.push("/");

    
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