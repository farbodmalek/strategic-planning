<template>
  <div class="w-100 bg-light d-flex align-items-center justify-content-around">
    <h4 class="mt-4">سامانه طرح های راهبردی صندوق</h4>
    <img src="/img/logo.png" width="200"/>
  </div>
  <div>
    <div class="container top-0 position-sticky z-index-sticky">
      <div class="row">
        <div class="col-12">
          <slot name="navbar"/>
        </div>
      </div>
      <main class="main-content mt-0 mx-5">
        <slot/>
      </main>
    </div>
  </div>
</template>
