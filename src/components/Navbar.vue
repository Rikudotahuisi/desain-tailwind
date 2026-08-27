<template>
  <header class="absolute inset-x-0 top-0 z-50">

    //top bar
    <div class="border-b border-slate-200/60 bg-white/90 backdrop-blur-md">
      <div
        class="mx-auto flex h-[54px] max-w-[1400px]
               items-center justify-between px-6 lg:px-10"
      >

        //search
        <div
          class="flex h-9 w-[220px] items-center gap-2
                 rounded-full border border-slate-200/80
                 bg-white/70 px-4
                 text-[13px] text-slate-400"
        >
          <svg
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-4-4"></path>
          </svg>

          <span>Search</span>
        </div>
        
        <div class="flex items-center gap-5">
          <div
            class="hidden items-center gap-2
                   text-[13px] font-medium
                   text-slate-600 sm:flex"
          >
            <span class="text-teal-600">☎</span>
            <span>1600-MED</span>
          </div>

          //chat
          <button
            class="hidden items-center gap-2
                   text-[13px] font-medium
                   text-slate-600
                   transition hover:text-teal-600 md:flex"
          >
            <span>💬</span>
            <span>Chatbot</span>
          </button>

          //bahasa
          <div
            class="flex items-center rounded-full
                   border border-slate-200
                   bg-white p-1"
          >
            <button
              class="rounded-full bg-slate-800
                     px-3 py-1 text-[11px]
                     font-semibold text-white"
            >
              ID
            </button>

            <button
              class="px-2.5 py-1 text-[11px]
                     font-medium text-slate-500"
            >
              EN
            </button>
          </div>

        </div>

      </div>
    </div>


    //main nav
    <div
      class="border-b border-white/10
             bg-slate-950/20 backdrop-blur-[10px]"
    >

      <div
        class="mx-auto flex h-[78px] max-w-[1400px]
               items-center justify-between px-6 lg:px-10"
      >

        //logo
        <a
          href="#"
          class="flex shrink-0 items-center gap-3"
        >

          //Logo icon
          <div
            class="flex h-10 w-10 items-center justify-center
                   rounded-[13px]
                   bg-white/15
                   shadow-sm ring-1 ring-white/20
                   backdrop-blur-md"
          >
            <span
              class="text-xl font-bold text-white"
            >
              +
            </span>
          </div>


        
          <div class="leading-none">

            <div
              class="text-[15px] font-bold
                     tracking-[0.5px] text-white"
            >
              MEDICARE
            </div>

            <div
              class="mt-1 text-[9px]
                     font-medium tracking-[3px]
                     text-white/60"
            >
              HOSPITAL
            </div>

          </div>

        </a>


        <nav
          class="hidden items-center
                 gap-1 lg:flex"
        >

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Tentang Kami
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Rumah Sakit
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Jadwal Dokter
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Medical Check Up
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Pelayanan
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Promo
          </a>

          <a
            href="#"
            class="rounded-full px-4 py-2.5
                   text-[13px] font-medium
                   text-white/80
                   transition-all duration-200
                   hover:bg-white/10
                   hover:text-white"
          >
            Artikel
          </a>

        </nav>


        
        <button
          class="flex h-10 w-10 items-center justify-center
                 rounded-full
                 border border-white/20
                 bg-white/10
                 text-white
                 backdrop-blur-md
                 lg:hidden"
        >
          ☰
        </button>

      </div>

    </div>

  </header>
</template>