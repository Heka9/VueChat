<script setup>
import { computed, reactive, ref, inject } from 'vue'
import { RouterLink } from 'vue-router'
import { searchUserInStorage } from '@/utils/searchUser.js'
import router from '@/router/index.js'

const { updateCurrentUserData } = inject('currentUser')

const user = reactive({
  nickName: '',
  password: ''
})
const showErrorMsg = ref(false)
const errorMsg = ref('')
const nickNameInput = ref(null)
const passwordInput = ref(null)

const isUserDataValid = computed(() => {
  return !!(user.nickName && user.password)
})
const checkUserAccess = () => {
  const checkedUserData = searchUserInStorage(user.nickName)

  if (checkedUserData) {
    if (checkedUserData.nickName === user.nickName && checkedUserData.password === user.password) {
      errorMsg.value = ''
      showErrorMsg.value = false
      updateCurrentUserData(
        checkedUserData.nickName,
        checkedUserData.password,
        checkedUserData.imageUrl
      )
      router.push('/chat')
    } else {
      errorMsg.value = 'Incorrect password'
      showErrorMsg.value = true
      passwordInput.value.focus()
    }
  } else {
    errorMsg.value = "User doesn't exist. Try to register!"
    showErrorMsg.value = true
    nickNameInput.value.focus()
  }
}
</script>

<template>
  <div class="modal">
    <div class="modal__content">
      <router-link to="/" class="modal__button-back">Back to wellcome page</router-link>
      <div class="modal__body">
        <div class="modal__input">
          <label ref="nickNameInput" for="nickname">Nickname</label>
          <input id="nickname" type="text" v-model="user.nickName" />
        </div>
        <div class="modal__input">
          <label for="password">Password</label>
          <input ref="passwordInput" id="password" type="password" v-model="user.password" />
        </div>
        <div v-if="showErrorMsg" class="modal__error">{{ errorMsg }}</div>
        <button
          @click="checkUserAccess"
          :disabled="!isUserDataValid"
          type="button"
          :class="{ disabled: !isUserDataValid }"
          class="modal__button"
        >
          Enter chat
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
