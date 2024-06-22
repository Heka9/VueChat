<script setup>
const props = defineProps(['friendList'])
const emit = defineEmits(['friendClick'])

const onClick = (friendId) => {
  emit('friendClick', friendId)
}
</script>

<template>
  <ul class="list-friends__list">
    <li
      @click="onClick(friend.id)"
      v-for="friend in props.friendList"
      :key="friend.id"
      class="list-friends__item"
    >
      <p class="list-friends__name">{{ friend.name }}</p>
      <p class="list-friends__counter">{{ friend.messages.quantity + ' messages' }}</p>
    </li>
  </ul>
</template>

<style scoped>
.list-friends__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.list-friends__item {
  display: flex;
  gap: 15px;
  align-items: center;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  padding: 10px;
  box-shadow: 2px 2px 10px var(--vt-c-text-dark-2);
  cursor: pointer;
}
.list-friends__name {
  flex: 1 0 auto;
  font-size: 20px;
}
.list-friends__counter {
  font-size: 14px;
}
</style>
