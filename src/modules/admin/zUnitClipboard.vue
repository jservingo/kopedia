<template>
    <div class="modal fade" tabindex="-1" id="modalClipboard">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar unidad</h5>
            <button type="button" class="btn-close" aria-label="Close" 
                @click="closeModalClipboard"> 
            </button>
          </div>
          <div class="modal-body">
            <form name="formClipboard">
                <div v-for="unit in units" class="row">
                    <div class="col-lg-6">
                        <div class="form-floating mb-2">
                            <input type='checkbox' name='option[]' value={{ unit.id }}/>
                            {{ unit.title }}
                        </div>
                    </div>
                </div>
            </form>  
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" 
                @click="closeModalClipboard">Close
            </button>
            <button type="button" class="btn btn-primary"  
                @click="saveModalClipboard">
                Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div id='clipboard' class='multiselect'>
        <div v-for="unit in units"
            style='padding:8px; background-color:#cee3ea'>
            <input type='checkbox' name='option[]' value={{ unit.id }}/>
            {{ unit.title }}
        </div>";
    </div>
    -->
</template>

<script setup>
import { defineProps, ref, onMounted } from 'vue';
import useClipboardUnits from '@/composables/admin/useClipboardUnits';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';

//Get store
const store = useAuthStore()
const { isAuthenticated, token } = storeToRefs(store);

//Get Units
const { units, getClipboard } = useClipboardUnits()

onMounted(() => {
    getClipboard(token.value)
})
</script>

<style>
</style>