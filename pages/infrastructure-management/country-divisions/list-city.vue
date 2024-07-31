<template>
  <BaseCover :title="'  لیست شهرستان ها'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن شهرستان جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش شهرستان':'افزودن شهرستان جدید'  "
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddCity @refresh="getCity" @close="closeModal" :editData="editData" :mode="isEdit"/>
    </Dialog>
  </BaseCover>
</template>

<script setup lang="ts">
import AddCity from '../../../pagesComponents/divisions/add-city.vue'
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";

const visible = ref(false)
const isEdit = ref(false)
const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},
  {id: 1, field: "city", header: 'شهرستان'},

])
const list = ref([])
const openModal = () => {
  visible.value = true
}
const closeModal=()=>{
  visible.value=false
}

const getCity = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(2), true, result => {
    console.log(result)
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        id: m.id,
        city: m.title,
        country: m.parent?.title,
        countryId: m.parent?.id
      }
    })
    list.value.forEach((x, index) => onColumnActions(index));
  });
}

const editData=ref()
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
  editData.value=item
}

onMounted(() => {
  getCity()
})
</script>

<style scoped>

</style>