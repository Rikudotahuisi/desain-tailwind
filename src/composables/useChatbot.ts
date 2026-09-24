import { ref, watch } from "vue";

export interface ChatbotEntry {
  id: number;
  title: string; // label untuk admin, mis. "Jam Buka"
  keywords: string[]; // kata kunci pemicu, mis. ["buka", "jam buka", "jam berapa"]
  response: string; // mendukung **bold**, [text](url), dan baris baru
  showInQuickReply: boolean;
  active: boolean;
  createdAt: string;
}

const STORAGE_KEY = "assyifa_chatbot_entries";

const DEFAULT_ENTRIES: ChatbotEntry[] = [
  {
    id: 1,
    title: "Jam Buka",
    keywords: [
      "jam buka",
      "buka jam berapa",
      "jam berapa buka",
      "buka",
      "tutup",
      "operasional",
    ],
    response:
      "**Jam Operasional Assyifa Hospital**\n\nKami buka **24 Jam Nonstop** setiap hari untuk layanan IGD.\n\nUntuk poliklinik: **08.00 - 20.00 WIB**\n\nHubungi 1600-MED untuk info lebih lanjut.",
    showInQuickReply: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Medical Check Up",
    keywords: ["medical check up", "mcu", "check up"],
    response:
      "**Medical Check Up**\n\nKami menyediakan berbagai paket MCU:\n\n- **Paket Basic** - Rp 350.000\n  Pemeriksaan kesehatan dasar\n\n- **Paket Premium** - Rp 750.000\n  Pemeriksaan lengkap + EKG & Rontgen\n\n- **Paket Executive** - Rp 1.250.000\n  Pemeriksaan menyeluruh + konsultasi spesialis\n\nHubungi 1600-MED untuk booking.",
    showInQuickReply: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Jadwal Dokter",
    keywords: ["jadwal dokter", "dokter", "spesialis"],
    response:
      '**Jadwal Dokter Spesialis**\n\nDokter tersedia di berbagai bidang:\n\n- **Jantung** - dr. Andi Pratama, Sp.JP\n- **Kandungan** - dr. Siti Rahayu, Sp.OG\n- **Anak** - dr. Maya Sari, Sp.A\n\nLihat jadwal lengkap di halaman "Jadwal Dokter".',
    showInQuickReply: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    title: "Tentang Kami",
    keywords: ["tentang kami", "rumah sakit", "assyifa"],
    response:
      "**Assyifa Hospital**\n\nFasilitas kesehatan dengan komitmen:\n- 20+ tahun pengalaman\n- Layanan kesehatan ekonomis & komprehensif\n- 50.000+ pasien puas\n- 20+ spesialisasi\n\nJl. Kesehatan No. 123, Jakarta\nTelepon: 1600-MED (633)",
    showInQuickReply: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    title: "Booking Online",
    keywords: ["booking", "daftar", "janji"],
    response:
      '**Booking Online**\n\nUntuk melakukan booking, Anda dapat:\n\n1. Klik tombol "Booking" di halaman yang tersedia\n2. Hubungi kami di **1600-MED**\n3. Chat WhatsApp: **0812-3456-7890**\n4. Datang langsung ke **Jl. Kesehatan No. 123, Jakarta**',
    showInQuickReply: true,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    title: "Kontak",
    keywords: ["kontak", "telepon", "hubungi", "call"],
    response:
      "**Kontak Assyifa Hospital**\n\nJl. Kesehatan No. 123, Jakarta\nTelepon: 1600-MED (633)\nEmail: info@assyifahospital.com\nBuka: 24 Jam Nonstop\n\nChat WhatsApp: 0812-3456-7890",
    showInQuickReply: false,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    title: "Sapaan",
    keywords: ["halo", "hai", "hi", "selamat pagi", "selamat siang"],
    response:
      "Halo! Selamat datang di **Assyifa Hospital**.\n\nAda yang bisa saya bantu hari ini?",
    showInQuickReply: false,
    active: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    title: "Terima Kasih",
    keywords: ["terima kasih", "makasih", "thank"],
    response:
      "Sama-sama! Senang bisa membantu Anda.\n\nJika ada pertanyaan lain, jangan ragu untuk bertanya ya.",
    showInQuickReply: false,
    active: true,
    createdAt: new Date().toISOString(),
  },
];

const entries = ref<ChatbotEntry[]>(loadEntries());

function loadEntries(): ChatbotEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Gagal load chatbot entries:", e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ENTRIES));
  return DEFAULT_ENTRIES;
}

watch(
  entries,
  (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val));
  },
  { deep: true },
);

export function useChatbot() {
  const getAllEntries = () => entries.value;

  const getEntryById = (id: number) => entries.value.find((e) => e.id === id);

  const addEntry = (data: Omit<ChatbotEntry, "id" | "createdAt">) => {
    const newEntry: ChatbotEntry = {
      ...data,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    entries.value.push(newEntry);
    return newEntry;
  };

  const updateEntry = (
    id: number,
    data: Partial<Omit<ChatbotEntry, "id" | "createdAt">>,
  ) => {
    const idx = entries.value.findIndex((e) => e.id === id);
    if (idx !== -1) entries.value[idx] = { ...entries.value[idx], ...data };
  };

  const deleteEntry = (id: number) => {
    entries.value = entries.value.filter((e) => e.id !== id);
  };

  const toggleActive = (id: number) => {
    const entry = getEntryById(id);
    if (entry) entry.active = !entry.active;
  };

  // Cari respon dari keyword yang paling spesifik (paling panjang) yang cocok
  const findResponse = (message: string): string | null => {
    const lower = message.toLowerCase().trim();
    let bestEntry: ChatbotEntry | null = null;
    let bestKeywordLength = 0;

    for (const entry of entries.value) {
      if (!entry.active) continue;
      for (const keyword of entry.keywords) {
        const kw = keyword.toLowerCase().trim();
        if (kw && lower.includes(kw) && kw.length > bestKeywordLength) {
          bestKeywordLength = kw.length;
          bestEntry = entry;
        }
      }
    }

    return bestEntry ? bestEntry.response : null;
  };

  const getQuickReplies = (): string[] => {
    return entries.value
      .filter((e) => e.active && e.showInQuickReply)
      .map((e) => e.title);
  };

  return {
    entries,
    getAllEntries,
    getEntryById,
    addEntry,
    updateEntry,
    deleteEntry,
    toggleActive,
    findResponse,
    getQuickReplies,
  };
}
