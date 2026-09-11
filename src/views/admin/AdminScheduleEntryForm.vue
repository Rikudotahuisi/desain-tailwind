<template>
  <div class="max-w-2xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="router.push('/admin/schedules')" class="text-slate-400 hover:text-slate-600 transition">
        <i class="fas fa-arrow-left text-lg"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEditMode ? 'Edit Jadwal Dokter' : 'Tambah Jadwal Dokter' }}
        </h2>
        <p class="text-sm text-slate-500">Atur jadwal praktek mingguan dokter</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <!-- Dokter -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Dokter <span class="text-red-500">*</span>
        </label>
        <select
          v-model.number="selectedDoctorId"
          required
          :disabled="isEditMode"
          @change="loadDoctorSchedule"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <option value="" disabled>Pilih dokter</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} — {{ doctor.specialty }}
          </option>
        </select>
      </div>

      <!-- Jadwal Praktek Mingguan -->
      <div v-if="selectedDoctorId">
        <label class="mb-2 block text-sm font-semibold text-slate-700">
          Jadwal Praktek Mingguan
        </label>
        <div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <div
            v-for="d in weekSchedule"
            :key="d.day"
            class="flex flex-wrap items-center gap-3 px-4 py-2.5"
            :class="d.active ? 'bg-teal-50/40' : 'bg-white'"
          >
            <label class="flex items-center gap-2 w-28 flex-shrink-0 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="d.active"
                class="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
              />
              <span class="text-sm font-medium text-slate-700">{{ d.day }}</span>
            </label>
            <template v-if="d.active">
              <input
                type="time"
                v-model="d.start"
                class="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm"
              />
              <span class="text-slate-400 text-sm">s/d</span>
              <input
                type="time"
                v-model="d.end"
                class="rounded-lg border border-slate-200 px-2.5 py-1.5 text-sm"
              />
            </template>
            <span v-else class="text-xs text-slate-400">Libur</span>
          </div>
        </div>
      </div>
      <p v-else class="text-sm text-slate-400 italic">Pilih dokter dulu untuk mengatur jadwal mingguannya.</p>

      <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>

      <div class="flex items-center gap-3 pt-2">
        <button
          type="submit"
          :disabled="!selectedDoctorId"
          class="rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <i class="fas fa-check mr-2"></i>Simpan Jadwal
        </button>
        <button
          type="button"
          @click="router.push('/admin/schedules')"
          class="rounded-xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
        >
          Batal
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDoctors } from '../../composables/useDoctors'
import { useSchedule, DAYS } from '../../composables/useSchedule'

const router = useRouter()
const route = useRoute()
const { doctors } = useDoctors()
const { getSchedulesForDoctor, addSchedule, updateSchedule, deleteSchedule } = useSchedule()

// Mode edit ditentukan dari route param, sekarang berupa doctorId (bukan id 1 entry jadwal)
const editDoctorId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const isEditMode = computed(() => editDoctorId.value !== null)

const selectedDoctorId = ref<number | ''>('')
const selectedStatus = ref('')
const errorMsg = ref('')

interface DaySlot {
  day: string
  active: boolean
  start: string
  end: string
}

function emptyWeek(): DaySlot[] {
  return DAYS.map((day) => ({ day, active: false, start: '08:00', end: '16:00' }))
}

const weekSchedule = ref<DaySlot[]>(emptyWeek())

// Ambil jadwal dokter yang sudah ada di useSchedule, isikan ke checklist 7 hari
function loadDoctorSchedule() {
  const fresh = emptyWeek()
  if (!selectedDoctorId.value) {
    weekSchedule.value = fresh
    return
  }
  const existing = getSchedulesForDoctor(selectedDoctorId.value as number)
  weekSchedule.value = fresh.map((slot) => {
    const found = existing.find((e) => e.day === slot.day)
    return found ? { day: slot.day, active: found.active, start: found.startTime, end: found.endTime } : slot
  })
}

onMounted(() => {
  if (isEditMode.value && editDoctorId.value !== null) {
    selectedDoctorId.value = editDoctorId.value
    loadDoctorSchedule()
  }
})

function handleSubmit() {
  errorMsg.value = ''

  if (!selectedDoctorId.value) {
    errorMsg.value = 'Pilih dokter terlebih dahulu.'
    return
  }

  const invalidDay = weekSchedule.value.find((d) => d.active && d.start >= d.end)
  if (invalidDay) {
    errorMsg.value = `Jam selesai hari ${invalidDay.day} harus lebih besar dari jam mulai.`
    return
  }

  const doctorId = selectedDoctorId.value as number
  const doctor = doctors.value.find((d) => d.id === doctorId)
  const existing = getSchedulesForDoctor(doctorId)

  // Sinkronkan tiap hari: aktif -> tambah/update, nonaktif -> hapus entry lama (kalau ada)
  weekSchedule.value.forEach((slot) => {
    const found = existing.find((e) => e.day === slot.day)

    if (!slot.active) {
      if (found) deleteSchedule(found.id)
      return
    }

    const payload = {
      doctorId,
      doctorName: doctor?.name || '',
      day: slot.day,
      startTime: slot.start,
      endTime: slot.end,
      active: true,
    }

    if (found) {
      updateSchedule(found.id, payload)
    } else {
      addSchedule(payload)
    }
  })

  router.push('/admin/schedules')
}
</script>