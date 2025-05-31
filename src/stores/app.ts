// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    drawer: true,
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    setDrawer(val: boolean) {
      this.drawer = val
    }
  }
})
