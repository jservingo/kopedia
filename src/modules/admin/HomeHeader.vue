<template>
    <div class ="container-fluid container-home-header">
        <button id="btnShow" type="button" class="btn btn-primary" @click="ShowModalAdd">
            Add course
        </button>
        HomeHeader
    </div> 

    <div class="modal fade" tabindex="-1" id="modalNew">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Crear curso</h5>
            <button type="button" class="btn-close" data-dismiss="modal" aria-label="Close" 
                @click="CloseModalAdd">
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
                @click="CloseModalAdd">Close
            </button>
            <button type="button" class="btn btn-primary" id="btnSave" 
                @click="SaveModalAdd">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import axios from "axios"
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Modal } from "bootstrap";
import alertify from 'alertifyjs';

const store = useAuthStore();
const { isAuthenticated, user, token } = storeToRefs(store);
const router = useRouter()
let modal = null

onMounted(() => {
    modal = new Modal(document.getElementById('modalNew'))
})

const ShowModalAdd = () => {
    modal.show()
}

const CloseModalAdd = () => {
    modal.hide()
}

const SaveModalAdd = () => {
    if (isAuthenticated.value) {
        let title = document.getElementById("title").value
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
</script>

<style>
.container-home-header {
    display: block;
    font-size: 22px;
    color: whitesmoke;
}
.modal-content {
    color: black;
}
</style>