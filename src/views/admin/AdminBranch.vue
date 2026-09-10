<script setup lang="ts">
import { reactive, ref } from "vue";
import {
    useBranch,
    type Branch,
} from "../../composables/useBranch";

const {
    search,
    filteredBranches,
    addBranch,
    updateBranch,
    deleteBranch,
} = useBranch();


const showForm = ref(false);
const editingId = ref<number | null>(null);


const form = reactive({
    name: "",
    city: "",
    address: "",
    phone: "",
    status: "Aktif" as "Aktif" | "Nonaktif",
});


const resetForm = () => {
    form.name = "";
    form.city = "";
    form.address = "";
    form.phone = "";
    form.status = "Aktif";

    editingId.value = null;
};


const openAddForm = () => {
    resetForm();

    showForm.value = true;
};


const openEditForm = (branch: Branch) => {
    editingId.value = branch.id;

    form.name = branch.name;
    form.city = branch.city;
    form.address = branch.address;
    form.phone = branch.phone;
    form.status = branch.status;

    showForm.value = true;
};


const closeForm = () => {
    showForm.value = false;

    resetForm();
};


const saveBranch = () => {
    if (
        !form.name ||
        !form.city ||
        !form.address ||
        !form.phone
    ) {
        alert("Silakan lengkapi semua data cabang.");

        return;
    }


    const branchData = {
        name: form.name,
        city: form.city,
        address: form.address,
        phone: form.phone,
        status: form.status,
    };


    if (editingId.value) {
        updateBranch(
            editingId.value,
            branchData
        );

        alert("Data cabang berhasil diperbarui!");
    } else {
        addBranch(branchData);

        alert("Cabang berhasil ditambahkan!");
    }


    closeForm();
};


