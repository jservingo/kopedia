<template>
    <div class ="container-formula">
        <div>v-html="formula"</div>
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
}
</style>