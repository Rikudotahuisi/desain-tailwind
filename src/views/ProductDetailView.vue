<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px">
    <div class="mx-auto max-w-4xl px-6 lg:px-0 py-10">
      <button
        @click="router.push('/produk')"
        class="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-teal-600 transition"
      >
        <i class="fas fa-arrow-left"></i> Kembali ke daftar produk
      </button>

      <div v-if="item" class="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div class="relative h-72 bg-gradient-to-br from-teal-100 to-teal-200">
          <img
            v-if="item.image"
            :src="item.image"
            :alt="item.name"
            class="h-full w-full object-cover"
          />
          <div v-else class="flex h-full items-center justify-center">
            <i :class="[item.icon, 'text-8xl text-teal-500/40']"></i>
          </div>
          <span
            class="absolute top-4 left-4 bg-white/90 px-3 py-1.5 rounded-full text-xs font-semibold text-teal-600 shadow-sm"
          >
            {{ item.mainCategory }} · {{ item.subCategory }}
          </span>
        </div>

        <div class="p-6 md:p-8 space-y-6">
          <div>
            <h1 class="text-2xl font-bold text-slate-900">{{ item.name }}</h1>
            <p class="text-slate-500 mt-2">{{ item.fullDescription }}</p>
          </div>

          <div>
            <h4 class="font-semibold text-slate-900 mb-3">
              <i class="fas fa-list-check mr-2 text-teal-500"></i>Pemeriksaan
            </h4>
            <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div
                v-for="test in item.tests"
                :key="test"
                class="flex items-start gap-2"
              >
                <i class="fas fa-check-circle mt-0.5 text-teal-500 text-sm"></i>
                <span class="text-sm text-slate-600">{{ test }}</span>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 rounded-xl p-4">
            <h4 class="font-semibold text-slate-900 mb-1">
              <i class="fas fa-users mr-2 text-blue-500"></i>Direkomendasikan
            </h4>
            <p class="text-sm text-slate-600">{{ item.recommended }}</p>
          </div>

          <div
            class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200 pt-6"
          >
            <div>
              <p class="text-sm text-slate-500">Harga</p>
              <p class="text-3xl font-bold text-teal-600">
                {{ formatRupiah(item.price) }}
              </p>
            </div>
            <router-link
              to="/register"
              class="rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
            >
              <i class="fas fa-calendar-check mr-2"></i>Booking Sekarang
            </router-link>
          </div>
        </div>
      </div>

      <div v-else class="py-20 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-file-circle-exclamation"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">
          Produk tidak ditemukan
        </h3>
        <p class="text-sm text-slate-500 mb-4">
          Produk yang Anda cari mungkin sudah tidak tersedia
        </p>
        <button
          @click="router.push('/produk')"
          class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 transition"
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
import { useProducts, formatRupiah } from "../composables/useProducts";

const route = useRoute();
const router = useRouter();
const { getProductById } = useProducts();

const item = computed(() => getProductById(Number(route.params.id)));
</script>
