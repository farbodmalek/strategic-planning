<template>
  <BaseCover :title="'اطلاعات زیرساخت'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن زیرساخت جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش اطلاعات زیرساخت':'افزودن اطلاعات زیرساخت'"
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddInfrastraucture @refresh="getHamletInfrastructure" @close="visible=false" :editData="editData" :mode="isEdit"/>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import AddInfrastraucture from "@/pagesComponents/infrastructure-management/AddInfrastraucture.vue";
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";


const visible = ref(false)
const isEdit = ref(false)
const editData = ref()

const openModal = () => {
  visible.value = true
}

const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},
  {id: 2, field: "city", header: 'شهرستان'},
  {id: 3, field: "district", header: 'بخش'},
  {id: 4, field: "village", header: 'دهستان'},
  {id: 5, field: "hamlet", header: 'آبادی'},
  {id: 6, field: "resource", header: 'منابع'},
  {id: 6, field: "infrastructure", header: 'زیرساخت'},

])

const list = ref([])

const getHamletInfrastructure = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getHamletInfrastructure(), true, result => {
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        hamlet: m.title,
        hamletId: m.id,
        village: m.parent?.title,
        villageId: m.parent?.id,
        district: m.parent?.parent?.title,
        districtId: m.parent?.parent?.id,
        city: m.parent?.parent?.parent?.title,
        cityId: m.parent?.parent?.parent?.id,
        country: m.parent?.parent?.parent?.parent?.title,
        countryId: m.parent?.parent?.parent?.parent?.id,
        infrastructure: m.countryDevisionInfrastructures.map(p => p.infrastructure.title).join(' , '),
        infrastructureId: m.countryDevisionInfrastructures.map(p => p.infrastructure.id),
        resource: m.countryDevisionResources.map(p => p.resource.title).join(' , '),
        resourceId:3
        // resourceId: m.countryDevisionResources.map(p => p.resource.id)
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
  editData.value=item
  values.value.country = item.countryId
  values.value.city = item.cityId
  values.value.district = item.districtId
  values.value.village = item.villageId
  values.value.countryDevisionId = item.hamletId
  values.value.infrastructureId = item.infrastructureId
  values.value.resourceId = item.resourceId

}

onMounted(() => {
  getHamletInfrastructure()
})

</script>

<style scoped>

</style>