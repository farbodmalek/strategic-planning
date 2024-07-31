<template>
  <div class="row mx-3 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 col-xl-4 my-2">
      <span>* نام </span>
      <InputText v-model="formItems.firstName" class=" shadow-lg" :class="{'p-invalid': v$.firstName.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 col-xl-4 my-2">
      <span>* نام خانوادگی  </span>
      <InputText v-model="formItems.lastName" class=" shadow-lg" :class="{'p-invalid': v$.lastName.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 col-xl-4 my-2">
      <span>* نام پدر  </span>
      <InputText v-model="formItems.fatherName" class=" shadow-lg" :class="{'p-invalid': v$.fatherName.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* کد ملی </span>
      <InputText v-model="formItems.nationalCode"  class=" shadow-lg"
                 :class="{'p-invalid': v$.nationalCode.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* تاریخ تولد </span>
      <DatePicker v-model="formItems.birthDate" :class="{'p-invalid': v$.birthDate.$invalid}"></DatePicker>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* شماره موبایل</span>
      <InputText :min="0" v-model="formItems.mobile"  class=" shadow-lg"
                 :class="{'p-invalid': v$.mobile.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* استان </span>
      <Dropdown v-model="formItems.country" :options="countryList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getCity(formItems.country)"
                :class="{'p-invalid': v$.country.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* شهرستان </span>
      <Dropdown v-model="formItems.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                @change="getdistrict(formItems.city)"
                :class="{'p-invalid': v$.city.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* بخش </span>
      <Dropdown v-model="formItems.district" :options="districtList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getVillage(formItems.district)"
                :class="{'p-invalid': v$.district.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* دهستان </span>
      <Dropdown v-model="formItems.village" :options="villageList" optionLabel="title"
                placeholder="انتخاب کنید" @change="gethamlet(formItems.village)"
                :class="{'p-invalid': v$.village.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* آبادی </span>
      <Dropdown v-model="formItems.countryDevisionID" :options="hamletlist" optionLabel="title"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.countryDevisionID.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* جنسیت </span>
      <Dropdown v-model="formItems.genderID" :options="genderList" optionLabel="title" placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.genderID.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* سن </span>
      <InputNumber :min="0" v-model="formItems.age" class=" shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* سرپرست خانوار</span>
      <div class="d-flex align-items-center">
        <div class="flex align-items-center">
          <RadioButton v-model="formItems.isFamilyHead" :value="true"/>
          <label for="ingredient1" class="ml-2">بله</label>
        </div>
        <div class="flex align-items-center me-5">
          <RadioButton v-model="formItems.isFamilyHead" :value="false"/>
          <label for="ingredient2" class="ml-2">خیر</label>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* مقطع تحصیلی </span>
      <Dropdown v-model="formItems.personEducations.eduLevelID" :options="educationLevels" optionLabel="title"
                option-value="id"
                :class="{'p-invalid': v$.personEducations.eduLevelID.$invalid}"
                placeholder="انتخاب کنید"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* رشته تحصیلی </span>
      <Dropdown v-model="formItems.personEducations.educationFieldID" :options="educationFields" optionLabel="title"
                option-value="id"
                :class="{'p-invalid': v$.personEducations.educationFieldID.$invalid}"
                placeholder="انتخاب کنید"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>


    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* وضعیت اشتغال </span>
      <Dropdown v-model="formItems.workStatus" :options="jobStatus" optionLabel="title" placeholder="انتخاب کنید"
                option-value="id"
                :class="{'p-invalid': v$.workStatus.$invalid}"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* وضعیت جسمانی </span>
      <Dropdown v-model="formItems.physicalCondition" :options="condition" optionLabel="title"
                placeholder="انتخاب کنید"
                option-value="id"
                :class="{'p-invalid': v$.physicalCondition.$invalid}"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* مهارت های تخصصی </span>
      <MultiSelect v-model="formItems.skillIdList" display="chip" :options="skills" optionLabel="title"
                   option-value="id"
                   :class="{'p-invalid': v$.skillIdList.$invalid}"
                   placeholder="انتخاب کنید "
                   :maxSelectedLabels="3" class="w-100 md:w-[20rem]"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>*  مهارت های عمومی</span>
      <MultiSelect v-model="formItems.skillIdList" display="chip" :options="skillsGeneral" optionLabel="title"
                   option-value="id"
                   :class="{'p-invalid': v$.skillIdList.$invalid}"
                   placeholder="انتخاب کنید "
                   :maxSelectedLabels="3" class="w-100 md:w-[20rem]"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* صاحب کسب و کار </span>
      <div class="d-flex align-items-center">
        <div class="flex align-items-center">
          <RadioButton v-model="formItems.hasBusiness" :value="true"/>
          <label for="ingredient1" class="ml-2">بله</label>
        </div>
        <div class="flex align-items-center me-5">
          <RadioButton v-model="formItems.hasBusiness" :value="false"/>
          <label for="ingredient2" class="ml-2">خیر</label>
        </div>
      </div>
    </div>


    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span> * عنوان کسب و کار</span>
      <InputText v-model="formItems.businessTitle" class=" shadow-lg"
                 :class="{'p-invalid': v$.businessTitle.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* سمت </span>
      <InputText v-model="formItems.positionTitle" class=" shadow-lg"
                 :class="{'p-invalid': v$.positionTitle.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* بخش فعالیت </span>
      <Dropdown v-model="formItems.businessTypeId" :options="businessTypes" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.businessTypeId.$invalid}"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* تعداد تسهیلات دریافت شده </span>
      <InputNumber :min="0" v-model="formItems.loanCount" class=" shadow-lg"
                   :class="{'p-invalid': v$.loanCount.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* مبلغ تسهیلات دریافت شده </span>
      <InputNumber :min="0" v-model="formItems.totalLoanAmount" type="number" class=" shadow-lg"
                   :class="{'p-invalid': v$.totalLoanAmount.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* تعداد اشتغال مستقیم ایجاد شده </span>
      <InputNumber :min="0" v-model="formItems.directEmploymentCount" class=" shadow-lg"
                   :class="{'p-invalid': v$.directEmploymentCount.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* تعداد اشتغال غیر مستقیم </span>
      <InputText v-model="formItems.inDirectEmploymentCount" class=" shadow-lg"
                 :class="{'p-invalid': v$.inDirectEmploymentCount.$invalid}"/>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  my-2">
      <span>* آیا در کسب و کارتان فناوری به کار رفته است؟ </span>
      <div class="d-flex align-items-center">
        <div class="flex align-items-center">
          <RadioButton v-model="formItems.hasTechnology" :value="true" @change="changed(formItems.hasTechnology)"/>
          <label for="ingredient1" class="ml-2">بله</label>
        </div>
        <div class="flex align-items-center me-5">
          <RadioButton v-model="formItems.hasTechnology" :value="false" @change="changed(formItems.hasTechnology)"/>
          <label for="ingredient2" class="ml-2">خیر</label>
        </div>
      </div>
    </div>

    <div class="col-12 col-lg-6 col-xl-4 d-flex flex-column gap-2  mt-2" v-if="show">
      <span>* نوع فناوری  </span>
      <Dropdown v-model="formItems.technologyTypeId" :options="technologies" optionLabel="title"
                placeholder="انتخاب کنید"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex gap-2  my-2 align-items-center justify-content-end ps-3">
      <Button class="bg-success rounded" @click="mode?editPopulation():setPopulation()"><i
          class="pi pi-check ms-2"></i>ثبت
      </Button>
      <Button class="bg-danger rounded" @click="closeModal"><i class="pi pi-times ms-2"></i>انصراف</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";
