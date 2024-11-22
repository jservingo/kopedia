<template>
    <nav class="navbar navbar-expand-md bg-d333">
        <div class="container-fluid">
            <router-link class="navbar-brand nav-brand" to="/">Kopedia</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon navbar-dark"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div v-if="isAuthenticated" class="navbar-nav">
                    <router-link class="nav-link nav-user" to="/perfil"><strong>{{ user.name }}</strong></router-link>
                    <button @click="handleLogout"
                        class="btn btn-primary">
                        Salir
                    </button>
                </div>
                <div v-else class="navbar-nav">
                    <!--<router-link class="nav-link active" aria-current="page" to="/login">Ingresar</router-link>-->
                    <router-link class="nav-link nav-white" to="/login">Ingresar</router-link>
                    <router-link class="nav-link nav-white" to="/register">Registrarse</router-link>
                </div>
            </div>
        </div>
    </nav>
    <!--F
    <div class ="container-fluid header">
        <span class="link-logo">Kopedia</span>
        <div v-if="isAuthenticated" class="sm:flex items-center sm:gap-4">
            <router-link class="link-user link-underline link-underline-opacity-0" to="/perfil"><strong>{{ user.name }}</strong></router-link>
            <button @click="handleLogout"
                class="btn btn-primary">
                Salir
            </button>
        </div>
        <div v-else class="sm:flex sm:gap-4">
            <router-link to="/login"
                class="btn btn-primary">
                Ingresar
            </router-link>
            <router-link to="/register"
                class="btn btn-primary">
                Registrarse
            </router-link>
        </div>
    </div>
    -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
const store = useAuthStore();

const { isAuthenticated, user } = storeToRefs(store);

const handleLogout = () => {
    if (user.google) {
        google.accounts.id.disableAutoSelect();
        google.accounts.id.revoke(user.email);
    }
    store.logout();
};
</script>

<style scoped>
.bg-d333 {
    background-color: #333;
    color: white;
}
h3 {
    margin: 0;
}
.nav-brand {
    font-size: 22px;
    color: rgb(197, 236, 215); 
    margin-left: 20px;
}
.nav-user {
    font-size: 15px;
    color: rgb(186, 195, 244);
    width: 200px;
    text-align: right;
}
.nav-white {
    font-size: 15px;
    color: rgb(225, 227, 240);
}
#navbarNavAltMarkup {
    flex-grow: 0;
    width:288px;
}
</style>