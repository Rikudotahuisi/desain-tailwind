<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBranch, type Facility } from "../../composables/useBranch";

const route = useRoute();
const router = useRouter();

const { getBranchById, addBranch, updateBranch } = useBranch();

const isEdit = computed(() => !!route.params.id);

const form = ref({
  name: "",
  city: "",
  province: "",
  address: "",
  phone: "",
  email: "",
  hours: "",
  status: "Aktif" as "Aktif" | "Nonaktif",
  image: "",
  lat: 0,
  lng: 0,
  description: "",
});

// Daftar fasilitas cabang (nama + icon FontAwesome)
const facilities = ref<Facility[]>([]);

if (isEdit.value) {
  const branchId = Number(route.params.id);
  const branch = getBranchById(branchId);

  if (branch) {
    form.value = {
      name: branch.name,
      city: branch.city,
      province: branch.province,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      hours: branch.hours,
      status: branch.status,
      image: branch.image,
      lat: branch.lat,
      lng: branch.lng,
      description: branch.description,
    };

    facilities.value = branch.facilities.map((facility) => ({ ...facility }));
  }
}

// Tambah baris fasilitas kosong
const addFacilityRow = () => {
  facilities.value.push({
    id: Date.now(),
    name: "",
    icon: "fas fa-circle-check",
  });
};

// Hapus baris fasilitas
const removeFacilityRow = (id: number) => {
  facilities.value = facilities.value.filter((facility) => facility.id !== id);
};

const handleSubmit = () => {
  const payload = {
    name: form.value.name,
    city: form.value.city,
    province: form.value.province,
    address: form.value.address,
    phone: form.value.phone,
    email: form.value.email,
    hours: form.value.hours,
    status: form.value.status,
    image: form.value.image,
    lat: Number(form.value.lat),
    lng: Number(form.value.lng),
    description: form.value.description,
    // Buang baris fasilitas yang namanya kosong
    facilities: facilities.value
      .filter((facility) => facility.name.trim() !== "")
      .map((facility, index) => ({ ...facility, id: index + 1 })),
  };

  if (isEdit.value) {
    updateBranch(Number(route.params.id), payload);
  } else {
    addBranch(payload);
  }

  router.push("/admin/branch");
};

