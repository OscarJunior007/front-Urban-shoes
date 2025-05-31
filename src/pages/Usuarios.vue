<template>
  <MenuComponent />
  <v-container fluid>
    <v-row
      justify="space-between"
      align="center"
      class="mb-6 mt-4 d-none d-md-flex justify-end align-center mr-4"
    >
      <h5 class="text-h5 font-weight-bold ml-3">Gestión de Usuarios</h5>
      <v-btn color="primary" class="text-capitalize mr-3"
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
        >Agregar Nuevo Usuario</v-btn
      >
    </div>

    <v-card class="rounded-lg bg-white">
      <v-table>
        <thead>
          <tr>
            <th>USUARIO</th>
            <th>EMAIL</th>
            <th>ROL</th>
            <th>ALMACÉN</th>
            <th>ESTADO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.email">
            <td class="d-flex align-center py-4">
              <v-avatar size="40" color="blue" class="me-4">
                <span class="text-white text-subtitle1">{{
                  user.initial
                }}</span>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ user.name }}</div>
                <div class="text-caption text-grey-darken-1">
                  {{ user.position }}
                </div>
              </div>
            </td>
            <td>{{ user.email }}</td>
            <td>
              <v-chip :color="user.roleColor" variant="tonal" size="small">
                {{ user.role }}
              </v-chip>
            </td>
            <td>{{ user.warehouse }}</td>
            <td>
              <v-chip
                :color="user.active ? 'green' : 'red'"
                variant="tonal"
                size="small"
              >
                {{ user.active ? "Activo" : "Inactivo" }}
              </v-chip>
            </td>
            <td>
              <v-btn variant="text" size="small" class="text-primary"
                ><v-icon>mdi-pencil</v-icon></v-btn
              >
              <v-btn variant="text" size="small" class="text-error"
                ><v-icon>mdi-delete</v-icon></v-btn
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
const users = [
  {
    name: "Ana García",
    position: "Operaciones",
    email: "ana@almacen.com",
    role: "Gerente",
    roleColor: "blue-lighten-4",
    warehouse: "Almacén Principal",
    active: true,
    initial: "A",
  },
  {
    name: "Carlos López",
    position: "Inventario",
    email: "carlos@almacen.com",
    role: "Personal",
    roleColor: "grey-lighten-2",
    warehouse: "Almacén Principal",
    active: true,
    initial: "C",
  },
  {
    name: "María Rodríguez",
    position: "Ventas",
    email: "maria@almacen.com",
    role: "Supervisor",
    roleColor: "green-lighten-4",
    warehouse: "Almacén Secundario",
    active: false,
    initial: "M",
  },
  {
    name: "David Martínez",
    position: "Envíos",
    email: "david@almacen.com",
    role: "Personal",
    roleColor: "grey-lighten-2",
    warehouse: "Centro de Distribución",
    active: true,
    initial: "D",
  },
];
</script>

<style scoped>
.v-table thead th {
  font-weight: 600;
  font-size: 14px;
  color: #666;
}
.v-table tbody td {
  font-size: 14px;
}
</style>