const removeBranch = (id: number) => {
    const confirmDelete = confirm(
        "Apakah Anda yakin ingin menghapus cabang ini?"
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

                <h1
                    class="text-2xl font-bold text-slate-900"
                >
                    Manajemen Cabang
                </h1>

                <p
                    class="mt-1 text-sm text-slate-500"
                >
                    Kelola data cabang Assyifa Hospital.
                </p>

            </div>


            <button
                @click="openAddForm"
                class="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
            >
                <i
                    class="fas fa-plus mr-2"
                ></i>

                Tambah Cabang

            </button>
        </div>

        <div
            class="grid gap-4 md:grid-cols-3"
        >
            <div
                class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <p
                    class="text-sm text-slate-500"
                >
                    Total Cabang
                </p>

                <h2
                    class="mt-2 text-3xl font-bold text-slate-900"
                >
                    {{ filteredBranches.length }}
                </h2>

            </div>
            <div
                class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

                <p
                    class="text-sm text-slate-500"
                >
                    Cabang Aktif
                </p>

                <h2
                    class="mt-2 text-3xl font-bold text-emerald-600"
                >
                    {{
                        filteredBranches.filter(
                            branch =>
                                branch.status === "Aktif"
                        ).length
                    }}
                </h2>

            </div>

            <div
                class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >

                <p
                    class="text-sm text-slate-500"
                >
                    Cabang Nonaktif
                </p>

                <h2
                    class="mt-2 text-3xl font-bold text-red-500"
                >
                    {{
                        filteredBranches.filter(
                            branch =>
                                branch.status === "Nonaktif"
                        ).length
                    }}
                </h2>

            </div>

        </div>

        <div
            class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
        >

            <div
                class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
            >

                <div>

                    <h2
                        class="text-lg font-bold text-slate-900"
                    >
                        Daftar Cabang
                    </h2>

                    <p
                        class="mt-1 text-sm text-slate-500"
                    >
                        Semua cabang rumah sakit.
                    </p>

                </div>

                <div
                    class="relative"
                >

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

            <div
                class="overflow-x-auto"
            >

                <table
                    class="w-full text-sm"
                >

                    <thead>

                        <tr
                            class="border-b border-slate-200"
                        >

                            <th
                                class="px-4 py-4 text-left font-semibold text-slate-600"
                            >
                                Cabang
                            </th>

                            <th
                                class="px-4 py-4 text-left font-semibold text-slate-600"
                            >
                                Kota
                            </th>

                            <th
                                class="px-4 py-4 text-left font-semibold text-slate-600"
                            >
                                Alamat
                            </th>

                            <th
                                class="px-4 py-4 text-left font-semibold text-slate-600"
                            >
                                Telepon
                            </th>

                            <th
                                class="px-4 py-4 text-left font-semibold text-slate-600"
                            >
                                Status
                            </th>

                            <th
                                class="px-4 py-4 text-right font-semibold text-slate-600"
                            >
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

                            <td
                                class="px-4 py-4"
                            >

                                <div
                                    class="flex items-center gap-3"
                                >

                                    <div
                                        class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                                    >

                                        <i
                                            class="fas fa-hospital"
                                        ></i>

                                    </div>


                                    <div>

                                        <p
                                            class="font-semibold text-slate-800"
                                        >
                                            {{ branch.name }}
                                        </p>

                                        <p
                                            class="text-xs text-slate-400"
                                        >
                                            ID Cabang #{{ branch.id }}
                                        </p>

                                    </div>

                                </div>

                            </td>

                            <td
                                class="px-4 py-4 text-slate-600"
                            >
                                {{ branch.city }}
                            </td>

                            <td
                                class="max-w-xs px-4 py-4 text-slate-600"
                            >
                                {{ branch.address }}
                            </td>

                            <td
                                class="px-4 py-4 text-slate-600"
                            >
                                {{ branch.phone }}
                            </td>

                            <td
                                class="px-4 py-4"
                            >

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

                            <td
                                class="px-4 py-4 text-right"
                            >

                                <button
                                    @click="openEditForm(branch)"
                                    class="mr-2 rounded-lg p-2 text-teal-600 transition hover:bg-teal-50"
                                >

                                    <i
                                        class="fas fa-edit"
                                    ></i>

                                </button>


                                <button
                                    @click="removeBranch(branch.id)"
                                    class="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                                >

                                    <i
                                        class="fas fa-trash"
                                    ></i>

                                </button>

                            </td>

                        </tr>
                        <tr
                            v-if="filteredBranches.length === 0"
                        >
                            <td
                                colspan="6"
                                class="py-12 text-center text-slate-400"
                            >
                                <i
                                    class="fas fa-hospital mb-3 block text-3xl"
                                ></i>
                                Cabang tidak ditemukan.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div
            v-if="showForm"
            class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm"
        >
            <div
                class="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            >

                <div
                    class="flex items-center justify-between border-b border-slate-100 p-6"
                >

                    <div>
                        <h2
                            class="text-xl font-bold text-slate-900"
                        >
                            {{
                                editingId
                                    ? "Edit Cabang"
                                    : "Tambah Cabang"
                            }}

                        </h2>
                        <p
                            class="mt-1 text-sm text-slate-500"
                        >
                            Masukkan informasi cabang rumah sakit.
                        </p>
                    </div>
                    <button
                        @click="closeForm"
                        class="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100"
                    >
                        <i
                            class="fas fa-times"
                        ></i>
                    </button>
                </div>
                <form
                    @submit.prevent="saveBranch"
                    class="space-y-5 p-6"
                >

                    <div>
                        <label
                            class="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Nama Cabang
                        </label>
                        <input
                            v-model="form.name"
                            type="text"
                            placeholder="Contoh: Assyifa Hospital Palu"
                            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                        />
                    </div>
                    <div>

                        <label
                            class="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Kota
                        </label>
                        <input
                            v-model="form.city"
                            type="text"
                            placeholder="Masukkan kota"
                            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                        />
                    </div>
                    
                    <div>
                        <label
                            class="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Alamat
                        </label>
                        <textarea
                            v-model="form.address"
                            rows="3"
                            placeholder="Masukkan alamat lengkap"
                            class="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                        ></textarea>
                    </div>

                    
                    <div>
                        <label
                            class="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Nomor Telepon
                        </label>
                        <input
                            v-model="form.phone"
                            type="text"
                            placeholder="Contoh: 0451-123456"
                            class="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                        />
                    </div>
                    
                    <div>
                        <label
                            class="mb-2 block text-sm font-semibold text-slate-700"
                        >
                            Status
                        </label>
                        <select
                            v-model="form.status"
                            class="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                        >
                            <option value="Aktif">
                                Aktif
                            </option>
                            <option value="Nonaktif">
                                Nonaktif
                            </option>
                        </select>
                    </div>
                    <div
                        class="flex justify-end gap-3 border-t border-slate-100 pt-5"
                    >
                        <button
                            type="button"
                            @click="closeForm"
                            class="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            class="rounded-xl bg-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600"
                        >
                            <i
                                class="fas fa-save mr-2"
                            ></i>
                            {{
                                editingId
                                    ? "Simpan Perubahan"
                                    : "Tambah Cabang"
                            }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>