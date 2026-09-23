<template>
  <section class="bg-slate-50 py-16">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-10">
      <div class="mb-10 text-center">
        <span
          class="mb-3 inline-block rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-600"
        >
          Lokasi Kami
        </span>

        <h2 class="text-3xl font-bold text-gray-900 md:text-4xl">
          Temukan Cabang Assyifa Hospital
        </h2>

        <p class="mx-auto mt-3 max-w-2xl text-gray-500">
          Lihat lokasi cabang rumah sakit kami melalui peta dan temukan cabang
          yang paling dekat dengan Anda.
        </p>
      </div>

      <div class="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div
          id="branch-map"
          class="h-[500px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm"
        ></div>

        <div class="max-h-[500px] space-y-4 overflow-y-auto pr-1">
          <div
            v-for="branch in branches"
            :key="branch.id"
            class="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="flex items-start gap-4">
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-600"
              >
                <i class="fas fa-hospital"></i>
              </div>

              <div class="min-w-0 flex-1">
                <h3 class="font-bold text-gray-900">
                  {{ branch.name }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  {{ branch.address }}
                </p>

                <div class="mt-3 space-y-1 text-sm">
                  <p class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-clock w-4 text-teal-500"></i>
                    {{ branch.hours }}
                  </p>

                  <p class="flex items-center gap-2 text-gray-600">
                    <i class="fas fa-phone w-4 text-teal-500"></i>
                    {{ branch.phone }}
                  </p>
                </div>

                <div class="mt-4 flex gap-2">
                  <a
                    :href="getMapsUrl(branch)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
                  >
                    Buka Maps
                  </a>

                  <router-link
                    :to="{ name: 'branch-Detail', params: { id: branch.id } }"
                    class="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Detail
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <p
            v-if="branches.length === 0"
            class="py-10 text-center text-sm text-gray-400"
          >
            Belum ada data cabang.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useBranch } from "../composables/useBranch";

const { branches, getMapsUrl } = useBranch();

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
      <div style="min-width: 220px">
        <h3 style="font-weight: 700; margin-bottom: 6px;">
          ${branch.name}
        </h3>

        <p style="font-size: 13px; margin-bottom: 5px;">
          ${branch.address}
        </p>

        <p style="font-size: 13px; margin-bottom: 8px;">
          ${branch.hours}
        </p>

        <a
          href="${getMapsUrl(branch)}"
          target="_blank"
          style="
            display: inline-block;
            background: #0d9488;
            color: white;
            padding: 7px 12px;
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
  map = L.map("branch-map").setView([-2.5, 118.0], 5);

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
