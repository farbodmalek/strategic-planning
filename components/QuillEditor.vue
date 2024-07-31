
<template>
  <div class="mb-5">
    {{text}}
    <ClientOnly v-model="text">
      <QuillEditor  theme="snow" class="bg-white" placeholder="متن خود را وارد کنید"/>
    </ClientOnly>
  </div>
</template>
<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const text=ref()
</script>
<style scoped lang="css">
:deep(.ql-editor) {
  /*min-height: 200px;*/
  /*margin-bottom: 10%;*/
}
:deep(.ql-toolbar.ql-snow) {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
:deep(.ql-container.ql-snow) {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>
