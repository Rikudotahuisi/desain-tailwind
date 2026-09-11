<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center gap-3">
      <button
        @click="router.push('/admin/slideshow')"
        class="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-slate-500 shadow-sm transition hover:bg-slate-50"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEdit ? 'Edit Slide' : 'Tambah Slide Baru' }}
        </h2>
        <p class="text-sm text-slate-500">Atur konten slideshow yang tampil di halaman utama</p>
      </div>
    </div>

    <form @submit.prevent="handleSubmit" class="max-w-3xl space-y-5 rounded-2xl bg-white p-6 shadow-lg border border-slate-200">
      <!-- Upload Gambar -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Gambar Slide <span class="text-red-500">*</span>
        </label>

        <div
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
          class="relative cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all hover:border-teal-400 hover:bg-teal-50/30"
          :class="form.image ? 'border-teal-400 bg-teal-50/30' : 'border-slate-300'"
        >
          <div v-if="form.image" class="relative">
            <img :src="form.image" alt="Preview" class="mx-auto max-h-56 rounded-lg object-contain" />
            <button
              type="button"
              @click.stop="removeImage"
              class="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white transition hover:bg-red-600"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div v-else>
            <div class="mb-3 text-5xl text-slate-300">
              <i class="fas fa-cloud-upload-alt"></i>
            </div>
            <p class="text-sm font-medium text-slate-600">Klik atau drag & drop untuk upload</p>
            <p class="mt-1 text-xs text-slate-400">PNG, JPG, WEBP (Max 5MB)</p>
          </div>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileChange"
            class="hidden"
          />
        </div>
        <p v-if="errors.image" class="mt-1.5 text-xs text-red-500">{{ errors.image }}</p>
      </div>

      <!-- Judul -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Judul <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.title"
          type="text"
          placeholder="Masukkan judul slide"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
        <p v-if="errors.title" class="mt-1.5 text-xs text-red-500">{{ errors.title }}</p>
      </div>

      <!-- Deskripsi -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">Deskripsi</label>
        <textarea
          v-model="form.description"
          rows="3"
          placeholder="Masukkan deskripsi slide"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        ></textarea>
      </div>

      <!-- Tombol -->
      <div>
        <div class="mb-2 flex items-center justify-between">
          <label class="block text-sm font-semibold text-slate-700">Tombol</label>
          <button
            type="button"
            @click="addButton"
            class="text-sm font-medium text-teal-600 hover:text-teal-700"
          >
            <i class="fas fa-plus mr-1"></i>Tambah Tombol
          </button>
        </div>

        <div v-for="(btn, idx) in form.buttons" :key="idx" class="mb-2 flex gap-2">
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
            class="rounded-xl bg-red-50 px-3 text-red-500 transition hover:bg-red-100"
          >
            <i class="fas fa-times"></i>
          </button>
        </div>

        <p v-if="form.buttons.length === 0" class="text-sm italic text-slate-400">Belum ada tombol</p>
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

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5">
        <button
          type="button"
          @click="router.push('/admin/slideshow')"
          class="rounded-xl px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
        >
          Batal
        </button>
        <button
          type="submit"
          :disabled="loading"
          class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
          <i v-else class="fas fa-save mr-2"></i>
          {{ loading ? 'Menyimpan...' : isEdit ? 'Update Slide' : 'Simpan Slide' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSlideshow } from '../../composables/useSlideshow'

const route = useRoute()
const router = useRouter()
const { getSlideById, addSlide, updateSlide } = useSlideshow()

const fileInput = ref<HTMLInputElement | null>(null)
const loading = ref(false)

const isEdit = computed(() => !!route.params.id)
const slideId = computed(() => Number(route.params.id))

const form = ref({
  image: '',
  title: '',
  description: '',
  buttons: [{ text: '', link: '' }] as { text: string; link: string }[],
  active: true
})

const errors = reactive({
  image: '',
  title: ''
})

onMounted(() => {
  if (isEdit.value) {
    const slide = getSlideById(slideId.value)
    if (slide) {
      form.value = {
        image: slide.image,
        title: slide.title,
        description: slide.description,
        buttons: slide.buttons.length ? [...slide.buttons.map(b => ({ ...b }))] : [{ text: '', link: '' }],
        active: slide.active
      }
    } else {
      router.push('/admin/slideshow')
    }
  }
})

// ===== IMAGE HANDLING (base64 supaya persist di localStorage) =====
const triggerFileInput = () => fileInput.value?.click()

const readFileAsBase64 = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    form.value.image = reader.result as string
  }
  reader.readAsDataURL(file)
}

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    readFileAsBase64(input.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files
  if (files && files[0]) {
    readFileAsBase64(files[0])
  }
}

const removeImage = () => {
  form.value.image = ''
  if (fileInput.value) fileInput.value.value = ''
}

// ===== TOMBOL =====
const addButton = () => form.value.buttons.push({ text: '', link: '' })
const removeButton = (index: number) => form.value.buttons.splice(index, 1)

// ===== SUBMIT =====
const validate = () => {
  errors.image = form.value.image ? '' : 'Gambar slide wajib diisi'
  errors.title = form.value.title.trim() ? '' : 'Judul wajib diisi'
  return !errors.image && !errors.title
}

const handleSubmit = () => {
  if (!validate()) return
  loading.value = true

  const payload = {
    image: form.value.image,
    title: form.value.title,
    description: form.value.description,
    active: form.value.active,
    buttons: form.value.buttons.filter(b => b.text.trim() && b.link.trim())
  }

  setTimeout(() => {
    if (isEdit.value) {
      updateSlide(slideId.value, payload)
    } else {
      addSlide(payload)
    }
    loading.value = false
    router.push('/admin/slideshow')
  }, 500)
}
</script>