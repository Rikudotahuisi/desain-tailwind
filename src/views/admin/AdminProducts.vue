<template>
  <div>
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Produk</h2>
        <p class="text-sm text-slate-500">
          Kelola semua produk ASSYIFA Hospital
        </p>
      </div>
      <button
        @click="router.push('/admin/products/create')"
        class="rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
      >
        <i class="fas fa-plus mr-2"></i>Tambah Produk
      </button>
    </div>

    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <div class="relative flex-1 max-w-sm">
        <i
          class="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
        ></i>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Cari produk..."
          class="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="filterMainCategory"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Kategori Utama</option>
          <option v-for="cat in mainCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>
        <select
          v-model="filterSubCategory"
          class="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        >
          <option value="">Semua Sub Kategori</option>
          <option v-for="sub in subCategories" :key="sub" :value="sub">
            {{ sub }}
          </option>
        </select>
      </div>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200">
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Produk
              </th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Kategori Utama
              </th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Sub Kategori
              </th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Umur
              </th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Gender
              </th>
              <th class="text-left py-3.5 px-4 font-semibold text-slate-600">
                Harga
              </th>
              <th class="text-center py-3.5 px-4 font-semibold text-slate-600">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredItems"
              :key="item.id"
              class="border-b border-slate-100 hover:bg-slate-50 transition"
            >
              <td class="py-3 px-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center overflow-hidden flex-shrink-0"
                  >
                    <img
                      v-if="item.image"
                      :src="item.image"
                      class="w-full h-full object-cover"
                    />
                    <i v-else :class="[item.icon, 'text-teal-500']"></i>
                  </div>
                  <p class="font-medium text-slate-900">{{ item.name }}</p>
                </div>
              </td>
              <td class="py-3 px-4 text-slate-600">{{ item.mainCategory }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.subCategory }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.age }}</td>
              <td class="py-3 px-4 text-slate-600">{{ item.gender }}</td>
              <td class="py-3 px-4 font-semibold text-teal-600">
                {{ formatRupiah(item.price) }}
              </td>
              <td class="py-3 px-4 text-center">
                <button
                  @click="router.push(`/admin/products/edit/${item.id}`)"
                  class="text-teal-600 hover:text-teal-700 mr-2 transition"
                >
                  <i class="fas fa-edit"></i>
                </button>
                <button
                  @click="handleDelete(item.id)"
                  class="text-red-500 hover:text-red-600 transition"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="filteredItems.length === 0" class="py-12 text-center">
        <div class="text-5xl mb-4 text-slate-300">
          <i class="fas fa-box-open"></i>
        </div>
        <h3 class="text-lg font-semibold text-slate-900">Tidak ada produk</h3>
        <p class="text-sm text-slate-500">Belum ada produk yang ditambahkan</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useProducts, formatRupiah } from "../../composables/useProducts";

const router = useRouter();
const { products, deleteProduct } = useProducts();

const searchQuery = ref("");
const filterMainCategory = ref("");
const filterSubCategory = ref("");

const mainCategories = computed(() =>
  Array.from(new Set(products.value.map((p) => p.mainCategory))),
);

const subCategories = computed(() =>
  Array.from(new Set(products.value.map((p) => p.subCategory))),
);

const filteredItems = computed(() => {
  let filtered = products.value;

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.subCategory.toLowerCase().includes(query),
    );
  }

  if (filterMainCategory.value) {
    filtered = filtered.filter(
      (item) => item.mainCategory === filterMainCategory.value,
    );
  }

  if (filterSubCategory.value) {
    filtered = filtered.filter(
      (item) => item.subCategory === filterSubCategory.value,
    );
  }

  return filtered;
});

const handleDelete = (id: number) => {
  if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
    deleteProduct(id);
  }
};
</script>
