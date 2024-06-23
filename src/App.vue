<script setup>
import { RouterView } from 'vue-router'
import { ref, provide } from 'vue'

const currentUser = ref({})

const updateCurrentUserData = (user) => {
  console.log(user)
  currentUser.value = user
}

provide('currentUser', { updateCurrentUserData, currentUser })
</script>

<template>
  <router-view />
</template>

