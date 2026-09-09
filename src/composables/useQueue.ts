import { ref, computed } from 'vue'
import { useDoctors } from './useDoctors'

export interface PatientData {
  nama: string
  email: string
  noHp: string
  namaPasien: string
}

export interface QueueBooking {
  id: string
  nomorAntrian: string
  poliklinik: string
  dokterId: number
  dokterNama: string
  tanggal: string // format: YYYY-MM-DD
  hari: string
  jam: string
  pasien: PatientData
  status: 'Menunggu' | 'Selesai' | 'Dibatalkan'
  createdAt: string
}

export interface DateOption {
  date: string
  day: string
  label: string
}

const STORAGE_KEY = 'assyifa_queue_bookings'
// Urutan hari mengikuti DAYS di useDoctors.ts (Senin s.d. Minggu), dipakai untuk mapping getDay() -> nama hari
const DAYS_ID = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']

function timeToMinutes(t: string) {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0')
  const m = (mins % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

// Pecah rentang start-end jadi slot per 30 menit, misal "08:00" - "09:00" -> ["08:00 - 08:30", "08:30 - 09:00"]
function generateTimeSlots(start: string, end: string, stepMinutes = 30): string[] {
  if (!start || !end) return []
  const slots: string[] = []
  let cur = timeToMinutes(start)
  const endM = timeToMinutes(end)
  while (cur + stepMinutes <= endM) {
    slots.push(`${minutesToTime(cur)} - ${minutesToTime(cur + stepMinutes)}`)
    cur += stepMinutes
  }
  return slots
}

// Fungsi murni (bisa dipakai wizard publik ATAU form admin, tidak bergantung pada state wizard)
function getScheduleDatesForDoctor(doctor: any, maxResults = 10): DateOption[] {
  if (!doctor?.schedule) return []
  const activeDays = doctor.schedule.filter((s: any) => s.active).map((s: any) => s.day)
  const result: DateOption[] = []
  for (let i = 0; i < 30 && result.length < maxResults; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dayName = DAYS_ID[(d.getDay() + 6) % 7]
    if (activeDays.includes(dayName)) {
      result.push({
        date: d.toISOString().split('T')[0],
        day: dayName,
        label: d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }),
      })
    }
  }
  return result
}

function getTimeSlotsForDoctor(doctor: any, day: string | null): string[] {
  if (!doctor?.schedule || !day) return []
  const daySchedule = doctor.schedule.find((s: any) => s.day === day && s.active)
  if (!daySchedule) return []
  return generateTimeSlots(daySchedule.start, daySchedule.end)
}

function loadBookings(): QueueBooking[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Shared state (composable-as-store pattern, sama seperti useDoctors/useArticles)
const bookings = ref<QueueBooking[]>(loadBookings())

const currentStep = ref(1)
const selectedPoliklinik = ref<string | null>(null)
const selectedDoctorId = ref<number | null>(null)
const selectedDate = ref<string | null>(null)
const selectedDay = ref<string | null>(null)
const selectedTime = ref<string | null>(null)
const patientData = ref<PatientData>({ nama: '', email: '', noHp: '', namaPasien: '' })
const lastBooking = ref<QueueBooking | null>(null)

function saveBookings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings.value))
}

