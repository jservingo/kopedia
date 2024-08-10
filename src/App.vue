<template>
    <Header></Header>
    <div class ="container">
        <div class="content">
            <router-view></router-view>
        </div>
    </div>

</template>

<script setup>
import { useAuthStore } from './stores/authStore';
import Header from './components/Header.vue'

const store = useAuthStore()
store.getTokenAndUser()
</script>

<style>
.container {
    display: flex;
    width: 900px;
}
.content {
    flex: 1;
    padding: 20px;
    float: right;
    width: 540px;
}
</style>
