<template>
  <BaseCover :title="' لیست استان'">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن استان جدید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" modal :draggable="false" :header="isEdit?'ویرایش استان جدید' :'افزودن استان جدید'"
            :style="'width:40vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="row mx-0 my-2  d-flex align-items-center justify-content-center flex-column">

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> * نام استان </span>
          <InputText maxLength="25" v-model="body.title" @keydown="ignoreSystemEmojis" class="shadow-lg"
                     :class="{'p-invalid': v$.title.$invalid}"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> * تعداد شهرستان </span>
          <InputNumber :minlength="0" :maxlength="3" v-model="body.cityCount" class="shadow-lg"
                       :class="{'p-invalid': v$.cityCount.$invalid}"/>
        </div>

        <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
          <Button class="bg-success rounded" @click="isEdit? editProvince() : addProvince()"><i
              class="pi pi-check ms-3"></i>
            ثبت
          </Button>
          <Button class="bg-danger rounded" @click="visible=false"><i class="pi pi-times ms-3"></i> انصراف
          </Button>
        </div>

      </div>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {BaseInfoServices} from "~/core/basic-info-management/base-info-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {required} from '@vuelidate/validators';
import {useVuelidate} from "@vuelidate/core";
import {computed} from "vue";

const visible = ref(false)
const isEdit = ref(false)
const countryList = ref([])
const list = ref([])
const cols = ref([
  {id: 1, field: "index", header: 'ردیف'},
  {id: 1, field: "country", header: 'استان'},

])
const ignoreSystemEmojis = (e) => {
  if (!/^[a-zA-Z\s&\d]*$/.test(e.key)) {
    e.preventDefault();
  }
}

const validKey = (event) => {
  if (!/^[0-9\s&\d]*$/.test(event.key)) {
    event.preventDefault();
  }
}

const openModal = () => {
  visible.value = true
}

const body = ref({
  title: null,
  cityCount: null
})

const valids = computed(() => {
  return {
    title: {required},
    cityCount: {required},
  };
});
const v$ = useVuelidate(valids, body);

const addProvince = () => {
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(BaseInfoServices.addProvince(body.value), true, result => {
      ToastNotificationService.success('با موفقیت ثبت شد');
      visible.value = false
      getCountryDevision()
    });
  } else {
    ToastNotificationService.error('لطفا مقادیر را وارد کنید');
  }
}

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    list.value = result.map((m, index) => {
      return {
        index: index + 1,
        country: m?.title,
        // cityCount:m?.count
      }
    })
    list.value.forEach((x, index) => onColumnActions(index));
  });
}

const editProvince = () => {
  console.log("edit")
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
      icon: "pi pi-file-edit",
      style: "text-success",
      label: "ویرایش",
      onClick(item) {
        openEdit(item)
      },
    },
  ];
};

const openEdit = (item) => {
  visible.value = true
  isEdit.value = true
  body.value.title = item.country
}

onMounted(() => {
  getCountryDevision()
})
</script>

<style scoped>

</style>