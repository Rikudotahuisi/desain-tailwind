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
        <option value="Aktif">Aktif</option>
        <option value="Libur">Libur</option>
        <option value="Tidak Aktif">Tidak Aktif</option>
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
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Hari Aktif</th>
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Jam Praktek</th>
            <th class="text-left py-3.5 px-6 font-semibold text-slate-600">Status</th>
            <th class="text-right py-3.5 px-6 font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in doctorScheduleList" :key="item.id" class="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition">
            <td class="py-4 px-6">
              <div class="flex items-center gap-3">
                <img
                  v-if="item.image && !imageErrors.has(item.id)"
                  :src="item.image"
                  :alt="item.name"
                  class="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-white shadow-sm"
                  @error="imageErrors.add(item.id)"
                />
                <div
                  v-else
                  class="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ring-2 ring-white shadow-sm"
                  :class="item.color"
                >
                  {{ getInitials(item.name) }}
                </div>
                <div>
                  <p class="font-medium text-slate-800">{{ item.name }}</p>
                  <p class="text-xs text-slate-400">{{ item.specialty }}</p>
                </div>
              </div>
            </td>
            <td class="py-4 px-6">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="s in item.activeDays"
                  :key="s.id"
                  class="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-600"
                  :title="`${s.startTime} - ${s.endTime}`"
                >
                  {{ s.day.slice(0, 3) }}
                </span>
                <span v-if="!item.activeDays.length" class="text-xs text-slate-400">Belum diatur</span>
              </div>
            </td>
            <td class="py-4 px-6">
              <div class="flex flex-wrap gap-1">
                <span
                  v-for="s in item.activeDays"
                  :key="s.id"
                  class="rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                >
                  {{ s.startTime }} - {{ s.endTime }}
                </span>
                <span v-if="!item.activeDays.length" class="text-xs text-slate-400">Belum diatur</span>
              </div>
            </td>
            <td class="py-4 px-6">
              <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="statusClass(item.status)">
                {{ item.status }}
              </span>
            </td>
            <td class="py-4 px-6 text-right">
              <button @click="router.push(`/admin/schedules/edit/${item.id}`)" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-teal-600 hover:bg-teal-50 transition">
                <i class="fas fa-edit"></i>
              </button>
              <button
                v-if="item.activeDays.length"
                @click="handleDeleteSchedule(item.id)"
                class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-red-500 hover:bg-red-50 transition"
                title="Hapus semua jadwal dokter ini"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="doctorScheduleList.length === 0" class="py-10 text-center text-slate-400 text-sm">
      Tidak ada dokter yang cocok dengan filter ini.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSchedule } from '../../composables/useSchedule'
import { useDoctors, statusClass } from '../../composables/useDoctors'

const router = useRouter()
const { getSchedulesForDoctor, deleteSchedule } = useSchedule()
const { doctors, specialties } = useDoctors()

const searchQuery = ref('')
const filterSpecialty = ref('')
const filterStatus = ref('')
const imageErrors = ref(new Set<number>())

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

// Satu baris per dokter: chip "Hari Aktif" ditarik dari useSchedule, "Status" dari useDoctors
const doctorScheduleList = computed(() => {
  let filtered = doctors.value

  if (searchQuery.value) {
    const q = searchQuery.value.trim().toLowerCase()
    filtered = filtered.filter((d) => d.name.toLowerCase().includes(q))
  }
  if (filterSpecialty.value) {
    filtered = filtered.filter((d) => d.specialty === filterSpecialty.value)
  }
  if (filterStatus.value) {
    filtered = filtered.filter((d) => d.status === filterStatus.value)
  }

  return filtered.map((doctor) => ({
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    image: doctor.image,
    color: doctor.color,
    status: doctor.status,
    activeDays: getSchedulesForDoctor(doctor.id).filter((s) => s.active),
  }))
})

function handleDeleteSchedule(doctorId: number) {
  if (confirm('Hapus seluruh jadwal praktek dokter ini?')) {
    getSchedulesForDoctor(doctorId).forEach((entry) => deleteSchedule(entry.id))
  }
}
</script>