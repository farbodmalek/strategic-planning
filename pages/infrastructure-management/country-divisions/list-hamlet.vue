<template>
  <BaseCover :title="'لیست آبادی ها'" @openModal="addCity()">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن آبادی جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش آبادی':'افزودن آبادی جدید'" :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddHamlet @refresh="getHamlet" @close="closeModal" :editData="editData" :mode="isEdit"/>
    </Dialog>
  </BaseCover>
</template>

<script setup lang="ts">
import AddHamlet from '../../../pagesComponents/divisions/add-hamlet.vue'
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";

const visible = ref(false)
const isEdit = ref(false)

const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},
  {id: 1, field: "city", header: 'شهرستان'},
  {id: 1, field: "district", header: 'بخش'},
  {id: 1, field: "village", header: 'دهستان'},
  {id: 1, field: "hamlet", header: 'آبادی'},
])

const list = ref([])
const editData = ref()

const openModal = () => {
  visible.value = true
}
const closeModal=()=>{
  visible.value=false
}

const getHamlet = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(5), true, result => {
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        country: m.parent?.parent?.parent?.parent?.title,
        countryId: m.parent?.parent?.parent?.parent?.id,
        city: m.parent?.parent?.parent?.title,
        cityId: m.parent?.parent?.parent?.id,
        district: m.parent?.parent?.title,
        districtId: m.parent?.parent?.id,
        village: m.parent?.title,
        villageId: m.parent?.id,
        hamlet: m.title
      }
    })
    list.value.forEach((x, index) => onColumnActions(index));
  });
}

const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 8,
      icon: "pi  pi-trash",
      style: "text-danger",
      label: "حذف",
      onClick(item) {

      },
    },
    {
      id: 8,
      icon: "pi  pi-file-edit",
      style: "text-success",
      label: "ویرایش",
      onClick(item) {
        openEditModal(item)
      },
    },
  ];
};

const openEditModal = (item) => {
  visible.value = true
  isEdit.value = true
  editData.value = item
}

onMounted(() => {
  getHamlet()
})
</script>

<style scoped>

</style>