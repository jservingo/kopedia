<template>
    <div class ="header">
        <span class="link-logo">Kopedia</span>
        <div v-if="isAuthenticated" class="sm:flex items-center sm:gap-4">
            <router-link class="link-user" to="/perfil"><strong>{{ user.name }}</strong></router-link>
            <button @click="handleLogout"
                class="block rounded-md bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">
                Salir
            </button>
        </div>
        <div v-else class="sm:flex sm:gap-4">
            <router-link to="/login"
                class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700">
                Ingresar
            </router-link>

            <router-link to="/register"
                class="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block">
                Registrarse
            </router-link>
        </div>
    </div>
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
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    background-color: #333;
    color: white;
}
h3 {
    margin: 0;
}
.link-user {
    font-size: 15px;
    color: rgb(186, 195, 244);
    padding-right: 10px;
    border-bottom: 0;
}
.link-logo {
    font-size: 20px;
    color: rgb(197, 236, 215);
    border-bottom: 0;
}
</style>