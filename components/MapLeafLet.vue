<template>
  <div style="height:25vh;">
    <LMap
        ref="map"
        :zoom="zoom"
        :center="[37.14331, 49.8732]"
    >
      <LTileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
          layer-type="base"
          name="OpenStreetMap"
      />
            <LMarker :lat-lng="[latitude, longitude]"  />
    </LMap>
  </div>
</template>

<script setup>
import {ref} from 'vue'
const zoom = ref(50)

let latitude = ref(37.14331);
let longitude = ref(49.8732);

</script>

<style>
body {
  margin: 0;
}
</style>
