import { ref } from 'vue'

export interface ScheduleEntry {
  id: string
  doctorId: number
  doctorName: string
  day: string // format: "Senin", "Selasa", dst. (untuk pola mingguan)
  date: string // format: YYYY-MM-DD (jadwal untuk tanggal spesifik, bukan pola mingguan)
  startTime: string
  endTime: string
  active: boolean
  createdAt: string
}

const STORAGE_KEY = 'assyifa_schedules'

function loadSchedules(): ScheduleEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore, fallback ke seed di bawah
  }
  const seed: ScheduleEntry[] = [
    { id: '1', doctorId: 1, doctorName: 'dr. Andi Pratama, Sp.JP', day: 'Sabtu', date: '2026-09-12', startTime: '08:00', endTime: '12:00', active: true, createdAt: new Date().toISOString() },
    { id: '2', doctorId: 4, doctorName: 'dr. Maya Sari, Sp.A', day: 'Sabtu', date: '2026-09-12', startTime: '09:00', endTime: '13:00', active: true, createdAt: new Date().toISOString() },
    { id: '3', doctorId: 3, doctorName: 'dr. Budi Santoso, Sp.PD', day: 'Minggu', date: '2026-09-13', startTime: '10:00', endTime: '15:00', active: true, createdAt: new Date().toISOString() },
  ]
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seed))
  return seed
}

// Shared state (composable-as-store pattern, sama seperti useDoctors/useQueue, tapi sumber data terpisah)
const schedules = ref<ScheduleEntry[]>(loadSchedules())

function saveSchedules() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules.value))
}

export function useSchedule() {
  const getScheduleById = (id: string) => schedules.value.find((s) => s.id === id)

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
    addSchedule,
    updateSchedule,
    deleteSchedule,
  }
}