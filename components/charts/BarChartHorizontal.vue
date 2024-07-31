<template>
  <apexchart
    type="bar"
    @dataPointSelection="dataPointSelectionHandler"
    :options="getOptions()"
    :series="series"></apexchart>
</template>
<script setup>
const emit = defineEmits(["emitChart"]);
const props = defineProps({
  height: {
    type: [Number, String],
    default: 300,
  },
  colors: {
    type: Array,
    default: ["#3A416F"],
  },
  xaxis: {
    type: Array,
    default: ["16-20", "21-25", "26-30", "31-36", "36-42", "42+"],
  },
  plotOptions: {
    type: Object,
    default: {
      borderRadius: 4,
      horizontal: false,
      distributed: true,
      barHeight: "50%",
      isFunnel: true,
    },
  },
  data: {
    type: Array,
    default: [15, 20, 12, 60, 20],
  },
  series: {
    type: Array,
    default: () => [
      {
        name: "age group",
        data: [15, 20, 12, 60, 20],
      },
    ],
  },
});

const getOptions = () => {
  return {
    chart: {
      height:'100%',
      events: {
        dataPointSelection(event, chartContext, config) {
          emit("emitChart", config.dataPointIndex);
        },
      },
    },
    colors: props.colors,
    plotOptions: {
      bar: props.plotOptions,
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return val;
      },
      dropShadow: {
        enabled: true,
      },
    },
     noData: {
      text: `داده ای برای نمایش وجود ندارد`,
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: 'red',
        fontSize: '14px',
        fontFamily: undefined
      }
    },
    fill: {
      type: "solid",
    },
    xaxis: {
      categories: props.xaxis,
    },

    series: [
      {
        data: props.data,
      },
    ],
  };
};
const dataPointSelectionHandler = (e, chartContext, config) => {
  emit("emitChart", config.dataPointIndex);
};
onMounted(() => {
  nextTick(() => {
    window.dispatchEvent(new Event("resize"));
  });
});
</script>
