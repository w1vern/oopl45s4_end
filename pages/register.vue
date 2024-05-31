<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
const incorrect_data = ref(false)
const login = ref('')
const password1 = ref('')
const password2 = ref('')

const router = useRouter()

async function SignUp() {
    if (password1.value === password2.value) {
        router.push('/login')
    } else {
        incorrect_data.value = true
    }
}
</script>

<template>
    <div class="register_page">
        <div class="register_form">
            <div class="description">
                <p>Registration</p>
            </div>
            <div class="form">
                <form class="form" @submit.prevent="SignUp">
                    <p>
                        <input class="field_input" id="login" name="login" placeholder="Login" required="" type="text" v-model="login">
                    </p>
                    <p>
                        <input class="field_input" id="password" name="password" placeholder="Password" required=""
                            type="password" v-model="password1">
                    </p>
                    <p>
                        <input class="field_input" id="password" name="password" placeholder="Repeat Password"
                            required="" type="password" v-model="password2">
                    </p>
                    <p>
                        <input class="enter_button" id="Sign" name="Sign" type="submit" value="Sign Up">
                    </p>
                    <p v-if="incorrect_data" class="auth_error">
                        This login is already in use<br> or the passwords do not match
                    </p>
                </form>
            </div>
        </div>
        <a href="/login" class="login">Sign In</a>
    </div>
</template>

<style scoped>
.register_page {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    align-items: center;
    height: 100%;
}

.register_page * {
    caret-color: transparent;
    border: none;
}

.register_page * ::selection{
   background-color: #550066;
}

.register_form {
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    font-size: 20px;
    background-color: #111010;
    gap: 16px;
}

.description {
    font-size: 28px;
    user-select: none;
}

.field_input {
    box-sizing: border-box;
    width: 180px;
    height: 30px;
    border-radius: 3px;
    background-color: #222020;
    color: #ffffff;
    padding: 2px 8px 2px 8px;
}

.field_input:focus {
    caret-color: #9900aa;
    outline: none;
    outline: 2px solid #550066;
}

.form {
    background-color: #111010;
    display: flex;
    flex-direction: column;
    gap: 16px;
    justify-content: center;
}

.remember_me_container {
    width: max-content;
    font-size: 18px;
}

.enter_button_container {
    width: 100%;
    display: flex;
    justify-content: center;
}

.enter_button {
    width: max-content;
    padding: 6px 12px;
    border-radius: 4px;
    color: white;
    background-color: #550066;
}

.enter_button:hover {
    background-color: #770088;
}

.auth_error {
    color: red;
    font-size: 15px;
}


.login {
    user-select: none;
    font-size: 20px;
    padding: 10px;
    color: #880099;
    text-decoration: none;
}

.login:hover {
    color: #aa00bb;
}


</style>
