<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px;">


    <!-- ===== Kategori Skrining ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 -mt-6">
      <div class="py-4">
        <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2">
    
          Kategori Skrining
        </h3>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <button
            v-for="item in popularItems"
            :key="item.name"
            @click="selectedPopular = item.name"
            class="flex flex-col items-center justify-center gap-1.5 px-3 py-3 rounded-xl text-center transition-all duration-200 border"
            :class="[
              selectedPopular === item.name 
                ? 'bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/20'
                : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
            ]"
          >
            <i :class="[item.icon, 'text-xl']"></i>
            <span class="text-xs font-medium leading-tight">{{ item.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 py-10">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- ===== SIDEBAR FILTER ===== -->
        <div class="w-full lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <!-- Search -->
            <div class="mb-6">
              <div class="relative">
                <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari paket..."
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <!-- Filter by Umur (Checkbox) -->
            <div class="mb-6">
              <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                <i class="fas fa-calendar-alt text-teal-500"></i>
                Filter by Umur
              </h3>
              <div class="space-y-1.5">
                <label
                  v-for="age in ageFilters"
                  :key="age"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    :value="age"
                    v-model="selectedAges"
                    class="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span class="text-slate-600">{{ age }}</span>
                </label>
              </div>
            </div>

            <!-- Filter by Jenis Kelamin (Checkbox) -->
            <div class="mb-6">
              <h3 class="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
                <i class="fas fa-venus-mars text-teal-500"></i>
                Filter by Jenis Kelamin
              </h3>
              <div class="space-y-1.5">
                <label
                  v-for="gender in genderFilters"
                  :key="gender"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    :value="gender"
                    v-model="selectedGenders"
                    class="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span class="text-slate-600">{{ gender }}</span>
                </label>
              </div>
            </div>

            

            <!-- Selected Filters Info -->
            <div v-if="hasActiveFilters" class="mb-4 p-3 bg-teal-50 rounded-xl">
              <p class="text-xs text-teal-600">
                <i class="fas fa-filter mr-1"></i>
                Filter aktif: 
                <span class="font-semibold">{{ activeFilterCount }}</span>
              </p>
            </div>

            <!-- Reset Filter -->
            <button
              @click="resetFilters"
              class="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
            >
              <i class="fas fa-undo mr-2"></i>Reset Filter
            </button>
          </div>
        </div>

        <!-- ===== GRID PAKET ===== -->
        <div class="flex-1">
          <!-- Hasil Pencarian -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-slate-500">
              Menampilkan <span class="font-semibold text-slate-700">{{ filteredItems.length }}</span> paket
            </p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-500">Urutkan:</span>
              <select
                v-model="sortBy"
                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          <!-- Grid -->
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="item in filteredItems"
              :key="item.name"
              class="group bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer"
              @click="selectedItem = item"
            >
              <!-- Image Placeholder -->
              <div class="relative h-48 bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <i :class="[item.icon, 'text-6xl text-teal-500/50']"></i>
                <span class="absolute top-3 right-3 bg-teal-500 text-white text-xs px-2.5 py-1 rounded-full font-semibold">
                  {{ item.category }}
                </span>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                  <span class="text-white text-sm font-semibold">{{ item.name }}</span>
                </div>
              </div>

              <!-- Content -->
              <div class="p-4">
                <p class="text-sm text-slate-600 line-clamp-2">{{ item.description }}</p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-lg font-bold text-teal-600">{{ item.price }}</span>
                  <button class="text-sm font-semibold text-teal-600 hover:text-teal-700 transition">
                    Lihat detail <i class="fas fa-arrow-right ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="filteredItems.length === 0" class="py-16 text-center">
            <div class="text-5xl mb-4 text-slate-300">
              <i class="fas fa-search"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">Tidak ditemukan</h3>
            <p class="text-sm text-slate-500">Coba dengan filter atau kata kunci lain</p>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== MODAL DETAIL ===== -->
    <div v-if="selectedItem" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 class="text-xl font-bold text-slate-900">
            <i :class="[selectedItem.icon, 'mr-2 text-teal-500']"></i>
            {{ selectedItem.name }}
          </h3>
          <button @click="selectedItem = null" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <div class="p-6 space-y-5">
          <p class="text-slate-600">{{ selectedItem.fullDescription }}</p>

          <div>
            <h4 class="font-semibold text-slate-900 mb-2">
              <i class="fas fa-list-check mr-2 text-teal-500"></i>Pemeriksaan:
            </h4>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div v-for="test in selectedItem.tests" :key="test" class="flex items-start gap-2">
                <i class="fas fa-check-circle mt-0.5 text-teal-500 text-sm"></i>
                <span class="text-sm text-slate-600">{{ test }}</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-4">
            <h4 class="font-semibold text-slate-900 mb-1">
              <i class="fas fa-users mr-2 text-blue-500"></i>Direkomendasikan:
            </h4>
            <p class="text-sm text-slate-600">{{ selectedItem.recommended }}</p>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 pt-5">
            <div>
              <p class="text-sm text-slate-500">Harga</p>
              <p class="text-3xl font-bold text-teal-600">{{ selectedItem.price }}</p>
            </div>
            <div class="flex gap-3">
              <router-link to="/register" class="rounded-full bg-teal-500 px-6 py-2.5 font-semibold text-white transition hover:bg-teal-600">
                <i class="fas fa-calendar-check mr-2"></i>Booking
              </router-link>
              <button @click="selectedItem = null" class="rounded-full border border-slate-200 px-6 py-2.5 font-semibold text-slate-600 transition hover:bg-slate-50">
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

// ===== STATE =====
const searchQuery = ref('')
const selectedPopular = ref<string[]>(['Semua'])
const selectedAges = ref<string[]>(['Semua'])
const selectedGenders = ref<string[]>(['Semua'])
const selectedCategories = ref<string[]>(['Semua'])
const selectedItem = ref<any>(null)
const sortBy = ref('popular')

// ===== FILTER OPTIONS =====
const popularItems = [
  { name: 'Semua', icon: 'fas fa-th-large' },
  { name: 'Skrining Umum', icon: 'fas fa-stethoscope' },
  { name: 'Skrining Jantung', icon: 'fas fa-heart' },
  { name: 'Skrining Kanker', icon: 'fas fa-ribbon' },
  { name: 'Skrining Stroke', icon: 'fas fa-brain' },
  { name: 'Skrining Calon Pelajar', icon: 'fas fa-graduation-cap' },
  { name: 'Skrining Pria', icon: 'fas fa-mars' },
  { name: 'Skrining Wanita', icon: 'fas fa-venus' },
  { name: 'Pranikah', icon: 'fas fa-ring' },
  { name: 'Pra-Karyawan', icon: 'fas fa-briefcase' }
]


const ageFilters = [
  'Semua',
  '> 2 tahun',
  '> 25 tahun',
  '> 35 tahun',
  '> 40 tahun',
  '> 50 tahun',
  '> 60 tahun',
  '< 35 tahun',
  'Anak-anak/Remaja',
  'Dewasa',
  'Lansia'
]

const genderFilters = [
  'Semua',
  'Laki-laki',
  'Wanita'
]



// ===== COMPUTED =====
const hasActiveFilters = computed(() => {
  return (
    selectedAges.value.length > 1 ||
    selectedGenders.value.length > 1 ||
    selectedCategories.value.length > 1 ||
    selectedPopular.value.length > 1
  )
})

const activeFilterCount = computed(() => {
  let count = 0
  if (selectedAges.value.length > 1) count += selectedAges.value.length - 1
  if (selectedGenders.value.length > 1) count += selectedGenders.value.length - 1
  if (selectedCategories.value.length > 1) count += selectedCategories.value.length - 1
  if (selectedPopular.value.length > 1) count += selectedPopular.value.length - 1
  return count
})

// ===== TOGGLE FUNCTIONS =====
const togglePopular = (name: string) => {
  if (name === 'Semua') {
    selectedPopular.value = ['Semua']
    return
  }
  const index = selectedPopular.value.indexOf(name)
  if (index > -1) {
    selectedPopular.value.splice(index, 1)
    if (selectedPopular.value.length === 0) {
      selectedPopular.value = ['Semua']
    }
  } else {
    const semuaIndex = selectedPopular.value.indexOf('Semua')
    if (semuaIndex > -1) {
      selectedPopular.value.splice(semuaIndex, 1)
    }
    selectedPopular.value.push(name)
  }
}

// ===== SKRINING ITEMS =====
const skriningItems = [
  {
    name: 'Skrining Umum',
    icon: 'fas fa-stethoscope',
    description: 'Pemeriksaan kesehatan dasar',
    category: 'Umum',
    fullDescription: 'Paket skrining kesehatan umum untuk mengetahui kondisi kesehatan Anda secara menyeluruh. Cocok untuk semua kalangan.',
    price: 'Rp 350.000',
    recommended: 'Semua usia, terutama untuk deteksi dini masalah kesehatan umum.',
    age: 'Semua',
    gender: 'Semua',
    tests: [
      'Cek Tekanan Darah',
      'Cek Gula Darah Puasa',
      'Cek Kolesterol Total',
      'BMI & Analisis Tubuh',
      'Tes Darah Rutin',
      'Konsultasi Dokter Umum'
    ]
  },
  {
    name: 'Skrining Jantung',
    icon: 'fas fa-heart',
    description: 'Deteksi dini penyakit jantung',
    category: 'Jantung',
    fullDescription: 'Paket skrining khusus untuk mendeteksi risiko penyakit jantung koroner dan masalah kardiovaskular lainnya.',
    price: 'Rp 750.000',
    recommended: 'Usia 35+ tahun, memiliki riwayat keluarga penyakit jantung, perokok, atau memiliki gaya hidup tidak sehat.',
    age: '> 35 tahun',
    gender: 'Semua',
    tests: [
      'EKG (Elektrokardiogram)',
      'Tes Treadmill / Stress Test',
      'Echocardiography',
      'Cek Kolesterol Lengkap',
      'Cek Tekanan Darah 24 Jam',
      'Konsultasi Spesialis Jantung'
    ]
  },
  {
    name: 'Skrining Kanker',
    icon: 'fas fa-ribbon',
    description: 'Deteksi dini berbagai kanker',
    category: 'Kanker',
    fullDescription: 'Paket skrining komprehensif untuk mendeteksi dini berbagai jenis kanker termasuk kanker payudara, serviks, dan prostat.',
    price: 'Rp 1.200.000',
    recommended: 'Usia 40+ tahun, memiliki riwayat keluarga kanker, atau faktor risiko lainnya.',
    age: '> 40 tahun',
    gender: 'Semua',
    tests: [
      'USG Payudara (Wanita)',
      'Mammografi (Wanita 40+)',
      'Pap Smear (Wanita)',
      'PSA Test (Pria)',
      'Tes Darah Tumor Marker',
      'Konsultasi Spesialis Onkologi'
    ]
  },
  {
    name: 'Skrining Stroke',
    icon: 'fas fa-brain',
    description: 'Deteksi risiko stroke',
    category: 'Stroke',
    fullDescription: 'Paket skrining untuk mendeteksi faktor risiko stroke dan mencegah kejadian stroke di masa depan.',
    price: 'Rp 850.000',
    recommended: 'Usia 40+ tahun, hipertensi, diabetes, atau memiliki riwayat keluarga stroke.',
    age: '> 40 tahun',
    gender: 'Semua',
    tests: [
      'CT Scan Kepala',
      'USG Karotis',
      'Cek Tekanan Darah',
      'Cek Kolesterol & Gula Darah',
      'EKG',
      'Konsultasi Spesialis Saraf'
    ]
  },
  {
    name: 'Skrining Calon Pelajar',
    icon: 'fas fa-graduation-cap',
    description: 'Cek kesehatan untuk pelajar',
    category: 'Pelajar',
    fullDescription: 'Paket skrining kesehatan lengkap untuk calon pelajar baru. Memastikan kondisi fisik dan mental siap untuk menempuh pendidikan.',
    price: 'Rp 450.000',
    recommended: 'Calon pelajar baru, mahasiswa baru, atau peserta program pendidikan.',
    age: 'Anak-anak/Remaja',
    gender: 'Semua',
    tests: [
      'Cek Kesehatan Umum',
      'Tes Darah Lengkap',
      'Tes Urine',
      'Tes Mata & Telinga',
      'Tes Kebugaran Fisik',
      'Konsultasi Dokter'
    ]
  },
  {
    name: 'Skrining Pria',
    icon: 'fas fa-mars',
    description: 'Kesehatan khusus pria',
    category: 'Pria',
    fullDescription: 'Paket skrining kesehatan yang dirancang khusus untuk pria, mencakup pemeriksaan organ reproduksi dan penyakit umum pada pria.',
    price: 'Rp 650.000',
    recommended: 'Pria usia 25+ tahun, atau yang ingin menjaga kesehatan organ reproduksi.',
    age: '> 25 tahun',
    gender: 'Laki-laki',
    tests: [
      'USG Prostat',
      'PSA Test',
      'Tes Hormon Testosteron',
      'Cek Kesehatan Umum',
      'Tes Darah Lengkap',
      'Konsultasi Spesialis Andrologi'
    ]
  },
  {
    name: 'Skrining Wanita',
    icon: 'fas fa-venus',
    description: 'Kesehatan khusus wanita',
    category: 'Wanita',
    fullDescription: 'Paket skrining kesehatan yang dirancang khusus untuk wanita, mencakup pemeriksaan organ reproduksi dan deteksi dini kanker serviks & payudara.',
    price: 'Rp 650.000',
    recommended: 'Wanita usia 18+ tahun, terutama untuk deteksi dini kanker serviks dan payudara.',
    age: '> 25 tahun',
    gender: 'Wanita',
    tests: [
      'Pap Smear',
      'USG Payudara',
      'Tes Hormon (Estrogen, Progesteron)',
      'Cek Kesehatan Umum',
      'Tes Darah Lengkap',
      'Konsultasi Spesialis Kandungan'
    ]
  },
  {
    name: 'Pranikah',
    icon: 'fas fa-ring',
    description: 'Cek kesehatan sebelum menikah',
    category: 'Pranikah',
    fullDescription: 'Paket skrining kesehatan lengkap untuk calon pengantin. Memastikan kedua calon pasangan dalam kondisi sehat untuk memulai kehidupan pernikahan.',
    price: 'Rp 900.000',
    recommended: 'Calon pengantin, baik pria maupun wanita, yang ingin memastikan kesehatan sebelum menikah.',
    age: 'Dewasa',
    gender: 'Semua',
    tests: [
      'Tes Darah Lengkap (Golongan Darah, HIV, Hepatitis)',
      'Tes Urine',
      'Cek Kesehatan Reproduksi',
      'Cek Kesehatan Umum',
      'Konsultasi Pranikah',
      'Tes Genetik Dasar'
    ]
  },
  {
    name: 'Pra-Karyawan',
    icon: 'fas fa-briefcase',
    description: 'Cek kesehatan untuk karyawan baru',
    category: 'Karyawan',
    fullDescription: 'Paket skrining kesehatan untuk calon karyawan baru. Memastikan kondisi fisik dan mental siap untuk bekerja di lingkungan profesional.',
    price: 'Rp 500.000',
    recommended: 'Calon karyawan baru di berbagai perusahaan, termasuk pemeriksaan kesehatan kerja.',
    age: 'Dewasa',
    gender: 'Semua',
    tests: [
      'Cek Kesehatan Umum',
      'Tes Darah & Urine',
      'Tes Mata, Telinga, Gigi',
      'Tes Kebugaran Fisik',
      'Tes Psikologi Dasar',
      'Konsultasi Dokter OKUPASI'
    ]
  }
]

// ===== COMPUTED FILTER =====
const filteredItems = computed(() => {
  let filtered = skriningItems

  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    )
  }

  // Filter by popular (checkbox)
  if (!selectedPopular.value.includes('Semua') && selectedPopular.value.length > 0) {
    filtered = filtered.filter(item => selectedPopular.value.includes(item.name))
  }

  // Filter by age (checkbox)
  if (!selectedAges.value.includes('Semua') && selectedAges.value.length > 0) {
    filtered = filtered.filter(item => selectedAges.value.includes(item.age))
  }

  // Filter by gender (checkbox)
  if (!selectedGenders.value.includes('Semua') && selectedGenders.value.length > 0) {
    filtered = filtered.filter(item => selectedGenders.value.includes(item.gender) || item.gender === 'Semua')
  }

  // Filter by category (checkbox)
  if (!selectedCategories.value.includes('Semua') && selectedCategories.value.length > 0) {
    filtered = filtered.filter(item => selectedCategories.value.includes(item.category))
  }

  // Sort
  switch (sortBy.value) {
    case 'price-low':
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
        return priceA - priceB
      })
      break
    case 'price-high':
      filtered = [...filtered].sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''))
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''))
        return priceB - priceA
      })
      break
    case 'name':
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      break
    default:
      break
  }

  return filtered
})

// ===== METHODS =====
const resetFilters = () => {
  searchQuery.value = ''
  selectedPopular.value = ['Semua']
  selectedAges.value = ['Semua']
  selectedGenders.value = ['Semua']
  selectedCategories.value = ['Semua']
  sortBy.value = 'popular'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sticky {
  position: sticky;
  top: 100px;
}
</style>