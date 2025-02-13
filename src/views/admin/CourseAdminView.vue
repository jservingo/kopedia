<template>
    <div v-if="course" class="container-fluid container-course">
        <Unauthorized v-if="auth_error"></Unauthorized>
        <Header v-else :course="course" 
            @add-unit="showModalAddUnit"
            @show-clipboard="showModalClipboard">
        </Header>
        <Unit v-for="(unit,index) in course.units" :unit="unit" :index="index"
            @down-unit="downUnit"
            @up-unit="upUnit"
            @edit-unit="showModalEditUnit"
            @add-unit-to-clipboard="addUnitToClipboard"
            @delete-unit="deleteUnit">
        </Unit>
    </div>

    <ModalNew title="Crear unidad"
        @save="saveModalAddUnit">
    </ModalNew>
    
    <ModalEdit title="Editar unidad"
        @save="saveModalEditUnit">
    </ModalEdit>
    
    <ModalClipboard @save="saveModalClipboard">        
        <div v-for="unit in units" class="row">
            <div class="xcol-lg-12">
                <div class="form-floating mb-2">
                    <input type='checkbox' name='option' :value="unit.id"/>
                    {{ unit.title }}
                </div>
            </div>
        </div>  
    </ModalClipboard>
</template>

<script setup>
import Header from '@/components/admin/CourseHeader.vue'
import Unit from '@/components/admin/CourseUnit.vue'
import Unauthorized from '@/components/UnauthorizedUser.vue'
import ModalNew from "@/components/modals/ModalNew.vue";
import ModalEdit from "@/components/modals/ModalEdit.vue";
import ModalClipboard from "@/components/modals/ModalClipboard.vue";
import useCourse from '@/composables/admin/useCourseAdmin';
import useClipboardUnits from '@/composables/admin/useClipboardUnits';

import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
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
const { course, auth_error, getCourse } = useCourse()
//Get Clipboard units
const { units, getClipboard } = useClipboardUnits()
const router = useRouter()

let new_modal = null
let edit_modal = null
let clipboard_modal = null
let edit_unit = ref({})

onMounted(() => {
    new_modal = new Modal(document.getElementById('modalNew'))
    edit_modal = new Modal(document.getElementById('modalEdit'))
    clipboard_modal = new Modal(document.getElementById('modalClipboard'))
    getCourse(token.value, id.value)
    getClipboard(token.value)  
})

const showModalAddUnit = () => {
    new_modal.show()
}

const saveModalAddUnit = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("new_title").value
        title = title.substr(0,255)
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
                document.getElementById('new_title').value = ""
                router.push(`/admin/unit/${response.data.unit.id}/unit`) 
                //course.value.units.push(response.data.unit)
                new_modal.hide()           
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

const addUnitToClipboard = (unit) => {
    if (isAuthenticated.value) {
        if (units.value.find(loopUnit => loopUnit.id==unit.id)) {
            alertify.warning("Esta unidad ya fue añadida al portapapeles")
            return; 
        }
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/clipboard/unit/add`, 
            data: {"id_unit":unit.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                units.value.push(unit)
                alertify.success("La unidad fue añadida al portapapeles")       
            }
            else {
                alertify.error("Error: No se pudo añadir la unidad al portapapeles")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
}

const showModalClipboard = () => {
    clipboard_modal.show()
}

const saveModalClipboard = () => {
    if (isAuthenticated.value) {
        let checkboxes = document.getElementsByName('option');
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                const unit_id = checkboxes[i].value
                if (course.value.units.find(unit => unit.id==unit_id)) {
                    break;
                }
                axios({
                    method: "post",
                    url: `http://localhost:4000/api/admin/unit/update/course`, 
                    data: {"id_unit":unit_id,"id_course":course.value.id}, 
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                .then(response => {
                    if (!response.data.error) {
                        const unit = response.data.unit
                        course.value.units.push(unit)
                        units.value = units.value.filter(loopItem => loopItem.id !== unit.id)
                        alertify.success("La unidad fue añadida al curso")                               
                    }
                    else {
                        alertify.error("Error: No se pudo añadir la unidad al curso")
                    }
                })
            }
        }        
    }
    else {
  		alertify.error("Please login first");
    }
    clipboard_modal.hide()
};

const showModalEditUnit = (unit) => {
    edit_unit.value = unit;
    document.getElementById("edit_id").value = unit.id
    document.getElementById("edit_title").value = unit.title
    edit_modal.show()
}

const saveModalEditUnit = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("edit_id").value
        let title = document.getElementById("edit_title").value
        title = title.substr(0,255)
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
                edit_unit.value.title = title
                alertify.success("La unidad fue modificada exitosamente")
                edit_modal.hide()            
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

const upUnit = (unit) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/unit/update/up`, 
            data: {"id":unit.id,"id_course":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getCourse(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")          
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const downUnit = (unit) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/unit/update/down`, 
            data: {"id":unit.id,"id_course":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getCourse(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")        
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const deleteUnit = (unit) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar unidad', 'Esta seguro que desea eliminar esta unidad?', function() { 
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
                    course.value.units = course.value.units.filter((loopItem) => loopItem !== unit)
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