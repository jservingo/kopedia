<template>
    <div class="container-login">
        <div class="row">
            <div class="col-md-6 ">
                <div class="nav-brand text-center">
                    Kopedia
                </div>
                <h2 class="nav-white text-center text-md-start">
                    Expande tus limites con aprendizaje asistido por computadora
                </h2>                
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body">
                        <h4 class="card-title">
                            Ingresar
                        </h4>
                        <p v-if="error.status && !error.data.length" class="">
                            {{ error.message }}
                        </p>
                        <form class="" @submit.prevent="handleLogin">
                            <div class="">
                                <label for="email" class="">Correo:</label>
                                <input id="email" v-model="form.email" type="text" name="email" placeholder="homero@mail.com"
                                    class="">
                                <template v-if="error.status && error.data.length"
                                    v-for="err in error.data.filter(err => err.param === 'email')">
                                    <small class="">{{ err.msg }}</small>
                                </template>
                            </div>

                            <div class="">
                                <label for="password" class="">Contraseña:</label>
                                <input id="password" v-model="form.password" type="password" name="password" placeholder="*******"
                                    class="">
                                <template v-if="error.status && error.data.length"
                                    v-for="err in error.data.filter(err => err.param === 'password')">
                                    <small class="">{{ err.msg }}</small>
                                </template>
                            </div>

                            <div class="">
                                <button type="submit" :disabled="loading"
                                    class="btn btn-primary">
                                    Ingresar
                                </button>
                                <!--
                                <span>o</span>
                                <div class="" ref="googleBtn"></div>
                                -->
                            </div>
                        </form>

                        <router-link to="/register" class="">
                            ¿No tienes una cuenta?
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

const store = useAuthStore()
const { isAuthenticated, loading, error } = storeToRefs(useAuthStore())
const form = reactive({
    email: '',
    password: ''
});

const router = useRouter()
const googleBtn = ref()

onMounted(() => {
    //setupGoogleClient(google, googleBtn.value);
})

const handleLogin = async () => {
    await store.login(form.email, form.password)
    if (isAuthenticated)
        router.push('/student')
};

const handleGoogleConnect = async (response) => {
    await store.googleLogin(response.credential)
};
</script>

<style scoped>
.container-login{
    max-width: 895px;
    margin: auto;
}
.nav-brand {
    font-size: 32px;
    color: rgb(197, 236, 215); 
}
.nav-user {
    font-size: 15px;
    color: rgb(186, 195, 244);
}
.nav-white {
    font-size: 22px;
    color: rgb(225, 227, 240);
}
</style>
