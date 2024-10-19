<template>
    <div v-if="unit" class="container-fluid container-course">
        <Header :unit="unit" 
            @add-page="showModalAddPage">
        </Header>
        <Page v-for="(page,index) in unit.pages" :page="page" :index="index"
            @edit-page="showModalEditPage" @delete-page="deletePage">
        </Page>
    </div>

    <div class="modal fade" tabindex="-1" id="modalNewPage">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear página</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="closeModalAddPage">
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
                @click="closeModalAddPage">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="saveModalAddPage">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="modalEditPage">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar página</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalEditPage">
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
                @click="closeModalEditPage">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalEditPage">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import Header from '../modules/admin/UnitHeader.vue'
import Page from '../modules/admin/UnitPage.vue'
import { defineProps, ref, computed, onMounted } from 'vue';
import useUnit from '@/composables/useUnitAdmin';
import { useRoute } from 'vue-router';
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
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
const { unit, getUnit } = useUnit()
const router = useRouter()

let modal = null
let emodal = null
let epage = ref({})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewPage'))
    emodal = new Modal(document.getElementById('modalEditPage'))
    getUnit(token.value, id.value)
})

const showModalAddPage = () => {
    modal.show()
}

const closeModalAddPage = () => {
    modal.hide()
}

const saveModalAddPage = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("title").value
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
                document.getElementById('title').value = ""
                router.push(`/admin/page/${response.data.page.id}`)
                //unit.value.pages.push(response.data.page)
                modal.hide()           
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

const showModalEditPage = (page) => {
    epage.value = page;
    document.getElementById("eid").value = page.id
    document.getElementById("etitle").value = page.title
    emodal.show()
}

const closeModalEditPage = () => {
    emodal.hide()
}

const saveModalEditPage = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid").value
        let title = document.getElementById("etitle").value
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
                epage.value.title = title
                alertify.success("La página fue modificada exitosamente")
                emodal.hide()            
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

const deletePage = (page) => {
    if (isAuthenticated.value) {
        alertify.defaults.transition = "slide";
        alertify.defaults.theme.ok = "btn btn-primary";
        alertify.defaults.theme.cancel = "btn btn-danger";
        alertify.defaults.theme.input = "form-control";
        alertify.confirm('Eliminar página', 'Esta seguro que desea eliminar esta página?', function() { 
            unit.value.pages = unit.value.pages.filter((loopItem) => loopItem !== page);
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