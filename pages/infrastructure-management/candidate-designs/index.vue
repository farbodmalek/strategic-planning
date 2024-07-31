<template>
  <BaseCover :title="' طرح های کاندید'">

    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="openModal"><i
            class="pi pi-plus ms-2"></i> افزودن طرح های کاندید
        </Button>
      </div>
      <CmpTable :cols="cols" :products="list" class="col-12"/>
    </div>

    <Dialog v-model:visible="visible" modal header="افزودن طرح های کاندید " :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <div class="row mx-md-5 mx-2 my-2">
        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> نام استان </span>
          <Dropdown v-model="values.country" :options="countryList" optionLabel="title"
                    placeholder="انتخاب کنید" @change="getCity(values.country)"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> نام شهرستان </span>
          <Dropdown v-model="values.city" :options="cityList" optionLabel="title" placeholder="انتخاب کنید"
                    @change="getdistrict(values.city)"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> نام بخش </span>
          <Dropdown v-model="values.district" :options="districtList" optionLabel="title"
                    @change="getVillage(values.district)"
                    placeholder="انتخاب کنید"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> نام دهستان </span>
          <Dropdown :options="villageList" optionLabel="title" @change="getHamlet(values.district)"
                    placeholder="انتخاب کنید"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> نام آبادی </span>
          <Dropdown :options="hamletlist" optionLabel="title"
                    placeholder="انتخاب کنید"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex flex-column gap-2 col-12 col-md-6 my-1">
          <span> انتخاب طرح کاندید </span>
          <Dropdown :options="candidList" optionLabel="title"
                    placeholder="انتخاب کنید"
                    option-value="id"
                    class="w-100 md:w-14rem  shadow-lg"/>
        </div>

        <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-5">
          <Button class="bg-success rounded" @click="addCandidate"> ثبت<i class="pi pi-check me-3"></i></Button>
          <Button class="bg-danger rounded" @click="visible=false"> انصراف<i class="pi pi-times me-3"></i></Button>
        </div>
      </div>
    </Dialog>
    <Dialog v-model:visible="isShow" modal header="هر روستا یک محصول" :style="'width:60vw'"
            :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <!--      <WithoutUnemployed/>-->
<!--      <VillagePlan/>-->
      <ProductVillage/>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import {CommonServices} from "~/core/common/common-services";
import {MakeResponse} from "~/composables/make-response";
// import {Condidate} from "~/core/candidate/candidate-services";
import WithoutUnemployed from './without-unemployed.vue'
import VillagePlan from './village-plan.vue'
import ProductVillage from './product-village.vue'



const visible = ref(false)
const openModal = () => {
  // getCountryDevision()
  visible.value = true
}
const cols = ref([
  {id: 1, field: "ostan", header: 'استان'},
  {id: 2, field: "city", header: 'شهرستان'},
  {id: 3, field: "part", header: 'بخش'},
  {id: 4, field: "mobile", header: 'دهستان'},
  {id: 5, field: "mobile", header: 'آبادی'},
  {id: 8, field: "mobile", header: 'منابع و زیرساخت'},
  {id: 9, field: "status", header: 'کسب و کار'},
])

const list = ref([
  {
    id: 1,
    ostan: 'تهران',
    city: 'تهران',
    part: '',
    mobile: '090876543',
    fullname: 'ناهید رضایی',
    code: '5179876765',
    status: 'فعال'
  }
])

const candidList = ref([
  {id: 1, title: 'قابلیت اجرای طرح روستای بدون بیکار'},
  {id: 2, title: 'قابلیت اجرای طرح هر روستا یک محصول'},
  {id: 3, title: 'قابلیت روستای نوفن'},
  {id: 4, title: 'قابلیت تشکیل صندوق خرد محلی'},
  {id: 5, title: 'قابلیت برگزاری جشنواره کار و بوم '},
])
const isShow = ref(false)
const countryList = ref([])
const cityList = ref([])
const districtList = ref([])
const villageList = ref([])
const hamletlist = ref([])
const values = ref({
  country: null,
  city: null,
  district: null,
})


const getCity = (id) => {
  const body = {
    ParentId: id,
    CountryDevisionTypeId: 2,
  }
  // MakeResponse.makeServerResponse(Condidate.addCandidate(body), true, result => {
  //   if (result) {
  //     cityList.value = result
  //   }
  // });
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
    CountryDevisionTypeId:4,
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

const getCountryDevision = () => {
  MakeResponse.makeServerResponse(CommonServices.getCountryDevision(1), true, result => {
    countryList.value = result
  });
}

const addCandidate = () => {
  // const body = {
  //   CountryDevisionTypeId: 5,
  // }
  // MakeResponse.makeServerResponse(CommonServices.getParentDevision(body), true, result => {
  //   if (result) {
  //     hamletlist.value = result
  //   }
  // });

  isShow.value = true

}

const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 8,
      icon: "pi  pi-file-edit",
      style: "text-success",
      label: "ویرایش",
      onClick() {
      },
    },
  ];
};

onMounted(() => {
  list.value.forEach((x, index) => onColumnActions(index));
})
</script>

<style scoped>

</style>