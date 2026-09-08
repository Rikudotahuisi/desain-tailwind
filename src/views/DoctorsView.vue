<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 160px;">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 -mt-6 pb-16">

      <!-- <div class="flex items-center gap-2 mb-6">
      <label class="flex items-center gap-2 cursor-pointer select-none whitespace-nowrap ml-auto">
          <span class="text-sm font-medium text-slate-600">Praktik hari ini saja</span>
          <span class="relative inline-flex h-6 w-11 items-center rounded-full transition" :class="onlyToday ? 'bg-teal-500' : 'bg-slate-200'" @click="onlyToday = !onlyToday">
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition" :class="onlyToday ? 'translate-x-6' : 'translate-x-1'"></span>
          </span>
        </label>
      </div> -->

      <!-- Toolbar: Filter Spesialisasi + Toggle Hari Ini -->
      <div class="mb-6 flex flex-col gap-4 border-slate-100 lg:flex-row lg:items-center lg:justify-between ">
        <div class="flex flex-wrap items-center gap-2">
          <button
            v-for="spec in ['Semua', ...specialties]"
            :key="spec"
            @click="selectedSpecialty = spec"
            class="rounded-full px-4 py-2 text-xs font-medium transition whitespace-nowrap"
            :class="[
              selectedSpecialty === spec
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
            ]"
          >
            {{ spec }}
          </button>
        </div>
      <div class="relative flex-1 max-w-sm ml-auto">
          <i class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama dokter atau spesialisasi..."
            class="w-full rounded-full border border-slate-200 py-2.5 pl-11 pr-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
      </div> 
      </div>
      

      <!-- Grid Dokter -->
      <div class="grid grid-cols-1 gap-6 items-start md:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="doctor in filteredDoctors"
          :key="doctor.id"
          class="rounded-2xl bg-white p-5 shadow-md border border-slate-100 transition-all hover:shadow-xl duration-200 hover:-translate-y-2"
        >
          <!-- Top: Photo + Info -->
          <div class="flex items-start gap-4">
            <div class="relative flex-shrink-0">
              <img :src="doctor.image" :alt="doctor.name" class="h-16 w-16 rounded-full object-cover ring-2 ring-slate-100" />
              <span
                v-if="isPracticingNow(doctor)"
                class="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-green-500 ring-2 ring-white animate-pulse"
                title="Sedang praktik"
              ></span>
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="font-bold text-slate-900 leading-tight truncate">{{ doctor.name }}</h3>
              <p class="text-sm font-medium text-teal-600">{{ doctor.specialty }}</p>
              <div class="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <span><i class="fas fa-star text-yellow-400 mr-0.5"></i>{{ doctor.rating }}</span>
                <span class="h-1 w-1 rounded-full bg-slate-300"></span>
                <span>{{ doctor.experience }} th pengalaman</span>
              </div>
              <p class="mt-0.5 text-xs text-slate-400"><i class="fas fa-door-open mr-1"></i>{{ doctor.room }}</p>
            </div>
          </div>

          <!-- Status Badge -->
          <div class="mt-4">
            <span
              v-if="isPracticingNow(doctor)"
              class="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
            >
              <span class="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Praktik Sekarang
            </span>
            <span
              v-else-if="practicesToday(doctor)"
              class="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
            >
              <i class="far fa-clock"></i>
              Praktik Hari Ini • {{ todaySlot(doctor)?.start }} - {{ todaySlot(doctor)?.end }}
            </span>
            <span
              v-else
              class="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500"
            >
              <i class="fas fa-circle text-[6px]"></i>
              Tidak Praktik Hari Ini
            </span>
          </div>

          <!-- Weekly Strip (Sen-Min), hari ini di-highlight -->
          <div class="mt-4 grid grid-cols-7 gap-1">
            <div
              v-for="d in doctor.schedule"
              :key="d.day"
              class="flex flex-col items-center rounded-lg py-1.5 text-[10px] font-medium transition"
              :class="[
                d.active ? 'bg-teal-50 text-teal-600' : 'bg-slate-50 text-slate-300',
                d.day === todayName ? 'ring-2 ring-teal-400' : ''
              ]"
            >
              {{ d.day.slice(0, 3) }}
              <i v-if="d.active" class="fas fa-check text-[8px] mt-0.5"></i>
              <i v-else class="fas fa-minus text-[8px] mt-0.5"></i>
            </div>
          </div>

          <!-- Toggle Jadwal Lengkap -->
          <button
            @click="toggleExpand(doctor.id)"
            class="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-semibold text-teal-600 transition hover:bg-teal-50"
          >
            {{ expandedIds.has(doctor.id) ? 'Sembunyikan Jadwal' : 'Lihat Jadwal Lengkap' }}
            <i class="fas fa-chevron-down transition-transform" :class="expandedIds.has(doctor.id) ? 'rotate-180' : ''"></i>
          </button>

          <!-- Detail Jadwal Lengkap (expand) -->
          <div v-if="expandedIds.has(doctor.id)" class="mt-2 space-y-1 rounded-xl bg-slate-50 p-3">
            <div
              v-for="d in doctor.schedule"
              :key="d.day"
              class="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm"
              :class="d.day === todayName ? 'bg-white shadow-sm' : ''"
            >
              <span class="font-medium" :class="d.day === todayName ? 'text-teal-600' : 'text-slate-600'">
                {{ d.day }}
              </span>
              <span v-if="d.active" class="font-semibold text-slate-700">{{ d.start }} - {{ d.end }}</span>
              <span v-else class="text-slate-400">Libur</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="mt-4 flex gap-2">
            <router-link
              :to="{ name: 'register' }"
              class="flex-1 rounded-full bg-teal-500 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
            >
              <i class="fas fa-calendar-check mr-1.5"></i>Booking
            </router-link>
            <a
              :href="`https://wa.me/6281234567890?text=${encodeURIComponent('Halo, saya ingin bertanya jadwal ' + doctor.name)}`"
              target="_blank"
              rel="noopener"
              class="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              title="Tanya via WhatsApp"
            >
              <i class="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- No Results -->
      <div v-if="filteredDoctors.length === 0" class="py-16 text-center">
        <div class="text-6xl mb-4"><i class="fas fa-user-md text-slate-300"></i></div>
        <h3 class="text-xl font-semibold text-slate-900">Dokter tidak ditemukan</h3>
        <p class="text-slate-500">Coba ubah kata kunci atau filter pencarian</p>
        <button @click="resetFilters" class="mt-4 rounded-full bg-teal-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-teal-600">
          Reset Filter
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDoctors } from '../composables/useDoctors'

