<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 95px;">
    
    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 py-10">
      <div class="flex flex-col gap-8 lg:grid lg:grid-cols-3">
        <!-- Form -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">
              <i class="fas fa-envelope mr-2 text-teal-500"></i>Kirim Pesan
            </h2>
            <p class="text-sm text-slate-500 mb-6">Isi form di bawah ini untuk menghubungi kami</p>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div>
                  <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                    Nama Lengkap <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="John Doe"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="john@email.com"
                    class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                  Subjek <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.subject"
                  type="text"
                  required
                  placeholder="Subjek pesan"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                  Pesan <span class="text-red-500">*</span>
                </label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  placeholder="Tulis pesan Anda di sini..."
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="loading"
                class="w-full rounded-xl bg-teal-500 py-3.5 font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
                <i v-else class="fas fa-paper-plane mr-2"></i>
                {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
              </button>
            </form>
          </div>
        </div>

        <!-- Info Sidebar -->
        <div class="lg:col-span-1">
          <!-- Contact Info -->
          <div class="bg-white rounded-3xl shadow-lg p-6">
            <h3 class="font-bold text-slate-900 mb-4">
              <i class="fas fa-info-circle mr-2 text-teal-500"></i>Informasi Kontak
            </h3>
            <div class="space-y-4">
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <i class="fas fa-phone"></i>
                </div>
                <div>
                  <p class="text-xs text-slate-500">Telepon</p>
                  <p class="font-semibold text-slate-900">1600-MED (633)</p>
                  <p class="text-xs text-slate-400">Layanan 24 Jam</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                  <i class="fas fa-envelope"></i>
                </div>
                <div>
                  <p class="text-xs text-slate-500">Email</p>
                  <p class="font-semibold text-slate-900">info@assyifahospital.com</p>
                  <p class="text-xs text-slate-400">Balas dalam 24 Jam</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <i class="fab fa-whatsapp"></i>
                </div>
                <div>
                  <p class="text-xs text-slate-500">WhatsApp</p>
                  <p class="font-semibold text-slate-900">0812-3456-7890</p>
                  <p class="text-xs text-slate-400">Chat langsung</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div>
                  <p class="text-xs text-slate-500">Alamat</p>
                  <p class="font-semibold text-slate-900">Jl. Kesehatan No. 123</p>
                  <p class="text-xs text-slate-400">Jakarta, Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Opening Hours -->
          <div class="bg-white rounded-3xl shadow-lg p-6 mt-4">
            <h3 class="font-bold text-slate-900 mb-4">
              <i class="fas fa-clock mr-2 text-teal-500"></i>Jam Operasional
            </h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-600">Senin - Jumat</span>
                <span class="font-semibold text-slate-900">08:00 - 20:00</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-600">Sabtu</span>
                <span class="font-semibold text-slate-900">08:00 - 17:00</span>
              </div>
              <div class="flex justify-between py-2 border-b border-slate-100">
                <span class="text-slate-600">Minggu</span>
                <span class="font-semibold text-teal-600">Tutup</span>
              </div>
              <div class="flex justify-between py-2">
                <span class="text-slate-600">Layanan Darurat</span>
                <span class="font-semibold text-red-600">24 Jam</span>
              </div>
            </div>
          </div>

          <!-- Social Media
          <div class="bg-white rounded-3xl shadow-lg p-6 mt-4">
            <h3 class="font-bold text-slate-900 mb-4">
              <i class="fas fa-share-alt mr-2 text-teal-500"></i>Ikuti Kami
            </h3>
            <div class="flex gap-3">
              <a href="#" class="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center hover:bg-blue-600 transition hover:-translate-y-0.5">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition hover:-translate-y-0.5">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center hover:bg-pink-700 transition hover:-translate-y-0.5">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center hover:bg-green-700 transition hover:-translate-y-0.5">
                <i class="fab fa-whatsapp"></i>
              </a>
              <a href="#" class="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition hover:-translate-y-0.5">
                <i class="fab fa-youtube"></i>
              </a>
            </div>
          </div> -->
        </div>
      </div>

      <!-- Map -->
      <div class="mt-8">
        <div class="bg-white rounded-3xl shadow-lg overflow-hidden">
          <div class="p-4 border-b border-slate-100">
            <h3 class="font-bold text-slate-900">
              <i class="fas fa-map mr-2 text-teal-500"></i>Lokasi Kami
            </h3>
          </div>
          <div class="w-full h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322509!2d106.829561!3d-6.175113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e764b12d%3A0x3c3e9c1b3c3e9c1b!2sJakarta!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full h-[400px]"
            ></iframe>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="mt-12">
        <div class="text-center mb-10">
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-question-circle mr-2"></i>FAQ
          </span>
          <h2 class="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
            Pertanyaan yang <span class="text-teal-600">Sering Diajukan</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
            <div class="flex items-start gap-3">
              <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 font-bold text-sm">
                {{ index + 1 }}
              </div>
              <div>
                <h4 class="font-semibold text-slate-900">{{ faq.question }}</h4>
                <p class="mt-1 text-sm text-slate-600">{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ===== STATE =====
const loading = ref(false)

// ===== FORM =====
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// ===== FAQ =====
const faqs = [
  {
    question: 'Bagaimana cara melakukan pendaftaran online?',
    answer: 'Anda dapat mendaftar melalui halaman Register atau menghubungi kami di 1600-MED.'
  },
  {
    question: 'Apa saja fasilitas yang tersedia di ASSYIFA Hospital?',
    answer: 'Kami menyediakan fasilitas rawat inap, konsultasi spesialis, laboratorium, farmasi, dan medical check up.'
  },
  {
    question: 'Apakah ada layanan darurat 24 jam?',
    answer: 'Ya, kami menyediakan layanan gawat darurat 24 jam penuh setiap hari.'
  },
  {
    question: 'Bagaimana cara melihat jadwal dokter?',
    answer: 'Anda dapat melihat jadwal dokter di halaman Jadwal Dokter atau menghubungi bagian pendaftaran.'
  }
]

// ===== SUBMIT =====
const handleSubmit = () => {
  loading.value = true
  
  setTimeout(() => {
    console.log('Data Pesan:', form.value)
    alert('✅ Pesan berhasil dikirim! Kami akan menghubungi Anda segera.')
    loading.value = false
    form.value = { name: '', email: '', subject: '', message: '' }
  }, 1500)
}
</script>