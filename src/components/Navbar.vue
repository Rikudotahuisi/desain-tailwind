<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <!-- Top Bar -->
    <div class="border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div class="mx-auto flex h-[48px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <!-- Search -->
        <div class="flex h-8 w-[200px] items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-[12px] text-white/50 backdrop-blur-sm transition-all hover:bg-white/10 focus-within:bg-white/10">
          <i class="fas fa-search h-3.5 w-3.5"></i>
          <span>Search</span>
        </div>

        <div class="flex items-center gap-4">
          <div class="hidden items-center gap-2 text-[12px] font-medium text-white/60 sm:flex">
            <i class="fas fa-phone text-teal-300"></i>
            <span>1600-MED</span>
          </div>

          <button class="hidden items-center gap-2 text-[12px] font-medium text-white/60 transition hover:text-white md:flex">
            <i class="fas fa-comment-dots"></i>
            <span>Chatbot</span>
          </button>

          <!-- Language Toggle -->
          <div class="flex items-center rounded-full border border-white/10 bg-white/5 p-0.5">
            <button 
              @click="setLanguage('id')"
              class="rounded-full px-3 py-0.5 text-[10px] font-semibold transition"
              :class="[
                currentLanguage === 'id' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/50 hover:text-white/80'
              ]"
            >
              ID
            </button>
            <button 
              @click="setLanguage('en')"
              class="rounded-full px-3 py-0.5 text-[10px] font-semibold transition"
              :class="[
                currentLanguage === 'en' 
                  ? 'bg-white/20 text-white' 
                  : 'text-white/50 hover:text-white/80'
              ]"
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Nav -->
    <div class="border-b border-white/5 bg-slate-950/10 backdrop-blur-xl">
      <div class="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
        <!-- Logo -->
        <a href="#" class="flex shrink-0 items-center gap-3">
          <div class="flex h-9 w-9 items-center justify-center rounded-[12px] bg-white/10 ring-1 ring-white/15 backdrop-blur-md transition-all hover:bg-white/20">
            <i class="fas fa-plus text-lg font-bold text-white"></i>
          </div>
          <div class="leading-none">
            <div class="text-[14px] font-bold tracking-[0.5px] text-white">MEDICARE</div>
            <div class="mt-0.5 text-[8px] font-medium tracking-[3px] text-white/40">HOSPITAL</div>
          </div>
        </a>

        <!-- Nav Links -->
        <nav class="hidden items-center gap-0.5 lg:flex">
          <a href="#about" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Tentang Kami
          </a>
          <a href="#" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Rumah Sakit
          </a>
          <a href="#doctors" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Jadwal Dokter
          </a>
          <a href="#medical-checkup" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Medical Check Up
          </a>
          <a href="#" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Pelayanan
          </a>
          <a href="#" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Promo
          </a>
          <a href="#articles" class="rounded-full px-4 py-2 text-[13px] font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white">
            Artikel
          </a>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Language state 
const currentLanguage = ref<'id' | 'en'>('id')

// Set language 
const setLanguage = (lang: 'id' | 'en') => {
  currentLanguage.value = lang
  localStorage.setItem('preferred-language', lang)
}

// Load saved language
const loadLanguage = () => {
  const saved = localStorage.getItem('preferred-language') as 'id' | 'en' | null
  if (saved && (saved === 'id' || saved === 'en')) {
    currentLanguage.value = saved
  }
}

onMounted(() => {
  loadLanguage()
})
</script>