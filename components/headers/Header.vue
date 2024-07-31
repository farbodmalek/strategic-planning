<template>
  <div
      class="d-flex justify-content-between align-items-center position-fixed  px-3 z-1  top-0  "
      style="left:9px;height:85px;border-radius: 0px 0px 70px 70px;box-shadow: 10.35px 11.5px 72.43px 0px #0000003D;background: linear-gradient(270deg, #E8F1FF 0%, #FFFFFF 97.5%);">
    <div class="row w-100 d-flex justify-content-between align-items-center mx-0">

      <div class="col-2 cursor-pointer  line-left p-2 text-center"><img src="/img/header/logo.png" alt="logo"
                                                                        width="150"/></div>
      <div class="col-2  cursor-pointer  line-left d-lg-block d-none">
        <nuxt-link class="d-flex flex-column align-items-center gap-1" to="#"><i class="pi pi-user"></i>پروفایل
        </nuxt-link>
      </div>

      <div class="col-2 d-flex flex-column align-items-center gap-1 cursor-pointer  line-left d-lg-block d-none">
        <nuxt-link class="d-flex flex-column align-items-center gap-1" to="/content-managment/news"><i
            class="pi pi-credit-card"></i>اخبار و اطلاعیه ها
        </nuxt-link>
      </div>

      <div class="col-2 d-flex flex-column align-items-center gap-1 cursor-pointer  line-left d-lg-block d-none">
        <nuxt-link class="d-flex flex-column align-items-center gap-1" to="/content-managment/news"><i
            class="pi pi-refresh"></i>تغییر رمز عبور
        </nuxt-link>
      </div>

      <div class="col-3  cursor-pointer  d-lg-block d-none"></div>
      <div class="col-3 col-lg-1 cursor-pointer">
        <NuxtLink class="d-flex flex-column align-items-center gap-1" to="/authorization/login"><i
            class="pi pi-power-off"></i>خروج
        </NuxtLink>
      </div>

    </div>
    <!--      <i class="pi pi-bars me-3 cursor-pointer" @click="store.toggleSidebar"></i>-->
    <!--      <img src="/img/header/logo.png" alt="logo" width="180"/>-->
  </div>
</template>

<script setup lang="ts">
import {useStore} from "~/store/menu-store";

const route = useRoute();
const router = useRouter()
const visible = ref(true);
const store = useStore();
const UserData = ref()

watch(visible, (value) => {
  store.isSidebarActive = value
})
</script>

<style scoped>
.line-left {
  border-left: 1px solid gray;
  padding: 20px;
}

@media (max-width: 575.98px) {
  .line-left {
    border-left: none;
  }

}
</style>