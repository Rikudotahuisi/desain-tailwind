<template>
  <div>
    <!-- Stats Cards -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500">{{ stat.label }}</p>
            <p class="text-2xl font-bold text-slate-900 mt-1">{{ stat.value }}</p>
            <p class="text-xs mt-1" :class="stat.change >= 0 ? 'text-green-600' : 'text-red-600'">
              <i :class="stat.change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"></i>
              {{ Math.abs(stat.change) }}% dari bulan lalu
            </p>
          </div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center" :class="stat.bgColor">
            <i :class="[stat.icon, stat.iconColor]" class="text-xl"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 gap-6 mt-6 lg:grid-cols-2">
      <!-- Recent Appointments -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-900">Jadwal Terbaru</h3>
          <router-link to="/admin/appointments" class="text-sm text-teal-600 hover:underline">Lihat semua</router-link>
        </div>
        <div class="space-y-3">
          <div v-for="appointment in recentAppointments" :key="appointment.id" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
            <div class="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold" :class="appointment.color">
              {{ appointment.patient.charAt(0) }}
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">{{ appointment.patient }}</p>
              <p class="text-xs text-slate-500">{{ appointment.doctor }} • {{ appointment.date }}</p>
            </div>
            <span class="text-xs px-2 py-1 rounded-full" :class="appointment.statusClass">
              {{ appointment.status }}
            </span>
          </div>
        </div>
      </div>

      <!-- Today's Schedule -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold text-slate-900">Jadwal Hari Ini</h3>
          <span class="text-sm text-slate-500">{{ today }}</span>
        </div>
        <div class="space-y-3">
          <div v-for="schedule in todaySchedule" :key="schedule.time" class="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition">
            <div class="w-16 text-sm font-medium text-slate-600 pt-0.5">{{ schedule.time }}</div>
            <div class="flex-1">
              <p class="text-sm font-medium text-slate-900">{{ schedule.patient }}</p>
              <p class="text-xs text-slate-500">{{ schedule.doctor }}</p>
            </div>
            <span class="text-xs px-2 py-1 rounded-full" :class="schedule.statusClass">
              {{ schedule.status }}
            </span>
          </div>
          <div v-if="todaySchedule.length === 0" class="text-center py-8 text-slate-400">
            <i class="fas fa-calendar-day text-3xl mb-2 block"></i>
            <p class="text-sm">Tidak ada jadwal hari ini</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Statistics Table -->
    <div class="mt-6 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-bold text-slate-900">Statistik Bulanan</h3>
        <select class="text-sm border border-slate-200 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-teal-500/20">
          <option>2026</option>
          <option>2025</option>
        </select>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="text-left py-3 px-2 font-semibold text-slate-600">Bulan</th>
              <th class="text-right py-3 px-2 font-semibold text-slate-600">Pasien</th>
              <th class="text-right py-3 px-2 font-semibold text-slate-600">Dokter</th>
              <th class="text-right py-3 px-2 font-semibold text-slate-600">Jadwal</th>
              <th class="text-right py-3 px-2 font-semibold text-slate-600">Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="stat in monthlyStats" :key="stat.month" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-2 font-medium text-slate-700">{{ stat.month }}</td>
              <td class="text-right py-3 px-2 text-slate-600">{{ stat.patients }}</td>
              <td class="text-right py-3 px-2 text-slate-600">{{ stat.doctors }}</td>
              <td class="text-right py-3 px-2 text-slate-600">{{ stat.appointments }}</td>
              <td class="text-right py-3 px-2 font-medium text-teal-600">Rp {{ stat.revenue }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const today = new Date().toLocaleDateString('id-ID', { 
  weekday: 'long', 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
})

const stats = [
  { 
    label: 'Total Pasien', 
    value: '2,847', 
    change: 12.5, 
    icon: 'fas fa-users', 
    bgColor: 'bg-blue-50', 
    iconColor: 'text-blue-600' 
  },
  { 
    label: 'Dokter Aktif', 
    value: '48', 
    change: 8.2, 
    icon: 'fas fa-user-md', 
    bgColor: 'bg-teal-50', 
    iconColor: 'text-teal-600' 
  },
  { 
    label: 'Jadwal Hari Ini', 
    value: '23', 
    change: -3.1, 
    icon: 'fas fa-calendar-check', 
    bgColor: 'bg-amber-50', 
    iconColor: 'text-amber-600' 
  },
  { 
    label: 'Pendapatan Bulan Ini', 
    value: 'Rp 456M', 
    change: 18.7, 
    icon: 'fas fa-money-bill-wave', 
    bgColor: 'bg-green-50', 
    iconColor: 'text-green-600' 
  }
]

const recentAppointments = [
  { 
    id: 1, 
    patient: 'Budi Santoso', 
    doctor: 'dr. Andi Pratama, Sp.JP', 
    date: '2 September 2026', 
    status: 'Selesai',
    color: 'bg-blue-500',
    statusClass: 'bg-green-100 text-green-700'
  },
  { 
    id: 2, 
    patient: 'Siti Rahayu', 
    doctor: 'dr. Maya Sari, Sp.A', 
    date: '2 September 2026', 
    status: 'Menunggu',
    color: 'bg-amber-500',
    statusClass: 'bg-yellow-100 text-yellow-700'
  },
  { 
    id: 3, 
    patient: 'Agus Wijaya', 
    doctor: 'dr. Budi Santoso, Sp.PD', 
    date: '1 September 2026', 
    status: 'Selesai',
    color: 'bg-green-500',
    statusClass: 'bg-green-100 text-green-700'
  },
  { 
    id: 4, 
    patient: 'Dewi Lestari', 
    doctor: 'dr. Siti Rahayu, Sp.OG', 
    date: '1 September 2026', 
    status: 'Batal',
    color: 'bg-red-500',
    statusClass: 'bg-red-100 text-red-700'
  }
]

const todaySchedule = [
  { time: '08:00', patient: 'Rina Wati', doctor: 'dr. Andi Pratama, Sp.JP', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
  { time: '09:30', patient: 'Dedi Kurniawan', doctor: 'dr. Maya Sari, Sp.A', status: 'Selesai', statusClass: 'bg-green-100 text-green-700' },
  { time: '11:00', patient: 'Sari Mulyani', doctor: 'dr. Budi Santoso, Sp.PD', status: 'Menunggu', statusClass: 'bg-yellow-100 text-yellow-700' },
  { time: '13:30', patient: 'Eko Prasetyo', doctor: 'dr. Siti Rahayu, Sp.OG', status: 'Menunggu', statusClass: 'bg-yellow-100 text-yellow-700' },
  { time: '15:00', patient: 'Ani Susanti', doctor: 'dr. Andi Pratama, Sp.JP', status: 'Menunggu', statusClass: 'bg-yellow-100 text-yellow-700' },
]

const monthlyStats = [
  { month: 'Januari', patients: 245, doctors: 42, appointments: 520, revenue: '89.5M' },
  { month: 'Februari', patients: 268, doctors: 44, appointments: 548, revenue: '94.2M' },
  { month: 'Maret', patients: 290, doctors: 45, appointments: 580, revenue: '102.8M' },
  { month: 'April', patients: 312, doctors: 46, appointments: 610, revenue: '110.5M' },
  { month: 'Mei', patients: 335, doctors: 47, appointments: 645, revenue: '118.3M' },
  { month: 'Juni', patients: 358, doctors: 48, appointments: 680, revenue: '125.7M' },
]
</script>