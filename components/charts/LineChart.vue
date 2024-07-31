<template>
  <div class="card overflow-hidden">
    <div class="card-body p-0">
      <div class="chart">
        <apexchart
          :height="height"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
  height: {
    type: [Number, String],
    default: 100,
  },
  value: {
    type: Object,
    amount: String,
    percentage: {
      type: Object,
      value: [Number, String],
      color: String,
    },
    default: () => {},
  },
  chartOptions: {
    type: Object,
    default: () => ({
      chart: {
        type: "area",
        zoom: {
          enabled: false,
        },
      },
      colors: ["#252f40"],
      labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
    }),
  },
  series: {
    type: Array,
    default: () => [
      {
        name: "Income",
        data: [50, 45, 60, 60, 80, 65, 90, 80, 100],
      },
    ],
  },
});
onMounted(() => {
  nextTick(() => {
    window.dispatchEvent(new Event("resize"));
  });
});
</script>
