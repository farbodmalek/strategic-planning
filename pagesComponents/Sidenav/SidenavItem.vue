<template>
  <li class="nav-item">
    <NuxtLink class="nav-link " :to="to"    :target="(istarget) ? '_blank' : '_self'" >
      <span class="rounded-pill p-1" :style="`background-color:${color}`">
      <img :src="miniIcon" alt="icon" width="18"/>
      </span>
      <span class="sidenav-normal text-white me-2" > {{ text }} </span>
    </NuxtLink>
  </li>
</template>
<script setup lang="ts">
defineProps({
  to: {
    type: [Object, String],
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
  color: {
    type: String,
    default: "",
  },
  istarget: {
    type: Number,
    default: "",
  },
});
</script>
