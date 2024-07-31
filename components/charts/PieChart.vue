<template>
  <div id="chart" class="position-relative">
    <apexchart
      type="donut"
      :options="getOptions()"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
const emit = defineEmits(["emitChart"]);

const props = defineProps({
  series: {
    type: Array,
    // default: () => [15, 20, 12, 60],
  },
  height: {
    type: [Number, String],
    default: 300,
  },
  width: {
    type: [Number, String],
    default: 400,
  },
  labels: {
    type: Array,
    default: ["Facebook", "Direct", "Organic", "Referral"],
  },
  colors: {
    type: Array,
    default: ["#f0db4f", "#bbbcbf", "#3A416F", "#a8b8d8"],
  },
  legend: {
    type: Object,
    default: { show: true },
  },
  dataLabels: {
    type: Object,
    default: { enabled: false },
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
});

const dataPointSelectionHandler = (e, chartContext, config) => {
  // const selectedValue = props.series[config.dataPointIndex];
  emit("emitChart", config.dataPointIndex);
};

onMounted(() => {
  // const el = document.getElementById('apexchartsupydtqjz');
  // const spinner = document.createElement("div");
  // spinner.classList.add('spinner-border');
  // el.appendChild(spinner);
});
const getOptions = () => {
  return {
    chart: {
      type: 'donut',
      height: "100%",
      animations: {
        enabled: true,
        easing: "linear",
        speed: 2000,
      },
    },
    colors: props.colors,
    series: props.series,
    labels: props.labels,
    legend: props.legend,
    dataLabels: props.dataLabels,
    noData: {
      text: `داده ای برای نمایش وجود ندارد`,
      align: "center",
      verticalAlign: "middle",
      offsetX: 0,
      offsetY: 0,
      style: {
        color: "red",
        fontSize: "14px",
        fontFamily: undefined,
      },
    },
  };
};
</script>


<style>
.apexcharts-legend-text {
  font-family: iranSans !important;
  color: rgb(126, 128, 129) !important;
  /* font-size:  14px !important; */
}
</style>
