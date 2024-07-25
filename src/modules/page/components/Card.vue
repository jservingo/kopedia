<template>
    <div class ="container">
        <Header></Header>
        <Text></Text>
        <Audio></Audio>
        <Formula></Formula>
    </div>
</template>

<script setup>
import Audio from './Audio.vue'
import Formula from './Formula.vue'
import Header from './Header.vue'
import Text from './Text.vue'
import Video from './Video.vue'
</script>

<style>
.container {
    display: block;
}
</style>