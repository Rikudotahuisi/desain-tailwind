<template>
  <section id="articles" class="scroll-mt-20 py-20 bg-white">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <div class="mb-12 flex flex-wrap items-end justify-between">
        <div>
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-newspaper mr-2"></i>Artikel & Berita
          </span>
          <h2 class="mt-2 text-4xl font-bold text-slate-900 lg:text-5xl">
            Informasi <span class="text-teal-600">Kesehatan</span>
          </h2>
        </div>
        <router-link to="/articles" class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5">
          <i class="fas fa-newspaper mr-2"></i>
          Semua Artikel
        </router-link>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <router-link
          v-for="article in latestArticles"
          :key="article.id"
          :to="{ name: 'article-detail', params: { id: article.id } }"
          class="group block rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1"
        >
          <div class="relative h-48 overflow-hidden bg-teal-100">
            <img
              :src="article.image"
              :alt="article.title"
              class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span class="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
              <i class="fas fa-calendar-alt mr-1"></i>{{ article.date }}
            </span>
          </div>
          <div class="p-6">
            <span class="text-xs font-medium text-teal-600">{{ article.category }}</span>
            <h3 class="mt-1 text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-2">
              {{ article.title }}
            </h3>
            <p class="mt-2 text-sm text-slate-600 line-clamp-2">
              {{ article.excerpt }}
            </p>
            <span class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition group-hover:text-teal-700">
              Baca Selengkapnya
              <i class="fas fa-arrow-right"></i>
            </span>
          </div>
        </router-link>
      </div>

      <!-- Empty State -->
      <div v-if="latestArticles.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-3 text-slate-300">
          <i class="fas fa-newspaper"></i>
        </div>
        <p class="text-sm text-slate-500">Belum ada artikel yang dipublikasikan.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useArticles } from '../composables/useArticles'

const { articles } = useArticles()

// Ambil 3 artikel terbaru yang sudah dipublikasikan dari data yang sama
// dengan halaman admin (src/composables/useArticles.ts)
const latestArticles = computed(() =>
  articles.value.filter(a => a.published).slice(0, 3)
)
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>