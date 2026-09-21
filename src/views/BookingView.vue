<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useDoctors } from "../composables/useDoctors";
import { useSchedule, todayDayName } from "../composables/useSchedule";

const route = useRoute();
const router = useRouter();

const { doctors } = useDoctors();
const { getSchedulesForDoctor } = useSchedule();

// Ambil ID dokter dari URL
const doctorId = computed(() => Number(route.params.doctorId));

// Cari data dokter berdasarkan ID
const doctor = computed(() =>
  doctors.value.find((d) => d.id === doctorId.value)
);

// ===== FORM STATE =====
const selectedDate = ref("");
const selectedTime = ref("");
const patientName = ref("");
const patientPhone = ref("");
const complaint = ref("");
const paymentMethod = ref("Umum");
const isSubmitting = ref(false);

// Jadwal dokter yang tersedia
const availableSchedules = computed(() =>
  doctor.value
    ? getSchedulesForDoctor(doctor.value.id).filter((s) => s.active)
    : []
);

// Tanggal minimum (hari ini)
const today = new Date().toISOString().split("T")[0];

// Nama hari dari tanggal yang dipilih
const dayFromDate = computed(() => {
  if (!selectedDate.value) return "";
  const date = new Date(selectedDate.value);
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  return days[date.getDay()];
});

// Jam yang tersedia di hari yang dipilih
const timeSlots = computed(() => {
  if (!dayFromDate.value) return [];
  return availableSchedules.value
    .filter((s) => s.day === dayFromDate.value)
    .map((s) => ({
      start: s.startTime,
      end: s.endTime,
      label: `${s.startTime} - ${s.endTime}`,
    }));
});

// Handle submit
const handleSubmit = async () => {
  if (!patientName.value || !patientPhone.value || !selectedDate.value) {
    alert("Mohon lengkapi data terlebih dahulu");
    return;
  }

  isSubmitting.value = true;

  // Simulasi submit — nanti bisa diganti ke API
  setTimeout(() => {
    alert(
      `✅ Booking berhasil!\n\nDokter: ${doctor.value?.name}\nPasien: ${patientName.value}\nTanggal: ${selectedDate.value}\nJam: ${selectedTime.value || "-"}\nPembayaran: ${paymentMethod.value}`
    );
    isSubmitting.value = false;
    router.push("/doctors");
  }, 1000);
};

onMounted(() => {
  // Scroll ke atas kalau halaman baru dibuka
  window.scrollTo(0, 0);
});
</script>

