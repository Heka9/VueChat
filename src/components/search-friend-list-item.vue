<script setup>
defineProps(['friend'])

</script>

<template>
    <li class="list-friends__item">
<!--      <p class="list-friends__name">{{ friend.name }}</p>-->
<!--      <p class="list-friends__counter">{{ friend.messages.quantity + ' messages' }}</p>-->
      {{friend}}
    </li>
</template>

<style scoped>
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
</style>
