<template>
  <div class="card">

    <FileUpload name="demo[]" url="http://fjsapi.karafariniomid.ir/api/CVUpload" @upload="onTemplatedUpload($event)"
                :multiple="true" accept="image/*"
                :maxFileSize="1000000" @select="onSelectedFiles">
      <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
        <div class="d-flex flex-wrap justify-content-between align-items-center flex-1 gap-2">
          <div class="d-flex gap-2">
            <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined class="mx-1"></Button>
<!--            <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success"-->
<!--                    :disabled="!files || files.length === 0" class="mx-1"></Button>-->
            <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger"
                    :disabled="!files || files.length === 0" class="mx-1"></Button>
          </div>
          <ProgressBar :value="totalSizePercent" :showValue="false"
                       :class="['md:w-20rem h-1rem w-full md:ml-auto', { 'exceeded-progress-bar': totalSizePercent > 100 }]">
            <span class="white-space-nowrap">{{ totalSize }}B / 1Mb</span>
          </ProgressBar>
        </div>
      </template>

      <template #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
        <div>
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div v-for="(file, index) of files" :key="file.name + file.type + file.size"
                 class="card m-0 px-6 flex flex-column border-1 surface-border align-items-center gap-3">
              <div>
                <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50"/>
              </div>
              <span class="font-semibold">{{ file.name }}</span>
              <div>{{ formatSize(file.size) }}</div>
              <Badge value="Pending" severity="warning"/>
              <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined
                      rounded severity="danger"/>
            </div>
          </div>
        </div>

      </template>

      <template #empty>
        <div class="flex align-items-center justify-content-center flex-column">
          <div class="text-center">
            <i class="pi pi-cloud-upload  border-2 border-circle p-5 text-8xl text-400 border-400"/>
          </div>
          <p class="mt-4 text-center mb-0">فایل مورد نظر را درون کادر بکشید.</p>
        </div>
      </template>

    </FileUpload>

  </div>
</template>

<script setup>
import {usePrimeVue} from "primevue/config";
import Button from 'primevue/button';
import FileUpload from 'primevue/fileupload';
import {toast} from "vue3-toastify";

const emit = defineEmits(['emitFormData'])
const props = defineProps({isMultiple: Boolean});
const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);
const primevue = usePrimeVue();
const myFileInput = ref()
// const toast = useToast();
const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
  removeFileCallback(index);
  totalSize.value -= parseInt(formatSize(file.size));
  totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
  clear();
  totalSize.value = 0;
  totalSizePercent.value = 0;
};

const onSelectedFiles = async (event) => {
  files.value = event.files;
  const formData = new FormData();
  files.value.forEach((file) => {
    totalSize.value += parseInt(formatSize(file.size));
    formData.append("file", file, file.name);
    formData.append("cvTitle", file.name);
  });
  postResume(formData);
};

const postResume = (formData) => {
  emit('emitFormData', formData)
  // jobseekerService.uploadResume(formData).then(res => {
  //   if (res) {
  //     toast.success("فایل مورد نظر با موفقیت بارگذاری شد.", {
  //       rtl: true,
  //       position: toast.POSITION.BOTTOM_LEFT,
  //       autoClose: 1500
  //     });
  //   }
  // })
}

const uploadEvent = (callback) => {
  totalSizePercent.value = totalSize.value / 10;
  callback();
};

const onTemplatedUpload = () => {
  // toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
  const k = 1024;
  const dm = 3;
  const sizes = primevue.config.locale.fileSizeTypes;
  if (bytes === 0) {
    return `0 ${sizes[0]}`;
  }
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  return `${formattedSize} ${sizes[i]}`;
}

</script>

<style scoped>

</style>