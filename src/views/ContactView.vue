<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Judul Halaman -->
    <h2 class="text-3xl font-bold text-center mb-8 text-blue-800">
      📍 Hubungi Kami
    </h2>

    <!-- Dua Kolom: Info Kontak (kiri) + Maps (kanan) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      
      <!-- Kolom Kiri: Informasi Kontak -->
      <div class="bg-white p-6 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-gray-700">Informasi Kontak</h3>
        
        <div class="space-y-4">
          <p class="flex items-start">
            <span class="text-blue-600 mr-2">🏥</span>
            <span><strong>Alamat:</strong><br>Jl. Kesehatan No. 123, Jakarta Selatan</span>
          </p>
          
          <p class="flex items-start">
            <span class="text-blue-600 mr-2">📞</span>
            <span><strong>Telepon:</strong><br>(021) 1234-5678</span>
          </p>
          
          <p class="flex items-start">
            <span class="text-blue-600 mr-2">✉️</span>
            <span><strong>Email:</strong><br>info@assyifahospital.com</span>
          </p>
          
          <p class="flex items-start">
            <span class="text-blue-600 mr-2">🕐</span>
            <span><strong>Jam Operasional:</strong><br>Senin - Jumat: 08.00 - 20.00<br>Sabtu - Minggu: 09.00 - 17.00</span>
          </p>
        </div>

        <!-- Tombol Aksi -->
        <div class="mt-6 space-y-2">
          <a href="tel:02112345678" class="block bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-lg transition">
            📞 Telepon Sekarang
          </a>
          <a 
            href="https://maps.google.com/maps?q=ASSYIFA+HOSPITAL+Jakarta" 
            target="_blank" 
            class="block bg-blue-600 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded-lg transition"
          >
            🗺️ Buka di Google Maps (Luar)
          </a>
        </div>
      </div>

      <!-- Kolom Kanan: Google Maps -->
      <div class="bg-white p-2 rounded-lg shadow-lg">
        <h3 class="text-xl font-semibold mb-4 text-gray-700 px-4 pt-2">Lokasi Kami</h3>
        <div class="w-full h-80 md:h-96 rounded-lg overflow-hidden">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3950.123456!2d106.845!3d-6.175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e7b8f9a1%3A0x8d4e5f6a7b8c9d0e!2sJakarta!5e0!3m2!1sen!2sid!4v1234567890" 
            width="100%" 
            height="100%" 
            style="border:0;" 
            allowfullscreen="" 
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p class="text-sm text-gray-500 mt-2 px-4 pb-2">
          *Klik "Buka di Google Maps" untuk petunjuk arah dari lokasi Anda.
        </p>
      </div>

    </div>
  </div>
</template>

<script setup>
// Halaman Contact - tidak perlu script khusus
</script>

<style scoped>
/* Style tambahan jika diperlukan */
</style>