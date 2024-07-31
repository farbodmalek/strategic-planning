<template>
  <BaseCover :title="'اخبار و مطالب'">
    <CmpTable :cols="cols" :products="listNews"/>
  </BaseCover>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";

const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "title", header: 'عنوان'},
  {id: 2, field: "publishDate", header: 'تاریخ انتشار'},
  {id: 3, field: "part", header: 'وضعیت'},
])

const addNews = () => {
  navigateTo('/content-managment/add')
}

const listNews = ref([])

const getNews = () => {
  const body = {
    contentTypeID: 1
  }
  MakeResponse.makeServerResponse(CommonServices.getContent(body), true, result => {
    if (result.results) {
      console.log(result.results)
      listNews.value = result.results.map((p, index) => {
        return {
          ...p,
          index: index + 1,
          title: p.title,
          publishDate: p.currentStatus.doneDate
        }
      })
      listNews.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const onColumnActions = (index) => {
  listNews.value[index].columnActions = [
    // {
    //   id: 9,
    //   icon: "pi pi-trash",
    //   style: "text-danger",
    //   label: " حذف",
    //   onClick() {
    //   },
    // },
    {
      id: 8,
      icon: "pi  pi-file-edit",
      style: "text-success",
      label: "ویرایش",
      onClick() {
      },
    },
  ];
};

onMounted(() => {
  getNews()
})
</script>

<style scoped>

</style>