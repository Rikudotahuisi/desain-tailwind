<template>
  <div class="max-w-2xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="router.push('/admin/schedules')" class="text-slate-400 hover:text-slate-600 transition">
        <i class="fas fa-arrow-left text-lg"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEditMode ? 'Edit Jadwal' : 'Tambah Jadwal' }}
        </h2>
        <p class="text-sm text-slate-500">Jadwal dokter untuk tanggal tertentu</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Dokter <span class="text-red-500">*</span>
        </label>
        <select
          v-model.number="form.doctorId"
          required
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="" disabled>Pilih dokter</option>
          <option v-for="doctor in doctors" :key="doctor.id" :value="doctor.id">
            {{ doctor.name }} — {{ doctor.specialty }}
          </option>
        </select>
      </div>

      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Tanggal <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.date"
          type="date"
          required
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      <div class="grid grid-cols-2 gap-5">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Jam Mulai <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.startTime"
            type="time"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Jam Selesai <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.endTime"
            type="time"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div class="flex items-center gap-3">
        <input
          id="active"
          v-model="form.active"
          type="checkbox"
          class="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500/20"
        />
        <label for="active" class="text-sm font-medium text-slate-700">Jadwal aktif</label>
      </div>

      <p v-if="errorMsg" class="text-sm text-red-500">{{ errorMsg }}</p>

      <div class="flex items-center gap-3 pt-2">
        <button
          type="submit"
          class="rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
        >
          <i class="fas fa-check mr-2"></i>{{ isEditMode ? 'Simpan Perubahan' : 'Simpan' }}
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
import { useSchedule } from '../../composables/useSchedule'

const router = useRouter()
const route = useRoute()
const { doctors } = useDoctors()
const { getScheduleById, addSchedule, updateSchedule } = useSchedule()

const editId = route.params.id as string | undefined
const isEditMode = computed(() => !!editId)
const errorMsg = ref('')

const form = ref({
  doctorId: '' as number | '',
  date: '',
  startTime: '',
  endTime: '',
  active: true,
})

function handleSubmit() {
  errorMsg.value = ''
  if (form.value.startTime >= form.value.endTime) {
    errorMsg.value = 'Jam selesai harus lebih besar dari jam mulai.'
    return
  }

  const doctor = doctors.value.find((d) => d.id === form.value.doctorId)
  const payload = {
    doctorId: form.value.doctorId as number,
    doctorName: doctor?.name || '',
    date: form.value.date,
    startTime: form.value.startTime,
    endTime: form.value.endTime,
    active: form.value.active,
  }

  if (isEditMode.value && editId) {
    updateSchedule(editId, payload)
  } else {
    addSchedule(payload)
  }
  router.push('/admin/schedules')
}

onMounted(() => {
  if (isEditMode.value && editId) {
    const existing = getScheduleById(editId)
    if (existing) {
      form.value = {
        doctorId: existing.doctorId,
        date: existing.date,
        startTime: existing.startTime,
        endTime: existing.endTime,
        active: existing.active,
      }
    }
  }
})
</script>