<template>
  <div class="fill-height bg-white">
    <v-layout class="fill-height">
      <v-navigation-drawer
        v-model="appStore.drawer"
        class="bg-white"
        theme="dark"
        :permanent="!isMobile"
        :temporary="isMobile"
        :elevation="2"
        app
      >
        <div
          class="bg-blue d-flex justify-center align-center v-col-auto"
          style="height: 10%"
        >
          <strong> <span> ELITE SHOES </span></strong>
        </div>
        <v-list class="pa-4" density="compact" nav>
          <v-list-item
            prepend-icon="mdi-monitor-dashboard"
            title="Dashboard"
            value="myfiles"
            @click="redireccionar('/Dashboard')"
            class="btn-navigation"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-account-group"
            title="Usuarios"
            value="shared"
       
            v-if="objUser?.rol === 'ADMIN'"
            @click="redireccionar('/Usuarios')"
            class="btn-navigation"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-truck-outline"
            title="Proveedores"
            value="starred"
            v-if="objUser?.rol === 'ADMIN'"

            @click="redireccionar('/Proveedores')"
            class="btn-navigation"
          ></v-list-item>
          <v-list-item
            prepend-icon="mdi-cash-multiple"
            title="Gastos"
            value="gastos"
            v-if="objUser?.rol === 'ADMIN'"

            @click="redireccionar('/Gastos')"
            class="btn-navigation"
          ></v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-btn @click="logout" append-icon="mdi-logout" block color="red" variant="outlined"
              >Logout</v-btn
            >
          </div>
        </template>
      </v-navigation-drawer>

      <div class="d-flex flex-column fill-height" style="width: 100%">
        <v-main class="no-padding-main fill-height">
          <div class="main-content-center fill-height">
            <router-view />
          </div>
        </v-main>
      </div>
    </v-layout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import { useAppStore } from "@/stores/app";
import { useUserLoginStore } from "@/stores/userLogin";
import {storeToRefs} from "pinia";
const router = useRouter();
const appStore = useAppStore();
const loginStore = useUserLoginStore(); 
const { objUser } = storeToRefs(loginStore);

const logout = () => {
  loginStore.logout(router);

};



const isMobile = ref(window.innerWidth < 960);

const handleResize = () => {
  isMobile.value = window.innerWidth < 960;
  if (isMobile.value) appStore.setDrawer(false);
  else appStore.setDrawer(true);
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  handleResize();
});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

const redireccionar = (ruta: string) => {
  router.push(ruta);
};
</script>

<style scopd>
.btn-navigation:hover {
  background-color: #e3f2fd !important;
  border-right: 3px solid #0d47a1 !important;
  color: #0d47a1 !important;
}

.no-padding-main {
  padding: 0 !important;
}
.v-list-item--active {
  background-color: #e3f2fd !important;
  border-right: 3px solid #0d47a1 !important;
  color: #0d47a1 !important;
}
.main-content-center {
  display: flex;
  height: 100%;
  min-height: 100%;
  width: 100%;
  min-width: 100%;
}
</style>