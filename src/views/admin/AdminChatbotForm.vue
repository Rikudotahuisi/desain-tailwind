<template>
  <div>
    <div class="mb-6 flex items-center gap-3">
      <router-link
        to="/admin/chatbot"
        class="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100"
      >
        <i class="fas fa-arrow-left"></i>
      </router-link>
      <h1 class="text-2xl font-bold text-slate-800">
        {{ isEdit ? "Edit Keyword" : "Tambah Keyword" }}
      </h1>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
    >
      <!-- Title -->
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700"
          >Nama Topik</label
        >
        <input
          v-model="form.title"
          type="text"
          placeholder="Contoh: Jam Buka"
          class="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        />
        <p v-if="errors.title" class="mt-1 text-xs text-red-500">
          {{ errors.title }}
        </p>
      </div>

      <!-- Keywords -->
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700">
          Kata Kunci (keyword)
        </label>
        <div class="flex gap-2">
          <input
            v-model="keywordInput"
            @keydown.enter.prevent="addKeyword"
            @keydown.,.prevent="addKeyword"
            type="text"
            placeholder="Ketik keyword lalu Enter, mis: buka"
            class="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          />
          <button
            type="button"
            @click="addKeyword"
            class="rounded-xl bg-teal-50 px-4 text-sm font-medium text-teal-600 transition hover:bg-teal-100"
          >
            Tambah
          </button>
        </div>
        <div class="mt-2 flex flex-wrap gap-2">
          <span
            v-for="(kw, i) in form.keywords"
            :key="kw + i"
            class="flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
          >
            {{ kw }}
            <button
              type="button"
              @click="removeKeyword(i)"
              class="text-slate-400 hover:text-red-500"
            >
              <i class="fas fa-times-circle"></i>
            </button>
          </span>
        </div>
        <p v-if="errors.keywords" class="mt-1 text-xs text-red-500">
          {{ errors.keywords }}
        </p>
        <p class="mt-1.5 text-xs text-slate-400">
          Chatbot akan mendeteksi pesan user yang mengandung salah satu keyword
          ini.
        </p>
      </div>

      <!-- Response (WYSIWYG) -->
      <div>
        <label class="mb-1.5 block text-sm font-medium text-slate-700"
          >Jawaban Bot</label
        >

        <div
          class="overflow-hidden rounded-xl border border-slate-200 focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-500/20"
        >
          <!-- Toolbar -->
          <div
            class="flex items-center gap-1 border-b border-slate-100 bg-slate-50 px-2 py-1.5"
          >
            <button
              type="button"
              @mousedown.prevent="toggleBold"
              title="Tebal"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
            >
              <i class="fas fa-bold text-xs"></i>
            </button>
            <button
              type="button"
              @mousedown.prevent="insertLink"
              title="Sisipkan Link"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
            >
              <i class="fas fa-link text-xs"></i>
            </button>
            <div class="mx-1 h-5 w-px bg-slate-300"></div>
            <button
              type="button"
              @mousedown.prevent="clearFormat"
              title="Hapus Format"
              class="flex h-8 w-8 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-200"
            >
              <i class="fas fa-eraser text-xs"></i>
            </button>
          </div>

          <!-- Editable area -->
          <div
            ref="editorRef"
            contenteditable="true"
            data-placeholder="Tulis jawaban bot di sini..."
            class="chatbot-editor min-h-[140px] px-4 py-3 text-sm text-slate-700 focus:outline-none"
            @input="onEditorInput"
            @keydown.enter.prevent="handleEnter"
          ></div>
        </div>

        <p v-if="errors.response" class="mt-1 text-xs text-red-500">
          {{ errors.response }}
        </p>
        <p class="mt-1.5 text-xs text-slate-400">
          Pilih teks lalu klik <i class="fas fa-bold"></i> untuk menebalkan,
          atau <i class="fas fa-link"></i> untuk menambahkan link.
        </p>
      </div>

      <!-- Toggles -->
      <div class="flex items-center gap-6">
        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input
            v-model="form.showInQuickReply"
            type="checkbox"
            class="h-4 w-4 rounded text-teal-600 focus:ring-teal-500"
          />
          Tampilkan sebagai Quick Reply
        </label>
        <label class="flex items-center gap-2 text-sm text-slate-700">
          <input
            v-model="form.active"
            type="checkbox"
            class="h-4 w-4 rounded text-teal-600 focus:ring-teal-500"
          />
          Aktif
        </label>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 border-t border-slate-100 pt-5">
        <router-link
          to="/admin/chatbot"
          class="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          Batal
        </router-link>
        <button
          type="submit"
          class="rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
        >
          {{ isEdit ? "Simpan Perubahan" : "Simpan" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChatbot, type ChatbotEntry } from "../../composables/useChatbot";

const route = useRoute();
const router = useRouter();
const { getEntryById, addEntry, updateEntry } = useChatbot();

const isEdit = computed(() => !!route.params.id);
const keywordInput = ref("");
const editorRef = ref<HTMLDivElement | null>(null);

const form = reactive<Omit<ChatbotEntry, "id" | "createdAt">>({
  title: "",
  keywords: [],
  response: "",
  showInQuickReply: false,
  active: true,
});

const errors = reactive({ title: "", keywords: "", response: "" });

// ===== MARKDOWN <-> HTML CONVERTER =====
// Format yang dipakai sama seperti formatMessage() di Chatbot.vue:
// **bold** , [teks](url) , \n untuk baris baru
const escapeHtml = (str: string) =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const markdownToHtml = (text: string): string => {
  let html = escapeHtml(text);
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');
  return html;
};

const walkNode = (node: Node): string => {
  let result = "";
  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      result += (child.textContent || "").replace(/\u00A0/g, " ");
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const el = child as HTMLElement;
      const tag = el.tagName.toLowerCase();
      const inner = walkNode(el);
      if (tag === "b" || tag === "strong") {
        result += inner.trim() ? `**${inner}**` : inner;
      } else if (tag === "a") {
        const href = el.getAttribute("href") || "#";
        result += `[${inner}](${href})`;
      } else if (tag === "br") {
        result += "\n";
      } else if (tag === "div" || tag === "p") {
        result += `${inner}\n`;
      } else {
        result += inner;
      }
    }
  });
  return result;
};

