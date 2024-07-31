<template>
  <BaseCover :title="'گزارش'" :is-add="false" :is-search="false">
    <div class="row mx-0 align-items-center">
      <div class="col-12 col-md-6">
        <FilterMap/>
      </div>
      <div class="col-12 col-md-6">
        <IranHeatMap></IranHeatMap>
      </div>
    </div>
  </BaseCover>

</template>
<script lang="ts" setup>
import FilterMap from "../pagesComponents/dashboard/FilterMap.vue";

const LoggedUser = ref();
const tab = ref(1);


const TabHandel = (num: number) => {
  tab.value = num;
}

onMounted(() => {

});

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
