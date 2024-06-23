<script setup>
import { inject, ref } from 'vue'
import SearchFriendPanel from '@/components/search-friend-panel.vue'
import SearchFriendList from '@/components/search-friend-list-item.vue'
import friendListData from '@/assets/friends.json'
import MessagesBlock from '@/components/messages-block.vue'

const { updateCurrentUserData, currentUser } = inject('currentUser')

const friendList = ref(friendListData)
const chosenFriend = ref(null)
const message = ref('')

const onSearchFriend = (value) => {
  friendList.value = friendListData.filter((friend) =>
    friend.name.toLowerCase().includes(value.toLowerCase())
  )
}



const onChangeAvatarImage = (e) => {
  // const newAvatarImage = e.target.files[0].name
  // updateCurrentUserData(currentUser.nickName, currentUser.password, newAvatarImage)
  const updatedUser = {
    ...currentUser,
    imageUrl: e.target.files[0].name
  }
  updateCurrentUserData(updatedUser)

  // localStorage.setItem(currentUser.nickName, JSON.stringify({ ...currentUser, imageUrl: newAvatarImage }))
  // при деструктуризации теряю реактивность?
  // localStorage.setItem(
  //   currentUser.nickName,
  //   JSON.stringify({
  //     nickName: currentUser.nickName,
  //     password: currentUser.password,
  //     imageUrl: newAvatarImage
  //   })
  // )
  console.log(currentUser)
  console.log(updatedUser)
  localStorage.setItem(currentUser.nickName, JSON.stringify(updatedUser))
}

const createAnswer = (message) => {
  return 'You ' + message
}
const onSendMessage = () => {
  const newMessageBlock = {
    myMsg: message.value,
    answer: createAnswer(message.value)
  }

  chosenFriend.value.messages.history.push(newMessageBlock)
  chosenFriend.value.messages.quantity = chosenFriend.value.messages.quantity + 2
  message.value = ''
}
</script>

<template>
  <div class="chat">
    <div class="chat__sidebar">
      <div class="chat__user-profile user-profile">
        <div class="user-profile__image-container">
          <img
            :src="currentUser.imageUrl"
            :alt="currentUser.nickName + ' avatar'"
            class="user-profile__avatar"
          />
        </div>
        <div class="user-profile__change-image">
          <label for="avatar">Change avatar</label>
          <div class="user-profile__input-container">
            <input id="avatar" type="file" @change="onChangeAvatarImage" />
          </div>
        </div>
        <div class="user-profile__name">{{ currentUser.nickName }}</div>
      </div>
      <div class="chat__friends-list list-friends">
        <search-friend-panel @searchFriend="onSearchFriend" class="list-friends__search-panel" />
        <search-friend-list @friend-click="currentUser.value = $event" :friendList="friendList" />
        <pre>{{friendList}}</pre>
      </div>
    </div>
    <div v-if="chosenFriend" class="chat__content content-chat">
      <div class="content-chat__friend-info">
        <span class="content-chat__name">{{ chosenFriend.name + ' ' }}</span>
        <span class="content-chat__quantity">{{
          '(' + chosenFriend.messages.quantity + ' messages)'
        }}</span>
      </div>
      <messages-block
        class="content-chat__messages"
        :messagesHistoryList="chosenFriend.messages.history"
      />
      <div class="content-chat__send-block">
        {{currentUser}}
        <textarea
          v-model="message"
          placeholder="Enter message..."
          class="content-chat__textarea"
        ></textarea>
        <button @click="onSendMessage" class="content-chat__button">Send message</button>
      </div>
    </div>
    <div v-else class="content-chat__fallback-text">Choose friend to display message history</div>
  </div>
</template>

<style scoped>
.chat {
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 20px;
  padding: 10px 0;
}
.chat__sidebar {
  display: grid;
  grid-template-rows: auto auto;
  align-content: start;
  gap: 40px;
}
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}
.user-profile__image-container {
  width: 100px;
  height: 100px;
  flex: 0 0 100px;
}
.user-profile__avatar {
  display: block;
  width: 100%;
  height: 100%;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 3px 3px 20px #aaaaaa;
}
.user-profile__change-image {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user-profile__change-image label {
  flex: 0 0 auto;
  padding: 12px 32px;
  border-radius: 64px;
  border: 2px solid #168381;
  cursor: pointer;
}
.user-profile__input-container input {
  width: 100%;
  visibility: hidden;
  opacity: 0;
  display: none;
}
.user-profile__name {
  font-size: 24px;
  font-weight: 700;
}
.list-friends {
  display: grid;
  grid-template-rows: auto minmax(200px, 1fr);
  gap: 20px;
}
.content-chat {
  align-self: start;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 394px auto;
  gap: 30px;
}
.content-chat__friend-info {
  padding: 20px 0;
}
.content-chat__name {
  font-size: 24px;
  font-weight: 700;
}
.content-chat__fallback-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content-chat__quantity {
  font-size: 14px;
}
.content-chat__messages {
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  box-shadow: 2px 2px 10px var(--vt-c-text-dark-2);
}
.content-chat__send-block {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
}
.content-chat__textarea {
  resize: none;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 10px var(--vt-c-text-dark-2);
}
.content-chat__button {
  padding: 12px 32px;
  border-radius: 64px;
  border: 2px solid #168381;
  align-self: center;
}
</style>
