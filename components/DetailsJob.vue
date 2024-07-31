<template>
  <div class="mx-4">
    <div class="row mx-0">
      <div class="col-12 mb-4 bg-graySky border-radius-sm" v-if="isEmploy">
        <span
            class="text-green font-weight-bold mt-3 p-2 bg-primary w-20 text-white border-radius-sm"> مشخصات کارفرما </span>
        <div class="row  my-4 justify-content-between">
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold">  نام و نام خانوادگی کارفرما: </span>
            <span>   {{ item?.employerFirstName }}  {{ item?.employerLastName }} </span></div>

          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> نام شرکت / کارگاه : </span>
            <span>  {{ item?.companyName }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold"> دولتی / خصوصی  : </span>
            <span>{{ item?.companyType ? 'خصوصی' : '' }} </span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold"> نوع فعالیت   : </span>
            <span>{{ item?.activityType ? 'الکترونیکی' : '' }} </span></div>
        </div>
      </div>

      <div class="col-12 mb-4 bg-graySky border-radius-sm ">
        <span
            class="text-green font-weight-bold mt-3 p-2 bg-primary w-20 text-white border-radius-sm"> مشخصات فرصت شغلی</span>
        <div class="row  my-4 justify-content-between">
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">عنوان فرصت شغلی: </span>
            <span>{{ item?.jobOpportunityTitle }} </span></div>

          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> گواهینامه : </span>
            <span> {{ item?.drivingLicence ? 'دارد' : 'ندارد' }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold"> مدت کار (رزوانه / ساعتی)  : </span>
            <span>  {{ item?.workDuration }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">   نام کشور/شهر : </span>
            <span> {{ item?.countryId.countryName }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">   حقوق ماهیانه : </span>
            <span> {{ item?.salaryMonthly ? item?.salaryMonthly : '---' }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold"> سوابق پژوهشی مورد نیاز: </span>
            <span>{{ item?.welfareBenefits }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> مزایای رفاهی  : </span>
            <span>----</span></div>
        </div>

        <span class="font-weight-bold"> مهارت های مورد نیاز :   </span>
        <div class="col-12 col-md-12 d-flex gap-3 mt-3">
          <div class="row mx-0">
            <div class="d-flex col-12 col-md-2 flex-column me-2">
              <span class="font-weight-bold text-xs"> <i class="pi pi-circle-fill text-yellow mx-2"></i> پیشرفته</span>
              <span class="font-weight-bold text-xs"><i class="pi pi-circle-fill text-primary mx-2"></i> متوسط</span>
              <span class="font-weight-bold text-xs"><i class="pi pi-circle-fill text-danger mx-2"></i>مبتدی</span>
            </div>

            <div class="d-flex align-items-center col-12 col-md-9 flex-wrap justify-content-center gap-2">
              <span v-for="item in skils" :key="item.id"
                    class="px-3 py-2 text-xs font-weight-bold bg-gray rounded-pill d-flex justify-content-between">{{
                  item.title
                }}<i
                    class="pi pi-circle-fill  me-3" :class="item.color"></i></span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12  mb-4 bg-graySky border-radius-sm ">
        <span
            class="text-green font-weight-bold y p-2 bg-primary w-20 text-white border-radius-sm"> مشخصات نیروی کار مورد نیاز</span>
        <div class="row  my-4 justify-content-between">
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">تعداد زن : </span>
            <span>{{ item?.menCount }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">تعداد مرد   : </span>
            <span>{{ item?.womenCount }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold">کل نیروی مورد نیاز   : </span>
            <span>{{ item?.totalForceRequired }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">  مقطع تحصیلی : </span>
            <span> {{ item?.gradeId.gradeName }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">  رشته تحصیلی : </span>
            <span> {{ item?.fieldOfStudyId.fieldOfStudyName }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold">   وضعیت  تاهل : </span>
            <span>{{ item?.maritalStatusType === 2 ? 'متاهل' : 'مجرد' }}</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span
              class="font-weight-bold">   وضعیت  جسمانی : </span>
            <span>{{ item?.physicalStatusType === 1 ? 'سالم' : item?.physicalStatusType === 2 ? 'کم توان' : 'فرقی نمیکند' }}</span>
          </div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm"><span class="font-weight-bold">حداقل سابقه کار  : </span>
            <span>{{item?.minimumWorkExperience}} </span></div>
        </div>
      </div>

      <div class="col-12  mb-4 bg-graySky border-radius-sm ">
        <span
            class="text-green font-weight-bold mt-3 p-2 bg-primary w-20 text-white border-radius-sm"> مشخصات زبان  </span>
        <div class="row  my-4 justify-content-between">
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold">زبان   : </span>
            <span>انگلیسی</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> سطح زبان  : </span>
            <span>پیشرفته</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> مدرک   : </span>
            <span>آیلتس</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> امتیاز   : </span>
            <span>9</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> مکالمه   : </span>
            <span>متوسط</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> شنیدن   : </span>
            <span>خوب</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> خواندن   : </span>
            <span>خوب</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> نوشتن   : </span>
            <span>ضعیف</span></div>
          <div class="col-12 col-md-4 mt-3 d-flex text-sm "><span class="font-weight-bold"> ترجمه   : </span>
            <span>عالی</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  isEmploy: {
    type: Boolean,
    default: false
  },
  item: {
    type: Object,
    default: ''
  }
})
const skils = ref([
  {id: 1, title: 'javascript', color: 'text-danger'},
  {id: 1, title: 'vueJs', color: 'text-yellow'},
  {id: 1, title: 'Nuxt', color: 'text-primary'},
  {id: 1, title: 'C#', color: 'text-yellow'},
  {id: 1, title: 'vueJs', color: 'text-danger'},
  {id: 1, title: 'vueJs', color: 'text-yellow'},
  {id: 1, title: 'photoshap', color: 'text-primary'},
  {id: 1, title: 'javascript', color: 'text-danger'},
  {id: 1, title: 'Nuxt', color: 'text-primary'},
  {id: 1, title: 'C#', color: 'text-yellow'},
  {id: 1, title: 'vueJs', color: 'text-danger'},
  {id: 1, title: 'C#', color: 'text-yellow'},
  {id: 1, title: 'vueJs', color: 'text-danger'},
  {id: 1, title: 'photoshap', color: 'text-primary'},
  {id: 1, title: 'photoshap', color: 'text-primary'},
  {id: 1, title: 'javascript', color: 'text-danger'},
  {id: 1, title: 'Nuxt', color: 'text-primary'},
  {id: 1, title: 'vueJs', color: 'text-yellow'},
  {id: 1, title: 'vueJs', color: 'text-danger'},
  {id: 1, title: 'C#', color: 'text-yellow'},
  {id: 1, title: 'photoshap', color: 'text-primary'},
])
</script>

<style scoped>

</style>