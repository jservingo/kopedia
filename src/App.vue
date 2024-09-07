<template>
    <Header></Header>
    <div class ="container-fluid">
        <router-view></router-view>
    </div>
</template>

<script setup>
import { useAuthStore } from './stores/authStore';
import Header from './components/NavComp.vue'

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
