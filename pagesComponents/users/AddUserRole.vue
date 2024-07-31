<template>
  <div class="row mx-5  my-2">
    <div class="d-flex flex-column  col-12  my-3">
      <span>* کاربر </span>
      <AutoComplete v-model="title" :suggestions="listUser" @change="completeChange(title)"
                    @complete="search" option-label="fullName"
                    option-value="userID"/>
    </div>

    <div class="d-flex flex-column  col-12  my-3">
      <span>* نقش </span>
      <Dropdown v-model="formValue.roleID" :options="roles" optionLabel="roleDesc"
                placeholder="انتخاب کنید"
                option-value="roleID"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12  my-3">
      <span>* سامانه </span>
      <Dropdown v-model="formValue.roleID" :options="roles" optionLabel="roleDesc"
                placeholder="انتخاب کنید"
                option-value="roleID"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>


    <div class="d-flex flex-column  col-12  my-3">
      <span> شعبه </span>
      <Dropdown v-model="formValue.roleID" :options="roles" optionLabel="roleDesc"
                placeholder="انتخاب کنید"
                option-value="roleID"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

  </div>
  <div class="d-flex gap-2  my-3 align-items-center justify-content-center ps-3">
    <Button class="bg-success rounded" @click="addOrEditUserRole"><i class="pi pi-check ms-2"></i>ثبت
    </Button>
    <Button class="bg-danger rounded" @click="closeModal"><i class="pi pi-times ms-2"></i>انصراف</Button>
  </div>
</template>

<script setup lang="ts">
import {UserServices} from "~/core/user-managment/user-services";
import {MakeResponse} from "~/composables/make-response";
import {ToastNotificationService} from "~/core/toast-notification-service";

const title = ref()
const completeChange = (item) => {
  formValue.value.userID = item.userID
  // formValue.value.title = item.fullName
}

const search = (event) => {
  listUser.value = listUser.value.filter(p => {
    return p.fullName.includes(event.query)
  })
}

const emit = defineEmits(['closeModal', 'refresh'])
const props = defineProps({
  mode: {
    type: Boolean,
    default: false
  },
  editData: {
    type: Object,
    default: {}
  }
})

const closeModal = () => {
  emit('close')
}

const roles = ref([])
const getRols = () => {
  const body = {}
  MakeResponse.makeServerResponse(UserServices.getRols(body), true, result => {
    if (result) {
      roles.value = result.results.map(m => {
        return {
          roleID: m.roleID,
          roleDesc: m.roleDesc
        }
      })
    }
  });
}

const formValue = ref({
  title: null,
  userID: null,
  roleID: null,
  countryDivisionID: null
})

const listUser = ref([])
const getListUser = () => {
  const body = {
    keyword: null,
    pageNumber: 1,
    take: 10
  }
  MakeResponse.makeServerResponse(UserServices.getListUser(body), true, result => {
    listUser.value = result.results
  });
}


const addOrEditUserRole = () => {
  const body = {
    pageNumber: formValue.value,
    take: formValue.value,
    systemID: formValue.value,
    roleID: formValue.value,
    userID: formValue.value
  }
  MakeResponse.makeServerResponse(UserServices.addRoleBranch(body), true, result => {
    ToastNotificationService.success('با موفقیت ثبت شد');
    emit('refresh')
    closeModal()
  });
}

onMounted(() => {
  getRols()
  getListUser()
  console.log(props.editData)
  if (props.mode === true) {
    formValue.value.userID = props.editData.userID
    formValue.value.roleID = props.editData.roleID
  }
})
</script>

<style scoped>

</style>