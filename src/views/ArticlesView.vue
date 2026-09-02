<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px;">
    <!-- <div class="h-20" bg-white flex style="padding-top: 120px;"></div> -->
    
    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 -mt-6">
      <!-- Condition: Menampilkan Detail atau Daftar -->
      <div v-if="selectedArticle" class="mt-6">
        <!-- Tombol Kembali -->
        <button 
          @click="selectedArticle = null" 
          class="inline-flex items-center gap-2 text-sm font-medium text-teal-600 hover:text-teal-700 transition mb-4"
        >
          <i class="fas fa-arrow-left"></i>
          Kembali ke Daftar Artikel
        </button>

        <!-- ===== DETAIL ARTIKEL ===== -->
        <article class="bg-white rounded-3xl shadow-lg overflow-hidden">
          <!-- Featured Image -->
          <div class="relative h-72 md:h-96 overflow-hidden">
            <img 
              :src="selectedArticle.image" 
              :alt="selectedArticle.title" 
              class="w-full h-full object-cover"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <div class="flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
                  {{ selectedArticle.category }}
                </span>
                <span class="text-sm text-white/80">
                  <i class="far fa-clock mr-1"></i>{{ selectedArticle.readTime }}
                </span>
                <span class="text-sm text-white/80">
                  <i class="far fa-calendar-alt mr-1"></i>{{ selectedArticle.date }}
                </span>
              </div>
            </div>
          </div>

          <!-- Article Body -->
          <div class="p-6 md:p-8">
            <!-- Author -->
            <div class="flex items-center gap-3 mb-6 pb-6 border-b border-slate-100">
              <div class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-bold text-lg">
                {{ selectedArticle.author.charAt(0) }}
              </div>
              <div>
                <p class="font-semibold text-slate-900">{{ selectedArticle.author }}</p>
                <p class="text-sm text-slate-500">Diterbitkan pada {{ selectedArticle.date }}</p>
              </div>
            </div>

            <!-- Title -->
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              {{ selectedArticle.title }}
            </h1>

            <!-- Content -->
            <div class="prose prose-slate max-w-none">
              <p class="text-lg text-slate-700 leading-relaxed">
                {{ selectedArticle.fullContent || selectedArticle.excerpt }}
              </p>

              <h2 class="text-2xl font-bold text-slate-900 mt-8">Apa yang Perlu Anda Ketahui?</h2>
              <p class="text-slate-700 leading-relaxed">
                {{ selectedArticle.detailContent || 'Informasi lengkap mengenai artikel ini akan segera kami update. Untuk informasi lebih lanjut, silakan hubungi tim kami.' }}
              </p>

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
                <div 
                  v-for="related in relatedArticles" 
                  :key="related.id"
                  @click="selectedArticle = related"
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
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>

      <!-- ===== DAFTAR ARTIKEL ===== -->
      <div v-else>
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
                <button 
                  @click="selectedArticle = featuredArticle"
                  class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Baca Selengkapnya
                  <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <div
            v-for="article in filteredArticles"
            :key="article.id"
            class="group rounded-2xl overflow-hidden bg-white border border-slate-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            @click="selectedArticle = article"
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
                  <button @click.stop class="hover:text-red-500 transition">
                    <i class="far fa-heart"></i>
                  </button>
                  <button @click.stop class="hover:text-teal-500 transition">
                    <i class="far fa-bookmark"></i>
                  </button>
                  <button @click.stop class="hover:text-blue-500 transition">
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ===== STATE =====
const selectedCategory = ref('Semua')
const searchQuery = ref('')
const selectedArticle = ref<any>(null)

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
    fullContent: 'Penyakit jantung merupakan salah satu penyebab kematian tertinggi di Indonesia. Namun, banyak orang tidak menyadari bahwa penyakit ini sebenarnya dapat dicegah dengan menerapkan pola hidup sehat sejak dini.',
    detailContent: '1. Konsumsi makanan sehat dengan gizi seimbang\n2. Rutin berolahraga minimal 30 menit setiap hari\n3. Hindari merokok dan konsumsi alkohol\n4. Kelola stres dengan baik\n5. Periksa tekanan darah secara rutin\n6. Jaga berat badan ideal\n7. Tidur yang cukup 7-8 jam per hari',
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
    fullContent: 'Medical check up tahunan adalah investasi kesehatan yang sangat penting. Banyak penyakit serius seperti kanker, diabetes, dan penyakit jantung dapat dideteksi lebih awal melalui pemeriksaan rutin.',
    detailContent: 'Manfaat medical check up tahunan:\n- Mendeteksi penyakit sejak dini\n- Memantau kondisi kesehatan secara berkala\n- Mencegah komplikasi penyakit\n- Memberikan ketenangan pikiran\n- Sebagai dasar untuk perubahan gaya hidup',
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
    fullContent: 'Kehamilan adalah masa yang penting bagi ibu dan janin. Nutrisi yang tepat sangat diperlukan untuk mendukung pertumbuhan dan perkembangan janin, serta menjaga kesehatan ibu.',
    detailContent: 'Nutrisi penting untuk ibu hamil:\n- Asam folat untuk perkembangan otak janin\n- Zat besi untuk mencegah anemia\n- Kalsium untuk tulang dan gigi janin\n- Protein untuk pertumbuhan jaringan\n- Vitamin D untuk sistem kekebalan tubuh',
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
    fullContent: 'Olahraga memiliki peran penting dalam mengontrol kadar gula darah bagi penderita diabetes. Namun, tidak semua jenis olahraga cocok untuk penderita diabetes.',
    detailContent: 'Olahraga yang direkomendasikan:\n- Jalan kaki 30 menit setiap hari\n- Bersepeda santai\n- Berenang\n- Senam ringan\n- Yoga',
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
    fullContent: 'Kesehatan mental sering kali terabaikan di tengah kesibukan hidup modern. Stres, kecemasan, dan depresi dapat mempengaruhi kualitas hidup seseorang.',
    detailContent: 'Tips menjaga kesehatan mental:\n- Luangkan waktu untuk relaksasi\n- Lakukan hobi yang menyenangkan\n- Jaga hubungan sosial yang sehat\n- Istirahat yang cukup\n- Jangan ragu untuk mencari bantuan profesional jika diperlukan',
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
    fullContent: 'Sistem kekebalan tubuh yang kuat adalah benteng utama melawan berbagai penyakit. Konsumsi makanan super yang kaya akan antioksidan, vitamin, dan mineral dapat membantu meningkatkan imunitas tubuh.',
    detailContent: 'Makanan super untuk imunitas:\n- Jahe dan kunyit\n- Bawang putih\n- Buah citrus (jeruk, lemon)\n- Sayuran hijau\n- Yogurt probiotik\n- Madu murni',
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
    fullContent: 'Vaksinasi adalah salah satu cara paling efektif untuk melindungi anak dari berbagai penyakit berbahaya. Dengan vaksinasi, sistem kekebalan tubuh anak akan terbentuk dengan baik.',
    detailContent: 'Jadwal vaksinasi penting:\n- BCG (Baru lahir)\n- Hepatitis B (Baru lahir)\n- DPT (2, 3, 4 bulan)\n- Polio (2, 3, 4 bulan)\n- Campak (9 bulan)\n- MMR (15 bulan)',
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
    fullContent: 'Stres kronis adalah salah satu faktor risiko penyakit jantung yang sering diabaikan. Ketika stres berlangsung lama, tubuh akan menghasilkan hormon kortisol yang dapat merusak pembuluh darah.',
    detailContent: 'Cara mengelola stres:\n- Meditasi dan pernapasan dalam\n- Olahraga teratur\n- Tidur yang cukup\n- Batasi kafein dan alkohol\n- Lakukan hobi yang menyenangkan\n- Jalin hubungan sosial yang positif',
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
    fullContent: 'Kolesterol tinggi adalah salah satu faktor risiko utama penyakit jantung. Dengan mengatur pola makan, kadar kolesterol dapat dikontrol dengan baik tanpa harus selalu bergantung pada obat-obatan.',
    detailContent: 'Panduan diet kolesterol:\n- Perbanyak serat (oatmeal, sayuran)\n- Pilih lemak sehat (alpukat, ikan salmon)\n- Hindari lemak jenuh (gorengan, santan)\n- Batasi makanan manis\n- Perbanyak buah-buahan\n- Minum air putih yang cukup',
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

const relatedArticles = computed(() => {
  if (!selectedArticle.value) return []
  return articles
    .filter(a => a.id !== selectedArticle.value.id && a.category === selectedArticle.value.category)
    .slice(0, 2)
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

.cursor-pointer {
  cursor: pointer;
}
</style>