import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '../layouts/DefaultLayout.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

// Public Pages
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ArticlesView from '../views/ArticlesView.vue'
import ArticleDetailView from '../views/ArticleDetailView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import ContactView from '../views/ContactView.vue' 
import MedicalCheckView from '../views/MedicalCheckupView.vue'
import DoctorsView from '../views/DoctorsView.vue'
import QueueBooking from '../views/QueueBooking.vue'

// Admin Pages
import AdminDashboard from '../views/admin/AdminDashboard.vue'
import AdminPatients from '../views/admin/AdminPatients.vue'
import AdminDoctors from '../views/admin/AdminDoctors.vue'
import AdminSchedules from '../views/admin/AdminSchedules.vue'
import AdminScheduleEntryForm from '../views/admin/AdminScheduleEntryForm.vue'
import AdminSlideshow from '../views/admin/AdminSlideshow.vue'
import AdminArticles from '../views/admin/AdminArticles.vue'
import AdminArticleForm from '../views/admin/AdminArticleForm.vue'
import AdminDoctorForm from '../views/admin/AdminDoctorForm.vue'
import AdminQueue from '../views/admin/AdminQueue.vue'
import AdminQueueForm from '../views/admin/AdminQueueForm.vue'
import AdminBranch from '../views/admin/AdminBranch.vue'

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
        path: 'articles/:id',
        name: 'article-detail',
        component: ArticleDetailView
      },
      {
        path: 'about',
        name: 'about',
        component: AboutView
      },
      {
        path: 'register',
        name: 'register',
        component: RegisterView,
        meta: { guestOnly: true }
      },
      {
        path: 'login',
        name: 'login',
        component: LoginView,
        meta: { guestOnly: true }
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
      },
      {
        path: 'doctors',
        name: 'doctors',
        component: DoctorsView
      },
      {
        path: 'antrian',
        name: 'QueueBooking',
        component: QueueBooking
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
        path: 'schedules',
        name: 'admin-schedules',
        component: AdminSchedules
      },
      {
        path: 'schedules/create',
        name: 'admin-schedules-create',
        component: AdminScheduleEntryForm
      },
      {
        path: 'schedules/edit/:id',
        name: 'admin-schedules-edit',
        component: AdminScheduleEntryForm
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
      },
      {
        path: 'articles/create',
        name: 'admin-articles-create',
        component: AdminArticleForm
      },
      {
        path: 'articles/edit/:id',
        name: 'admin-articles-edit',
        component: AdminArticleForm
      },
      {
        path: 'doctors/create',
        name: 'admin-doctors-create',
        component: AdminDoctorForm
      },
      {
        path: 'doctors/edit/:id',
        name: 'admin-doctors-edit',
        component: AdminDoctorForm
      },
      {
        path: 'antrian',
        name: 'admin-queue',
        component: AdminQueue
      },
      {
        path: 'antrian/create',
        name: 'admin-queue-create',
        component: AdminQueueForm
      },
      {
        path: 'antrian/edit/:id',
        name: 'admin-queue-edit',
        component: AdminQueueForm
      },
      {
        path: 'branch',
        name: 'admin-branch',
        component: AdminBranch
      }

    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  const isUser = localStorage.getItem('user') !== null
  const isLoggedIn = isAdmin || isUser

  // Admin guard
  if (to.meta.requiresAuth) {
    if (isAdmin) {
      next()
    } else {
      next('/login')
    }
    return
  }

  // Guest guard (mencegah akses login/register jika sudah login)
  if (to.meta.guestOnly) {
    if (isLoggedIn) {
      next('/')
    } else {
      next()
    }
    return
  }

  next()
})

export default router