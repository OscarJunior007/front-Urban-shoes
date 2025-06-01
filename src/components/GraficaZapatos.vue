<template>
  <div class="chart-wrapper">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useEstadisticasStore } from "@/stores/estadisticas";
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const store = useEstadisticasStore();

onMounted(() => {
  store.cargarModelosMasVendidos();
});

const chartData = computed<ChartData<"pie">>(() => ({
  labels: store.modelos.map((m) => m.modelo),
  datasets: [
    {
      label: "Más vendidos",
      data: store.modelos.map((m) => m.vendidos),
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
    },
  ],
}));

const chartOptions: ChartOptions<"pie"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      text: "Modelos más vendidos",
    },
  },
};
</script>

<style scoped>
.chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
