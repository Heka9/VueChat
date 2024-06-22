<script setup>
import { reactive, ref, computed, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { searchUserInStorage } from '@/utils/searchUser.js'
import router from '@/router/index.js'

const user = reactive({
  nickName: '',
  password: '',
  imageUrl: ''
})
const showErrorMsg = ref(false)
const imageInput = ref(null)
const userNickName = ref(null)

const { updateCurrentUserData } = inject('currentUser')

const isUserDataValid = computed(() => {
  return !!(user.nickName && user.password && user.imageUrl)
})
const changeUserImage = (e) => {
  if (e.target.files[0]) {
    user.imageUrl = e.target.files[0].name
  } else user.imageUrl = ''
}

const createUser = () => {
  const userData = searchUserInStorage(user.nickName)

  if (userData) {
    showErrorMsg.value = true
    userNickName.value.focus()
  }

  if (!userData && isUserDataValid.value) {
    localStorage.setItem(user.nickName, JSON.stringify(user))
    updateCurrentUserData(user.nickName, user.password, user.imageUrl)
    user.nickName = ''
    user.password = ''
    user.imageUrl = ''
    imageInput.value.value = null
    showErrorMsg.value = false
    router.push('/chat')
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <router-link to="/" class="modal__button-back">Back to wellcome page</router-link>
      <div class="modal__body">
        <div class="modal__input">
          <label for="nickname">Nickname</label>
          <input
            ref="userNickName"
            v-model="user.nickName"
            autocomplete="off"
            id="nickname"
            type="text"
          />
        </div>
        <div class="modal__input">
          <label for="password">Password</label>
          <input id="password" type="password" v-model="user.password" />
        </div>
        <div class="modal__input">
          <label for="image">Choose image</label>
          <input ref="imageInput" @change="changeUserImage" id="image" type="file" />
        </div>
        <div v-if="showErrorMsg" class="modal__error">User already exist. Try log in</div>
        <button
          @click="createUser"
          type="button"
          :disabled="!isUserDataValid"
          class="modal__button"
          :class="{ disabled: !isUserDataValid }"
        >
          Create user
        </button>
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
.modal__button-back {
  font-size: 14px;
  align-self: flex-end;
  cursor: pointer;
}
.modal__body {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.modal__input {
  display: flex;
  align-items: center;
  gap: 20px;
}
.modal__input label {
  flex: 0 0 120px;
}
.modal__input input {
  flex: 1 1 auto;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  padding: 5px 10px;
}
.modal__button {
  text-decoration: none;
  text-align: center;
  padding: 12px 32px;
  border-radius: 64px;
  font-size: 16px;
  color: #ffffff;
  background-color: #168381;
  cursor: pointer;
}
.disabled {
  opacity: 0.7;
  cursor: default;
}
.modal__error {
  color: red;
  font-size: 12px;
}
</style>
