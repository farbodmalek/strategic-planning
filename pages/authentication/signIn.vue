<template>
  <div name="authentication">
    <div class="page-header min-vh-100">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row mx-0 justify-content-center">
          <div class="col-10  mt-2">
            <div class="card border-0 mb-0">
              <div class="card-header bg-transparent pt-5">
                <h5 class="text-dark text-center mt-2 mb-4"> ثبت نام کارجو </h5>
              </div>
              <div class="card-body pt-0">
                <form role="form" class=" mt-4" dir="rtl" @submit.prevent="signUp">
                  <div class="row mx-0 ">
                    <div class="mb-2 col-12 col-md-6 col-xl-4  text-right">
                      <label>کدملی</label>
                      <InputCmpTextInput
                          v-model="formValues.code"
                          id="password"
                          aria-label=""/>
                    </div>

                    <div class="mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label  class="font-bold block ">تاریخ تولد</label>
                      <DatePicker  v-model="formValues.date"></DatePicker>
                    </div>

                    <div class="mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label>شماره همراه</label>
                      <InputCmpTextInput
                          v-model="formValues.mobile"
                          aria-label=""/>
                    </div>

                    <div class="mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label> رمز عبور</label>
                      <InputCmpTextInput
                          v-model="formValues.password"
                          aria-label=""/>
                    </div>

                    <div class="mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label>تکرار رمز عبور </label>
                      <InputCmpTextInput
                          v-model="formValues.confirm"
                          aria-label=""/>
                    </div>

                    <div class=" mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label>استان</label>
                      <Dropdown
                          :options="city"
                          :optionLabel="'title'"
                          :option-value="'id'"
                          :show-clear="true"
                          placeholder="انتخاب کنید"
                          v-model="formValues.country"
                          class="w-100"
                      />
                    </div>

                    <div class=" mb-2 col-12 col-md-6 col-xl-4 text-right">
                      <label>شهرستان</label>
                      <Dropdown
                          :options="city"
                          :optionLabel="'title'"
                          :option-value="'id'"
                          :show-clear="true"
                          placeholder="انتخاب کنید"
                          v-model="formValues.city"
                          class="w-100"
                      />
                    </div>

                    <div class="text-center mt-4 d-flex justify-content-end">
                      <Button
                          type="button"
                          @click="signUp"
                          color="primary"
                          class="mt-2 mb-4">
                        ثبت نام
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DatePicker from 'vue3-persian-datetime-picker'

definePageMeta({
  layout: false,
});
const formValues = ref({
  code: null,
  mobile: null,
  date: null,
  city: null,
  country: null,
  password: null,
  confirm: null,
})
const city = ref([
  {id: 1, title: 'تهران'},
  {id: 1, title: 'گیلان'},
  {id: 1, title: 'اصفهان'},
])

const signUp = async () => {
  // AuthStore.login({userName, password});
  navigateTo('/authentication/login')
};

</script>
<style>

.text-right {
  text-align: right;
}

label {
  font-size: 14px;
}
</style>