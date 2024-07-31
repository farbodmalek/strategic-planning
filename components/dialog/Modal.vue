<template>
  <div>
    <Dialog
        :visible="visible"
        :header="header"
        :modal="true"
        :style="'width:60vw'"
        @hide="emit('hide')"
        :draggable="false">
      <slot/>
      <template v-if="hasFooter">
<!--        <div class="w-100 d-flex justify-content-end mt-3">-->
<!--          <Button-->
<!--              severity="success" raised-->
<!--              @click="onSaveData($event)"-->
<!--              class="rounded border-0 p-2">-->
<!--            <span class="text-white">ثبت</span>-->
<!--            <i class="pi pi-check me-4"></i>-->
<!--          </Button>-->
<!--          <Button-->
<!--              severity="danger" raised-->
<!--              @click="onClose($event)"-->
<!--              type="button"-->
<!--              class="me-3 rounded border-0 p-2">-->
<!--            <span class="text-white">انصراف</span>-->
<!--            <i class="pi pi-times me-3"></i>-->
<!--          </Button>-->
<!--        </div>-->
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  visible: {
    type: Boolean,
    default: true
  },
  hasFooter: {
    type: Boolean,
    default: true
  },
  header: {
    type: String,
    default: ''
  },
  // width: {
  //   type: String,
  //   default: '100vw'
  // },
});

const emit = defineEmits(['close', 'save','dismis'])

const onClose = (event: any) => {
  emit('close', event);
}


const onSaveData = (event: any) => {
  emit('save', event);
}
</script>

<style scoped>

</style>