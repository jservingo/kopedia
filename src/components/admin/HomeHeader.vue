<template>
    <div class="container-header d-flex">
        <div class ="container-home-header">
            <span>Tus cursos creados</span>
        </div>
        <div class ="container-home-buttons">
            <button @click="$emit('add-course')" class="btn btn-add">
                <img src="@/assets/add.svg"/>
            </button>
        </div>
    </div> 
</template>

<script setup>
</script>

<style>
.container-header {
    padding-top: 6px;
    padding-bottom: 6px;
}
.container-home-header {
    font-size: 22px;
    width: calc(100% - 56px);
    color: whitesmoke;
    line-height: 24px !important;
}
.container-home-buttons { 
    font-size: 14px;
    color: whitesmoke;
    width: 50px;
}
.btn-add {
    background-color: #82a1c9 !important;
    padding: 0;
}
.btn-clipboard {
    background-color: #b8c57d !important;
    padding: 0;
}
</style>