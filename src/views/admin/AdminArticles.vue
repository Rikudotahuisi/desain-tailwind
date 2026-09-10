<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Kelola Artikel</h2>
        <p class="text-sm text-slate-500">Kelola artikel kesehatan di ASSYIFA Hospital</p>
      </div>
      <button
        @click="goToCreate"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Artikel
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari artikel..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterCategory"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Kategori</option>
          <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Artikel</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Kategori</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Penulis</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Tanggal</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="article in filteredArticles" :key="article.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-200">
                    <img :src="article.image" :alt="article.title" class="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p class="font-medium text-slate-900 line-clamp-1">{{ article.title }}</p>
                    <p class="text-xs text-slate-500 line-clamp-1">{{ article.excerpt }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-600">
                  {{ article.category }}
                </span>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ article.author }}</td>
              <td class="py-3 px-4 text-slate-600">{{ article.date }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="article.published ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'">
                  {{ article.published ? 'Publikasi' : 'Draft' }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="goToEdit(article.id)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteArticleRow(article.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredArticles.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-newspaper"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Belum ada artikel</h3>
        <p class="text-sm text-slate-500">Klik tombol "Tambah Artikel" untuk menambahkan artikel baru</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useArticles } from '../../composables/useArticles'

const router = useRouter()
const { articles, categories, deleteArticle } = useArticles()

// ===== STATE =====
const searchQuery = ref('')
const filterCategory = ref('')

// ===== COMPUTED =====
const filteredArticles = computed(() => {
  let filtered = articles.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.author.toLowerCase().includes(query) ||
      a.category.toLowerCase().includes(query)
    )
  }

  if (filterCategory.value) {
    filtered = filtered.filter(a => a.category === filterCategory.value)
  }

  return filtered
})

// ===== NAVIGASI KE HALAMAN BARU (bukan modal) =====
const goToCreate = () => {
  router.push({ name: 'admin-articles-create' })
}

const goToEdit = (id: number) => {
  router.push({ name: 'admin-articles-edit', params: { id } })
}

// ===== HAPUS ARTIKEL =====
const deleteArticleRow = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    deleteArticle(id)
    alert('🗑️ Artikel berhasil dihapus!')
  }
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
