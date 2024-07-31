<template>
  <BaseCover :title="' لیست بخش ها'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن بخش جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش بخش':'افزودن بخش جدید' " :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddDistrict @refresh="getCountry" @close="closeModal" @editData="editData" :mode="isEdit"/>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
import AddDistrict from '../../../pagesComponents/divisions/add-district.vue'

const visible = ref(false)
const isEdit = ref(false)

const openModal = () => {
  visible.value = true
}

const closeModal=()=>{
  visible.value=false
}
const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},
  {id: 1, field: "city", header: 'شهرستان'},
  {id: 1, field: "district", header: 'بخش'},
])
const list = ref([])
const editData = ref()


const getCountry = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(3), true, result => {
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        country: m.parent.parent.title,
        countryId: m.parent.parent.id,
        city: m.parent.title,
        cityId: m.parent.id,
        district: m.title,
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
        openEdit(item)
      },
    },
  ];
};

const openEdit = (item) => {
  visible.value = true
  isEdit.value = true
  editData.value = item
  console.log(editData.value)
}

onMounted(() => {
  getCountry()
})
</script>

<style scoped>

</style>