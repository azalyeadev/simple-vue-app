import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/HomeComponent.vue'; 
import Arrays from '../components/ArrayComponent.vue';
import RestApi from '../components/RestApi.vue';
import GaugeChart from '../components/GaugeChart.vue';
import MultiColumnChart from '../components/MultiColumnChart.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/arrays',
    name: 'Arrays',
    component: Arrays,
  },
  {
    path: '/rest-api',
    name: 'RestApi',
    component: RestApi,
  },
  {
    path: '/gauge-chart',
    name: 'GaugeChart',
    component: GaugeChart,
  },
  {
    path: '/multi-chart',
    name: 'MultiColumnChart',
    component: MultiColumnChart,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;