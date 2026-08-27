<template>
  <section
    class="relative min-h-[820px] overflow-hidden
           rounded-b-[40px]
           bg-gradient-to-br
           from-slate-950
           via-slate-900
           to-teal-700"
  >

    //soft bg

    <div
      class="absolute -right-[180px] -top-[180px]
             h-[550px] w-[550px]
             rounded-full
             bg-teal-400/10
             blur-3xl"
    ></div>

    <div
      class="absolute right-[15%] top-[25%]
             h-[260px] w-[260px]
             rounded-full
             bg-cyan-300/10
             blur-3xl"
    ></div>

    <div
      class="absolute -bottom-[220px] right-[10%]
             h-[500px] w-[500px]
             rounded-full
             border border-white/[0.07]"
    ></div>


    //konten

    <div
      class="relative z-10 mx-auto min-h-[820px]
             max-w-[1400px]
             px-8
             pt-[210px]
             lg:px-16
             lg:pt-[245px]"
    >

      <div class="max-w-[650px]">

        //eyebrow
        <div class="mb-7 flex items-center gap-3">

          <span
            class="h-[1px] w-8 bg-teal-300/70"
          ></span>

          <p
            class="text-sm font-medium
                   tracking-[0.15em]
                   text-teal-200/90"
          >
            HEART RUN 2026
          </p>

        </div>


        //title
        <h1
          class="max-w-[620px]
                 text-5xl font-semibold
                 leading-[1.08]
                 tracking-[-0.025em]
                 text-white
                 sm:text-6xl
                 lg:text-[68px]"
        >
          One Journey.
          <br />

          <span class="text-white/90">
            One Community.
          </span>

          <br />

          <span class="text-teal-100/90">
            20 Years Together.
          </span>
        </h1>


        //deskripsi
        <p
          class="mt-8 max-w-[500px]
                 text-[15px]
                 leading-7
                 text-white/60"
        >
          Bersama dalam perjalanan kesehatan,
          membangun komunitas yang lebih sehat
          untuk masa depan.
        </p>


        //button
        <div class="mt-9 flex items-center gap-3">

          <a
            href="#"
            class="rounded-full
                   bg-white
                   px-6 py-3
                   text-sm font-semibold
                   text-slate-900
                   shadow-lg shadow-black/10
                   transition
                   hover:-translate-y-0.5
                   hover:bg-teal-50"
          >
            Selengkapnya
          </a>

          <a
            href="#"
            class="rounded-full
                   border border-white/20
                   bg-white/5
                   px-6 py-3
                   text-sm font-medium
                   text-white
                   backdrop-blur-md
                   transition
                   hover:bg-white/10"
          >
            Lihat Event
          </a>

        </div>

      </div>


      //dekorasi

      <div
        class="absolute right-[4%] top-[52%]
               hidden -translate-y-1/2
               lg:block"
      >

        <div
          class="relative h-[420px] w-[540px]"
        >
          //element
          <div
            class="absolute right-0 top-0
                   h-[190px] w-[190px]
                   rounded-full
                   bg-white/[0.07]"
          ></div>

          <div
            class="absolute right-[120px] top-[90px]
                   h-[130px] w-[130px]
                   rounded-full
                   bg-white/[0.06]"
          ></div>

          <div
            class="absolute left-[100px] top-[90px]
                   h-[105px] w-[105px]
                   rounded-full
                   bg-white/[0.05]"
          ></div>

          <div
            class="absolute left-[40px] top-[190px]
                   h-[70px] w-[70px]
                   rounded-full
                   bg-white/[0.06]"
          ></div>


          <div
            class="absolute left-1/2 top-1/2
                   h-[145px] w-[145px]
                   -translate-x-1/2
                   -translate-y-1/2
                   rotate-45"
          >

            <div
              class="absolute inset-0
                     rounded-[32px]
                     bg-white/[0.06]"
            ></div>

            <div
              class="absolute -left-[42px] top-0
                     h-[86px] w-[86px]
                     rounded-full
                     bg-white/[0.06]"
            ></div>

            <div
              class="absolute left-0 -top-[42px]
                     h-[86px] w-[86px]
                     rounded-full
                     bg-white/[0.06]"
            ></div>

          </div>


          //ecg

          <svg
            class="absolute left-1/2 top-1/2
                   z-20
                   -translate-x-1/2
                   -translate-y-1/2"
            width="500"
            height="180"
            viewBox="0 0 500 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >

            <path
              d="M10 90
                 H150
                 L175 90
                 L195 88
                 L215 120
                 L240 35
                 L265 125
                 L290 88
                 H490"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
              opacity="0.30"
            />

          </svg>

        </div>

      </div>

    </div>

  </section>
</template>