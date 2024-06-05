<template>
  <div>
    <VideoBlock class="block" :stream="info.stream" :muted="false" v-if="!disconnect && !disabled"></VideoBlock>
    <img class="block" src="~/assets/img/death.png" alt="" srcset="" v-if="!disabled && death">
    <img class="block" src="~/assets/img/disabled.png" alt="" srcset="" v-if="!disconnect && disabled">
    <img class="block" src="~/assets/img/dissconect.png" alt="" srcset="" v-if="disconnect && !disabled && !death">
  </div>
</template>

<script setup>
const props = defineProps({
  info: Object
})

const death = computed(() => {
  return !props.info.isAlive;
})

const disconnect = computed(() => {
  return info.stream == null
})

const disabled = computed(() => {
  return info.sleep;
})

</script>

<style scoped>
.block {
  width: 100%;
  height: 100%;
}
</style>