<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 120px">
    <div class="mx-auto max-w-5xl px-6 lg:px-8 pb-16">
      <!-- Breadcrumb -->
      <nav class="mb-6 text-sm text-slate-500">
        <router-link to="/" class="hover:text-teal-600">Home</router-link>
        <span class="mx-2">/</span>
        <router-link to="/doctors" class="hover:text-teal-600">Dokter</router-link>
        <span class="mx-2">/</span>
        <span class="text-slate-800 font-medium">Booking</span>
      </nav>

      <!-- Jika dokter tidak ditemukan -->
      <div
        v-if="!doctor"
        class="rounded-2xl bg-white p-12 text-center shadow-md"
      >
        <i class="fas fa-user-md text-6xl text-slate-300 mb-4"></i>
        <h2 class="text-xl font-bold text-slate-900 mb-2">
          Dokter tidak ditemukan
        </h2>
        <p class="text-slate-500 mb-6">
          ID dokter <strong>#{{ doctorId }}</strong> tidak ada dalam sistem.
        </p>
        <router-link
          to="/doctors"
          class="inline-block rounded-full bg-teal-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-teal-600 transition"
        >
          <i class="fas fa-arrow-left mr-2"></i>Kembali ke Daftar Dokter
        </router-link>
      </div>

      <!-- Form Booking -->
      <div v-else class="grid gap-6 lg:grid-cols-3">
        <!-- Kolom Kiri: Info Dokter -->
        <div class="lg:col-span-1">
          <div class="rounded-2xl bg-white p-6 shadow-md sticky top-32">
            <div class="flex flex-col items-center text-center">
              <img
                :src="doctor.image"
                :alt="doctor.name"
                class="h-24 w-24 rounded-full object-cover ring-4 ring-teal-100"
              />
              <h2 class="mt-4 font-bold text-slate-900 text-lg">
                {{ doctor.name }}
              </h2>
              <p class="text-sm font-medium text-teal-600">
                {{ doctor.specialty }}
              </p>
              <p class="mt-1 text-xs text-slate-500">
                <i class="fas fa-door-open mr-1"></i>{{ doctor.room }}
              </p>
            </div>

            <hr class="my-5 border-slate-100" />

            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-slate-500">Hari Praktik</span>
                <span class="font-semibold text-slate-800">
                  {{ availableSchedules.length }} hari
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Status</span>
                <span class="font-semibold text-green-600">Aktif</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Form -->
        <div class="lg:col-span-2">
          <div class="rounded-2xl bg-white p-6 lg:p-8 shadow-md">
            <h1 class="text-2xl font-bold text-slate-900 mb-1">
              Form Booking
            </h1>
            <p class="text-slate-500 text-sm mb-6">
              Lengkapi data di bawah untuk membuat janji dengan dokter.
            </p>

            <form @submit.prevent="handleSubmit" class="space-y-5">
              <!-- Data Pasien -->
              <div class="grid gap-4 md:grid-cols-2">
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                    Nama Pasien <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="patientName"
                    type="text"
                    placeholder="Nama lengkap"
                    class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                    No. HP <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="patientPhone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>
              </div>

              <!-- Tanggal -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                  Tanggal Kunjungan <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="selectedDate"
                  type="date"
                  :min="today"
                  class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                />
                <p
                  v-if="selectedDate && !timeSlots.length"
                  class="mt-2 text-xs text-amber-600"
                >
                  <i class="fas fa-exclamation-triangle mr-1"></i>
                  Dokter tidak praktik di hari {{ dayFromDate }}. Silakan pilih
                  tanggal lain.
                </p>
              </div>

              <!-- Jam -->
              <div v-if="timeSlots.length">
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                  Jam Praktik
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="slot in timeSlots"
                    :key="slot.label"
                    type="button"
                    @click="selectedTime = slot.label"
                    class="rounded-full px-4 py-2 text-xs font-semibold transition"
                    :class="
                      selectedTime === slot.label
                        ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30'
                        : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-600'
                    "
                  >
                    {{ slot.label }}
                  </button>
                </div>
              </div>

              <!-- Keluhan -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                  Keluhan / Catatan
                </label>
                <textarea
                  v-model="complaint"
                  rows="3"
                  placeholder="Deskripsikan keluhan Anda..."
                  class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
                ></textarea>
              </div>

              <!-- Metode Pembayaran -->
              <div>
                <label class="block text-sm font-semibold text-slate-700 mb-1.5">
                  Metode Pembayaran
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <label
                    v-for="method in ['Umum', 'BPJS', 'Asuransi']"
                    :key="method"
                    class="cursor-pointer"
                  >
                    <input
                      v-model="paymentMethod"
                      type="radio"
                      :value="method"
                      class="peer sr-only"
                    />
                    <div
                      class="rounded-xl border-2 border-slate-200 py-2.5 text-center text-sm font-semibold text-slate-600 transition peer-checked:border-teal-500 peer-checked:bg-teal-50 peer-checked:text-teal-600"
                    >
                      {{ method }}
                    </div>
                  </label>
                </div>
              </div>

              <!-- Tombol Submit -->
              <div class="flex gap-3 pt-4">
                <router-link
                  to="/doctors"
                  class="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition"
                >
                  Batal
                </router-link>
                <button
                  type="submit"
                  :disabled="isSubmitting"
                  class="flex-1 rounded-full bg-teal-500 py-3 text-sm font-semibold text-white transition hover:bg-teal-600 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <i
                    :class="
                      isSubmitting ? 'fas fa-spinner fa-spin' : 'fas fa-calendar-check'
                    "
                    class="mr-2"
                  ></i>
                  {{ isSubmitting ? "Memproses..." : "Konfirmasi Booking" }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>