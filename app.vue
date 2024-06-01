<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const headerIsVisible = ref(true)
const isAuth = ref(true)
const login = ref('aboba')

const router = useRouter()

async function SignOut() {
  isAuth.value = false
}
async function SignIn() {
  router.push('/login')
}
async function SignUp() {
  router.push('/register')
}
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
      <div class="profile" v-if="isAuth">
        <input class="login_button" value="Sign Out" type="button" @click="SignOut">
        <p class="login">{{ login }}</p>
      </div>
      <div class="profile" v-else>
        <div class="link">
          <input class="login_button" value="Sign In" type="button" @click="SignIn">
          <input class="login_button" value="Sign Up" type="button" @click="SignUp">
        </div>
      </div>

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
  height: 7%;
  width: 100%;
  background-color: #111010;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.header * {
  caret-color: transparent;
}

.header * ::selection {
  background-color: #9900aa;
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

.link a {
  user-select: none;
  text-decoration: none;
  color: white;
  padding: 15px;
  font-size: 25px;
}

.link:hover {
  background-color: #222020;
}

.profile {
  display: flex;
  flex-direction: row;
  width: 100%;
}

.login_button {
  height: 100%;
  background-color: #111010;
  color: white;
  border: none;
  padding: 15px;
  font-size: 25px;
}

.login {
  font-size: 30px;
  padding: 15px;
}

.login_button:hover {
  background-color: #222020;
}
</style>
