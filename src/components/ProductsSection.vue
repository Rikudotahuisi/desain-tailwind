<template>
  <section id="medical-checkup" class="scroll-mt-20 py-20 bg-slate-50">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <!-- Header -->
      <div class="mb-12 text-center">
        <div
          class="inline-flex items-center gap-3 rounded-full bg-teal-50 px-4 py-2"
        >
          <span class="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>

          <span
            class="text-sm font-semibold tracking-wider text-teal-600 uppercase"
          >
            <i class="fas fa-heartbeat mr-2"></i>
            Produk
          </span>
        </div>

        <h2 class="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
          Pilihan Produk Terbaik Untuk Anda
          <br class="hidden lg:block" />
        </h2>

        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Pilih paket yang sesuai dengan kebutuhan kesehatan Anda. Deteksi dini
          untuk hidup yang lebih sehat.
        </p>
      </div>
      <!-- lihat produk lainnya -->
      <div class="mb-12 text-right">
        <router-link
          to="/produk"
          class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
        >
          <i class="fas fa-product-hunt"></i>
          Semua Produk
        </router-link>
      </div>

      <!-- Jika belum ada produk -->
      <div v-if="checkupProducts.length === 0" class="py-12 text-center">
        <div class="mb-4 text-5xl text-slate-300">
          <i class="fas fa-briefcase-medical"></i>
        </div>

        <h3 class="text-lg font-semibold text-slate-900">
          Belum ada paket checkup
        </h3>

        <p class="text-sm text-slate-500">
          Paket skrining akan tampil di sini setelah ditambahkan oleh admin
        </p>
      </div>

      <template v-else>
        <!-- ========================= -->
        <!-- GRID PRODUK -->
        <!-- ========================= -->
        <div
          class="grid grid-cols-2 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <div
            v-for="item in checkupProducts"
            :key="item.id"
            class="group overflow-hidden rounded-2xl bg-white border border-slate-100 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <!-- ========================= -->
            <!-- GAMBAR PRODUK -->
            <!-- ========================= -->
            <div
              class="relative h-48 w-full overflow-hidden bg-slate-100 sm:h-52"
            >
              <!-- Gambar -->
              <img
                :src="getProductImage(item)"
                :alt="item.name"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span
                class="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-teal-600 shadow-sm"
              >
                {{ item.mainCategory }}
              </span>
            </div>

            <!-- ========================= -->
            <!-- INFORMASI PRODUK -->
            <!-- ========================= -->
            <div class="p-4 text-left">
              <!-- Nama Produk -->
              <h4
                class="min-h-[20px] text-base font-semibold leading-5 text-slate-900"
              >
                {{ item.name }}
              </h4>

              <!-- Deskripsi Produk -->
              <p class="mt-1 text-sm text-slate-500 line-clamp-1">
                {{ item.description }}
              </p>

              <!-- Harga -->
              <p class="mt-3 text-lg font-bold text-teal-600">
                {{ formatRupiah(item.price) }}
              </p>

              <!-- Tombol Lihat Detail -->
              <router-link
                :to="`/produk/${item.id}`"
                class="mt-3 inline-flex items-center gap-1 rounded-full border border-teal-500 px-4 py-2 text-xs font-medium text-teal-600 transition hover:bg-teal-500 hover:text-white"
              >
                Lihat Detail
                <i class="fas fa-arrow-right text-[9px]"></i>
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <!-- ========================= -->
      <!-- CTA BANNER -->
      <!-- ========================= -->
      <div
        class="mt-16 rounded-3xl bg-gradient-to-r from-teal-600 to-teal-700 p-10 text-center text-white shadow-xl"
      >
        <h3 class="text-2xl font-bold lg:text-3xl">
          <i class="fas fa-phone-alt mr-3"></i>
          Ingin Mengambil Antrian?
        </h3>

        <p class="mt-2 text-teal-100">
          Konsultasikan dengan tim kami untuk mendapatkan rekomendasi yang tepat
        </p>

        <div class="mt-6 flex flex-wrap items-center justify-center gap-4">
          <router-link
            to="/antrian"
            class="rounded-full bg-white px-8 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5"
          >
            <i class="fas fa-calendar-check mr-2"></i>
            Ambil Antrian
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";

import {
  useProducts,
  formatRupiah,
  getProductImage,
} from "../composables/useProducts";

const { products } = useProducts();

const checkupProducts = computed(() =>
  products.value.filter((p) => p.mainCategory === "Medical Checkup"),
);
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