export function useQueue() {
  const { doctors } = useDoctors()

  // Tahap 1: daftar poliklinik unik dari data dokter
  const poliklinikList = computed(() => {
    const set = new Set(doctors.value.map((d: any) => d.specialty))
    return Array.from(set) as string[]
  })

  // Tahap 2: dokter sesuai poliklinik terpilih
  const doctorsInPoliklinik = computed(() => {
    if (!selectedPoliklinik.value) return []
    return doctors.value.filter((d: any) => d.specialty === selectedPoliklinik.value)
  })

  const selectedDoctor = computed(() =>
    doctors.value.find((d: any) => d.id === selectedDoctorId.value) || null
  )

  // Tahap 3: 7 tanggal terdekat yang aktif di jadwal dokter (dipakai wizard publik)
  const availableDates = computed(() => getScheduleDatesForDoctor(selectedDoctor.value, 7))

  // Tahap 3b: pecah start-end jadi slot 30 menit untuk hari yang dipilih
  const availableTimes = computed(() => getTimeSlotsForDoctor(selectedDoctor.value, selectedDay.value))

  function goToStep(step: number) {
    currentStep.value = step
  }

  function nextStep() {
    if (currentStep.value < 5) currentStep.value++
  }

  function prevStep() {
    if (currentStep.value > 1) currentStep.value--
  }

  function selectPoliklinik(poli: string) {
    selectedPoliklinik.value = poli
    selectedDoctorId.value = null
    nextStep()
  }

  function selectDoctor(doctorId: number) {
    selectedDoctorId.value = doctorId
    nextStep()
  }

  function selectDate(date: string, day: string) {
    selectedDate.value = date
    selectedDay.value = day
    selectedTime.value = null
  }

  function selectTime(time: string) {
    selectedTime.value = time
    nextStep()
  }

  function generateQueueNumber(poliklinik: string, date: string): string {
    // Nama poliklinik selalu diawali "Spesialis ..." jadi kalau ambil huruf pertama
    // semua akan jadi "S". Di sini kita ambil huruf pertama dari kata SETELAH "Spesialis".
    const nama = poliklinik.replace(/^Spesialis\s+/i, '')
    const prefix = nama.charAt(0).toUpperCase() || 'X'
    const todayCount = bookings.value.filter(
      (b) => b.poliklinik === poliklinik && b.tanggal === date
    ).length
    return `${prefix}-${String(todayCount + 1).padStart(3, '0')}`
  }

  function submitBooking(): QueueBooking {
    const nomorAntrian = generateQueueNumber(selectedPoliklinik.value!, selectedDate.value!)
    const booking: QueueBooking = {
      id: crypto.randomUUID(),
      nomorAntrian,
      poliklinik: selectedPoliklinik.value!,
      dokterId: selectedDoctorId.value!,
      dokterNama: selectedDoctor.value?.name || '',
      tanggal: selectedDate.value!,
      hari: selectedDay.value!,
      jam: selectedTime.value!,
      pasien: { ...patientData.value },
      status: 'Menunggu',
      createdAt: new Date().toISOString(),
    }
    bookings.value.push(booking)
    saveBookings()
    lastBooking.value = booking
    nextStep()
    return booking
  }

  function resetBooking() {
    currentStep.value = 1
    selectedPoliklinik.value = null
    selectedDoctorId.value = null
    selectedDate.value = null
    selectedDay.value = null
    selectedTime.value = null
    patientData.value = { nama: '', email: '', noHp: '', namaPasien: '' }
    lastBooking.value = null
  }

  // ===== CRUD untuk dashboard admin =====
  const getBookingById = (id: string) => bookings.value.find((b) => b.id === id)

  const addManualBooking = (data: {
    poliklinik: string
    dokterId: number
    dokterNama: string
    tanggal: string
    hari: string
    jam: string
    pasien: PatientData
    status: QueueBooking['status']
  }) => {
    const booking: QueueBooking = {
      id: crypto.randomUUID(),
      nomorAntrian: generateQueueNumber(data.poliklinik, data.tanggal),
      createdAt: new Date().toISOString(),
      ...data,
    }
    bookings.value.push(booking)
    saveBookings()
    return booking
  }

  const updateBooking = (id: string, data: Partial<Omit<QueueBooking, 'id' | 'nomorAntrian' | 'createdAt'>>) => {
    const index = bookings.value.findIndex((b) => b.id === id)
    if (index !== -1) {
      bookings.value[index] = { ...bookings.value[index], ...data }
      saveBookings()
    }
  }

  const updateBookingStatus = (id: string, status: QueueBooking['status']) => {
    updateBooking(id, { status })
  }

  const deleteBooking = (id: string) => {
    bookings.value = bookings.value.filter((b) => b.id !== id)
    saveBookings()
  }

  return {
    currentStep,
    selectedPoliklinik,
    selectedDoctorId,
    selectedDoctor,
    selectedDate,
    selectedDay,
    selectedTime,
    patientData,
    lastBooking,
    bookings,
    poliklinikList,
    doctorsInPoliklinik,
    availableDates,
    availableTimes,
    goToStep,
    nextStep,
    prevStep,
    selectPoliklinik,
    selectDoctor,
    selectDate,
    selectTime,
    submitBooking,
    resetBooking,
    // admin
    getBookingById,
    addManualBooking,
    updateBooking,
    updateBookingStatus,
    deleteBooking,
    getScheduleDatesForDoctor,
    getTimeSlotsForDoctor,
  }
}