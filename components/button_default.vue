<script setup>
 const props = defineProps({
  value: String,
  color: String,
  hover_color: String,
  font_color: String,
  size: Number
 })
</script>

<template>
  <div>
    <input class="button" type="button" :value="value" :style="{color: color}" v-bind="$attrs">
  </div>
</template>


<style scoped>
  .button {
    width: max-content;
    padding: 6px 12px;
    border-radius: 4px;
}

.button:hover {
    background-color: #770088;
}
</style>