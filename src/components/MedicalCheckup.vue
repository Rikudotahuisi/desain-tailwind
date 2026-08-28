<template>
  <section id="medical-checkup" class="scroll-mt-20 py-20 bg-gradient-to-b from-slate-50 to-white">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <!-- Header -->
      <div class="mb-12 text-center">
        <div class="inline-flex items-center gap-3 rounded-full bg-teal-50 px-4 py-2">
          <span class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-heartbeat mr-2"></i>Layanan Skrining
          </span>
        </div>
        <h2 class="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
          Medical Check Up <br class="hidden lg:block" />
          <span class="text-teal-600">Komprehensif & Terpercaya</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Pilih paket skrining yang sesuai dengan kebutuhan kesehatan Anda. 
          Deteksi dini untuk hidup yang lebih sehat.
        </p>
      </div>

      <!-- Skrining Categories -->
      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <div
          v-for="(item, index) in skriningItems"
          :key="item.name"
          @click="selectedSkrining = index"
          class="group cursor-pointer rounded-2xl bg-white p-4 text-center shadow-md transition-all hover:-translate-y-2 hover:shadow-2xl"
          :class="[
            selectedSkrining === index 
              ? 'ring-2 ring-teal-500 bg-teal-50' 
              : 'hover:bg-slate-50'
          ]"
        >
          <div class="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full text-2xl transition-colors"
            :class="[
              selectedSkrining === index 
                ? 'bg-teal-500 text-white' 
                : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100'
            ]"
          >
            <i :class="item.icon"></i>
          </div>
          <h4 class="text-sm font-semibold text-slate-900">{{ item.name }}</h4>
          <p class="mt-1 text-xs text-slate-500">{{ item.description }}</p>
          <div v-if="selectedSkrining === index" class="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-teal-600">
            <i class="fas fa-check-circle"></i>
            <span>Dipilih</span>
          </div>
        </div>
      </div>

      <!-- Detail Paket yang Dipilih -->
      <div v-if="selectedSkrining !== null" class="mt-12 rounded-3xl bg-white p-8 shadow-xl">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <!-- Left: Info -->
          <div class="lg:col-span-2">
            <div class="flex items-start gap-4">
              <div class="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-3xl text-teal-600">
                <i :class="skriningItems[selectedSkrining].icon"></i>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-slate-900">
                  {{ skriningItems[selectedSkrining].name }}
                </h3>
                <p class="mt-1 text-slate-600">
                  {{ skriningItems[selectedSkrining].fullDescription }}
                </p>
              </div>
            </div>

            <!-- Tests Included -->
            <div class="mt-6">
              <h4 class="mb-3 font-semibold text-slate-900">
                <i class="fas fa-list-check mr-2 text-teal-500"></i>
                Pemeriksaan yang Termasuk:
              </h4>
              <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div 
                  v-for="test in skriningItems[selectedSkrining].tests" 
                  :key="test"
                  class="flex items-start gap-3 rounded-lg bg-slate-50 p-3"
                >
                  <i class="fas fa-check-circle mt-0.5 text-teal-500"></i>
                  <span class="text-sm text-slate-600">{{ test }}</span>
                </div>
              </div>
            </div>

            <!-- Who Should Do This -->
            <div class="mt-6 rounded-xl bg-blue-50 p-4">
              <h4 class="mb-2 font-semibold text-slate-900">
                <i class="fas fa-users mr-2 text-blue-500"></i>
                Direkomendasikan untuk:
              </h4>
              <p class="text-sm text-slate-600">{{ skriningItems[selectedSkrining].recommended }}</p>
            </div>
          </div>

          <!-- Right: Price & Booking -->
          <div class="lg:col-span-1">
            <div class="rounded-2xl bg-gradient-to-br from-teal-50 to-white p-6 text-center">
              <p class="text-sm text-slate-500">Mulai dari</p>
              <p class="text-4xl font-bold text-teal-600">{{ skriningItems[selectedSkrining].price }}</p>
              <p class="mt-1 text-sm text-slate-500">termasuk konsultasi dokter</p>

              <div class="mt-6 space-y-3">
                <a href="#" class="flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5">
                  <i class="fas fa-calendar-check"></i>
                  Booking Sekarang
                </a>
                <a href="#" class="flex w-full items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5">
                  <i class="fas fa-phone"></i>
                  Konsultasi Gratis
                </a>
              </div>

              <div class="mt-6 flex items-center justify-center gap-4 text-xs text-slate-500">
                <span><i class="far fa-clock mr-1"></i>2-3 Jam</span>
                <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                <span><i class="fas fa-flask mr-1"></i>Akurat 98%</span>
                <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                <span><i class="fas fa-user-md mr-1"></i>Dokter Ahli</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Banner -->
      <div class="mt-16 rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-center text-white shadow-xl">
        <h3 class="text-2xl font-bold lg:text-3xl">
          <i class="fas fa-phone-alt mr-3"></i>
          Butuh Bantuan Memilih Paket Skrining?
        </h3>
        <p class="mt-2 text-teal-100">Konsultasikan dengan tim kami untuk mendapatkan rekomendasi yang tepat</p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a href="#" class="rounded-full bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5">
            <i class="fas fa-phone mr-2"></i>Hubungi 1600-MED
          </a>
          <a href="#" class="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white transition hover:bg-white/20 hover:-translate-y-0.5">
            <i class="fas fa-comment-dots mr-2"></i>Chat dengan Kami
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const selectedSkrining = ref(0)

