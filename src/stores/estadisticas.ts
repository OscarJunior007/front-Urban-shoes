import { defineStore } from 'pinia'
import axios from 'axios'

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
      const res = await axios.get<ModeloVenta[]>('http://localhost:8000/estadisticas/modelos-mas-vendidos')
      this.modelos = res.data
    }
  }
})
