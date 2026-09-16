<script setup lang="ts">
import { ref } from 'vue'

const branches = ref([
  {
    id: 1,
    name: 'Assyifa Hospital Palu',
    city: 'Palu',
    province: 'Sulawesi Tengah',
    address: 'Jl. Ahmad Yani No. 25, Palu',
    phone: '0451-123456',
    email: 'palu@assyifahospital.com',
    hours: 'Senin - Minggu, 08:00 - 21:00',
    image:
      'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80',
    maps: 'https://maps.google.com/',
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
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    maps: 'https://maps.google.com/',
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
    image:
      'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80',
    maps: 'https://maps.google.com/',
  },
])
</script>

<template>
  <div class="min-h-screen bg-slate-50">

    <!-- HERO -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-900"
    >
      <div
        class="absolute inset-0 opacity-20"
        style="
          background-image:
            radial-gradient(circle at 20% 20%, white 1px, transparent 1px);
          background-size: 30px 30px;
        "
      ></div>

      <div
        class="relative mx-auto flex min-h-[430px] max-w-7xl items-center px-6 py-20 lg:px-10"
      >
        <div class="max-w-3xl">

          <!-- LABEL -->
          <div
            class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur"
          >
            <span class="h-2 w-2 rounded-full bg-teal-400"></span>
            Assyifa Hospital
          </div>

          <!-- TITLE -->
          <h1
            class="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Temukan Cabang
            <span class="text-teal-400"> Assyifa Hospital</span>
          </h1>

          <!-- DESCRIPTION -->
          <p
            class="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg"
          >
            Temukan lokasi rumah sakit Assyifa Hospital terdekat dan dapatkan
            berbagai layanan kesehatan terbaik untuk Anda dan keluarga.
          </p>

          <!-- BUTTON -->
          <div class="mt-8 flex flex-wrap gap-4">
            <a
              href="#cabang"
              class="rounded-full bg-teal-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-400"
            >
              Lihat Cabang
            </a>

            <a
              href="/kontak"
              class="rounded-full border border-white/30 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- CABANG -->
    <section id="cabang" class="mx-auto max-w-7xl px-6 py-16 lg:px-10">

      <!-- SECTION HEADER -->
      <div class="mb-10 text-center">
        <span
          class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-600"
        >
          Lokasi Kami
        </span>

        <h2
          class="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
        >
          Cabang Assyifa Hospital
        </h2>

        <p class="mx-auto mt-4 max-w-2xl text-slate-600">
          Pilih cabang Assyifa Hospital yang ingin Anda kunjungi.
        </p>
      </div>

      <!-- SEARCH -->
      <div class="mx-auto mb-10 max-w-xl">
        <div
          class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
        >
          <svg
            class="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
            />
          </svg>

          <input
            type="text"
            placeholder="Cari cabang atau kota..."
            class="w-full border-0 bg-transparent text-sm text-slate-700 outline-none focus:ring-0"
          />
        </div>
      </div>

      <!-- CARD CABANG -->
      <div
        class="grid gap-7 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="branch in branches"
          :key="branch.id"
          class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >

          <!-- IMAGE -->
          <div class="relative h-56 overflow-hidden">
            <img
              :src="branch.image"
              :alt="branch.name"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <!-- OVERLAY -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
            ></div>

            <!-- CITY -->
            <div class="absolute bottom-4 left-5">
              <span
                class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur"
              >
                {{ branch.city }}
              </span>
            </div>
          </div>

          <!-- CONTENT -->
          <div class="p-6">

            <!-- NAME -->
            <h3 class="text-xl font-bold text-slate-900">
              {{ branch.name }}
            </h3>

            <p class="mt-1 text-sm text-teal-600">
              {{ branch.province }}
            </p>

            <!-- INFO -->
            <div class="mt-5 space-y-3">

              <!-- ADDRESS -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">
                    Alamat
                  </p>

                  <p class="text-sm leading-5 text-slate-600">
                    {{ branch.address }}
                  </p>
                </div>
              </div>

              <!-- PHONE -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 0 1 2-2h2.3a2 2 0 0 1 1.94 1.52l.54 2.17a2 2 0 0 1-.45 1.84L7.9 9.96a16 16 0 0 0 6.14 6.14l1.43-1.43a2 2 0 0 1 1.84-.45l2.17.54A2 2 0 0 1 21 16.7V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">
                    Telepon
                  </p>

                  <p class="text-sm text-slate-600">
                    {{ branch.phone }}
                  </p>
                </div>
              </div>

              <!-- HOURS -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke-width="2"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M12 7v5l3 2"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">
                    Jam Operasional
                  </p>

                  <p class="text-sm text-slate-600">
                    {{ branch.hours }}
                  </p>
                </div>
              </div>
            </div>

            <!-- BUTTON -->
            <div class="mt-6 flex gap-3">

              <a
                :href="branch.maps"
                target="_blank"
                class="flex-1 rounded-xl bg-teal-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Lihat Maps
              </a>

              <router-link
                :to="{ name: 'branch-Detail', params: { id: branch.id } }"
                class="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
            >
                Detail
              </router-link>

            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- CTA -->
    <section class="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
      <div
        class="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 to-teal-500 px-8 py-12 text-center shadow-xl sm:px-12"
      >
        <h2 class="text-3xl font-bold text-white">
          Butuh Informasi Lebih Lanjut?
        </h2>

        <p class="mx-auto mt-3 max-w-2xl text-teal-50">
          Hubungi kami untuk mendapatkan informasi mengenai layanan,
          jadwal dokter, dan fasilitas di setiap cabang.
        </p>

        <a
          href="/kontak"
          class="mt-7 inline-flex rounded-full bg-white px-7 py-3.5 font-semibold text-teal-700 transition hover:bg-slate-100"
        >
          Hubungi Kami
        </a>
      </div>
    </section>

  </div>
</template>