<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Kelola Artikel</h2>
        <p class="text-sm text-slate-500">Kelola artikel kesehatan di ASSYIFA Hospital</p>
      </div>
      <button 
        @click="openModal" 
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
                <button @click="editArticle(article.id)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteArticle(article.id)" class="text-red-500 hover:text-red-600 transition">
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

    <!-- ===== MODAL FORM ===== -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 class="text-xl font-bold text-slate-900">
            <i class="fas fa-newspaper mr-2 text-teal-500"></i>
            {{ editId !== null ? 'Edit Artikel' : 'Tambah Artikel Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="saveArticle" class="p-6 space-y-5">
          <!-- Upload Gambar -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Gambar Artikel <span class="text-red-500">*</span>
            </label>
            <div 
              @dragover.prevent 
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
              class="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/30"
              :class="[
                form.imagePreview || form.image 
                  ? 'border-teal-400 bg-teal-50/30' 
                  : 'border-slate-300'
              ]"
            >
              <div v-if="form.imagePreview || form.image" class="relative">
                <img 
                  :src="form.imagePreview || form.image" 
                  alt="Preview" 
                  class="max-h-48 mx-auto rounded-lg object-contain"
                />
                <button 
                  type="button"
                  @click.stop="removeImage"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>
              <div v-else>
                <div class="text-5xl text-slate-300 mb-3">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <p class="text-sm font-medium text-slate-600">Klik atau drag & drop untuk upload</p>
                <p class="text-xs text-slate-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
              </div>
              <input
                ref="fileInput"
                type="file"
                accept="image/*"
                @change="handleFileChange"
                class="hidden"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Judul -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Judul <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.title"
                type="text"
                required
                placeholder="Masukkan judul artikel"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <!-- Kategori -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Kategori <span class="text-red-500">*</span>
              </label>
              <select
                v-model="form.category"
                required
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="">Pilih Kategori</option>
                <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
              </select>
            </div>
          </div>

          <!-- Penulis -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Penulis <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.author"
              type="text"
              required
              placeholder="Nama penulis"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <!-- Ringkasan (Excerpt) -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Ringkasan <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.excerpt"
              rows="2"
              required
              placeholder="Ringkasan artikel (akan tampil di card)"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            ></textarea>
          </div>

          <!-- Konten Lengkap -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Konten Lengkap <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.content"
              rows="6"
              required
              placeholder="Isi lengkap artikel..."
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            ></textarea>
          </div>

          <!-- Status Publikasi -->
          <div class="flex items-center gap-3">
            <input
              v-model="form.published"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            <label class="text-sm text-slate-700">Publikasikan artikel ini</label>
          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              @click="closeModal"
              class="rounded-xl px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              Batal
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
              <i v-else class="fas fa-save mr-2"></i>
              {{ loading ? 'Menyimpan...' : editId !== null ? 'Update Artikel' : 'Simpan Artikel' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ===== STATE =====
const showModal = ref(false)
const editId = ref<number | null>(null)
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const searchQuery = ref('')
const filterCategory = ref('')

// ===== CATEGORIES =====
const categories = [
  'Kardiologi',
  'Kandungan',
  'Anak',
  'Pencegahan',
  'Gizi',
  'Olahraga',
  'Mental Health'
]

// ===== ARTICLES DATA =====
const articles = ref([
  {
    id: 1,
    title: '7 Tips Menjaga Kesehatan Jantung di Usia Muda',
    excerpt: 'Pola hidup sehat sangat penting untuk mencegah penyakit jantung koroner. Simak 7 tips yang bisa Anda terapkan mulai sekarang.',
    content: 'Penyakit jantung merupakan salah satu penyebab kematian tertinggi di Indonesia. Namun, banyak orang tidak menyadari bahwa penyakit ini sebenarnya dapat dicegah dengan menerapkan pola hidup sehat sejak dini. Berikut adalah 7 tips yang bisa Anda terapkan untuk menjaga kesehatan jantung: 1. Konsumsi makanan sehat dengan gizi seimbang 2. Rutin berolahraga minimal 30 menit setiap hari 3. Hindari merokok dan konsumsi alkohol 4. Kelola stres dengan baik 5. Periksa tekanan darah secara rutin 6. Jaga berat badan ideal 7. Tidur yang cukup 7-8 jam per hari.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.izyBjaj9XVwm_JSKlPiKPgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Kardiologi',
    author: 'dr. Andi Pratama, Sp.JP',
    date: '28 Agustus 2026',
    readTime: '5 menit',
    published: true
  },
  {
    id: 2,
    title: 'Pentingnya Medical Check Up Tahunan untuk Deteksi Dini',
    excerpt: 'Deteksi dini penyakit melalui pemeriksaan kesehatan rutin setiap tahun dapat menyelamatkan nyawa. Kenali manfaatnya di sini.',
    content: 'Medical check up tahunan adalah investasi kesehatan yang sangat penting. Banyak penyakit serius seperti kanker, diabetes, dan penyakit jantung dapat dideteksi lebih awal melalui pemeriksaan rutin. Dengan deteksi dini, pengobatan dapat dilakukan lebih cepat dan tingkat kesembuhan lebih tinggi. Manfaat medical check up tahunan: Mendeteksi penyakit sejak dini, Memantau kondisi kesehatan secara berkala, Mencegah komplikasi penyakit, Memberikan ketenangan pikiran, Sebagai dasar untuk perubahan gaya hidup.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'Pencegahan',
    author: 'dr. Budi Santoso, Sp.PD',
    date: '27 Agustus 2026',
    readTime: '4 menit',
    published: true
  },
  {
    id: 3,
    title: 'Nutrisi Tepat untuk Ibu Hamil dan Janin',
    excerpt: 'Panduan lengkap makanan sehat untuk mendukung kehamilan dan perkembangan janin yang optimal.',
    content: 'Kehamilan adalah masa yang penting bagi ibu dan janin. Nutrisi yang tepat sangat diperlukan untuk mendukung pertumbuhan dan perkembangan janin, serta menjaga kesehatan ibu. Konsumsi makanan bergizi seimbang dengan asupan vitamin dan mineral yang cukup sangat dianjurkan. Nutrisi penting untuk ibu hamil: Asam folat untuk perkembangan otak janin, Zat besi untuk mencegah anemia, Kalsium untuk tulang dan gigi janin, Protein untuk pertumbuhan jaringan, Vitamin D untuk sistem kekebalan tubuh.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Kandungan',
    author: 'dr. Siti Rahayu, Sp.OG',
    date: '26 Agustus 2026',
    readTime: '6 menit',
    published: false
  }
])

// ===== FORM =====
const defaultForm = {
  image: '',
  imageFile: null as File | null,
  imagePreview: '',
  title: '',
  category: '',
  author: '',
  excerpt: '',
  content: '',
  published: false
}

const form = ref({ ...defaultForm })

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

// ===== IMAGE HANDLING =====
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.value.imageFile = file
    form.value.imagePreview = URL.createObjectURL(file)
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const file = files[0]
    form.value.imageFile = file
    form.value.imagePreview = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  form.value.imageFile = null
  form.value.imagePreview = ''
  form.value.image = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// ===== METHODS =====
const openModal = () => {
  editId.value = null
  form.value = { 
    image: '', 
    imageFile: null,
    imagePreview: '',
    title: '', 
    category: '',
    author: '',
    excerpt: '',
    content: '',
    published: false
  }
  showModal.value = true
}

const editArticle = (id: number) => {
  editId.value = id
  const article = articles.value.find(a => a.id === id)
  if (article) {
    form.value = {
      image: article.image,
      imageFile: null,
      imagePreview: article.image || '',
      title: article.title,
      category: article.category,
      author: article.author,
      excerpt: article.excerpt,
      content: article.content || '',
      published: article.published
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editId.value = null
  loading.value = false
  removeImage()
}

const saveArticle = () => {
  loading.value = true

  setTimeout(() => {
    const today = new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })

    const imageUrl = form.value.imagePreview || form.value.image || 'https://via.placeholder.com/800x400/0d9488/ffffff?text=ASSYIFA+Hospital'

    const newArticle = {
      id: editId.value || articles.value.length + 1,
      title: form.value.title,
      excerpt: form.value.excerpt,
      content: form.value.content,
      image: imageUrl,
      category: form.value.category,
      author: form.value.author,
      date: today,
      readTime: '5 menit',
      published: form.value.published
    }

    if (editId.value !== null) {
      // Update existing article
      const index = articles.value.findIndex(a => a.id === editId.value)
      if (index !== -1) {
        articles.value[index] = { ...articles.value[index], ...newArticle }
      }
    } else {
      // Add new article
      articles.value.push(newArticle)
    }

    loading.value = false
    closeModal()
    alert(editId.value !== null ? '✅ Artikel berhasil diupdate!' : '✅ Artikel baru berhasil ditambahkan!')
  }, 1000)
}

const deleteArticle = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
    articles.value = articles.value.filter(a => a.id !== id)
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