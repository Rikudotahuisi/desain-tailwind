<template>
  <div class="min-h-screen bg-slate-50 pt-[170px] pb-16">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">

      <!-- ========================================== -->
      <!-- HEADER: BREADCRUMB + TOMBOL KEMBALI -->
      <!-- ========================================== -->
      <header v-if="article" class="mb-6">
        <!-- Breadcrumb: Beranda > Artikel > Kategori > Judul -->
        <nav aria-label="Breadcrumb" class="mb-4">
          <ol class="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <!-- Beranda -->
            <li>
              <router-link to="/" class="transition-colors hover:text-teal-600">
                Beranda
              </router-link>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Artikel -->
            <li>
              <router-link to="/articles" class="transition-colors hover:text-teal-600">
                Artikel
              </router-link>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Kategori -->
            <li>
              <span class="font-medium text-teal-600">{{ article.category }}</span>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Judul Artikel -->
            <li class="min-w-0 flex-1">
              <span class="block truncate font-semibold text-slate-900">
                {{ article.title }}
              </span>
            </li>
          </ol>
        </nav>

        <!-- Tombol Kembali -->
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 text-sm font-medium text-teal-600 transition hover:text-teal-700"
        >
          <i class="fas fa-arrow-left"></i>
          Kembali ke Daftar Artikel
        </button>
      </header>

      <!-- ========================================== -->
      <!-- NOT FOUND STATE -->
      <!-- ========================================== -->
      <div v-if="!article" class="mb-10 rounded-3xl bg-white p-12 text-center shadow-lg">
        <div class="mb-4 text-5xl text-slate-300">
          <i class="fas fa-circle-exclamation"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Artikel tidak ditemukan</h3>
        <p class="mb-6 text-sm text-slate-500">
          Artikel yang Anda cari tidak tersedia atau sudah tidak dipublikasikan.
        </p>
        <router-link
          :to="{ name: 'articles' }"
          class="inline-block rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
        >
          Kembali ke Daftar Artikel
        </router-link>
      </div>

      <!-- ========================================== -->
      <!-- DETAIL ARTIKEL -->
      <!-- ========================================== -->
      <article v-else class="mb-10 overflow-hidden rounded-3xl bg-white shadow-lg">

        <!-- Featured Image -->
        <div class="relative h-72 overflow-hidden md:h-96">
          <img
            :src="article.image"
            :alt="article.title"
            class="h-full w-full object-cover"
          />
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
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
          <div class="mb-6 flex items-center gap-3 border-b border-slate-100 pb-6">
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-lg font-bold text-teal-600">
              {{ article.author.charAt(0) }}
            </div>
            <div>
              <p class="font-semibold text-slate-900">{{ article.author }}</p>
              <p class="text-sm text-slate-500">Diterbitkan pada {{ article.date }}</p>
            </div>
          </div>

          <!-- Title -->
          <h1 class="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            {{ article.title }}
          </h1>

          <!-- Content (WYSIWYG) -->
          <div class="prose prose-slate max-w-none" v-html="article.content"></div>

          <!-- Tips Box -->
          <div class="mt-8 rounded-2xl border border-teal-100 bg-teal-50 p-6">
            <h4 class="flex items-center gap-2 font-bold text-slate-900">
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
          <div class="mt-8 border-t border-slate-100 pt-6">
            <div class="flex flex-wrap items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <span class="text-sm text-slate-500">Bagikan:</span>
                <button class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500 text-white transition hover:bg-blue-600">
                  <i class="fab fa-facebook-f text-sm"></i>
                </button>
                <button class="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-600">
                  <i class="fab fa-twitter text-sm"></i>
                </button>
                <button class="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white transition hover:bg-green-700">
                  <i class="fab fa-whatsapp text-sm"></i>
                </button>
                <button class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-600 text-white transition hover:bg-slate-700">
                  <i class="fas fa-link text-sm"></i>
                </button>
              </div>
              <div class="flex items-center gap-3">
                <button class="flex items-center gap-2 text-sm text-slate-500 transition hover:text-red-500">
                  <i class="far fa-heart"></i>
                  <span>Suka</span>
                </button>
                <button class="flex items-center gap-2 text-sm text-slate-500 transition hover:text-teal-500">
                  <i class="far fa-bookmark"></i>
                  <span>Simpan</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Related Articles -->
          <div v-if="relatedArticles.length > 0" class="mt-12 border-t border-slate-100 pt-8">
            <h3 class="mb-6 text-xl font-bold text-slate-900">Artikel Terkait</h3>
            <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <router-link
                v-for="related in relatedArticles"
                :key="related.id"
                :to="{ name: 'article-detail', params: { id: related.id } }"
                class="group block cursor-pointer rounded-xl border border-slate-200 p-4 transition hover:border-teal-200 hover:shadow-md"
              >
                <div class="flex items-center gap-4">
                  <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    <img :src="related.image" :alt="related.title" class="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h4 class="line-clamp-2 text-sm font-semibold text-slate-900 transition group-hover:text-teal-600">
                      {{ related.title }}
                    </h4>
                    <p class="mt-1 text-xs text-slate-500">{{ related.date }}</p>
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
    .filter(
      (a) =>
        a.published &&
        a.id !== article.value!.id &&
        a.category === article.value!.category
    )
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