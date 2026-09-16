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
            <i class="fas fa-heartbeat mr-2"></i>Layanan Skrining
          </span>
        </div>
        <h2 class="mt-4 text-4xl font-bold text-slate-900 lg:text-5xl">
          Medical Check Up <br class="hidden lg:block" />
          <span class="text-teal-600">Komprehensif & Terpercaya</span>
        </h2>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Pilih paket skrining yang sesuai dengan kebutuhan kesehatan Anda.
          Deteksi dini untuk hidup yang lebih sehat.
        </p>
      </div>

      <div v-if="checkupProducts.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
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
        <div
          class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
        >
          <div
            v-for="(item, index) in checkupProducts"
            :key="item.id"
            @click="selectedIndex = index"
            class="group cursor-pointer rounded-2xl bg-white p-4 text-center shadow-sm border border-slate-100 transition-all hover:-translate-y-1 hover:shadow-lg"
            :class="[
              selectedIndex === index
                ? 'ring-2 ring-teal-500 bg-teal-50/60'
                : 'hover:border-teal-200',
            ]"
          >
            <div
              class="mx-auto mb-3 flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl text-2xl transition-colors"
              :class="[
                item.image
                  ? ''
                  : selectedIndex === index
                    ? 'bg-teal-500 text-white'
                    : 'bg-teal-50 text-teal-600 group-hover:bg-teal-100',
              ]"
            >
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.name"
                class="h-full w-full object-cover"
              />
              <i v-else :class="item.icon"></i>
            </div>
            <h4 class="text-sm font-semibold text-slate-900">
              {{ item.name }}
            </h4>
            <p class="mt-1 text-xs text-slate-500">{{ item.description }}</p>
            <div
              v-if="selectedIndex === index"
              class="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-teal-600"
            >
              <i class="fas fa-check-circle"></i>
              <span>Dipilih</span>
            </div>
          </div>
        </div>

        <div
          v-if="selected"
          class="mt-12 rounded-3xl bg-white p-8 shadow-lg border border-slate-100"
        >
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div class="lg:col-span-2">
              <div class="flex items-start gap-4">
                <div
                  class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl text-3xl"
                  :class="selected.image ? '' : 'bg-teal-50 text-teal-600'"
                >
                  <img
                    v-if="selected.image"
                    :src="selected.image"
                    :alt="selected.name"
                    class="h-full w-full object-cover"
                  />
                  <i v-else :class="selected.icon"></i>
                </div>
                <div>
                  <h3 class="text-2xl font-bold text-slate-900">
                    {{ selected.name }}
                  </h3>
                  <p class="mt-1 text-slate-600">
                    {{ selected.fullDescription }}
                  </p>
                </div>
              </div>

              <div class="mt-6">
                <h4 class="mb-3 font-semibold text-slate-900">
                  <i class="fas fa-list-check mr-2 text-teal-500"></i>
                  Pemeriksaan yang Termasuk:
                </h4>
                <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <div
                    v-for="test in selected.tests"
                    :key="test"
                    class="flex items-start gap-3 rounded-lg bg-slate-50 p-3"
                  >
                    <i class="fas fa-check-circle mt-0.5 text-teal-500"></i>
                    <span class="text-sm text-slate-600">{{ test }}</span>
                  </div>
                </div>
              </div>

              <div class="mt-6 rounded-xl bg-blue-50 p-4">
                <h4 class="mb-2 font-semibold text-slate-900">
                  <i class="fas fa-users mr-2 text-blue-500"></i>
                  Direkomendasikan untuk:
                </h4>
                <p class="text-sm text-slate-600">
                  {{ selected.recommended }}
                </p>
              </div>

              <router-link
                :to="`/produk/${selected.id}`"
                class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
              >
                Lihat Detail Lengkap <i class="fas fa-arrow-right"></i>
              </router-link>
            </div>

            <div class="lg:col-span-1">
              <div
                class="rounded-2xl bg-gradient-to-br from-teal-50 to-white p-6 text-center"
              >
                <p class="text-sm text-slate-500">Mulai dari</p>
                <p class="text-4xl font-bold text-teal-600">
                  {{ formatRupiah(selected.price) }}
                </p>
                <p class="mt-1 text-sm text-slate-500">
                  termasuk konsultasi dokter
                </p>

                <div class="mt-6 space-y-3">
                  <router-link
                    to="/register"
                    class="flex w-full items-center justify-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"
                  >
                    <i class="fas fa-calendar-check"></i>
                    Booking Sekarang
                  </router-link>

                  <a
                    href="#"
                    class="flex w-full items-center justify-center gap-2 rounded-full border border-teal-200 bg-white px-6 py-3 font-semibold text-teal-600 transition hover:bg-teal-50 hover:-translate-y-0.5"
                  >
                    <i class="fas fa-phone"></i>
                    Konsultasi Gratis
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- CTA Banner -->
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
            <i class="fas fa-calendar-check mr-2"></i>Ambil Antrian
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useProducts, formatRupiah } from "../composables/useProducts";

const { products } = useProducts();

const checkupProducts = computed(() =>
  products.value.filter((p) => p.mainCategory === "Medical Checkup"),
);

const selectedIndex = ref<number | null>(
  checkupProducts.value.length > 0 ? 0 : null,
);

const selected = computed(() =>
  selectedIndex.value !== null
    ? checkupProducts.value[selectedIndex.value]
    : null,
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
</style>
