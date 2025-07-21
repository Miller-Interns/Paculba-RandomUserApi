import { createRouter, createWebHistory } from 'vue-router'
import UsersView from '../views/users-view.vue'

export enum RouteName {
  USERS = 'home'
}

const routes = [
  {
    path: '/',
    name: RouteName.USERS,
    component: UsersView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router
