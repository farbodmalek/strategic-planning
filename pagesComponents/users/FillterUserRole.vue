<template>
  <div class="row mx-0 px-4">
    <div class="d-flex flex-column  col-12 col-md-4 my-3">
      <span> سامانه </span>
      <Dropdown v-model="filterValue.systemID" :options="system" optionLabel="title"
                placeholder="انتخاب کنید"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-md-4 my-3">
      <span> نقش </span>
      <Dropdown v-model="filterValue.roleID" :options="roles" optionLabel="roleDesc"
                placeholder="انتخاب کنید"
                option-value="roleID"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex flex-column  col-12 col-md-4 my-3">
      <span> کاربر </span>
      <Dropdown v-model="filterValue.userID" :options="users" optionLabel="fullName"
                placeholder="انتخاب کنید"
                option-value="id"
                class="w-100 md:w-14rem  shadow-lg"/>
    </div>

    <div class="d-flex col-6 my-3">
      <Button class="bg-primary  rounded d-flex align-items-center justify-content-center px-6" @click="emitData"><i
          class="pi pi-filter ms-3"></i> فیلتر
      </Button>
    </div>

  </div>
</template>

<script setup lang="ts">
import {UserServices} from "../../core/user-managment/user-services";
import {MakeResponse} from "~/composables/make-response";

const emit = defineEmits(['filterData'])
const system = ref()
const roles = ref()
const users = ref()

const getSystem = () => {
  MakeResponse.makeServerResponse(UserServices.getSystem(), true, result => {
    if (result) {
      system.value = result.results
    }
  });
}

const getUsers = () => {
  const body = {
    pageNumber: 1,
    take: 100
  }
  MakeResponse.makeServerResponse(UserServices.getListUser(body), true, result => {
    if (result) {
      users.value = result.results.map(m => {
        return {
          fullName: m.firstName + ' ' + m.lastName,
          id: m.id
        }
      })
    }
  });
}

const getRolse = () => {
  const body = {}
  MakeResponse.makeServerResponse(UserServices.getRols(body), true, result => {
    if (result) {
      roles.value = result.results
    }
  });
}

const filterValue = ref({
  userID: null,
  roleID: null,
  systemID: null,
})

const emitData = () => {
  emit('filterData', filterValue.value)
}


onMounted(() => {
  getSystem()
  getRolse()
  getUsers()
})
</script>

<style scoped>

</style>