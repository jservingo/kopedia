<template>
    <div v-if="info.courses" class ="container-fluid container-home">
        <Header @add-course="showModalAddCourse"></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index" 
            @edit-course="showModalEditCourse" 
            @delete-course="deleteCourse"
            @show-info="showModalInfo">
        </CourseBox>
    </div>

    <ModalNew title="Crear curso"
        @save="saveModalAddCourse">
    </ModalNew>
    
    <ModalEdit title="Editar curso"
        @save="saveModalEditCourse">
    </ModalEdit>

    <ModalInfo></ModalInfo>
</template>

<script setup>
//v-model="ecourse.title"
import Header from '@/modules/admin/HomeHeader.vue'
import CourseBox from '@/modules/admin/HomeCourse.vue'
import ModalNew from "@/modules/modals/ModalNew.vue";
import ModalEdit from "@/modules/modals/ModalEdit.vue";
import ModalInfo from "@/modules/modals/ModalInfo.vue";
import { ref, onMounted } from 'vue';
import useHome from '@/composables/admin/useHomeAdmin';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
const { info, getInfo } = useHome()
const router = useRouter()

let new_modal = null
let edit_modal = null
let info_modal = null
let edit_course = ref({})

onMounted(() => {
    new_modal = new Modal(document.getElementById('modalNew'))
    edit_modal = new Modal(document.getElementById('modalEdit'))
    info_modal = new Modal(document.getElementById('modalInfo'))
    getInfo(token.value)
})

const showModalAddCourse = () => {
    new_modal.show()
}

const saveModalAddCourse = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("new_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/course/create`, 
            data: {"title": title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.course.error) {
                alertify.success("El curso fue creado exitosamente")
                document.getElementById('new_title').value = ""
                new_modal.hide()
                router.push(`/admin/course/${response.data.course.id}`)            
            }
            else {
                alertify.error("Error: No se pudo crear el curso.")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const showModalEditCourse = (course) => {
    edit_course.value = course;
    document.getElementById("edit_id").value = course.id
    document.getElementById("edit_title").value = course.title
    edit_modal.show()
}

const saveModalEditCourse = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("edit_id").value
        let title = document.getElementById("edit_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/course/update`, 
            data: {"id":id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                edit_course.value.title = title
                alertify.success("El curso fue modificado exitosamente")
                edit_modal.hide()            
            }
            else {
                alertify.error("Error: No se pudo modificar el curso.")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const deleteCourse = (course) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar curso', 'Esta seguro que desea eliminar este curso?', function() { 
            info.value.courses = info.value.courses.filter((loopItem) => loopItem !== course);
            axios({
                method: "post",
                url: `http://localhost:4000/api/admin/course/delete`, 
                data: {"id": course.id}, 
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    alertify.success("El curso fue eliminado")
                }
                else {
                    alertify.error("Error: No se pudo eliminar el curso.")
                }
            })
        }, function() { 
            alertify.error('Cancel')
        });
    }
    else {
  		alertify.error("Please login first");
    }
};

function showModalInfo(info) {
    console.log("showInfo",info)
    document.getElementById('info').innerHTML=info
    info_modal.show()
}
</script>

<style>
.container-home {
    display: block;
    color:floralwhite;
}
</style>