import { ref } from 'vue'

export interface Patient {
  id: number
  name: string
  birthDate: string
  email: string
  phone: string
  gender: 'Laki-laki' | 'Perempuan'
  status: 'Aktif' | 'Nonaktif' | 'Menunggu'
  address: string
  complaint: string
  registerDate: string
  color: string
}

export const statusClass = (status: Patient['status']) => {
  if (status === 'Aktif') return 'bg-green-100 text-green-700'
  if (status === 'Menunggu') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

export const avatarColors = [
  'bg-blue-500', 'bg-amber-500', 'bg-green-500',
  'bg-red-500', 'bg-purple-500', 'bg-teal-500'
]

function todayLabel() {
  return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

// ===== SHARED STATE (module-level singleton, sama pola dengan useDoctors/useArticles) =====
const patients = ref<Patient[]>([
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
    color: 'bg-blue-500'
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
    color: 'bg-amber-500'
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
    color: 'bg-green-500'
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
    color: 'bg-red-500'
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
    color: 'bg-purple-500'
  }
])

export function usePatients() {
  const getPatientById = (id: number) => patients.value.find((p) => p.id === id)

  // ===== CRUD (dipakai dari dashboard admin) =====
  const addPatient = (data: Omit<Patient, 'id' | 'color' | 'registerDate'>) => {
    const nextId = patients.value.length
      ? Math.max(...patients.value.map((p) => p.id)) + 1
      : 1
    const newPatient: Patient = {
      id: nextId,
      color: avatarColors[nextId % avatarColors.length],
      registerDate: todayLabel(),
      ...data
    }
    patients.value.push(newPatient)
    return newPatient
  }

  const updatePatient = (id: number, data: Partial<Omit<Patient, 'id'>>) => {
    const index = patients.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      patients.value[index] = { ...patients.value[index], ...data }
    }
  }

  const deletePatient = (id: number) => {
    patients.value = patients.value.filter((p) => p.id !== id)
  }

  return {
    patients,
    getPatientById,
    addPatient,
    updatePatient,
    deletePatient
  }
}