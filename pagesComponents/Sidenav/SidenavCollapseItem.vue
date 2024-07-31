<template>
  <li class="nav-item">
    <NuxtLink
        class="nav-link mx-3"
        :to="to"
        @click="isExpanded = !isExpanded"
    >
      <!--      <img :src="miniIcon" alt="icon"/>-->
      <span class="rounded-pill p-1 ms-2" :style="`background-color:${color}`">
      <img :src="miniIcon" alt="icon" width="18"/>
      </span>
      <div class="d-flex align-items-center w-100 justify-content-between">
        <span class="sidenav-normal text-white"> {{ text }} <b class="caret"></b></span>
        <i v-if="isSub" class="text-white" :class="isExpanded ?'pi pi-chevron-up':'pi pi-chevron-down'"></i>
      </div>
    </NuxtLink>
    <div :class="isExpanded ? 'collapse show' : 'collapse'">
      <ul class="nav nav-sm flex-column">
        <slot name="nav-child-item"/>
      </ul>
    </div>
  </li>
</template>

<script setup>
defineProps({
  refer: {
    type: String,
    default: '',
  },
  to: {
    type: String,
    required: true,
  },
  miniIcon: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

  isSub: {
    type: Boolean,
    required: true,
  },
  color: {
    type: String,
    default: "",
  },
});
const isExpanded = ref(false);
</script>
