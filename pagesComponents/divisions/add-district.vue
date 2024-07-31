<template>
  <div class="row mx-md-5 mx-2 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span> * نام استان </span>
      <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getCity(values.country)"
                :class="{'p-invalid': v$.country.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام شهرستان </span>
      <Dropdown v-model="values.parentId" :options="cityList" optionLabel="title" placeholder="انتخاب کنید  "
                :class="{'p-invalid': v$.parentId.$invalid}"
                option-value="id"
                class="w-full md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام بخش </span>
      <InputText maxLength="25" v-model="values.title" @keydown="ignoreSystemEmojis" class=" shadow-lg"
                 :class="{'p-invalid': v$.title.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>*  تعداد دهستان </span>
      <InputNumber :min="0" v-model="values.villageCount" class=" shadow-lg"
                   :class="{'p-invalid': v$.villageCount.$invalid}"/>
    </div>

    <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
      <Button class="bg-success rounded" @click="mode? editDistrict():addDistrict()"><i
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
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {computed} from "vue";
import {ref, watch,onMounted} from 'vue'

const ignoreSystemEmojis = (e) => {
  if (!/^[a-zA-Z\s&\d]*$/.test(e.key)) {
    e.preventDefault();
  }
}
const emit = defineEmits([])
const props = defineProps({
  mode: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object,
    default: {}
  },
  data:{
    type:Object,
    default:{}
  }
})

const closeModal = () => {
  emit('close')
}
const countryList = ref([])
const cityList = ref([])

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    countryList.value = result
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


const values = ref({
  title: null,
  country: null,
  parentId: null,
  villageCount: null
})

const valids = computed(() => {
  return {
    title: {required},
    country: {required},
    parentId: {required},
    villageCount: {required},
  };
});
const v$ = useVuelidate(valids, values);
const addDistrict = () => {
  console.log("add")
  const body = {
    title: values.value.title,
    parentId: values.value.parentId,
    villageCount: values.value.villageCount
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addDistrict(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const editDistrict = () => {
  console.log("edit")
}

watch(props.editData, async (newQuestion, oldQuestion) => {
  console.log(props.editData)
})

onMounted(() => {
  getCountryDevision();
  console.log(props.editData)
  if (props.mode === true) {
    values.value.title = props.editData.district
    values.value.country = props.editData.countryId
    values.value.parentId = props.editData.cityId
    values.value.villageCount = 1
  }
})

</script>