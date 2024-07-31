<template>
  <BaseCover :title="'طرح های کاندید'" :is-search="false" :is-add="false">
    <div class="row mx-5 justify-content-center">
      <div class="col-12 col-md-6" v-for="item in data" :key="item.id" @click="navigate(item.url)">
        <div class="cursor-pointer px-3 py-4 card-style my-4 text-center">
          {{ item.title }}
        </div>
      </div>
    </div>
  </BaseCover>
</template>

<script setup lang="ts">
const data = ref([
  {id: '1', title: 'قابلیت اجرای طرح روستای بدون بیکار', url: '/infrastructure-management/candidate-designs/without-unemployed'},
  {id: '2', title: 'قابلیت اجرای طرح روستای نو فن', url: '/infrastructure-management/candidate-designs/village-plan'},
  {id: '3', title: 'قابلیت اجرای طرح هر روستا یک محصول', url: '/infrastructure-management/candidate-designs/product-village'},
  {id: '4', title: 'قابلیت تشکیل صندوق خرد محلی', url: '/infrastructure-management/candidate-designs/local-fund'},
  {id: '5', title: 'قابلیت برگزاری  برنامه کار و بوم', url: '/infrastructure-management/candidate-designs/boom-programs'}
])

const navigate = (url) => {
  navigateTo(url)
}

</script>

<style scoped>
.card-style {
  background: linear-gradient(90deg, #B5C5EA 1.8%, #D6CBFF 59.88%);
  box-shadow: 0px 4px 4px 0px #00000038;
  border-radius: 8px;
  border: 1px solid #ffffff
}

</style>