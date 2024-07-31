<template>
  <nav id="navbarBlur" class="text-dark"
       style="border-radius :0px 0px 100px 100px;background: linear-gradient(270deg, #E8F1FF 0%, #FFFFFF 97.5%)"
       :class="navStore.navFixed? `navbar navbar-main navbar-expand-lg px-0  border-radius-xl
       shadow-none position-sticky left-auto top-2 z-index-sticky ${navStore.darkMode ? 'bg-default' : 'bg-white' }`:
       `navbar navbar-main navbar-expand-lg px-0  border-radius-xl shadow-none`"
       v-bind="$attrs"
       data-scroll="true">
    <div class="px-3   container-fluid row mx-0">
      <div class="sidenav-toggler sidenav-toggler-inner col-3  mx-3 mb-3 ">
        <a href="#" class="p-0 nav-link text-body" @click.prevent="toggleSidenav">
          <div class="sidenav-toggler-inner">
            <i class="pi pi-"></i>
            <i class="sidenav-toggler-line"
               :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark' : '' ">
            </i>
            <i class="sidenav-toggler-line"
               :class="navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark' : '' ">
            </i>
            <i class="sidenav-toggler-line"
               :class=" navStore.navFixed && !navStore.darkMode ? ' opacity-8 bg-dark' : '' ">
            </i>
          </div>
        </a>
      </div>

      <div class="col-2 d-flex flex-column align-items-center justify-content-center border-left p-2">
        <img src="/img/logo.png" alt="logo"
             width="140"/>
      </div>

      <div class="col-2 d-flex flex-column p-3 align-items-center justify-content-center cursor-pointer border-left p-2"
           v-tooltip.bottom="'پروفایل'">
        <NuxtLink class="d-flex flex-column align-items-center justify-content-center item-link" to="#">
<!--          <i class="pi pi-credit-card"></i>-->
          <img src="/img/icons/profil.svg"/>
          <span>پروفایل </span>
        </NuxtLink>
      </div>

      <div class="col-2 d-flex flex-column   align-items-center justify-content-center cursor-pointer border-left p-2"
          v-tooltip.bottom="'اخبار و اطلاعیه ها'">
        <NuxtLink class="d-flex flex-column align-items-center justify-content-center item-link"
                  to="/content-managment/news">
<!--          <i class="pi pi-credit-card"></i>-->
          <img src="/img/icons/icon-news.svg"/>
          <span>اخبار و اطلاعیه ها</span>
        </NuxtLink>
      </div>

      <div class="col-2 d-flex flex-column d-flex flex-column align-items-center justify-content-center cursor-pointer border-left p-2"
          v-tooltip.bottom="'تغییر رمز عبور'">
        <NuxtLink class="d-flex flex-column align-items-center justify-content-center item-link" to="#">
<!--          <i class="pi pi-refresh"></i>-->
          <img src="/img/icons/icon-reset.svg"/>
          <span>تغییر رمز عبور </span>
        </NuxtLink>
      </div>

<!--      <div-->
<!--          class="col-2 d-flex flex-column d-flex flex-column align-items-center justify-content-center cursor-pointer border-left p-3"-->
<!--          v-tooltip.bottom="'راهنما'">-->
<!--        <NuxtLink class="d-flex flex-column align-items-center justify-content-center item-link" to="#">-->
<!--          <i class="pi pi-check"></i>-->
<!--          <span>راهنما</span>-->
<!--        </NuxtLink>-->

<!--      </div>-->

      <div class="col-1 d-flex flex-column d-flex flex-column align-items-center justify-content-center cursor-pointer"
           v-tooltip.bottom="'خروج'" @click="logOut">
        <i class="pi pi-power-off"></i>
        <span>خروج</span>
      </div>
    </div>

  </nav>
</template>
<script setup>

import {useNavStore} from "~~/stores/NavStore";
import {onMounted} from "vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

const fullName = ref(null);
const showMenu = ref(false);

const navStore = useNavStore();

function toggleSidenav() {
  navStore.toggleSidenavCollapsing();
}

function toggleShowConfig() {
  navStore.toggleShowConfig();
}

const logOut = () => {
  localStorage.removeItem("user");
  navigateTo("/authentication/login");
};
onMounted(() => {
  fullName.value = JSON.parse(localStorage.getItem("authToken"));
});
</script>
<style scoped>
.search-input {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.search-input,
.search-icon {
  background-color: rgb(23, 23, 23);
}

.search-input:focus,
.search-input:focus > .search-icon {
  background-color: rgb(255, 255, 255) !important;
}

.caret-up {
  position: absolute;
  top: -13px;
  left: 10px;
  font-size: 24px;
}

.navbar-nav {
  flex-direction: row !important;
}

.border-left {
  border-left: 1px solid #CCD7FF;
}

.item-link {
  font-weight:unset !important;
}
</style>
  