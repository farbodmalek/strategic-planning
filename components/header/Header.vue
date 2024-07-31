<template>
  <header class=" bg-primary px-6 py-2"
          style="background-color: #B90000">
<!--    style="background-color: #B90000;background-image: url('/img/banner.svg');background-size: cover"-->
    <div class="row mx-0 d-flex align-items-center">
      <div class="col-md-10 col-sm-10 col-xs-10 right">
        <div class="head-ce">
          <div class="col-md-5 col-sm-5 col-xs-12 right logo-bx">
            <div class="mobile-header-section d-block d-lg-none">
              <div class="mobile-header-wrapper">
                <div class="col-12 d-flex justify-content-between align-items-center">
                  <div class="mobile-header--right">
                  <span class="mobile-menu offcanvas-toggle" @click="onOpen(1)">
                    <span class="mobile-menu-dash"></span>
                    <span class="mobile-menu-dash"></span>
                    <span class="mobile-menu-dash"></span>
                  </span>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="openMenu" class="bg-white position-fixed w-90 w-md-50  z-2 d-lg-none end-0 top-0 h-100"
                 style="z-index:100000;">
              <div class="offcanvas-header text-right">
                <button class="offcanvas-close" @click="onClose()"><i class="pi pi-times"></i></button>
              </div>
              <div class="offcanvas-mobile-menu-wrapper">

                <div class="mobile-menu-top">
                  <span><img style="max-width: 100px" src="/img/Logo.svg" alt="logo"/></span>
                </div>

                <div class="mobile-menu-center">
                  <div class="offcanvas-menu">
                    <ul class="list-unstyled">
                      <li @click="onClose()" class="py-2">
                        <nuxt-link to="/" class="d-flex align-items-center justify-content-between">
                          <span>صفحه اصلی</span>
                          <span><i class="pi pi-home left"></i></span>
                        </nuxt-link>
                      </li>

                      <li @click="onClose()" v-if="!isAuthenticated" class="py-2">
                        <nuxt-link to="/authentication/login" class="d-flex align-items-center justify-content-between">
                          <span>ورود به پنل کاربری</span>
                          <span><i class="pi pi-sign-in left"></i></span>
                        </nuxt-link>
                      </li>

                      <li @click="onClose()" v-if="isAuthenticated && loggedInUser" class="py-2">
                        <a :href="url" class="d-flex flex-row-reverse justify-content-between align-items-center">
                          <!--                        <span>پنل کاربری ({{ loggedInUser.fullName }})</span>-->
                          <!--                        <span><i class="pi pi-sign-in left"></i></span>-->
                        </a>
                      </li>

                      <li @click="onClose()" class="py-2">
                        <nuxt-link to="#" class="d-flex align-items-center justify-content-between">
                          <span>پشتیبانی</span>
                          <span><i class="pi pi-shield left"></i></span>
                        </nuxt-link>
                      </li>

                      <li @click="onClose()" class="py-2">
                        <nuxt-link to="" class="d-flex align-items-center justify-content-between">
                          <span>سوالات متداول</span>
                          <span><i class="pi pi-question-circle left"></i> </span>
                        </nuxt-link>
                      </li>

                      <li @click="onOpen(2)" class="py-2">
                        <div class="offcanvas-menu-expand"></div>
                        <nuxt-link @click="onClose()" to="" class="d-flex justify-content-between rtl">
                          <span class="">تماس با ما</span>
                          <span><i :class="!showContactSubMenu ? 'pi pi-chevron-down' : 'pi pi-chevron-up'"></i> </span>
                        </nuxt-link>

                        <ul class="mobile-sub-menu" id="contactMenu">
                          <li class="has-dropdown py-2" @click="onClose()">
                            <nuxt-link to="" class="me-5">
                              <span>درباره ما -</span>
                              <span><i class="pi pi-info left mt-2"></i></span>
                            </nuxt-link>
                          </li>
                        </ul>

                      </li>

                    </ul>
                  </div>

                </div>

              </div>
            </div>
            <div class="d-flex logo-box flex-column">
              <nuxt-link to="/">
                <img class="logo right" style="max-width: 300px" src="/img/logo.png"
                     alt="logo"/>
              </nuxt-link>
              <div class="date right text-white text-xs py-2 me-4">{{ timestamp }} امروز - {{ day }}</div>
            </div>
          </div>

          <div class="col-md-6 col-sm-6 col-xs-12 right se-mb">
          </div>
          <div class="clear"></div>
        </div>

        <div class="d-lg-flex justify-content-between w-100 d-none">
          <div class="col-md-8 col-sm-8 col-xs-12 right">
            <div class="main-menu">
              <nav>
                <ul class="text-sm">
                  <li class="">
                    <nuxt-link to="/" class="font--1-3">
                      <span class="text-white">صفحه اصلی</span>
                    </nuxt-link>
                  </li>

                  <li class="has-dropdown">
                    <nuxt-link to="" class="active main-menu-link font--1-3"><span class="text-white">تماس با ما</span>
                    </nuxt-link>
                    <ul class="sub-menu">
                      <li class="has-dropdown">
                        <nuxt-link to="/about-us">درباره ما</nuxt-link>
                        <nuxt-link to="/ContactUs">
                          <span @click="routeToEnd()">تماس با ما</span>
                        </nuxt-link>
                      </li>
                    </ul>
                  </li>

                  <li>
                    <nuxt-link class="font--1-3" to="#"><span class="text-white font--1-3">پشتیبانی</span></nuxt-link>
                  </li>

                  <li>
                    <nuxt-link to="#"><span class="text-white font--1-3">سوالات متداول</span></nuxt-link>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 col-xs-12 d-flex justify-content-end">
            <div class="d-flex header-top">
              <ul class="header-info ">
                <li v-if="!isAuthenticated">
                  <nuxt-link to="#">
                    <span>ثبت نام </span>
                  </nuxt-link>
                </li>
              </ul>
              <ul class="header-info ">
                <li v-if="!isAuthenticated">
                  <nuxt-link to="/authentication/login">
                    <span class="me-1">ورود به پنل کاربری</span>
                  </nuxt-link>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
      <div class="col-md-2 text-center no-pn">
