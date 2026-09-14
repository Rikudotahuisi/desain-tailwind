<template>
  <div>
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Kelola Slideshow</h2>
        <p class="text-sm text-slate-500">Atur konten slideshow yang tampil di halaman utama</p>
      </div>
      <router-link
        to="/admin/slideshow/create"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Slide
      </router-link>
    </div>

    <!-- Slides Grid -->
    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition hover:shadow-xl"
      >
        <!-- Preview Image -->
        <div class="relative h-48 overflow-hidden bg-slate-200">
          <img
            :src="slide.image || '/placeholder-image.jpg'"
            :alt="slide.title"
            class="h-full w-full object-cover"
          />
          <div class="absolute top-2 right-2 flex gap-1">
            <span v-if="slide.active" class="rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              Aktif
            </span>
            <span v-else class="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-semibold text-white">
              Nonaktif
            </span>
          </div>
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <span class="text-xs text-white/80">Slide #{{ index + 1 }}</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h3 class="line-clamp-1 font-bold text-slate-900">{{ slide.title || 'Tanpa Judul' }}</h3>
          <p class="mt-1 line-clamp-2 text-sm text-slate-600">{{ slide.description || 'Tanpa Deskripsi' }}</p>
          <div class="mt-3 flex items-center gap-2 text-xs text-slate-500">
            <span><i class="far fa-calendar-alt mr-1"></i>{{ slide.createdAt }}</span>
            <span class="h-1 w-1 rounded-full bg-slate-300"></span>
            <span>{{ slide.buttons.length }} tombol</span>
          </div>
          <div class="mt-3 flex items-center gap-2">
            <button
              @click="toggleActive(slide.id)"
              class="flex-1 rounded-lg px-3 py-1.5 text-sm font-medium transition"
              :class="slide.active ? 'bg-amber-50 text-amber-600 hover:bg-amber-100' : 'bg-green-50 text-green-600 hover:bg-green-100'"
            >
              <i class="fas fa-power-off mr-1"></i>{{ slide.active ? 'Nonaktifkan' : 'Aktifkan' }}
            </button>
            <router-link
              :to="`/admin/slideshow/edit/${slide.id}`"
              class="rounded-lg bg-teal-50 px-3 py-1.5 text-sm font-medium text-teal-600 transition hover:bg-teal-100"
            >
              <i class="fas fa-edit"></i>
            </router-link>
            <button
              @click="handleDelete(slide.id)"
              class="rounded-lg bg-red-50 px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="slides.length === 0" class="col-span-full py-12 text-center">
        <div class="mb-4 text-6xl text-slate-300">
          <i class="fas fa-images"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Belum ada slide</h3>
        <p class="text-sm text-slate-500">Klik tombol "Tambah Slide" untuk menambahkan slide baru</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideshow } from '../../composables/useSlideshow'

const { slides, deleteSlide, toggleActive } = useSlideshow()

const handleDelete = (id: number) => {
  if (confirm('Apakah Anda yakin ingin menghapus slide ini?')) {
    deleteSlide(id)
  }
}
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