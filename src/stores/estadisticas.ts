import { defineStore } from 'pinia'
import axios from 'axios'
import { BASE_URL } from '@/router/baseUrl'

interface ModeloVenta {
  modelo: string
  vendidos: number
}

export const useEstadisticasStore = defineStore('estadisticas', {
  state: () => ({
    modelos: [] as ModeloVenta[]
  }),
  actions: {
    async cargarModelosMasVendidos() {
      const res = await axios.get<ModeloVenta[]>(`${BASE_URL}api/estadisticas/modelos-mas-vendidos`)
      this.modelos = res.data
    }
  }
})
