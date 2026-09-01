import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import HomeView from '../views/HomeView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminPatients from '../views/admin/AdminPatients.vue'
import AdminDoctors from '../views/admin/AdminDoctors.vue'
import AdminAppointments from '../views/admin/AdminAppointments.vue'

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
    {
    path: '',
    name: 'home',
    component: HomeView
  },
  {
    path: '/articles',
    name: 'articles',
    component: ArticlesView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      {
        path: '',
        name: 'admin',
        component: AdminDashboard
      },
      {
        path: 'patients',
        name: 'admin-patients',
        component: AdminPatients
      },
      {
        path: 'doctors',
        name: 'admin-doctors',
        component: AdminDoctors
      },
      {
        path: 'appointments',
        name: 'admin-appointments',
        component: AdminAppointments
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router