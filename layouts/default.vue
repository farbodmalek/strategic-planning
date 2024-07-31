<template>
  <div class="position-relative" id="app-layout" :class="isCollapsed ? 'g-sidenav-hidden' : 'g-sidenav-show'">
    <div class="min-height-300 position-absolute w-100  "/>
    <SidenavRTL/>
    <main class="main-content position-relative  h-100 back-nav">
      <NavbarRTL/>
      <slot/>
      <!--      <FooterRTL :isHeight="isHeight"/>-->
      <!--      <Configurator isRTL/>-->
    </main>
  </div>
</template>

<script setup>
import SidenavRTL from "@/pagesComponents/Sidenav/sidnav.vue";
import NavbarRTL from "@/pagesComponents/Navbar/navbar.vue";
// import FooterRTL from "@/pagesComponents/Footer/footer.vue";
// import Configurator from "~~/pagesComponents/Configurator";
import {useNavStore} from "~~/stores/NavStore";

const navStore = useNavStore();
const isHeight = ref(false);
const isCollapsed = computed(() => {
  return navStore.isSidenavCollapsed;
});

useHead({
  bodyAttrs: {
    class: "bg-gray-100 ",
  },
  htmlAttrs: {
    lang: "ar",
  },
});

onUnmounted(() => {
  useHead({
    bodyAttrs: {
      class: "bg-gray-100",
    },
    htmlAttrs: {
      lang: "en",
    },
  });
});
</script>
<style>
.back-nav {
  background: linear-gradient(180deg, #D0D5FF 0%, #D5F5FF 28.5%, #F8FBFF 55%);
  /*background-image: url(/img/back-main.png);*/
  /*background-size: cover;*/
}
</style>
  