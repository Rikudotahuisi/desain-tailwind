<template>
  <div>
    <!-- Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Kelola Slideshow</h2>
        <p class="text-sm text-slate-500">Atur konten slideshow yang tampil di halaman utama</p>
      </div>
      <button 
        @click="openModal" 
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Slide
      </button>
    </div>

    <!-- Slides Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div v-for="(slide, index) in slides" :key="index" class="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition">
        <!-- Preview Image -->
        <div class="relative h-48 overflow-hidden bg-slate-200">
          <img 
            :src="slide.image || '/placeholder-image.jpg'" 
            :alt="slide.title" 
            class="w-full h-full object-cover"
          />
          <div class="absolute top-2 right-2 flex gap-1">
            <span v-if="slide.active" class="px-2 py-0.5 bg-green-500 text-white text-[10px] font-semibold rounded-full">
              Aktif
            </span>
            <span v-else class="px-2 py-0.5 bg-red-500 text-white text-[10px] font-semibold rounded-full">
              Nonaktif
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <span class="text-xs text-white/80">Slide #{{ index + 1 }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 class="font-bold text-slate-900 line-clamp-1">{{ slide.title || 'Tanpa Judul' }}</h3>
          <p class="text-sm text-slate-600 line-clamp-2 mt-1">{{ slide.description || 'Tanpa Deskripsi' }}</p>
          <div class="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span><i class="far fa-calendar-alt mr-1"></i>{{ slide.createdAt || 'Belum diatur' }}</span>
            <span class="h-1 w-1 rounded-full bg-slate-300"></span>
            <span>{{ slide.buttons?.length || 0 }} tombol</span>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <button @click="editSlide(index)" class="flex-1 rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-600 transition hover:bg-teal-100">
              <i class="fas fa-edit mr-1"></i>Edit
            </button>
            <button @click="deleteSlide(index)" class="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="slides.length === 0" class="col-span-full py-12 text-center">
        <div class="text-6xl mb-4 text-slate-300">
          <i class="fas fa-images"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Belum ada slide</h3>
        <p class="text-sm text-slate-500">Klik tombol "Tambah Slide" untuk menambahkan slide baru</p>
      </div>
    </div>

    <!-- ===== MODAL FORM ===== -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <!-- Modal Header -->
        <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h3 class="text-xl font-bold text-slate-900">
            <i class="fas fa-image mr-2 text-teal-500"></i>
            {{ editIndex !== null ? 'Edit Slide' : 'Tambah Slide Baru' }}
          </h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-600 transition">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>

        <!-- Modal Body -->
        <form @submit.prevent="saveSlide" class="p-6 space-y-5">
          <!-- Upload Gambar -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Gambar Slide <span class="text-red-500">*</span>
            </label>
            
            <!-- Drag & Drop / Upload Area -->
            <div 
              @dragover.prevent 
              @drop.prevent="handleDrop"
              @click="triggerFileInput"
              class="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/30"
              :class="[
                form.imageFile || form.imagePreview 
                  ? 'border-teal-400 bg-teal-50/30' 
                  : 'border-slate-300'
              ]"
            >
              <!-- Preview -->
              <div v-if="form.imagePreview || form.image" class="relative">
                <img 
                  :src="form.imagePreview || form.image" 
                  alt="Preview" 
                  class="max-h-48 mx-auto rounded-lg object-contain"
                />
                <button 
                  type="button"
                  @click.stop="removeImage"
                  class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center hover:bg-red-600 transition"
                >
                  <i class="fas fa-times"></i>
                </button>
              </div>

              <!-- Upload Icon -->
              <div v-else>
                <div class="text-5xl text-slate-300 mb-3">
                  <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <p class="text-sm font-medium text-slate-600">Klik atau drag & drop untuk upload</p>
                <p class="text-xs text-slate-400 mt-1">PNG, JPG, WEBP (Max 5MB)</p>
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

          <!-- Judul -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Judul <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="Masukkan judul slide"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <!-- Deskripsi -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Deskripsi
            </label>
            <textarea
              v-model="form.description"
              rows="2"
              placeholder="Masukkan deskripsi slide"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            ></textarea>
          </div>

          <!-- Tombol (Buttons) -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-semibold text-slate-700">Tombol</label>
              <button 
                type="button"
                @click="addButton"
                class="text-sm text-teal-600 hover:text-teal-700 font-medium"
              >
                <i class="fas fa-plus mr-1"></i>Tambah Tombol
              </button>
            </div>

            <div v-for="(btn, idx) in form.buttons" :key="idx" class="flex gap-2 mb-2">
              <input
                v-model="btn.text"
                type="text"
                placeholder="Label tombol"
                class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <input
                v-model="btn.link"
                type="text"
                placeholder="Link (/#medical-checkup)"
                class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
              <button
                type="button"
                @click="removeButton(idx)"
                class="px-3 rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <p v-if="form.buttons.length === 0" class="text-sm text-slate-400 italic">Belum ada tombol</p>
          </div>

          <!-- Status Aktif -->
          <div class="flex items-center gap-3">
            <input
              v-model="form.active"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
            />
            <label class="text-sm text-slate-700">Aktifkan slide ini</label>
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
              {{ loading ? 'Menyimpan...' : editIndex !== null ? 'Update Slide' : 'Simpan Slide' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// ===== STATE =====
const showModal = ref(false)
const editIndex = ref<number | null>(null)
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// ===== SLIDES DATA =====
const slides = ref([
  {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1920&q=80',
    title: 'Deteksi Dini untuk Hidup Sehat',
    description: 'Lakukan medical check up rutin untuk mendeteksi potensi penyakit sejak dini.',
    active: true,
    buttons: [
      { text: 'Jadwalkan MCU', link: '/#medical-checkup' },
      { text: 'Paket MCU', link: '/#medical-checkup' }
    ],
    createdAt: '28 Agustus 2026'
  },
  {
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1920&q=80',
    title: 'ASSYIFA Hospital - Kesehatan untuk Semua',
    description: 'Fasilitas kesehatan dengan pengalaman tak tertandingi.',
    active: true,
    buttons: [
      { text: 'Ketahui Lebih', link: '/about' }
    ],
    createdAt: '27 Agustus 2026'
  },
  {
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1920&q=80',
    title: 'Dokter Spesialis Berpengalaman',
    description: 'Tim dokter ahli di berbagai bidang dengan sertifikasi internasional.',
    active: false,
    buttons: [
      { text: 'Lihat Dokter', link: '/#doctors' }
    ],
    createdAt: '26 Agustus 2026'
  }
])

// ===== FORM =====
const defaultForm = {
  image: '',
  imageFile: null as File | null,
  imagePreview: '',
  title: '',
  description: '',
  buttons: [] as { text: string; link: string }[],
  active: true
}

const form = ref({ ...defaultForm })

// ===== IMAGE HANDLING =====
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const file = input.files[0]
    form.value.imageFile = file
    form.value.imagePreview = URL.createObjectURL(file)
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    const file = files[0]
    form.value.imageFile = file
    form.value.imagePreview = URL.createObjectURL(file)
  }
}

