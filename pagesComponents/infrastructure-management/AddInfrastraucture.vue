<template>
  <div class="row mx-md-5 mx-2 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام استان </span>
      <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                placeholder="انتخاب کنید" @change="getCity(values.country)"
                :class="{'p-invalid': v$.country.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام شهرستان </span>
      <Dropdown v-model="values.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                @change="getdistrict(values.city)"
                :class="{'p-invalid': v$.city.$invalid}"
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
      <span> * نام دهستان </span>
      <Dropdown v-model="values.village" :options="villageList" optionLabel="title"
                @change="getHamlet(values.village)"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.village.$invalid}"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام آبادی </span>
      <Dropdown v-model="values.countryDevisionId" :options="hamletlist" optionLabel="title"
                placeholder="انتخاب کنید"
                option-value="id"
                :class="{'p-invalid': v$.countryDevisionId.$invalid}"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* منابع موجود در روستا</span>
      <MultiSelect v-model="values.infrastructureId" display="chip" :options="infrastructuresList"
                   optionLabel="title" @change="getValue(values.resourceId)"
                   placeholder="انتخاب کنید "
                   :class="{'p-invalid': v$.resourceId.$invalid}"
                   :maxSelectedLabels="3" class="w-100 md:w-[20rem]"/>
    </div>

    <div class="-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* زیرساخت های روستا</span>
      <Dropdown v-model="values.resourceId " :options="resourcesList" optionLabel="title" option-value="id"
                placeholder="انتخاب کنید"
                :class="{'p-invalid': v$.resourceId.$invalid}"
                class="w-100 md:w-14rem "/>
    </div>

    <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
      <Button class="bg-success rounded" @click="isEdit?editInfrastraucture():addInfrastructure()"><i
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

const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const infrastructuresList = ref([])
const resourcesList = ref([])
const hamletlist = ref([])
const obj = ref([])

const getValue = (val) => {
  obj.value = val.map(m => {
    return {
      infrastructureId: m.infrastructureId
    }
  })
}

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
const closeModal = () => {
  emit('close')
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

const getResources = () => {
  MakeResponse.makeServerResponse(CommonServices.getResources(), true, result => {
    if (result) {
      resourcesList.value = result
    }
  });
}

const getInfrastructures = () => {
  MakeResponse.makeServerResponse(CommonServices.getInfrastructures(), true, result => {
    if (result) {
      infrastructuresList.value = result.map(m => {
        return {
          infrastructureId: m.id,
          title: m.title
        }
      })
    }
  });
}


const values = ref({
  country: null,
  city: null,
  district: null,
  village: null,
  countryDevisionId: null,
  infrastructureId: null,
  resourceId: null
})
const valids = computed(() => {
  return {
    countryDevisionId: {required},
    infrastructureId: {required},
    resourceId: {required},
    village: {required},
    district: {required},
    city: {required},
    country: {required},
  };
});
const v$ = useVuelidate(valids, values);

const addInfrastructure = () => {
  console.log('add')
  const body = {
    countryDevisionId: values.value.countryDevisionId,
    infrastructures: obj.value,
    resources: [
      {
        resourceId: values.value.resourceId
      }
    ]
  }
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.setInfrastructure(body), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      emit('close')
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}


const editInfrastraucture = () => {
  console.log('edit')
}

onMounted(() => {
  getCountryDevision()
  getInfrastructures()
  getResources()
})
</script>

<style scoped>

</style>