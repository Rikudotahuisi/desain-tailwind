<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 100px;">
    <!-- ===== TENTANG KAMI ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-10">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- Left: Image -->
        <div class="relative">
          <div class="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" 
              alt="Asyiffa Hospital" 
              class="h-full w-full object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -right-6 rounded-2xl bg-teal-500 p-6 text-white shadow-xl">
            <p class="text-3xl font-bold">20+</p>
            <p class="text-sm">Tahun Pengabdian</p>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="flex flex-col justify-center">
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-info-circle mr-2"></i>Tentang Kami
          </span>
          <h2 class="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
            Assyifa Hospital
          </h2>
          <h3 class="mt-2 text-xl text-teal-600">
            Fasilitas Kesehatan dengan Pengalaman Tak Tertandingi
          </h3>
          <div class="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Assyifa Hospital adalah fasilitas kesehatan terdaftar di bawah perusahaan terkemuka 
              <strong class="text-slate-900">'Kodungallur Assyifa Pvt Ltd.'</strong>
            </p>
            <p>
              Kami berkomitmen untuk menyediakan layanan kesehatan yang <strong class="text-slate-900">ekonomis dan komprehensif</strong>, 
              membuat perawatan medis berkualitas dapat diakses oleh semua kalangan.
            </p>
            <p>
              Dengan <strong class="text-slate-900">20+ tahun pengalaman</strong> dan tim medis profesional, 
              kami terus berinovasi untuk memberikan pelayanan terbaik bagi masyarakat.
            </p>
          </div>

          <!-- CTA -->
          <div class="mt-6 flex flex-wrap gap-4">
            <router-link to="/register" class="rounded-full bg-teal-500 px-8 py-3 font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5">
              <i class="fas fa-user-plus mr-2"></i>Daftar Sekarang
            </router-link>
            <router-link to="/#medical-checkup" class="rounded-full border border-teal-200 bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5">
              <i class="fas fa-heartbeat mr-2"></i>Medical Check Up
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== VISI & MISI ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-16">
      <div class="text-center mb-10">
        <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
          <i class="fas fa-bullseye mr-2"></i>Visi & Misi
        </span>
        <h2 class="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
          Komitmen Kami untuk <span class="text-teal-600">Kesehatan Anda</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
        <!-- Visi -->
        <div class="rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition">
          <div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600">
            <i class="fas fa-eye"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-900">Visi</h3>
          <p class="mt-3 text-slate-600 leading-relaxed">
            Menjadi rumah sakit terkemuka yang memberikan pelayanan kesehatan berkualitas tinggi, 
            inovatif, dan terjangkau bagi seluruh masyarakat Indonesia.
          </p>
        </div>

        <!-- Misi -->
        <div class="rounded-2xl bg-white p-8 shadow-lg hover:shadow-xl transition">
          <div class="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-2xl text-teal-600">
            <i class="fas fa-flag-checkered"></i>
          </div>
          <h3 class="text-xl font-bold text-slate-900">Misi</h3>
          <ul class="mt-3 space-y-2 text-slate-600 leading-relaxed">
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-teal-500"></i>
              <span>Menyediakan layanan kesehatan komprehensif dengan teknologi terkini</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-teal-500"></i>
              <span>Mengembangkan sumber daya manusia yang profesional dan berdedikasi</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-teal-500"></i>
              <span>Memberikan pelayanan yang ramah, cepat, dan tepat</span>
            </li>
            <li class="flex items-start gap-3">
              <i class="fas fa-check-circle mt-1 text-teal-500"></i>
              <span>Berkontribusi pada peningkatan kesehatan masyarakat</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- ===== NILAI-NILAI ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-16">
      <div class="text-center mb-10">
        <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
          <i class="fas fa-star mr-2"></i>Nilai Kami
        </span>
        <h2 class="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
          Prinsip yang <span class="text-teal-600">Kami Pegang</span>
        </h2>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div v-for="value in values" :key="value.title" class="rounded-2xl bg-white p-6 shadow-lg text-center hover:shadow-xl transition hover:-translate-y-1">
          <div class="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full" :class="value.bgColor">
            <i :class="[value.icon, value.iconColor]" class="text-2xl"></i>
          </div>
          <h3 class="text-lg font-bold text-slate-900">{{ value.title }}</h3>
          <p class="mt-2 text-sm text-slate-600">{{ value.description }}</p>
        </div>
      </div>
    </div>

    <!-- ===== DEPARTMENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-16">
      <div class="text-center mb-10">
        <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
          <i class="fas fa-building mr-2"></i>Departemen
        </span>
        <h2 class="mt-2 text-3xl font-bold text-slate-900 lg:text-4xl">
          Unit <span class="text-teal-600">Pelayanan</span>
        </h2>
      </div>

      <div class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="dept in departments" :key="dept.name" class="rounded-2xl bg-white p-4 text-center shadow-md hover:shadow-xl transition hover:-translate-y-1">
          <div class="mb-2 text-3xl">{{ dept.icon }}</div>
          <p class="text-sm font-semibold text-slate-900">{{ dept.name }}</p>
        </div>
      </div>
    </div>

    <!-- ===== CTA BANNER ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 mt-16 mb-16">
      <div class="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-center text-white shadow-xl">
        <h3 class="text-2xl font-bold lg:text-3xl">
          <i class="fas fa-heart mr-3"></i>
          Siap Melayani Kesehatan Anda
        </h3>
        <p class="mt-2 text-teal-100">Konsultasikan kesehatan Anda dengan tim medis profesional kami</p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <router-link to="/register" class="rounded-full bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5">
            <i class="fas fa-user-plus mr-2"></i>Daftar Sekarang
          </router-link>
          <a href="tel:1600MED" class="rounded-full border border-white/30 bg-white/10 px-8 py-3 font-semibold text-white transition hover:bg-white/20 hover:-translate-y-0.5">
            <i class="fas fa-phone mr-2"></i>Hubungi 1600-MED
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const values = [
  {
    title: 'Profesionalisme',
    description: 'Tenaga medis yang kompeten dan berdedikasi tinggi dalam memberikan pelayanan.',
    icon: 'fas fa-user-md',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Kepedulian',
    description: 'Melayani dengan hati dan empati untuk setiap pasien yang datang.',
    icon: 'fas fa-heart',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600'
  },
  {
    title: 'Inovasi',
    description: 'Terus berinovasi dengan teknologi terkini untuk pelayanan terbaik.',
    icon: 'fas fa-lightbulb',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600'
  },
  {
    title: 'Integritas',
    description: 'Menjunjung tinggi kejujuran dan transparansi dalam setiap pelayanan.',
    icon: 'fas fa-shield-alt',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Kerjasama',
    description: 'Membangun sinergi antar tim untuk hasil yang optimal.',
    icon: 'fas fa-handshake',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Kualitas',
    description: 'Memberikan pelayanan terbaik dengan standar kualitas tinggi.',
    icon: 'fas fa-award',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  }
]

const departments = [
  { name: 'Anesthesiology', icon: '💉' },
  { name: 'Cardiology', icon: '❤️' },
  { name: 'Dermatology', icon: '🧴' },
  { name: 'Emergency Medicine', icon: '🚑' },
  { name: 'ENT', icon: '👂' },
  { name: 'Gastroenterology', icon: '🫀' },
  { name: 'General Medicine', icon: '🏥' },
  { name: 'Obstetrics & Gynaecology', icon: '🤱' },
  { name: 'Orthopaedics', icon: '🦴' },
  { name: 'Paediatrics', icon: '👶' },
  { name: 'Physiotherapy', icon: '🏋️' },
  { name: 'Pulmonology', icon: '🫁' },
  { name: 'Urology', icon: '🧫' },
  { name: 'Dentistry', icon: '🦷' }
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