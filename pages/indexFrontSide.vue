<template>
  <div class="w-100  d-flex align-items-center justify-content-center py-7" style="background-color: #e0f4f3">
    <div class="container  row mx-0 p-0 ">

      <div class="col-12 col-md-6 d-flex  flex-column py-5 px-3 rounded text-white"
           style="background-color: #eff8f7">
        <h4>به سامانه طرح های راهبردی صندوق خوش آمدید</h4>
        <p style="color:#8b8c8c">
          سامانه طرح های راهبردی ، پلی است برای یافتن فرصت شغلی
          و نیروی کار جدید مورد نظرشما در بین تمامی کاریابی های کشور
        </p>
      </div>

      <div class="col-12 col-md-6 text-center">
        <img src="/img/Group.png" class="w-100"/>
      </div>

    </div>
  </div>
  <div class="container my-4">
    <NewsContent :dataNews="dataNews"/>
  </div>
</template>

<script setup>
import NewsContent from "@/components/content/NewsContent.vue";
import {onMounted} from "vue";

const selectRoute = ref([
  {id: 1, title: 'درخواست های شغلی '},
  {id: 2, title: 'فرصت های شغلی'},
])

const selected = ref(null)
definePageMeta({
  layout: 'custom'
})

const dataNews = ref([])

const getData = async () => {
  await useFetch('http://jscommonapi.karafariniomid.ir/api/Content/published/list', {
    method: 'post',
    body: {
      contentTypeID: 1,
      pageNumber: 1,
      take: 3
    }
  }).then((res => {
    dataNews.value = res.data._rawValue.results
  }))
}
onMounted(() => {
  getData()
})

</script>
<style scoped>
.d-search {
  font-family: 'iranSans';
  color: white !important;
  /*background-color:#B90000;*/
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.p-placeholder {
  color: white !important;
}

.d-search > .p-dropdown-trigger {
  direction: rtl;
  /*background-color:#B90000;*/
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;

}
</style>
