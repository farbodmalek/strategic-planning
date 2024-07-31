<template>
  <div class="row mx-md-5 mx-2 my-2">
    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام استان </span>
      <Dropdown v-model="body.parentId" :options="countryList" optionLabel="title" placeholder="انتخاب کنید  "
                option-value="id"
                class="w-full md:w-14rem  shadow-lg" :class="{'p-invalid': v$.parentId.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span>* نام شهرستان  </span>
      <InputText maxLength="20" v-model="body.title" class=" w-100 shadow-lg" @keydown="ignoreSystemEmojis"
                 :class="{'p-invalid': v$.title.$invalid}"/>
    </div>

    <div class="d-flex flex-column gap-2 col-12 col-lg-6 my-1">
      <span> * تعداد بخش</span>
      <InputNumber :min="0" :max="10" v-model="body.distirictCount" class=" shadow-lg"
                   :class="{'p-invalid': v$.distirictCount.$invalid}"/>
    </div>

    <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
      <Button class="bg-success rounded" @click="mode?editCity():addCity()"><i class="pi pi-check ms-3"></i>ثبت
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
import {computed} from "vue"

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
const emit = defineEmits([''])

const body = ref({
  title: null,
  parentId: null,
  distirictCount: null,
})

const valids = computed(() => {
  return {
    title: {required},
    parentId: {required},
    distirictCount: {required},
  };
});
const v$ = useVuelidate(valids, body);

const addCity = () => {
  console.log("add")
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addCity(body.value), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      emit('refresh')
      closeModal()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    countryList.value = result
  });
}
const editCity = () => {
  console.log("edit")
}

onMounted(() => {
  getCountryDevision();
  if (props.mode === true) {
    body.value.title = props.editData.city
    body.value.parentId = props.editData.countryId
    body.value.distirictCount = 1
  }
})

</script>

<style scoped>

</style>