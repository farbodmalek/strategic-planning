<template>
  <div class="d-flex flex-column">
<!--    <CardHeader :items="items"/>-->
    <Table :cols="cols" :has-action="false"/>
  </div>
</template>
<script setup lang="ts">

const items = ref([
  {id: 1, title: 'جستجو', icon: 'pi pi-search'},
  {id: 2, title: 'مدیریت ', icon: 'pi pi-users'},
])

const cols = ref([
  {id: 1, field: "ostan", header: 'استان'},
  {id: 2, field: "city", header: 'شهرستان'},
  {id: 3, field: "village", header: 'دهستان'},
  {id: 4, field: "part", header: 'بخش'},
  {id: 5, field: "References", header: 'منابع و زیرساخت'},
  {id: 6, field: "Business", header: 'کسب و کار '},
  {id: 7, field: "residents", header: 'ساکنین',},
])
</script>