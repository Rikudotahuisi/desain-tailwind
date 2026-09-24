<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 100px">
    <!-- Jika cabang ditemukan -->
    <!-- Breadcrumb -->
    <template v-if="branch">
      <!-- MAIN CONTENT -->
      <section class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-3">
          <!-- LEFT CONTENT -->
          <div class="lg:col-span-2">
            <!-- Tentang Cabang -->
            <div
              class="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-9"
            >
              <h2 class="mt-3 text-3xl font-bold text-slate-900">
                {{ branch.name }}
              </h2>

              <p class="mt-5 leading-9 text-slate-600">
                {{ branch.description }}
              </p>

              <p class="mt-4 leading-8 text-slate-600">
                Kami menyediakan berbagai layanan kesehatan dengan dukungan
                tenaga medis profesional serta fasilitas yang dirancang untuk
                memberikan kenyamanan kepada pasien.
              </p>
            </div>
            <!-- Fasilitas Cabang -->
            <div
              class="mt-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-sm sm:p-9"
            >
              <h2 class="text-3xl font-bold text-slate-900">Fasilitas</h2>

              <div class="mt-5 grid grid-cols-2 gap-4">
                <div
                  v-for="facility in branch.facilities"
                  :key="facility.id"
                  class="flex items-center gap-3"
                >
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i :class="facility.icon"></i>
                  </div>

                  <div>
                    <p class="text-sm font-semibold text-slate-900">
                      {{ facility.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDEBAR -->
          <aside>
            <div
              class="sticky top-28 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 class="text-xl font-bold text-slate-900">Kunjungi Kami</h3>

              <!-- MAP (Leaflet, live) -->
              <div
                id="branch-detail-map"
                class="mt-6 h-56 w-full overflow-hidden rounded-2xl border border-slate-200"
              ></div>

              <!-- ALAMAT / TELEPON / EMAIL -->
              <div class="mt-6 space-y-4 border-t border-slate-100 pt-6">
                <div class="flex gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i class="fas fa-location-dot"></i>
                  </div>

                  <div>
                    <p class="text-xs text-slate-400">Alamat</p>
                    <p class="text-sm leading-5 text-slate-700">
                      {{ branch.address }}
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i class="fas fa-phone"></i>
                  </div>

                  <div>
                    <p class="text-xs text-slate-400">Telepon</p>
                    <p class="text-sm text-slate-700">
                      {{ branch.phone }}
                    </p>
                  </div>
                </div>

                <div class="flex gap-3">
                  <div
                    class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                  >
                    <i class="fas fa-envelope"></i>
                  </div>

                  <div class="min-w-0">
                    <p class="text-xs text-slate-400">Email</p>
                    <p class="break-all text-sm text-slate-700">
                      {{ branch.email }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- MAP BUTTON -->
              <a
                :href="getMapsUrl(branch)"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-500 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                <i class="fas fa-map-location-dot"></i>
                Buka Google Maps
              </a>

              <!-- PHONE -->
              <a
                :href="`tel:${branch.phone}`"
                class="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
              >
                <i class="fas fa-phone"></i>
                Hubungi Cabang
              </a>
            </div>
          </aside>
        </div>
      </section>

      <!-- RUMAH SAKIT LAINNYA -->
      <section
        v-if="otherBranches.length > 0"
        class="mx-auto max-w-7xl px-6 pb-16 lg:px-10"
      >
        <div class="mb-8 flex items-center justify-between gap-4">
          <h2 class="mt-3 text-3xl font-bold text-slate-900">
            Rumah Sakit Lainnya
          </h2>

          <button
            type="button"
            @click="backToBranch"
            class="mt-3 flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
          >
            Lihat Semua
            <i class="fas fa-arrow-right"></i>
          </button>
        </div>

        <div class="grid gap-7 md:grid-cols-3">
          <article
            v-for="other in otherBranches"
            :key="other.id"
            class="group cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            @click="goToBranch(other.id)"
          >
            <div class="relative h-44 overflow-hidden">
              <img
                :src="other.image"
                :alt="other.name"
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
              ></div>
            </div>

            <div class="p-6">
              <h3 class="text-lg font-bold text-slate-900">
                {{ other.name }}
              </h3>

              <p class="mt-1 text-sm text-slate-600">
                {{ other.address }}
              </p>

              <router-link
                :to="{ name: 'branch-Detail', params: { id: other.id } }"
                class="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
                @click.stop
              >
                Detail
              </router-link>
            </div>
          </article>
        </div>
      </section>
    </template>

    <!-- Jika ID tidak ditemukan -->
    <template v-else>
      <section class="flex min-h-screen items-center justify-center px-6">
        <div class="text-center">
          <div
            class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          >
            <i class="fas fa-location-dot text-3xl text-slate-400"></i>
          </div>

          <h1 class="mt-6 text-3xl font-bold text-slate-900">
            Cabang Tidak Ditemukan
          </h1>

          <p class="mt-3 text-slate-500">
            Data cabang yang Anda cari tidak tersedia.
          </p>

          <button
            @click="backToBranch"
            class="mt-7 rounded-full bg-teal-500 px-7 py-3 font-semibold text-white transition hover:bg-teal-600"
          >
            Kembali ke Daftar Cabang
          </button>
        </div>
      </section>
    </template>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useBranch } from "../composables/useBranch";

const route = useRoute();
const router = useRouter();

const { getBranchById, getOtherBranches, getMapsUrl } = useBranch();

// Ambil ID dari URL
const branchId = computed(() => Number(route.params.id));

// Cari cabang berdasarkan ID
const branch = computed(() => {
  return getBranchById(branchId.value);
});

// Cabang lain untuk ditampilkan di bagian "Rumah Sakit Lainnya"
const otherBranches = computed(() => {
  return getOtherBranches(branchId.value).slice(0, 3);
});

// Kembali ke halaman cabang
const backToBranch = () => {
  router.push("/branch");
};

const goToBranch = (id: number) => {
  router.push({ name: "branch-Detail", params: { id } });
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// ===== PETA LOKASI CABANG (Leaflet) =====
let map: L.Map | null = null;
let marker: L.Marker | null = null;

const initMap = () => {
  if (!branch.value || map) return;

  map = L.map("branch-detail-map", {
    scrollWheelZoom: false,
  }).setView([branch.value.lat, branch.value.lng], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  marker = L.marker([branch.value.lat, branch.value.lng]).addTo(map);
  marker.bindPopup(`<strong>${branch.value.name}</strong>`);
};

const updateMap = () => {
  if (!branch.value) return;

  if (!map) {
    nextTick(initMap);
    return;
  }

  map.setView([branch.value.lat, branch.value.lng], 15);
  marker?.setLatLng([branch.value.lat, branch.value.lng]);
};

onMounted(() => {
  nextTick(initMap);
});

// Ikut update peta saat pindah ke detail cabang lain (mis. dari "Rumah Sakit Lainnya")
watch(branchId, () => {
  nextTick(updateMap);
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
    marker = null;
  }
});
</script>
