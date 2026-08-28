<template>
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-300" :class="[isScrolled || isAuthPage ? 'bg-white shadow-lg' : 'bg-transparent']">
    <!-- Top Bar -->
    <div class="border-b transition-all duration-300" :class="[isScrolled || isAuthPage ? 'border-slate-200/60 bg-white/90 backdrop-blur-md' : 'border-white/10 bg-white/5 backdrop-blur-xl']">
      <div class="mx-auto flex h-[48px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <!-- Search -->
        <div class="flex h-8 w-[200px] items-center gap-2 rounded-full border px-3 text-[12px] transition-all duration-300"
          :class="[
            isScrolled || isAuthPage
              ? 'border-slate-200/80 bg-white/70 text-slate-400 hover:border-slate-300' 
              : 'border-white/10 bg-white/5 text-white/50 hover:bg-white/10'
          ]"
        >
          <i class="fas fa-search h-3.5 w-3.5"></i>
          <span>Search</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden items-center gap-2 text-[12px] font-medium transition-all duration-300 sm:flex"
            :class="[isScrolled || isAuthPage ? 'text-slate-600' : 'text-white/60']"
          >
            <i class="fas fa-phone" :class="[isScrolled || isAuthPage ? 'text-teal-600' : 'text-teal-300']"></i>
            <span>1600-MED</span>
          </div>

          <button 
            @click="openChatbot"
            class="hidden items-center gap-2 text-[12px] font-medium transition-all duration-300 md:flex"
            :class="[isScrolled || isAuthPage ? 'text-slate-600 hover:text-teal-600' : 'text-white/60 hover:text-white']"
          >
            <i class="fas fa-comment-dots"></i>
            <span>Chatbot</span>
          </button>

          <!-- Language Toggle -->
          <div class="flex items-center rounded-full border p-0.5 transition-all duration-300"
            :class="[isScrolled || isAuthPage ? 'border-slate-200 bg-white' : 'border-white/10 bg-white/5']"
          >
            <button 
              @click="setLanguage('id')"
              class="rounded-full px-3 py-0.5 text-[10px] font-semibold transition-all duration-300"
              :class="[
                currentLanguage === 'id' 
                  ? isScrolled || isAuthPage ? 'bg-slate-800 text-white' : 'bg-white/20 text-white'
                  : isScrolled || isAuthPage ? 'text-slate-500 hover:text-slate-800' : 'text-white/50 hover:text-white/80'
              ]"
            >
              ID
            </button>
            <button 
              @click="setLanguage('en')"
              class="rounded-full px-3 py-0.5 text-[10px] font-semibold transition-all duration-300"
              :class="[
                currentLanguage === 'en' 
                  ? isScrolled || isAuthPage ? 'bg-slate-800 text-white' : 'bg-white/20 text-white'
                  : isScrolled || isAuthPage ? 'text-slate-500 hover:text-slate-800' : 'text-white/50 hover:text-white/80'
              ]"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="transition-all duration-300" :class="[isScrolled || isAuthPage ? 'bg-white border-b border-slate-100' : 'border-b border-white/5 bg-slate-950/10 backdrop-blur-xl']">
      <div class="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <!-- Logo -->
        <router-link to="/" class="flex shrink-0 items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-[12px] transition-all duration-300"
            :class="[
              isScrolled || isAuthPage
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20' 
                : 'bg-white/10 ring-1 ring-white/15 backdrop-blur-md hover:bg-white/20'
            ]"
          >
            <i class="fas fa-plus text-lg font-bold"></i>
          </div>
          <div class="leading-none">
            <div class="text-[14px] font-bold tracking-[0.5px] transition-colors duration-300"
              :class="[isScrolled || isAuthPage ? 'text-slate-900' : 'text-white']"
            >
              MEDICARE
            </div>
            <div class="mt-0.5 text-[8px] font-medium tracking-[3px] transition-colors duration-300"
              :class="[isScrolled || isAuthPage ? 'text-slate-400' : 'text-white/40']"
            >
              HOSPITAL
            </div>
          </div>
        </router-link>

        <!-- Nav Links -->
        <nav class="hidden items-center gap-0.5 lg:flex">
          <router-link to="/#about" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            Tentang Kami
          </router-link>
          <router-link to="/#doctors" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            Jadwal Dokter
          </router-link>
          <router-link to="/#medical-checkup" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            Medical Check Up
          </router-link>
          <router-link to="/articles" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-teal-600 bg-teal-50 hover:bg-teal-100' 
                : 'text-white bg-white/10 hover:bg-white/20'
            ]"
          >
            Artikel
          </router-link>
          <router-link to="#" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            Pelayanan
          </router-link>
          <router-link to="#" class="rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200"
            :class="[
              isScrolled || isAuthPage
                ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            ]"
          >
            Promo
          </router-link>
        </nav>

        <div class="flex items-center gap-3">
          <!-- Login & Register -->
          <div class="hidden items-center gap-2 lg:flex">
            <router-link to="/login" class="rounded-full px-4 py-2 text-sm font-medium transition-all duration-200"
              :class="[
                isScrolled || isAuthPage
                  ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900' 
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              ]"
            >
              Login
            </router-link>
            <router-link to="/register" class="rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5"
              :class="[
                isScrolled || isAuthPage
                  ? 'shadow-teal-500/30 hover:bg-teal-600' 
                  : 'shadow-teal-500/20 hover:bg-teal-400'
              ]"
            >
              <i class="fas fa-user-plus mr-2"></i>Daftar
            </router-link>
          </div>
          <button class="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 lg:hidden"
            :class="[
              isScrolled || isAuthPage
                ? 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50' 
                : 'border-white/10 bg-white/5 text-white hover:bg-white/10'
            ]"
          >
            <i class="fas fa-bars h-5 w-5"></i>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentLanguage = ref<'id' | 'en'>('id')
const isScrolled = ref(false)

// Cek apakah halaman auth (login/register)
const isAuthPage = computed(() => {
  return route.path === '/login' || route.path === '/register'
})

const setLanguage = (lang: 'id' | 'en') => {
  currentLanguage.value = lang
  localStorage.setItem('preferred-language', lang)
}

const loadLanguage = () => {
  const saved = localStorage.getItem('preferred-language') as 'id' | 'en' | null
  if (saved && (saved === 'id' || saved === 'en')) {
    currentLanguage.value = saved
  }
}

const openChatbot = () => {
  window.dispatchEvent(new CustomEvent('openChatbot'))
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  loadLanguage()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>