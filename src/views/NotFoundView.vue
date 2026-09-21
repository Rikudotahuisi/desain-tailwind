<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6"
  >
    <!-- Background accents -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[560px] text-center">
      <!-- Icon badge -->
      <div
        class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-teal-500/10 ring-1 ring-teal-400/30"
      >
        <i class="fas fa-heart-pulse text-3xl text-teal-400"></i>
      </div>

      <p
        class="text-8xl font-bold leading-none tracking-[-0.03em] text-white sm:text-9xl"
      >
        404
      </p>

      <h1 class="mt-6 text-2xl font-semibold text-white sm:text-3xl">
        Halaman Tidak Ditemukan
      </h1>
      <p
        class="mx-auto mt-4 max-w-[420px] text-base leading-relaxed text-white/60"
      >
        Maaf, halaman yang Anda cari tidak tersedia, sudah dipindahkan, atau
        alamatnya salah. Silakan kembali ke beranda atau hubungi kami jika Anda
        butuh bantuan.
      </p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <router-link
          to="/"
          class="flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:bg-teal-400"
        >
          <i class="fas fa-house"></i>
          Kembali ke Beranda
        </router-link>
        <router-link
          to="/contact"
          class="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10"
        >
          <i class="fas fa-headset"></i>
          Hubungi Kami
        </router-link>
      </div>

      <div
        class="mt-12 flex items-center justify-center gap-2 text-[12px] font-medium text-white/40"
      >
        <i class="fas fa-phone text-teal-300"></i>
        <span>1600-MED</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
