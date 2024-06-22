<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <div class="modal__body">
        <h1 class="modal__title">Welcome to chat, dude!</h1>
        <router-link to="/registration" class="modal__button">Registration</router-link>
        <router-link to="/login" class="modal__button">Enter chat</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.modal__content {
  flex: 0 1 600px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 10px 5px var(--vt-c-text-dark-2);
  border-radius: 10px;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.modal__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal__title {
  text-align: center;
  padding-bottom: 20px;
  font-size: 24px;
  font-weight: 700;
}
.modal__button {
  text-align: center;
  padding: 12px 32px;
  border-radius: 64px;
  font-size: 16px;
  color: #ffffff;
  background-color: #168381;
  cursor: pointer;
}
</style>
