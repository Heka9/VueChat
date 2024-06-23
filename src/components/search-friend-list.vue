<script setup>
import { SearchFriendListItem } from "@/components/search-friend-list-item.vue"
const props = defineProps(['friendList'])

const emit = defineEmits(['friendClick'])

const onClick = (friendId) => {
  emit('friendClick', props.friendList.find((friend) => friend.id === friendId))
}
</script>

<template>
  <ul class="list-friends__list">
    <SearchFriendListItem @click="onClick(friend.id)" v-for="(friend, index) in props.friendList" :key="index" :friend="friend"/>
    {{friendList}}
  </ul>
</template>

<style scoped>
.list-friends__list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

</style>
