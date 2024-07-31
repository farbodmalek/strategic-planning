<template>
  <div class="row mx-md-5 mx-2 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  نام استان </span>
      <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                :class="{'p-invalid': v$.country.$invalid}"
                placeholder="انتخاب کنید" @change="getCity(values.country)"
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
      <span>*  نام بخش </span>
      <Dropdown v-model="values.parentId" :options="districtList" optionLabel="title"
                :class="{'p-invalid': v$.parentId.$invalid}"
                placeholder="انتخاب کنید"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*   نام دهستان</span>
      <InputText maxLength="25" @keydown="ignoreSystemEmojis" v-model="values.title" class=" w-100 shadow-lg"
                 :class="{'p-invalid': v$.title.$invalid}"/>
    </div>


    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  تعداد آبادی </span>
      <InputNumber :min="0" v-model="values.hamletCount" class=" w-100 shadow-lg"
                   :class="{'p-invalid': v$.hamletCount.$invalid}"/>
    </div>

    <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
      <Button class="bg-success rounded" @click="mode?editVillage():addVillage()"><i class="pi pi-check ms-3"></i>ثبت
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
import {required} from "@vuelidate/validators";
import {useVuelidate} from "@vuelidate/core/dist";

const ignoreSystemEmojis = (e) => {
  if (!/^[a-zA-Z\s&\d]*$/.test(e.key)) {
    e.preventDefault();
  }
}

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
const emit = defineEmits([''])
const values = ref({
  country: null,
  city: null,
  // district: null,
  title: null,
  parentId: null,
  hamletCount: null
})

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

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    if (result) {
      countryList.value = result
    }
  });
}

const valids = computed(() => {
  return {
    country: {required},
    city: {required},
    title: {required},
    parentId: {required},
    hamletCount: {required},
  };
});
const v$ = useVuelidate(valids, values);

const addVillage = () => {
  console.log("add")
  const body = {
    title: values.value.title,
    parentId: values.value.parentId,
    hamletCount: values.value.hamletCount
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addVillage(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const editVillage = () => {
  // getCity(props.editData.countryId)
  // console.log(props.editData.countryId)
  console.log("edit")
}

onMounted(() => {
  getCountryDevision();
  if (props.mode === true) {
    values.value.country = props.editData.countryId
    values.value.city = props.editData.cityId
    values.value.title = props.editData.village
    values.value.parentId = props.editData.districtId
    values.value.hamletCount = 1
    getCity(props.editData.countryId)
    getdistrict(props.editData.cityId)
  }
})
</script>

<style scoped>

</style>