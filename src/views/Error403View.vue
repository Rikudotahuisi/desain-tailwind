<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6"
  >
    <div
      class="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
      style="
        background-image: url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1920&q=80');
      "
    ></div>

    <div class="absolute inset-0 bg-slate-950/60"></div>

    <div class="pointer-events-none absolute inset-0">
      <div
        class="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-red-400/10 blur-3xl"
      ></div>
    </div>

    <div class="relative z-10 mx-auto w-full max-w-[560px] text-center">
      <div class="mx-auto mb-6 flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 200"
          class="h-32 w-32 drop-shadow-[0_0_25px_rgba(239,68,68,0.5)] sm:h-40 sm:w-40"
          fill="none"
        >
          <circle cx="100" cy="100" r="80" fill="#1e293b" />
          <circle
            cx="100"
            cy="100"
            r="80"
            stroke="#ef4444"
            stroke-width="2"
            stroke-dasharray="6 6"
          />
          <path
            d="M100 40 L145 58 V105 C145 130 125 148 100 158 C75 148 55 130 55 105 V58 L100 40 Z"
            fill="#ef4444"
            fill-opacity="0.15"
            stroke="#ef4444"
            stroke-width="2.5"
            stroke-linejoin="round"
          />
          <rect x="82" y="102" width="36" height="30" rx="5" fill="#ef4444" />
          <path
            d="M90 102 V92 a10 10 0 0 1 20 0 V102"
            stroke="#ef4444"
            stroke-width="4"
            stroke-linecap="round"
          />
          <circle cx="100" cy="115" r="3" fill="#0f172a" />
          <rect x="98.5" y="115" width="3" height="8" fill="#0f172a" />
        </svg>
      </div>

      <p
        class="animate-fade-up text-7xl font-bold leading-none tracking-[-0.03em] text-white transition-all duration-500 hover:scale-110 hover:text-teal-400 hover:tracking-wider sm:text-8xl"
      >
        403
      </p>

      <h1
        class="animate-fade-up mt-4 text-2xl font-semibold text-white transition-all duration-500 hover:scale-105 hover:text-teal-400 sm:text-3xl"
        style="animation-delay: 0.1s"
      >
        Akses Ditolak
      </h1>

      <p
        class="animate-fade-up mt-3 text-sm text-slate-300 transition-colors duration-500 hover:text-white sm:text-base"
        style="animation-delay: 0.2s"
      >
        Kamu tidak memiliki izin untuk mengakses halaman ini.
      </p>

      <div
        class="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
        style="animation-delay: 0.3s"
      >
        <router-link
          to="/"
          class="flex items-center gap-2 rounded-full bg-teal-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-500/30 transition-all duration-300 hover:bg-teal-400"
        >
          <i class="fas fa-house"></i>
          Kembali ke Beranda
        </router-link>

        <router-link
          to="/login"
          class="flex items-center gap-2 rounded-full border border-slate-600 bg-slate-900/60 px-7 py-3 text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all duration-300 hover:border-teal-500 hover:text-white"
        >
          <i class="fas fa-right-to-bracket"></i>
          Login
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-up {
  animation: fade-up 0.7s ease-out both;
}

@media (prefers-reduced-motion: reduce) {
  .animate-fade-up {
    animation: none;
  }
}
</style>