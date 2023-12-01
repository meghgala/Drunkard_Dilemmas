import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
      {
      path: '/poll/:id',
      name: 'PollView',
      component: () => import('../views/PollView.vue')
    },
    {
      path: '/create/',
      name: 'CreateView',
      component: () => import('../views/CreateView.vue')
    },
    {
      path: '/result/:id',
      name: 'ResultView',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/setting/',
      name: 'SettingsView',
      component: () => import('../views/SettingsView.vue')
    },
    {
      path: '/input/',
      name: 'InputView',
      component: () => import('../views/InputView.vue')
    },
    {
      path: '/join/',
      name: 'JoinView',
      component: () => import('../views/JoinView.vue')
    },
    {
      path: '/winner/',
      name: 'WinnerView',
      component: () => import('../views/WinnerView.vue')
    },
    {
      path: '/start/',
      name: 'StartPageView',
      component: () => import('../views/StartPageView.vue')
    },
    {
      path: '/select/',
      name: 'SelectGameView',
      component: () => import('../views/SelectGameView.vue')
    }
  ]
})

export default router
