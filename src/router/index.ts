import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import AdminLayout from "../layouts/AdminLayout.vue";

// Public Pages
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import ArticlesView from "../views/ArticlesView.vue";
import ArticleDetailView from "../views/ArticleDetailView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import ContactView from "../views/ContactView.vue";
import ProductsView from "../views/ProductsView.vue";
import ProductDetailView from "../views/ProductDetailView.vue";
import DoctorsView from "../views/DoctorsView.vue";
import PatientRegistration from "../views/PatientRegistration.vue";
import QueueBooking from "../views/QueueBooking.vue";
import Branch from "../views/branch.vue";
import BranchDetail from "../views/branchDetail.vue";

// 404 Pages
import NotFoundView from "../views/NotFoundView.vue";
// Admin Pages
import AdminDashboard from "../views/admin/AdminDashboard.vue";
import AdminPatients from "../views/admin/AdminPatients.vue";
import AdminPatientForm from "../views/admin/AdminPatientForm.vue";
import AdminDoctors from "../views/admin/AdminDoctors.vue";
import AdminSchedules from "../views/admin/AdminSchedules.vue";
import AdminScheduleEntryForm from "../views/admin/AdminScheduleEntryForm.vue";
import AdminSlideshow from "../views/admin/AdminSlideshow.vue";
import AdminSlideshowForm from "../views/admin/AdminSlideshowForm.vue";
import AdminArticles from "../views/admin/AdminArticles.vue";
import AdminArticleForm from "../views/admin/AdminArticleForm.vue";
import AdminDoctorForm from "../views/admin/AdminDoctorForm.vue";
import AdminQueue from "../views/admin/AdminQueue.vue";
import AdminQueueForm from "../views/admin/AdminQueueForm.vue";
import AdminBranch from "../views/admin/AdminBranch.vue";
import AdminBranchForm from "../views/admin/AdminBranchForm.vue";
import AdminProducts from "../views/admin/AdminProducts.vue";
import AdminProductForm from "../views/admin/AdminProductForm.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: "",
        name: "home",
        component: HomeView,
      },
      {
        path: "articles",
        name: "articles",
        component: ArticlesView,
      },
      {
        path: "articles/:id",
        name: "article-detail",
        component: ArticleDetailView,
      },
      {
        path: "about",
        name: "about",
        component: AboutView,
      },
      {
        path: "register",
        name: "register",
        component: RegisterView,
        meta: { guestOnly: true },
      },
      {
        path: "login",
        name: "login",
        component: LoginView,
        meta: { guestOnly: true },
      },
      {
        path: "contact",
        name: "contact",
        component: ContactView,
      },
      {
        path: "produk",
        name: "products",
        component: ProductsView,
      },
      {
        path: "produk/:id",
        name: "product-detail",
        component: ProductDetailView,
      },
      {
        path: "doctors",
        name: "doctors",
        component: DoctorsView,
      },
      {
        path: "registration",
        name: "patient-registration",
        component: PatientRegistration,
      },
      {
        path: "antrian",
        name: "QueueBooking",
        component: QueueBooking,
      },
      {
        path: "branch",
        name: "branch",
        component: Branch,
      },
      {
        path: "branch/:id",
        name: "branch-Detail",
        component: BranchDetail,
      },
    ],
  },
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      {
        path: "",
        name: "admin",
        component: AdminDashboard,
      },
      {
        path: "patients",
        name: "admin-patients",
        component: AdminPatients,
      },
      {
        path: "patients/create",
        name: "admin-patients-create",
        component: AdminPatientForm,
      },
      {
        path: "patients/edit/:id",
        name: "admin-patients-edit",
        component: AdminPatientForm,
      },
      {
        path: "doctors",
        name: "admin-doctors",
        component: AdminDoctors,
      },
      {
        path: "schedules",
        name: "admin-schedules",
        component: AdminSchedules,
      },
      {
        path: "schedules/create",
        name: "admin-schedules-create",
        component: AdminScheduleEntryForm,
      },
      {
        path: "schedules/edit/:id",
        name: "admin-schedules-edit",
        component: AdminScheduleEntryForm,
      },
      {
        path: "slideshow",
        name: "admin-slideshow",
        component: AdminSlideshow,
      },
      {
        path: "slideshow/create",
        name: "admin-slideshow-create",
        component: AdminSlideshowForm,
      },
      {
        path: "slideshow/edit/:id",
        name: "admin-slideshow-edit",
        component: AdminSlideshowForm,
      },
      {
        path: "articles",
        name: "admin-articles",
        component: AdminArticles,
      },
      {
        path: "articles/create",
        name: "admin-articles-create",
        component: AdminArticleForm,
      },
      {
        path: "articles/edit/:id",
        name: "admin-articles-edit",
        component: AdminArticleForm,
      },
      {
        path: "doctors/create",
        name: "admin-doctors-create",
        component: AdminDoctorForm,
      },
      {
        path: "doctors/edit/:id",
        name: "admin-doctors-edit",
        component: AdminDoctorForm,
      },
      {
        path: "antrian",
        name: "admin-queue",
        component: AdminQueue,
      },
      {
        path: "antrian/create",
        name: "admin-queue-create",
        component: AdminQueueForm,
      },
      {
        path: "antrian/edit/:id",
        name: "admin-queue-edit",
        component: AdminQueueForm,
      },
      {
        path: "branch",
        name: "admin-branch",
        component: AdminBranch,
      },
      {
        path: "branch/create",
        name: "admin-branch-create",
        component: AdminBranchForm,
      },
      {
        path: "branch/edit/:id",
        name: "admin-branch-edit",
        component: AdminBranchForm,
      },
      {
        path: "products",
        name: "admin-products",
        component: AdminProducts,
      },
      {
        path: "products/create",
        name: "admin-products-create",
        component: AdminProductForm,
      },
      {
        path: "products/edit/:id",
        name: "admin-products-edit",
        component: AdminProductForm,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isUser = localStorage.getItem("user") !== null;

  // Guest guard (mencegah akses login/register jika sudah login)
  if (to.meta.guestOnly) {
    if (isUser) {
      next("/");
    } else {
      next();
    }
    return;
  }

  next();
});
export default router;
