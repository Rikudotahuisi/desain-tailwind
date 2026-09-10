<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-3 mb-6">
      <button
        @click="router.push('/admin/patients')"
        class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">{{ isEdit ? 'Edit Pasien' : 'Tambah Pasien Baru' }}</h2>
        <p class="text-sm text-slate-500">
          {{ isEdit ? 'Perbarui data pasien di ASSYIFA Hospital' : 'Lengkapi data pasien baru di ASSYIFA Hospital' }}
        </p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5 max-w-3xl">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Nama Lengkap -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="John Doe"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Tanggal Lahir -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Tanggal Lahir <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.birthDate"
            type="date"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Email -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.email"
            type="email"
            required
            placeholder="john@email.com"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Telepon -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Telepon <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.phone"
            type="text"
            required
            placeholder="0812-3456-7890"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
        <!-- Jenis Kelamin -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Jenis Kelamin <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.gender"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
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
            <option value="Aktif">Aktif</option>
            <option value="Nonaktif">Nonaktif</option>
            <option value="Menunggu">Menunggu</option>
          </select>
        </div>
      </div>

      <!-- Alamat -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Alamat Lengkap <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.address"
          rows="2"
          required
          placeholder="Jl. Kesehatan No. 123, Jakarta"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        ></textarea>
      </div>

      <!-- Keluhan -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Keluhan / Riwayat Penyakit
        </label>
        <textarea
          v-model="form.complaint"
          rows="2"
          placeholder="Ceritakan keluhan atau riwayat penyakit"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        ></textarea>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          @click="router.push('/admin/patients')"
          class="rounded-xl px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-save mr-2"></i>
          {{ loading ? 'Menyimpan...' : isEdit ? 'Update Pasien' : 'Simpan Pasien' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { usePatients } from '../../composables/usePatients'

const router = useRouter()
const route = useRoute()
const { getPatientById, addPatient, updatePatient } = usePatients()

const isEdit = computed(() => !!route.params.id)
const loading = ref(false)

const form = ref({
  name: '',
  birthDate: new Date().toISOString().split('T')[0],
  email: '',
  phone: '',
  gender: '' as '' | 'Laki-laki' | 'Perempuan',
  status: 'Aktif' as 'Aktif' | 'Nonaktif' | 'Menunggu',
  address: '',
  complaint: ''
})

onMounted(() => {
  if (isEdit.value) {
    const patient = getPatientById(Number(route.params.id))
    if (patient) {
      form.value = {
        name: patient.name,
        birthDate: patient.birthDate,
        email: patient.email,
        phone: patient.phone,
        gender: patient.gender,
        status: patient.status,
        address: patient.address,
        complaint: patient.complaint
      }
    }
  }
})

const handleSubmit = () => {
  loading.value = true

  setTimeout(() => {
    const payload = {
      name: form.value.name,
      birthDate: form.value.birthDate,
      email: form.value.email,
      phone: form.value.phone,
      gender: form.value.gender as 'Laki-laki' | 'Perempuan',
      status: form.value.status,
      address: form.value.address,
      complaint: form.value.complaint
    }

    if (isEdit.value) {
      updatePatient(Number(route.params.id), payload)
    } else {
      addPatient(payload)
    }

    loading.value = false
    router.push('/admin/patients')
  }, 800)
}
</script>