<template>
  <a
      :data-bs-toggle="collapse ? 'collapse' : ''"
      :href="collapse ? `#${collapseRef}` : collapseRef"
      :aria-controls="collapseRef"
      :aria-expanded="isExpanded"
      class="nav-link"
      v-bind="$attrs"
      @click="isExpanded = !isExpanded"
  >
    <div
        class="icon icon-shape icon-sm text-center d-flex align-items-center justify-content-center"
    >
      <slot name="icon"></slot>
    </div>
    <div class="d-flex align-items-center text-white w-100 justify-content-between">
      <span class="nav-link-text text-white">{{ navText }}</span>
      <i class="text-white" :class="isExpanded ?'pi pi-chevron-up':'pi pi-chevron-down'"></i>
    </div>
  </a>
  <div :class="isExpanded ? 'collapse show' : 'collapse'">
    <slot name="list"></slot>
  </div>
</template>
<script setup>
defineProps({
  collapseRef: {
    type: String,
    required: true,
  },
  navText: {
    type: String,
    required: true,
  },
  collapse: {
    type: Boolean,
    default: true,
  },

});

const isExpanded = ref(false);
</script>
