<template>
  <div class="d-flex justify-content-center">
    <div class="col-9 title rounded-4">
      <div class="d-flex justify-content-center col-12">
        <p class="font-1 col-5 text-center justify-content-center d-flex  p-3 bg-purple-1 text-white rounded-pill">
          اطلاعات هویتی</p>
      </div>
      <div class=" col-11 d-flex flex-wrap gap-3 justify-content-center  py-3 ">
        <div class="d-flex col-5   shadow ">
          <p class="p-3">نام: </p>
          <p>{{}} </p>
        </div>
        <div class="d-flex  col-5  shadow">
          <p class="p-3">نام خانوادگی: </p>
          <p>{{  }}</p>
        </div>
        <div class="d-flex  col-5  shadow">
          <p class="p-3">کدملی: </p>
          <p>{{}} </p>
        </div>
        <div class="d-flex  col-5  shadow">
          <p class="p-3">تاریخ تولد: </p>
          <p>{{}}</p>
        </div>
        <div class="d-flex   col-5  shadow">
          <p class="p-3">موبایل: </p>
          <p>{{}}</p>
        </div>
        <div class="d-flex  col-5 -3 shadow">
          <p class="p-3"> سطح دسترسی: </p>
          <p> {{  }} </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {required} from '@vuelidate/validators';
import {CommonServices} from "~/core/common/common-services";
import {ToastNotificationService} from "~/core/toast-notification-service";
import {MakeResponse} from "~/composables/make-response";
import {useVuelidate} from "@vuelidate/core";


const onRout = () => {
  const twoDigit = (digit: any) => digit > 9 ? digit : "0" + digit;
  const [month, day, year] = new Date().toLocaleDateString().split("\/").map(e => twoDigit(e));
  const [hour, min, sec] = new Date().toLocaleTimeString().split("\:").map(e => twoDigit(e));
  const milliSec = sec.split(' ')[0];
  const state = (year + month + day + hour + min + milliSec).toString();
  window.open(
      `http://sso.mcls.gov.ir/auth/realms/sso/protocol/openid-connect/auth?response_type=code&client_id=shoghl&scope=openid%20profile%20email&state=${state}&redirect_uri=${window.location.origin}/ssoLogin`)
}


onMounted(() => {
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


const login = () => {
  submitted.value = true;
  if (!v$.value.$invalid) {
    MakeResponse.makeServerResponse(CommonServices.login(loginForm), true, result => {
      if (result && result.result) {
        localStorage.setItem('user-data', JSON.stringify(result.data));
        if (result.data.types.includes(1)) {
          ToastNotificationService.success('ورود با موفقیت انجام شد');

          location.href = useRuntimeConfig().public.panel + 'Dashboard';

        } else if (result.data.types.includes(2)) {
          ToastNotificationService.success('ورود با موفقیت انجام شد');
          location.href = useRuntimeConfig().public.panel + 'employer/template';
        } else {
          ToastNotificationService.error('نام کاربری یا رمز ورود اشتباه است');
        }
      } else {
        ToastNotificationService.error("کد امنیتی اشتباه است ");
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
  background: #FFF;
  transition: .5s;
}

.title {
  padding: 0.75rem 1rem;
  border: 0.1rem solid #fff;
  transition: .5s;
  margin-top: 8rem;
  border-radius: 1rem;
}

</style>