<template>
  <MenuComponent />
  <v-container fluid>
    <v-row
      justify="space-between"
      align="center"
      class="mb-6 mt-4 d-none d-md-flex justify-end align-center mr-4"
    >
      <h5 class="text-h5 font-weight-bold ml-3">Gestión de Usuarios</h5>
      <v-btn @click="dialog = true" color="primary" class="text-capitalize mr-3"
        >Agregar Nuevo Usuario</v-btn
      >
    </v-row>

    <!-- <div
      class="d-none d-md-flex justify-end align-center mr-4"
      style="height: 100%; width: 30%; gap: 10px"
    >
      <h5 class="text-h5 font-weight-bold ml-3">Gestión de Usuarios</h5>
      <v-btn color="primary" class="text-capitalize mr-3"
        >Agregar Nuevo Usuario</v-btn
      >
    </div> -->

    <div class="d-flex d-md-none justify-end align-center mr-3">
      <h5 class="text-h5 font-weight-bold ml-3">Gestión de Usuarios</h5>
      <v-btn
        style="width: 180px; height: 70px"
        color="primary"
        class="text-capitalize mr-3 mb-3"
        @click="dialog = true"
        >Agregar Nuevo Usuario</v-btn
      >
    </div>

    <SkeletonComponent v-if="skeletonActive" type="table" />
    <v-card v-show="!skeletonActive" class="rounded-lg bg-white">
      <v-table>
        <thead>
          <tr>
            <th>USUARIO</th>
            <th>EMAIL</th>
            <th>ROL</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user?.id">
            <td class="d-flex align-center py-4">
              <v-avatar size="40" color="blue" class="me-4">
                <span class="text-white text-subtitle1">{{
                  user.first_name.charAt(0)
                }}</span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ user.first_name }}</div>
                <div class="text-caption text-grey-darken-1">
                  {{ user.rol }}
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <v-chip
                :color="user.rol == 'ADMIN' ? 'blue' : 'yellow'"
                variant="tonal"
                size="small"
              >
                {{ user.rol }}
              </v-chip>
            </td>

            <td>
              <v-chip
                :color="user.estado == 'ACTIVO' ? 'green' : 'red'"
                variant="tonal"
                size="small"
              >
                {{ user.estado }}
              </v-chip>
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
          <v-form ref="formRef" v-model="isValid">
            <v-text-field
              label="Correo electrónico"
              v-model="objUserRegister.email"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              label="Contraseña"
              v-model="objUserRegister.password"
              :rules="[rules.required]"
            />
            <v-select
              label="Rol"
              v-model="loginStore.objUserRegister.rol"
              :items="['ADMIN', 'VENDEDOR']"
              :rules="[rules.required]"
            />
            <v-text-field label="Nombre" v-model="objUserRegister.first_name" />
            <v-text-field
              label="Apellido"
              v-model="objUserRegister.last_name"
            />
            <v-select
              label="Estado"
              v-model="objUserRegister.estado"
              :items="['ACTIVO', 'INACTIVO']"
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
        <v-btn text @click="dialog = false">Cancelar</v-btn>
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
import { useUserLoginStore } from "@/stores/userLogin";
import { useErrorSuccessStore } from "@/stores/ErrorSucces";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const skeletonActive = ref(false);
const dialog = ref(false);
const isValid = ref(false);
const formRef = ref();

const errorSuccessStore = useErrorSuccessStore();

const loginStore = useUserLoginStore();

const { objUserRegister, userList } = storeToRefs(loginStore);

const rules = {
  required: (v: string) => !!v || "Campo obligatorio",
  email: (v: string) => /.+@.+\..+/.test(v) || "Email inválido",
};

const submit = async () => {
  const valid = await formRef.value?.validate();
  if (!valid) return;

  skeletonActive.value = true; // Activa el skeleton

  try {
    const response = await loginStore.register();
    if (response.status === 201) {
      errorSuccessStore.setSuccess("Usuario registrado exitosamente");
      await loginStore.getAllUsers();
    } else {
      errorSuccessStore.setError(
        "Error al registrar usuario: " + response.data.detail
      );
    }
    console.log("Usuario registrado:", response);
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
  } finally {
    skeletonActive.value = false; 
  }
};

onMounted(async () => {
  try {
    const dataUser = await loginStore.getMe();

    console.log("Datos del usuario:", dataUser);
    if (dataUser.status !== 200) router.push("/");

    // await loginStore.getAllUsers();
    // skeletonActive.value = false;
  } catch (error) {
    router.push("/");

    errorSuccessStore.setError("Error al obtener usuarios");
  }
});
</script>

<style scoped>
s .v-table thead th {
  font-weight: 600;
  font-size: 14px;
  color: #666;
}
.v-table tbody td {
  font-size: 14px;
}
</style>
