<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px;">
    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 -mt-6">
      <!-- Filter & Search Bar -->
      <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-200"
            :class="[
              selectedCategory === category
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-600'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <div class="relative w-full sm:w-64">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari artikel..."
            class="w-full rounded-full border border-slate-200 bg-white px-4 py-2 pl-9 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:shadow-md"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          >
            <i class="fas fa-times-circle text-xs"></i>
          </button>
        </div>
      </div>

      <!-- Featured Article -->
      <div v-if="featuredArticle" class="mt-6 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative h-64 lg:h-auto overflow-hidden">
            <img
              :src="featuredArticle.image"
              :alt="featuredArticle.title"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <span class="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
              <i class="fas fa-star mr-1 text-yellow-300"></i>Featured
            </span>
          </div>
          <div class="flex flex-col justify-center p-6 lg:p-8">
            <div class="flex flex-wrap items-center gap-2 text-sm">
              <span class="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-600">
                {{ featuredArticle.category }}
              </span>
              <span class="text-slate-400 text-xs">•</span>
              <span class="text-xs text-slate-500"><i class="far fa-clock mr-1"></i>{{ featuredArticle.readTime }}</span>
              <span class="text-slate-400 text-xs">•</span>
              <span class="text-xs text-slate-500"><i class="far fa-calendar-alt mr-1"></i>{{ featuredArticle.date }}</span>
            </div>
            <h3 class="mt-3 text-2xl font-bold text-slate-900 lg:text-3xl">{{ featuredArticle.title }}</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">{{ featuredArticle.excerpt }}</p>
            <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span class="text-sm text-slate-500">
                <i class="far fa-user mr-1"></i>{{ featuredArticle.author }}
              </span>
              <router-link
                :to="{ name: 'article-detail', params: { id: featuredArticle.id } }"
                class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
              >
                Baca Selengkapnya
                <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <router-link
          v-for="article in filteredArticles"
          :key="article.id"
          :to="{ name: 'article-detail', params: { id: article.id } }"
          class="group block rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
        >
          <div class="relative h-44 overflow-hidden bg-slate-200 md:h-48">
            <img
              :src="article.image"
              :alt="article.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span class="absolute top-2 left-2 rounded-full bg-teal-500 px-2 py-0.5 text-[9px] font-semibold text-white shadow-md md:top-3 md:left-3 md:px-2.5 md:py-0.5 md:text-[10px]">
              {{ article.category }}
            </span>
            <span class="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[9px] text-white backdrop-blur-sm md:bottom-3 md:right-3 md:px-2.5 md:py-0.5 md:text-[10px]">
              <i class="far fa-clock mr-1"></i>{{ article.readTime }}
            </span>
          </div>
          <div class="p-4 md:p-5">
            <div class="flex items-center gap-1.5 text-[10px] text-slate-500 md:text-xs">
              <span><i class="far fa-calendar-alt mr-1"></i>{{ article.date }}</span>
              <span class="h-1 w-1 rounded-full bg-slate-300"></span>
              <span><i class="far fa-user mr-1"></i>{{ article.author.split(' ').slice(0, 2).join(' ') }}</span>
            </div>
            <h3 class="mt-1.5 text-sm font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2 md:text-base">
              {{ article.title }}
            </h3>
            <p class="mt-1 text-xs text-slate-600 line-clamp-2 md:text-sm">{{ article.excerpt }}</p>
            <div class="mt-2 flex items-center justify-between border-t border-slate-100 pt-2 md:mt-3 md:pt-3">
              <span class="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 transition hover:text-teal-700 md:text-sm">
                Baca Selengkapnya
                <i class="fas fa-arrow-right text-[9px] md:text-xs"></i>
              </span>
              <div class="flex items-center gap-1.5 text-[10px] text-slate-400 md:gap-2 md:text-xs">
                <button @click.stop.prevent class="hover:text-red-500 transition">
                  <i class="far fa-heart"></i>
                </button>
                <button @click.stop.prevent class="hover:text-teal-500 transition">
                  <i class="far fa-bookmark"></i>
                </button>
                <button @click.stop.prevent class="hover:text-blue-500 transition">
                  <i class="far fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>

      <!-- No Results -->
      <div v-if="filteredArticles.length === 0" class="py-12 text-center md:py-16">
        <div class="text-5xl mb-3 md:text-6xl md:mb-4">
          <i class="fas fa-search text-slate-300"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900 md:text-xl">Artikel tidak ditemukan</h3>
        <p class="text-sm text-slate-500">Coba dengan kategori atau kata kunci lain</p>
        <button @click="resetFilters" class="mt-3 rounded-full bg-teal-500 px-5 py-1.5 text-sm font-semibold text-white transition hover:bg-teal-600 md:mt-4 md:px-6 md:py-2">
          Reset Filter
        </button>
      </div>

      <!-- Pagination -->
      <div class="mt-8 flex items-center justify-center gap-1.5 pb-10 md:mt-12 md:gap-2 md:pb-12">
        <button class="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5 md:px-3 md:py-1.5 md:text-sm">
          <i class="fas fa-chevron-left text-[10px] md:text-xs"></i>
        </button>
        <button class="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-teal-500/20 md:px-3.5 md:py-1.5 md:text-sm">1</button>
        <button class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5 md:px-3.5 md:py-1.5 md:text-sm">2</button>
        <button class="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5 md:px-3.5 md:py-1.5 md:text-sm">3</button>
        <button class="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5 md:px-3 md:py-1.5 md:text-sm">
          <i class="fas fa-chevron-right text-[10px] md:text-xs"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useArticles } from '../composables/useArticles'

const { articles } = useArticles()

// ===== STATE =====
const selectedCategory = ref('Semua')
const searchQuery = ref('')

// ===== CATEGORIES =====
const categories = [
  'Semua',
  'Kardiologi',
  'Kandungan',
  'Anak',
  'Pencegahan',
  'Gizi',
  'Olahraga',
  'Mental Health'
]

// Hanya tampilkan artikel yang sudah dipublikasikan dari admin
const publishedArticles = computed(() => articles.value.filter(a => a.published))

// ===== COMPUTED =====
const featuredArticle = computed(() => {
  return publishedArticles.value[0]
})

const filteredArticles = computed(() => {
  let filtered = publishedArticles.value

  if (selectedCategory.value !== 'Semua') {
    filtered = filtered.filter(a => a.category === selectedCategory.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.excerpt.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query) ||
      a.author.toLowerCase().includes(query)
    )
  }

  return filtered.filter(a => a.id !== featuredArticle.value?.id)
})

const resetFilters = () => {
  selectedCategory.value = 'Semua'
  searchQuery.value = ''
}
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
