<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px;">
    <div class="mx-auto max-w-[1000px] px-6 lg:px-16 -mt-6">
      <!-- Tombol Kembali -->
      <button
        @click="goBack"
        class="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition mb-4"
      >
        <i class="fas fa-arrow-left"></i>
        Kembali ke Daftar Artikel
      </button>

      <!-- Not found state -->
      <div v-if="!article" class="bg-white rounded-3xl shadow-lg p-12 text-center mb-10">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-circle-exclamation"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Artikel tidak ditemukan</h3>
        <p class="text-sm text-slate-500 mb-6">Artikel yang Anda cari tidak tersedia atau sudah tidak dipublikasikan.</p>
        <router-link
          :to="{ name: 'articles' }"
          class="inline-block rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
        >
          Kembali ke Daftar Artikel
        </router-link>
      </div>

      <!-- ===== DETAIL ARTIKEL ===== -->
      <article v-else class="bg-white rounded-3xl shadow-lg overflow-hidden mb-10">
        <!-- Featured Image -->
        <div class="relative h-72 md:h-96 overflow-hidden">
          <img
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
                {{ article.category }}
              </span>
              <span class="text-sm text-white/80">
                <i class="far fa-clock mr-1"></i>{{ article.readTime }}
              </span>
              <span class="text-sm text-white/80">
                <i class="far fa-calendar-alt mr-1"></i>{{ article.date }}
              </span>
            </div>
          </div>
        </div>

        <!-- Article Body -->
        <div class="p-6 md:p-8">
          <!-- Author -->
          <div class="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
            <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg">
              {{ article.author.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-slate-900">{{ article.author }}</p>
              <p class="text-sm text-slate-500">Diterbitkan pada {{ article.date }}</p>
            </div>
          </div>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {{ article.title }}
          </h1>

          <!-- Content (ditulis via WYSIWYG editor di admin) -->
          <div class="prose prose-slate max-w-none" v-html="article.content"></div>

          <!-- Tips Box -->
          <div class="bg-teal-50 rounded-2xl p-6 mt-8 border border-teal-100">
            <h4 class="font-bold text-slate-900 flex items-center gap-2">
              <i class="fas fa-lightbulb text-teal-500"></i>
              Tips Kesehatan
            </h4>
            <ul class="mt-3 space-y-2 text-slate-700">
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle mt-1 text-teal-500"></i>
                <span>Konsultasikan selalu dengan dokter sebelum menerapkan tips kesehatan</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle mt-1 text-teal-500"></i>
                <span>Lakukan pemeriksaan kesehatan secara rutin</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle mt-1 text-teal-500"></i>
                <span>Jaga pola makan dan olahraga teratur</span>
              </li>
            </ul>
          </div>

          <!-- Share & Actions -->
          <div class="mt-8 pt-6 border-t border-slate-100">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-sm text-slate-500">Bagikan:</span>
                <button class="w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition flex items-center justify-center">
                  <i class="fab fa-facebook-f text-sm"></i>
                </button>
                <button class="w-9 h-9 rounded-full bg-sky-500 text-white hover:bg-sky-600 transition flex items-center justify-center">
                  <i class="fab fa-twitter text-sm"></i>
                </button>
                <button class="w-9 h-9 rounded-full bg-green-600 text-white hover:bg-green-700 transition flex items-center justify-center">
                  <i class="fab fa-whatsapp text-sm"></i>
                </button>
                <button class="w-9 h-9 rounded-full bg-slate-600 text-white hover:bg-slate-700 transition flex items-center justify-center">
                  <i class="fas fa-link text-sm"></i>
                </button>
              </div>
              <div class="flex items-center gap-3">
                <button class="flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition">
                  <i class="far fa-heart"></i>
                  <span>Suka</span>
                </button>
                <button class="flex items-center gap-2 text-sm text-slate-500 hover:text-teal-500 transition">
                  <i class="far fa-bookmark"></i>
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Related Articles -->
          <div v-if="relatedArticles.length > 0" class="mt-12 pt-8 border-t border-slate-100">
            <h3 class="text-xl font-bold text-slate-900 mb-6">Artikel Terkait</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <router-link
                v-for="related in relatedArticles"
                :key="related.id"
                :to="{ name: 'article-detail', params: { id: related.id } }"
                class="group block p-4 rounded-xl border border-slate-200 hover:border-teal-200 hover:shadow-md transition cursor-pointer"
              >
                <div class="flex items-center gap-4">
                  <div class="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img :src="related.image" :alt="related.title" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-slate-900 group-hover:text-teal-600 transition line-clamp-2">
                      {{ related.title }}
                    </h4>
                    <p class="text-xs text-slate-500 mt-1">{{ related.date }}</p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArticles } from '../composables/useArticles'

const route = useRoute()
const router = useRouter()
const { articles, getArticleById } = useArticles()

const articleId = computed(() => Number(route.params.id))

// Hanya artikel yang published yang boleh diakses publik
const article = computed(() => {
  const found = getArticleById(articleId.value)
  return found && found.published ? found : null
})

const relatedArticles = computed(() => {
  if (!article.value) return []
  return articles.value
    .filter(a => a.published && a.id !== article.value!.id && a.category === article.value!.category)
    .slice(0, 2)
})

const goBack = () => {
  router.push({ name: 'articles' })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
