<template>
  <BaseCover :title="' افزودن اخبار جدید'" :is-search="false" :is-add="false">
    <div class="container">
      <div class="row mx-0">
        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>تیتر</span>
          <InputText class=" shadow-lg" v-model="body.title"/>
        </div>
        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>رو تیتر (خلاصه ای از خبر)</span>
          <InputText class=" shadow-lg" v-model="body.upTitr"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>دسته بندی </span>
          <Dropdown v-model="body.categoryID" :options="listCategory" optionLabel="title" placeholder="انتخاب کنید "
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span> برچسب ها </span>
          <Dropdown v-model="body.contentTypeID" :options="cities" optionLabel="name" placeholder="انتخاب کنید "
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>کد اتصال</span>
          <InputText class=" shadow-lg" v-model="body.bundle"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>الویت نمایش</span>
          <InputText class=" shadow-lg" v-model="body.displayOrder"/>
        </div>

        <div class="col-12  d-flex flex-column my-2">
          <span>  متن</span>
          <QuillEditor v-model="body.notes"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span>تاریخ انتشار</span>
          <InputText class=" shadow-lg" v-model="body.publishDate"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column my-2">
          <span> وضعیت </span>
          <Dropdown v-model="selectedCity" :options="cities" optionLabel="name" placeholder="انتخاب کنید "
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="col-12 col-md-3 d-flex flex-column my-2">
          <span>بارگزاری فایل</span>
          <Button class="bg-blue-8 mx-2 rounded" @click="visible=true">انتخاب فایل <i
              class="pi pi-cloud-upload me-4"></i></Button>

          <Dialog v-model:visible="visible" modal header="بارگزاری فایل" :style="'width:60vw'"
                  :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
            <div class="p-4">
              <Uploader class="mt-2" @emitFormData="getPlacmentEvent($event)"/>
            </div>

          </Dialog>
        </div>

        <div class="col-12  d-flex my-2 justify-content-end">
          <Button class="bg-danger mx-2 rounded" @click="navigateTo('/content-managment/news')">انصراف</Button>
          <Button class="bg-success mx-2 rounded" @click="addNews">ثبت</Button>
        </div>
      </div>
    </div>
  </BaseCover>
</template>

<script setup lang="ts">
import QuillEditor from "@/components/QuillEditor.vue";
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import Uploader from "@/components/Uploader.vue";

const visible = ref(false)
const listCategory = ref([])
const body = ref({
  bundle: null,
  categoryID: null,
  contentTypeID: null,
  displayOrder: null,
  images: [],
  keyword: null,
  keywords: null,
  lables: [null],
  lead: null,
  notes: null,
  publishDate: null,
  releaseStatusID: 1,
  title: null,
  upTitr: null,
  writersTitle: null,
  writersTitles: null,
})
const addNews = () => {
  MakeResponse.makeServerResponse(CommonServices.setContent(body.value), true, result => {
    if (result.results) {
      navigateTo('/content-managment/news')
    }
  });
}
const getPlacmentEvent = (data) => {
  console.log(data)
  console.log('jkml')
}

const getCategory = () => {
  MakeResponse.makeServerResponse(CommonServices.getCategory(), true, result => {
    console.log(result)
    if (result) {
      listCategory.value = result
    }
  });
}

onMounted(() => {
  getCategory()
})
</script>

<style scoped>

</style>