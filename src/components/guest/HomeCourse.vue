<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-home-course-header">
                    <RouterLink class="link-home-course link-underline link-underline-opacity-0" 
                        :to="`/guest/course/${course.id}/${titleSlug}`">{{ course.title }}
                    </RouterLink>
                    <span v-for="tag in tags" class="tag">
                        {{ tag.name }}
                    </span>
                </div>
                <div class ="container-fluid container-home-course-buttons ml-auto">
                    <button class="btn btn-primary" @click="handleSuscribete">
                        Suscríbete
                    </button>
                </div>
            </div>   
            <Image :item="item" @show-info="showInfo"></Image>         
        </div>
    </div>
</template>

<script setup>
import Image from '@/components/Item/ItemImage.vue'
import { RouterLink } from 'vue-router';
import { defineProps, ref, computed } from 'vue';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import slugify from '@sindresorhus/slugify';
import alertify from 'alertifyjs';

const emit = defineEmits(['show-info','suscribirse']) 
const props = defineProps(["course","index"]);
const store = useAuthStore();
const { isAuthenticated, user, token } = storeToRefs(store);

const titleSlug = computed(() => { return slugify(props.course.title)})
let content = props.course.content ? props.course.content : "Descripcion del curso" 
let file = props.course.file ? props.course.file : "363645453-curso.png" 
let options = props.course.options ? props.course.options : "image-align:center;display-content:right" 
const item = ref({content, file, options})
let tags = ref([])

if (props.course.tags) {
    const stags = props.course.tags.split(",")
    stags.forEach((tag) => tags.value.push({name: tag}))
    console.log("tags",tags.value)
}

//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

const handleSuscribete = () => {
    if (isAuthenticated.value) {
        emit("suscribirse",props.course)
    }
    else {
  		alertify.error("Please login first");
    }    
}

function showInfo(info) {
    //console.log("Info captured:",info)
    emit("show-info",info)
}
</script>

<style scoped>
.card-course {
    float: left;
    width: 100%;
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
    line-height: 16px !important;
}
.link-home-course:hover {
  color: rgb(30, 30, 255);;
}
.container-home-course-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 16px !important;
}
.container-home-course-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 150px;
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
.tag {
    background-color: red;
    border-radius: 10px;
    padding: 3px 10px; 
    margin-left: 10px;
    width: 150px;
}
</style>