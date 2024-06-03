<script setup>
const props = defineProps({
    stream: Object,
    muted: Boolean
})


</script>

<template>
    <div class="video_block">
        <video :srcObject="props.stream" autoplay v-if="!props.muted"></video>
        <video :srcObject="props.stream" autoplay muted v-if="props.muted"></video>
    </div>
</template>

<style scoped>
.video_block {
    aspect-ratio: 16/9;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid 1px white;
    width: 100%;
    height: 100%;
}

video {
    max-width: 100%;
    max-height: 100%;
}
</style>
