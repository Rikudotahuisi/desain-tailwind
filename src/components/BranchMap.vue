<template>
  <section class="bg-white py-16">
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
          Lihat lokasi cabang rumah sakit kami melalui peta dan temukan
          cabang yang paling dekat dengan Anda.
        </p>
      </div>

     
      <div class="grid gap-6 lg:grid-cols-[1fr_380px]">

    
        <div
          id="branch-map"
          class="h-[500px] w-full overflow-hidden rounded-3xl border border-gray-200 shadow-sm"
        ></div>

        
        <div class="space-y-4">

          <div
            v-for="branch in branches"
            :key="branch.id"
            class="rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
          >

            <div class="flex items-start gap-4">

              
              <div
                class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-xl text-teal-600"
              >
                
              </div>

              <div class="min-w-0 flex-1">

                <h3 class="font-bold text-gray-900">
                  {{ branch.name }}
                </h3>

                <p class="mt-1 text-sm text-gray-500">
                  {{ branch.address }}
                </p>

                <div class="mt-3 space-y-1 text-sm">
                  <p class="text-gray-600">
                     {{ branch.hours }}
                  </p>

                  <p class="text-gray-600">
                     {{ branch.phone }}
                  </p>
                </div>

                <div class="mt-4 flex gap-2">

                  <a
                    :href="branch.googleMaps"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="rounded-lg bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-700"
                  >
                    Buka Maps
                  </a>

                  <router-link
                    :to="`/branch/${branch.id}`"
                    class="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                  >
                    Detail
                  </router-link>

                </div>

              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

let map: L.Map | null = null;

const branches = [
  {
    id: 1,
    name: "Assyifa Hospital Palu",
    city: "Palu",
    address: "Jl. Ahmad Yani No. 25, Palu",
    phone: "0451-123456",
    hours: "Senin - Minggu, 08:00 - 21:00",

    
    lat: -0.8917,
    lng: 119.8707,

    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=-0.8917,119.8707",
  },

  {
    id: 2,
    name: "Assyifa Hospital Makassar",
    city: "Makassar",
    address: "Jl. Sultan Alauddin No. 10, Makassar",
    phone: "0411-654321",
    hours: "Senin - Minggu, 08:00 - 21:00",

    
    lat: -5.1750,
    lng: 119.4238,

    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=-5.1750,119.4238",
  },

  {
    id: 3,
    name: "Assyifa Hospital Jakarta",
    city: "Jakarta",
    address: "Jl. Sudirman No. 100, Jakarta",
    phone: "021-987654",
    hours: "Senin - Minggu, 08:00 - 21:00",

    
    lat: -6.2088,
    lng: 106.8456,

    googleMaps:
      "https://www.google.com/maps/search/?api=1&query=-6.2088,106.8456",
  },
];

onMounted(() => {
  
  map = L.map("branch-map").setView(
    [-2.5, 118.0],
    5
  );

  
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  
  branches.forEach((branch) => {
    if (!map) return;

    const marker = L.marker([
      branch.lat,
      branch.lng,
    ]).addTo(map);

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
          href="${branch.googleMaps}"
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
  });
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>