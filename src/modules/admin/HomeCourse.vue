<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-home-course-header">
                    <RouterLink class="link-home-course link-underline link-underline-opacity-0" 
                        :to="`/admin/course/${course.id}/${titleSlug}`">{{ course.title }}
                    </RouterLink>
                </div>
                <div class ="container-home-course-buttons">
                    <button @click="$emit('edit-course',course)" class="btn btn-edit">
                        <img src="@/assets/edit.svg"/>
                    </button>&nbsp;
                    <button @click="$emit('delete-course',course)" class="btn btn-delete">
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
import slugify from '@sindresorhus/slugify';

const props = defineProps(["course","index"]);
const titleSlug = computed(() => { return slugify(props.course.title)})

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
    width: 100%;  /* 260px; */
    padding-top: 6px;
    padding-bottom: 6px;
    margin-right: 12px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
.link-home-course {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
}
.link-home-course:hover {
  color: rgb(30, 30, 255);;
}
.container-home-course-header {
    font-size: 18px;
    width: calc(100% - 98px);
    color: whitesmoke;
    line-height: 20px !important;
    padding: 12px;
}
.container-home-course-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 92px;
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