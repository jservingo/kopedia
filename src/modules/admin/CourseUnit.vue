<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <RouterLink class="link-course-box link-underline link-underline-opacity-0" :to="`/admin/unit/${unit.id}`">{{ unit.title }}</RouterLink>                 
            <button @click="$emit('edit-unit',unit)" class="btn btn-primary">
                Edit unit
            </button>
            <button @click="$emit('delete-unit',unit)" class="btn btn-danger">
                Delete unit
            </button>
        </div>
    </div>  
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';

const props = defineProps(["unit","index"]);
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
.card-course {
    float: left;
    width: 260px;
    height: 140px;
    padding-left: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-course-box {
    font-size: 17px;
    color:floralwhite;
    border-bottom: 0;
}
</style>