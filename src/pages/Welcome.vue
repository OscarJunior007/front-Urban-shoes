<template>
  <MenuComponent></MenuComponent>
  <v-container class="d-flex justify-center" fluid>
    <div class="text-center">
      <div class="logo">
        <v-img class="mb-4" height="350" src="@/assets/LogoUrban.webp" />
      </div>
      <h1>¡Bienvenido a Elite Urban Shoes!</h1>
      <p>
        Esta es nuestra plataforma de negocios, donde podras realizar tus
        pedidos, si tienes alguna duda, no dudes en contactarnos!
      </p>
      <v-btn variant="outlined" color="success" class="mt-5">
        Ingresar al grupo
        <v-icon icon="mdi-whatsapp" end></v-icon>
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import MenuComponent from "@/components/MenuComponent.vue";
import {onMounted} from "vue";
import { useRouter } from 'vue-router'
import { useUserLoginStore } from "@/stores/userLogin";
const loginStore = useUserLoginStore(); 
const router = useRouter();


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
body {
  background: linear-gradient(135deg, #ff6a00, #ee0979);
  color: #fff;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* .logo {
  width: 150px;
  height: 150px;
  background-color: #ffffff33;
  border: 2px dashed #fff;
  border-radius: 50%;
  margin: 0 auto 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
} */

h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  font-size: 1.2rem;
  margin-top: 10px;
}
</style>