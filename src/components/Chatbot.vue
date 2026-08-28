<template>
  <div class="fixed bottom-6 right-6 z-50">
    <!-- Chat Button -->
    <button
      @click="toggleChat"
      class="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-110 hover:shadow-2xl"
      :class="{ 'scale-0 opacity-0': isOpen }"
    >
      <i class="fas fa-comment-dots text-xl group-hover:rotate-12 transition-transform duration-300"></i>
      <span class="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
        1
      </span>
      <span class="absolute inset-0 rounded-full bg-teal-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
    </button>

    <!-- Chat Window -->
    <div
      v-if="isOpen"
      class="flex h-[620px] w-[400px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 md:w-[440px]"
      :class="{ 'animate-slide-up': isOpen }"
    >
      <!-- ===== HEADER ===== -->
      <div class="flex-shrink-0 bg-gradient-to-r from-teal-600 to-teal-700 px-5 py-4 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="relative">
              <div class="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                <i class="fas fa-robot text-lg"></i>
              </div>
              <span class="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 ring-2 ring-white animate-pulse"></span>
            </div>
            <div>
              <h3 class="font-semibold tracking-wide">Medicare Bot</h3>
              <p class="text-xs text-teal-100">Online • Siap membantu</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button 
              @click="resetChat" 
              class="rounded-full p-2 text-white/70 transition hover:bg-white/20 hover:text-white" 
              title="Reset Chat"
            >
              <i class="fas fa-undo-alt text-xs"></i>
            </button>
            <button 
              @click="toggleChat" 
              class="rounded-full p-2 text-white/70 transition hover:bg-white/20 hover:text-white" 
              title="Tutup"
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- ===== MESSAGES ===== -->
      <div 
        ref="messagesContainer" 
        class="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-to-b from-slate-50 to-white p-4 scroll-smooth"
      >
        <div v-for="(msg, index) in messages" :key="index" class="mb-4">
          <!-- Bot Message -->
          <div v-if="msg.sender === 'bot'" class="flex items-start gap-3">
            <div class="mt-1 h-9 w-9 flex-shrink-0 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <i class="fas fa-robot text-sm"></i>
            </div>
            <div class="max-w-[80%] rounded-2xl rounded-tl-none bg-white p-4 shadow-sm ring-1 ring-slate-100">
              <div class="text-sm leading-relaxed text-slate-700 whitespace-pre-line" v-html="formatMessage(msg.text)"></div>
            </div>
          </div>
          
          <!-- User Message -->
          <div v-else class="flex items-start justify-end gap-3">
            <div class="max-w-[80%] rounded-2xl rounded-tr-none bg-gradient-to-r from-teal-500 to-teal-600 p-4 shadow-md">
              <p class="text-sm leading-relaxed text-white whitespace-pre-line">{{ msg.text }}</p>
            </div>
            <div class="mt-1 h-9 w-9 flex-shrink-0 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
              <i class="fas fa-user text-sm"></i>
            </div>
          </div>
        </div>
        
        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex items-start gap-3">
          <div class="mt-1 h-9 w-9 flex-shrink-0 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            <i class="fas fa-robot text-sm"></i>
          </div>
          <div class="rounded-2xl rounded-tl-none bg-white p-4 shadow-sm ring-1 ring-slate-100">
            <div class="flex gap-1.5">
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style="animation-delay: 0s"></span>
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style="animation-delay: 0.15s"></span>
              <span class="h-2.5 w-2.5 animate-bounce rounded-full bg-slate-400" style="animation-delay: 0.3s"></span>
            </div>
          </div>
        </div>
        
        <div ref="bottomSpacer" class="h-1"></div>
      </div>

      <!-- ===== QUICK REPLY ===== -->
      <div v-if="showQuickReplies && !isTyping" class="flex-shrink-0 border-t border-slate-100 bg-white px-4 py-3">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="reply in quickReplies"
            :key="reply"
            @click="sendQuickReply(reply)"
            class="rounded-full border border-teal-200 bg-teal-50 px-4 py-1.5 text-xs font-medium text-teal-600 transition hover:bg-teal-100 hover:border-teal-300 active:scale-95"
          >
            {{ reply }}
          </button>
        </div>
      </div>

      <!-- ===== INPUT ===== -->
      <div class="flex-shrink-0 border-t border-slate-100 bg-white p-3">
        <div class="flex gap-2">
          <div class="relative flex-1">
            <input
              ref="inputField"
              v-model="userInput"
              @keydown.enter.prevent="sendMessage"
              type="text"
              placeholder="Ketik pesan..."
              class="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 pr-12 text-sm transition focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-400"
            />
            <button
              v-if="userInput.trim()"
              @click="clearInput"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
            >
              <i class="fas fa-times-circle text-sm"></i>
            </button>
          </div>
          <button
            @click="sendMessage"
            :disabled="!userInput.trim()"
            class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'

