<template>
  <div class="px-5 my-4">
    <div class="row mx-0">
      <div class="col-12 col-lg-6 my-3">
        <span>ویژگی های روستا جهت اجرای طرح انتخابی </span>
        <Dropdown :options="activeSection" optionLabel="title"
                  placeholder="انتخاب کنید" option-value="id"
                  class="w-100 md:w-14rem "/>
      </div>

      <div class="col-12 col-lg-6 my-3">
        <span>محصول قابل برداشت در روستا</span>
        <Dropdown :options="activeSection" optionLabel="title"
                  placeholder="انتخاب کنید" option-value="id"
                  class="w-100 md:w-14rem "/>
      </div>

      <div class="col-12 col-lg-6 my-3">
        <span>اعضای حاضر در جلسه کمیته فنی </span>
        <Dropdown :options="activeSection" optionLabel="title"
                  placeholder="انتخاب کنید" option-value="id"
                  class="w-100 md:w-14rem "/>
      </div>

      <div class="col-12 col-lg-6 my-3">
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

      <div class="col-12 col-lg-6 my-3">
        <span>آیا افراد مناسب برای اجرای طرح انتخاب شده اند؟</span>
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

      <div class="col-12 col-lg-6 my-3">
        <span>آیا زیر ساخت های لازم در روستا وجود دارد؟</span>
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

      <div class="col-12 col-lg-6 my-3">
        <span> آیا زیرساخت های لازم در روستا وجود دارد؟</span>
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

      <div class="col-12 col-lg-6 my-3">
            <span class=" text-white shadow-lg rounded py-3 px-4 cursor-pointer bg-blue-4">بارگزاری مصوبات جلسه <i
                class="pi pi-cloud-upload me-2"></i></span>
      </div>

      <div class="col-12 col-lg-6 my-3">
        <span>دلایل انتخاب خود را در چند سطح توضیح دهید</span>
        <Textarea rows="1" class="w-100"/>
      </div>
    </div>

    <div class="d-flex gap-2 col-12 my-3 align-items-center justify-content-center ps-3">
      <Button class="bg-success rounded "> ثبت<i class="pi pi-times me-2"></i></Button>
      <Button class="bg-danger rounded "> انصراف<i class="pi pi-times me-2"></i></Button>
    </div>

  </div>
</template>

<script>

</script>

<style scoped>

</style>