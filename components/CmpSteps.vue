<template>
  <nav class="p-steps p-component py-4" data-pc-name="steps">
    <ul class="p-steps-list" data-pc-section="menu">
      <li v-for="(item,index) in dataSteps" :key="index" @click="getId(item.id,index+1,item.isActive)"
          class="p-steps-item"
          data-pc-section="menuitem">
        <span class="p-menuitem-link" data-pc-section="action" tabindex="0" :class="item.isActive?'active':'unActive'">
          <img :src="item.icon" alt=""/>
          <!--          <span class="p-steps-number" data-pc-section="step"-->
          <!--                :class="item.isActive?'bg-success text-white':''">{{ item.id }}</span>-->
          <span class="p-steps-title" data-pc-section="label"> {{ item.label }}</span>
        </span>
      </li>
    </ul>
  </nav>
  <slot/>
</template>

<script setup lang="ts">
const props = defineProps({
  dataSteps: {
    type: Array,
    default: ''
  },
})
const emit = defineEmits(['emitId'])
const getId = (data, index, isActive) => {
  emit("changeSteps", {id: data, index: index, isActive: isActive});
}
</script>

<style scoped>
.active{
  border:5px solid #58D390;
}
.unActive{
  border:5px solid #E6DB79;
}

</style>