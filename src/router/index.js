import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import SelectView from '../views/SelectView.vue'
import JoinRoomView from '../views/JoinRoomView.vue'
import SettingsView from '../views/SettingsView.vue'
import InputView from '../views/InputView.vue'
import LobbyView from '../views/LobbyView.vue'
import QuestionView from '../views/QuestionView.vue'
import WinnerView from '../views/WinnerView.vue'
import FinalView from '../views/FinalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: StartView
    },
    {
      path: '/select/',
      name: 'SelectView',
      component: SelectView
    },
    {
      path: '/joinroom/',
      name: 'JoinRoomView',
      component: JoinRoomView
    },
    {
      path: '/settings/:roomCode',
      name: 'SettingsView',
      component: SettingsView
    },
    {
      path: '/input/:roomCode',
      name: 'InputView',
      component: InputView
    },
    {
      path: '/load/:roomCode',
      name: 'LoadingView',
      component: LobbyView
    },
    {
      path: '/questions/:roomCode',
      name: 'QuestionView',
      component: QuestionView
    },
    {
      path: '/winner/:roomCode',
      name: 'WinnerView',
      component: WinnerView
    },
    {
      path: '/final/:roomCode',
      name: 'FinalView',
      component: FinalView
    }
  ]
})

export default router
