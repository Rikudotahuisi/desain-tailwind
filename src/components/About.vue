<template>
  <section id="about" class="scroll-mt-20 py-20 bg-white">
    <div class="mx-auto max-w-[1400px] px-6 lg:px-16">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <!-- Left: Image -->
        <div class="relative">
          <div class="rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80" 
              alt="Medicare Hospital" 
              class="h-full w-full object-cover"
            />
          </div>
          <div class="absolute -bottom-6 -right-6 rounded-2xl bg-teal-500 p-6 text-white shadow-xl">
            <p class="text-4xl font-bold">20+</p>
            <p class="text-sm">Tahun Pengabdian</p>
          </div>
        </div>

        <!-- Right: Content -->
        <div class="flex flex-col justify-center">
          <span class="text-sm font-semibold tracking-wider text-teal-600 uppercase">
            <i class="fas fa-hospital mr-2"></i>Tentang Kami
          </span>
          <h2 class="mt-2 text-4xl font-bold text-slate-900 lg:text-5xl">
            Medicare Hospital
          </h2>
          <h3 class="mt-2 text-xl text-teal-600">
            Fasilitas Kesehatan dengan Pengalaman Tak Tertandingi
          </h3>
          <div class="mt-6 space-y-4 text-slate-600 leading-relaxed">
            <p>
              Medicare Hospital adalah fasilitas kesehatan terdaftar di bawah perusahaan terkemuka 
              <strong class="text-slate-900">'Kodungallur Medicare Pvt Ltd.'</strong>
            </p>
            <p>
              Kami berkomitmen untuk menyediakan layanan kesehatan yang <strong class="text-slate-900">ekonomis dan komprehensif</strong>, 
              membuat perawatan medis berkualitas dapat diakses oleh semua kalangan.
            </p>
            <p>
              Dengan <strong class="text-slate-900">20+ tahun pengalaman</strong> dan tim medis profesional, 
              kami terus berinovasi untuk memberikan pelayanan terbaik bagi masyarakat.
            </p>
          </div>

          <!-- Department List -->
          <div class="mt-8 grid grid-cols-2 gap-4">
            <div class="rounded-xl bg-slate-50 p-4">
              <h4 class="font-bold text-slate-900">Anesthesiology</h4>
              <p class="text-sm text-slate-600">Critical Care</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <h4 class="font-bold text-slate-900">Cardiology</h4>
              <p class="text-sm text-slate-600">General Medicine</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <h4 class="font-bold text-slate-900">Paediatrics</h4>
              <p class="text-sm text-slate-600">Obstetrics & Gynaecology</p>
            </div>
            <div class="rounded-xl bg-slate-50 p-4">
              <h4 class="font-bold text-slate-900">Orthopaedics</h4>
              <p class="text-sm text-slate-600">Emergency Medicine</p>
            </div>
          </div>

          <a href="#" class="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-teal-500 px-8 py-3 font-semibold text-white transition hover:bg-teal-600">
            <i class="fas fa-info-circle mr-2"></i>Ketahui Lebih
          </a>
        </div>
      </div>
    </div>
  </section>
</template>