const removeImage = () => {
  form.value.imageFile = null
  form.value.imagePreview = ''
  form.value.image = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

// ===== METHODS =====
const openModal = () => {
  editIndex.value = null
  form.value = { 
    image: '', 
    imageFile: null,
    imagePreview: '',
    title: '', 
    description: '', 
    buttons: [{ text: '', link: '' }], 
    active: true 
  }
  showModal.value = true
}

const editSlide = (index: number) => {
  editIndex.value = index
  const slide = slides.value[index]
  form.value = {
    image: slide.image,
    imageFile: null,
    imagePreview: slide.image || '',
    title: slide.title,
    description: slide.description || '',
    buttons: slide.buttons?.length ? [...slide.buttons] : [{ text: '', link: '' }],
    active: slide.active
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editIndex.value = null
  loading.value = false
  removeImage()
}

const addButton = () => {
  form.value.buttons.push({ text: '', link: '' })
}

const removeButton = (index: number) => {
  form.value.buttons.splice(index, 1)
}

const saveSlide = () => {
  loading.value = true

  setTimeout(() => {
    const today = new Date().toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })

    // Gunakan imagePreview atau image yang sudah ada
    const imageUrl = form.value.imagePreview || form.value.image || 'https://via.placeholder.com/1920x1080/0d9488/ffffff?text=ASSYIFA+Hospital'

    const newSlide = {
      image: imageUrl,
      title: form.value.title,
      description: form.value.description,
      active: form.value.active,
      buttons: form.value.buttons.filter(b => b.text.trim() && b.link.trim()),
      createdAt: today
    }

    if (editIndex.value !== null) {
      slides.value[editIndex.value] = newSlide
    } else {
      slides.value.push(newSlide)
    }

    loading.value = false
    closeModal()
    alert(editIndex.value !== null ? '✅ Slide berhasil diupdate!' : '✅ Slide baru berhasil ditambahkan!')
  }, 1000)
}

const deleteSlide = (index: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
    slides.value.splice(index, 1)
    alert('🗑️ Slide berhasil dihapus!')
  }
}

// ===== EXPORT SLIDES =====
const getSlides = () => {
  return slides.value.filter(s => s.active)
}

defineExpose({ getSlides })
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>