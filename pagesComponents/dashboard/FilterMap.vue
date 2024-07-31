<template>
<!--  <div class="cursor-pointer"><i class="pi pi-filter-fill"></i><span class="me-2">فیلتر</span></div>-->
  <div class="d-flex flex-column my-4">
    <span> استان </span>
    <MultiSelect v-model="selected" display="chip" :options="options" optionLabel="title"
                 placeholder="انتخاب کنید"
                 :maxSelectedLabels="3" class="w-100 md:w-[20rem]"/>
  </div>

  <div class="d-flex flex-column my-4">
    <span> نوع طرح راهبردی </span>
    <Dropdown :options="cities" optionLabel="name" placeholder="انتخاب کنید"
              class="w-100 md:w-14rem  "/>
  </div>

  <div class="d-flex flex-column my-4">
    <span>از تاریخ</span>
    <DatePicker></DatePicker>
  </div>

  <div class="d-flex flex-column my-4">
    <span>تا تاریخ</span>
    <DatePicker></DatePicker>
  </div>

  <div class="d-flex flex-column my-4 justify-content-center">
    <Button class="rounded bg-primary d-flex justify-content-center"> فیلتر</Button>
  </div>

</template>

<script setup lang="ts">
import DatePicker from 'vue3-persian-datetime-picker'
</script>

<style scoped>

</style>