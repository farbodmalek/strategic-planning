<template>
  <div class="row mx-md-5 mx-2 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span> * نام استان</span>
      <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getCity(values.country)"
                :class="{'p-invalid': v$.country.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  نام شهرستان </span>
      <Dropdown v-model="values.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.city.$invalid}"
                @change="getdistrict(values.city)"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام بخش </span>
      <Dropdown v-model="values.district" :options="districtList" optionLabel="title"
                @change="getVillage(values.district)"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.district.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  نام دهستان </span>
      <Dropdown v-model="values.village" :options="villageList" optionLabel="title"
                @change="getHamlet(values.village)"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.village.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  نام آبادی </span>
      <Dropdown v-model="values.countryDivisionId" :options="hamletlist" optionLabel="title"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.countryDivisionId.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* کد ملی  </span>
      <InputText type="number" v-model="values.nationalCode" class=" shadow-lg"
                 :class="{'p-invalid': v$.nationalCode.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span> *  نوع طرح استراتژیک </span>
      <Dropdown v-model="values.planId" :options="planList" optionLabel="title" placeholder="انتخاب کنید  "
                :class="{'p-invalid': v$.planId.$invalid}"
                option-value="id"
                class="w-full md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  محل اعتبار </span>
      <Dropdown v-model="values.creditType" :options="locationCredit" optionLabel="title"
                :class="{'p-invalid': v$.creditType.$invalid}"
                placeholder="انتخاب کنید  " option-value="id"
                class="w-full md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*   تعداد اشتغال ایجادی  </span>
      <InputNumber :min="0" v-model="values.employeeCount" class=" shadow-lg"
                   :class="{'p-invalid': v$.employeeCount.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*   مبلغ تسهیلات درخواستی </span>
      <InputNumber :min="0" v-model="values.requestedLoanAmount" class=" shadow-lg"
                   :class="{'p-invalid': v$.requestedLoanAmount.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  میزان سرمایه ثابت </span>
      <InputNumber :min="0" v-model="values.staticCreditAmount" class=" shadow-lg"
                   :class="{'p-invalid': v$.staticCreditAmount.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  نوع تقاضا  </span>
      <Dropdown v-model="values.requestType" :options="requestType" optionLabel="title" placeholder="انتخاب کنید  "
                :class="{'p-invalid': v$.requestType.$invalid}"
                option-value="id"
                class="w-full md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* میزان سرمایه در گردش  </span>
      <InputNumber :min="0" v-model="values.workingCapital" class=" shadow-lg"
                   :class="{'p-invalid': v$.workingCapital.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  آدرس محل اجرای طرح </span>
      <Textarea v-model="values.loanLocationAddress" rows="1" class=" shadow-lg"
                :class="{'p-invalid': v$.loanLocationAddress.$invalid}"/>
    </div>

    <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
      <Button class="bg-success rounded" @click="mode?editLoanRequest():addLoanRequest()"><i
          class="pi pi-check ms-3"></i>ثبت
      </Button>
      <Button class="bg-danger rounded" @click="closeModal"><i class="pi pi-times ms-3"></i>انصراف</Button>
    </div>

  </div>

</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {computed} from "vue";
import {required} from "@vuelidate/validators/dist/index";
import {useVuelidate} from "@vuelidate/core/dist/index";

const emit = defineEmits(['close','refresh'])
const props = defineProps({
  mode: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object,
    default: {}
  }
})
const closeModal=()=>{
  emit('close')
}
const locationCredit = ref([
  {id: 1, title: 'بنیاد برکت'},
  {id: 2, title: 'بسیج'},
  {id: 3, title: 'وزارت جهاد کشاورزی'}
])
const requestType = ref([
  {id: 1, title: 'حقیقی'},
  {id: 2, title: 'حقوقی'}
])
const planList = ref([])
const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const hamletlist = ref([])

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    if (result) {
      countryList.value = result
    }
  });
}

const getCity = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 2,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      cityList.value = result
    }
  });
}

const getdistrict = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 3,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      districtList.value = result
    }
  });
}

const getVillage = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 4,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      villageList.value = result
    }
  });
}

const getHamlet = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 5,
  }
  MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
    if (result) {
      hamletlist.value = result
    }
  });
}

const getPlan = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getPlan(), true, result => {
    if (result) {
      planList.value = result
    }
  });
}

const values = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  countryDivisionId: null,
  nationalCode: null,
  planId: null,
  loanLocationAddress: null,
  creditType: null,
  employeeCount: null,
  requestedLoanAmount: null,
  staticCreditAmount: null,
  requestType: null,
  workingCapital: null
})

const valids = computed(() => {
  return {
    country: {required},
    city: {required},
    district: {required},
    village: {required},
    countryDivisionId: {required},
    nationalCode: {required},
    planId: {required},
    loanLocationAddress: {required},
    creditType: {required},
    employeeCount: {required},
    requestedLoanAmount: {required},
    staticCreditAmount: {required},
    requestType: {required},
    workingCapital: {required}
  };
});
const v$ = useVuelidate(valids, values);


const addLoanRequest = () => {
  const body = {
    countryDivisionId: values.value.countryDivisionId,
    nationalCode: values.value.nationalCode,
    planId: values.value.planId,
    loanLocationAddress: values.value.loanLocationAddress,
    creditType: values.value.creditType,
    employeeCount: values.value.employeeCount,
    requestedLoanAmount: values.value.requestedLoanAmount,
    staticCreditAmount: values.value.staticCreditAmount,
    requestType: values.value.requestType,
    workingCapital: values.value.workingCapital
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addLoanRequest(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const editLoanRequest = () => {
  console.log('edit')
}

onMounted(() => {
  if (props.mode === true) {
    values.value.country = props.editData
    values.value.city = props.editData
    values.value.district = props.editData
    values.value.village = props.editData
    values.value.countryDivisionId = props.editData
    values.value.nationalCode = props.editData.nationalCode
    values.value.planId = props.editData.planId
    values.value.loanLocationAddress = props.editData.loanLocationAddress
    values.value.creditType = props.editData.creditType
    values.value.employeeCount = props.editData.employeeCount
    values.value.requestedLoanAmount = props.editData.requestedLoanAmount
    values.value.staticCreditAmount = props.editData.staticCreditAmount
    values.value.requestType = props.editData.requestTypeId
    values.value.workingCapital = props.editData.workingCapital
    getCountryDevision()
    getPlan()
    // getCity(props.editData)
    // getdistrict(props.editData)
    // getVillage(props.editData)
    // getHamlet(props.editData)
  }
})
</script>

<style scoped>

</style>