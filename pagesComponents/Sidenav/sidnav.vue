<template>
  <aside id="sidenav-main"
         class="sidenav bg-primary navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-0 ms-4 fixed-end  rotate-caret"
         :class="`${navStore.sidenavType}`" style="background: linear-gradient(0deg, #2E5680, #2E5680)">
    <!--    <IconsClose @click.prevent="toggleSidenav" class="close-menu bg-secondary text-white d-lg-none"/>-->
    <i class="pi pi-times  text-black d-lg-none fs-4 position-absolute top-2 " @click.prevent="toggleSidenav"
       style="right: 8px"/>
<!--    <div class="d-flex align-items-center">-->
    <div class="d-flex align-items-center justify-content-center  m-3  box-avatar">
      <Avatar :image="'/img/avatar.svg'"></Avatar>
    </div>
<!--      <i class="pi pi-user" @click.prevent="toggleSidenav"></i>-->
<!--    </div>-->

    <div class="row align-items-center justify-content-center m-3">
      <div class="cursor-pointer col-3" v-tooltip="'داشبورد'">
        <NuxtLink to="/Dashboard">
          <i type="button" class="pi pi-table text-3xl text-white"></i>
        </NuxtLink>
      </div>
      <div class="cursor-pointer col-3" v-tooltip="'صفحه اصلی'" @click="navigateTo('/indexFrontSide')">
        <i type="button" class="pi pi-home text-3xl text-white"></i>
      </div>
    </div>
<!--    <div class="h-100 position-fixed">-->
      <SidenavList class="mt-3" isRTL/>
<!--    </div>-->
  </aside>
</template>

<script setup>
import SidenavList from "./SidenavList.vue";
import {useNavStore} from "~~/stores/NavStore";

const navStore = useNavStore();

function toggleSidenav() {
  navStore.toggleSidenavCollapsing();
}

const logOut = () => {
  localStorage.removeItem("user");
  navigateTo("/authentication/login");
};
</script>

<style scoped>
.main-logo {
  width: 100%;
}

.close-menu {
  position: absolute;
  top: 10px;
  right: 20px;
  border-radius: 3px;
  padding: 2px;
}
.box-avatar{
  border-radius:1rem 0 1rem 1rem;
  height:240px;
  /*Width: 289px;*/
  background-color:#406794;
  box-shadow: 0px 4px 4px 0px #00000040;
}

</style>
  