<!--        <img class="logo2 w-100" style="max-width: 150px" src="https://shoghl.mcls.gov.ir/_nuxt/img/logo3.d3ea520.png"-->
<!--             alt="logo"/>-->
      </div>
    </div>
    <div class="clear"></div>
  </header>
</template>

<script setup>

import {onMounted} from "vue";

const url = ref(null);
const isAuthenticated = ref(false);
const loggedInUser = ref(false);
const timestamp = ref(null);
const showSubMenu = ref(null);
const day = ref(false);
const showContactSubMenu = ref(false);
const openMenu = ref(false)

const getNowDateTime = () => {
  const today = new Date();
  timestamp.value = new Intl.DateTimeFormat('fa-IR').format(today);
  const options = {weekday: "long"};
  day.value = new Intl.DateTimeFormat("fa-IR", options).format(today)
}


const onOpen = () => {
  openMenu.value = !openMenu.value
}

const routeToResume = () => {
  if (this.loggedInUser && this.loggedInUser.type === 1) {
    window.open(process.env.adminPanel + "/person-template/resume", '_blank')
  } else if (loggedInUser.value && (loggedInUser.value.type === 2 || loggedInUser.value.type === 3 || loggedInUser.value.type === 4)) {
    this.$toast.error('شما کارجو نیستید. لطفا به عنوان کارجو وارد پنل شوید یا از طریق پنل کاریابی اقدام کنید.', {duration: 5000});
  } else {
    this.$router.push("/login");
    this.$toast.error('اول وارد پنل شوید', {duration: 3000})
  }
}

const onClose = () => {
  openMenu.value = false
}

onMounted(() => {
  getNowDateTime()
})


</script>

<style scoped lang="scss">

</style>
