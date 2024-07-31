<template>
  <div class="paging w-100 d-flex justify-content-end">
    <Dropdown
        @change="$emit('changePaging', row)"
        v-model="row"
        :options="rowNumberList"
        optionLabel="title"
        option-value="id"
        placeholder="انتخاب کنید"/>
  </div>
</template>

<script setup>

const props = defineProps({
  selectedRow: Number
})

const row = ref(10)

const rowNumberList = ref([
  {id: 5, title: '5'},
  {id: 10, title: '10'},
  {id: 25, title: '25'},
  {id: 50, title: '50'},
  {id: 100, title: '100'}
]);

onMounted(() => {
  row.value = props.selectedRow;
})
</script>

<style scoped lang="scss">
.paging {
  padding: 1rem;
}
</style>