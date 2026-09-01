<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-slate-900">Data Dokter</h2>
      <button class="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600">
        <i class="fas fa-plus mr-2"></i>Tambah Dokter
      </button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="doctor in doctors" :key="doctor.id" class="border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" :class="doctor.color">
            {{ doctor.name.charAt(0) }}
          </div>
          <div>
            <p class="font-medium text-slate-900">{{ doctor.name }}</p>
            <p class="text-xs text-slate-500">{{ doctor.specialty }}</p>
          </div>
        </div>
        <div class="mt-3 flex items-center justify-between text-sm">
          <span class="text-slate-500">{{ doctor.patients }} pasien</span>
          <span class="px-2 py-1 rounded-full text-xs" :class="doctor.statusClass">{{ doctor.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const doctors = [
  { id: 1, name: 'dr. Andi Pratama, Sp.JP', specialty: 'Spesialis Jantung', patients: 1250, status: 'Aktif', color: 'bg-blue-500', statusClass: 'bg-green-100 text-green-700' },
  { id: 2, name: 'dr. Siti Rahayu, Sp.OG', specialty: 'Spesialis Kandungan', patients: 980, status: 'Aktif', color: 'bg-amber-500', statusClass: 'bg-green-100 text-green-700' },
  { id: 3, name: 'dr. Maya Sari, Sp.A', specialty: 'Spesialis Anak', patients: 850, status: 'Libur', color: 'bg-green-500', statusClass: 'bg-yellow-100 text-yellow-700' },
]
</script>