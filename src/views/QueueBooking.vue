<template>
  <div class="min-h-screen bg-gray-50 py-10 px-4" style="padding-top: 4rem; padding-bottom: 4rem;">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl font-bold text-gray-800 mb-2 text-center">Ambil Nomor Antrian</h1>
      <p class="text-gray-500 text-center mb-8">RS ASSYIFA</p>

      <!-- Step indicator -->
      <div class="flex items-center justify-between mb-10">
        <template v-for="(label, idx) in steps" :key="idx">
          <div class="flex flex-col items-center flex-1">
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors"
              :class="stepClass(idx + 1)"
            >
              <span v-if="currentStep > idx + 1">✓</span>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span class="text-xs mt-2 text-center text-gray-500 hidden sm:block">{{ label }}</span>
          </div>
          <div
            v-if="idx < steps.length - 1"
            class="flex-1 h-0.5 mx-1 mb-5"
            :class="currentStep > idx + 1 ? 'bg-teal-500' : 'bg-gray-200'"
          ></div>
        </template>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <!-- Tahap 1: Pilih Poliklinik -->
        <div v-if="currentStep === 1">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Pilih Poliklinik</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              v-for="poli in poliklinikList"
              :key="poli"
              @click="selectPoliklinik(poli)"
              class="p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-sm font-medium text-gray-700 transition-colors"
            >
              {{ poli }}
            </button>
          </div>
          <p v-if="poliklinikList.length === 0" class="text-gray-400 text-sm">
            Belum ada data poliklinik.
          </p>
        </div>

        <!-- Tahap 2: Pilih Dokter -->
        <div v-else-if="currentStep === 2">
          <button @click="prevStep" class="text-sm text-gray-400 hover:text-gray-600 mb-4">← Kembali</button>
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Pilih Dokter — <span class="text-teal-600">{{ selectedPoliklinik }}</span>
          </h2>
          <div class="space-y-3">
            <button
              v-for="doctor in doctorsInPoliklinik"
              :key="doctor.id"
              @click="selectDoctor(doctor.id)"
              class="w-full flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-left transition-colors"
            >
              <img
                v-if="doctor.image"
                :src="doctor.image"
                class="w-12 h-12 rounded-full object-cover"
                alt=""
              />
              <div v-else class="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 font-semibold">
                {{ doctor.name?.charAt(0) }}
              </div>
              <div>
                <p class="font-medium text-gray-800">{{ doctor.name }}</p>
                <p class="text-sm text-gray-500">{{ doctor.specialty }}</p>
              </div>
            </button>
          </div>
          <p v-if="doctorsInPoliklinik.length === 0" class="text-gray-400 text-sm">
            Belum ada dokter di poliklinik ini.
          </p>
        </div>

        <!-- Tahap 3: Pilih Hari & Jadwal -->
        <div v-else-if="currentStep === 3">
          <button @click="prevStep" class="text-sm text-gray-400 hover:text-gray-600 mb-4">← Kembali</button>
          <h2 class="text-lg font-semibold text-gray-800 mb-4">
            Pilih Hari & Jadwal — <span class="text-teal-600">{{ selectedDoctor?.name }}</span>
          </h2>

          <p class="text-sm font-medium text-gray-600 mb-2">Tanggal</p>
          <div class="flex gap-2 overflow-x-auto pb-2 mb-5">
            <button
              v-for="d in availableDates"
              :key="d.date"
              @click="selectDate(d.date, d.day)"
              class="flex-shrink-0 px-4 py-2 rounded-lg border text-sm whitespace-nowrap transition-colors"
              :class="selectedDate === d.date
                ? 'bg-teal-500 border-teal-500 text-white'
                : 'border-gray-200 text-gray-600 hover:border-teal-400'"
            >
              {{ d.label }}
            </button>
          </div>

          <template v-if="selectedDate">
            <p class="text-sm font-medium text-gray-600 mb-2">Jam Praktik</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <button
                v-for="time in availableTimes"
                :key="time"
                @click="selectTime(time)"
                class="px-4 py-2 rounded-lg border border-gray-200 hover:border-teal-500 hover:bg-teal-50 text-sm text-gray-700 transition-colors"
              >
                {{ time }}
              </button>
            </div>
            <p v-if="availableTimes.length === 0" class="text-gray-400 text-sm">
              Tidak ada jadwal tersedia di hari ini.
            </p>
          </template>
        </div>

        <!-- Tahap 4: Data Pasien -->
        <div v-else-if="currentStep === 4">
          <button @click="prevStep" class="text-sm text-gray-400 hover:text-gray-600 mb-4">← Kembali</button>
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Data Pasien</h2>

          <form @submit.prevent="handleSubmit" class="space-y-4">
            <template v-if="!isLoggedIn">
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nama Akun</label>
                <input
                  v-model="patientData.nama"
                  type="text"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Email</label>
                <input
                  v-model="patientData.email"
                  type="email"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-600 mb-1">Nomor HP</label>
                <input
                  v-model="patientData.noHp"
                  type="tel"
                  required
                  class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
                />
              </div>
            </template>

            <div>
              <label class="block text-sm font-medium text-gray-600 mb-1">Nama Pasien</label>
              <input
                v-model="patientData.namaPasien"
                type="text"
                required
                placeholder="Nama pasien yang akan diperiksa"
                class="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none"
              />
            </div>

            <div class="bg-gray-50 rounded-lg p-4 text-sm text-gray-600 space-y-1">
              <p><span class="font-medium">Poliklinik:</span> {{ selectedPoliklinik }}</p>
              <p><span class="font-medium">Dokter:</span> {{ selectedDoctor?.name }}</p>
              <p><span class="font-medium">Jadwal:</span> {{ selectedDay }}, {{ selectedTime }}</p>
            </div>

            <button
              type="submit"
              class="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors"
            >
              Ambil Nomor Antrian
            </button>
          </form>
        </div>

        <!-- Tahap 5: Nomor Antrian -->
        <div v-else-if="currentStep === 5 && lastBooking" class="text-center py-4">
          <div class="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-teal-600 text-2xl">✓</span>
          </div>
          <p class="text-gray-500 mb-1">Nomor Antrian Anda</p>
          <p class="text-5xl font-bold text-teal-600 mb-6">{{ lastBooking.nomorAntrian }}</p>

          <div class="bg-gray-50 rounded-lg p-5 text-left text-sm text-gray-600 space-y-1.5 mb-6">
            <p><span class="font-medium text-gray-800">Pasien:</span> {{ lastBooking.pasien.namaPasien }}</p>
            <p><span class="font-medium text-gray-800">Poliklinik:</span> {{ lastBooking.poliklinik }}</p>
            <p><span class="font-medium text-gray-800">Dokter:</span> {{ lastBooking.dokterNama }}</p>
            <p><span class="font-medium text-gray-800">Jadwal:</span> {{ lastBooking.hari }}, {{ lastBooking.jam }}</p>
          </div>

          <div class="flex gap-3">
            <button
              @click="handleReset"
              class="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-medium py-3 rounded-lg transition-colors"
            >
              Ambil Antrian Lain
            </button>
            <router-link
              to="/"
              class="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg text-center transition-colors"
            >
              Kembali ke Beranda
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useQueue } from '../composables/useQueue'
import { useAuth } from '../composables/useAuth'

const steps = ['Poliklinik', 'Dokter', 'Jadwal', 'Data Diri', 'Selesai']

const {
  currentStep,
  selectedPoliklinik,
  selectedDoctor,
  selectedDate,
  selectedDay,
  selectedTime,
  patientData,
  lastBooking,
  poliklinikList,
  doctorsInPoliklinik,
  availableDates,
  availableTimes,
  prevStep,
  selectPoliklinik,
  selectDoctor,
  selectDate,
  selectTime,
  submitBooking,
  resetBooking,
} = useQueue()

const { isLoggedIn, currentUser } = useAuth()

onMounted(() => {
  // Kalau sudah login, isi otomatis nama akun dari data user
  if (isLoggedIn.value && currentUser.value) {
    patientData.value.nama = currentUser.value.nama
    patientData.value.email = currentUser.value.email
    patientData.value.noHp = currentUser.value.noHp
  }
})

function stepClass(step: number) {
  if (currentStep.value > step) return 'bg-teal-500 border-teal-500 text-white'
  if (currentStep.value === step) return 'border-teal-500 text-teal-500 bg-white'
  return 'border-gray-200 text-gray-400 bg-white'
}

function handleSubmit() {
  submitBooking()
}

function handleReset() {
  resetBooking()
}
</script>