const handleCancel = () => {
  router.push("/admin/branch");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">
      <div class="mb-8 flex items-center justify-between">
        <div>
          <button
            type="button"
            @click="handleCancel"
            class="mb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            ← Kembali
          </button>

          <h1 class="text-2xl font-bold text-gray-900">
            {{ isEdit ? "Edit Branch" : "Tambah Branch" }}
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            {{
              isEdit
                ? "Perbarui informasi cabang rumah sakit"
                : "Tambahkan cabang rumah sakit baru"
            }}
          </p>
        </div>
      </div>

      <div class="rounded-2xl bg-white p-6 shadow-sm lg:p-8">
        <form @submit.prevent="handleSubmit">
          <!-- INFORMASI DASAR -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900">
              Informasi Branch
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Masukkan informasi dasar mengenai cabang rumah sakit.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="md:col-span-2">
              <label
                for="name"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Nama Branch
              </label>

              <input
                id="name"
                v-model="form.name"
                type="text"
                placeholder="Contoh: Assyifa Hospital Palu"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            <div>
              <label
                for="city"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Kota
              </label>

              <input
                id="city"
                v-model="form.city"
                type="text"
                placeholder="Contoh: Palu"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            <div>
              <label
                for="province"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Provinsi
              </label>

              <input
                id="province"
                v-model="form.province"
                type="text"
                placeholder="Contoh: Sulawesi Tengah"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            <div class="md:col-span-2">
              <label
                for="address"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Alamat
              </label>

              <textarea
                id="address"
                v-model="form.address"
                rows="4"
                placeholder="Masukkan alamat lengkap branch"
                class="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              ></textarea>
            </div>

            <div>
              <label
                for="phone"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Nomor Telepon
              </label>

              <input
                id="phone"
                v-model="form.phone"
                type="text"
                placeholder="Contoh: 0451-123456"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                for="email"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="branch@example.com"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                for="hours"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Jam Operasional
              </label>

              <input
                id="hours"
                v-model="form.hours"
                type="text"
                placeholder="Contoh: Senin - Sabtu, 08:00 - 21:00"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />
            </div>

            <div>
              <label
                for="status"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Status
              </label>

              <select
                id="status"
                v-model="form.status"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
          </div>

          <!-- FOTO & LOKASI PETA -->
          <div class="mb-6 mt-10 border-t border-gray-100 pt-8">
            <h2 class="text-lg font-semibold text-gray-900">
              Foto &amp; Lokasi Peta
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Foto tampil di halaman depan, koordinat dipakai untuk menampilkan
              pin lokasi cabang di peta.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="md:col-span-2">
              <label
                for="image"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                URL Foto Branch
              </label>

              <input
                id="image"
                v-model="form.image"
                type="url"
                placeholder="https://..."
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              />

              <img
                v-if="form.image"
                :src="form.image"
                alt="Preview foto branch"
                class="mt-3 h-32 w-full rounded-xl object-cover"
              />
            </div>

            <div>
              <label
                for="lat"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Latitude
              </label>

              <input
                id="lat"
                v-model.number="form.lat"
                type="number"
                step="any"
                placeholder="Contoh: -0.8917"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            <div>
              <label
                for="lng"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Longitude
              </label>

              <input
                id="lng"
                v-model.number="form.lng"
                type="number"
                step="any"
                placeholder="Contoh: 119.8707"
                class="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                required
              />
            </div>

            <p class="text-xs text-gray-400 md:col-span-2">
              Tips: klik kanan lokasi di Google Maps lalu pilih koordinat yang
              muncul untuk mendapatkan nilai latitude &amp; longitude.
            </p>
          </div>

          <!-- FASILITAS -->
          <div class="mb-6 mt-10 border-t border-gray-100 pt-8">
            <div class="flex items-center justify-between">
              <div>
                <h2 class="text-lg font-semibold text-gray-900">Fasilitas</h2>

                <p class="mt-1 text-sm text-gray-500">
                  Daftar fasilitas yang tampil di halaman detail cabang.
                </p>
              </div>

              <button
                type="button"
                @click="addFacilityRow"
                class="rounded-xl border border-teal-500 px-4 py-2 text-sm font-semibold text-teal-600 transition hover:bg-teal-50"
              >
                + Tambah Fasilitas
              </button>
            </div>

            <div class="mt-5 space-y-3">
              <div
                v-for="facility in facilities"
                :key="facility.id"
                class="flex flex-col gap-3 rounded-xl border border-gray-200 p-4 sm:flex-row sm:items-center"
              >
                <div class="flex-1">
                  <label class="mb-1 block text-xs font-medium text-gray-500">
                    Nama Fasilitas
                  </label>

                  <input
                    v-model="facility.name"
                    type="text"
                    placeholder="Contoh: IGD 24 Jam"
                    class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div class="flex-1">
                  <label class="mb-1 block text-xs font-medium text-gray-500">
                    Icon (FontAwesome)
                  </label>

                  <input
                    v-model="facility.icon"
                    type="text"
                    placeholder="Contoh: fas fa-truck-medical"
                    class="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                  />
                </div>

                <div class="flex items-center gap-2 sm:pt-5">
                  <span
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i :class="facility.icon || 'fas fa-circle-question'"></i>
                  </span>

                  <button
                    type="button"
                    @click="removeFacilityRow(facility.id)"
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-200 text-red-500 transition hover:bg-red-50"
                    title="Hapus fasilitas"
                  >
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>

              <p
                v-if="facilities.length === 0"
                class="rounded-xl border border-dashed border-gray-200 py-6 text-center text-sm text-gray-400"
              >
                Belum ada fasilitas. Klik "Tambah Fasilitas" untuk menambahkan.
              </p>
            </div>
          </div>

          <!-- DESKRIPSI -->
          <div class="mb-6 mt-10 border-t border-gray-100 pt-8">
            <h2 class="text-lg font-semibold text-gray-900">Deskripsi</h2>

            <p class="mt-1 text-sm text-gray-500">
              Tampil di halaman detail cabang.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6">
            <div>
              <label
                for="description"
                class="mb-2 block text-sm font-medium text-gray-700"
              >
                Deskripsi
              </label>

              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                placeholder="Ceritakan singkat tentang cabang ini"
                class="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
              ></textarea>
            </div>
          </div>

          <div
            class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6"
          >
            <button
              type="button"
              @click="handleCancel"
              class="rounded-xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Batal
            </button>

            <button
              type="submit"
              class="rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              {{ isEdit ? "Simpan Perubahan" : "Tambah Branch" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
