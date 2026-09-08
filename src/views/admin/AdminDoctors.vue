<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Data Dokter</h2>
        <p class="text-sm text-slate-500">Kelola data & jadwal praktek dokter di ASSYIFA Hospital</p>
      </div>
      <button
        @click="goToCreate"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Dokter
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
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Dokter</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Spesialisasi</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Kontak</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Jadwal Aktif</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in filteredDoctors" :key="doctor.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <img :src="doctor.image" :alt="doctor.name" class="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                  <div>
                    <p class="font-medium text-slate-900">{{ doctor.name }}</p>
                    <p class="text-xs text-slate-500">ID: DOC-{{ String(doctor.id).padStart(4, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="text-slate-600">{{ doctor.specialty }}</span>
              </td>
              <td class="py-3 px-4 text-slate-600">
                <p>{{ doctor.email }}</p>
                <p class="text-xs text-slate-400">{{ doctor.phone }}</p>
              </td>
              <td class="py-3 px-4 text-slate-600">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="d in doctor.schedule.filter(s => s.active)"
                    :key="d.day"
                    class="rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-medium text-teal-600"
                  >
                    {{ d.day.slice(0, 3) }}
                  </span>
                  <span v-if="!doctor.schedule.some(s => s.active)" class="text-xs text-slate-400">Belum diatur</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="statusClass(doctor.status)">
                  {{ doctor.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="goToEdit(doctor.id)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="removeDoctor(doctor.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredDoctors.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-user-md"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada dokter</h3>
        <p class="text-sm text-slate-500">Belum ada data dokter yang terdaftar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDoctors, statusClass } from '../../composables/useDoctors'

const router = useRouter()
const { doctors, specialties, deleteDoctor } = useDoctors()

// ===== STATE =====
const searchQuery = ref('')
const filterSpecialty = ref('')
const filterStatus = ref('')

// ===== COMPUTED =====
const filteredDoctors = computed(() => {
  let filtered = doctors.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d =>
      d.name.toLowerCase().includes(query) ||
      d.specialty.toLowerCase().includes(query) ||
      d.email.toLowerCase().includes(query)
    )
  }

  if (filterSpecialty.value) {
    filtered = filtered.filter(d => d.specialty === filterSpecialty.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(d => d.status === filterStatus.value)
  }

  return filtered
})

// ===== NAVIGASI KE HALAMAN BARU (bukan modal) =====
const goToCreate = () => {
  router.push({ name: 'admin-doctors-create' })
}

const goToEdit = (id: number) => {
  router.push({ name: 'admin-doctors-edit', params: { id } })
}

// ===== HAPUS DOKTER =====
const removeDoctor = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
    deleteDoctor(id)
    alert('🗑️ Dokter berhasil dihapus!')
  }
}
</script>
