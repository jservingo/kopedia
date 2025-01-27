<template>
    <div class ="card card-container" :style="{background:bgGradient }">
        <div class="card-body">
            <Header :unit="unit" :display="display" @display-items="displayItems"
                @edit-unit="$emit('edit-unit',unit)" @delete-unit="$emit('delete-unit',unit)">
            </Header>
        </div>
    </div>
</template>

<script setup>
import Header from './UnitHeader.vue'
import { defineProps, ref, computed, onMounted } from 'vue';
import useUnit from '@/composables/admin/useUnitAdmin';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
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
//Get unit
const { pages, getPages } = useUnit()
let modal = null
let emodal = null
let epage = ref({})

onMounted(() => {
    modal = new Modal(document.getElementById('modalNewPage'))
    emodal = new Modal(document.getElementById('modalEditPage'))
    getPages(token.value, props.unit.id)
})

//Show or hide items
const display = ref(true);
const displayItems = (mode) => {
    display.value = !display.value;
}

const emit = defineEmits(['edit-unit', 'delete-unit'])
const editUnit = (unit) => {
    console.log('edit-unit')
    emit('edit-unit',unit)
}
const deleteUnit = (unit) => {
    emit('delete-unit',unit)
}

const showModalAddPage = () => {
    //OJO hay que hacer un emit y pasar unit
    console.log("showModalAddPage")
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
                unit.value.pages.push(response.data.page)
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
    //OJO Hay que hacer un emit y pasar page
    console.log('showModalEditPage')
    epage.value = page;
    document.getElementById("eid2").value = page.id
    document.getElementById("etitle2").value = page.title
    emodal.show()
}

const closeModalEditPage = () => {
    console.log("closeModal")
    emodal.hide()
}

const saveModalEditPage = () => {
    if (isAuthenticated.value) {
        let id = document.getElementById("eid2").value
        let title = document.getElementById("etitle2").value
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
            alertify.error('Cancel')
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