<template>
    <div class ="card card-course" :style="{background:bgGradient }">
        <div class="card-body">
            <div class="d-flex">
                <div class ="container-fluid container-home-course-header">
                    <RouterLink class="link-home-course link-underline link-underline-opacity-0" 
                        :to="`/student/course/${subscription.id}/${titleSlug}`">{{ subscription.title }}
                    </RouterLink>
                    <span v-for="tag in tags" class="tag">
                        {{ tag.name }}
                    </span>
                </div>
                <div class ="container-fluid container-home-course-progress ml-auto">
                    <div class="progress" style="height: 20px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: 25%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
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
const props = defineProps(["subscription","index"]);

const titleSlug = computed(() => { return slugify(props.subscription.title)})
let content = props.subscription.content ? props.subscription.content : "Descripcion del curso" 
let file = props.subscription.file ? props.subscription.file : "363645453-curso.png" 
let options = props.subscription.options ? props.subscription.options : "image-align:center;display-content:right" 
const item = ref({content, file, options})
let tags = ref([])

//console.log("tags",props.subscription.tags)
if (props.subscription.tags) {
    const stags = props.subscription.tags.split(",")
    stags.forEach((tag) => tags.value.push({name: tag}))
    //console.log("tags",tags.value)
}

//backgroundColor:bgColor
const bgColors=["#7facab","#bba4a2","#a3ab99","#a8a8b5","#baac7f","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//console.log(bgColor)  
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
    display: block;
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
    line-height: 18px !important;
}
.link-home-course:hover {
  color: rgb(30, 30, 255);;
}
.container-home-course-header {
    font-size: 18px;
    color: whitesmoke;
    line-height: 20px !important;
    margin-bottom: 6px;
}
.container-home-course-progress { 
    font-size: 14px;
    color: whitesmoke;
    width: 110px;
    padding-left: 0;
}
.bx {
    background-color: rgb(109, 218, 182);
}
.tag {
    background-color: red;
    border-radius: 10px;
    padding: 3px 10px; 
    margin-left: 10px;
    width: 150px;
}
</style>