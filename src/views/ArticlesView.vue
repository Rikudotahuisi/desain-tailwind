<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 120px;">
    <!-- <div class="h-20" bg-white flex style="padding-top: 120px;"></div> -->
    
    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-6">
      <!-- Filter & Search Bar -->
      <div class="flex flex-wrap items-center justify-between gap-3">
        <!-- Filter Categories -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            v-for="category in categories"
            :key="category"
            @click="selectedCategory = category"
            class="rounded-full px-3 py-1 text-[11px] font-medium transition-all duration-200 md:px-4 md:py-1.5 md:text-xs"
            :class="[
              selectedCategory === category
                ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/30'
                : 'bg-white text-slate-600 hover:bg-teal-50 hover:text-teal-600'
            ]"
          >
            {{ category }}
          </button>
        </div>

        <!-- Search -->
        <div class="relative w-full sm:w-56 md:w-64">
          <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[11px]"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari artikel..."
            class="w-full rounded-full border border-slate-200 bg-white px-4 py-1.5 pl-8 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition-all focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:shadow-md md:py-2"
          />
          <button
            v-if="searchQuery"
            @click="searchQuery = ''"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
          >
            <i class="fas fa-times-circle text-[11px]"></i>
          </button>
        </div>
      </div>

      <!-- Featured Article -->
      <div v-if="featuredArticle" class="mt-6 rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div class="grid grid-cols-1 lg:grid-cols-2">
          <div class="relative h-56 lg:h-auto overflow-hidden">
            <img
              :src="featuredArticle.image"
              :alt="featuredArticle.title"
              class="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <span class="absolute top-3 left-3 rounded-full bg-teal-500 px-2.5 py-0.5 text-[10px] font-semibold text-white shadow-lg md:top-4 md:left-4 md:px-3 md:py-1 md:text-xs">
              <i class="fas fa-star mr-1 text-yellow-300"></i>Featured
            </span>
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 md:p-4">
              <span class="text-[10px] text-white/80 md:text-xs">
                <i class="far fa-eye mr-1"></i>2.5K views
              </span>
            </div>
          </div>
          <div class="flex flex-col justify-center p-5 md:p-6 lg:p-8">
            <div class="flex flex-wrap items-center gap-1.5 text-xs">
              <span class="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-medium text-teal-600 md:px-3 md:py-1">
                {{ featuredArticle.category }}
              </span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-500"><i class="far fa-clock mr-1"></i>{{ featuredArticle.readTime }}</span>
              <span class="text-slate-400">•</span>
              <span class="text-slate-500"><i class="far fa-calendar-alt mr-1"></i>{{ featuredArticle.date }}</span>
            </div>
            <h3 class="mt-2 text-lg font-bold text-slate-900 md:text-xl lg:text-2xl">{{ featuredArticle.title }}</h3>
            <p class="mt-1 text-sm text-slate-600 leading-relaxed md:mt-2">{{ featuredArticle.excerpt }}</p>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-2 md:mt-4">
              <span class="text-xs text-slate-500 md:text-sm">
                <i class="far fa-user mr-1"></i>{{ featuredArticle.author }}
              </span>
              <a href="#" class="inline-flex items-center gap-1.5 rounded-full bg-teal-500 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg md:px-5 md:py-2 md:text-sm">
                Baca Selengkapnya
                <i class="fas fa-arrow-right text-[10px] md:text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Articles Grid -->
      <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        <div
          v-for="article in filteredArticles"
          :key="article.id"
          class="group rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
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
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <a
                href="#"
                class="inline-flex items-center gap-1 text-xs font-semibold text-teal-600 transition hover:text-teal-700 md:text-sm"
              >
                Baca
                <i class="fas fa-arrow-right text-[9px] md:text-xs"></i>
              </a>
              <div class="flex items-center gap-1.5 text-[10px] text-slate-400 md:gap-2 md:text-xs">
                <button class="hover:text-red-500 transition">
                  <i class="far fa-heart"></i>
                </button>
                <button class="hover:text-teal-500 transition">
                  <i class="far fa-bookmark"></i>
                </button>
                <button class="hover:text-blue-500 transition">
                  <i class="far fa-share-alt"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
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

