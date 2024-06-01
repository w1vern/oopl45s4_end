<template>
  <div class="block" ref="blockRef">
    Содержимое блока
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const blockRef = ref(null)

    onMounted(() => {
      const block = blockRef.value
      if (block) {
        const { width, height } = block.getBoundingClientRect()
        block.style.border = '1px solid black'
        block.style.width = `${width}px`
        block.style.height = `${height}px`
      }
    })

    return {
      blockRef
    }
  }
}
</script>

<style>
.block {
  padding: 20px;
  background-color: #f0f0f0;
}
</style>