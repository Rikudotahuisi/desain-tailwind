<template>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Kelola Jadwal</h2>
        <p class="text-sm text-slate-500">Kelola jadwal praktek dokter di ASSYIFA Hospital</p>
      </div>
    </div>
    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari dokter..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterSpecialty"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Spesialis</option>
          <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
        </select>
      </div>
    </div>
   <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    
     
      
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-slate-900">Jadwal Praktek</h2>
      <div class="flex items-center gap-2">
        <button @click="router.push('/admin/schedules/create')" class="rounded-xl border border-teal-500 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50">
          <i class="fas fa-calendar-plus mr-2"></i>Tambah Jadwal
        </button>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Dokter</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Tanggal</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Jam</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Status</th>
            <th class="text-right py-3 px-2 font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in scheduleList" :key="item.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="py-3 px-2">
              <div class="flex items-center gap-3">
                <img
                  v-if="item.image && !imageErrors.has(item.id)"
                  :src="item.image"
                  :alt="item.doctor"
                  class="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  @error="imageErrors.add(item.id)"
                />
                <div
                  v-else
                  class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0"
                  :class="item.color"
                >
                  {{ getInitials(item.doctor) }}
                </div>
                <div>
                  <p class="font-medium text-slate-700">{{ item.doctor }}</p>
                  <p class="text-xs text-slate-400">{{ item.specialty }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-2 text-slate-600">{{ item.date }}</td>
            <td class="py-3 px-2 text-slate-600">{{ item.time }}</td>
            <td class="py-3 px-2">
              <span class="px-2 py-1 rounded-full text-xs" :class="item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'">
                {{ item.active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="py-3 px-2 text-right">
              <button @click="router.push(`/admin/schedules/edit-tanggal/${item.id}`)" class="text-teal-600 hover:text-teal-700 mr-2">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="handleDelete(item.id)" class="text-red-500 hover:text-red-600">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="scheduleList.length === 0" class="py-10 text-center text-slate-400 text-sm">
      Belum ada jadwal.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSchedule } from '../../composables/useSchedule'
import { useDoctors } from '../../composables/useDoctors'

const router = useRouter()
const { schedules, deleteSchedule } = useSchedule()
const { getDoctorById, specialties } = useDoctors()

const searchQuery = ref('')
const filterSpecialty = ref('')
const imageErrors = ref(new Set<string>())

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getInitials(name: string) {
  return name
    .replace(/^dr\.?\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const scheduleList = computed(() =>
  [...schedules.value]
    .filter((s) => {
      const doctor = getDoctorById(s.doctorId)
      const matchSearch = s.doctorName.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
      const matchSpecialty = !filterSpecialty.value || doctor?.specialty === filterSpecialty.value
      return matchSearch && matchSpecialty
    })
    .sort((a, b) => (b.date + b.startTime).localeCompare(a.date + a.startTime))
    .map((s) => {
      const doctor = getDoctorById(s.doctorId)
      return {
        id: s.id,
        doctor: s.doctorName,
        specialty: doctor?.specialty ?? '',
        image: doctor?.image ?? '',
        color: doctor?.color ?? 'bg-slate-400',
        date: formatTanggal(s.date),
        time: `${s.startTime} - ${s.endTime}`,
        active: s.active,
      }
    })
)

function handleDelete(id: string) {
  if (confirm('Apakah Anda yakin ingin menghapus jadwal ini?')) {
    deleteSchedule(id)
  }
}
</script>