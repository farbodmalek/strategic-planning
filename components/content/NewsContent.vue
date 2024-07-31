<template>
  <div class="position-relative w-100">
    <!--    <Loader v-if="isLoading" style="top: 1rem;right: 0;"/>-->
    <TabView @tab-change="onChangeTab($event.index)" class="w-100">
      <TabPanel class="w-100" header="اخبار">
        <div class="" v-for="(item, index) in dataNews" :key="index"
             :data-list-id="item.id">
          <div class="news-bx d-flex align-items-center justify-content-between">
            <div class="col-md-9 col-sm-9 col-xs-12">
              <div class="row mt-2">
                <div class="col-md-8 col-sm-12">
                  <NuxtLink :to="{path: '/news/newEvents', query: {bundle: item.bundle}}" :key="$route.fullPath">
                    <span class="font--1-5 fw-bolder color-header">{{ item.title ? item.title : '---' }}</span>
                  </NuxtLink>
                </div>
                <div
                    class="font--1-5 fw-bolder color-header col-md-4 col-sm-12 d-flex justify-content-end text-primary">
                  تاریخ انتشار: {{ item?.currentStatus?.doneDate }}
                </div>
              </div>
              <p class="mt-1 font-weight-bold">
                <br>
                {{ item.upTitr ? item.upTitr.slice(0, 150) : '---' }}
                <span>
              <NuxtLink :to="{path: '/news/newEvents', query: {bundle: item.bundle}}" :key="$route.fullPath">
                ... جزئیات
              </NuxtLink>
            </span>
              </p>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 d-flex justify-content-end">
              <img src="https://shoghl.mcls.gov.ir/_nuxt/img/nw.066cbeb.png" class="img-responsive" alt="img"
                   v-if="item.id === 9"/>
              <img :src="mediaUrl+item.cover" class="img-responsive" alt="img" v-if="item.cover"/>
              <img src="https://shoghl.mcls.gov.ir/_nuxt/img/nw.066cbeb.png" style="max-width: 100px"
                   class="img-responsive" alt="img" v-else/>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <!--        <Pagination :paging-info="pageInfo" @tableChange="onChangePage($event)"/>-->
      </TabPanel>
      <TabPanel header="مطالب و مقالات">
        <div class="" v-for="(item, index) in dataNews" :key="index"
             :data-list-id="item.id">
          <div class="news-bx d-flex align-items-center">
            <div class="col-md-9 col-sm-9 col-xs-12">
              <div class="row mt-2">
                <div class="col-md-8 col-sm-12">
                  <NuxtLink :to="{path: '/news/newEvents', query: {bundle: item.bundle}}" :key="$route.fullPath">
                    <span class="font--1-5 fw-bolder color-header">{{ item.title ? item.title : '---' }}</span>
                  </NuxtLink>
                </div>
                <div
                    class="font--1-5 fw-bolder color-header col-md-4 col-sm-12 d-flex justify-content-end text-primary">
                  تاریخ انتشار: {{ item?.currentStatus?.doneDate }}
                </div>
              </div>
              <p class="mt-1 font-weight-bold">
                <br>
                {{ item.upTitr ? item.upTitr.slice(0, 150) : '---' }}
                <span>
              <NuxtLink :to="{path: '/news/newEvents', query: {bundle: item.bundle}}" :key="$route.fullPath">
                ... جزئیات
              </NuxtLink>
            </span>
              </p>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12 d-flex justify-content-end">
              <img src="https://shoghl.mcls.gov.ir/_nuxt/img/nw.066cbeb.png" class="img-responsive" alt="img"
                   v-if="item.id === 9"/>
              <img :src="mediaUrl+item.cover" class="img-responsive" alt="img" v-if="item.cover"/>
              <img src="https://shoghl.mcls.gov.ir/_nuxt/img/nw.066cbeb.png" style="max-width: 100px"
                   class="img-responsive" alt="img" v-else/>
            </div>
            <div class="clear"></div>
          </div>
        </div>

        <!--        <Pagination :paging-info="pageInfo" @tableChange="onChangePage($event)"/>-->
      </TabPanel>
    </TabView>

  </div>
</template>

<script setup>
import {onMounted} from "vue";

const props = defineProps({
  dataNews: {
    type: Array,
    default: ''
  }
})
onMounted(() => {
})

</script>

<style scoped>
.news-bx {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin: 10px 0;
  padding: 10px 20px;
  border-right: 10px;
}

p-tabview-header {
  width: 600px
}

</style>