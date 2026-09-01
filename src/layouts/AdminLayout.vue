<template>
  <div class="min-h-screen bg-slate-50 flex">
    <!-- Sidebar -->
    <aside class="fixed left-0 top-0 z-40 h-screen w-64 bg-white border-r border-slate-200 shadow-lg transition-transform -translate-x-full lg:translate-x-0">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-6 py-5 border-b border-slate-200">
        <div class="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
          <i class="fas fa-plus text-lg font-bold"></i>
        </div>
        <div>
          <div class="text-sm font-bold text-slate-900">Assyiffa</div>
          <div class="text-[8px] font-medium tracking-[3px] text-slate-400">HOSPITAL</div>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="p-4 space-y-1">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
          :class="[
            $route.path === item.path
              ? 'bg-teal-50 text-teal-600'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          ]"
        >
          <i :class="item.icon" class="w-5 text-center"></i>
          {{ item.label }}
        </router-link>
      </nav>

      <!-- Bottom -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
        <button 
          @click="logout"
          class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <i class="fas fa-sign-out-alt w-5 text-center"></i>
          Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 lg:ml-64">
      <!-- Top Bar -->
      <header class="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <button @click="toggleSidebar" class="lg:hidden text-slate-600 hover:text-slate-900">
              <i class="fas fa-bars text-xl"></i>
            </button>
            <h1 class="text-xl font-bold text-slate-900">{{ pageTitle }}</h1>
          </div>
          <div class="flex items-center gap-4">
            <button class="relative text-slate-400 hover:text-slate-600 transition">
              <i class="fas fa-bell text-lg"></i>
              <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-[8px] text-white flex items-center justify-center">3</span>
            </button>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              <span class="text-sm font-medium text-slate-700 hidden sm:block">Admin</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <router-view />
      </main>
    </div>

    <!-- Mobile Sidebar Overlay -->
    <div 
      v-if="sidebarOpen"
      @click="toggleSidebar"
      class="fixed inset-0 z-30 bg-black/50 lg:hidden"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const sidebarOpen = ref(false)

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: 'fas fa-th-large' },
  { path: '/admin/patients', label: 'Pasien', icon: 'fas fa-users' },
  { path: '/admin/doctors', label: 'Dokter', icon: 'fas fa-user-md' },
  { path: '/admin/appointments', label: 'Jadwal', icon: 'fas fa-calendar-check' },
  { path: '/', label: 'Kembali ke Home', icon: 'fas fa-home' },
]

const pageTitle = computed(() => {
  const found = menuItems.find(item => item.path === route.path)
  return found ? found.label : 'Dashboard'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const logout = () => {
  if (confirm('Apakah Anda yakin ingin logout?')) {
    localStorage.removeItem('isAdmin')
    localStorage.removeItem('user')
    router.push('/login')
  }
}
</script>