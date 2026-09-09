<template>
  <div class="max-w-3xl">
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button @click="router.push('/admin/antrian')" class="text-slate-400 hover:text-slate-600 transition">
        <i class="fas fa-arrow-left text-lg"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEditMode ? 'Edit Antrian' : 'Tambah Antrian Baru' }}
        </h2>
        <p class="text-sm text-slate-500">
          {{ isEditMode ? 'Perbarui data antrian pasien' : 'Buat nomor antrian secara manual' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Poliklinik -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Poliklinik <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.poliklinik"
            required
            @change="onPoliklinikChange"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="" disabled>Pilih poliklinik</option>
            <option v-for="poli in poliklinikList" :key="poli" :value="poli">{{ poli }}</option>
          </select>
        </div>

        <!-- Dokter -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Dokter <span class="text-red-500">*</span>
          </label>
          <select
            v-model.number="form.dokterId"
            required
            :disabled="!form.poliklinik"
            @change="onDoctorChange"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
          >
            <option value="" disabled>Pilih dokter</option>
            <option v-for="doctor in doctorsForSelectedPoli" :key="doctor.id" :value="doctor.id">
              {{ doctor.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Tanggal -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Tanggal <span class="text-red-500">*</span>
          </label>
          <select
            v-model="selectedDateOption"
            required
            :disabled="!form.dokterId"
            @change="onDateChange"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
          >
            <option value="" disabled>Pilih tanggal</option>
            <option v-for="d in dateOptions" :key="d.date" :value="d.date">{{ d.label }}</option>
          </select>
        </div>

        <!-- Jam -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Jam <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.jam"
            required
            :disabled="!form.tanggal"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 disabled:opacity-50"
          >
            <option value="" disabled>Pilih jam</option>
            <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Nama Pasien -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Nama Pasien <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.pasien.namaPasien"
            type="text"
            required
            placeholder="Nama pasien"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Nomor HP -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">Nomor HP</label>
          <input
            v-model="form.pasien.noHp"
            type="text"
            placeholder="0812-3456-7890"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Nama Akun / Email -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
          <input
            v-model="form.pasien.email"
            type="email"
            placeholder="email@contoh.com"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Status -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Status <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.status"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="Menunggu">Menunggu</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      <!-- Preview nomor antrian -->
      <div v-if="!isEditMode && form.poliklinik" class="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-700">
        <i class="fas fa-info-circle mr-1.5"></i>
        Nomor antrian akan dibuat otomatis untuk poliklinik <strong>{{ form.poliklinik }}</strong> pada tanggal yang dipilih.
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-2">
        <button
          type="submit"
          class="rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
        >
          <i class="fas fa-check mr-2"></i>{{ isEditMode ? 'Simpan Perubahan' : 'Buat Antrian' }}
        </button>
        <button
          type="button"
          @click="router.push('/admin/antrian')"
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
import { useQueue } from '../../composables/useQueue'

const router = useRouter()
const route = useRoute()
const { doctors } = useDoctors()
const {
  poliklinikList,
  getScheduleDatesForDoctor,
  getTimeSlotsForDoctor,
  getBookingById,
  addManualBooking,
  updateBooking,
} = useQueue()

const editId = route.params.id as string | undefined
const isEditMode = computed(() => !!editId)
const selectedDateOption = ref('')

const form = ref({
  poliklinik: '',
  dokterId: '' as number | '',
  dokterNama: '',
  tanggal: '',
  hari: '',
  jam: '',
  status: 'Menunggu' as 'Menunggu' | 'Selesai' | 'Dibatalkan',
  pasien: { nama: '', email: '', noHp: '', namaPasien: '' },
})

const doctorsForSelectedPoli = computed(() =>
  doctors.value.filter((d) => d.specialty === form.value.poliklinik)
)

const selectedDoctor = computed(() =>
  doctors.value.find((d) => d.id === form.value.dokterId) || null
)

const dateOptions = computed(() => getScheduleDatesForDoctor(selectedDoctor.value, 10))
const timeOptions = computed(() => getTimeSlotsForDoctor(selectedDoctor.value, form.value.hari))

function onPoliklinikChange() {
  form.value.dokterId = ''
  form.value.dokterNama = ''
  resetJadwal()
}

function onDoctorChange() {
  form.value.dokterNama = selectedDoctor.value?.name || ''
  resetJadwal()
}

function onDateChange() {
  const found = dateOptions.value.find((d) => d.date === selectedDateOption.value)
  form.value.tanggal = found?.date || ''
  form.value.hari = found?.day || ''
  form.value.jam = ''
}

function resetJadwal() {
  selectedDateOption.value = ''
  form.value.tanggal = ''
  form.value.hari = ''
  form.value.jam = ''
}

function handleSubmit() {
  const payload = {
    poliklinik: form.value.poliklinik,
    dokterId: form.value.dokterId as number,
    dokterNama: form.value.dokterNama,
    tanggal: form.value.tanggal,
    hari: form.value.hari,
    jam: form.value.jam,
    pasien: { ...form.value.pasien },
    status: form.value.status,
  }

  if (isEditMode.value && editId) {
    updateBooking(editId, payload)
  } else {
    addManualBooking(payload)
  }
  router.push('/admin/antrian')
}

onMounted(() => {
  if (isEditMode.value && editId) {
    const existing = getBookingById(editId)
    if (existing) {
      form.value = {
        poliklinik: existing.poliklinik,
        dokterId: existing.dokterId,
        dokterNama: existing.dokterNama,
        tanggal: existing.tanggal,
        hari: existing.hari,
        jam: existing.jam,
        status: existing.status,
        pasien: { ...existing.pasien },
      }
      selectedDateOption.value = existing.tanggal
    }
  }
})
</script>