<script setup>

</script>

<template>
    <div class="lobby_page">
        <div class="lobby_form">
            <div class="top_part">
                <div class="left_block">
                    <input class="button" type="button">
                </div>
                <div class="right_block">
                    <input class="button" type="button">
                </div>
            </div>
            <div class="main_part">
                <div class="main_part_header">

                </div>
                <div class="main_part_content">

                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.lobby_page {
    justify-content: center;
    align-content: center;
}
.lobby_form {
    display: flex;
    flex-direction: column;
    height: max-content;
    width: max-content;
}

.top_part {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.left_block {
    border: 1px solid black;
}

.main_part {
    display: flex;
    flex-direction: column;
}

.main_part_header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
</style>