import { ref } from 'vue'

export interface ScheduleEntry {
  id: string
  doctorId: number
  doctorName: string
  day: string // 'Senin' | 'Selasa' | 'Rabu' | 'Kamis' | 'Jumat' | 'Sabtu' | 'Minggu'
  startTime: string
  endTime: string
  active: boolean
  createdAt: string
}

export const DAYS = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

const STORAGE_KEY = 'assyifa_schedules'

export function todayDayName(): string {
  return DAYS[(new Date().getDay() + 6) % 7]
}

function loadSchedules(): ScheduleEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as any[]
      // Migrasi data lama (format tanggal spesifik/YYYY-MM-DD) -> pola mingguan.
      // Entry yang sama sekali tidak punya 'day' yang valid dibuang saja.
      const migrated = parsed
        .filter((s) => DAYS.includes(s.day))
        .map((s) => ({
          id: s.id,
          doctorId: s.doctorId,
          doctorName: s.doctorName,
          day: s.day,
          startTime: s.startTime,
          endTime: s.endTime,
          active: s.active ?? true,
          createdAt: s.createdAt || new Date().toISOString(),
        })) as ScheduleEntry[]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated))
      return migrated
    }
  } catch {
    // ignore, fallback ke seed di bawah
  }
  const seed: ScheduleEntry[] = [
    { id: '1', doctorId: 1, doctorName: 'dr. Andi Pratama, Sp.JP', day: 'Senin', startTime: '08:00', endTime: '14:00', active: true, createdAt: new Date().toISOString() },
    { id: '2', doctorId: 1, doctorName: 'dr. Andi Pratama, Sp.JP', day: 'Rabu', startTime: '10:00', endTime: '16:00', active: true, createdAt: new Date().toISOString() },
    { id: '3', doctorId: 4, doctorName: 'dr. Maya Sari, Sp.A', day: 'Sabtu', startTime: '09:00', endTime: '13:00', active: true, createdAt: new Date().toISOString() },
    { id: '4', doctorId: 3, doctorName: 'dr. Budi Santoso, Sp.PD', day: 'Minggu', startTime: '10:00', endTime: '15:00', active: true, createdAt: new Date().toISOString() },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

// Shared state (composable-as-store pattern, sama seperti useDoctors/useQueue)
const schedules = ref<ScheduleEntry[]>(loadSchedules())

function saveSchedules() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules.value))
}

export function useSchedule() {
  const getScheduleById = (id: string) => schedules.value.find((s) => s.id === id)

  // Semua jadwal milik satu dokter, diurutkan Senin -> Minggu
  const getSchedulesForDoctor = (doctorId: number) =>
    schedules.value
      .filter((s) => s.doctorId === doctorId)
      .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day))

  // Jadwal aktif dokter untuk hari ini (dipakai buat badge "Praktik Hari Ini")
  const getTodaySchedulesForDoctor = (doctorId: number) => {
    const today = todayDayName()
    return getSchedulesForDoctor(doctorId).filter((s) => s.day === today && s.active)
  }

  const addSchedule = (data: Omit<ScheduleEntry, 'id' | 'createdAt'>) => {
    const newSchedule: ScheduleEntry = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    }
    schedules.value.push(newSchedule)
    saveSchedules()
    return newSchedule
  }

  const updateSchedule = (id: string, data: Partial<Omit<ScheduleEntry, 'id' | 'createdAt'>>) => {
    const index = schedules.value.findIndex((s) => s.id === id)
    if (index !== -1) {
      schedules.value[index] = { ...schedules.value[index], ...data }
      saveSchedules()
    }
  }

  const deleteSchedule = (id: string) => {
    schedules.value = schedules.value.filter((s) => s.id !== id)
    saveSchedules()
  }

  return {
    schedules,
    getScheduleById,
    getSchedulesForDoctor,
    getTodaySchedulesForDoctor,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  }
}