// ===== STATE =====
const isOpen = ref(false)
const userInput = ref('')
const isTyping = ref(false)
const showQuickReplies = ref(true)
const messagesContainer = ref<HTMLElement | null>(null)
const inputField = ref<HTMLInputElement | null>(null)
const bottomSpacer = ref<HTMLElement | null>(null)

// ===== INTERFACE =====
interface Message {
  sender: 'user' | 'bot'
  text: string
}

// ===== FORMAT MESSAGE =====
const formatMessage = (text: string) => {
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/\[(.*?)\]\((.*?)\)/g, 
    '<a href="$2" target="_blank" class="text-teal-600 hover:text-teal-700 hover:underline font-medium">$1</a>')
  formatted = formatted.replace(/\n/g, '<br>')
  return formatted
}

// ===== MESSAGES =====
const messages = ref<Message[]>([
  {
    sender: 'bot',
    text: 'Halo! Selamat datang di **Medicare Hospital**.\n\nSaya siap membantu Anda dengan:\n- Medical Check Up\n- Jadwal Dokter\n- Informasi Rumah Sakit\n- Booking Online\n- Kontak Kami\n\nSilakan pilih menu di bawah atau ketik pertanyaan Anda.'
  }
])

// ===== QUICK REPLIES =====
const quickReplies = ref([
  'Medical Check Up',
  'Jadwal Dokter',
  'Tentang Kami',
  'Booking Online',
  'Kontak'
])

// ===== RESPONSES SESUAI MENU =====
const getResponseByMenu = (message: string): string => {
  const lowerMsg = message.toLowerCase()

  // Medical Check Up
  if (lowerMsg.includes('medical check up') || lowerMsg.includes('mcu') || lowerMsg.includes('check up')) {
    return `**Medical Check Up**\n\nKami menyediakan berbagai paket MCU:\n\n- **Paket Basic** - Rp 350.000\n  Pemeriksaan kesehatan dasar\n\n- **Paket Premium** - Rp 750.000\n  Pemeriksaan lengkap + EKG & Rontgen\n\n- **Paket Executive** - Rp 1.250.000\n  Pemeriksaan menyeluruh + konsultasi spesialis\n\nHubungi 1600-MED untuk booking.\n\n[Lihat Paket MCU](https://www.whatdokewh.com/)`
  }

  // Jadwal Dokter
  if (lowerMsg.includes('jadwal dokter') || lowerMsg.includes('dokter') || lowerMsg.includes('spesialis')) {
    return `**Jadwal Dokter Spesialis**\n\nDokter tersedia di berbagai bidang:\n\n- **Jantung** - dr. Andi Pratama, Sp.JP\n  Rating 4.9 (12 tahun pengalaman)\n\n- **Kandungan** - dr. Siti Rahayu, Sp.OG\n  Rating 4.8 (10 tahun pengalaman)\n\n- **Anak** - dr. Maya Sari, Sp.A\n  Rating 4.9 (8 tahun pengalaman)\n\nLihat jadwal lengkap di halaman "Jadwal Dokter".\n\n[Jadwal Dokter](https://www.whatdokewh.com/)`
  }

  // Tentang Kami
  if (lowerMsg.includes('tentang kami') || lowerMsg.includes('rumah sakit') || lowerMsg.includes('medicare')) {
    return `**Medicare Hospital**\n\nMedicare Hospital adalah fasilitas kesehatan terdaftar di bawah perusahaan **"Kodungallur Medicare Pvt Ltd"**.\n\n**Komitmen Kami:**\n- 20+ tahun pengalaman\n- Layanan kesehatan ekonomis & komprehensif\n- 50.000+ pasien puas\n- 20+ spesialisasi\n\nJl. Kesehatan No. 123, Jakarta\nTelepon: 1600-MED (633)\n\n[Tentang Kami](https://www.whatdokewh.com/)\n[Activate Pad Web Dorkers](https://www.whatdokewh.com/)\n[Go to Settings to activate Windows.](https://www.whatdokewh.com/)`
  }

  // Booking Online
  if (lowerMsg.includes('booking') || lowerMsg.includes('daftar') || lowerMsg.includes('janji')) {
    return `**Booking Online**\n\nUntuk melakukan booking, Anda dapat:\n\n1. Klik tombol **"Booking"** di halaman yang tersedia\n2. Hubungi kami di **1600-MED**\n3. Chat WhatsApp: **0812-3456-7890**\n4. Datang langsung ke **Jl. Kesehatan No. 123, Jakarta**\n\nKami siap membantu Anda 24 jam!\n\n[Booking Online](https://www.whatdokewh.com/)`
  }

  // Kontak
  if (lowerMsg.includes('kontak') || lowerMsg.includes('telepon') || lowerMsg.includes('hubungi') || lowerMsg.includes('call')) {
    return `**Kontak Medicare Hospital**\n\nJl. Kesehatan No. 123, Jakarta\nTelepon: 1600-MED (633)\nEmail: info@medicarehospital.com\nBuka: 24 Jam Nonstop\n\nChat WhatsApp: 0812-3456-7890\n\n[Website](https://www.whatdokewh.com/)\n[Medical Check Up](https://www.whatdokewh.com/)\n[Activate Pad Web Dorkers](https://www.whatdokewh.com/)`
  }

  // Halo / Salam
  if (lowerMsg.includes('halo') || lowerMsg.includes('hai') || lowerMsg.includes('hi') || lowerMsg.includes('selamat') || lowerMsg.includes('pagi') || lowerMsg.includes('siang')) {
    return `Halo! Selamat datang di **Medicare Hospital**.\n\nAda yang bisa saya bantu hari ini?\n\nSilakan pilih menu di atas atau tanyakan apa saja tentang layanan kami.`
  }

  // Terima kasih
  if (lowerMsg.includes('terima kasih') || lowerMsg.includes('makasih') || lowerMsg.includes('thank') || lowerMsg.includes('thanks')) {
    return `Sama-sama! Senang bisa membantu Anda.\n\nJika ada pertanyaan lain, jangan ragu untuk bertanya ya. Semoga sehat selalu!`
  }

  // Default - tidak dikenal
  return `Maaf, saya belum memahami pertanyaan Anda.\n\n**Silakan pilih salah satu menu di atas** atau hubungi kami di **1600-MED** untuk bantuan lebih lanjut.\n\nMenu yang tersedia:\n- Medical Check Up\n- Jadwal Dokter\n- Tentang Kami\n- Booking Online\n- Kontak`
}

