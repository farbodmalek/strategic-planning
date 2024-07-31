<template>
  <div class=" box-shadow-2 p-0 pe-4 h-100 position-fixed"
       style="background: linear-gradient(90deg, #C2CCEC 13.5%, #EDF1FD 22.5%, #AEBCDE 33.5%, #2E5680 100%);z-index:1111;"
       :class="store.isSidebarActive?'width-1':'width-2'">
    <div class="h-100  p-3 position-relative overflow-y-auto" dir="ltr"
         style="background: linear-gradient(0deg, #83ABE6 0%, #5981B3 0.01%, #002748 100%);">
      <span class="position-absolute cursor-pointer" style="left: -16px"><img
          :src="store.isSidebarActive?'/img/arrow-left.svg':'/img/arrow-right.svg'" width="40" alt=""
          @click="store.isSidebarActive=!store.isSidebarActive"/></span>
      <div class="text-center mt-5 p-4">
        <img src="/img/icon/men.svg" width="100"/>
      </div>
      <div class=" mt-4">
        <ul class="list-none p-0 m-0">
          <li v-for="item in SidebarItem" :key="index">
            <nuxt-link :to=item.url @click="activeSubMenu(item)"
                       :class="!store.isSidebarActive?'justify-content-center':''"
                       class="d-flex align-items-center justify-content-between  cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <i class="text-white me-2" v-if="item.subMenu"
                 :class="[item.isActive?'pi pi-chevron-up':'pi pi-chevron-down',!store.isSidebarActive?'d-none':'']"></i>
              <div>
                <span :class="!store.isSidebarActive?'d-none':''" class="font-1 text-white">{{ item.label }}</span>
                <span :style="`background-color:${item.color}`" class="p-1 rounded-pill">
                <img :src="item.img" alt="" width="20"/>
                </span>
              </div>
            </nuxt-link>
            <ul v-if="item.isActive" class="list-none p-0  m-0 overflow-hidden">
              <li v-for="menu in item.subMenu" :key="index" class="ps-3">
                <nuxt-link :to=menu.url @click="actives(menu)"
                           class="line py-3 ps-3 d-flex align-items-center justify-content-end cursor-pointer  border-round  text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                  <!--                  <i class="text-white" :class="menu.icon"></i>-->
                  <i v-if="menu.subMenu" class="me-2 font-0-8 text-white"
                     :class="menu.isActiveSub?'pi pi-chevron-up':'pi pi-chevron-down'"></i>
                  <div class="d-flex align-items-center justify-content-end">
                  <span class="font-medium text-white" :class="menu.isActiveSub?'text-success':''">{{
                      menu.label
                    }}</span>
                    <span :style="`background-color:${menu.color}`" class="p-1  rounded-pill">
                                <img :src="menu.img" alt="" width="20"/></span>
                  </div>
                </nuxt-link>

                <ul v-if="menu.isActiveSub" class="list-none p-0 m-0 overflow-hidden">
                  <li v-for="menu2 in menu.subMenu" :key="index" class="ps-3">
                    <nuxt-link :to=menu2.url
                               class="line  d-flex align-items-center justify-content-end cursor-pointer  border-round  text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                      <!--                      <i class="text-white" :class="menu2.icon"></i>-->
                      <span class="font-medium  py-2 text-white">{{ menu2.label }}</span>
                      <span :style="`background-color:${menu2.color}`" class="p-1 rounded-pill ms-3">
                                <img :src="menu2.img" alt="" width="20"/></span>
                    </nuxt-link>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "~/store/menu-store";
import index from "primevue/passthrough/tailwind/index.esm";

const router = useRouter();
const store = useStore();
const visible = ref(true);
const SidebarItem = store.sidebarItems[0]
const activeSubMenu = (item) => {
  item.isActive = !item.isActive
}
const actives = (item) => {
  item.isActiveSub = !item.isActiveSub
}
</script>

<style scoped>
.width-1 {
  width: 306px;
}

.width-2 {
  width: 7.666667%
}

.list-none {
  list-style: none;
}

.overflow-y-auto {
  overflow-y: auto;
  overflow-x: hidden;
}

.line {
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

@media (max-width: 575.98px) {
  .wid {
    width: 7.666667%
  }
}
</style>