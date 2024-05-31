<template>
    <div class="login-container">
      <h2>Авторизация</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">Имя пользователя:</label>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="password">Пароль:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn">Войти</button>
      </form>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const username = ref('')
      const password = ref('')
      const errorMessage = ref('')
  
      const login = () => {
        // Здесь вы можете добавить логику для проверки учетных данных
        if (username.value === 'admin' && password.value === 'password') {
          // Успешная авторизация
          console.log('Успешная авторизация')
        } else {
          errorMessage.value = 'Неверное имя пользователя или пароль'
        }
      }
  
      return {
        username,
        password,
        errorMessage,
        login
      }
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  .btn {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
    margin-top: 1rem;
  }
  </style>