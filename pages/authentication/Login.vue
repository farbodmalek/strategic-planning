<template>
  <div id="main-wrapper" class="main-wrapper">
    <section class="account-page-area" :class="mode !== 'login' ? 'section-gap-equal' : 'mt-2'">
      <div class="container position-relative" :class="mode === 'login' ? 'mt-2' : ''">
        <div class="row  justify-content-center my-4 ">
          <div class="col-lg-5 shadow-lg p-3 mb-5 bg-white rounded">
            <div class="login-form-box">
              <h3 class="title text-center mt-2 mb-5">ورود به پنل کاربری</h3>
              <p>
                <span> هنوز ثبت نام نکرده ام!</span>
                <span class=" me-3">
                  <nuxt-link to="#">ثبت نام </nuxt-link>
                </span>
              </p>
              <form @submit.prevent="login" autocomplete="off">
                <div class="form-group mt-4 p-float-label">
                  <InputText
                      type="text"
                      name="userName"
                      id="userName"
                      autocomplete="off"
                      class="w-100"
                      v-model="loginForm.username"
                      :class="{'p-invalid': v$.username.$invalid && submitted}"
                      placeholder=""/>
                  <label for="userName" dir="rtl">نام کاربری*</label>
                </div>

                <span class="text-primary font--1-25">
                  نام کاربری شما کد ملی شماست، برای ورود کیبورد را در حالت انگلیسی قرار دهید.
                </span>

                <div class="form-group p-float-label mt-5">
                  <InputText
                      id="password"
                      v-model="loginForm.password"
                      :feedback="false"
                      class="w-100"
                      :class="{'p-invalid': v$.password.$invalid && submitted}"/>
                  <label for="password">رمز عبور*</label>
                </div>

                <div class="form-group">
                  <Button type="submit" class="bg-success">ورود</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>


</template>

<script lang="ts" setup>
import {required} from '@vuelidate/validators';
import {UserServices} from "~/core/user-managment/user-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import {useVuelidate} from "@vuelidate/core";

definePageMeta({
  layout: "custom"
});

const loginForm = reactive({
  username: '',
  password: '',
});

const rules = computed(() => {
  return {
    username: {required},
    password: {required},
  };
});

const submitted = ref(false);
const v$ = useVuelidate(rules, loginForm);

// const opn = {
//   path: '/',
//   maxAge: 60 * 60 * 24 * 2,
//   domain: useRuntimeConfig().public.domain,
//   secure: useRuntimeConfig().public.isSecure,
//   sameSite: 'lax',
//   readOnly: true
// }
// const myCookieToken = useCookie('token-id', option);
const login = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(UserServices.loginUser(loginForm), true, result => {
      if (result && result.result) {
        localStorage.setItem('token-id', JSON.stringify(result.data));
        // myCookieToken.value = result.data.token;
        ToastNotificationService.success('ورود با موفقیت انجام شد');
        navigateTo('/Dashboard')
      } else {
        ToastNotificationService.error('نام کاربری یا رمز ورود اشتباه است');
      }
    });

  }
}


</script>

<style lang="scss" scoped>

label {
  display: block;
  overflow: hidden;
  border-bottom: 1px solid #E4E4E7;
  //background: #FFF;
  transition: .5s;
}

.title {
  padding: 0.75rem 1rem;
  z-index: 599;
  background: #fbfbfb;
  transition: .5s;
  color: var(--blue-3);
  margin-top: 8rem;

  &:hover {
    cursor: pointer;
    background: #f5f5f5;
  }

  & i {
    color: rgba(0, 0, 0, .5);
  }

  .pi-chevron-down {
    position: absolute;
    left: 2rem;
    color: var(--blue-3);
    transform: rotate(0deg);
    transition: .5s;
  }
}
</style>