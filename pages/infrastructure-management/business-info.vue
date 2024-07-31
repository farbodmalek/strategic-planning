<template>
  <BaseCover :title="'اطلاعات کسب و کار'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن کسب کار روستا
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>
    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش کسب و کار روستا':'افزودن کسب و کار روستا'"
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddBusiness @refresh="getCountryDevisionBusiness" @close="closeModal" :editData="editData" :mode="isEdit"/>
    </Dialog>
  </BaseCover>
</template>

<script setup lang="ts">
import AddBusiness from '../../pagesComponents/infrastructure-management/AddBusiness.vue'
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";

const visible = ref(false)
const isEdit = ref(false)
const editData = ref()

const openModal = () => {
  visible.value = true
}

const closeModal=()=>{
  visible.value=false
}
const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "countryDevision", header: 'آبادی'},
  {id: 2, field: "activityTitle", header: 'عنوان فعالیت'},
  {id: 3, field: "activityType", header: 'نوع فعالیت'},
  {id: 4, field: "managementType", header: 'نوع مدیریت'},
  {id: 5, field: "businessScale", header: 'اندازه کسب و کار'},
  {id: 5, field: "contractType", header: 'نوع قرارداد'},
  {id: 6, field: "count", header: 'تعداد کسب و کار های ثبت شده'},
])

const list = ref([])
const getCountryDevisionBusiness = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getCountryDevisionBusiness(), true, result => {
    console.log(result)
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        count: m.count,
        countryDevision: m.countryDevision,
        businessScale: m.businessScale.title,
        businessScaleId: m.businessScale.id,
        managementType: m.managementType.title,
        managementTypeId: m.managementType.id,
        contractType: m.contractType.title,
        contractTypeId: m.contractType.id,
        activityType: m.activityType.title,
        businessActivityType: m.activityTitle?.businessField?.businessActivityType?.id,
        businessFieldId: m.activityTitle.businessFieldId,
        activityTypeId: m.activityType.id,
        activityTitle: m.activityTitle.title,
        activityTitleId: m.activityTitle.id,
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
        openModalEdit(item)
      },
    },
  ];
};

const openModalEdit = (item) => {
  visible.value = true
  isEdit.value = true
  editData.value = item
}

onMounted(() => {
  getCountryDevisionBusiness()
})

</script>

<style scoped>

</style>