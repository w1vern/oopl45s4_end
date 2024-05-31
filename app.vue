<script setup>
import {ref} from 'vue'
const headerIsVisible = ref(true)
</script>

<template>
  <div class="header" v-if="headerIsVisible">
    <div class="left_menu">
      <div class="link">
        <a href="/">HOME</a>
      </div>
      <div class="link">
        <a href="/lobby">Lobby</a>
      </div>
    </div>
    <div class="right_menu">
      
    </div>
  </div>
  <div class="main">
    <NuxtPage />
  </div>
</template>

<style>
  #__nuxt {
    height: 100vh;
  }

  body {
    background-color: #222020;
    color: white;
    height: 100vh;
  }

  .main {
    width: 100%;
    height: 100%;
  }

  * {
    padding: 0;
    margin: 0;
  }

  .header {
    height:8%;
    width: 100%;
    background-color: #111010;
    display: flex;
    flex-direction: row;
  }

  .left_menu {
    display: flex;
    flex-direction: row;
    width: max-content;
    height: 100%;
  }

  .right_menu {
    display: flex;
    flex-direction: row;
    width: max-content;
    height: 100%;
  }

  .link {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-content: center;
  }

  .link a{
    text-decoration: none;
    color: white;
    padding: 10px;
    font-size: 30px;
  }

  .link:hover{
    background-color: #333030;
  }
</style>