const skriningItems = [
  {
    name: 'Skrining Umum',
    icon: 'fas fa-stethoscope',
    description: 'Pemeriksaan kesehatan dasar',
    fullDescription: 'Paket skrining kesehatan umum untuk mengetahui kondisi kesehatan Anda secara menyeluruh. Cocok untuk semua kalangan.',
    price: 'Rp 350.000',
    recommended: 'Semua usia, terutama untuk deteksi dini masalah kesehatan umum.',
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
    fullDescription: 'Paket skrining khusus untuk mendeteksi risiko penyakit jantung koroner dan masalah kardiovaskular lainnya.',
    price: 'Rp 750.000',
    recommended: 'Usia 35+ tahun, memiliki riwayat keluarga penyakit jantung, perokok, atau memiliki gaya hidup tidak sehat.',
    tests: [
      'EKG (Elektrokardiogram)',
      'Tes Treadmill / Stress Test',
      'Echocardiography',
      'Cek Kolesterol Lengkap (HDL, LDL, Trigliserida)',
      'Cek Tekanan Darah 24 Jam',
      'Konsultasi Spesialis Jantung'
    ]
  },
  {
    name: 'Skrining Kanker',
    icon: 'fas fa-ribbon',
    description: 'Deteksi dini berbagai kanker',
    fullDescription: 'Paket skrining komprehensif untuk mendeteksi dini berbagai jenis kanker termasuk kanker payudara, serviks, dan prostat.',
    price: 'Rp 1.200.000',
    recommended: 'Usia 40+ tahun, memiliki riwayat keluarga kanker, atau faktor risiko lainnya.',
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
    fullDescription: 'Paket skrining untuk mendeteksi faktor risiko stroke dan mencegah kejadian stroke di masa depan.',
    price: 'Rp 850.000',
    recommended: 'Usia 40+ tahun, hipertensi, diabetes, atau memiliki riwayat keluarga stroke.',
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
    fullDescription: 'Paket skrining kesehatan lengkap untuk calon pelajar baru. Memastikan kondisi fisik dan mental siap untuk menempuh pendidikan.',
    price: 'Rp 450.000',
    recommended: 'Calon pelajar baru, mahasiswa baru, atau peserta program pendidikan.',
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
    fullDescription: 'Paket skrining kesehatan yang dirancang khusus untuk pria, mencakup pemeriksaan organ reproduksi dan penyakit umum pada pria.',
    price: 'Rp 650.000',
    recommended: 'Pria usia 25+ tahun, atau yang ingin menjaga kesehatan organ reproduksi.',
    tests: [
      'USG Prostat',
      'PSA Test (Deteksi Kanker Prostat)',
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
    fullDescription: 'Paket skrining kesehatan yang dirancang khusus untuk wanita, mencakup pemeriksaan organ reproduksi dan deteksi dini kanker serviks & payudara.',
    price: 'Rp 650.000',
    recommended: 'Wanita usia 18+ tahun, terutama untuk deteksi dini kanker serviks dan payudara.',
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
    fullDescription: 'Paket skrining kesehatan lengkap untuk calon pengantin. Memastikan kedua calon pasangan dalam kondisi sehat untuk memulai kehidupan pernikahan.',
    price: 'Rp 900.000',
    recommended: 'Calon pengantin, baik pria maupun wanita, yang ingin memastikan kesehatan sebelum menikah.',
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
    fullDescription: 'Paket skrining kesehatan untuk calon karyawan baru. Memastikan kondisi fisik dan mental siap untuk bekerja di lingkungan profesional.',
    price: 'Rp 500.000',
    recommended: 'Calon karyawan baru di berbagai perusahaan, termasuk pemeriksaan kesehatan kerja.',
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