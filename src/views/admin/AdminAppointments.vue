<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-slate-900">Jadwal Praktek</h2>
      <button class="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600">
        <i class="fas fa-plus mr-2"></i>Buat Jadwal
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Pasien</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Dokter</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Tanggal</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Jam</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Status</th>
            <th class="text-right py-3 px-2 font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="py-3 px-2 font-medium text-slate-700">{{ appointment.patient }}</td>
            <td class="py-3 px-2 text-slate-600">{{ appointment.doctor }}</td>
            <td class="py-3 px-2 text-slate-600">{{ appointment.date }}</td>
            <td class="py-3 px-2 text-slate-600">{{ appointment.time }}</td>
            <td class="py-3 px-2">
              <span class="px-2 py-1 rounded-full text-xs" :class="appointment.statusClass">
                {{ appointment.status }}
              </span>
            </td>
            <td class="py-3 px-2 text-right">
              <button class="text-teal-600 hover:text-teal-700 mr-2"><i class="fas fa-edit"></i></button>
              <button class="text-red-500 hover:text-red-600"><i class="fas fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const appointments = [
  { id: 1, patient: 'Budi Santoso', doctor: 'dr. Andi Pratama, Sp.JP', date: '2 Sept 2026', time: '08:00', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
  { id: 2, patient: 'Siti Rahayu', doctor: 'dr. Maya Sari, Sp.A', date: '2 Sept 2026', time: '09:30', status: 'Menunggu', statusClass: 'bg-yellow-100 text-yellow-700' },
  { id: 3, patient: 'Agus Wijaya', doctor: 'dr. Budi Santoso, Sp.PD', date: '1 Sept 2026', time: '11:00', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
  { id: 4, patient: 'Dewi Lestari', doctor: 'dr. Siti Rahayu, Sp.OG', date: '1 Sept 2026', time: '13:30', status: 'Batal', statusClass: 'bg-red-100 text-red-700' },
  { id: 5, patient: 'Eko Prasetyo', doctor: 'dr. Andi Pratama, Sp.JP', date: '2 Sept 2026', time: '15:00', status: 'Menunggu', statusClass: 'bg-yellow-100 text-yellow-700' },
]
</script>