<template>
  <div class="bg-slate-50 min-h-screen" style="padding-top: 160px">
    <div class="max-w-3xl mx-auto px-4 -mt-8 pb-16">
      <!-- Success State -->
      <div
        v-if="submitted"
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center"
      >
        <div
          class="inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4"
        >
          <i class="fas fa-check text-2xl"></i>
        </div>
        <h2 class="text-xl font-bold text-slate-900">
          Pendaftaran Berhasil Dikirim
        </h2>
        <p class="text-sm text-slate-500 mt-2">Nomor pendaftaran Anda</p>
        <p class="text-2xl font-bold text-teal-600 mt-1 mb-4">
          PAT-{{ String(registeredId).padStart(4, "0") }}
        </p>
        <p class="text-sm text-slate-500 max-w-md mx-auto">
          Status pendaftaran Anda saat ini
          <span class="font-semibold text-amber-600">Menunggu</span>
          verifikasi dari admin. Silakan simpan nomor ini sebagai referensi saat
          datang ke rumah sakit atau melakukan pengambilan antrian.
        </p>
        <div class="flex items-center justify-center gap-3 mt-6">
          <button
            @click="router.push('/antrian')"
            class="rounded-xl bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5"
          >
            <i class="fas fa-ticket-alt mr-2"></i>Ambil Antrian
          </button>
          <button
            @click="resetForm"
            class="rounded-xl px-6 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
          >
            Daftar Pasien Lain
          </button>
        </div>
      </div>

      <!-- Form -->
      <form
        v-else
        @submit.prevent="handleSubmit"
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6"
      >
        <!-- Section: Data Diri -->
        <div>
          <h3
            class="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-4"
          >
            <i class="fas fa-user mr-1.5"></i>Data Diri
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Nama Lengkap <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="...."
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Tanggal Lahir <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.birthDate"
                type="date"
                required
                :max="todayStr"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>
          <div class="mt-5">
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Jenis Kelamin <span class="text-red-500">*</span>
            </label>
            <div class="flex gap-3">
              <label
                v-for="opt in genderOptions"
                :key="opt"
                class="flex-1 cursor-pointer"
              >
                <input
                  type="radio"
                  v-model="form.gender"
                  :value="opt"
                  required
                  class="peer sr-only"
                />
                <div
                  class="rounded-xl border border-slate-200 px-4 py-3 text-sm text-center text-slate-600 transition peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-700 peer-checked:font-semibold hover:bg-slate-50"
                >
                  {{ opt }}
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- Section: Kontak -->
        <div class="border-t border-slate-100 pt-6">
          <h3
            class="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-4"
          >
            <i class="fas fa-address-book mr-1.5"></i>Kontak
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="assyifahospital@email.com"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <div>
              <label class="mb-1.5 block text-sm font-semibold text-slate-700">
                Nomor Telepon <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.phone"
                type="text"
                required
                placeholder="0812-3456-7890"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>
          <div class="mt-5">
            <label class="mb-1.5 block text-sm font-semibold text-slate-700">
              Alamat Lengkap <span class="text-red-500">*</span>
            </label>
            <textarea
              v-model="form.address"
              rows="2"
              required
              placeholder="Jl. Kesehatan No. 123, Palu"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            ></textarea>
          </div>
        </div>

        <!-- Section: Keluhan -->
        <div class="border-t border-slate-100 pt-6">
          <h3
            class="text-sm font-semibold text-teal-600 uppercase tracking-wide mb-4"
          >
            <i class="fas fa-notes-medical mr-1.5"></i>Keluhan Kesehatan
          </h3>
          <textarea
            v-model="form.complaint"
            rows="3"
            placeholder="Ceritakan keluhan atau riwayat penyakit Anda (opsional)"
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          ></textarea>
        </div>

        <!-- Persetujuan -->
        <div class="border-t border-slate-100 pt-6">
          <label class="flex items-start gap-3 cursor-pointer">
            <input
              v-model="agree"
              type="checkbox"
              required
              class="mt-1 h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-teal-500/30"
            />
            <span class="text-sm text-slate-600">
              Saya menyatakan bahwa data yang saya isi benar dan menyetujui data
              ini digunakan untuk keperluan administrasi ASSYIFA Hospital.
              <span class="text-red-500">*</span>
            </span>
          </label>
        </div>

        <!-- Submit -->
        <div class="flex justify-end pt-2">
          <button
            type="submit"
            :disabled="loading"
            class="w-full md:w-auto rounded-xl bg-teal-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/20 transition hover:bg-teal-600 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-paper-plane mr-2"></i>
            {{ loading ? "Mengirim..." : "Daftar Sekarang" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePatients } from "../composables/usePatients";

const router = useRouter();
const { patients, addPatient } = usePatients();

const genderOptions = ["Laki-laki", "Perempuan"] as const;

const todayStr = new Date().toDateString()
  ? (() => {
      const d = new Date();
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    })()
  : "";

const loading = ref(false);
const submitted = ref(false);
const agree = ref(false);
const registeredId = ref<number>(0);

const form = ref({
  name: "",
  birthDate: "",
  email: "",
  phone: "",
  gender: "" as "" | "Laki-laki" | "Perempuan",
  address: "",
  complaint: "",
});

const resetForm = () => {
  form.value = {
    name: "",
    birthDate: "",
    email: "",
    phone: "",
    gender: "",
    address: "",
    complaint: "",
  };
  agree.value = false;
  submitted.value = false;
};

const handleSubmit = () => {
  if (!agree.value) return;
  loading.value = true;

  setTimeout(() => {
    addPatient({
      name: form.value.name,
      birthDate: form.value.birthDate,
      email: form.value.email,
      phone: form.value.phone,
      gender: form.value.gender as "Laki-laki" | "Perempuan",
      status: "Menunggu",
      address: form.value.address,
      complaint: form.value.complaint,
    });

    // id pasien baru = pasien terakhir di list (composable menambahkan di akhir)
    const last = patients.value[patients.value.length - 1];
    registeredId.value = last ? last.id : 0;

    loading.value = false;
    submitted.value = true;
  }, 800);
};
</script>
