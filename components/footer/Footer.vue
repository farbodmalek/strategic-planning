<template>
  <div class="bg-primary">
    <div class="container pt-5 pb-2 px-6">
      <div class="row mx-0 justify-content-center text-white">
      </div>
      <div class="row mx-0 justify-content-center text-white">

        <div class="col-12 col-md-2 d-flex flex-column  gap-4">
          <div class="font-weight-bold text-lg mb-4">سرویس ها</div>
          <div class="d-flex flex-column">
            <NuxtLink class="link-item" to="#">ورود به پنل کاربری</NuxtLink>
            <NuxtLink class="link-item" to="#">ثبت نام</NuxtLink>
          </div>
        </div>

        <div class="col-12 col-md-5 d-flex flex-column gap-4 text-white">
          <div class=" font-weight-bold text-lg mb-4">لینک های مفید</div>
          <div class="d-flex flex-column">
            <NuxtLink class="link-item" to="#"><i class="pi pi-external-link text-xs ms-1 text-white"></i>سامانه صدور
              کاریابی های
              غیردولتی داخلی و خارجی
            </NuxtLink>
            <NuxtLink class="link-item" to="#"><i class="pi pi-external-link text-xs ms-1 text-white"></i> وزارت تعاون ،
              کار و رفاه
              اجتماعی
            </NuxtLink>
            <NuxtLink class="link-item" to="#"><i class="pi pi-external-link text-xs ms-1 text-white"></i>معاونت توسعه
              کارآغرینی و
              اشتغال وزارت تعاون ، کار و رفاه اجتماعی
            </NuxtLink>
            <NuxtLink class="link-item" to="#"><i class="pi pi-external-link text-xs ms-1 text-white"></i>دفتر توسعه
              نهاد
              های کارآفرینی
              و هدایت نیروی کار
            </NuxtLink>
          </div>
        </div>

        <div class="col-12 col-md-5 font-weight-bold">
          <div class=" font-weight-bold text-lg mb-4">تماس با ما</div>
          <div class="d-flex flex-column">
            <p class="font-weight-bold">
              تهران، خیابان آیت ا... طالقانی، بین میدان فلسطین و خیابان شهید سرپرست، پلاک 518. مرکز ارتباط مردمی: 02164371357 - 02164371367 کدپستی: 1416893931.
            </p>
            <p class="font-weight-bold"> ارتباط مستقیم : 021-64492477</p>
            <p class="font-weight-bold">ایمیل : Hedayat-kar@mcls.gov.ir</p>
            <p class="font-weight-bold">ارتباط با پشتیبانی از طریق پیام رسان ایتا:</p>
          </div>
        </div>
      </div>
      <div class="w-100 text-center p-2 mt-5" style="border-top:1px solid #1270c8">
      <span
          class="text-white text-sm">کلیه حقوق مادی و معنوی این سامانه متعلق به وزارت تعاون کار و رفاه اجتماعی می باشد</span>
      </div>
    </div>
  </div>

</template>

<script setup>
</script>

<style>
.link-item {
  color: #ffffff !important;
}
</style>