<template>
  <ul class="mainmenu">

    <li>
      <n-link to="/">صفحه اصلی</n-link>
    </li>

    <li class="has-droupdown">
      <n-link to="">کارجویان</n-link>
      <ul class="submenu">
        <li>
          <n-link to="/register/account">ثبت نام کارجو</n-link>
        </li>
        <li>
          <n-link to="/jobSeeker/list">جستجوی درخواست شغلی</n-link>
        </li>
      </ul>
    </li>

    <li class="has-droupdown">
      <n-link to="">کارفرمایان</n-link>
      <ul class="submenu">
        <li>
          <n-link to="/register/account">ثبت نام کارفرما</n-link>
        </li>
        <li>
          <n-link to="/employer/JobOpportunity">جستجوی فرصت شغلی</n-link>
        </li>
      </ul>
    </li>

    <li class="has-droupdown">
      <n-link to="">کاریابی ها</n-link>
      <ul class="submenu">
        <li>
          <n-link to="/register/placement">ثبت نام کاریابی</n-link>
        </li>
        <li>
          <n-link to="/placement/lists">جستجوی کاریابی</n-link>
        </li>
      </ul>
    </li>

    <li>
      <n-link to="/about-us">درباره ی ما</n-link>
    </li>

  </ul>
</template>
