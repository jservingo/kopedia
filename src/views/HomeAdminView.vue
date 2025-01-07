<template>
    <div v-if="info.courses" class ="container-fluid container-home">
        <Header @add-course="showModalAddCourse"></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index" 
            @edit-course="showModalEditCourse" 
            @delete-course="deleteCourse"
            @show-info="showModalInfo">
        </CourseBox>
    </div>

    <div class="modal fade" tabindex="-1" id="modalNewCourse">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear curso</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="closeModalAddCourse">
            </button>
          </div>
          <div class="modal-body">
            <form name="formNew">
                <div class="row">
                    <div class="xcol-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="title" placeholder="">
                            <label for="tilte">Titulo</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" 
                @click="closeModalAddCourse">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="saveModalAddCourse">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEdit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar curso</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalEditCourse">
            </button>
          </div>
          <div class="modal-body">
            <form name="formEdit">
                <div class="row">
                    <div class="xcol-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="etitle" placeholder="">
                            <label for="etilte">Titulo</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <input type="hidden" id="eid" name="eid">
            <button type="button" class="btn btn-secondary" 
                @click="closeModalEditCourse">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalEditCourse">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalInfo">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalInfo"> 
            </button>
          </div>
          <div class="modal-body">
            <div id="info"></div>
          </div>
          <div class="modal-footer">
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
//v-model="ecourse.title"
import Header from '../modules/admin/HomeHeader.vue'
import CourseBox from '../modules/admin/HomeCourse.vue'
import { ref, onMounted } from 'vue';
import useHome from '../composables/useHomeAdmin';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
const { info, getInfo } = useHome()
const router = useRouter()

let modal = null
let emodal = null
let info_modal = null
let ecourse = ref({})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewCourse'))
    emodal = new Modal(document.getElementById('modalEdit'))
    info_modal = new Modal(document.getElementById('modalInfo'))
    getInfo(token.value)
})

function showModalInfo(info) {
    console.log("showInfo",info)
    document.getElementById('info').innerHTML=info
    info_modal.show()
}

const closeModalInfo = () => {
    info_modal.hide()
}

const showModalAddCourse = () => {
    modal.show()
}

const closeModalAddCourse = () => {
    modal.hide()
}

const saveModalAddCourse = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("title").value
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
                document.getElementById('title').value = ""
                modal.hide()
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
    ecourse.value = course;
    document.getElementById("eid").value = course.id
    document.getElementById("etitle").value = course.title
    emodal.show()
}

const closeModalEditCourse = () => {
    emodal.hide()
}

const saveModalEditCourse = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let title = document.getElementById("etitle").value
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
                ecourse.value.title = title
                alertify.success("El curso fue modificado exitosamente")
                emodal.hide()            
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
</script>

<style>
.container-home {
    display: block;
    color:floralwhite;
}
</style>