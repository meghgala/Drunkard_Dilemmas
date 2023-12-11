import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Connected views
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
    {
      path: '/select/',
      name: 'SelectView',
      component: () => import('../views/SelectView.vue')
    },
    {
      path: '/joinroom/',
      name: 'JoinRoomView',
      component: () => import('../views/JoinRoomView.vue')
    },
    {
      path: '/settings/:roomCode',
      name: 'SettingsView',
      component: () => import('../views/SettingsView.vue')
    },
    // End of connected views


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
      path: '/input/',
      name: 'Input1View',
      component: () => import('../views/Input1View.vue')
    },
    //{
    //  path: '/input2/:id',
    //  name: 'Input2View',
    //  component: () => import('../views/Input2View.vue')
    //},
    //{
    //  path: '/input3/:id',
    //  name: 'Input2View',
    //  component: () => import('../views/Input3View.vue')
    //},
    {
      path: '/join/:roomCode',
      name: 'JoinView',
      component: () => import('../views/JoinView.vue')
    },
    {
      path: '/load/',
      name: 'LoadingView',
      component: () => import('../views/LoadingView.vue')
    },
    {
      path: '/winner/',
      name: 'WinnerView',
      component: () => import('../views/WinnerView.vue')
    }
  ]
})

export default router