const htmlToMarkdown = (html: string): string => {
  const container = document.createElement("div");
  container.innerHTML = html;
  return walkNode(container)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

// ===== EDITOR ACTIONS =====
const onEditorInput = () => {
  if (editorRef.value) {
    form.response = htmlToMarkdown(editorRef.value.innerHTML);
  }
};

const handleEnter = () => {
  document.execCommand("insertLineBreak");
  onEditorInput();
};

const toggleBold = () => {
  document.execCommand("bold");
  onEditorInput();
  editorRef.value?.focus();
};

const insertLink = () => {
  const selection = window.getSelection();
  const hasSelection = !!selection && selection.toString().length > 0;
  const url = window.prompt("Masukkan URL:", "https://");
  if (!url) return;

  editorRef.value?.focus();
  if (hasSelection) {
    document.execCommand("createLink", false, url);
  } else {
    const label = window.prompt("Teks untuk link:", url) || url;
    document.execCommand(
      "insertHTML",
      false,
      `<a href="${url}">${escapeHtml(label)}</a>`,
    );
  }
  onEditorInput();
};

const clearFormat = () => {
  document.execCommand("removeFormat");
  document.execCommand("unlink");
  onEditorInput();
  editorRef.value?.focus();
};

// ===== LOAD DATA (edit mode) =====
onMounted(async () => {
  if (isEdit.value) {
    const entry = getEntryById(Number(route.params.id));
    if (entry) {
      form.title = entry.title;
      form.keywords = [...entry.keywords];
      form.response = entry.response;
      form.showInQuickReply = entry.showInQuickReply;
      form.active = entry.active;

      await nextTick();
      if (editorRef.value) {
        editorRef.value.innerHTML = markdownToHtml(entry.response);
      }
    }
  }
});

// ===== KEYWORDS =====
const addKeyword = () => {
  const val = keywordInput.value.trim().replace(/,$/, "");
  if (val && !form.keywords.includes(val)) {
    form.keywords.push(val);
  }
  keywordInput.value = "";
};

const removeKeyword = (index: number) => {
  form.keywords.splice(index, 1);
};

// ===== SUBMIT =====
const validate = (): boolean => {
  errors.title = form.title.trim() ? "" : "Nama topik wajib diisi.";
  errors.keywords =
    form.keywords.length > 0 ? "" : "Tambahkan minimal 1 keyword.";
  errors.response = form.response.trim() ? "" : "Jawaban bot wajib diisi.";
  return !errors.title && !errors.keywords && !errors.response;
};

const handleSubmit = () => {
  if (editorRef.value) {
    form.response = htmlToMarkdown(editorRef.value.innerHTML);
  }
  if (!validate()) return;

  if (isEdit.value) {
    updateEntry(Number(route.params.id), { ...form });
  } else {
    addEntry({ ...form });
  }
  router.push("/admin/chatbot");
};
</script>

<style scoped>
.chatbot-editor {
  white-space: pre-wrap;
  word-break: break-word;
}

.chatbot-editor:empty:before {
  content: attr(data-placeholder);
  color: #94a3b8;
  pointer-events: none;
}

.chatbot-editor :deep(strong) {
  font-weight: 700;
  color: #0f172a;
}

.chatbot-editor :deep(a) {
  color: #0d9488;
  text-decoration: underline;
}
</style>