// ===== FUNCTIONS =====
const scrollToBottomInstant = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const focusInput = () => {
  nextTick(() => {
    if (inputField.value) {
      inputField.value.focus()
    }
  })
}

const clearInput = () => {
  userInput.value = ''
  focusInput()
}

const toggleChat = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    setTimeout(() => {
      scrollToBottomInstant()
      focusInput()
    }, 300)
  }
}

const resetChat = () => {
  messages.value = [
    {
      sender: 'bot',
      text: 'Halo! Selamat datang di **Medicare Hospital**.\n\nAda yang bisa saya bantu? Silakan pilih menu di bawah.'
    }
  ]
  userInput.value = ''
  showQuickReplies.value = true
  isTyping.value = false
  setTimeout(() => {
    scrollToBottomInstant()
    focusInput()
  }, 100)
}

// ===== SEND MESSAGE =====
const sendMessage = () => {
  const text = userInput.value.trim()
  if (!text) return

  messages.value.push({ sender: 'user', text })
  userInput.value = ''
  showQuickReplies.value = false
  scrollToBottomInstant()

  isTyping.value = true
  scrollToBottomInstant()

  setTimeout(() => {
    isTyping.value = false
    const response = getResponseByMenu(text)
    messages.value.push({
      sender: 'bot',
      text: response
    })
    showQuickReplies.value = true
    setTimeout(scrollToBottomInstant, 50)
  }, 1500 + Math.random() * 500)
}

const sendQuickReply = (reply: string) => {
  userInput.value = reply
  sendMessage()
}

const handleOpenChatbot = () => {
  isOpen.value = true
  setTimeout(() => {
    scrollToBottomInstant()
    focusInput()
  }, 300)
}

// ===== WATCHERS =====
watch(messages, () => scrollToBottomInstant(), { deep: true })
watch(isTyping, (newVal) => { if (newVal) scrollToBottomInstant() })

// ===== LIFECYCLE =====
onMounted(() => {
  window.addEventListener('openChatbot', handleOpenChatbot)
})

onBeforeUnmount(() => {
  window.removeEventListener('openChatbot', handleOpenChatbot)
})
</script>

<style scoped>
/* ===== ANIMATIONS ===== */
.animate-slide-up {
  animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-bounce {
  animation: bounce 1.4s infinite ease-in-out;
}

@keyframes bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-8px); }
}

.animate-pulse {
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* ===== SCROLLBAR ===== */
.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 9999px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* ===== LINK STYLING ===== */
:deep(a) {
  color: #0d9488;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  border-bottom: 1px dashed #0d9488;
}

:deep(a:hover) {
  color: #0f766e;
  border-bottom-color: #0f766e;
}

:deep(strong) {
  color: #0f172a;
  font-weight: 700;
}

/* ===== SCROLL SMOOTH ===== */
.overflow-y-auto {
  scroll-behavior: smooth;
}
</style>