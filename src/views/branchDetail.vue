<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// Data dummy cabang
const branches = [
  {
    id: 1,
    name: 'Assyifa Hospital Palu',
    city: 'Palu',
    province: 'Sulawesi Tengah',
    address: 'Jl. Ahmad Yani No. 25, Palu, Sulawesi Tengah',
    phone: '0451-123456',
    email: 'palu@assyifahospital.com',
    hours: 'Senin - Minggu, 08:00 - 21:00',
    emergency: '24 Jam',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80',
    maps: 'https://maps.google.com/',
    description:
      'Assyifa Hospital Palu merupakan salah satu cabang Assyifa Hospital yang menyediakan berbagai layanan kesehatan untuk masyarakat. Kami berkomitmen memberikan pelayanan kesehatan yang aman, nyaman, dan profesional.',
    facilities: [
      'Instalasi Gawat Darurat',
      'Poliklinik',
      'Laboratorium',
      'Radiologi',
      'Apotek',
      'Rawat Inap',
      'Ruang Operasi',
      'Ambulans',
    ],
    services: [
      'Dokter Umum',
      'Dokter Spesialis',
      'Medical Check Up',
      'Laboratorium',
      'Radiologi',
      'Konsultasi Kesehatan',
    ],
  },

  {
    id: 2,
    name: 'Assyifa Hospital Makassar',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    address: 'Jl. Sultan Alauddin No. 10, Makassar',
    phone: '0411-654321',
    email: 'makassar@assyifahospital.com',
    hours: 'Senin - Minggu, 08:00 - 21:00',
    emergency: '24 Jam',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
    maps: 'https://maps.google.com/',
    description:
      'Assyifa Hospital Makassar menyediakan layanan kesehatan terpadu dengan fasilitas yang mendukung kebutuhan pasien dan keluarga.',
    facilities: [
      'Instalasi Gawat Darurat',
      'Poliklinik',
      'Laboratorium',
      'Apotek',
      'Rawat Inap',
      'Ambulans',
    ],
    services: [
      'Dokter Umum',
      'Dokter Spesialis',
      'Medical Check Up',
      'Laboratorium',
      'Konsultasi Kesehatan',
    ],
  },

  {
    id: 3,
    name: 'Assyifa Hospital Jakarta',
    city: 'Jakarta',
    province: 'DKI Jakarta',
    address: 'Jl. Sudirman No. 100, Jakarta',
    phone: '021-987654',
    email: 'jakarta@assyifahospital.com',
    hours: 'Senin - Minggu, 08:00 - 21:00',
    emergency: '24 Jam',
    image:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1600&q=80',
    maps: 'https://maps.google.com/',
    description:
      'Assyifa Hospital Jakarta menyediakan berbagai layanan kesehatan dengan dukungan tenaga medis dan fasilitas kesehatan yang lengkap.',
    facilities: [
      'Instalasi Gawat Darurat',
      'Poliklinik',
      'Laboratorium',
      'Radiologi',
      'Apotek',
      'Rawat Inap',
    ],
    services: [
      'Dokter Umum',
      'Dokter Spesialis',
      'Medical Check Up',
      'Laboratorium',
      'Radiologi',
    ],
  },
]

// Ambil ID dari URL
const branchId = computed(() => Number(route.params.id))

// Cari cabang berdasarkan ID
const branch = computed(() => {
  return branches.find((item) => item.id === branchId.value)
})

