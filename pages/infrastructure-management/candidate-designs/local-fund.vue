<template>
  <BaseCover :title="'طرح های کاندید'" :is-add="false" :is-search="false" :text="'قابلیت تشکیل صندوق خرد محلی'">
    <div class="container">
      <div class="row mx-0">
        <div class="col-12 col-lg-6">
          <div class=" my-3 mx-1 mx-xl-5">
            <span>به طور خلاصه دلیل انتخاب خود را شرح دهید </span>
            <Textarea v-model="value" rows="1" class="w-100"/>
          </div>

          <div class=" d-flex flex-column gap-2  my-3 mx-1 mx-xl-5">
            <span>آیا کمیته فنی تشکیل شده است؟ </span>
            <div class="d-flex align-items-center justify-content-end">
              <div class="flex align-items-center">
                <RadioButton value="1"/>
                <label for="ingredient1" class="ml-2">بله</label>
              </div>
              <div class="flex align-items-center me-5">
                <RadioButton value="2"/>
                <label for="ingredient2" class="ml-2">خیر</label>
              </div>
            </div>
          </div>

          <div class=" my-3 mx-1 mx-xl-5">
            <span>عنوان چند رشته شغلی قابل حمایت در روستا </span>
            <InputText class=" shadow-lg w-100"/>
          </div>

          <div class=" d-flex flex-column gap-2  my-3 mx-1 mx-xl-5">
            <span>آیا زیرساخت های لازم جهت اجرای عناوین شغلی درنظر گرفته شده در روستا وجود دارد؟  </span>
            <div class="d-flex align-items-center justify-content-end">
              <div class="flex align-items-center">
                <RadioButton value="1"/>
                <label for="ingredient1" class="ml-2">بله</label>
              </div>
              <div class="flex align-items-center me-5">
                <RadioButton value="2"/>
                <label for="ingredient2" class="ml-2">خیر</label>
              </div>
            </div>
          </div>


          <div class=" d-flex flex-column gap-2  my-3 mx-1 mx-xl-5">
            <span>آیا افراد متناسب با کسب و کار شناسایی شده اند؟ </span>
            <div class="d-flex align-items-center justify-content-end">
              <div class="flex align-items-center">
                <RadioButton value="1"/>
                <label for="ingredient1" class="ml-2">بله</label>
              </div>
              <div class="flex align-items-center me-5">
                <RadioButton value="2"/>
                <label for="ingredient2" class="ml-2">خیر</label>
              </div>
            </div>
          </div>


        </div>
        <div class="col-12 col-lg-6">

          <div class=" my-3 mx-1 mx-xl-5">
            <span>چند مزیت روستا جهت اجرای طرح انتخابی را ذکر بفرمایید </span>
            <Textarea v-model="value" rows="1" class="w-100"/>
          </div>

          <div class=" my-3 mx-1 mx-xl-5">
            <span>اعضای حاضر در جلسه </span>
            <InputText class=" shadow-lg w-100"/>
          </div>

          <div class=" d-flex flex-column gap-2  my-3 mx-1 mx-xl-5">
       <span>آیا زیرساخت های لازم جهت اجرای عناوین شغلی درنظر گرفته
 شده در روستا وجود دارد؟</span>
            <div class="d-flex align-items-center justify-content-end">
              <div class="flex align-items-center">
                <RadioButton value="1"/>
                <label for="ingredient1" class="ml-2">بله</label>
              </div>
              <div class="flex align-items-center me-5">
                <RadioButton value="2"/>
                <label for="ingredient2" class="ml-2">خیر</label>
              </div>
            </div>
          </div>

          <div class=" d-flex flex-column gap-2  my-4 mx-1 mx-xl-5">
            <span>آیا بازار عرضه و تقاضا محصولات بررسی و تهیه شده است؟</span>
            <div class="d-flex align-items-center justify-content-end">
              <div class="flex align-items-center">
                <RadioButton value="1"/>
                <label for="ingredient1" class="ml-2">بله</label>
              </div>
              <div class="flex align-items-center me-5">
                <RadioButton value="2"/>
                <label for="ingredient2" class="ml-2">خیر</label>
              </div>
            </div>
          </div>

          <div class=" mt-4 mx-1 mx-xl-5 text-end">
            <span class=" text-white shadow-lg rounded py-3 px-4 cursor-pointer bg-blue-4">بارگزاری مصوبات جلسه <i
                class="pi pi-cloud-upload me-2"></i></span>
          </div>
        </div>

        <div class="d-flex gap-2  my-5 align-items-center justify-content-center ps-3">
          <Button class="bg-success rounded"> ثبت<i class="pi pi-check me-2"></i></Button>
          <Button class="bg-danger rounded"> انصراف<i class="pi pi-times me-2"></i></Button>
        </div>

      </div>
    </div>
  </BaseCover>
</template>

<script>

</script>

<style scoped>

</style>