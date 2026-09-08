<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="goBack"
        class="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEdit ? 'Edit Dokter' : 'Tambah Dokter Baru' }}
        </h2>
        <p class="text-sm text-slate-500">
          {{ isEdit ? 'Perbarui data & jadwal praktek dokter' : 'Lengkapi data dan jadwal praktek dokter baru' }}
        </p>
      </div>
    </div>

    <!-- Not found state (edit id invalid) -->
    <div v-if="isEdit && !found" class="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
      <div class="text-5xl mb-4 text-slate-300">
        <i class="fas fa-circle-exclamation"></i>
      </div>
      <h3 class="text-lg font-semibold text-slate-900">Dokter tidak ditemukan</h3>
      <p class="text-sm text-slate-500 mb-6">Data dokter yang ingin Anda edit tidak tersedia.</p>
      <button
        @click="goBack"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
      >
        Kembali ke Data Dokter
      </button>
    </div>

    <!-- ===== FORM PAGE ===== -->
    <form v-else @submit.prevent="saveDoctor" class="space-y-6">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <!-- Foto Dokter -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Foto Dokter
          </label>
          <div
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
            class="relative flex items-center gap-4 rounded-xl border-2 border-dashed p-4 cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/30"
            :class="photoPreview ? 'border-teal-400 bg-teal-50/30' : 'border-slate-300'"
          >
            <div class="relative flex-shrink-0">
              <img
                :src="photoPreview || form.image"
                alt="Preview foto dokter"
                class="h-20 w-20 rounded-full object-cover ring-2 ring-white shadow"
              />
              <button
                v-if="photoPreview"
                type="button"
                @click.stop="removePhoto"
                class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="text-sm">
              <p class="font-medium text-slate-600">
                <i class="fas fa-cloud-upload-alt mr-1.5 text-teal-500"></i>
                Klik atau drag & drop untuk {{ photoPreview || form.image ? 'ganti' : 'upload' }} foto
              </p>
              <p class="text-xs text-slate-400 mt-0.5">PNG, JPG, WEBP (Max 5MB) — disarankan foto persegi</p>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              @change="handleFileChange"
              class="hidden"
            />
          </div>
        </div>

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
              placeholder="dr. Andi Pratama, Sp.JP"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <!-- Spesialisasi -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Spesialisasi <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.specialty"
              required
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="">Pilih Spesialisasi</option>
              <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
            </select>
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
              placeholder="dokter@assyifa.com"
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <!-- Ruangan / Poli -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Ruangan / Poli
            </label>
            <input
              v-model="form.room"
              type="text"
              placeholder="Poli Jantung - Lt. 2"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <!-- Tanggal Bergabung -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Tanggal Bergabung
            </label>
            <input
              v-model="form.joinDate"
              type="date"
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
              <option value="Aktif">Aktif</option>
              <option value="Libur">Libur</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
          </div>
        </div>

        <!-- Alamat -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Alamat Praktek
          </label>
          <textarea
            v-model="form.address"
            rows="2"
            placeholder="Jl. Kesehatan No. 123, Jakarta"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          ></textarea>
        </div>

        <!-- Jadwal Praktek Mingguan -->
        <div>
          <label class="mb-2 block text-sm font-semibold text-slate-700">
            Jadwal Praktek Mingguan
          </label>
          <div class="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            <div
              v-for="d in form.schedule"
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
      </div>

      <!-- Footer Aksi -->
      <div class="flex items-center justify-end gap-3">
        <button
          type="button"
          @click="goBack"
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
          {{ loading ? 'Menyimpan...' : isEdit ? 'Update Dokter' : 'Simpan Dokter' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDoctors, emptyWeekSchedule, type Doctor } from '../../composables/useDoctors'

const route = useRoute()
const router = useRouter()
const { specialties, getDoctorById, addDoctor, updateDoctor } = useDoctors()

// ===== MODE: create vs edit, ditentukan dari route param =====
const editId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const isEdit = computed(() => editId.value !== null)
const found = ref(true)

// ===== STATE =====
const loading = ref(false)

// ===== UPLOAD FOTO =====
const fileInput = ref<HTMLInputElement | null>(null)
const photoPreview = ref('')

const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files?.[0]) setPhoto(input.files[0])
}

const handleDrop = (event: DragEvent) => {
  const file = event.dataTransfer?.files?.[0]
  if (file) setPhoto(file)
}

const setPhoto = (file: File) => {
  photoPreview.value = URL.createObjectURL(file)
}

const removePhoto = () => {
  photoPreview.value = ''
  form.value.image = ''
  if (fileInput.value) fileInput.value.value = ''
}

// ===== FORM =====
const defaultForm = () => ({
  name: '',
  specialty: '',
  image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80',
  rating: 5,
  experience: 0,
  patients: '0',
  room: '',
  email: '',
  phone: '',
  joinDate: new Date().toISOString().split('T')[0],
  address: '',
  status: 'Aktif' as Doctor['status'],
  schedule: emptyWeekSchedule()
})

const form = ref(defaultForm())

// ===== LOAD DATA JIKA MODE EDIT =====
onMounted(() => {
  if (isEdit.value && editId.value !== null) {
    const doctor = getDoctorById(editId.value)
    if (doctor) {
      form.value = {
        name: doctor.name,
        specialty: doctor.specialty,
        image: doctor.image,
        rating: doctor.rating,
        experience: doctor.experience,
        patients: doctor.patients,
        room: doctor.room,
        email: doctor.email,
        phone: doctor.phone,
        joinDate: doctor.joinDate,
        address: doctor.address,
        status: doctor.status,
        // clone supaya edit di form tidak langsung mengubah data asli sebelum disimpan
        schedule: doctor.schedule.map(s => ({ ...s }))
      }
      found.value = true
    } else {
      found.value = false
    }
  }
})

// ===== NAVIGASI =====
const goBack = () => {
  router.push({ name: 'admin-doctors' })
}

// ===== SIMPAN =====
const saveDoctor = () => {
  loading.value = true

  // Kalau ada foto baru yang diupload, pakai itu. Kalau tidak, pakai foto lama/default.
  const finalImage = photoPreview.value || form.value.image || defaultForm().image

  setTimeout(() => {
    const payload = { ...form.value, image: finalImage }

    if (isEdit.value && editId.value !== null) {
      updateDoctor(editId.value, payload)
      alert('✅ Data dokter berhasil diupdate!')
    } else {
      addDoctor(payload)
      alert('✅ Dokter baru berhasil ditambahkan!')
    }

    loading.value = false
    goBack()
  }, 800)
}
</script>
