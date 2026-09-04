<template>
    <div class="p-6">

        <!-- HEADER -->
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-800">
                    Artikel
                </h1>

                <p class="mt-1 text-sm text-gray-500">
                    Kelola artikel yang ditampilkan di website
                </p>
            </div>

            <button
                @click="tambahArtikel"
                class="rounded-lg bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
                + Tambah Artikel
            </button>
        </div>

        <!-- SEARCH & FILTER -->
        <div
            class="mb-5 flex flex-col gap-3 rounded-xl bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between"
        >

            <!-- SEARCH -->
            <div class="relative w-full md:w-80">
                <input
                    v-model="search"
                    type="text"
                    placeholder="Cari artikel..."
                    class="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                />
            </div>

            <!-- FILTER -->
            <select
                v-model="filterStatus"
                class="rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-teal-500"
            >
                <option value="semua">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
            </select>

        </div>

        <!-- TABLE -->
        <div class="overflow-hidden rounded-xl bg-white shadow-sm">

            <div class="overflow-x-auto">

                <table class="w-full text-left">

                    <thead class="border-b bg-gray-50">
                        <tr>
                            <th class="px-6 py-4 text-sm font-semibold text-gray-600">
                                #
                            </th>

                            <th class="px-6 py-4 text-sm font-semibold text-gray-600">
                                Judul
                            </th>

                            <th class="px-6 py-4 text-sm font-semibold text-gray-600">
                                Kategori
                            </th>

                            <th class="px-6 py-4 text-sm font-semibold text-gray-600">
                                Status
                            </th>

                            <th class="px-6 py-4 text-sm font-semibold text-gray-600">
                                Tanggal
                            </th>

                            <th class="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                                Aksi
                            </th>
                        </tr>
                    </thead>

                    <tbody class="divide-y">

                        <tr
                            v-for="(artikel, index) in filteredArticles"
                            :key="artikel.id"
                            class="transition hover:bg-gray-50"
                        >

                            <!-- NOMOR -->
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ index + 1 }}
                            </td>

                            <!-- JUDUL -->
                            <td class="px-6 py-4">
                                <div class="font-medium text-gray-800">
                                    {{ artikel.judul }}
                                </div>

                                <div class="mt-1 text-xs text-gray-400">
                                    {{ artikel.penulis }}
                                </div>
                            </td>

                            <!-- KATEGORI -->
                            <td class="px-6 py-4 text-sm text-gray-600">
                                {{ artikel.kategori }}
                            </td>

                            <!-- STATUS -->
                            <td class="px-6 py-4">

                                <span
                                    v-if="artikel.status === 'published'"
                                    class="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700"
                                >
                                    Published
                                </span>

                                <span
                                    v-else
                                    class="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700"
                                >
                                    Draft
                                </span>

                            </td>

                            <!-- TANGGAL -->
                            <td class="px-6 py-4 text-sm text-gray-500">
                                {{ artikel.tanggal }}
                            </td>

                            <!-- AKSI -->
                            <td class="px-6 py-4">

                                <div class="flex justify-center gap-2">

                                    <button
                                        @click="editArtikel(artikel)"
                                        class="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 hover:bg-blue-100"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        @click="hapusArtikel(artikel)"
                                        class="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-100"
                                    >
                                        Hapus
                                    </button>

                                </div>

                            </td>

                        </tr>

                        <!-- JIKA DATA KOSONG -->
                        <tr v-if="filteredArticles.length === 0">

                            <td
                                colspan="6"
                                class="px-6 py-10 text-center text-sm text-gray-500"
                            >
                                Tidak ada artikel ditemukan.
                            </td>

                        </tr>

                    </tbody>

                </table>

            </div>

        </div>

    </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const search = ref('')
const filterStatus = ref('semua')

const articles = ref([
    {
        id: 1,
        judul: 'Tips Menjaga Kesehatan Tubuh',
        kategori: 'Kesehatan',
        status: 'published',
        tanggal: '04 Sep 2026',
        penulis: 'Admin',
    },
    {
        id: 2,
        judul: 'Pentingnya Pemeriksaan Kesehatan',
        kategori: 'Kesehatan',
        status: 'published',
        tanggal: '03 Sep 2026',
        penulis: 'Admin',
    },
    {
        id: 3,
        judul: 'Informasi Pelayanan Rumah Sakit',
        kategori: 'Informasi',
        status: 'draft',
        tanggal: '02 Sep 2026',
        penulis: 'Admin',
    },
])

const filteredArticles = computed(() => {
    return articles.value.filter((artikel) => {

        const cocokSearch =
            artikel.judul
                .toLowerCase()
                .includes(search.value.toLowerCase())

        const cocokStatus =
            filterStatus.value === 'semua' ||
            artikel.status === filterStatus.value

        return cocokSearch && cocokStatus
    })
})

function tambahArtikel() {
    alert('Halaman tambah artikel')
}

function editArtikel(artikel) {
    alert(`Edit artikel: ${artikel.judul}`)
}

function hapusArtikel(artikel) {
    const yakin = confirm(
        `Apakah kamu yakin ingin menghapus "${artikel.judul}"?`
    )

    if (yakin) {
        articles.value = articles.value.filter(
            (item) => item.id !== artikel.id
        )
    }
}
</script>