// Kembali ke halaman cabang
const backToBranch = () => {
  router.push('/branch')
}
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- Jika cabang ditemukan -->
    <template v-if="branch">

      <!-- HERO -->
      <section class="relative overflow-hidden bg-slate-950">

        <div class="relative h-[480px]">

          <img
            :src="branch.image"
            :alt="branch.name"
            class="absolute inset-0 h-full w-full object-cover"
          />

          <!-- Overlay -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20"
          ></div>

          <div
            class="relative mx-auto flex h-full max-w-7xl items-center px-6 lg:px-10"
          >
            <div class="max-w-3xl text-white">

              <!-- Back -->
              <button
                @click="backToBranch"
                class="mb-7 flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white"
              >
                <i class="fas fa-arrow-left"></i>
                Kembali ke Cabang
              </button>

              <!-- Location -->
              <div
                class="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-md"
              >
                <i class="fas fa-location-dot text-teal-300"></i>
                {{ branch.city }}, {{ branch.province }}
              </div>

              <!-- Title -->
              <h1
                class="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl"
              >
                {{ branch.name }}
              </h1>

              <p
                class="mt-5 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
              >
                {{ branch.description }}
              </p>

            </div>
          </div>
        </div>
      </section>

      <!-- QUICK INFORMATION -->
      <section class="relative mx-auto -mt-10 max-w-7xl px-6 lg:px-10">

        <div
          class="grid overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl sm:grid-cols-2 lg:grid-cols-4"
        >

          <!-- Address -->
          <div class="flex gap-4 border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
            >
              <i class="fas fa-location-dot"></i>
            </div>

            <div>
              <p class="text-xs font-medium text-slate-400">
                Alamat
              </p>

              <p class="mt-1 text-sm font-medium leading-5 text-slate-700">
                {{ branch.address }}
              </p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex gap-4 border-b border-slate-100 p-6 lg:border-b-0 lg:border-r">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
            >
              <i class="fas fa-phone"></i>
            </div>

            <div>
              <p class="text-xs font-medium text-slate-400">
                Telepon
              </p>

              <p class="mt-1 text-sm font-medium text-slate-700">
                {{ branch.phone }}
              </p>
            </div>
          </div>

          <!-- Hours -->
          <div class="flex gap-4 border-b border-slate-100 p-6 sm:border-b-0 lg:border-r">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
            >
              <i class="fas fa-clock"></i>
            </div>

            <div>
              <p class="text-xs font-medium text-slate-400">
                Jam Operasional
              </p>

              <p class="mt-1 text-sm font-medium text-slate-700">
                {{ branch.hours }}
              </p>
            </div>
          </div>

          <!-- Emergency -->
          <div class="flex gap-4 p-6">
            <div
              class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500"
            >
              <i class="fas fa-truck-medical"></i>
            </div>

            <div>
              <p class="text-xs font-medium text-slate-400">
                IGD
              </p>

              <p class="mt-1 text-sm font-semibold text-red-500">
                {{ branch.emergency }}
              </p>
            </div>
          </div>

        </div>
      </section>

      <!-- MAIN CONTENT -->
      <section class="mx-auto max-w-7xl px-6 py-16 lg:px-10">

        <div class="grid gap-10 lg:grid-cols-3">

          <!-- LEFT CONTENT -->
          <div class="lg:col-span-2">

            <!-- Tentang Cabang -->
            <div class="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">

              <span
                class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600"
              >
                Tentang Cabang
              </span>

              <h2
                class="mt-3 text-3xl font-bold text-slate-900"
              >
                Informasi {{ branch.city }}
              </h2>

              <p
                class="mt-5 leading-8 text-slate-600"
              >
                {{ branch.description }}
              </p>

              <p class="mt-4 leading-8 text-slate-600">
                Kami menyediakan berbagai layanan kesehatan dengan dukungan
                tenaga medis profesional serta fasilitas yang dirancang untuk
                memberikan kenyamanan kepada pasien.
              </p>
            </div>


            <!-- FASILITAS -->
            <div
              class="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
            >

              <span
                class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600"
              >
                Fasilitas
              </span>

              <h2
                class="mt-3 text-3xl font-bold text-slate-900"
              >
                Fasilitas Rumah Sakit
              </h2>

              <div
                class="mt-7 grid gap-4 sm:grid-cols-2"
              >

                <div
                  v-for="facility in branch.facilities"
                  :key="facility"
                  class="flex items-center gap-3 rounded-2xl bg-slate-50 p-4"
                >
                  <div
                    class="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-100 text-teal-600"
                  >
                    <i class="fas fa-check"></i>
                  </div>

                  <span class="text-sm font-medium text-slate-700">
                    {{ facility }}
                  </span>
                </div>

              </div>
            </div>


            <!-- LAYANAN -->
            <div
              class="mt-8 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
            >

              <span
                class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600"
              >
                Layanan
              </span>

              <h2
                class="mt-3 text-3xl font-bold text-slate-900"
              >
                Layanan Kesehatan
              </h2>

              <div
                class="mt-7 grid gap-4 sm:grid-cols-2"
              >

                <div
                  v-for="service in branch.services"
                  :key="service"
                  class="flex items-center gap-3 rounded-2xl border border-slate-100 p-4 transition hover:border-teal-200 hover:bg-teal-50"
                >
                  <i class="fas fa-stethoscope text-teal-500"></i>

                  <span class="text-sm font-medium text-slate-700">
                    {{ service }}
                  </span>
                </div>

              </div>
            </div>

          </div>


          <!-- RIGHT SIDEBAR -->
          <aside>

            <div
              class="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >

              <h3 class="text-xl font-bold text-slate-900">
                Kunjungi Kami
              </h3>

              <p class="mt-2 text-sm leading-6 text-slate-500">
                Temukan lokasi {{ branch.name }} melalui Google Maps.
              </p>

              <!-- MAP -->
              <div
                class="mt-6 flex h-56 items-center justify-center overflow-hidden rounded-2xl bg-slate-100"
              >
                <div class="text-center">

                  <div
                    class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg"
                  >
                    <i class="fas fa-location-dot text-xl"></i>
                  </div>

                  <p class="mt-3 text-sm font-semibold text-slate-700">
                    {{ branch.city }}
                  </p>

                  <p class="mt-1 text-xs text-slate-400">
                    {{ branch.address }}
                  </p>

                </div>
              </div>

              <!-- MAP BUTTON -->
              <a
                :href="branch.maps"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                <i class="fas fa-map-location-dot"></i>
                Buka Google Maps
              </a>

              <!-- PHONE -->
              <a
                :href="`tel:${branch.phone}`"
                class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
              >
                <i class="fas fa-phone"></i>
                Hubungi Cabang
              </a>

              <!-- EMAIL -->
              <div
                class="mt-6 border-t border-slate-100 pt-6"
              >
                <p class="text-xs text-slate-400">
                  Email
                </p>

                <p class="mt-1 break-all text-sm font-medium text-slate-700">
                  {{ branch.email }}
                </p>
              </div>

            </div>

          </aside>

        </div>
      </section>


      <!-- CTA -->
      <section class="mx-auto max-w-7xl px-6 pb-16 lg:px-10">

        <div
          class="rounded-3xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center shadow-xl sm:px-12"
        >

          <h2 class="text-3xl font-bold text-white">
            Butuh Pelayanan Kesehatan?
          </h2>

          <p
            class="mx-auto mt-3 max-w-2xl text-teal-50"
          >
            Jadwalkan kunjungan Anda dan dapatkan pelayanan kesehatan
            dari tenaga medis profesional kami.
          </p>

          <div class="mt-7 flex flex-wrap justify-center gap-3">

            <router-link
              to="/registration"
              class="rounded-full bg-white px-7 py-3.5 font-semibold text-teal-700 transition hover:bg-slate-100"
            >
              Daftar Sekarang
            </router-link>

            <button
              @click="backToBranch"
              class="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Lihat Cabang Lain
            </button>

          </div>

        </div>

      </section>

    </template>


    <!-- Jika ID tidak ditemukan -->
    <template v-else>

      <section
        class="flex min-h-screen items-center justify-center px-6"
      >

        <div class="text-center">

          <div
            class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          >
            <i class="fas fa-location-dot text-3xl text-slate-400"></i>
          </div>

          <h1
            class="mt-6 text-3xl font-bold text-slate-900"
          >
            Cabang Tidak Ditemukan
          </h1>

          <p class="mt-3 text-slate-500">
            Data cabang yang Anda cari tidak tersedia.
          </p>

          <button
            @click="backToBranch"
            class="mt-7 rounded-full bg-teal-500 px-7 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            Kembali ke Daftar Cabang
          </button>

        </div>

      </section>

    </template>

  </div>
</template>