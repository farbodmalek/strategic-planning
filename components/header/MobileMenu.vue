<template>
  <ul class="edublink-mobile-menu mainmenu">
    <li v-for='(link, i) in menus' :key='i'>
      <n-link :to="link.url" v-html="link.title"></n-link>
      <span class="submenu-toggle" v-if="link.submenu">
        <i class="ri-arrow-down-s-line"></i>
      </span>
      <ul class="submenu-wrapper" v-if="link.submenu">
        <li v-for='(link, i) in link.submenu' :key='i' class="title">
          <n-link :to="link.url" v-html="link.title"></n-link>
          <span class="submenu-toggle" v-if="link.submenu">
            <i class="ri-arrow-down-s-line"></i>
          </span>
          <ul class="submenu-wrapper" v-if="link.submenu">
            <li v-for='(link, i) in link.submenu' :key='i'>
              <n-link :to="link.url" v-html="link.title"></n-link>
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import mobileMenuResponsive from '../../common/mobileMenuResponsive';

export default {
  data() {
    return {
      menus: [
        {
          url: '/',
          title: 'صفحه اصلی',
        },
        {
          url: '/login',
          title: 'ورود',
        },
        {
          url: '/about-us',
          title: 'درباره ی ما',
        },
        {
          url: '',
          title: 'کارجویان',
          submenu: [
            {
              url: '/register/account',
              title: 'ثبت نام کارجو'
            },
            {
              url: '/jobSeeker/list',
              title: 'جستجوی کارجو'
            },
          ]
        },
        {
          url: '',
          title: 'کارفرمایان',
          submenu: [
            {
              url: '/register/account',
              title: 'ثبت نام کارفرما'
            },
            {
              url: '/employer/JobOpportunity',
              title: 'جستجو ی فرصت شغلی'
            },
          ]
        },
        {
          url: '',
          title: 'کاریابی ها',
          submenu: [
            {
              url: '/register/placement',
              title: 'ثبت نام کاریابی'
            },
            {
              url: '/placement/lists',
              title: 'جست و جوی کاریابی'
            },
          ]
        },
      ]
    }
  },
  mounted() {
    mobileMenuResponsive();
  }
}
</script>
