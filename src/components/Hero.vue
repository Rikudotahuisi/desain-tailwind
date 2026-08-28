<template>
  <section class="relative">
    <!-- Carousel Hero -->
    <div class="relative h-screen overflow-hidden">
      <!-- Carousel Container -->
      <div 
        class="flex h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <!-- Slide 1 - Medical Checkup -->
        <div class="relative h-full w-full flex-shrink-0">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="backgroundImage: url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80')"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          </div>
          <div class="relative z-10 flex h-full items-center">
            <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
              <div class="max-w-[700px]">
                <div class="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span class="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="text-xs font-medium tracking-wider text-white/90">
                    <i class="fas fa-heartbeat mr-2"></i>Medical Check Up
                  </span>
                </div>
                <h1 class="text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-7xl lg:text-[80px]">
                  Deteksi Dini<br />untuk Hidup Sehat
                </h1>
                <p class="mt-6 max-w-[540px] text-lg leading-relaxed text-white/70">
                  Lakukan medical check up rutin untuk mendeteksi potensi penyakit sejak dini dan menjaga kualitas hidup Anda lebih baik.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#medical-checkup" class="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    <span class="relative z-10"><i class="fas fa-calendar-check mr-2"></i>Jadwalkan MCU</span>
                    <span class="absolute inset-0 bg-teal-400 transition-transform duration-300 group-hover:scale-100 scale-0"></span>
                  </a>
                  <a href="#" class="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/15 hover:-translate-y-1">
                    <span><i class="fas fa-file-medical mr-2"></i>Paket MCU</span>
                    <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 2 - About Us -->
        <div class="relative h-full w-full flex-shrink-0">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="backgroundImage: url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80')"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          </div>
          <div class="relative z-10 flex h-full items-center">
            <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
              <div class="max-w-[700px]">
                <div class="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span class="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="text-xs font-medium tracking-wider text-white/90">
                    <i class="fas fa-hospital mr-2"></i>Tentang Kami
                  </span>
                </div>
                <h1 class="text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-7xl lg:text-[80px]">
                  Medicare Hospital<br />
                  <span class="text-teal-300">Kesehatan untuk Semua</span>
                </h1>
                <p class="mt-6 max-w-[540px] text-lg leading-relaxed text-white/70">
                  Selamat datang di Medicare Hospital - Fasilitas kesehatan dengan pengalaman tak tertandingi dan komitmen pada persahabatan abadi.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#about" class="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    <span class="relative z-10"><i class="fas fa-info-circle mr-2"></i>Ketahui Lebih</span>
                    <span class="absolute inset-0 bg-teal-400 transition-transform duration-300 group-hover:scale-100 scale-0"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 3 - Doctors -->
        <div class="relative h-full w-full flex-shrink-0">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="backgroundImage: url('https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80')"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          </div>
          <div class="relative z-10 flex h-full items-center">
            <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
              <div class="max-w-[700px]">
                <div class="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span class="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="text-xs font-medium tracking-wider text-white/90">
                    <i class="fas fa-user-md mr-2"></i>Tim Dokter
                  </span>
                </div>
                <h1 class="text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-7xl lg:text-[80px]">
                  Dokter Spesialis<br />
                  <span class="text-teal-300">Berpengalaman & Tersertifikasi</span>
                </h1>
                <p class="mt-6 max-w-[540px] text-lg leading-relaxed text-white/70">
                  Tim dokter kami terdiri dari para ahli di berbagai bidang dengan pengalaman luas dan sertifikasi internasional.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#doctors" class="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    <span class="relative z-10"><i class="fas fa-users mr-2"></i>Lihat Dokter</span>
                    <span class="absolute inset-0 bg-teal-400 transition-transform duration-300 group-hover:scale-100 scale-0"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Slide 4 - Articles -->
        <div class="relative h-full w-full flex-shrink-0">
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style="backgroundImage: url('https://tse2.mm.bing.net/th/id/OIP.K8YpEoMGDQz5hnkUpr1wNwHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3')"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          </div>
          <div class="relative z-10 flex h-full items-center">
            <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
              <div class="max-w-[700px]">
                <div class="mb-6 inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">
                  <span class="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
                  <span class="text-xs font-medium tracking-wider text-white/90">
                    <i class="fas fa-newspaper mr-2"></i>Artikel & Berita
                  </span>
                </div>
                <h1 class="text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-7xl lg:text-[80px]">
                  Informasi Kesehatan<br />
                  <span class="text-teal-300">Terkini & Terpercaya</span>
                </h1>
                <p class="mt-6 max-w-[540px] text-lg leading-relaxed text-white/70">
                  Dapatkan informasi kesehatan terbaru, tips hidup sehat, dan berita dari rumah sakit kami.
                </p>
                <div class="mt-10 flex flex-wrap items-center gap-4">
                  <a href="#articles" class="group relative overflow-hidden rounded-full bg-teal-500 px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-teal-500/30 transition-all hover:-translate-y-1 hover:shadow-2xl">
                    <span class="relative z-10"><i class="fas fa-book-open mr-2"></i>Baca Artikel</span>
                    <span class="absolute inset-0 bg-teal-400 transition-transform duration-300 group-hover:scale-100 scale-0"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Indicators -->
      <div class="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <button
          v-for="(slide, index) in 4"
          :key="index"
          @click="goToSlide(index)"
          class="transition-all duration-300 rounded-full"
          :class="[
            currentSlide === index
              ? 'w-12 bg-teal-400'
              : 'w-3 bg-white/30 hover:bg-white/50',
            'h-3'
          ]"
        ></button>
      </div>

      <!-- Navigation Arrows -->
      <button
        @click="prevSlide"
        class="absolute left-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-md transition-all hover:bg-black/40 lg:left-10"
      >
        <i class="fas fa-chevron-left text-xl"></i>
      </button>

      <button
        @click="nextSlide"
        class="absolute right-6 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-3 text-white backdrop-blur-md transition-all hover:bg-black/40 lg:right-10"
      >
        <i class="fas fa-chevron-right text-xl"></i>
      </button>
    </div>

    <!-- Tab Navigation di bawah Hero -->
    <div class="relative z-30 -mt-16 px-4">
      <div class="mx-auto max-w-[1400px]">
        <div class="grid grid-cols-2 gap-3 md:grid-cols-4">
          <a
            href="#medical-checkup"
            @click.prevent="scrollToSection('medical-checkup')"
            class="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600 transition-colors group-hover:bg-teal-100">
              <i class="fas fa-heartbeat"></i>
            </div>
            <h4 class="font-bold text-slate-900">Medical Checkup</h4>
            <p class="text-sm text-slate-500">Deteksi dini untuk hidup sehat</p>
          </a>

          <a
            href="#about"
            @click.prevent="scrollToSection('about')"
            class="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600 transition-colors group-hover:bg-teal-100">
              <i class="fas fa-hospital"></i>
            </div>
            <h4 class="font-bold text-slate-900">Tentang Kami</h4>
            <p class="text-sm text-slate-500">Kenali Medicare Hospital</p>
          </a>

          <a
            href="#doctors"
            @click.prevent="scrollToSection('doctors')"
            class="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600 transition-colors group-hover:bg-teal-100">
              <i class="fas fa-user-md"></i>
            </div>
            <h4 class="font-bold text-slate-900">Jadwal Dokter</h4>
            <p class="text-sm text-slate-500">Tim dokter spesialis</p>
          </a>

          <a
            href="#articles"
            @click.prevent="scrollToSection('articles')"
            class="group rounded-2xl bg-white p-6 text-center shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
          >
            <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600 transition-colors group-hover:bg-teal-100">
              <i class="fas fa-newspaper"></i>
            </div>
            <h4 class="font-bold text-slate-900">Artikel & Berita</h4>
            <p class="text-sm text-slate-500">Informasi kesehatan terkini</p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const currentSlide = ref(0)
const totalSlides = 4
let intervalId: number | null = null

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoSlide()
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % totalSlides
  resetAutoSlide()
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + totalSlides) % totalSlides
  resetAutoSlide()
}

const resetAutoSlide = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
  startAutoSlide()
}

const startAutoSlide = () => {
  intervalId = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  startAutoSlide()
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
</style>