import DatePicker from 'vue3-persian-datetime-picker'
import {ToastNotificationService} from "~/core/toast-notification-service";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {computed} from "vue";

const emit = defineEmits(['close', 'refresh'])
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

const genderList = ref([])
const skills = ref([])
const skillsGeneral = ref([])
const technologies = ref([])
const businessTypes = ref([])
const educationLevels = ref([])
const educationFields = ref([])
const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const hamletlist = ref([])


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

const gethamlet = (id) => {
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

const getGenderType = () => {
  MakeResponse.makeServerResponse(CommonServices.getGenderType(), true, result => {
    if (result) {
      genderList.value = result
    }
  });
}

const getSkills = () => {
  MakeResponse.makeServerResponse(CommonServices.getGeneralSkills(), true, result => {
    skills.value = result

  });
}

const getSpecialSkills = () => {
  MakeResponse.makeServerResponse(CommonServices.getSpecialSkills(), true, result => {
    skillsGeneral.value = result
  });
}

const getTechnologies = () => {
  MakeResponse.makeServerResponse(CommonServices.getTechnologies(), true, result => {
    if (result) {
      technologies.value = result
    }
  });
}

const getBusinessTypes = () => {
  MakeResponse.makeServerResponse(CommonServices.getBusinessTypes(), true, result => {
    if (result) {
      businessTypes.value = result
    }
  });
}

const getEducationLevels = () => {
  MakeResponse.makeServerResponse(CommonServices.getEducationLevels(), true, result => {
    if (result) {
      educationLevels.value = result
    }
  });
}

const getEducationFields = () => {
  MakeResponse.makeServerResponse(CommonServices.getEducationFields(), true, result => {
    if (result) {
      educationFields.value = result
    }
  });
}

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    if (result) {
      countryList.value = result
    }
  });
}

const jobStatus = ref([
  {id: 0, title: 'نامشخص'},
  {id: 1, title: 'شاغل'},
  {id: 2, title: 'بیکار'},
])

const condition = ref([
  {id: 0, title: 'سالم'},
  {id: 2, title: 'کم توان'},
  {id: 1, title: 'ناتوان'},
])

