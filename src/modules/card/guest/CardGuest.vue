<template>
    <div class="card-container">
        {{ card.title }} CardGuest
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps(["card","index"]);
</script>

<style scoped>
.card-container {
    display: block;
    padding: 10px;
    padding-top: 0px;
    padding-bottom: 0px;
    margin-top: 2px;
    margin-bottom: 0px;
    font-size: 17px;
    color:floralwhite;
}
</style>