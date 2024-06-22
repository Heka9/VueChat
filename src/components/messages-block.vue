<script setup>
const props = defineProps(['messagesHistoryList'])
</script>

<template>
  <ul class="messages-list">
    <li v-for="(msg, index) in props.messagesHistoryList" :key="index" class="messages-list__item">
      <p class="messages-list__my-msg">
        <span>{{ msg.myMsg }}</span>
      </p>
      <p class="messages-list__answer">
        <span>{{ msg.answer }}</span>
      </p>
    </li>
  </ul>
</template>

<style scoped>
.messages-list {
  overflow-y: auto;
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 10px;
}
.messages-list__item {
  display: flex;
  gap: 10px;
  flex-direction: column;
}
.messages-list__my-msg {
  display: flex;
  justify-content: flex-start;
}
.messages-list__my-msg span {
  padding: 5px 10px;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  box-shadow: 1px 1px 5px #aaaaaa;
  font-size: 20px;
}
.messages-list__answer {
  display: flex;
  justify-content: flex-end;
}
.messages-list__answer span {
  padding: 5px 10px;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  box-shadow: 1px 1px 5px #aaaaaa;
  font-size: 20px;
}
</style>
