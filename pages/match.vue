<script setup>

import {ref} from 'vue'

const streams = ref({})
const isAwaiting = ref(true)

async function startMatch() {
    isAwaiting = false
}

</script>

<template>
    <div class="match_page">
        <dev class="left_block">
            <dev class="main_cameras" id="host_camera">

            </dev>
            <dev class="main_cameras" id="active_camera">

            </dev>
            <dev class="main_cameras" id="player_camera">

            </dev>
            <dev class="service_field">
                
            </dev>
        </dev>
        <dev class="right_block">
            <dev class="other_cameras" v-for="stream in streams">

            </dev>
        </dev>
    </div>

    <div class="awaiting_page" v-if="isAwaiting">
        
    </div>
</template>

<style scoped>
.main_page {
    display: flex;
    flex-direction: row;
}

.left_block {
    height: 100%;
    width: 40%;
}

.right_block {
    height: 100%;
    width: 60%;
}
</style>