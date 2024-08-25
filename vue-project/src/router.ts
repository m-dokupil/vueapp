import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import LiquidityModels from './views/LiquidityModels.vue';
import OtherPages from './views/OtherPages.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/liquidity-models', component: LiquidityModels },
  { path: '/securities', component: OtherPages },
  { path: '/symbols', component: OtherPages },
  { path: '/markup-models', component: OtherPages },
  { path: '/makers', component: OtherPages },
  { path: '/takers', component: OtherPages },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
