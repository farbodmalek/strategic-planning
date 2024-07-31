<template>
  <div>
    <HeaderFront/>
    <slot/>
    <FooterFront/>
  </div>
</template>

<script setup>
import FooterFront from "../components/footer/Footer.vue"
import HeaderFront from "../components/header/Header.vue"
</script>
