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
        <a href="#" class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5">
          <i class="fas fa-calendar-plus mr-2"></i>Booking Online
        </a>
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
            v-for="filter in filters" 
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
          :key="doctor.name" 
          class="group rounded-2xl bg-white p-6 shadow-lg transition-all hover:-translate-y-2 hover:shadow-2xl"
        >
          <!-- Doctor Image -->
          <div class="relative mx-auto h-32 w-32 overflow-hidden rounded-full">
            <img :src="doctor.image" :alt="doctor.name" class="h-full w-full object-cover" />
            <div class="absolute inset-0 rounded-full bg-teal-500/0 transition-colors group-hover:bg-teal-500/10"></div>
            <div v-if="doctor.available" class="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white"></div>
          </div>

          <!-- Doctor Info -->
          <h3 class="mt-4 text-center text-lg font-bold text-slate-900">{{ doctor.name }}</h3>
          <p class="text-center text-sm font-medium text-teal-600">{{ doctor.specialty }}</p>
          
          <!-- Rating & Experience -->
          <div class="mt-2 flex items-center justify-center gap-3 text-sm text-slate-500">
            <span class="flex items-center gap-1">
              <i class="fas fa-star text-yellow-400"></i>
              {{ doctor.rating }}
            </span>
            <span class="h-1 w-1 rounded-full bg-slate-300"></span>
            <span><i class="far fa-clock mr-1"></i>{{ doctor.experience }} tahun</span>
            <span class="h-1 w-1 rounded-full bg-slate-300"></span>
            <span><i class="fas fa-user mr-1"></i>{{ doctor.patients }}</span>
          </div>

          <!-- Schedule -->
          <div class="mt-4 rounded-xl bg-slate-50 p-4">
            <div class="flex items-center justify-between text-sm">
              <span class="font-medium text-slate-700">
                <i class="far fa-calendar-alt mr-2 text-teal-500"></i>Jadwal Praktek
              </span>
              <span v-if="doctor.available" class="text-xs font-semibold text-green-600">
                <i class="fas fa-circle text-[6px] mr-1"></i>Tersedia
              </span>
              <span v-else class="text-xs font-semibold text-red-500">
                <i class="fas fa-circle text-[6px] mr-1"></i>Libur
              </span>
            </div>
            <div class="mt-2 space-y-1 text-sm text-slate-600">
              <div v-for="schedule in doctor.schedule" :key="schedule.day" class="flex justify-between">
                <span>{{ schedule.day }}</span>
                <span class="font-medium">{{ schedule.time }}</span>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 flex gap-2">
            <button class="flex-1 rounded-full bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5">
              <i class="fas fa-calendar-check mr-2"></i>Booking
            </button>
            <button class="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:-translate-y-0.5">
              <i class="fas fa-info-circle"></i>
            </button>
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
        <a href="#" class="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5">
          Lihat Semua Dokter
          <i class="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedFilter = ref('Semua')

const filters = ['Semua', 'Jantung', 'Kandungan', 'Anak', 'Penyakit Dalam',]

const doctors = [
  {
    name: 'dr. Andi Pratama, Sp.JP',
    specialty: 'Spesialis Jantung',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
    rating: 4.9,
    experience: 12,
    patients: '1.250',
    available: true,
    schedule: [
      { day: 'Senin', time: '08:00 - 14:00' },
      { day: 'Rabu', time: '10:00 - 16:00' },
      { day: 'Jumat', time: '08:00 - 12:00' }
    ]
  },
  {
    name: 'dr. Siti Rahayu, Sp.OG',
    specialty: 'Spesialis Kandungan',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
    rating: 4.8,
    experience: 10,
    patients: '980',
    available: true,
    schedule: [
      { day: 'Selasa', time: '09:00 - 15:00' },
      { day: 'Kamis', time: '08:00 - 14:00' },
      { day: 'Sabtu', time: '08:00 - 12:00' }
    ]
  },
  {
    name: 'dr. Budi Santoso, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 4.7,
    experience: 15,
    patients: '2.100',
    available: false,
    schedule: [
      { day: 'Senin', time: '10:00 - 16:00' },
      { day: 'Rabu', time: '08:00 - 14:00' }
    ]
  },
  {
    name: 'dr. Maya Sari, Sp.A',
    specialty: 'Spesialis Anak',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    rating: 4.9,
    experience: 8,
    patients: '850',
    available: true,
    schedule: [
      { day: 'Senin', time: '08:00 - 12:00' },
      { day: 'Selasa', time: '13:00 - 17:00' },
      { day: 'Kamis', time: '08:00 - 14:00' }
    ]
  },
]

const filteredDoctors = computed(() => {
  let filtered = doctors

  if (selectedFilter.value !== 'Semua') {
    filtered = filtered.filter(doctor => {
      if (selectedFilter.value === 'Jantung') return doctor.specialty.includes('Jantung')
      if (selectedFilter.value === 'Kandungan') return doctor.specialty.includes('Kandungan')
      if (selectedFilter.value === 'Anak') return doctor.specialty.includes('Anak')
      if (selectedFilter.value === 'Penyakit Dalam') return doctor.specialty.includes('Penyakit Dalam')
      return true
    })
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(doctor => 
      doctor.name.toLowerCase().includes(query) ||
      doctor.specialty.toLowerCase().includes(query)
    )
  }

  return filtered
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