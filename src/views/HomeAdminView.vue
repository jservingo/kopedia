<template>
    <div v-if="info.courses" class ="container-fluid container-home">
        <Header></Header>
        <CourseBox v-for="(course,index) in info.courses" :course="course" :index="index" @edit-course="ShowModalEdit" @delete-course="deleteCourse"></CourseBox>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEdit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar curso</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="CloseModalEdit">
            </button>
          </div>
          <div class="modal-body">
            <form name="formEdit">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type="text" class="form-control" id="etitle" placeholder=""
                                v-model="ecourse.title">
                            <label for="etilte">Titulo</label>
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <input type="hidden" id="eid" name="eid" v-model="ecourse.id">
            <button type="button" class="btn btn-secondary" 
                @click="CloseModalEdit">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="SaveModalEdit">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Header from '../modules/admin/HomeHeader.vue'
import CourseBox from '../modules/admin/CourseAdmin.vue'
import { ref, onMounted } from 'vue';
import useHome from '../composables/useHomeAdmin';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//console.log(token.value);
const { info, getInfo } = useHome()
let emodal = null
let ecourse = ref({})

onMounted(() => {
    emodal = new Modal(document.getElementById('modalEdit'))
    getInfo(token.value)
})

const ShowModalEdit = (course) => {
    console.log("ShowModalEdit")
    ecourse.value = course
    console.log(ecourse.value)
    emodal.show()
}

const CloseModalEdit = () => {
    console.log("closeModal")
    emodal.hide()
}

const SaveModalEdit = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let title = document.getElementById("etitle").value
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