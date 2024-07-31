<template>
  <div class="px-4 shadow-sm d-flex align-items-center justify-content-between text-warning rounded-pill"
       style="background-color:#797B99;height:60px">
    <span class="text-white text-center" v-for="item in items" :key="item.id"> {{ item.title }} <i :class="item.icon"></i></span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    defualt: ''
  }
})
</script>

<style scoped>

</style>