const show = ref(false)
const formItems = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  nationalCode: null,
  fatherName: null,
  firstName: null,
  lastName: null,
  genderID: null,
  mobile: null,
  birthDate: new Date(),
  countryDevisionID: null,
  personEducations: {
    educationFieldID: null,
    eduLevelID: null,
  },
  skillIdList: null,
  workStatus: null,
  directEmploymentCount: null,
  inDirectEmploymentCount: null,
  positionTitle: null,
  businessTitle: null,
  isFamilyHead: null,
  totalLoanAmount: null,
  loanCount: null,
  businessTypeId: null,
  hasTechnology: null,
  technologyTypeId: null,
  hasBusiness: null,
  physicalCondition: null,
})

const d = new Date(formItems.value.birthDate)

const valids = computed(() => {
  return {
    country: {required},
    city: {required},
    district: {required},
    village: {required},
    nationalCode: {required},
    fatherName: {required},
    firstName: {required},
    lastName: {required},
    genderID: {required},
    mobile: {required},
    birthDate: {required},
    countryDevisionID: {required},
    personEducations: {
      educationFieldID: {required},
      eduLevelID: {required},
    },
    skillIdList: {required},
    workStatus: {required},
    directEmploymentCount: {required},
    inDirectEmploymentCount: {required},
    positionTitle: {required},
    businessTitle: {required},
    isFamilyHead: {required},
    totalLoanAmount: {required},
    loanCount: {required},
    businessTypeId: {required},
    hasTechnology: {required},
    // technologyTypeId: {required},
    hasBusiness: {required},
    physicalCondition: {required},
  };
});

const v$ = useVuelidate(valids, formItems);

const setPopulation = () => {
  const body = {
    nationalCode: formItems.value.nationalCode,
    fatherName: formItems.value.fatherName,
    firstName: formItems.value.firstName,
    lastName: formItems.value.lastName,
    genderID: formItems.value.genderID,
    mobile: formItems.value.mobile,
    birthDate: formItems.value.birthDate,
    countryDevisionID: formItems.value.countryDevisionID,
    personEducations: [
      {
        educationFieldID: formItems.value.personEducations.educationFieldID,
        eduLevelID: formItems.value.personEducations.eduLevelID
      }
    ],
    workStatus: formItems.value.workStatus,
    directEmploymentCount: formItems.value.directEmploymentCount,
    inDirectEmploymentCount: formItems.value.inDirectEmploymentCount,
    positionTitle: formItems.value.positionTitle,
    businessTitle: formItems.value.businessTitle,
    isFamilyHead: formItems.value.isFamilyHead,
    totalLoanAmount: formItems.value.totalLoanAmount,
    loanCount: formItems.value.loanCount,
    businessTypeId: formItems.value.businessTypeId,
    hasTechnology: formItems.value.hasTechnology,
    technologyTypeId: formItems.value.technologyTypeId,
    hasBusiness: formItems.value.hasBusiness,
    physicalCondition: formItems.value.physicalCondition,
    skillIdList: formItems.value.skillIdList,
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.setPopulation(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
    emit('refresh')
      closeModal()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
  ;
}
const changed = (val) => {
  if (val) {
    show.value = true
  } else {
    show.value = false
  }
}


const editPopulation = () => {
  console.log('edit')
}

onMounted(() => {
  getCountryDevision()
  getGenderType()
  getSkills()
  getEducationFields()
  getEducationLevels()
  getBusinessTypes()
  getTechnologies()
  getSpecialSkills()
  console.log(props.editData)
  if (props.mode === true) {
    formItems.value.country = props.editData.countryId
    formItems.value.city = props.editData.cityId
    formItems.value.district = props.editData.districtId
    formItems.value.village = props.editData.villageId
    formItems.value.nationalCode = props.editData.nationalCode
    formItems.value.fatherName = props.editData.fatherName
    formItems.value.firstName = props.editData.firstName
    formItems.value.lastName = props.editData.lastName
    formItems.value.genderID = props.editData.genderId
    formItems.value.mobile = props.editData.mobile
    formItems.value.birthDate = props.editData.birthDate
    formItems.value.countryDevisionID = props.editData.hamletId
    formItems.value.skillIdList = props.editData.personSkills
    formItems.value.workStatus = props.editData.workStatusId
    formItems.value.directEmploymentCount = props.editData.directEmploymentCount
    formItems.value.inDirectEmploymentCount = props.editData.inDirectEmploymentCount
    formItems.value.positionTitle = props.editData.positionTitle
    formItems.value.businessTitle = props.editData.businessTitle
    formItems.value.isFamilyHead = props.editData.isFamilyHead
    formItems.value.totalLoanAmount = props.editData.totalLoanAmount
    formItems.value.loanCount = props.editData.loanCount
    formItems.value.businessTypeId = props.editData.businessTypeId
    formItems.value.hasTechnology = props.editData.hasTechnology
    formItems.value.technologyTypeId = props.editData.technologyTypeId
    formItems.value.hasBusiness = props.editData.hasBusiness
    formItems.value.physicalCondition = props.editData.physicalCondition
    getCountryDevision()
    getCity(props.editData.countryId)
    getdistrict(props.editData.cityId)
    getVillage(props.editData.districtId)
    gethamlet(props.editData.villageId)
  }
})
</script>

<style scoped>

</style>