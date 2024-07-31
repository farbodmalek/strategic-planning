<template>
  <BaseCover :title="'لیست ساکنین '">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="addNewInfo"><i
            class="pi pi-plus ms-2"></i> افزودن اطلاعات ساکنین
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list"/>
    </div>

    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش اطلاعات ساکنین':'افزودن اطلاعات ساکنین'"
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddPoplation @refresh="getPopulation" @close="visible=false" :editData="editData" :mode="isEdit"/>
    </Dialog>

    <div class="row mx-0 my-4">
      <div class="col-12">
        <MapLeafLet/>
      </div>
    </div>

  </BaseCover>
</template>

<script setup lang="ts">
import AddPoplation from '../../pagesComponents/infrastructure-management/AddPopulation.vue'
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";
import MapLeafLet from "~/components/MapLeafLet.vue";


const list = ref([])
const editData = ref()

const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},
  {id: 2, field: "city", header: 'شهرستان'},
  {id: 3, field: "district", header: 'بخش'},
  {id: 4, field: "village", header: 'دهستان'},
  {id: 5, field: "hamlet", header: 'آبادی'},
  {id: 6, field: "fullname", header: 'نام - نام خانوادگی'},
  {id: 7, field: "nationalCode", header: 'کدملی'},
  {id: 7, field: "gender", header: 'جنسیت'},
  {id: 8, field: "mobile", header: 'موبایل'},
  {id: 9, field: "workStatus", header: 'وضعیت'},
])

const getPopulation = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getPopulation(), true, result => {
    visible.value = false
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        country: m.countryDevision?.parent?.parent?.parent?.parent.title,
        countryId: m.countryDevision?.parent?.parent?.parent?.parent.id,
        city: m.countryDevision?.parent?.parent?.parent?.title,
        cityId: m.countryDevision?.parent?.parent?.parent?.id,
        district: m.countryDevision?.parent?.parent?.title,
        districtId: m.countryDevision?.parent?.parent?.id,
        village: m.countryDevision?.parent?.title,
        villageId: m.countryDevision?.parent?.id,
        hamlet: m.countryDevision.title,
        hamletId: m.countryDevision.id,
        fullname: m.firstName + ' --  ' + m.lastName,
        firstName: m.firstName,
        lastName: m.lastName,
        fatherName: m.fatherName,
        mobile: m.mobile,
        workStatus: m.workStatus === 1 ? 'شاغل' : 'بیکار',
        workStatusId: m.workStatus,
        nationalCode: m.nationalCode,
        gender: m.genderID === 2 ? 'زن' : 'مرد',
        genderId: m.genderID,
        personEducations: m.personEducations.map(m => m.id),
        personSkills: m.personSkills.map(m => m.id),
        physicalCondition: m.physicalCondition,
        businessTypeId: m.businessTypeId,
        hasBusiness: m.hasBusiness,
        businessTitle: m.businessTitle,
        positionTitle: m.positionTitle,
        loanCount: m.loanCount,
        inDirectEmploymentCount: m.inDirectEmploymentCount,
        totalLoanAmount: m.totalLoanAmount,
        directEmploymentCount: m.directEmploymentCount,
        isFamilyHead: m.isFamilyHead,
        technologyTypeId: m.technologyTypeId,
        hasTechnology: m.hasTechnology,

      }
    })
    list.value.forEach((x, index) => onColumnActions(index));
  });
}

const visible = ref(false)
const isEdit = ref(false)

const addNewInfo = () => {
  visible.value = true
}



const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 9,
      icon: "pi pi-trash",
      style: "text-danger",
      label: " حذف",
      onClick() {
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

}


onMounted(() => {
  getPopulation()
})
</script>

<style scoped>

</style>