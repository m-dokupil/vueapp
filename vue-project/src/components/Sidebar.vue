<template>
  <a-menu
    mode="inline"
    :default-selected-keys="['1']"
    :inline-collapsed="collapsed"
    theme="dark"
  >
    <a-menu-item key="1">
      <router-link to="/">
        <DashboardOutlined />
        <span v-if="!collapsed">Dashboard</span>
      </router-link>
    </a-menu-item>
    <a-sub-menu key="sub1" icon="TeamOutlined" :title="!collapsed ? 'Hub' : ''">
      <a-menu-item key="2">
        <router-link to="/securities">
          <span v-if="!collapsed">Securities</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="3">
        <router-link to="/symbols">
          <span v-if="!collapsed">Symbols</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="4">
        <router-link to="/liquidity-models">
          <span v-if="!collapsed">Liquidity Models</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="5">
        <router-link to="/markup-models">
          <span v-if="!collapsed">Markup Models</span>
        </router-link>
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item key="6">
      <router-link to="/makers">
        <TeamOutlined />
        <span v-if="!collapsed">Makers</span>
      </router-link>
    </a-menu-item>
    <a-menu-item key="7">
      <router-link to="/takers">
        <TeamOutlined />
        <span v-if="!collapsed">Takers</span>
      </router-link>
    </a-menu-item>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { DashboardOutlined, ShopOutlined, TeamOutlined } from '@ant-design/icons-vue';

export default defineComponent({
  components: { DashboardOutlined, ShopOutlined, TeamOutlined },
  props: {
    collapsed: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
/* Stylizacja menu */
a-menu {
  height: 100%;
  border-right: 0;
}

a-menu-item,
a-sub-menu {
  display: flex;
  align-items: center;
}

a-sub-menu > .ant-menu-submenu-title {
  display: flex;
  align-items: center;
}
</style>
