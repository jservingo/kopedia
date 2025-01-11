<template>
  <div>
    <h1>Bootstrap 5 modal</h1>
    <button type="button" class="btn btn-primary" 
      @click="showModalInfo">
      Show info
    </button>
    <button type="button" class="btn btn-primary" 
      @click="showModalNew">
      New modal
    </button>
    <button type="button" class="btn btn-primary" 
      @click="showModalEdit">
      Edit modal
    </button>
    <button type="button" class="btn btn-primary" 
      @click="showModalClipboard">
      Show clipboard
    </button>
    <ModalInfo info="Info: Hola"></ModalInfo>
    <ModalNew title="Crear unidad"
      @save="saveModalNew">
    </ModalNew>
    <ModalEdit title="Editar unidad"
      @save="saveModalEdit">
    </ModalEdit>
    <ModalClipboard @save="saveModalClipboard">
      <div class="row">
        <div class="xcol-lg-12">
            <div class="form-floating mb-2">
                <input type="text" class="form-control" id="xtitle" placeholder="">
                <label for="xtilte">Título</label>
            </div>
        </div>
    </div>
    </ModalClipboard>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';
import ModalInfo from "../modules/modals/ModalInfo.vue";
import ModalNew from "../modules/modals/ModalNew.vue";
import ModalEdit from "../modules/modals/ModalEdit.vue";
import ModalClipboard from "../modules/modals/ModalClipboard.vue";

let info_modal = null
let new_modal = null
let edit_modal = null
let clipboard_modal = null

onMounted(() => {
  info_modal = new Modal(document.getElementById('modalInfo'))
  new_modal = new Modal(document.getElementById('modalNew'))
  edit_modal = new Modal(document.getElementById('modalEdit'))
  clipboard_modal = new Modal(document.getElementById('modalClipboard'))
})

const showModalInfo = () => {
  console.log("showModalInfo")
  info_modal.show()
}

const showModalNew = () => {
  console.log("showModalNew")
  new_modal.show()
  document.getElementById("new_title").value = ""  
}

const saveModalNew = () => {
  console.log("saveModalNew",document.getElementById("new_title").value)
  new_modal.hide()
}

const showModalEdit = () => {
  console.log("showModalEdit")
  edit_modal.show()
  document.getElementById("edit_title").value = "Prueba"  
}

const saveModalEdit = () => {
  console.log("saveModalEdit",document.getElementById("edit_title").value)
  edit_modal.hide()
}

const showModalClipboard = () => {
  console.log("showModalClipboard")
  clipboard_modal.show()
}

const saveModalClipboard = () => {
  console.log("saveModalClipboard",document.getElementById("xtitle").value)
  clipboard_modal.hide()
}
</script>
  