const { doctors, specialties, todayName, isPracticingNow, practicesToday } = useDoctors()

// ===== STATE =====
const searchQuery = ref('')
const selectedSpecialty = ref('Semua')
const onlyToday = ref(false)
const expandedIds = ref<Set<number>>(new Set())

// Jam berjalan agar badge "Praktik Sekarang" ikut update tiap menit
const now = ref(new Date())
let timer: number | undefined
onMounted(() => {
  timer = window.setInterval(() => (now.value = new Date()), 30000)
})
onUnmounted(() => {
  if (timer) window.clearInterval(timer)
})

const currentTime = computed(() =>
  now.value.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
)

// ===== HELPERS =====
const todaySlot = (doctor: (typeof doctors.value)[number]) =>
  doctor.schedule.find(s => s.day === todayName.value && s.active)

const toggleExpand = (id: number) => {
  if (expandedIds.value.has(id)) {
    expandedIds.value.delete(id)
  } else {
    expandedIds.value.add(id)
  }
  // trigger reactivity untuk Set
  expandedIds.value = new Set(expandedIds.value)
}

// ===== COMPUTED =====
const filteredDoctors = computed(() => {
  let filtered = doctors.value

  if (selectedSpecialty.value !== 'Semua') {
    filtered = filtered.filter(d => d.specialty === selectedSpecialty.value)
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.specialty.toLowerCase().includes(query)
    )
  }

  if (onlyToday.value) {
    filtered = filtered.filter(d => practicesToday(d))
  }

  return filtered
})

const resetFilters = () => {
  searchQuery.value = ''
  selectedSpecialty.value = 'Semua'
  onlyToday.value = false
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
</style>
