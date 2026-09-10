<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h2 class="text-2xl font-bold text-slate-900">Kelola Jadwal</h2>
      <p class="text-sm text-slate-500">Kelola jadwal praktek dokter di ASSYIFA Hospital</p>
    </div>
    <button
      @click="router.push('/admin/schedules/create')"
      class="flex items-center gap-2 rounded-xl bg-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
    >
      <i class="fas fa-plus"></i>Tambah Jadwal
    </button>
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
        <option value="">Semua Spesialisasi</option>
        <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
      </select>
      <select
        v-model="filterStatus"
        class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      >
        <option value="">Semua Status</option>
        <option value="active">Aktif</option>
        <option value="inactive">Nonaktif</option>
      </select>
    </div>
  </div>

  <!-- Table -->
  <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200">
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Dokter</th>
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Tanggal</th>
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Jam</th>
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Status</th>
            <th class="text-right py-3.5 px-6 font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in scheduleList" :key="item.id" class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <img
                  v-if="item.image && !imageErrors.has(item.id)"
                  :src="item.image"
                  :alt="item.doctor"
                  class="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                  @error="imageErrors.add(item.id)"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ring-2 ring-white shadow-sm"
                  :class="item.color"
                >
                  {{ getInitials(item.doctor) }}
                </div>
                <div>
                  <p class="font-medium text-slate-800">{{ item.doctor }}</p>
                  <p class="text-xs text-slate-400">{{ item.specialty }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6 text-slate-600">{{ item.date }}</td>
            <td class="py-4 px-6">
              <span class="inline-flex items-center rounded-lg bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                {{ item.time }}
              </span>
            </td>
            <td class="py-4 px-6">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="item.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'">
                {{ item.active ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="py-4 px-6 text-right">
              <button @click="router.push(`/admin/schedules/edit/${item.id}`)" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-teal-600 hover:bg-teal-50 transition">
                <i class="fas fa-edit"></i>
              </button>
              <button @click="handleDelete(item.id)" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition">
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
const filterStatus = ref('')
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
      const matchStatus =
        !filterStatus.value ||
        (filterStatus.value === 'active' && s.active) ||
        (filterStatus.value === 'inactive' && !s.active)
      return matchSearch && matchSpecialty && matchStatus
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