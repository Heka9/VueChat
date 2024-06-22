<script setup>
const emit = defineEmits(['searchFriend'])

const changeSearchValue = (event) => {
  emit('searchFriend', event.target.value)
}
</script>

<template>
  <div class="search-panel">
    <input
      @input="changeSearchValue"
      class="search-panel__input"
      type="text"
      placeholder="Find friend..."
    />
  </div>
</template>

<style scoped>
.search-panel {
  display: flex;
  align-items: center;
  gap: 20px;
}
.search-panel__input {
  flex: 1 0 auto;
  padding: 6.5px 10px;
  border: 1px solid var(--vt-c-text-dark-2);
  border-radius: 5px;
  font-size: 20px;
}
</style>
