<template>
  <div>
    <VideoBlock :stream="info.stream" :muted="false"></VideoBlock>
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object
})

</script>

<style>

</style>