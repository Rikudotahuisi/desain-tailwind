import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Public Pages
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ContactView from '../views/ContactView.vue' 
import MedicalCheckView from '../views/MedicalCheckupView.vue'

// Admin Pages
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminPatients from '../views/admin/AdminPatients.vue'
import AdminDoctors from '../views/admin/AdminDoctors.vue'
import AdminAppointments from '../views/admin/AdminAppointments.vue'
import AdminSlideshow from '../views/admin/AdminSlideshow.vue'
import AdminArticles from '../views/admin/AdminArticles.vue'

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
        path: 'articles',
        name: 'articles',
        component: ArticlesView
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView
      },
      {
        path: 'contact',
        name: 'contact',
        component: ContactView
      },
      {
        path: 'medical-checkup',
        name: 'medical-checkup',
        component: MedicalCheckView
      }
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
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
      },
      {
        path: 'slideshow',
        name: 'admin-slideshow',
        component: AdminSlideshow
      },
      {
        path: 'articles',
        name: 'admin-articles',
        component: AdminArticles
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Guard untuk proteksi admin
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const isAdmin = localStorage.getItem('isAdmin')
    if (isAdmin === 'true') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router