import { ref, computed } from 'vue'

export interface DaySchedule {
  day: string
  start: string
  end: string
  active: boolean
}

export interface Doctor {
  id: number
  name: string
  specialty: string
  image: string
  rating: number
  experience: number
  patients: string
  room: string
  email: string
  phone: string
  joinDate: string
  address: string
  color: string
  status: 'Aktif' | 'Libur' | 'Tidak Aktif'
  schedule: DaySchedule[]
}

export const statusClass = (status: Doctor['status']) => {
  if (status === 'Aktif') return 'bg-green-100 text-green-700'
  if (status === 'Libur') return 'bg-yellow-100 text-yellow-700'
  return 'bg-red-100 text-red-700'
}

export const avatarColors = [
  'bg-blue-500', 'bg-amber-500', 'bg-green-500',
  'bg-red-500', 'bg-purple-500', 'bg-teal-500'
]

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

export function emptyWeekSchedule(): DaySchedule[] {
  return DAYS.map(day => ({ day, start: '08:00', end: '16:00', active: false }))
}

export const specialties = [
  'Spesialis Jantung',
  'Spesialis Kandungan',
  'Spesialis Anak',
  'Spesialis Penyakit Dalam',
  'Spesialis Saraf',
  'Spesialis Orthopaedi'
]

function buildWeek(active: Partial<Record<string, [string, string]>>): DaySchedule[] {
  return DAYS.map(day => {
    const hours = active[day]
    return {
      day,
      start: hours ? hours[0] : '',
      end: hours ? hours[1] : '',
      active: !!hours
    }
  })
}

// ===== SHARED STATE (module-level singleton, sama pola dengan useArticles) =====
const doctors = ref<Doctor[]>([
  {
    id: 1,
    name: 'dr. Andi Pratama, Sp.JP',
    specialty: 'Spesialis Jantung',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80',
    rating: 4.9,
    experience: 12,
    patients: '1.250',
    room: 'Poli Jantung - Lt. 2',
    email: 'andi@assyifa.com',
    phone: '0812-3456-7890',
    joinDate: '2020-01-15',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-blue-500',
    status: 'Aktif',
    schedule: buildWeek({
      Senin: ['08:00', '14:00'],
      Rabu: ['10:00', '16:00'],
      Jumat: ['08:00', '12:00']
    })
  },
  {
    id: 2,
    name: 'dr. Siti Rahayu, Sp.OG',
    specialty: 'Spesialis Kandungan',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80',
    rating: 4.8,
    experience: 10,
    patients: '980',
    room: 'Poli Kandungan - Lt. 1',
    email: 'siti@assyifa.com',
    phone: '0813-4567-8901',
    joinDate: '2019-06-20',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-amber-500',
    status: 'Aktif',
    schedule: buildWeek({
      Selasa: ['09:00', '15:00'],
      Kamis: ['08:00', '14:00'],
      Sabtu: ['08:00', '12:00']
    })
  },
  {
    id: 3,
    name: 'dr. Budi Santoso, Sp.PD',
    specialty: 'Spesialis Penyakit Dalam',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    rating: 4.7,
    experience: 15,
    patients: '2.100',
    room: 'Poli Penyakit Dalam - Lt. 2',
    email: 'budi@assyifa.com',
    phone: '0815-6789-0123',
    joinDate: '2018-11-01',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-red-500',
    status: 'Aktif',
    schedule: buildWeek({
      Senin: ['10:00', '16:00'],
      Rabu: ['08:00', '14:00'],
      Kamis: ['10:00', '18:00']
    })
  },
  {
    id: 4,
    name: 'dr. Maya Sari, Sp.A',
    specialty: 'Spesialis Anak',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    rating: 4.9,
    experience: 8,
    patients: '850',
    room: 'Poli Anak - Lt. 1',
    email: 'maya@assyifa.com',
    phone: '0814-5678-9012',
    joinDate: '2021-03-10',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-green-500',
    status: 'Libur',
    schedule: buildWeek({
      Senin: ['08:00', '12:00'],
      Selasa: ['13:00', '17:00'],
      Rabu: ['08:00', '14:00']
    })
  },
  {
    id: 5,
    name: 'dr. Rina Wati, Sp.N',
    specialty: 'Spesialis Saraf',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80',
    rating: 4.8,
    experience: 9,
    patients: '720',
    room: 'Poli Saraf - Lt. 3',
    email: 'rina@assyifa.com',
    phone: '0816-7890-1234',
    joinDate: '2022-01-05',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-purple-500',
    status: 'Aktif',
    schedule: buildWeek({
      Selasa: ['08:00', '15:00'],
      Jumat: ['08:00', '15:00'],
      Sabtu: ['08:00', '11:00']
    })
  },
  {
    id: 6,
    name: 'dr. Fajar Nugroho, Sp.OT',
    specialty: 'Spesialis Orthopaedi',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80',
    rating: 4.6,
    experience: 11,
    patients: '640',
    room: 'Poli Orthopaedi - Lt. 3',
    email: 'fajar@assyifa.com',
    phone: '0817-8901-2345',
    joinDate: '2021-09-12',
    address: 'Jl. Kesehatan No. 123, Jakarta',
    color: 'bg-teal-500',
    status: 'Aktif',
    schedule: buildWeek({
      Senin: ['13:00', '18:00'],
      Kamis: ['08:00', '13:00']
    })
  }
])

// Nama hari ini dalam Bahasa Indonesia, dipakai untuk fitur "Praktik Hari Ini"
export const todayName = computed(() => DAYS[(new Date().getDay() + 6) % 7])

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

export function useDoctors() {
  // Status live: apakah dokter sedang praktik SAAT INI (hari + jam)
  const isPracticingNow = (doctor: Doctor) => {
    const todaySlot = doctor.schedule.find(s => s.day === todayName.value && s.active)
    if (!todaySlot || doctor.status !== 'Aktif') return false
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    return nowMinutes >= timeToMinutes(todaySlot.start) && nowMinutes <= timeToMinutes(todaySlot.end)
  }

  const practicesToday = (doctor: Doctor) =>
    doctor.status === 'Aktif' && doctor.schedule.some(s => s.day === todayName.value && s.active)

  const getDoctorById = (id: number) => doctors.value.find(d => d.id === id)

  // ===== CRUD (dipakai dari dashboard admin) =====
  const addDoctor = (data: Omit<Doctor, 'id' | 'color'>) => {
    const nextId = doctors.value.length
      ? Math.max(...doctors.value.map(d => d.id)) + 1
      : 1
    const newDoctor: Doctor = {
      id: nextId,
      color: avatarColors[nextId % avatarColors.length],
      ...data
    }
    doctors.value.push(newDoctor)
    return newDoctor
  }

  const updateDoctor = (id: number, data: Partial<Omit<Doctor, 'id'>>) => {
    const index = doctors.value.findIndex(d => d.id === id)
    if (index !== -1) {
      doctors.value[index] = { ...doctors.value[index], ...data }
    }
  }

  const deleteDoctor = (id: number) => {
    doctors.value = doctors.value.filter(d => d.id !== id)
  }

  return {
    doctors,
    specialties,
    todayName,
    isPracticingNow,
    practicesToday,
    getDoctorById,
    addDoctor,
    updateDoctor,
    deleteDoctor
  }
}
