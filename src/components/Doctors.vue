<template>
  <section id="doctors" class="scroll-mt-20 py-20 bg-slate-50">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <!-- Header -->
      <div class="mb-12 flex flex-wrap items-end justify-between">
        <div>
          <div class="inline-flex items-center gap-3 rounded-full bg-teal-50 px-4 py-2">
            <span class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
            <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
              <i class="fas fa-user-md mr-2"></i>Tim Dokter
            </span>
          </div>
          <h2 class="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
            Jadwal Praktek <br class="hidden lg:block" />
            <span class="text-teal-600">Dokter Spesialis</span>
          </h2>
          <p class="mt-2 text-lg text-slate-600">
            Konsultasikan kesehatan Anda dengan dokter spesialis berpengalaman di bidangnya.
          </p>
        </div>
        <router-link
          :to="{ name: 'register' }"
          class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
        >
          <i class="fas fa-calendar-plus mr-2"></i>Booking Online
        </router-link>
      </div>

      <!-- Filter / Search -->
      <div class="mb-8 flex flex-wrap items-center gap-4">
        <div class="flex-1 min-w-[200px]">
          <div class="relative">
            <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari dokter atau spesialisasi..."
              class="w-full rounded-full border border-slate-200 py-3 pl-11 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in ['Semua', ...specialties]"
            :key="filter"
            @click="selectedFilter = filter"
            class="rounded-full px-4 py-2 text-sm font-medium transition"
            :class="[
              selectedFilter === filter
                ? 'bg-teal-500 text-white'
                : 'bg-white text-slate-600 hover:bg-teal-50'
            ]"
          >
            {{ filter }}
          </button>
        </div>
      </div>

      <!-- Doctors Grid -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Doctor Image -->
          <div class="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
            <img :src="doctor.image" :alt="doctor.name" class="h-full w-full object-cover" />
            <div class="absolute inset-0 rounded-full bg-teal-500/0 transition-colors group-hover:bg-teal-500/10"></div>
            <div v-if="isPracticingNow(doctor)" class="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white animate-pulse"></div>
          </div>

          <!-- Doctor Info -->
          <h3 class="mt-4 text-center text-lg font-bold text-slate-900">{{ doctor.name }}</h3>
          <p class="text-center text-sm font-medium text-teal-600">{{ doctor.specialty }}</p>

          <!-- Schedule -->
          <div class="mt-4 rounded-xl bg-slate-50 p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-slate-700">
                <i class="far fa-calendar-alt mr-2 text-teal-500"></i>Jadwal Praktek
              </span>
              <span v-if="isPracticingNow(doctor)" class="text-xs font-semibold text-green-600">
                <i class="fas fa-circle text-[6px] mr-1"></i>Praktik Sekarang
              </span>
              <span v-else-if="practicesToday(doctor)" class="text-xs font-semibold text-amber-600">
                <i class="fas fa-circle text-[6px] mr-1"></i>Hari Ini
              </span>
              <span v-else class="text-xs font-semibold text-slate-400">
                <i class="fas fa-circle text-[6px] mr-1"></i>Libur
              </span>
            </div>
            <div class="mt-2 space-y-1 text-sm text-slate-600">
              <div v-for="schedule in activeSchedule(doctor)" :key="schedule.day" class="flex justify-between">
                <span>{{ schedule.day }}</span>
                <span class="font-medium">{{ schedule.start }} - {{ schedule.end }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex gap-2">
            <router-link
              :to="{ name: 'register' }"
              class="flex-1 rounded-full bg-teal-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
            >
              <i class="fas fa-calendar-check mr-2"></i>Booking
            </router-link>
            <router-link
              :to="{ name: 'doctors' }"
              class="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5"
            >
              <i class="fas fa-info-circle"></i>
            </router-link>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredDoctors.length === 0" class="py-12 text-center">
        <div class="text-6xl mb-4"><i class="fas fa-search text-slate-300"></i></div>
        <h3 class="text-xl font-semibold text-slate-900">Dokter tidak ditemukan</h3>
        <p class="text-slate-500">Coba dengan kata kunci yang berbeda</p>
      </div>

      <!-- View All -->
      <div class="mt-12 text-center">
        <router-link
          :to="{ name: 'doctors' }"
          class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5"
        >
          Lihat Semua Jadwal Dokter
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDoctors } from '../composables/useDoctors'

const { doctors, specialties, isPracticingNow, practicesToday } = useDoctors()

const searchQuery = ref('')
const selectedFilter = ref('Semua')

const activeSchedule = (doctor: (typeof doctors.value)[number]) =>
  doctor.schedule.filter(s => s.active)

const filteredDoctors = computed(() => {
  let filtered = doctors.value

  if (selectedFilter.value !== 'Semua') {
    filtered = filtered.filter(d => d.specialty === selectedFilter.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.specialty.toLowerCase().includes(query)
    )
  }

  return filtered.slice(0, 4)
})
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
