<template>
  <section class="relative">
    <div v-if="slides.length > 0" class="relative h-screen overflow-hidden">
      <!-- Carousel Container -->
      <div
        class="flex h-full transition-transform duration-700 ease-in-out"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="slide in slides"
          :key="slide.id"
          class="relative h-full w-full flex-shrink-0"
        >
          <div
            class="absolute inset-0 bg-cover bg-center bg-no-repeat"
            :style="{ backgroundImage: `url('${slide.image}')` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-transparent"></div>
          </div>
          <div class="relative z-10 flex h-full items-center">
            <div class="mx-auto w-full max-w-[1400px] px-6 lg:px-16">
              <div class="max-w-[700px]">
                <h1 class="text-6xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-7xl lg:text-[80px]">
                  {{ slide.title }}
                </h1>
                <p v-if="slide.description" class="mt-6 max-w-[540px] text-lg leading-relaxed text-white/70">
                  {{ slide.description }}
                </p>
                <div v-if="slide.buttons.length" class="mt-10 flex flex-wrap items-center gap-4">
                  
                  <a
                    v-for="(btn, i) in slide.buttons"
                    :key="i"
                    :href="btn.link"
                    class="group relative overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white transition-all hover:-translate-y-1"
                    :class="i === 0
                      ? 'bg-teal-500 shadow-xl shadow-teal-500/30 hover:shadow-2xl'
                      : 'border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/15'"
                  >
                    <span class="relative z-10">{{ btn.text }}</span>
                    <span v-if="i === 0" class="absolute inset-0 scale-0 bg-teal-400 transition-transform duration-300 group-hover:scale-100"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Carousel Indicators -->
      <div v-if="slides.length > 1" class="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          @click="goToSlide(index)"
          class="h-3 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'w-12 bg-teal-400' : 'w-3 bg-white/30 hover:bg-white/50'"
        ></button>
      </div>

      <!-- Navigation Arrows -->
      <template v-if="slides.length > 1">
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
      </template>
    </div>

    <!-- Fallback kalau belum ada slide aktif -->
    <div v-else class="flex h-[60vh] items-center justify-center bg-slate-900">
      <p class="text-white/60">Belum ada slide aktif</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useSlideshow } from '../composables/useSlideshow'

const { getActiveSlides } = useSlideshow()
const slides = computed(() => getActiveSlides())

const currentSlide = ref(0)
let intervalId: number | null = null

// Jaga-jaga kalau slide aktif berkurang dan currentSlide jadi out of range
watch(slides, (newSlides) => {
  if (currentSlide.value >= newSlides.length) {
    currentSlide.value = 0
  }
})

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetAutoSlide()
}

const nextSlide = () => {
  if (slides.value.length === 0) return
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
  resetAutoSlide()
}

const prevSlide = () => {
  if (slides.value.length === 0) return
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
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
  if (slides.value.length <= 1) return
  intervalId = window.setInterval(() => {
    nextSlide()
  }, 5000)
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