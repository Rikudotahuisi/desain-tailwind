<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)

const form = ref({
  name: '',
  city: '',
  province: '',
  address: '',
  phone: '',
  email: '',
  hours: '',
})

/*
|--------------------------------------------------------------------------
| Dummy data sementara
|--------------------------------------------------------------------------
| Nanti bagian ini bisa diganti dengan data dari useBranch.ts / API.
*/

const branches = [
  {
    id: 1,
    name: 'Assyifa Hospital Palu',
    city: 'Palu',
    province: 'Sulawesi Tengah',
    address: 'Jl. Ahmad Yani No. 25, Palu',
    phone: '0451-123456',
    email: 'palu@assyifahospital.com',
    hours: 'Senin - Sabtu, 08:00 - 21:00',
  },
  {
    id: 2,
    name: 'Assyifa Hospital Makassar',
    city: 'Makassar',
    province: 'Sulawesi Selatan',
    address: 'Jl. Sultan Alauddin No. 10, Makassar',
    phone: '0411-123456',
    email: 'makassar@assyifahospital.com',
    hours: 'Senin - Sabtu, 08:00 - 21:00',
  },
]

/*
|--------------------------------------------------------------------------
| Jika halaman dibuka untuk EDIT
|--------------------------------------------------------------------------
*/

if (isEdit.value) {
  const branchId = Number(route.params.id)

  const branch = branches.find((item) => item.id === branchId)

  if (branch) {
    form.value = {
      name: branch.name,
      city: branch.city,
      province: branch.province,
      address: branch.address,
      phone: branch.phone,
      email: branch.email,
      hours: branch.hours,
    }
  }
}

/*
|--------------------------------------------------------------------------
| Submit
|--------------------------------------------------------------------------
*/

const handleSubmit = () => {
  if (isEdit.value) {
    console.log('Update branch:', {
      id: route.params.id,
      ...form.value,
    })
  } else {
    console.log('Create branch:', form.value)
  }

  router.push('/admin/branch')
}

const handleCancel = () => {
  router.push('/admin/branch')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 lg:p-8">
    <div class="mx-auto max-w-5xl">

      <!-- HEADER -->
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
            {{ isEdit ? 'Edit Branch' : 'Tambah Branch' }}
          </h1>

          <p class="mt-1 text-sm text-gray-500">
            {{
              isEdit
                ? 'Perbarui informasi cabang rumah sakit'
                : 'Tambahkan cabang rumah sakit baru'
            }}
          </p>
        </div>
      </div>

      <!-- FORM CARD -->
      <div class="rounded-2xl bg-white p-6 shadow-sm lg:p-8">

        <form @submit.prevent="handleSubmit">

          <!-- INFORMASI UTAMA -->
          <div class="mb-8">
            <h2 class="text-lg font-semibold text-gray-900">
              Informasi Branch
            </h2>

            <p class="mt-1 text-sm text-gray-500">
              Masukkan informasi dasar mengenai cabang rumah sakit.
            </p>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">

            <!-- NAMA -->
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

            <!-- KOTA -->
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

            <!-- PROVINSI -->
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

            <!-- ALAMAT -->
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

            <!-- TELEPON -->
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

            <!-- EMAIL -->
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

            <!-- JAM OPERASIONAL -->
            <div class="md:col-span-2">
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

          </div>

          <!-- BUTTON -->
          <div class="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">

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
              {{ isEdit ? 'Simpan Perubahan' : 'Tambah Branch' }}
            </button>

          </div>

        </form>
      </div>
    </div>
  </div>
</template>