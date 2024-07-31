<template>
  <div id="edu-search-popup" class="edu-search-popup">
    <div class="content-wrap">
      <div class="site-logo">
<!--        <n-link to="/">-->
<!--          <img class="logo-light" src="/images/logo/logo-wezarat.png" alt="Dark Logo" width="200px">-->
<!--        </n-link>-->

<!--        <n-link to="/">-->
<!--          <div class="mb-2 w-50">-->
<!--            <img class="logo-light" src="/images/home-imgs/logo.svg" alt="Dark Logo">-->
<!--          </div>-->
<!--          <div class="d-flex flex-column mt-4 logo-title">-->
<!--            <h1 class="mb-0">سامانه جستجوی شغل</h1>-->
<!--          </div>-->
<!--        </n-link>-->

      </div>
      <div class="close-button">
        <button class="close-trigger" @click="searchPopUpClose( 'removeClass', 'open' )"><i class="icon-73"></i>
        </button>
      </div>
      <div class="container edublink-animated-shape">
        <SearchBox/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    SearchBox: () => import('@/components/job-search/SearchBox'),
  },
  methods: {
    searchPopUpClose(triggerRemoveClass, className) {
      const el = document.querySelector('#edu-search-popup');
      if (triggerRemoveClass === 'addClass') {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }
}
</script>
