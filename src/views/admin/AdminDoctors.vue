<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Data Dokter</h2>
        <p class="text-sm text-slate-500">Kelola data dokter di Assyiffa Hospital</p>
      </div>
      <button 
        @click="showModal = true" 
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Dokter
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari dokter..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterSpecialty"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Spesialisasi</option>
          <option v-for="spec in specialties" :key="spec" :value="spec">{{ spec }}</option>
        </select>
        <select
          v-model="filterStatus"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Libur">Libur</option>
          <option value="Tidak Aktif">Tidak Aktif</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Dokter</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Spesialisasi</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Email</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Telepon</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Pasien</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doctor in filteredDoctors" :key="doctor.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="doctor.color">
                    {{ doctor.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900">{{ doctor.name }}</p>
                    <p class="text-xs text-slate-500">ID: DOC-{{ String(doctor.id).padStart(4, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="text-slate-600">{{ doctor.specialty }}</span>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ doctor.email }}</td>
              <td class="py-3 px-4 text-slate-600">{{ doctor.phone }}</td>
              <td class="py-3 px-4 text-slate-600">{{ doctor.patients }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="doctor.statusClass">
                  {{ doctor.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="editDoctor(doctor)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deleteDoctor(doctor.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredDoctors.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-user-md"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada dokter</h3>
        <p class="text-sm text-slate-500">Belum ada data dokter yang terdaftar</p>
      </div>
    </div>

    <!-- ===== MODAL FORM ===== -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 class="text-xl font-bold text-slate-900">
            <i class="fas fa-user-md mr-2 text-teal-500"></i>
            {{ editMode ? 'Edit Dokter' : 'Tambah Dokter Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="saveDoctor" class="p-6 space-y-5">
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
                placeholder="dr. Andi Pratama"
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Tanggal Bergabung -->
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Tanggal Bergabung <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.joinDate"
                type="date"
                required
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

          <!-- Jadwal Praktek -->
          <div>
            <label class="mb-2 block text-sm font-semibold text-slate-700">
              Jadwal Praktek
            </label>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label class="text-xs text-slate-500">Hari</label>
                <select v-model="form.schedule.day" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                </select>
              </div>
              <div>
                <label class="text-xs text-slate-500">Jam Mulai</label>
                <input type="time" v-model="form.schedule.start" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
              </div>
              <div>
                <label class="text-xs text-slate-500">Jam Selesai</label>
                <input type="time" v-model="form.schedule.end" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2.5 text-sm">
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              @click="closeModal"
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
              {{ loading ? 'Menyimpan...' : editMode ? 'Update Dokter' : 'Simpan Dokter' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// ===== STATE =====
const showModal = ref(false)
const editMode = ref(false)
const loading = ref(false)
const searchQuery = ref('')
const filterSpecialty = ref('')
const filterStatus = ref('')

// ===== FORM =====
const form = ref({
  id: null as number | null,
  name: '',
  specialty: '',
  email: '',
  phone: '',
  joinDate: '',
  status: 'Aktif',
  address: '',
  schedule: {
    day: 'Senin',
    start: '08:00',
    end: '16:00'
  }
})

// ===== SPECIALTIES =====
const specialties = [
  'Spesialis Jantung (Sp.JP)',
  'Spesialis Kandungan (Sp.OG)',
  'Spesialis Anak (Sp.A)',
  'Spesialis Penyakit Dalam (Sp.PD)',
  'Spesialis Saraf (Sp.N)',
  'Spesialis Orthopaedi (Sp.OT)',
  'Spesialis Bedah (Sp.B)',
  'Spesialis Mata (Sp.M)',
  'Spesialis THT (Sp.THT)',
  'Spesialis Kulit (Sp.KK)'
]

// ===== DOCTORS DATA =====
const doctors = ref([
  {
    id: 1,
    name: 'dr. Andi Pratama, Sp.JP',
    specialty: 'Spesialis Jantung (Sp.JP)',
    email: 'andi@assyiffa.com',
    phone: '0812-3456-7890',
    joinDate: '2020-01-15',
    status: 'Aktif',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    patients: 1250,
    color: 'bg-blue-500',
    statusClass: 'bg-green-100 text-green-700',
    schedule: { day: 'Senin', start: '08:00', end: '16:00' }
  },
  {
    id: 2,
    name: 'dr. Siti Rahayu, Sp.OG',
    specialty: 'Spesialis Kandungan (Sp.OG)',
    email: 'siti@assyiffa.com',
    phone: '0813-4567-8901',
    joinDate: '2019-06-20',
    status: 'Aktif',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    patients: 980,
    color: 'bg-amber-500',
    statusClass: 'bg-green-100 text-green-700',
    schedule: { day: 'Selasa', start: '09:00', end: '17:00' }
  },
  {
    id: 3,
    name: 'dr. Maya Sari, Sp.A',
    specialty: 'Spesialis Anak (Sp.A)',
    email: 'maya@assyiffa.com',
    phone: '0814-5678-9012',
    joinDate: '2021-03-10',
    status: 'Libur',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    patients: 850,
    color: 'bg-green-500',
    statusClass: 'bg-yellow-100 text-yellow-700',
    schedule: { day: 'Rabu', start: '08:00', end: '14:00' }
  },
  {
    id: 4,
    name: 'dr. Budi Santoso, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam (Sp.PD)',
    email: 'budi@assyiffa.com',
    phone: '0815-6789-0123',
    joinDate: '2018-11-01',
    status: 'Aktif',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    patients: 2100,
    color: 'bg-red-500',
    statusClass: 'bg-green-100 text-green-700',
    schedule: { day: 'Kamis', start: '10:00', end: '18:00' }
  },
  {
    id: 5,
    name: 'dr. Rina Wati, Sp.N',
    specialty: 'Spesialis Saraf (Sp.N)',
    email: 'rina@assyiffa.com',
    phone: '0816-7890-1234',
    joinDate: '2022-01-05',
    status: 'Aktif',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    patients: 720,
    color: 'bg-purple-500',
    statusClass: 'bg-green-100 text-green-700',
    schedule: { day: 'Jumat', start: '08:00', end: '15:00' }
  }
])

// ===== COMPUTED =====
const filteredDoctors = computed(() => {
  let filtered = doctors.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(d => 
      d.name.toLowerCase().includes(query) ||
      d.specialty.toLowerCase().includes(query) ||
      d.email.toLowerCase().includes(query)
    )
  }

  if (filterSpecialty.value) {
    filtered = filtered.filter(d => d.specialty === filterSpecialty.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(d => d.status === filterStatus.value)
  }

  return filtered
})

// ===== METHODS =====
const openModal = () => {
  showModal.value = true
  editMode.value = false
  form.value = {
    id: null,
    name: '',
    specialty: '',
    email: '',
    phone: '',
    joinDate: new Date().toISOString().split('T')[0],
    status: 'Aktif',
    address: '',
    schedule: { day: 'Senin', start: '08:00', end: '16:00' }
  }
}

const editDoctor = (doctor: any) => {
  editMode.value = true
  form.value = {
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialty,
    email: doctor.email,
    phone: doctor.phone,
    joinDate: doctor.joinDate,
    status: doctor.status,
    address: doctor.address,
    schedule: doctor.schedule
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editMode.value = false
  loading.value = false
}

const saveDoctor = () => {
  loading.value = true

  setTimeout(() => {
    if (editMode.value && form.value.id) {
      // Update existing doctor
      const index = doctors.value.findIndex(d => d.id === form.value.id)
      if (index !== -1) {
        doctors.value[index] = {
          ...doctors.value[index],
          ...form.value,
          patients: doctors.value[index].patients,
          color: doctors.value[index].color,
          statusClass: doctors.value[index].statusClass
        }
      }
      alert('✅ Data dokter berhasil diupdate!')
    } else {
      // Add new doctor
      const newDoctor = {
        id: doctors.value.length + 1,
        ...form.value,
        patients: 0,
        color: 'bg-teal-500',
        statusClass: form.value.status === 'Aktif' ? 'bg-green-100 text-green-700' : 
                    form.value.status === 'Libur' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-red-100 text-red-700'
      }
      doctors.value.push(newDoctor)
      alert('✅ Dokter baru berhasil ditambahkan!')
    }

    loading.value = false
    closeModal()
  }, 1500)
}

const deleteDoctor = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus dokter ini?')) {
    doctors.value = doctors.value.filter(d => d.id !== id)
    alert('🗑️ Dokter berhasil dihapus!')
  }
}

// ===== LIFECYCLE =====
onMounted(() => {
  // Set default join date
  form.value.joinDate = new Date().toISOString().split('T')[0]
})
</script>