<template>
  <div class="d-flex justify-content-start">
    <Sidebar v-model:visible="store.isSidebarActive" position="right" v-model:dismissable="dismissable"
             class="bg-blue-8"
             v-model:modal="dismissable"
             style="box-shadow: 10px 10px 30px 0px #00000033 inset;">
      <template #container="{ closeCallback}">
        <div class="d-flex flex-column h-full" style="overflow-y: auto;">
          <div class="d-flex flex-column  px-4 pt-3 flex-shrink-0">
                          <span class="d-flex justify-content-end">
                <!--<img src="/img/arrow.png" alt="" width="100" @click="store.isSidebarActive=!store.isSidebarActive"/>-->
                            <i type="button" @click="closeCallback" class="pi pi-times rounded-pill p-3 bg-white"></i>
                          </span>
            <span class="text-center">
                <img src="/img/icon/men.svg" width="100"/>
            </span>
          </div>
          <div class="overflow-y-auto">
            <ul class="list-none p-0 m-0 overflow-hidden">
              <li v-for="item in SidebarItem" :key="index">
                <nuxt-link :to=item.url @click="activeSubMenu(item)"
                           class="d-flex align-items-center  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <i class="text-white" :class="item.icon"></i>
                  <span class="font-1 text-white" :class="item.isActive?'text-success':''">{{ item.label }}</span>
                  <i class="text-white me-4" v-if="item.subMenu"
                     :class="item.isActive?'pi pi-chevron-up':'pi pi-chevron-down'"></i>
                </nuxt-link>
                <ul v-if="item.isActive" class="list-none p-0  m-0 overflow-hidden">
                  <li v-for="menu in item.subMenu" :key="index" class="ps-3">
                    <nuxt-link :to=menu.url @click="actives(menu)"
                               class="line py-3 ps-3 d-flex align-items-center justify-content-start cursor-pointer  border-round  text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                      <i class="text-white" :class="menu.icon"></i>
                      <span class="font-medium text-white" :class="menu.isActiveSub?'text-success':''">{{
                          menu.label
                        }}</span>
                      <i v-if="menu.subMenu" class="me-4 font-0-8 text-white"
                         :class="menu.isActiveSub?'pi pi-chevron-up':'pi pi-chevron-down'"></i>
                    </nuxt-link>

                    <ul v-if="menu.isActiveSub" class="list-none p-0 m-0 overflow-hidden">
                      <li v-for="menu2 in menu.subMenu" :key="index" class="ps-3">
                        <nuxt-link :to=menu2.url
                                   class="line  d-flex align-items-center justify-content-start cursor-pointer  border-round  text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                          <i class="text-white" :class="menu2.icon"></i>
                          <span class="font-medium me-2 py-2 text-white">{{ menu2.label }}</span>
                        </nuxt-link>
                      </li>
                    </ul>

                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </Sidebar>
  </div>
</template>
<script lang="ts" setup>
import {BasePage} from "~/core/base/base-page";
import {useStore} from "~/store/menu-store";
import Sidebar from 'primevue/sidebar';
import index from "primevue/passthrough/tailwind/index.esm";
import {ToastNotificationService} from "~/core/toast-notification-service";

const router = useRouter();
const store = useStore();
const UserData = ref()
const visible = ref(true);
const dismissable = ref(false);
const SidebarItem = store.sidebarItems[0]
const showSubMenu = ref(false)

onMounted(() => {
  UserData.value = BasePage.getLoggedUser()
})

const activeSubMenu = (item) => {
  item.isActive = !item.isActive
}
const actives = (item) => {
  item.isActiveSub = !item.isActiveSub
}
const handleResize = () => {
  const screenWidth = window.innerWidth;
  if (screenWidth >= 300 && screenWidth <= 800) {
    visible.value = false;
  }
};

onMounted(() => {
  window.addEventListener('resize', handleResize);
  handleResize();
  // getMenuActive()
});


const getMenuActive = () => {
  SidebarItem.forEach((p) => {
    p.isActive = p.url === router.path;
    if (p.subMenu && p.subMenu.length > 0) {
      p.subMenu.forEach((x) => {
        x.isActive = x.url === router.path;
        if (x.url === router.path)
          p.isExpanded = true;
        // p.isExpanded = x.url === router.path;
      });
    }
  });
};


onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

watch(
    () => router.path,
    () => getMenuActive(),
    {deep: true, immediate: true}
);


const RouterHandel = (id: number) => {
  if (id === 10) {
    localStorage.clear()
    localStorage.setItem("splash", true)
    const router = useRouter()
    router.push("/authorization/login")
  }
}


</script>
<style>
.line {
  /*height: 300px;*/
  /*width: 300px;*/
  /*background: lightgray;*/
  position: relative;
  /*border-bottom: 1px solid white;*/
  border-right: 2px solid white;

}

.line:before {
  content: "";
  position: absolute;
  height: 10%;
  width: 26%;
  border: 2px solid transparent;
  border-bottom-color: white;
  /*top: -5px;*/
  left: 93%;
  /*border-radius: 50%;*/
  transform: rotate(180deg);
  /*width: 1px;*/
  /*height: 100px;*/
  border-radius: 50%/100px 100px 0 0;
}
</style>
