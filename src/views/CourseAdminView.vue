<template>
    <div v-if="course" class="container-fluid container-course">
        <Header :course="course" 
            @add-unit="showModalAddUnit">
        </Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"
            @edit-unit="showModalEditUnit"
            @delete-unit="deleteUnit">
        </Unit>
    </div>

    <div class="modal fade" tabindex="-1" id="modalNewUnit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear unidad</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="closeModalAddUnit">
            </button>
          </div>
          <div class="modal-body">
            <form name="formNew">
                <div class="row">
                    <div class="col-lg-6">
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
                @click="closeModalAddUnit">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="saveModalAddUnit">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEditUnit">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar unidad</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalEditUnit">
            </button>
          </div>
          <div class="modal-body">
            <form name="formEdit">
                <div class="row">
                    <div class="col-lg-6">
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
                @click="closeModalEditUnit">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalEditUnit">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Header from '../modules/admin/CourseHeader.vue'
import Unit from '../modules/admin/CourseUnit.vue'
import { ref, onMounted } from 'vue';
import useCourse from '../composables/useCourseAdmin';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get course
const { course, getCourse } = useCourse()
const router = useRouter()

let modal = null
let emodal = null
let eunit = ref({})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewUnit'))
    emodal = new Modal(document.getElementById('modalEditUnit'))
    getCourse(token.value, id.value)
})

const showModalAddUnit = () => {
    modal.show()
}

const closeModalAddUnit = () => {
    modal.hide()
}

const saveModalAddUnit = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("title").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/unit/create`, 
            data: {"id_course":course.value.id,"title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.unit.error) {
                alertify.success("La unidad fue creada exitosamente")
                document.getElementById('title').value = ""
                router.push(`/admin/unit/${response.data.unit.id}`) 
                //course.value.units.push(response.data.unit)
                modal.hide()           
            }
            else {
                alertify.error("Error: No se pudo crear la unidad.")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const showModalEditUnit = (unit) => {
    eunit.value = unit;
    document.getElementById("eid").value = unit.id
    document.getElementById("etitle").value = unit.title
    emodal.show()
}

const closeModalEditUnit = () => {
    emodal.hide()
}

const saveModalEditUnit = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let title = document.getElementById("etitle").value
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/unit/update`, 
            data: {"id":id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                eunit.value.title = title
                alertify.success("La unidad fue modificada exitosamente")
                emodal.hide()            
            }
            else {
                alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const deleteUnit = (unit) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar unidad', 'Esta seguro que desea eliminar esta unidad?', function() { 
            course.value.units = course.value.units.filter((loopItem) => loopItem !== unit);
            axios({
                method: "post",
                url: `http://localhost:4000/api/admin/unit/delete`, 
                data: {"id": unit.id}, 
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    alertify.success("La unidad fue eliminada")
                }
                else {
                    alertify.error("Error: No se pudo eliminar la unidad")
                }
            })
        }, function() { 
            //alertify.error('Cancel')
        });
    }
    else {
  		alertify.error("Please login first");
    }
};
</script>

<style scoped>
.container-course {
    display: block;
}
</style>