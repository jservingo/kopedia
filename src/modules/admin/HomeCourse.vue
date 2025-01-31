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
            <Image :item="item" @show-info="showInfo"></Image>
        </div>
    </div>  
</template>

<script setup>
import Image from '@/modules/Item/ItemImage.vue'
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';
import slugify from '@sindresorhus/slugify';

const emit = defineEmits(['show-info']) 
const props = defineProps(["course","index"]);
const titleSlug = computed(() => { return slugify(props.course.title)})

let content = props.course.content ? props.course.content : "Descripcion del curso" 
let file = props.course.file ? props.course.file : "363645453-curso.png" 
let options = props.course.options ? props.course.options : "image-align:center;display-content:right" 
const item = ref({content, file, options})
let tags = ref([])

//console.log("tags",props.subscription.tags)
if (props.course.tags) {
    const stags = props.course.tags.split(",")
    stags.forEach((tag) => tags.value.push({name: tag}))
    //console.log("tags",tags.value)
}

//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6] 
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

function showInfo(info) {
    //console.log("Info captured:",info)
    emit("show-info",info)
}
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
  color: rgb(30, 30, 255);
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