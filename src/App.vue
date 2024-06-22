<script setup>
import { RouterView } from 'vue-router'
import { reactive, provide } from 'vue'

const currentUser = reactive({
  nickName: '',
  password: '',
  imageUrl: ''
})

const updateCurrentUserData = (name, password, imgUrl) => {
  currentUser.nickName = name
  currentUser.password = password
  currentUser.imageUrl = imgUrl
}

provide('currentUser', { updateCurrentUserData, currentUser })
</script>

<template>
  <router-view />
</template>

<style scoped></style>
