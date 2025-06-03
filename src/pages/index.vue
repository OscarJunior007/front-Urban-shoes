<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card class="pa-6" width="400" elevation="12" rounded="xl">
      <v-card-title class="text-h5 font-weight-bold text-center mb-4">Iniciar sesión</v-card-title>

      <v-form @submit.prevent="handleSubmit" v-model="isValid" ref="formRef">
        <v-text-field
          v-model="loginStore.objLogin.username"
          label="Correo"
          prepend-inner-icon="mdi-account"
          :rules="[rules.required]"
          variant="outlined"
          rounded
          density="comfortable"
        ></v-text-field>

        <v-text-field
          v-model="loginStore.objLogin.password"
          label="Contraseña"
          prepend-inner-icon="mdi-lock"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :rules="[rules.required]"
          variant="outlined"
          rounded
          density="comfortable"
        ></v-text-field>

        <v-btn
          type="submit"
          :loading="loginStore.loading"
          color="primary"
          block
          class="mt-4"
          rounded="xl"
          :disabled="!isValid" 
        >
          Ingresar
        </v-btn>
      </v-form>
      <AlertComponent />
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUserLoginStore } from '@/stores/userLogin'
import { useErrorSuccessStore } from '@/stores/ErrorSucces'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import AlertComponent from '@/components/AlertComponent.vue'
import { useRouter } from 'vue-router'
const loginStore = useUserLoginStore()
const errorSuccessStore = useErrorSuccessStore()

onMounted(() => {
  errorSuccessStore.clearMessages()
})

const isValid = ref(false)
const formRef = ref()

const showPassword = ref(false)

const rules = {
  required: (v: string) => !!v || 'Este campo es obligatorio',
}
const router = useRouter() 
const handleSubmit = async () => {
  const valid = await formRef.value?.validate()
  if (!valid) return

  errorSuccessStore.clearMessages()

  try {
    await loginStore.login()
    router.push('/Dashboard')  
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 404) {
        errorSuccessStore.setError('Ese correo no está registrado')
      } else if (status === 500) {
        errorSuccessStore.setError('Error del servidor, intente más tarde')
      } else if (status === 401) {
        errorSuccessStore.setError('Contraseña incorrecta')
      }
      else {
        errorSuccessStore.setError('Error desconocido')
      }
    } else {
      errorSuccessStore.setError('Ocurrió un error inesperado')
    }
  } 
}

</script>
