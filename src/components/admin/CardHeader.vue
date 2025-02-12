<template>
    <div class="container-header d-flex">
        <div class ="container-card-header">
            <span>{{ card.title }}</span>
            <h3>Items</h3>
        </div>
        <div class ="container-card-buttons">
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
    font-size: 22px;
    width: calc(100% - 98px);
    color: whitesmoke;
    line-height: 24px !important;
    padding-left: 12px;
}
.container-card-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 92px;
}
.btn-add {
    background-color: #82a1c9 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
h3 {
    font-size: 18px; 
}
</style>