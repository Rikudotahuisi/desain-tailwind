<template>
  <section id="articles" class="scroll-mt-20 py-20 bg-white">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <div class="mb-12 flex flex-wrap items-end justify-between">
        <div>
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-newspaper mr-2"></i>Artikel & Berita
          </span>
          <h2 class="mt-2 text-4xl font-bold text-slate-900 lg:text-5xl">
            Informasi <span class="text-teal-600">Kesehatan</span>
          </h2>
        </div>
        <router-link to="/articles" class="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3 font-semibold text-white transition hover:bg-teal-600 hover:-translate-y-0.5"> 
          Semua Artikel
        </router-link>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <!-- Berita 1 -->
        <div class="group rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden bg-teal-100 flex items-center justify-center text-6xl">
            🩸
            <span class="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
              <i class="fas fa-calendar-alt mr-1"></i>October 7, 2023
            </span>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
              Blood Donation Camp 2023
            </h3>
            <p class="mt-2 text-sm text-slate-600">
              Donor darah berhasil dengan partisipasi tinggi, terutama dari kalangan wanita. Meningkatkan kesadaran masyarakat akan pentingnya donor darah.
            </p>
            <a href="#" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700">
              Baca Selengkapnya
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Berita 2 -->
        <div class="group rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden bg-teal-100 flex items-center justify-center text-6xl">
            🩺
            <span class="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
              <i class="fas fa-calendar-alt mr-1"></i>August 20, 2023
            </span>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
              Pelayanan Kesehatan Gratis
            </h3>
            <p class="mt-2 text-sm text-slate-600">
              Menyelenggarakan program pengobatan gratis untuk masyarakat kurang mampu sebagai bentuk kepedulian sosial.
            </p>
            <a href="#" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700">
              Baca Selengkapnya
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- Berita 3 -->
        <div class="group rounded-2xl overflow-hidden border border-slate-100 transition-all hover:shadow-xl hover:-translate-y-1">
          <div class="relative h-48 overflow-hidden bg-teal-100 flex items-center justify-center text-6xl">
            👨‍⚕️
            <span class="absolute top-4 left-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white">
              <i class="fas fa-calendar-alt mr-1"></i>July 22, 2026
            </span>
          </div>
          <div class="p-6">
            <h3 class="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
              Doctors' Day Celebration 2026
            </h3>
            <p class="mt-2 text-sm text-slate-600">
              Merayakan Hari Dokter dengan apresiasi kepada seluruh tenaga medis yang telah berdedikasi untuk kesehatan masyarakat.
            </p>
            <a href="#" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-teal-600 transition hover:text-teal-700">
              Baca Selengkapnya
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>