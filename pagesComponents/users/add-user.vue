<template>
  <CmpSteps :dataSteps="dataSteps" @changeSteps="changeStep($event)">
    <div class=" container" v-if="stepId === 1">
      <div class="row mx-0 px-4">
        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>نام</span>
          <InputText v-model="formValues.firstName" class=" shadow-lg" :class="{'p-invalid': v$.firstName.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>نام خانوادگی</span>
          <InputText v-model="formValues.lastName" class=" shadow-lg" :class="{'p-invalid': v$.lastName.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>کد ملی</span>
          <InputText v-model="formValues.nationalCode" class=" shadow-lg"
                     :class="{'p-invalid': v$.nationalCode.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>موبایل</span>
          <InputText v-model="formValues.mobile" class=" shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>تلفن</span>
          <InputText v-model="formValues.phoneNumber" class=" shadow-lg"/>
        </div>

        <div class="col-12 col-md-6 d-flex flex-column gap-2  my-1">
          <span>* جنسیت </span>
          <div class="d-flex align-items-center">
            <div class="flex align-items-center">
              <RadioButton v-model="formValues.gender" :value="true"/>
              <label for="ingredient1" class="ml-2">مرد</label>
            </div>
            <div class="flex align-items-center me-5">
              <RadioButton v-model="formValues.gender" :value="false"/>
              <label for="ingredient2" class="ml-2">زن</label>
            </div>
          </div>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span>تاریخ </span>
          <DatePicker v-model="formValues.startEmploymentDate"></DatePicker>
        </div>

        <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
          <Button class="bg-success rounded" @click="stepId=2"> ادامه<i class="pi pi-check me-3"></i></Button>
          <Button class="bg-danger rounded" @click="closeModal"> انصراف<i class="pi pi-times me-3"></i>
          </Button>
        </div>
      </div>
    </div>

    <div class=" container" v-if="stepId === 2">
      <div class="row mx-0">
        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-3">
          <span>نام کاربری</span>
          <InputText v-model="formValues.userName" class=" shadow-lg" :class="{'p-invalid': v$.userName.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-3">
          <span>رمز عبور</span>
          <!--          <Password v-model="formValues.password" toggleMask  class="w-100"/>-->
          <InputText v-model="formValues.password" class=" shadow-lg" :class="{'p-invalid': v$.password.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-3">
          <span>تکرار رمز عبور</span>
          <!--          <Password v-model="formValues.rePassword" class=" shadow-lg" :class="{'p-invalid': v$.rePassword.$invalid}"/>-->
          <InputText v-model="formValues.reTypePassword" class=" shadow-lg"
                     :class="{'p-invalid': v$.reTypePassword.$invalid}"/>
        </div>

        <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
          <Button class="bg-success rounded" @click="mode?editUser():addnewUser()"> ثبت نهایی<i
              class="pi pi-check me-3"></i></Button>
          <Button class="bg-danger rounded" @click="closeModal"> انصراف<i class="pi pi-times me-3"></i>
          </Button>
        </div>
      </div>
    </div>
  </CmpSteps>
</template>

<script setup lang="ts">
import CmpSteps from "@/components/CmpSteps.vue";
import DatePicker from 'vue3-persian-datetime-picker'
import {CommonServices} from "~/core/common/common-services";
import {UserServices} from "../../core/user-managment/user-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {computed} from "vue";
import {required} from "@vuelidate/validators/dist";
import {useVuelidate} from "@vuelidate/core/dist";


const visible = ref(false)
const roles = ref([])
const isEdit = ref(false)
const countryList = ref([])
const cityList = ref([])
const emit = defineEmits(['closeModal', 'refresh'])

const props = defineProps({
  mode: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: {}
  }
})

const dataSteps = ref([
  {id: 1, label: 'اطلاعات هویتی', icon: '/img/icons/add1.svg',isActive:true},
  {id: 2, label: 'حساب کاربری', icon: '/img/icons/add2.svg',isActive:false},
])

const closeModal = () => {
  emit('close')
}

const stepId = ref<number>(1);
const changeStep = (val: number) => {
  console.log(val)
  val.isActive=true
  stepId.value = val.id;
}


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


const formValues = ref({
  userName: null,
  password: null,
  reTypePassword: null,
  firstName: null,
  lastName: null,
  nationalCode: null,
  startEmploymentDate: null,
  phoneNumber: null,
  mobile: null,
  gender: null,
})

const valids = computed(() => {
  return {
    userName: {required},
    password: {required},
    reTypePassword: {required},
    firstName: {required},
    lastName: {required},
    nationalCode: {required},
    startEmploymentDate: {required},
    gender: {required}
  };
});

const v$ = useVuelidate(valids, formValues);

const addnewUser = () => {
  const body = {
    id:0,
    userName: formValues.value.userName,
    password: formValues.value.password,
    reTypePassword: formValues.value.reTypePassword,
    firstName: formValues.value.firstName,
    lastName: formValues.value.lastName,
    nationalCode: formValues.value.nationalCode,
    startEmploymentDate: formValues.value.startEmploymentDate,
    phoneNumber: formValues.value.phoneNumber,
    mobile: formValues.value.mobile,
    gender: formValues.value.gender,
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(UserServices.addNewUser(body), true, result => {
      if(result.result){
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()
      }
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const editUser = () => {
  console.log("edit")
}

onMounted(() => {
  // getRols()
  // getCountryDevision()
  console.log(props.editData)
  if (props.mode === true) {
    formValues.value.mobile = props.editData.mobile
    formValues.value.firstName = props.editData.firstName
    formValues.value.lastName = props.editData.lastName
    formValues.value.nationalCode = props.editData.userName
  }
})
</script>

<style scoped>

</style>