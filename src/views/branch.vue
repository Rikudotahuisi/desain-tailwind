<template>
  <div class="min-h-screen bg-slate-50" style="padding-top: 80px">
    <!-- CABANG -->
    <section id="cabang" class="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <!-- PETA LOKASI SEMUA CABANG -->
      <div class="mb-12">
        <div class="mb-8 text-center">
          <h2 class="text-3xl font-bold text-slate-900">Peta Lokasi Cabang</h2>

          <p class="mx-auto mt-3 max-w-2xl text-slate-500">
            Lihat sebaran seluruh cabang Assyifa Hospital dan pilih yang paling
            dekat dengan Anda.
          </p>
        </div>

        <div
          id="branch-page-map"
          class="relative isolate z-0 h-[420px] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-sm"
        ></div>
      </div>

      <!-- SEARCH -->
      <div class="mx-auto mb-10 max-w-xl">
        <div
          class="flex items-right gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
        >
          <svg
            class="h-5 w-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
            />
          </svg>

          <input
            v-model="search"
            type="text"
            placeholder="Cari cabang atau kota..."
            class="w-full border-0 bg-transparent text-sm text-slate-700 outline-none focus:ring-0"
          />
        </div>
      </div>

      <!-- CARD CABANG -->
      <div class="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="branch in filteredBranches"
          :key="branch.id"
          class="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <!-- IMAGE -->
          <div class="relative h-56 overflow-hidden">
            <img
              :src="branch.image"
              :alt="branch.name"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <!-- OVERLAY -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"
            ></div>
          </div>

          <!-- CONTENT -->
          <div class="p-6">
            <!-- NAME -->
            <h3 class="text-xl font-bold text-slate-900">
              {{ branch.name }}
            </h3>

            <p class="mt-1 text-sm text-teal-600">
              {{ branch.province }}
            </p>

            <!-- INFO -->
            <div class="mt-5 space-y-3">
              <!-- ADDRESS -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                    />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">Alamat</p>

                  <p class="text-sm leading-5 text-slate-600">
                    {{ branch.address }}
                  </p>
                </div>
              </div>

              <!-- PHONE -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 0 1 2-2h2.3a2 2 0 0 1 1.94 1.52l.54 2.17a2 2 0 0 1-.45 1.84L7.9 9.96a16 16 0 0 0 6.14 6.14l1.43-1.43a2 2 0 0 1 1.84-.45l2.17.54A2 2 0 0 1 21 16.7V19a2 2 0 0 1-2 2h-1C9.72 21 3 14.28 3 6V5Z"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">Telepon</p>

                  <p class="text-sm text-slate-600">
                    {{ branch.phone }}
                  </p>
                </div>
              </div>

              <!-- HOURS -->
              <div class="flex gap-3">
                <div
                  class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600"
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="9" stroke-width="2" />
                    <path
                      stroke-linecap="round"
                      stroke-width="2"
                      d="M12 7v5l3 2"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-xs text-slate-400">Jam Operasional</p>

                  <p class="text-sm text-slate-600">
                    {{ branch.hours }}
                  </p>
                </div>
              </div>
            </div>

            <!-- BUTTON -->
            <div class="mt-6 flex gap-3">
              <a
                :href="getMapsUrl(branch)"
                target="_blank"
                class="flex-1 rounded-xl bg-teal-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Lihat Maps
              </a>

              <router-link
                :to="{ name: 'branch-Detail', params: { id: branch.id } }"
                class="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-teal-500 hover:text-teal-600"
              >
                Detail
              </router-link>
            </div>
          </div>
        </article>

        <p
          v-if="filteredBranches.length === 0"
          class="col-span-full py-16 text-center text-slate-400"
        >
          Cabang tidak ditemukan.
        </p>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useBranch } from "../composables/useBranch";

const { branches, search, filteredBranches, getMapsUrl } = useBranch();

// ===== PETA SEMUA CABANG =====
let map: L.Map | null = null;
let markers: L.Marker[] = [];

const renderMarkers = () => {
  if (!map) return;

  // Bersihkan marker lama sebelum digambar ulang (misalnya setelah admin
  // menambah/mengedit/menghapus cabang)
  markers.forEach((marker) => marker.remove());
  markers = [];

  branches.value.forEach((branch) => {
    if (!map) return;

    const marker = L.marker([branch.lat, branch.lng]).addTo(map);

    marker.bindPopup(`
      <div style="min-width: 200px">
        <h3 style="font-weight: 700; margin-bottom: 6px;">
          ${branch.name}
        </h3>

        <p style="font-size: 13px; margin-bottom: 8px;">
          ${branch.address}
        </p>

        <a
          href="${getMapsUrl(branch)}"
          target="_blank"
          style="
            display: inline-block;
            background: #14b8a6;
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            text-decoration: none;
          "
        >
          Buka Google Maps
        </a>
      </div>
    `);

    markers.push(marker);
  });
};

onMounted(() => {
  map = L.map("branch-page-map").setView([-2.5, 118.0], 5);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  renderMarkers();
});

// Ikut update kalau data cabang berubah (mis. lewat AdminBranch)
watch(branches, renderMarkers, { deep: true });

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>
