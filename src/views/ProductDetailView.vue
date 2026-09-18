<template>
  <div class="min-h-screen bg-slate-50 pt-[100px] pb-16">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
      <!-- ========================================== -->
      <!-- HEADER: BREADCRUMB + TOMBOL KEMBALI -->
      <!-- ========================================== -->
      <header v-if="item" class="mb-6">
        <!-- Breadcrumb: Beranda > Produk > Kategori > Nama Produk -->
        <nav aria-label="Breadcrumb" class="mb-4">
          <ol class="flex flex-wrap items-center gap-1 text-sm text-slate-500">
            <!-- Beranda -->
            <li>
              <router-link to="/" class="transition-colors hover:text-teal-600">
                Beranda
              </router-link>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Produk -->
            <li>
              <router-link
                to="/produk"
                class="transition-colors hover:text-teal-600"
              >
                Produk
              </router-link>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Kategori Produk -->
            <li>
              <span class="font-medium text-teal-600">{{
                item.mainCategory
              }}</span>
            </li>
            <li class="text-slate-300">
              <i class="fas fa-chevron-right text-[10px]"></i>
            </li>

            <!-- Nama Produk -->
            <li class="min-w-0 flex-1">
              <span class="block truncate font-semibold text-slate-900">
                {{ item.name }}
              </span>
            </li>
          </ol>
        </nav>
      </header>

      <!-- ========================================== -->
      <!-- DETAIL PRODUK -->
      <!-- ========================================== -->
      <div v-if="item" class="overflow-hidden rounded-3xl bg-white shadow-lg">
        <!-- Gambar Produk -->
        <div class="relative h-72 bg-gradient-to-br from-teal-100 to-teal-200">
          <img
            :src="getProductImage(item)"
            :alt="item.name"
            class="h-full w-full object-cover"
          />
          <span
            class="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-teal-600 shadow-sm"
          >
            {{ item.mainCategory }}
          </span>
        </div>

        <!-- Body Produk -->
        <div class="space-y-6 p-6 md:p-8">
          <!-- Nama & Deskripsi -->
          <div>
            <h1 class="text-2xl font-bold text-slate-900">{{ item.name }}</h1>
            <p class="mt-2 text-slate-500">{{ item.fullDescription }}</p>
          </div>

          <!-- Pemeriksaan -->
          <div>
            <h4 class="mb-3 font-semibold text-slate-900">
              <i class="fas fa-list-check mr-2 text-teal-500"></i>Pemeriksaan
            </h4>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div
                v-for="test in item.tests"
                :key="test"
                class="flex items-start gap-2"
              >
                <i class="fas fa-check-circle mt-0.5 text-sm text-teal-500"></i>
                <span class="text-sm text-slate-600">{{ test }}</span>
              </div>
            </div>
          </div>

          <!-- Direkomendasikan -->
          <div class="rounded-xl bg-blue-50 p-4">
            <h4 class="mb-1 font-semibold text-slate-900">
              <i class="fas fa-users mr-2 text-blue-500"></i>Direkomendasikan
            </h4>
            <p class="text-sm text-slate-600">{{ item.recommended }}</p>
          </div>

          <!-- Harga & Booking -->
          <div
            class="flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center"
          >
            <div>
              <p class="text-sm text-slate-500">Harga</p>
              <p class="text-3xl font-bold text-teal-600">
                {{ formatRupiah(item.price) }}
              </p>
            </div>
            <router-link
              to="/register"
              class="rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal-600"
            >
              <i class="fas fa-calendar-check mr-2"></i>Booking Sekarang
            </router-link>
          </div>
        </div>
      </div>

      <!-- ========================================== -->
      <!-- NOT FOUND STATE -->
      <!-- ========================================== -->
      <div v-else class="py-20 text-center">
        <div class="mb-4 text-5xl text-slate-300">
          <i class="fas fa-file-circle-exclamation"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">
          Produk tidak ditemukan
        </h3>
        <p class="mb-4 text-sm text-slate-500">
          Produk yang Anda cari mungkin sudah tidak tersedia
        </p>
        <button
          @click="router.push('/produk')"
          class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          Lihat Produk Lain
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  useProducts,
  formatRupiah,
  getProductImage,
} from "../composables/useProducts";

const route = useRoute();
const router = useRouter();
const { getProductById } = useProducts();

const item = computed(() => getProductById(Number(route.params.id)));
</script>
