import { ref, watch } from 'vue'

export interface SlideButton {
  text: string
  link: string
}

export interface Slide {
  id: number
  image: string
  title: string
  description: string
  active: boolean
  buttons: SlideButton[]
  createdAt: string
}

const STORAGE_KEY = 'assyifa_slideshow'

const defaultSlides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80',
    title: 'Deteksi Dini untuk Hidup Sehat',
    description: 'Lakukan medical check up rutin untuk mendeteksi potensi penyakit sejak dini dan menjaga kualitas hidup Anda lebih baik.',
    active: true,
    buttons: [
      { text: 'Jadwalkan MCU', link: '/#medical-checkup' },
      { text: 'Paket MCU', link: '/#medical-checkup' }
    ],
    createdAt: '28 Agustus 2026'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80',
    title: 'ASSYIFA Hospital - Kesehatan untuk Semua',
    description: 'Selamat datang di Assyifa Hospital - Fasilitas kesehatan dengan pengalaman tak tertandingi dan komitmen pada persahabatan abadi.',
    active: true,
    buttons: [
      { text: 'Ketahui Lebih', link: '/about' }
    ],
    createdAt: '27 Agustus 2026'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80',
    title: 'Dokter Spesialis Berpengalaman',
    description: 'Tim dokter kami terdiri dari para ahli di berbagai bidang dengan pengalaman luas dan sertifikasi internasional.',
    active: false,
    buttons: [
      { text: 'Lihat Dokter', link: '/#doctors' }
    ],
    createdAt: '26 Agustus 2026'
  }
]

function loadSlides(): Slide[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Slide[]
  } catch (e) {
    console.error('Gagal memuat data slideshow dari localStorage:', e)
  }
  return defaultSlides
}

const slides = ref<Slide[]>(loadSlides())

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides.value))
  } catch (e) {
    console.error('Gagal menyimpan data slideshow ke localStorage:', e)
  }
}

// Auto-save setiap ada perubahan
watch(slides, persist, { deep: true })

let nextId = slides.value.length
  ? Math.max(...slides.value.map(s => s.id)) + 1
  : 1

function formatToday(): string {
  return new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// ===== CRUD =====
function getAllSlides() {
  return slides.value
}

function getActiveSlides() {
  return slides.value.filter(s => s.active)
}

function getSlideById(id: number) {
  return slides.value.find(s => s.id === id)
}

function addSlide(data: Omit<Slide, 'id' | 'createdAt'>) {
  const newSlide: Slide = {
    id: nextId++,
    createdAt: formatToday(),
    ...data
  }
  slides.value.push(newSlide)
  return newSlide
}

function updateSlide(id: number, data: Partial<Omit<Slide, 'id' | 'createdAt'>>) {
  const idx = slides.value.findIndex(s => s.id === id)
  if (idx !== -1) {
    slides.value[idx] = { ...slides.value[idx], ...data }
  }
}

function deleteSlide(id: number) {
  const idx = slides.value.findIndex(s => s.id === id)
  if (idx !== -1) slides.value.splice(idx, 1)
}

function toggleActive(id: number) {
  const slide = getSlideById(id)
  if (slide) slide.active = !slide.active
}

function reorderSlides(newOrder: Slide[]) {
  slides.value = newOrder
}

export function useSlideshow() {
  return {
    slides,
    getAllSlides,
    getActiveSlides,
    getSlideById,
    addSlide,
    updateSlide,
    deleteSlide,
    toggleActive,
    reorderSlides
  }
}