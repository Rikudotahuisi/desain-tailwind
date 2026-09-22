<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6"
  >
    <!-- Background accents -->
    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-400/10 blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[560px] text-center">
      <!-- Kode error -->
      <p
        class="text-8xl font-bold leading-none tracking-[-0.03em] text-white sm:text-9xl"
      >
        403
      </p>

      <h1 class="mt-6 text-2xl font-semibold text-white sm:text-3xl">
        Akses Ditolak
      </h1>

      <p class="mt-3 text-sm text-slate-400 sm:text-base">
        Kamu tidak memiliki izin untuk mengakses halaman ini.
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
          to="/login"
          class="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3 text-sm font-semibold text-slate-200 transition-all duration-300 hover:border-teal-500 hover:text-white"
        >
          <i class="fas fa-right-to-bracket"></i>
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>