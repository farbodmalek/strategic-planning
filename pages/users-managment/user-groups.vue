<template>
  <BaseCover :title="'مدیریت گروه های کاربری'" :is-add="false" :is-search="false">
    <div class="row mx-0">
      <div class="me-3 mb-4">
        <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="visible=true"><i
            class="pi pi-plus ms-2"></i> تعریف کاربر - نقش جدید
        </Button>
      </div>
    </div>

    <FilterUserRole @filterData="filterData($event)"/>

    <CmpTable :cols="cols" :products="list" class="my-3" :totalRows="totalRows" @emited="changed($event)"/>
    <Dialog v-model:visible="visible" modal :header="isEdit?'ویرایش کاربر - نقش ':'ثبت کاربر - نقش جدید'"
            :style="'width:40vw'">
      <AddUserRole @close="closeModal" @refresh="getUserRoles" :editData-="editData" :mode="isEdit"/>
    </Dialog>

  </BaseCover>
</template>

<script setup lang="ts">
import {UserServices} from "~/core/user-managment/user-services";
import {MakeResponse} from "~/composables/make-response";
import AddUserRole from "~/pagesComponents/users/AddUserRole.vue";
import FilterUserRole from '../../pagesComponents/users/FillterUserRole.vue'

const cols = ref([
  {id: 1, field: "fullName", header: 'نام - نام خانوادگی '},
  {id: 2, field: "nationalCode", header: 'کدملی'},
  {id: 3, field: "roleDesc", header: 'نقش'},
  {id: 4, field: "countryDivisionTitle", header: 'استان -شهرستان'},
])

const list = ref([])
const editData = ref()
const isEdit = ref(false)
const visible = ref(false)
const keyword = ref()
const totalRows = ref()
const closeModal = () => {
  visible.value = false
}

const options = ref([
  {id: 1, title: 'امکان ثبت و ویرایش و حذف تقسیمات کشوری'},
  {id: 2, title: 'امکان ثبت و ویرایش اطلاعات زیرساخت'},
  {id: 3, title: 'امکان ثبت و ویرایش اطلاعات کسب و کار'},
  {id: 4, title: 'امکان ثبت و ویرایش اطلاعات جمیعتی'},
  {id: 5, title: 'امکان ثبت و ویرایش طرح های کاندید'},
])

const changed = (val) => {
  console.log(val)
  const body = {
    keyword: keyword.value,
    pageNumber: val.pageCount,
    take: 10
  }
  MakeResponse.makeServerResponse(UserServices.getUserRoles(body), true, result => {
    totalRows.value = result.totalRows
    if (result) {
      list.value = result.results.map(m => {
        return {
          fullName: m.fullName,
          userName: m.userName,
          roleDesc: m.roleDesc,
          countryDivisionTitle: m.countryDivisionTitle,
          userID: m.userID,
          roleID: m.roleID
        }
      })
      list.value.forEach((x, index) => onColumnActions(index));
    }
  });

}

const getUserRoles = () => {
  const body = {
    keyword: keyword.value,
    pageNumber: 1,
    take: 10
  }
  MakeResponse.makeServerResponse(UserServices.getUserRoles(body), true, result => {
    totalRows.value = result.totalRows
    if (result) {
      list.value = result.results.map(m => {
        return {
          fullName: m.fullName,
          nationalCode: m.nationalCode,
          roleDesc: m.roleDesc,
          countryDivisionTitle: m.countryDivisionTitle,
          userID: m.userID,
          roleID: m.roleID
        }
      })
      list.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const filterData = (value) => {
  const body = {
    pageNumber:1,
    take:100,
    userID: value.userID,
    roleID: value.roleID,
    systemID: value.systemID,
  }
  MakeResponse.makeServerResponse(UserServices.getUserRoles(body), true, result => {
    totalRows.value = result.totalRows
    if (result) {
      list.value = result.results.map(m => {
        return {
          fullName: m.fullName,
          nationalCode: m.nationalCode,
          roleDesc: m.roleDesc,
          countryDivisionTitle: m.countryDivisionTitle,
          userID: m.userID,
          roleID: m.roleID
        }
      })
      list.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const selected = ref()
const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 9,
      icon: "pi pi-user",
      style: "text-success",
      label: " تغیر نقش",
      onClick(item) {
        openEdit(item)
      },
    },
    // {
    //   id: 9,
    //   icon: "pi pi-trash",
    //   style: "text-danger",
    //   label: "حذف ",
    //   onClick() {
    //   },
    // },

  ];
};

const openEdit = (item) => {
  console.log(item)
  isEdit.value = true
  visible.value = true
  editData.value = item
}
onMounted(() => {
  getUserRoles()
})
</script>

<style scoped>

</style>