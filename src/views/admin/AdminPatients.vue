<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-xl font-bold text-slate-900">Data Pasien</h2>
      <button class="rounded-xl bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600">
        <i class="fas fa-plus mr-2"></i>Tambah Pasien
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-slate-200">
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Nama</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Email</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Telepon</th>
            <th class="text-left py-3 px-2 font-semibold text-slate-600">Status</th>
            <th class="text-right py-3 px-2 font-semibold text-slate-600">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in patients" :key="patient.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
            <td class="py-3 px-2">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="patient.color">
                  {{ patient.name.charAt(0) }}
                </div>
                <span class="font-medium text-slate-700">{{ patient.name }}</span>
              </div>
            </td>
            <td class="py-3 px-2 text-slate-600">{{ patient.email }}</td>
            <td class="py-3 px-2 text-slate-600">{{ patient.phone }}</td>
            <td class="py-3 px-2">
              <span class="px-2 py-1 rounded-full text-xs" :class="patient.statusClass">
                {{ patient.status }}
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
const patients = [
  { id: 1, name: 'Budi Santoso', email: 'budi@email.com', phone: '0812-3456-7890', status: 'Aktif', color: 'bg-blue-500', statusClass: 'bg-green-100 text-green-700' },
  { id: 2, name: 'Siti Rahayu', email: 'siti@email.com', phone: '0813-4567-8901', status: 'Aktif', color: 'bg-amber-500', statusClass: 'bg-green-100 text-green-700' },
  { id: 3, name: 'Agus Wijaya', email: 'agus@email.com', phone: '0814-5678-9012', status: 'Nonaktif', color: 'bg-green-500', statusClass: 'bg-red-100 text-red-700' },
]
</script>