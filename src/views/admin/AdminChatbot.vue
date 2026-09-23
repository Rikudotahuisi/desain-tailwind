<template>
  <div class="p-6">
    <!-- Header -->
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-slate-800">Kelola Chatbot</h1>
        <p class="mt-1 text-sm text-slate-500">
          Atur kata kunci dan jawaban otomatis untuk chatbot Assyifa Bot.
        </p>
      </div>
      <router-link
        to="/admin/chatbot/create"
        class="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
      >
        <i class="fas fa-plus"></i>
        Tambah Keyword
      </router-link>
    </div>

    <!-- Stats -->
    <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <p class="text-xs font-medium text-slate-500">Total Keyword Group</p>
        <p class="mt-1 text-2xl font-bold text-slate-800">
          {{ entries.length }}
        </p>
      </div>
      <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <p class="text-xs font-medium text-slate-500">Aktif</p>
        <p class="mt-1 text-2xl font-bold text-teal-600">{{ activeCount }}</p>
      </div>
      <div class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
        <p class="text-xs font-medium text-slate-500">Tampil di Quick Reply</p>
        <p class="mt-1 text-2xl font-bold text-slate-800">
          {{ quickReplyCount }}
        </p>
      </div>
    </div>

    <!-- Search -->
    <div class="mb-4 relative">
      <i
        class="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"
      ></i>
      <input
        v-model="search"
        type="text"
        placeholder="Cari topik atau keyword..."
        class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
      />
    </div>

    <!-- List -->
    <div class="space-y-3">
      <div
        v-for="entry in filteredEntries"
        :key="entry.id"
        class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
      >
        <div class="flex items-start justify-between gap-4">
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-slate-800">{{ entry.title }}</h3>
              <span
                v-if="entry.showInQuickReply"
                class="rounded-full bg-teal-50 px-2 py-0.5 text-[10px] font-medium text-teal-600"
              >
                Quick Reply
              </span>
            </div>
            <div class="mt-2 flex flex-wrap gap-1.5">
              <span
                v-for="kw in entry.keywords"
                :key="kw"
                class="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600"
              >
                {{ kw }}
              </span>
            </div>
            <p
              class="mt-2 line-clamp-2 text-sm text-slate-500 whitespace-pre-line"
            >
              {{ entry.response }}
            </p>
          </div>

          <div class="flex flex-shrink-0 items-center gap-2">
            <button
              @click="toggleActive(entry.id)"
              class="relative h-6 w-11 rounded-full transition"
              :class="entry.active ? 'bg-teal-500' : 'bg-slate-300'"
              title="Aktif/Nonaktif"
            >
              <span
                class="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all"
                :class="entry.active ? 'left-5' : 'left-0.5'"
              ></span>
            </button>
            <router-link
              :to="`/admin/chatbot/edit/${entry.id}`"
              class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-teal-600"
              title="Edit"
            >
              <i class="fas fa-pen text-sm"></i>
            </router-link>
            <button
              @click="confirmDelete(entry.id)"
              class="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              title="Hapus"
            >
              <i class="fas fa-trash text-sm"></i>
            </button>
          </div>
        </div>
      </div>

      <div
        v-if="filteredEntries.length === 0"
        class="rounded-xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-100"
      >
        <i class="fas fa-comment-slash mb-3 text-3xl text-slate-300"></i>
        <p class="text-sm text-slate-500">Tidak ada keyword ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useChatbot } from "../../composables/useChatbot";

const { entries, deleteEntry, toggleActive } = useChatbot();

const search = ref("");

const filteredEntries = computed(() => {
  if (!search.value.trim()) return entries.value;
  const q = search.value.toLowerCase();
  return entries.value.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.keywords.some((k) => k.toLowerCase().includes(q)),
  );
});

const activeCount = computed(
  () => entries.value.filter((e) => e.active).length,
);
const quickReplyCount = computed(
  () => entries.value.filter((e) => e.showInQuickReply).length,
);

const confirmDelete = (id: number) => {
  if (confirm("Yakin ingin menghapus keyword ini?")) {
    deleteEntry(id);
  }
};
</script>
