<template>
  <li class="sidebar-item" ref="sidebarItem">
    <PanelMenu :model="item" class="shadow-lg">
    <template #item="{ item }">
      <a  v-ripple class="flex align-items-center cursor-pointer text-color px-3 py-2" :href="item.url" :target="item.target">
        <img :src="`${item.img}`" width="20"/>
        <span class="ml-2 font-1 m-3" @click="Logout(item.id)" >{{ item.label }}</span>
        <span v-if="item.items" class="pi pi-angle-down text-primary ml-auto" />
      </a>
    </template>
  </PanelMenu>
  </li>
</template>
<script lang="ts" setup>
const router = useRouter();
import {BasePage} from "~/core/base/base-page";
import {ToastNotificationService} from "~/core/toast-notification-service";
interface Menu {
  name: string;
  key?: string;
  icon?: string;
  url?: string;
  submenu: {
    name: string;
    url: string;
  }[];
}

const props = defineProps<{
  item: Menu;
}>();

const route = useRoute();
const sidebarItem = ref<HTMLElement>();

const Logout =(id:number)=>{
 if(id===6) {
   localStorage.clear()
   localStorage.setItem("splash", true)
   const router = useRouter()
   router.push("/authorization/login")
 }else if (id===5 && BasePage.getLoggedUser().isPersonProfileActive==true){
   ToastNotificationService.error("پروفایل شما فعال است ");
 }else if(id===5 && BasePage.getLoggedUser().isPersonProfileActive==false) {
   const router=useRouter()
   router.push("/authorization/reg-job-seeker/activepage")
 }
}

</script>

<style>

</style>
