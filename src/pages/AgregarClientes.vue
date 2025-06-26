<template>
  <MenuComponent></MenuComponent>
  <v-container fluid>
    <!-- Header y botón en desktop -->
    <v-row
      class="mb-6 mt-4 d-none d-md-flex"
      align="center"
      justify="space-between"
    >
      <v-col cols="auto">
        <h5 class="text-h5 font-weight-bold ml-3 mb-0">Gestionar clientes</h5>
      </v-col>
      <v-col cols="auto">
        <v-btn
          color="primary"
          @click="dialog = true"
          class="text-capitalize mr-3"
        >
          Agregar cliente
        </v-btn>
      </v-col>
    </v-row>

    <!-- Header y botón en mobile -->
    <v-row class="d-flex d-md-none mb-4" align="center" justify="space-between">
      <v-col cols="12" class="d-flex justify-space-between align-center">
        <h5 class="text-h6 font-weight-bold mb-0">Gestionar clientes</h5>
        <v-btn
          color="primary"
          class="text-capitalize ml-2"
          style="height: 40px"
          @click="dialog = true"
        >
          Agregar cliente
        </v-btn>
      </v-col>
    </v-row>

    <v-card class="rounded-lg bg-white">
      <v-table>
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>TELEFONO</th>
            <th>DIRECCION</th>
            <th>DOCUMENTO</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listClientes" :key="user?.id">
            <td class="d-flex align-center py-4">
              <v-avatar size="40" color="blue" class="me-4">
                <span class="text-white text-subtitle1">{{
                  user.nombre.charAt(0)
                }}</span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ user.nombre }}</div>
              </div>
            </td>
            <td>{{ user.telefonoPersona }}</td>
            <td>
              {{ user.direccionPersona }}
            </td>

            <td>
              {{ user.documentoPersona }}
            </td>
            <td>
              <v-btn variant="text" size="large" class="text-primary"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>

  <v-dialog v-show="dialog" v-model="dialog" max-width="600">
    <v-card>
      <div>
        <SkeletonComponent v-if="skeletonActive" type="text" />
        <SkeletonComponent v-if="skeletonActive" type="text" />
        <SkeletonComponent v-if="skeletonActive" type="text" />
        <SkeletonComponent v-if="skeletonActive" type="text" />
        <SkeletonComponent v-if="skeletonActive" type="text" />
        <SkeletonComponent v-if="skeletonActive" type="text" />
      </div>
      <div v-show="!skeletonActive">
        <v-card-title>Registrar Nuevo Usuario</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="submit" ref="formRef" v-model="isValid">
            <v-text-field
              label="Nombre completo"
              v-model="objClienteRegister.nombre"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Telefono"
              v-model="objClienteRegister.telefonoPersona"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Direccion"
              v-model="objClienteRegister.direccionPersona"
            
              :rules="[rules.required]"
            />
            <v-text-field
              label="Documento"
              v-model="objClienteRegister.documentoPersona"
              :rules="[rules.required]"
            />
          </v-form>
        </v-card-text>
      </div>

      <div>
        <AlertComponent />
      </div>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Cerrar ventana</v-btn>
        <v-btn color="success" @click="submit" :disabled="!isValid"
          >Guardar</v-btn
        >
      </v-card-actions>
      <v-divider></v-divider>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserLoginStore } from "@/stores/Userlogin";
import { useErrorSuccessStore } from "@/stores/ErrorSucces";
import { useRouter } from "vue-router";
const userLoginStore = useUserLoginStore();
const { objClienteRegister, createCliente,getMe,clientesByVendedor } = userLoginStore;
const { listClientes } = storeToRefs(userLoginStore);
const router = useRouter();
const isValid = ref(false);
const formRef = ref();
const errorSuccessStore = useErrorSuccessStore();
const dialog = ref(false);
const skeletonActive = ref(false);
const rules = {
  required: (v: string) => !!v || "Campo obligatorio",
};


const idVendedor = ref("undefined");

onMounted(async () => {
  skeletonActive.value = true;
  try {
    const dataUser = await getMe();

    dataUser.data.id
      ? (idVendedor.value = dataUser.data.id)
      : (idVendedor.value = "");

    await clientesByVendedor(idVendedor.value);
    skeletonActive.value = false;
  } catch (error) {
    console.error("Error al cargar los datos del usuario:", error);
    skeletonActive.value = false;
  }
});
const submit = async () => {
  const valid = await formRef.value?.validate();
  console.log("el formulario no es valido");
  if (!valid) return;

  //   skeletonActive.value = true;

  try {
    const response = await createCliente(idVendedor.value);
    if (response.status === 201) {
      errorSuccessStore.setSuccess("Cliente registrado exitosamente");
      setTimeout(() => {
        dialog.value = false;
        window.location.reload();
      }, 1000);
    } else {
      errorSuccessStore.setError(
        "Error al registrar usuario: " + response.data.detail
      );
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      errorSuccessStore.setError(
        "Error al registrar usuario: " + error.response.data.detail
      );
    } else {
      errorSuccessStore.setError(
        "Error al registrar usuario: " +
          (error.response?.data?.detail || "Error desconocido")
      );
    }
    console.error("Error al registrar usuario:", error);
  }
};
</script>

<style>
</style>