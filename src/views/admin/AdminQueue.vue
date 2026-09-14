<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Antrian Pasien</h2>
        <p class="text-sm text-slate-500">Kelola nomor antrian di ASSYIFA Hospital</p>
      </div>
      <button
        @click="router.push('/admin/antrian/create')"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Antrian
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-white rounded-2xl border border-slate-200 p-5">
        <p class="text-sm text-slate-500">Antrian Hari Ini</p>
        <p class="text-2xl font-bold text-slate-900 mt-1">{{ todayBookings.length }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 p-5">
        <p class="text-sm text-slate-500">Menunggu</p>
        <p class="text-2xl font-bold text-yellow-600 mt-1">{{ countByStatus('Menunggu') }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-slate-200 p-5">
        <p class="text-sm text-slate-500">Selesai</p>
        <p class="text-2xl font-bold text-green-600 mt-1">{{ countByStatus('Selesai') }}</p>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pasien atau nomor antrian..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterPoliklinik"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Poliklinik</option>
          <option v-for="poli in poliklinikList" :key="poli" :value="poli">{{ poli }}</option>
        </select>
        <select
          v-model="filterStatus"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Status</option>
          <option value="Menunggu">Menunggu</option>
          <option value="Selesai">Selesai</option>
          <option value="Dibatalkan">Dibatalkan</option>
        </select>
        <input
          v-model="filterDate"
          type="date"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">No. Antrian</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Pasien</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Poliklinik</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Dokter</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Jadwal</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="booking in filteredBookings" :key="booking.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <span class="font-bold text-teal-600">{{ booking.nomorAntrian }}</span>
              </td>
              <td class="py-3 px-4">
                <p class="font-medium text-slate-900">{{ booking.pasien.namaPasien }}</p>
                <p class="text-xs text-slate-500">{{ booking.pasien.noHp }}</p>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ booking.poliklinik }}</td>
              <td class="py-3 px-4 text-slate-600">{{ booking.dokterNama }}</td>
              <td class="py-3 px-4 text-slate-600">
                {{ formatTanggal(booking.tanggal) }}<br />
                <span class="text-xs text-slate-400">{{ booking.hari }}, {{ booking.jam }}</span>
              </td>
              <td class="py-3 px-4">
                <select
                  :value="booking.status"
                  @change="updateBookingStatus(booking.id, ($event.target as HTMLSelectElement).value as any)"
                  class="text-xs font-medium rounded-full px-2.5 py-1 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  :class="statusClass(booking.status)"
                >
                  <option value="Menunggu">Menunggu</option>
                  <option value="Selesai">Selesai</option>
                  <option value="Dibatalkan">Dibatalkan</option>
                </select>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="router.push(`/admin/antrian/edit/${booking.id}`)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="handleDelete(booking.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredBookings.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-clipboard-list"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada antrian</h3>
        <p class="text-sm text-slate-500">Belum ada nomor antrian yang cocok dengan filter ini</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useQueue } from '../../composables/useQueue'

const router = useRouter()
const { bookings, poliklinikList, updateBookingStatus, deleteBooking, todayDateString } = useQueue()

const searchQuery = ref('')
const filterPoliklinik = ref('')
const filterStatus = ref('')
const filterDate = ref('')

// "Antrian Hari Ini" tetap dibatasi ke tanggal hari ini saja.
const todayBookings = computed(() => {
  const today = todayDateString()
  return bookings.value.filter((b) => b.tanggal === today)
})

// "Menunggu" dan "Selesai" menghitung SEMUA antrian (bukan cuma hari ini),
// biar tetap kelihatan meski belum ada antrian yang jadwalnya hari ini.
const countByStatus = (status: string) =>
  bookings.value.filter((b) => b.status === status).length

const filteredBookings = computed(() => {
  let filtered = [...bookings.value].sort((a, b) => (a.tanggal + a.jam).localeCompare(b.tanggal + b.jam))

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter(
      (b) =>
        b.pasien.namaPasien.toLowerCase().includes(q) ||
        b.nomorAntrian.toLowerCase().includes(q)
    )
  }
  if (filterPoliklinik.value) {
    filtered = filtered.filter((b) => b.poliklinik === filterPoliklinik.value)
  }
  if (filterStatus.value) {
    filtered = filtered.filter((b) => b.status === filterStatus.value)
  }
  if (filterDate.value) {
    filtered = filtered.filter((b) => b.tanggal === filterDate.value)
  }
  return filtered
})

function formatTanggal(tanggal: string) {
  return new Date(tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

function statusClass(status: string) {
  if (status === 'Selesai') return 'bg-green-100 text-green-700'
  if (status === 'Dibatalkan') return 'bg-red-100 text-red-700'
  return 'bg-yellow-100 text-yellow-700'
}

function handleDelete(id: string) {
  if (confirm('Apakah Anda yakin ingin menghapus antrian ini?')) {
    deleteBooking(id)
  }
}
</script>