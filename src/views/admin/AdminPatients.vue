<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Data Pasien</h2>
        <p class="text-sm text-slate-500">Kelola data pasien di ASSYIFA Hospital</p>
      </div>
      <button
        @click="router.push('/admin/patients/create')"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Pasien
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pasien..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterStatus"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Nonaktif">Nonaktif</option>
          <option value="Menunggu">Menunggu</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Pasien</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Email</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Telepon</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Tanggal Daftar</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredPatients" :key="patient.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="patient.color">
                    {{ patient.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900">{{ patient.name }}</p>
                    <p class="text-xs text-slate-500">ID: PAT-{{ String(patient.id).padStart(4, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ patient.email }}</td>
              <td class="py-3 px-4 text-slate-600">{{ patient.phone }}</td>
              <td class="py-3 px-4 text-slate-600">{{ patient.registerDate }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="statusClass(patient.status)">
                  {{ patient.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="router.push(`/admin/patients/edit/${patient.id}`)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="handleDelete(patient.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredPatients.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-users"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada pasien</h3>
        <p class="text-sm text-slate-500">Belum ada data pasien yang terdaftar</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePatients, statusClass } from '../../composables/usePatients'

const router = useRouter()
const { patients, deletePatient } = usePatients()

const searchQuery = ref('')
const filterStatus = ref('')

const filteredPatients = computed(() => {
  let filtered = patients.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query) ||
        p.phone.includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter((p) => p.status === filterStatus.value)
  }

  return filtered
})

const handleDelete = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
    deletePatient(id)
  }
}
</script>