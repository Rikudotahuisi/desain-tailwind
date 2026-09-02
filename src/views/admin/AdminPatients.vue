<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Data Pasien</h2>
        <p class="text-sm text-slate-500">Kelola data pasien di ASSYIFA Hospital</p>
      </div>
      <button 
        @click="showModal = true" 
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Pasien
      </button>
    </div>

    <!-- Search & Filter -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari pasien..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterStatus"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Status</option>
          <option value="Aktif">Aktif</option>
          <option value="Nonaktif">Nonaktif</option>
          <option value="Menunggu">Menunggu</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Pasien</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Email</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Telepon</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Tanggal Daftar</th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">Status</th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in filteredPatients" :key="patient.id" class="border-b border-slate-100 hover:bg-slate-50 transition">
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold" :class="patient.color">
                    {{ patient.name.charAt(0) }}
                  </div>
                  <div>
                    <p class="font-medium text-slate-900">{{ patient.name }}</p>
                    <p class="text-xs text-slate-500">ID: PAT-{{ String(patient.id).padStart(4, '0') }}</p>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ patient.email }}</td>
              <td class="py-3 px-4 text-slate-600">{{ patient.phone }}</td>
              <td class="py-3 px-4 text-slate-600">{{ patient.registerDate }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-medium" :class="patient.statusClass">
                  {{ patient.status }}
                </span>
              </td>
              <td class="py-3 px-4 text-center">
                <button @click="editPatient(patient)" class="text-teal-600 hover:text-teal-700 mr-2 transition">
                  <i class="fas fa-edit"></i>
                </button>
                <button @click="deletePatient(patient.id)" class="text-red-500 hover:text-red-600 transition">
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Empty State -->
      <div v-if="filteredPatients.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-users"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada pasien</h3>
        <p class="text-sm text-slate-500">Belum ada data pasien yang terdaftar</p>
      </div>
    </div>

    <!-- ===== MODAL FORM ===== -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 class="text-xl font-bold text-slate-900">
            <i class="fas fa-user-plus mr-2 text-teal-500"></i>
            {{ editMode ? 'Edit Pasien' : 'Tambah Pasien Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="savePatient" class="p-6 space-y-5">
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
              placeholder="Ceritakan keluhan atau riwayat penyakit Anda"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            ></textarea>
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
              {{ loading ? 'Menyimpan...' : editMode ? 'Update Pasien' : 'Simpan Pasien' }}
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
const filterStatus = ref('')

// ===== FORM =====
const form = ref({
  id: null as number | null,
  name: '',
  birthDate: '',
  email: '',
  phone: '',
  gender: '',
  status: 'Aktif',
  address: '',
  complaint: ''
})

// ===== PATIENTS DATA =====
const patients = ref([
  {
    id: 1,
    name: 'Budi Santoso',
    birthDate: '1990-05-15',
    email: 'budi@email.com',
    phone: '0812-3456-7890',
    gender: 'Laki-laki',
    status: 'Aktif',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    complaint: 'Sakit kepala kronis',
    registerDate: '01 Jan 2026',
    color: 'bg-blue-500',
    statusClass: 'bg-green-100 text-green-700'
  },
  {
    id: 2,
    name: 'Siti Rahayu',
    birthDate: '1985-08-20',
    email: 'siti@email.com',
    phone: '0813-4567-8901',
    gender: 'Perempuan',
    status: 'Aktif',
    address: 'Jl. Merdeka No. 45, Jakarta',
    complaint: 'Pemeriksaan kehamilan',
    registerDate: '15 Feb 2026',
    color: 'bg-amber-500',
    statusClass: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    name: 'Agus Wijaya',
    birthDate: '1978-03-10',
    email: 'agus@email.com',
    phone: '0814-5678-9012',
    gender: 'Laki-laki',
    status: 'Menunggu',
    address: 'Jl. Sudirman No. 78, Jakarta',
    complaint: 'Cek kesehatan rutin',
    registerDate: '20 Mar 2026',
    color: 'bg-green-500',
    statusClass: 'bg-yellow-100 text-yellow-700'
  },
  {
    id: 4,
    name: 'Dewi Lestari',
    birthDate: '1992-11-25',
    email: 'dewi@email.com',
    phone: '0815-6789-0123',
    gender: 'Perempuan',
    status: 'Nonaktif',
    address: 'Jl. Gatot Subroto No. 12, Jakarta',
    complaint: 'Alergi makanan',
    registerDate: '05 Apr 2026',
    color: 'bg-red-500',
    statusClass: 'bg-red-100 text-red-700'
  },
  {
    id: 5,
    name: 'Eko Prasetyo',
    birthDate: '1988-07-30',
    email: 'eko@email.com',
    phone: '0816-7890-1234',
    gender: 'Laki-laki',
    status: 'Aktif',
    address: 'Jl. Diponegoro No. 56, Jakarta',
    complaint: 'Nyeri sendi',
    registerDate: '10 Mei 2026',
    color: 'bg-purple-500',
    statusClass: 'bg-green-100 text-green-700'
  }
])

// ===== COMPUTED =====
const filteredPatients = computed(() => {
  let filtered = patients.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(query) ||
      p.email.toLowerCase().includes(query) ||
      p.phone.includes(query)
    )
  }

  if (filterStatus.value) {
    filtered = filtered.filter(p => p.status === filterStatus.value)
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
    birthDate: '',
    email: '',
    phone: '',
    gender: '',
    status: 'Aktif',
    address: '',
    complaint: ''
  }
}

const editPatient = (patient: any) => {
  editMode.value = true
  form.value = {
    id: patient.id,
    name: patient.name,
    birthDate: patient.birthDate,
    email: patient.email,
    phone: patient.phone,
    gender: patient.gender,
    status: patient.status,
    address: patient.address,
    complaint: patient.complaint || ''
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editMode.value = false
  loading.value = false
}

const savePatient = () => {
  loading.value = true

  setTimeout(() => {
    const today = new Date()
    const dateStr = today.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })

    if (editMode.value && form.value.id) {
      // Update existing patient
      const index = patients.value.findIndex(p => p.id === form.value.id)
      if (index !== -1) {
        patients.value[index] = {
          ...patients.value[index],
          name: form.value.name,
          birthDate: form.value.birthDate,
          email: form.value.email,
          phone: form.value.phone,
          gender: form.value.gender,
          status: form.value.status,
          address: form.value.address,
          complaint: form.value.complaint
        }
      }
      alert('✅ Data pasien berhasil diupdate!')
    } else {
      // Add new patient
      const statusClassMap: Record<string, string> = {
        'Aktif': 'bg-green-100 text-green-700',
        'Nonaktif': 'bg-red-100 text-red-700',
        'Menunggu': 'bg-yellow-100 text-yellow-700'
      }
      const colorMap: Record<string, string> = {
        'Aktif': 'bg-teal-500',
        'Nonaktif': 'bg-red-500',
        'Menunggu': 'bg-yellow-500'
      }
      
      const newPatient = {
        id: patients.value.length + 1,
        name: form.value.name,
        birthDate: form.value.birthDate,
        email: form.value.email,
        phone: form.value.phone,
        gender: form.value.gender,
        status: form.value.status,
        address: form.value.address,
        complaint: form.value.complaint,
        registerDate: dateStr,
        color: colorMap[form.value.status] || 'bg-teal-500',
        statusClass: statusClassMap[form.value.status] || 'bg-green-100 text-green-700'
      }
      patients.value.push(newPatient)
      alert('✅ Pasien baru berhasil ditambahkan!')
    }

    loading.value = false
    closeModal()
  }, 1500)
}

const deletePatient = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus data pasien ini?')) {
    patients.value = patients.value.filter(p => p.id !== id)
    alert('🗑️ Pasien berhasil dihapus!')
  }
}

// ===== LIFECYCLE =====
onMounted(() => {
  form.value.birthDate = new Date().toISOString().split('T')[0]
})
</script>