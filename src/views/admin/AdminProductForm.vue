<template>
  <div>
    <div class="flex items-center gap-3 mb-6">
      <button
        @click="router.push('/admin/products')"
        class="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-100"
      >
        <i class="fas fa-arrow-left"></i>
      </button>
      <div>
        <h2 class="text-2xl font-bold text-slate-900">
          {{ isEdit ? "Edit Produk" : "Tambah Produk" }}
        </h2>
        <p class="text-sm text-slate-500">
          {{ isEdit ? "Perbarui data produk" : "Lengkapi data produk baru" }}
        </p>
      </div>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5"
    >
      <!-- Upload Foto (disamakan dengan upload artikel) -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Foto Produk
          <span class="text-xs font-normal text-slate-400"
            >(opsional, foto random akan dipakai jika kosong)</span
          >
        </label>
        <div
          @dragover.prevent
          @drop.prevent="handleDrop"
          @click="triggerFileInput"
          class="relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all hover:border-teal-400 hover:bg-teal-50/30"
          :class="[
            form.imagePreview || form.image
              ? 'border-teal-400 bg-teal-50/30'
              : 'border-slate-300',
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
            <p class="text-sm font-medium text-slate-600">
              Klik atau drag & drop untuk upload
            </p>
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
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Nama Produk <span class="text-red-500">*</span>
          </label>
          <input
            v-model="form.name"
            type="text"
            required
            placeholder="Skrining Umum"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>

        <!-- Kategori Utama -->
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Kategori Utama <span class="text-red-500">*</span>
          </label>
          <select
            v-model="mainCategorySelect"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option value="" disabled>Pilih kategori utama</option>
            <option
              v-for="cat in existingMainCategories"
              :key="cat"
              :value="cat"
            >
              {{ cat }}
            </option>
            <option value="__new__">+ Tambah Kategori Utama Baru</option>
          </select>
          <input
            v-if="mainCategorySelect === '__new__'"
            v-model="form.mainCategory"
            type="text"
            required
            placeholder="Mis. Farmasi, Alat Kesehatan"
            class="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Harga (Rp) <span class="text-red-500">*</span>
          </label>
          <input
            v-model.number="form.price"
            type="number"
            min="0"
            step="1000"
            required
            placeholder="350000"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Umur <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.age"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option v-for="age in AGE_OPTIONS" :key="age" :value="age">
              {{ age }}
            </option>
          </select>
        </div>
        <div>
          <label class="mb-1.5 block text-sm font-semibold text-slate-700">
            Jenis Kelamin <span class="text-red-500">*</span>
          </label>
          <select
            v-model="form.gender"
            required
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          >
            <option v-for="g in GENDER_OPTIONS" :key="g" :value="g">
              {{ g }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Deskripsi Singkat <span class="text-red-500">*</span>
        </label>
        <input
          v-model="form.description"
          type="text"
          required
          placeholder="Pemeriksaan kesehatan dasar"
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
      </div>

      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Deskripsi Lengkap <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.fullDescription"
          rows="2"
          required
          placeholder="Paket skrining kesehatan umum untuk..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        ></textarea>
      </div>

      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Direkomendasikan Untuk <span class="text-red-500">*</span>
        </label>
        <textarea
          v-model="form.recommended"
          rows="2"
          required
          placeholder="Semua usia, terutama untuk deteksi dini..."
          class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        ></textarea>
      </div>

      <!-- Daftar Pemeriksaan -->
      <div>
        <label class="mb-1.5 block text-sm font-semibold text-slate-700">
          Daftar Pemeriksaan <span class="text-red-500">*</span>
        </label>
        <div class="space-y-2">
          <div
            v-for="(test, index) in form.tests"
            :key="index"
            class="flex items-center gap-2"
          >
            <input
              v-model="form.tests[index]"
              type="text"
              required
              placeholder="Cek Tekanan Darah"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            />
            <button
              type="button"
              @click="removeTest(index)"
              class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl text-red-500 hover:bg-red-50 transition"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
        <button
          type="button"
          @click="addTest"
          class="mt-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition"
        >
          <i class="fas fa-plus mr-1"></i>Tambah Item Pemeriksaan
        </button>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-end gap-3 border-t border-slate-200 pt-5"
      >
        <button
          type="button"
          @click="router.push('/admin/products')"
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
          {{
            loading
              ? "Menyimpan..."
              : isEdit
                ? "Update Produk"
                : "Simpan Produk"
          }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  useProducts,
  AGE_OPTIONS,
  GENDER_OPTIONS,
} from "../../composables/useProducts";

const router = useRouter();
const route = useRoute();
const { products, getProductById, addProduct, updateProduct } = useProducts();

const isEdit = computed(() => !!route.params.id);
const loading = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);

const existingMainCategories = computed(() =>
  Array.from(new Set(products.value.map((p) => p.mainCategory))),
);

const mainCategorySelect = ref("");

const defaultForm = {
  image: "",
  imageFile: null as File | null,
  imagePreview: "",
  name: "",
  description: "",
  fullDescription: "",
  mainCategory: "",
  price: 0,
  recommended: "",
  age: "Semua",
  gender: "Semua" as "Semua" | "Laki-laki" | "Wanita",
  tests: [""],
};

const form = ref({ ...defaultForm });

watch(mainCategorySelect, (val) => {
  form.value.mainCategory = val !== "__new__" ? val : "";
});

// ===== IMAGE HANDLING (disamakan dengan AdminArticleForm.vue) =====
const triggerFileInput = () => {
  fileInput.value?.click();
};

const handleFileChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    form.value.imageFile = file;
    form.value.imagePreview = URL.createObjectURL(file);
  }
};

const handleDrop = (event: DragEvent) => {
  const files = event.dataTransfer?.files;
  if (files && files[0]) {
    const file = files[0];
    form.value.imageFile = file;
    form.value.imagePreview = URL.createObjectURL(file);
  }
};

const removeImage = () => {
  form.value.imageFile = null;
  form.value.imagePreview = "";
  form.value.image = "";
  if (fileInput.value) {
    fileInput.value.value = "";
  }
};

onMounted(() => {
  if (isEdit.value) {
    const item = getProductById(Number(route.params.id));
    if (item) {
      form.value = {
        ...defaultForm,
        ...item,
        imageFile: null,
        imagePreview: item.image || "",
        tests: [...item.tests],
      };
      mainCategorySelect.value = existingMainCategories.value.includes(
        item.mainCategory,
      )
        ? item.mainCategory
        : "__new__";
    }
  }
});

const addTest = () => {
  form.value.tests.push("");
};

const removeTest = (index: number) => {
  if (form.value.tests.length > 1) {
    form.value.tests.splice(index, 1);
  }
};

const handleSubmit = () => {
  loading.value = true;

  setTimeout(() => {
    const imageUrl = form.value.imagePreview || form.value.image || "";

    const payload = {
      name: form.value.name,
      image: imageUrl,
      description: form.value.description,
      fullDescription: form.value.fullDescription,
      mainCategory: form.value.mainCategory,
      price: form.value.price,
      recommended: form.value.recommended,
      age: form.value.age,
      gender: form.value.gender,
      tests: form.value.tests.filter((t) => t.trim() !== ""),
    };

    if (isEdit.value) {
      updateProduct(Number(route.params.id), payload);
    } else {
      addProduct(payload);
    }

    loading.value = false;
    router.push("/admin/products");
  }, 800);
};
</script>
