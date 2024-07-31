<template>
  <div class="d-flex flex-column">
    <BaseCover :title="'لیست کاربران'" @openModal="addUser()" @showFilter="toggleShow" :tooltip="'افزودن کاربر جدید'">
<!--      <div class="row mx-0">-->
<!--        <div class="me-3 mb-4">-->
<!--          <Button class="bg-primary  rounded d-flex align-items-center justify-content-center" @click="visible=true"><i-->
<!--              class="pi pi-plus ms-2"></i> افزودن کاربر جدید-->
<!--          </Button>-->
<!--        </div>-->
<!--      </div>-->

      <div class="row mx-0 align-items-center me-3">
        <div class="d-flex flex-column gap-2 col-12 col-md-4 my-3">
          <span> جستجو</span>
          <InputText v-model="fullName" class=" shadow-lg" placeholder="نام ، نام خانوادگی ، ..."/>
        </div>
        <div class="d-flex  col-12 col-md-2 mt-4">
          <Button class="bg-primary w-100" @click="getListUser">فیلتر</Button>
        </div>
      </div>

      <CmpTable :cols="cols" class="my-3" :products="list" @emited="changed($event)" :totalRows="totalRows"/>

      <Dialog v-model:visible="visible" :draggable="false" modal :header="isEdit?'ویرایش کاربر':'افزودن کاربر جدید'"
              :style="'width:50vw'">
        <AddUser @close="closeModal" @refresh="getListUser" :editData-="editData" :mode="isEdit"/>
      </Dialog>

      <Toast />
      <ConfirmDialog></ConfirmDialog>
      <Dialog v-model:visible="newRole" :draggable="false" modal header="ثبت کاربر-نقش جدید"
              :style="'width:40vw'">
        <AddUserRole @close="closeModal" @refresh="getListUser"/>
      </Dialog>

    </BaseCover>
  </div>
</template>
<script setup lang="ts">
import AddUser from "../../pagesComponents/users/add-user.vue";
import {UserServices} from "~/core/user-managment/user-services";
import {MakeResponse} from "~/composables/make-response";
import AddUserRole from "~/pagesComponents/users/AddUserRole.vue";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import {ToastNotificationService} from "~/core/toast-notification-service";

const confirm = useConfirm();
const toast = useToast();

const cols = ref([
  {id: 1, field: "fullName", header: 'نام و نام خانوادگی'},
  {id: 2, field: "userName", header: 'نام کاربری'},
  // {id: 3, field: "mobile", header: 'موبایل'},
  // {id: 5, field: "city", header: 'استان - شهرستان'},
])

const closeModal = () => {
  visible.value = false
  newRole.value = false
}

const list = ref([])
const editData = ref({})
const fullName = ref()
const totalRows = ref()

const changed = (val) => {
  const body = {
    keyword: null,
    pageNumber: val.pageCount,
    take: 100,
  }
  MakeResponse.makeServerResponse(UserServices.getListUser(body), true, result => {
    totalRows.value = result.totalRows
    if (result) {
      list.value = result.results.map(m => {
        return {
          fullName: m.fullName,
          firstName: m.firstName,
          lastName: m.lastName,
          mobile: m.mobile,
          userName: m.userName
        }
      })
      list.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const getListUser = () => {
  const body = {
    fullName:fullName.value,
    pageNumber: 1,
    take: 100
  }
  MakeResponse.makeServerResponse(UserServices.getListUser(body), true, result => {
    totalRows.value = result.totalRows
    if (result) {
      list.value = result.results.map(m => {
        return {
          fullName: m.firstName+ '-' + m.lastName,
          firstName: m.firstName,
          lastName: m.lastName,
          mobile: m.mobile,
          userName: m.userName,
          userID: m.userID,
          id:m.id
        }
      })
      list.value.forEach((x, index) => onColumnActions(index));
    }
  });
}

const toggleShow = () => {
  show.value = !show.value
}
const visible = ref(false)
const newRole = ref(false)
const isEdit = ref(false)
const show = ref(false)


const addUser = () => {
  visible.value = true
}

const onColumnActions = (index) => {
  list.value[index].columnActions = [
    {
      id: 9,
      icon: "pi pi-user",
      style: "text-primary",
      label: " افزودن نقش",
      onClick(item) {
        openAddRole(item)
      },
    },
    {
      id: 9,
      icon: "pi pi-user-edit",
      style: "text-success",
      label: "ویرایش ",
      onClick(item) {
        openModalEdit(item)
      },
    },
    {
      id: 9,
      icon: "pi pi-trash",
      style: "text-danger",
      label: "حذف ",
      onClick(item) {
        deleteUser(item)
      },
    },
  ];
};

const deleteUser = (item) => {
    confirm.require({
      message: 'آیا از حذف این شخص اطمینان دارید؟',
      header: 'حذف',
      icon: 'pi pi-info-circle',
      rejectLabel: 'خیر',
      rejectProps: {
        label: 'خیر',
        severity: '',
        outlined: true
      },
      acceptLabel:"بله",
      acceptProps: {
        label: 'بله',
        severity: ''
      },
      accept: () => {
        MakeResponse.makeServerResponse(UserServices.deleteUser(item.userID), true, result => {
          if (result) {
            ToastNotificationService.success('با موفقیت حذف شد');
            getListUser()
          }
        });
      },
      reject: () => {
      }
    });
}

const openModalEdit = (item) => {
  console.log(item)
  visible.value = true
  isEdit.value = true
  editData.value = item
  console.log(editData.value)
}

const openAddRole = (item) => {
  newRole.value = true
}

onMounted(() => {
  getListUser()
})
</script>