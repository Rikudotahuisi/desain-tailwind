<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 140px">
    <!-- Tab Kategori Utama -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 -mt-6">
      <div class="py-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in mainCategoryTabs"
            :key="cat"
            @click="selectedMainCategory = cat"
            class="px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 border"
            :class="[
              selectedMainCategory === cat
                ? 'bg-teal-500 border-teal-500 text-white shadow-md shadow-teal-500/20'
                : 'border-slate-200 text-slate-600 hover:border-teal-300 hover:bg-teal-50',
            ]"
          >
            {{ cat }}
          </button>
        </div>
      </div>
    </div>

    <!-- ===== CONTENT ===== -->
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16 py-30">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- ===== SIDEBAR FILTER ===== -->
        <div class="w-full lg:w-72 flex-shrink-0">
          <div class="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <!-- Search -->
            <div class="mb-6">
              <div class="relative">
                <i
                  class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
                ></i>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari produk..."
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
            </div>

            <!-- Filter by Umur: kosong = tampilkan semua -->
            <div class="mb-6">
              <h3
                class="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm"
              >
                <i class="fas fa-calendar-alt text-teal-500"></i>
                Filter by Umur
              </h3>
              <div class="space-y-1.5">
                <label
                  v-for="age in AGE_FILTER_OPTIONS"
                  :key="age"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    :value="age"
                    v-model="selectedAges"
                    class="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span class="text-slate-600">{{ age }}</span>
                </label>
              </div>
            </div>

            <!-- Filter by Jenis Kelamin -->
            <div class="mb-6">
              <h3
                class="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm"
              >
                <i class="fas fa-venus-mars text-teal-500"></i>
                Filter by Jenis Kelamin
              </h3>
              <div class="space-y-1.5">
                <label
                  v-for="gender in GENDER_FILTER_OPTIONS"
                  :key="gender"
                  class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer transition hover:bg-slate-50"
                >
                  <input
                    type="checkbox"
                    :value="gender"
                    v-model="selectedGenders"
                    class="w-4 h-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span class="text-slate-600">{{ gender }}</span>
                </label>
              </div>
            </div>

            <div v-if="hasActiveFilters" class="mb-4 p-3 bg-teal-50 rounded-xl">
              <p class="text-xs text-teal-600">
                <i class="fas fa-filter mr-1"></i>
                Filter aktif:
                <span class="font-semibold">{{ activeFilterCount }}</span>
              </p>
            </div>

            <button
              @click="resetFilters"
              class="w-full rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-200"
            >
              <i class="fas fa-undo mr-2"></i>Reset Filter
            </button>
          </div>
        </div>

        <!-- ===== GRID PRODUK ===== -->
        <div class="flex-1">
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-slate-500">
              Menampilkan
              <span class="font-semibold text-slate-700">{{
                filteredItems.length
              }}</span>
              produk
            </p>
            <div class="flex items-center gap-2">
              <span class="text-sm text-slate-500">Urutkan:</span>
              <select
                v-model="sortBy"
                class="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none"
              >
                <option value="popular">Paling Populer</option>
                <option value="price-low">Harga Terendah</option>
                <option value="price-high">Harga Tertinggi</option>
                <option value="name">Nama A-Z</option>
              </select>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <router-link
              v-for="item in filteredItems"
              :key="item.id"
              :to="`/produk/${item.id}`"
              class="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div
                class="relative h-44 bg-gradient-to-br from-teal-50 to-teal-100 overflow-hidden"
              >
                <img
                  :src="getProductImage(item)"
                  :alt="item.name"
                  class="h-full w-full object-cover"
                />
                <span
                  class="absolute top-3 left-3 bg-white/90 px-2.5 py-1 rounded-full text-xs font-semibold text-teal-600 shadow-sm"
                >
                  {{ item.mainCategory }}
                </span>
              </div>

              <div class="p-4">
                <h3 class="font-semibold text-slate-900">{{ item.name }}</h3>
                <p class="text-sm text-slate-500 line-clamp-1 mt-0.5">
                  {{ item.description }}
                </p>
                <div class="mt-3 flex items-center justify-between">
                  <span class="text-lg font-bold text-teal-600">{{
                    formatRupiah(item.price)
                  }}</span>

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
            </router-link>
          </div>

          <div v-if="filteredItems.length === 0" class="py-16 text-center">
            <div class="text-5xl mb-4 text-slate-300">
              <i class="fas fa-search"></i>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">
              Tidak ditemukan
            </h3>
            <p class="text-sm text-slate-500">
              Coba dengan filter atau kata kunci lain
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  useProducts,
  AGE_OPTIONS,
  GENDER_OPTIONS,
  formatRupiah,
  getProductImage,
} from "../composables/useProducts";

const { products } = useProducts();

const AGE_FILTER_OPTIONS = AGE_OPTIONS.filter((a) => a !== "Semua");
const GENDER_FILTER_OPTIONS = GENDER_OPTIONS.filter((g) => g !== "Semua");

const selectedMainCategory = ref("Semua");
const selectedAges = ref<string[]>([]);
const selectedGenders = ref<string[]>([]);
const searchQuery = ref("");
const sortBy = ref("popular");

const mainCategoryTabs = computed(() => {
  const unique = Array.from(new Set(products.value.map((p) => p.mainCategory)));
  return ["Semua", ...unique];
});

const hasActiveFilters = computed(
  () => selectedAges.value.length > 0 || selectedGenders.value.length > 0,
);

const activeFilterCount = computed(
  () => selectedAges.value.length + selectedGenders.value.length,
);

const filteredItems = computed(() => {
  let filtered = products.value;

  if (selectedMainCategory.value !== "Semua") {
    filtered = filtered.filter(
      (item) => item.mainCategory === selectedMainCategory.value,
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query),
    );
  }

  if (selectedAges.value.length > 0) {
    filtered = filtered.filter((item) => selectedAges.value.includes(item.age));
  }

  if (selectedGenders.value.length > 0) {
    filtered = filtered.filter(
      (item) =>
        selectedGenders.value.includes(item.gender) || item.gender === "Semua",
    );
  }

  switch (sortBy.value) {
    case "price-low":
      filtered = [...filtered].sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filtered = [...filtered].sort((a, b) => b.price - a.price);
      break;
    case "name":
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      break;
  }

  return filtered;
});

const resetFilters = () => {
  searchQuery.value = "";
  selectedMainCategory.value = "Semua";
  selectedAges.value = [];
  selectedGenders.value = [];
  sortBy.value = "popular";
};
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.sticky {
  position: sticky;
  top: 100px;
}
</style>
