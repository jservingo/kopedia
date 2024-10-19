<template>
    <div class ="container-fluid container-home-header">
        <button @click="$emit('add-course')" class="btn btn-primary">
            Add course
        </button>
    </div> 
</template>

<script setup>
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