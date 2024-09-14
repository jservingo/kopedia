<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <card-body>
            <RouterLink class="link-course-box link-underline link-underline-opacity-0" :to="`/admin/course/${course.id}`">{{ course.title }}</RouterLink>
            <button @click="handleEditCourse"
                class="btn">
                Edit
            </button>
            <button @click="handleDeleteCourse"
                class="btn">
                Delete
            </button>
            home/CourseAdmin
        </card-body>
    </div>    
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { defineProps, computed } from 'vue';
const props = defineProps(["course","index"]);
//Change bgColor
//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})
</script>

<style>
.card-course {
    float: left;
    width: 260px;
    height: 67px;
    padding-left: 10px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.link-course-box {
    font-size: 17px;
    color:floralwhite;
    border-bottom: 0;
}
</style>