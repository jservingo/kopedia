<template>
    <div class="container-header d-flex">
        <div class ="container-fluid container-card-header">
            <span>Card {{ card.id }} - {{ card.title }}</span>
        </div>
        <div class ="container-fluid container-card-buttons ml-auto">
            <button @click="$emit('add-item')" class="btn btn-add">
                <img src="@/assets/add.svg"/>
            </button>&nbsp;
            <button @click="$emit('show-clipboard')" class="btn btn-clipboard">
                <img src="@/assets/clipboard.png"/>
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps(["card"]);
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-card-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.container-card-buttons { 
    font-size: 18px;
    color: whitesmoke;
    width: 120px;
}
.btn-add {
    background-color: #82a1c9 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
</style>