<template>
    <div class ="card card-unit" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-unit-page-header">
                    <RouterLink class="link-unit-page link-underline link-underline-opacity-0" :to="`/admin/page/${page.id}`">{{ page.title }}</RouterLink>
                </div>
                <div class ="container-fluid container-unit-page-buttons ml-auto">
                    <button  @click="$emit('edit-page',page)" class="btn btn-edit">
                        <img src="@/assets/edit.svg"/>
                    </button>&nbsp;
                    <button @click="$emit('add-page-to-clipboard',page)" class="btn btn-clipboard">
                        <img src="@/assets/add_clipboard.png"/>
                    </button>&nbsp;
                    <button @click="$emit('delete-page',page)" class="btn btn-delete">
                        <img src="@/assets/delete.svg"/> 
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';

const props = defineProps(["page","index"]);
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6] 
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.card-unit {
    float: left;
    width: 100%;  /* 260px; */
    padding-top: 6px;
    padding-bottom: 6px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-unit-page {
    font-size: 15px;
    color: floralwhite;
    border-bottom: 0;
}
.container-unit-page-header {
    font-size: 14px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-unit-page-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 170px;
}
.btn-edit {
    background-color: #82c591 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
.btn-delete {
    background-color: #c57d93 !important;
    padding: 0;
}
</style>