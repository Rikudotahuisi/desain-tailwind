<template>
  <div class="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8" style="background: linear-gradient(135deg, #f0f9ff 0%, #e6f7f0 50%, #f0f4ff 100%);">
    
    <!-- Background Decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
    </div>

    <div class="relative max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-flex items-center gap-2 bg-teal-100 text-teal-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          Hubungi Kami
        </div>
        <h1 class="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Kami Siap <span class="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">Membantu</span> Anda
        </h1>
        <p class="text-lg text-slate-600 max-w-2xl mx-auto">
          Ada pertanyaan atau butuh bantuan? Tim kami siap melayani Anda dengan sepenuh hati.
        </p>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Kolom Kiri: Informasi Kontak -->
        <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 bg-teal-100 rounded-2xl">
              <svg class="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Informasi Kontak</h2>
          </div>
          
          <div class="space-y-6">
            <!-- Alamat -->
            <div class="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl hover:bg-teal-50/80 transition-all duration-300 group">
              <div class="p-3 bg-teal-100 rounded-xl group-hover:bg-teal-200 transition-all duration-300">
                <svg class="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium">Alamat</p>
                <p class="text-slate-800 font-semibold">Jl. Kesehatan No. 123, Jakarta Selatan</p>
              </div>
            </div>

            <!-- Telepon -->
            <div class="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl hover:bg-blue-50/80 transition-all duration-300 group">
              <div class="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-all duration-300">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium">Telepon</p>
                <p class="text-slate-800 font-semibold">(021) 1234-5678</p>
              </div>
            </div>

            <!-- Email -->
            <div class="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl hover:bg-purple-50/80 transition-all duration-300 group">
              <div class="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-all duration-300">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium">Email</p>
                <p class="text-slate-800 font-semibold">info@assyifahospital.com</p>
              </div>
            </div>

            <!-- Jam Operasional -->
            <div class="flex items-start gap-4 p-4 bg-slate-50/80 rounded-2xl hover:bg-orange-50/80 transition-all duration-300 group">
              <div class="p-3 bg-orange-100 rounded-xl group-hover:bg-orange-200 transition-all duration-300">
                <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <p class="text-sm text-slate-500 font-medium">Jam Operasional</p>
                <p class="text-slate-800 font-semibold">Senin - Jumat: 08.00 - 20.00</p>
                <p class="text-slate-600 text-sm">Sabtu - Minggu: 09.00 - 17.00</p>
              </div>
            </div>
          </div>

          <!-- Tombol Aksi -->
          <div class="mt-8 space-y-3">
            <a href="tel:02112345678" class="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-teal-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Telepon Sekarang
            </a>
            <a 
              href="https://maps.google.com/maps?q=ASSYIFA+HOSPITAL+Jakarta" 
              target="_blank" 
              class="flex items-center justify-center gap-3 w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-3.5 px-6 rounded-2xl border-2 border-slate-200 transition-all duration-300 hover:border-teal-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <svg class="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
              Buka di Google Maps
            </a>
          </div>
        </div>

        <!-- Kolom Kanan: Google Maps -->
        <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50 hover:shadow-3xl transition-all duration-500">
          <div class="flex items-center gap-3 mb-6">
            <div class="p-3 bg-blue-100 rounded-2xl">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-800">Lokasi Kami</h2>
          </div>
          
          <div class="rounded-2xl overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.123456!2d106.845!3d-6.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e7b8f9a1%3A0x8d4e5f6a7b8c9d0e!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890" 
              width="100%" 
              height="400" 
              style="border:0;" 
              allowfullscreen="" 
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              class="w-full h-80 md:h-[400px]"
            ></iframe>
          </div>
          <p class="text-sm text-slate-500 mt-4 text-center">
            📍 Klik "Buka di Google Maps" untuk petunjuk arah dari lokasi Anda
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
// Halaman Contact - modern version with better contrast
</script>

<style scoped>
/* Animasi tambahan */
@keyframes pulse {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}
.animate-pulse {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.delay-1000 {
  animation-delay: 1s;
}
</style>