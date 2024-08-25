<template>
  <a-layout :class="modeClass">
    <!-- Sidebar -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <Sidebar :collapsed="collapsed" />
    </a-layout-sider>

    <!-- Main layout content -->
    <a-layout>
      <!-- Top navigation bar -->
      <a-layout-header class="header">
        <div class="logo">TestApp</div>
        <div class="header-content">
          <SearchBar />
          <UserPanel />

          <a-button @click="toggleMode" shape="circle">
            <template v-if="isDarkMode">
              L
            </template>
            <template v-else>
              D
            </template>
          </a-button>
        </div>
      </a-layout-header>

      <!-- Main content -->
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { LightBulbIcon as LightBulb } from '@heroicons/vue/24/solid';
import { LightBulbIcon as LightBulbOutlined } from '@heroicons/vue/24/outline';
import Sidebar from './components/Sidebar.vue';
import SearchBar from './components/SearchBar.vue';
import UserPanel from './components/UserPanel.vue';

export default defineComponent({
  components: { Sidebar, SearchBar, UserPanel },
  setup() {
    const isDarkMode = ref(false);
    const collapsed = ref(false);

    const modeClass = computed(() => (isDarkMode.value ? 'dark-mode' : 'light-mode'));

    function toggleMode() {
      isDarkMode.value = !isDarkMode.value;
    }

    return { toggleMode, isDarkMode, modeClass, collapsed, LightBulb, LightBulbOutlined };
  }
});
</script>

<style scoped>
/* General layout styles */
a-layout {
  min-height: 100vh;
}

/* Sidebar styles */
a-layout-sider {
  background-color: var(--sider-bg-color);
}

#app {
  width: 100%;
  height: 100%;
  display: block;
}

main {
  overflow: auto;
}

/* Header styles */
.header {
  background-color: var(--header-bg-color);
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  align-items: center;
}

.logo {
  font-size: 24px;
  color: var(--text-color);
}

.header-content {
  display: flex;
  align-items: center;
}

.content {
  padding: 24px;
  background-color: var(--content-bg-color);
}

/* Light and Dark mode variables */
.light-mode {
  --sider-bg-color: #ffffff;
  --header-bg-color: #ffffff;
  --content-bg-color: #f0f2f5;
  --text-color: #000000;
}

.dark-mode {
  --sider-bg-color: #001529;
  --header-bg-color: #001529;
  --content-bg-color: #141414;
  --text-color: #ffffff;
}

.ant-layout-has-sider {
  height: 100svh;
}
</style>
