<script setup lang="ts">
import { useRouter } from "vue-router";
import { useBranch } from "../../composables/useBranch";

const router = useRouter();

const { search, filteredBranches, deleteBranch } = useBranch();

const openAddForm = () => {
  router.push("/admin/branch/create");
};

const openEditForm = (id: number) => {
  router.push(`/admin/branch/edit/${id}`);
};

const removeBranch = (id: number) => {
  const confirmDelete = confirm(
    "Apakah Anda yakin ingin menghapus cabang ini?",
  );

  if (!confirmDelete) {
    return;
  }

  deleteBranch(id);
};
</script>

<template>
  <div class="space-y-6">
    <div
      class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <h1 class="text-2xl font-bold text-slate-900">Manajemen Cabang</h1>

        <p class="mt-1 text-sm text-slate-500">
          Kelola data cabang Assyifa Hospital.
        </p>
      </div>

      <button
        @click="openAddForm"
        class="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
      >
        <i class="fas fa-plus mr-2"></i>

        Tambah Cabang
      </button>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Total Cabang</p>

        <h2 class="mt-2 text-3xl font-bold text-slate-900">
          {{ filteredBranches.length }}
        </h2>
      </div>
      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Cabang Aktif</p>

        <h2 class="mt-2 text-3xl font-bold text-emerald-600">
          {{
            filteredBranches.filter((branch) => branch.status === "Aktif")
              .length
          }}
        </h2>
      </div>

      <div class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <p class="text-sm text-slate-500">Cabang Nonaktif</p>

        <h2 class="mt-2 text-3xl font-bold text-red-500">
          {{
            filteredBranches.filter((branch) => branch.status === "Nonaktif")
              .length
          }}
        </h2>
      </div>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div
        class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 class="text-lg font-bold text-slate-900">Daftar Cabang</h2>

          <p class="mt-1 text-sm text-slate-500">Semua cabang rumah sakit.</p>
        </div>

        <div class="relative">
          <i
            class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400"
          ></i>

          <input
            v-model="search"
            type="text"
            placeholder="Cari cabang..."
            class="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 md:w-64"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-slate-200">
              <th class="px-4 py-4 text-left font-semibold text-slate-600">
                Cabang
              </th>

              <th class="px-4 py-4 text-left font-semibold text-slate-600">
                Kota / Provinsi
              </th>

              <th class="px-4 py-4 text-left font-semibold text-slate-600">
                Alamat
              </th>

              <th class="px-4 py-4 text-left font-semibold text-slate-600">
                Telepon
              </th>

              <th class="px-4 py-4 text-left font-semibold text-slate-600">
                Status
              </th>

              <th class="px-4 py-4 text-right font-semibold text-slate-600">
                Aksi
              </th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="branch in filteredBranches"
              :key="branch.id"
              class="border-b border-slate-100 transition hover:bg-slate-50"
            >
              <td class="px-4 py-4">
                <div class="flex items-center gap-3">
                  <img
                    v-if="branch.image"
                    :src="branch.image"
                    :alt="branch.name"
                    class="h-10 w-10 shrink-0 rounded-xl object-cover"
                  />
                  <div
                    v-else
                    class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i class="fas fa-hospital"></i>
                  </div>

                  <div>
                    <p class="font-semibold text-slate-800">
                      {{ branch.name }}
                    </p>

                    <p class="text-xs text-slate-400">
                      ID Cabang #{{ branch.id }}
                    </p>
                  </div>
                </div>
              </td>

              <td class="px-4 py-4 text-slate-600">
                <p>{{ branch.city }}</p>
                <p class="text-xs text-slate-400">{{ branch.province }}</p>
              </td>

              <td class="max-w-xs px-4 py-4 text-slate-600">
                {{ branch.address }}
              </td>

              <td class="px-4 py-4 text-slate-600">
                {{ branch.phone }}
              </td>

              <td class="px-4 py-4">
                <span
                  :class="
                    branch.status === 'Aktif'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-red-100 text-red-600'
                  "
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {{ branch.status }}
                </span>
              </td>

              <td class="px-4 py-4 text-right">
                <button
                  @click="openEditForm(branch.id)"
                  class="mr-2 rounded-lg p-2 text-teal-600 transition hover:bg-teal-50"
                >
                  <i class="fas fa-edit"></i>
                </button>

                <button
                  @click="removeBranch(branch.id)"
                  class="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </td>
            </tr>
            <tr v-if="filteredBranches.length === 0">
              <td colspan="6" class="py-12 text-center text-slate-400">
                <i class="fas fa-hospital mb-3 block text-3xl"></i>
                Cabang tidak ditemukan.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