// ===== ARTICLES DATA =====
const articles = [
  {
    id: 1,
    title: '7 Tips Menjaga Kesehatan Jantung di Usia Muda',
    excerpt: 'Pola hidup sehat sangat penting untuk mencegah penyakit jantung koroner. Simak 7 tips yang bisa Anda terapkan mulai sekarang.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.izyBjaj9XVwm_JSKlPiKPgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Kardiologi',
    author: 'dr. Andi Pratama, Sp.JP',
    date: '28 Agustus 2026',
    readTime: '5 menit'
  },
  {
    id: 2,
    title: 'Pentingnya Medical Check Up Tahunan untuk Deteksi Dini',
    excerpt: 'Deteksi dini penyakit melalui pemeriksaan kesehatan rutin setiap tahun dapat menyelamatkan nyawa. Kenali manfaatnya di sini.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'Pencegahan',
    author: 'dr. Budi Santoso, Sp.PD',
    date: '27 Agustus 2026',
    readTime: '4 menit'
  },
  {
    id: 3,
    title: 'Nutrisi Tepat untuk Ibu Hamil dan Janin',
    excerpt: 'Panduan lengkap makanan sehat untuk mendukung kehamilan dan perkembangan janin yang optimal.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Kandungan',
    author: 'dr. Siti Rahayu, Sp.OG',
    date: '26 Agustus 2026',
    readTime: '6 menit'
  },
  {
    id: 4,
    title: 'Olahraga yang Aman untuk Penderita Diabetes',
    excerpt: 'Penderita diabetes tetap bisa berolahraga dengan aman. Simak jenis olahraga yang direkomendasikan dan tipsnya.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    category: 'Olahraga',
    author: 'dr. Rina Wati, Sp.GK',
    date: '25 Agustus 2026',
    readTime: '5 menit'
  },
  {
    id: 5,
    title: 'Menjaga Kesehatan Mental di Tengah Kesibukan',
    excerpt: 'Kesehatan mental sama pentingnya dengan kesehatan fisik. Temukan cara menjaga keseimbangan mental di era modern.',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
    category: 'Mental Health',
    author: 'dr. Maya Sari, Sp.KJ',
    date: '24 Agustus 2026',
    readTime: '7 menit'
  },
  {
    id: 6,
    title: 'Makanan Super untuk Meningkatkan Imunitas Tubuh',
    excerpt: 'Kenali berbagai makanan super yang dapat membantu meningkatkan sistem kekebalan tubuh secara alami.',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=80',
    category: 'Gizi',
    author: 'dr. Dedi Kurniawan, Sp.GK',
    date: '23 Agustus 2026',
    readTime: '4 menit'
  },
  {
    id: 7,
    title: 'Vaksinasi pada Anak: Jadwal dan Manfaatnya',
    excerpt: 'Vaksinasi adalah langkah penting untuk melindungi anak dari berbagai penyakit berbahaya. Simak jadwal lengkapnya.',
    image: 'https://th.bing.com/th/id/OIP.JRU9ia_7geq_8xLJHLCdSwHaEK?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Anak',
    author: 'dr. Maya Sari, Sp.A',
    date: '22 Agustus 2026',
    readTime: '5 menit'
  },
  {
    id: 8,
    title: 'Stres dan Pengaruhnya terhadap Kesehatan Jantung',
    excerpt: 'Stres kronis dapat meningkatkan risiko penyakit jantung. Pelajari cara mengelola stres untuk jantung yang lebih sehat.',
    image: 'https://images.unsplash.com/photo-1541199249251-f713e6145474?w=800&q=80',
    category: 'Kardiologi',
    author: 'dr. Andi Pratama, Sp.JP',
    date: '21 Agustus 2026',
    readTime: '6 menit'
  },
  {
    id: 9,
    title: 'Panduan Diet Sehat untuk Penderita Kolesterol Tinggi',
    excerpt: 'Kontrol kolesterol dengan pola makan yang tepat. Simak panduan diet dan makanan yang harus dihindari.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    category: 'Gizi',
    author: 'dr. Rina Wati, Sp.GK',
    date: '20 Agustus 2026',
    readTime: '5 menit'
  }
]

// ===== COMPUTED =====
const featuredArticle = computed(() => {
  return articles.find(a => a.id === 1)
})

const filteredArticles = computed(() => {
  let filtered = articles

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

  return filtered.filter(a => a.id !== 1)
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
</style>