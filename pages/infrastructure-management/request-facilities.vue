<template>
  <BaseCover :title="'درخواست تسهیلات '">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="addRequest"><i
            class="pi pi-plus ms-2"></i> افزودن درخواست جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list"/>
    </div>
    <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش درخواست':'افزودن درخواست جدید'"
            :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <AddRequest  @refresh="getLoanRequests" @close="visible=false" :editData="editData" :mode="isEdit"/>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import AddRequest from '../../pagesComponents/infrastructure-management/add-request-facilities.vue'
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";

const visible = ref(false)
const isEdit = ref(false)
const editData=ref()
const addRequest = () => {
  visible.value = true
}

const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "nationalCode", header: 'کد ملی'},
  {id: 1, field: "plan", header: 'نوع طرح استراتژیک'},
  {id: 1, field: "employeeCount", header: 'تعداد اشتغال ایجادی'},
  {id: 1, field: "staticCreditAmount", header: 'میزان سرمایه ثابت'},
  {id: 1, field: "workingCapital", header: 'میزان سرمایه در گردش'},
  {id: 1, field: "requestedLoanAmount", header: ' مبلغ تسهیلات ذرخواستی'},
  {id: 1, field: "requestType", header: 'نوع تقاضا'},
])

const list = ref([])

const getLoanRequests = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getLoanRequests(), true, result => {
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        countryDevision: m.countryDevision,
        nationalCode: m.nationalCode,
        plan: m.plan.title,
        planId:m.planId,
        loanLocationAddress: m.loanLocationAddress,
        creditType: m.creditType,
        employeeCount: m.employeeCount,
        requestedLoanAmount: m.requestedLoanAmount,
        staticCreditAmount: m.staticCreditAmount,
        requestType: m.requestType === 1 ? 'حقیقی' : 'حقوقی',
        requestTypeId: m.requestType,
        workingCapital: m.workingCapital
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
  visible.value=true
  isEdit.value = true
  editData.value=item
}

onMounted(() => {
  getLoanRequests()
})

</script>

<style scoped>

</style>