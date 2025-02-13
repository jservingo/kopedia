<template>
    <div v-if="unit" class="container-fluid container-course">
        <Unauthorized v-if="auth_error"></Unauthorized>
        <Header v-else :unit="unit" 
            @add-page="showModalAddPage"
            @show-clipboard="showModalClipboard">
        </Header>
        <Page v-for="(page,index) in unit.pages" :page="page" :index="index"
            @down-page="downPage"
            @up-page="upPage"
            @edit-page="showModalEditPage" 
            @add-page-to-clipboard="addPageToClipboard"
            @delete-page="deletePage">
        </Page>
    </div>

    <ModalNew title="Crear página"
        @save="saveModalAddPage">
    </ModalNew>
    
    <ModalEdit title="Editar página"
        @save="saveModalEditPage">
    </ModalEdit>
    
    <ModalClipboard @save="saveModalClipboard">        
        <div v-for="page in pages" class="row">
            <div class="xcol-lg-6">
                <div class="form-floating mb-2">
                    <input type='checkbox' name='option' :value="page.id"/>
                    {{ page.title }}
                </div>
            </div>
        </div> 
    </ModalClipboard>
</template>

<script setup>
import Header from '@/components/admin/UnitHeader.vue'
import Page from '@/components/admin/UnitPage.vue'
import Unauthorized from '@/components/UnauthorizedUser.vue'
import ModalNew from "@/components/modals/ModalNew.vue";
import ModalEdit from "@/components/modals/ModalEdit.vue";
import ModalClipboard from "@/components/modals/ModalClipboard.vue";
import useUnit from '@/composables/admin/useUnitAdmin';
import useClipboardPages from '@/composables/admin/useClipboardPages';

import { defineProps, ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

const props = defineProps(["unit","index"]);
//const bgColors=["#8ED6D5","#EFC7C5","#c8d4b6","#CFCDE2","#e5ce89","#FDD6AB"]
const bgColors=["#7facab","#bba4a2","#a3ab99","#baac7f","#a8a8b5","#c9b194"]
//Change bgColor
const bgColor = bgColors[props.index % 6]
//Change bgGradient
const bgGradient = computed(() => {
    return `linear-gradient(to right, #676B6A, ${bgColor})`;
})

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);
//Get id
const route = useRoute()
const id = ref('');
id.value = route.params.id
//Get unit
const { unit, auth_error, getUnit } = useUnit()
//Get Clipboard units
const { pages, getClipboard } = useClipboardPages()
const router = useRouter()

let new_modal = null
let edit_modal = null
let clipboard_modal = null
let edit_page = ref({})

onMounted(() => {
    new_modal = new Modal(document.getElementById('modalNew'))
    edit_modal = new Modal(document.getElementById('modalEdit'))
    clipboard_modal = new Modal(document.getElementById('modalClipboard'))
    getUnit(token.value, id.value)
    getClipboard(token.value)
})

const showModalAddPage = () => {
    new_modal.show()
}

const saveModalAddPage = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("new_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/page/create`, 
            data: {"id_unit":unit.value.id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.page.error) {
                alertify.success("La página fue creada exitosamente")
                document.getElementById('new_title').value = ""
                router.push(`/admin/page/${response.data.page.id}/page/page`)
                //unit.value.pages.push(response.data.page)
                new_modal.hide()           
            }
            else {
                alertify.error("Error: No se pudo crear la página")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const addPageToClipboard = (page) => {
    if (isAuthenticated.value) {
        if (pages.value.find(loopPage => loopPage.id==page.id)) {
            alertify.warning("Esta unidad ya fue añadida al portapapeles")
            return; 
        }
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/clipboard/page/add`, 
            data: {"id_page":page.id}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                pages.value.push(page)
                alertify.success("La página fue añadida al portapapeles")       
            }
            else {
                alertify.error("Error: No se pudo añadir la página al portapapeles")
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
                const page_id = checkboxes[i].value
                if (unit.value.pages.find(page => page.id==page_id)) {
                    break;
                }
                axios({
                    method: "post",
                    url: `http://localhost:4000/api/admin/page/update/unit`, 
                    data: {"id_page":page_id,"id_unit":unit.value.id}, 
                    headers: {
                        'Authorization': `Bearer ${token.value}`
                    }
                })
                .then(response => {
                    if (!response.data.error) {
                        const page = response.data.page
                        unit.value.pages.push(page)
                        pages.value = pages.value.filter(loopItem => loopItem.id !== page.id)
                        alertify.success("La página fue añadida a la unidad")                               
                    }
                    else {
                        alertify.error("Error: No se pudo añadir la página a la unidad")
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

const showModalEditPage = (page) => {
    edit_page.value = page;
    document.getElementById("edit_id").value = page.id
    document.getElementById("edit_title").value = page.title
    edit_modal.show()
}

const saveModalEditPage = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("edit_id").value
        let title = document.getElementById("edit_title").value
        title = title.substr(0,255)
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/page/update`, 
            data: {"id":id, "title":title}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                edit_page.value.title = title
                alertify.success("La página fue modificada exitosamente")
                edit_modal.hide()            
            }
            else {
                alertify.error("Error: No se pudo modificar la página")
            }
        })
    }
    else {
  		alertify.error("Please login first");
    }
};

const upPage = (page) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/page/update/up`, 
            data: {"id":page.id,"id_unit":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getUnit(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")          
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const downPage = (page) => {
    if (isAuthenticated.value) {
        axios({
            method: "post",
            url: `http://localhost:4000/api/admin/page/update/down`, 
            data: {"id":page.id,"id_unit":id.value}, 
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        .then(response => {
            if (!response.data.error) {
                getUnit(token.value, id.value)
                //alertify.success("La unidad fue modificada exitosamente")        
            }
            else {
                //alertify.error("Error: No se pudo modificar la unidad")
            }
        })
    }
}

const deletePage = (page) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar página', 'Esta seguro que desea eliminar esta página?', function() { 
            axios({
                method: "post",
                url: `http://localhost:4000/api/admin/page/delete`, 
                data: {"id": page.id}, 
                headers: {
                    'Authorization': `Bearer ${token.value}`
                }
            })
            .then(response => {
                if (!response.data.error) {
                    unit.value.pages = unit.value.pages.filter((loopItem) => loopItem !== page)
                    alertify.success("La página fue eliminada")
                }
                else {
                    alertify.error("Error: No se pudo eliminar la página")
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

<style>
.card-container {
    font-size: 17px;
    padding: 0px;
    padding-top: 3px;
    margin-bottom: 12px;
}
.card-body {
    padding: 0
}
</style>