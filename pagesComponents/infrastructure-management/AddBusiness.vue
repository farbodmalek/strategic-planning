<template>
  <div class="row mx-5  my-2">
    <div class="d-flex flex-column  col-12 col-lg-6 my-3">
      <span>*  نام استان </span>
      <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getCity(values.country)"
                :class="{'p-invalid': v$.country.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-lg-6 my-3">
      <span>*  نام شهرستان </span>
      <Dropdown v-model="values.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                @change="getdistrict(values.city)"
                :class="{'p-invalid': v$.city.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-lg-6 my-3">
      <span>*  نام بخش </span>
      <Dropdown v-model="values.district" :options="districtList" optionLabel="title"
                @change="getVillage(values.district)"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.district.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-lg-6 my-3">
      <span>*  نام دهستان </span>
      <Dropdown v-model="values.village" :options="villageList" optionLabel="title"
                @change="getHamlet(values.village)"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.village.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-lg-6 my-3">
      <span>*  نام آبادی </span>
      <Dropdown v-model="values.countryDivisionID" :options="hamletlist" optionLabel="title"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.countryDivisionID.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span>*  بخش فعالیت </span>
      <Dropdown v-model="values.businessActivityType" :options="businessActivityType" optionLabel="title"
                @change="getBusinessField(values.businessActivityType)"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.businessActivityType.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span>*  رسته فعالیت</span>
      <Dropdown v-model="values.businessField" :options="businessField" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id" @change="getActivityTitle(values.businessField)"
                :class="{'p-invalid': v$.businessField.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>
    <div class="col-12 col-lg-6 my-3">
      <span> * عنوان فعالیت  </span>
      <Dropdown v-model="values.activityTitleID" :options="activityTitle" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.activityTitleID.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span> * نوع فعالیت </span>
      <Dropdown v-model="values.activityTypeID" :options="activityType" optionLabel="title"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.activityTypeID.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span>*  نوع مدیریت</span>
      <Dropdown v-model="values.managementTypeId" :options="managementType" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.managementTypeId.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span>* اندازه کسب و کار  </span>
      <Dropdown v-model="values.businessScaleId" :options="businessScale" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.businessScaleId.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-3">
      <span>* نوع قرارداد شاغلین  </span>
      <Dropdown v-model="values.contractTypeId" :options="contractType" optionLabel="title"
                placeholder="انتخاب کنید" option-value="id"
                :class="{'p-invalid': v$.contractTypeId.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="col-12 col-lg-6 my-2">
      <span>*   تعداد </span>
      <InputNumber :min="0" v-model="values.count" class="w-100 md:w-14rem "
                   :class="{'p-invalid': v$.count.$invalid}"/>
    </div>
  </div>

  <div class="d-flex gap-2  my-3 align-items-center justify-content-center ps-3">
    <Button class="bg-success rounded" @click="mode?editBusiness():addBusiness()"><i class="pi pi-check ms-2"></i>ثبت
    </Button>
    <Button class="bg-danger rounded" @click="closeModal"><i class="pi pi-times ms-2"></i>انصراف</Button>
  </div>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";
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
const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const hamletlist = ref([])
const businessField = ref([])
const businessScale = ref([])
const activityTitle = ref([])
const activityType = ref([])
const managementType = ref([])
const contractType = ref([])
const businessActivityType = ref([])

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

const getBusinessField = (id) => {
  MakeResponse.makeServerResponse(BaseInfoServices.getBusinessField(id), true, result => {
    if (result) {
      businessField.value = result
    }
  });
}

const getBusinessActivityType = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getBusinessActivityType(), true, result => {
    if (result) {
      businessActivityType.value = result
    }
  });
}

const getBusinessScale = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getBusinessScale(), true, result => {
    if (result) {
      businessScale.value = result
    }
  });
}

const getActivityTitle = (id) => {
  MakeResponse.makeServerResponse(BaseInfoServices.getActivityTitle(id), true, result => {
    if (result) {
      activityTitle.value = result
    }
  });
}

const getActivityType = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getActivityType(), true, result => {
    if (result) {
      activityType.value = result
    }
  });
}

const getManagementType = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getManagementType(), true, result => {
    if (result) {
      managementType.value = result
    }
  });
}

const getContractType = () => {
  MakeResponse.makeServerResponse(BaseInfoServices.getContractType(), true, result => {
    if (result) {
      contractType.value = result
    }
  });
}


const values = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  countryDivisionID: null,
  businessActivityType: null,
  businessField: null,
  businessScaleId: null,
  managementTypeId: null,
  contractTypeId: null,
  activityTypeID: null,
  activityTitleID: null,
  count: null
})
const valids = computed(() => {
  return {
    // countryDevisionId: {required},
    country: {required},
    city: {required},
    district: {required},
    village: {required},
    countryDivisionID: {required},
    businessActivityType: {required},
    businessField: {required},
    businessScaleId: {required},
    managementTypeId: {required},
    contractTypeId: {required},
    activityTypeID: {required},
    activityTitleID: {required},
    count: {required}
  };
});
const v$ = useVuelidate(valids, values);

const addBusiness = () => {
  console.log('add')
  const body = {
    count: values.value.count,
    countryDivisionID: values.value.countryDivisionID,
    businessScaleId: values.value.businessScaleId,
    managementTypeId: values.value.managementTypeId,
    contractTypeId: values.value.contractTypeId,
    activityTypeID: values.value.activityTypeID,
    activityTitleID: values.value.activityTitleID
  }

  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addCountryDevisionBusiness(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()

    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const editBusiness = () => {
  console.log('edit')
}
onMounted(() => {
  getCountryDevision()
  getBusinessScale()
  getActivityType()
  getManagementType()
  getContractType()
  getBusinessActivityType()
  console.log(props.editData.businessFieldId)
  if (props.mode === true) {
    values.value.country = props.editData.countryId
    values.value.city = props.editData.cityId
    values.value.district = props.editData.districtId
    values.value.village = props.editData.villageId
    values.value.countryDivisionID = props.editData.countryDivisionID
    values.value.businessActivityType = props.editData.businessActivityType
    values.value.businessField = props.editData.businessFieldId
    values.value.businessScaleId = props.editData.businessScaleId
    values.value.managementTypeId = props.editData.managementTypeId
    values.value.contractTypeId = props.editData.contractTypeId
    values.value.activityTypeID = props.editData.activityTypeId
    values.value.activityTitleID = props.editData.activityTitleId
    values.value.count = props.editData.count
    getBusinessField(props.editData.businessActivityType)
    getActivityTitle(props.editData.businessActivityType)
  }
})
</script>

<style scoped>

</style>