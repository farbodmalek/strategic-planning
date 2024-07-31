<template>
  <BaseCover :title="'داشبورد'" :is-add="false" :is-search="false">
    <div class="row mx-0 align-items-center my-3">

      <div class="col-12 col-lg-6 p-6">
        <h5 class="mb-3">بخش فعالیت</h5>
        <PieChart
            :dataLabels="{ enabled: true}"
            :labels="['دولتی','خصوصی','آزاد']"
            :series="[7,12,12]"
            :colors="themeStore.filterTheme('theme1')"
        />
      </div>

      <div class="col-12 col-lg-6 p-6">
        <h5 class="mb-5"> نوع طرح راهبردی</h5>
        <BarChartHorizontal
            :plotOptions="{
                horizontal: false,
                distributed: true,
                isFunnel: true,
              }"
            :xaxis="['روستای بدون بیکار','هر روستا یک محصول','صندوق خرد محلی','روستای نوفن','جشنواره کاربوم']"
            :data="[7,12,12,33,17]"
            :colors="themeStore.filterTheme('theme2')"
        />
      </div>

<!--      <div class="col-12 col-md-6">-->
<!--        <span class="mb-3">استان </span>-->
<!--        <BarChartHorizontal-->
<!--            :plotOptions="{-->
<!--                horizontal: false,-->
<!--                distributed: true,-->
<!--                isFunnel: true,-->
<!--              }"-->
<!--            :xaxis="['تهران','گیلان','ساری','رشت','سمنان','شیراز','اصفهان','اراک','بندرعباس','مشهد','مرکزی','قزوین','قم','لرستان','کرمانشاه','کردستان','ارومیه','اردبیل','تبریز','گلستان','گیلان']"-->
<!--            :data="[10,15,30,43,60,50,32,12,32,3,11,23,32,9,80,43,60,50,32,12,32]"-->
<!--            :colors="themeStore.filterTheme('theme4')"-->
<!--        />-->
<!--      </div>-->

    </div>
  </BaseCover>

</template>
<script lang="ts" setup>
// import "vue3-circle-progress/dist/circle-progress.css";
import PieChart from "@/components/charts/PieChart.vue";
import BarChartHorizontal from '../components/charts/BarChartHorizontal.vue'
import LineChart from "../components/charts/LineChart.vue";
import {useThemeStore} from "../stores/themeStore";
const themeStore = useThemeStore();
const tab = ref(1);
const TabHandel = (num: number) => {
  tab.value = num;
}
</script>
<style scoped>
label {
  display: block;
  overflow: hidden;
  border-bottom: 1px solid #E4E4E7;
  background: #FFF;
  transition: .5s;
}

.title {
  padding: 0.75rem 1rem;
  border: 0.1rem solid #fff;
  transition: .5s;
  margin-top: 8rem;
  border-radius: 1rem;
}

</style>
