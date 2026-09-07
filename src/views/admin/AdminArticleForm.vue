<template>
  <div>
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <button
        @click="goBack"
        class="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEdit ? 'Edit Artikel' : 'Tambah Artikel Baru' }}
        </h2>
        <p class="text-sm text-slate-500">
          {{ isEdit ? 'Perbarui informasi artikel di bawah ini' : 'Lengkapi informasi artikel kesehatan baru' }}
        </p>
      </div>
    </div>

    <!-- Not found state (edit id invalid) -->
    <div v-if="isEdit && !found" class="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
      <div class="text-5xl mb-4 text-slate-300">
        <i class="fas fa-circle-exclamation"></i>
      </div>
      <h3 class="text-lg font-semibold text-slate-900">Artikel tidak ditemukan</h3>
      <p class="text-sm text-slate-500 mb-6">Artikel yang ingin Anda edit tidak tersedia.</p>
      <button
        @click="goBack"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
      >
        Kembali ke Daftar Artikel
      </button>
    </div>

    <!-- ===== FORM PAGE ===== -->
    <form v-else @submit.prevent="saveArticle" class="space-y-6">
      <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <!-- Upload Gambar -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Gambar Artikel <span class="text-red-500">*</span>
          </label>
          <div
            @dragover.prevent
            @drop.prevent="handleDrop"
            @click="triggerFileInput"
            class="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/30"
            :class="[
              form.imagePreview || form.image
                ? 'border-teal-400 bg-teal-50/30'
                : 'border-slate-300'
            ]"
          >
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

        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <!-- Judul -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Judul <span class="text-red-500">*</span>
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="Masukkan judul artikel"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
          </div>

          <!-- Kategori -->
          <div>
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Kategori <span class="text-red-500">*</span>
            </label>
            <select
              v-model="form.category"
              required
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="">Pilih Kategori</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <!-- Penulis -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Penulis <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.author"
            type="text"
            required
            placeholder="Nama penulis"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Ringkasan (Excerpt) -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Ringkasan <span class="text-red-500">*</span>
          </label>
          <textarea
            v-model="form.excerpt"
            rows="2"
            required
            placeholder="Ringkasan artikel (akan tampil di card)"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          ></textarea>
        </div>

        <!-- Konten Lengkap (WYSIWYG Editor) -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Konten Lengkap <span class="text-red-500">*</span>
          </label>
          <div class="rounded-xl border border-slate-200 overflow-hidden focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20 transition">
            <QuillEditor
              v-model:content="form.content"
              content-type="html"
              theme="snow"
              :toolbar="quillToolbar"
              placeholder="Tulis isi lengkap artikel di sini..."
              class="bg-slate-50/50"
            />
          </div>
          <p v-if="contentError" class="mt-1.5 text-xs text-red-500">Konten artikel tidak boleh kosong.</p>
        </div>

        <!-- Status Publikasi -->
        <div class="flex items-center gap-3">
          <input
            v-model="form.published"
            type="checkbox"
            class="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
          />
          <label class="text-sm text-slate-700">Publikasikan artikel ini</label>
        </div>
      </div>

      <!-- Footer Aksi -->
      <div class="flex items-center justify-end gap-3">
        <button
          type="button"
          @click="goBack"
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
          {{ loading ? 'Menyimpan...' : isEdit ? 'Update Artikel' : 'Simpan Artikel' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import { useArticles } from '../../composables/useArticles'

const route = useRoute()
const router = useRouter()
const { categories, getArticleById, addArticle, updateArticle } = useArticles()

// ===== MODE: create vs edit, ditentukan dari route param =====
const editId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const isEdit = computed(() => editId.value !== null)
const found = ref(true)

// ===== TOOLBAR WYSIWYG =====
const quillToolbar = [
  [{ header: [2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['blockquote', 'link', 'image'],
  [{ align: [] }],
  ['clean']
]

// ===== STATE =====
const loading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const contentError = ref(false)

const defaultForm = {
  image: '',
  imageFile: null as File | null,
  imagePreview: '',
  title: '',
  category: '',
  author: '',
  excerpt: '',
  content: '',
  published: false
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

// ===== LOAD DATA JIKA MODE EDIT =====
onMounted(() => {
  if (isEdit.value && editId.value !== null) {
    const article = getArticleById(editId.value)
    if (article) {
      form.value = {
        image: article.image,
        imageFile: null,
        imagePreview: article.image || '',
        title: article.title,
        category: article.category,
        author: article.author,
        excerpt: article.excerpt,
        content: article.content || '',
        published: article.published
      }
      found.value = true
    } else {
      found.value = false
    }
  }
})

// ===== NAVIGASI =====
const goBack = () => {
  router.push({ name: 'admin-articles' })
}

// ===== SIMPAN =====
const saveArticle = () => {
  // Validasi konten WYSIWYG (Quill kosong biasanya menghasilkan '<p><br></p>')
  const plainContent = form.value.content.replace(/<(.|\n)*?>/g, '').trim()
  if (!plainContent) {
    contentError.value = true
    return
  }
  contentError.value = false
  loading.value = true

  setTimeout(() => {
    const imageUrl = form.value.imagePreview || form.value.image || 'https://via.placeholder.com/800x400/0d9488/ffffff?text=ASSYIFA+Hospital'

    const payload = {
      title: form.value.title,
      excerpt: form.value.excerpt,
      content: form.value.content,
      image: imageUrl,
      category: form.value.category,
      author: form.value.author,
      published: form.value.published
    }

    if (isEdit.value && editId.value !== null) {
      updateArticle(editId.value, payload)
      alert('✅ Artikel berhasil diupdate!')
    } else {
      addArticle(payload)
      alert('✅ Artikel baru berhasil ditambahkan!')
    }

    loading.value = false
    goBack()
  }, 800)
}
</script>

<style scoped>
:deep(.ql-toolbar) {
  border: none;
  border-bottom: 1px solid #e2e8f0;
  background: #f8fafc;
}
:deep(.ql-container) {
  border: none;
  min-height: 220px;
  font-size: 0.875rem;
}
:deep(.ql-editor) {
  min-height: 220px;
}
</style>
