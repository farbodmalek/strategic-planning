<template>
  <apexchart
      type="area"
      :height="height"
      :options="getOption()"
      :series="series"
  ></apexchart>
</template>

<script setup>
const emit = defineEmits(["emitChart"]);
const props = defineProps({
  height: {
    type: [Number, String],
    default: 290,
  },
  colors: {
    type: Array,
    default: ["#4BB543", "#3A416F"],
  },
  labels: {
    type: Array,
    default: [],
  },
  legend: {
    type: Object,
    default: {show: true},
  },
  dataLabels: {
    type: Object,
    default: {enabled: false},
  },
  stroke: {
    curve: "smooth",
  },
  series: {
    type: Array,
    default: () => [],
  },
});

const getOption = () => {
  return {
    chart: {
      events: {
        click(event, chartContext, config) {
          emit('emitChart' ,config.dataPointIndex);
        }
      },
    },

    colors: props.colors,
    labels: props.labels,
    legend: props.legend,
    dataLabels: props.dataLabels,
    // stroke: props.stroke,
  };
};
onMounted(() => {
  nextTick(() => {
    window.dispatchEvent(new Event("resize"));
  });
});
</script>
