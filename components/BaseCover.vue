<template>
  <div class="overlay" v-if="loading">
    <div class="spinner-border text-dark" role="status"></div>
  </div>
  <div class="position-relative pb-3" style="background:linear-gradient(180deg, #9DC4FF 0%, #1E4684 100%);">
    <div class="position-relative" style="border-radius: 0px 0px 70px 70px;background: linear-gradient(90deg, #005AA7 0%, #002B4F 34.5%, #002341 64.5%, #005399 100%);">
      <div :class="!isAdd && !isSearch?'justify-content-center':'justify-content-between'"
           class="w-100 d-flex align-items-center text-white py-3 px-5 rounded-top">
        <i v-if="isAdd" class="pi pi-plus cursor-pointer" @click="openModal" v-tooltip="'افزودن'"></i>
        <h4 class="d-none d-md-block">
          {{ title }}
        </h4>
        <i v-if="isSearch" class="pi pi-search cursor-pointer" @click="showFilter" v-tooltip="'جستجو'"></i>
      </div>
      <div v-if="text" class="shap d-none d-lg-block bg-blue-8 position-absolute">{{ text }}</div>
    </div>
    <div class="pb-3 pt-5 m-md-5 m-3"
         style="border-radius:14px;background: linear-gradient(180deg, rgba(244, 247, 255, 0.87) 0%, rgba(191, 216, 252, 0.87) 100%);">
      <slot/>
    </div>
    <div class="mt-auto p-2 w-100 position-absolute"
         style="border-radius:0px 0px 76px 76px;background: #002341;bottom:-16px"></div>
  </div>
</template>

<script setup>
const emit = defineEmits(['openModal', 'showFilter'])
defineProps({
  title: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false
  },
  isSearch: {
    type: Boolean,
    default: false
  },
  isAdd: {
    type: Boolean,
    default: false
  },
  tooltip: {
    type: String,
    default: "",
  },
  text: {
    type: String,
    default: "",
  }
});

const openModal = () => {
  emit('openModal')
}
const showFilter = () => {
  emit('showFilter')

}
</script>

<style>
.shap {
  width: 472px;
  border-radius: 0px 0px 76px 76px;
  padding: 15px;
  right: 63px;
  color: #ffffff;
}


</style>