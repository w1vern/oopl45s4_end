<script setup>
const props = defineProps({
  value: String,
  color: String,
  hover_color: String,
  font_color: String,
  size: String,
  type: String
})

const background = ref('#000000')

async function hover() {
  background.value = props.hover_color
}
async function unHover() {
  background = props.color
}
</script>

<template>
  <div @mouseenter="hover" @mouseleave="unHover">
    <input class="button" :type="type" :value="value" v-bind="$attrs">
  </div>
</template>


<style scoped>
.button {
  width: max-content;
  padding: 6px 12px;
  border-radius: 4px;
  background-color: v-bind(color);
  color: v-bind(font_color);
  font-size: v-bind(size);
  border: none;
  caret-color: transparent;
}

.button:hover {
  background-color: v-bind(hover_color);
}
</style>