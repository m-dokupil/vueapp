<template>
  <div class="user-panel">
    <a-avatar src="https://i.pravatar.cc/40" />
    <div class="user-info">
      <span>Mozilla Firefox</span>
      <a-button type="link" @click="showSettings">Settings</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    function showSettings() {
      // Logika wyświetlania ustawień użytkownika
    }

    return { showSettings };
  },
});
</script>

<style scoped>
.user-panel {
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.user-info {
  margin-left: 12px;
  color: var(--text-color);
}

a-avatar {
  background-color: #1890ff;
}
</style>
