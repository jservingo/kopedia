<template>
    <!-- Esto ya no se utiliza -->
    <div class ="container-formula">
        <div v-html="item.content"></div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["item"]);
</script>

<style>
.container-formula {
    display: block;
    font-size: 15px;
    color: floralwhite;
    margin-bottom: 4px;
    padding-left: 12px;
    padding-right: 12px;
}
</style>