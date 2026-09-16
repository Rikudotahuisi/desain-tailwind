import { ref } from "vue";

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  fullDescription: string;
  mainCategory: string; // kategori utama, mis. "Medical Checkup", "Farmasi", "Alat Kesehatan"
  price: number;
  recommended: string;
  age: string;
  gender: "Semua" | "Laki-laki" | "Wanita";
  tests: string[];
}

export type ProductPayload = Omit<Product, "id">;

const STORAGE_KEY = "assyifa_products";
const LEGACY_CHECKUP_KEY = "assyifa_checkups";

// Foto random (konsisten per produk berdasarkan id) untuk produk yang belum
// punya foto sendiri. Menggantikan fallback icon lama.
function randomProductImage(id: number): string {
  return `https://picsum.photos/seed/product-${id}/600/400`;
}

// Dipakai di komponen: selalu kembalikan foto (upload jika ada, kalau tidak foto random)
export function getProductImage(
  product: Pick<Product, "id" | "image">,
): string {
  return product.image && product.image.trim() !== ""
    ? product.image
    : randomProductImage(product.id);
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Skrining Umum",
    image: randomProductImage(1),
    description: "Pemeriksaan kesehatan dasar",
    fullDescription:
      "Paket skrining kesehatan umum untuk mengetahui kondisi kesehatan Anda secara menyeluruh. Cocok untuk semua kalangan.",
    mainCategory: "Medical Checkup",
    price: 350000,
    recommended:
      "Semua usia, terutama untuk deteksi dini masalah kesehatan umum.",
    age: "Semua",
    gender: "Semua",
    tests: [
      "Cek Tekanan Darah",
      "Cek Gula Darah Puasa",
      "Cek Kolesterol Total",
      "BMI & Analisis Tubuh",
      "Tes Darah Rutin",
      "Konsultasi Dokter Umum",
    ],
  },
  {
    id: 2,
    name: "Skrining Jantung",
    image: randomProductImage(2),
    description: "Deteksi dini penyakit jantung",
    fullDescription:
      "Paket skrining khusus untuk mendeteksi risiko penyakit jantung koroner dan masalah kardiovaskular lainnya.",
    mainCategory: "Medical Checkup",
    price: 750000,
    recommended:
      "Usia 35+ tahun, memiliki riwayat keluarga penyakit jantung, perokok, atau memiliki gaya hidup tidak sehat.",
    age: "> 35 tahun",
    gender: "Semua",
    tests: [
      "EKG (Elektrokardiogram)",
      "Tes Treadmill / Stress Test",
      "Echocardiography",
      "Cek Kolesterol Lengkap",
      "Cek Tekanan Darah 24 Jam",
      "Konsultasi Spesialis Jantung",
    ],
  },
  {
    id: 3,
    name: "Skrining Kanker",
    image: randomProductImage(3),
    description: "Deteksi dini berbagai kanker",
    fullDescription:
      "Paket skrining komprehensif untuk mendeteksi dini berbagai jenis kanker termasuk kanker payudara, serviks, dan prostat.",
    mainCategory: "Medical Checkup",
    price: 1200000,
    recommended:
      "Usia 40+ tahun, memiliki riwayat keluarga kanker, atau faktor risiko lainnya.",
    age: "> 40 tahun",
    gender: "Semua",
    tests: [
      "USG Payudara (Wanita)",
      "Mammografi (Wanita 40+)",
      "Pap Smear (Wanita)",
      "PSA Test (Pria)",
      "Tes Darah Tumor Marker",
      "Konsultasi Spesialis Onkologi",
    ],
  },
  {
    id: 4,
    name: "Skrining Stroke",
    image: randomProductImage(4),
    description: "Deteksi risiko stroke",
    fullDescription:
      "Paket skrining untuk mendeteksi faktor risiko stroke dan mencegah kejadian stroke di masa depan.",
    mainCategory: "Medical Checkup",
    price: 850000,
    recommended:
      "Usia 40+ tahun, hipertensi, diabetes, atau memiliki riwayat keluarga stroke.",
    age: "> 40 tahun",
    gender: "Semua",
    tests: [
      "CT Scan Kepala",
      "USG Karotis",
      "Cek Tekanan Darah",
      "Cek Kolesterol & Gula Darah",
      "EKG",
      "Konsultasi Spesialis Saraf",
    ],
  },
  {
    id: 5,
    name: "Skrining Calon Pelajar",
    image: randomProductImage(5),
    description: "Cek kesehatan untuk pelajar",
    fullDescription:
      "Paket skrining kesehatan lengkap untuk calon pelajar baru. Memastikan kondisi fisik dan mental siap untuk menempuh pendidikan.",
    mainCategory: "Medical Checkup",
    price: 450000,
    recommended:
      "Calon pelajar baru, mahasiswa baru, atau peserta program pendidikan.",
    age: "Anak-anak/Remaja",
    gender: "Semua",
    tests: [
      "Cek Kesehatan Umum",
      "Tes Darah Lengkap",
      "Tes Urine",
      "Tes Mata & Telinga",
      "Tes Kebugaran Fisik",
      "Konsultasi Dokter",
    ],
  },
  {
    id: 6,
    name: "Skrining Pria",
    image: randomProductImage(6),
    description: "Kesehatan khusus pria",
    fullDescription:
      "Paket skrining kesehatan yang dirancang khusus untuk pria, mencakup pemeriksaan organ reproduksi dan penyakit umum pada pria.",
    mainCategory: "Medical Checkup",
    price: 650000,
    recommended:
      "Pria usia 25+ tahun, atau yang ingin menjaga kesehatan organ reproduksi.",
    age: "> 25 tahun",
    gender: "Laki-laki",
    tests: [
      "USG Prostat",
      "PSA Test",
      "Tes Hormon Testosteron",
      "Cek Kesehatan Umum",
      "Tes Darah Lengkap",
      "Konsultasi Spesialis Andrologi",
    ],
  },
  {
    id: 7,
    name: "Skrining Wanita",
    image: randomProductImage(7),
    description: "Kesehatan khusus wanita",
    fullDescription:
      "Paket skrining kesehatan yang dirancang khusus untuk wanita, mencakup pemeriksaan organ reproduksi dan deteksi dini kanker serviks & payudara.",
    mainCategory: "Medical Checkup",
    price: 650000,
    recommended:
      "Wanita usia 18+ tahun, terutama untuk deteksi dini kanker serviks dan payudara.",
    age: "> 25 tahun",
    gender: "Wanita",
    tests: [
      "Pap Smear",
      "USG Payudara",
      "Tes Hormon (Estrogen, Progesteron)",
      "Cek Kesehatan Umum",
      "Tes Darah Lengkap",
      "Konsultasi Spesialis Kandungan",
    ],
  },
  {
    id: 8,
    name: "Pranikah",
    image: randomProductImage(8),
    description: "Cek kesehatan sebelum menikah",
    fullDescription:
      "Paket skrining kesehatan lengkap untuk calon pengantin. Memastikan kedua calon pasangan dalam kondisi sehat untuk memulai kehidupan pernikahan.",
    mainCategory: "Medical Checkup",
    price: 900000,
    recommended:
      "Calon pengantin, baik pria maupun wanita, yang ingin memastikan kesehatan sebelum menikah.",
    age: "Dewasa",
    gender: "Semua",
    tests: [
      "Tes Darah Lengkap (Golongan Darah, HIV, Hepatitis)",
      "Tes Urine",
      "Cek Kesehatan Reproduksi",
      "Cek Kesehatan Umum",
      "Konsultasi Pranikah",
      "Tes Genetik Dasar",
    ],
  },
  {
    id: 9,
    name: "Pra-Karyawan",
    image: randomProductImage(9),
    description: "Cek kesehatan untuk karyawan baru",
    fullDescription:
      "Paket skrining kesehatan untuk calon karyawan baru. Memastikan kondisi fisik dan mental siap untuk bekerja di lingkungan profesional.",
    mainCategory: "Medical Checkup",
    price: 500000,
    recommended:
      "Calon karyawan baru di berbagai perusahaan, termasuk pemeriksaan kesehatan kerja.",
    age: "Dewasa",
    gender: "Semua",
    tests: [
      "Cek Kesehatan Umum",
      "Tes Darah & Urine",
      "Tes Mata, Telinga, Gigi",
      "Tes Kebugaran Fisik",
      "Tes Psikologi Dasar",
      "Konsultasi Dokter Okupasi",
    ],
  },
];

// Migrasi dari data checkup lama (sebelum fitur ini jadi "Produk")
function migrateLegacyCheckups(): Product[] | null {
  try {
    const raw = localStorage.getItem(LEGACY_CHECKUP_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;

    return parsed.map((item: any) => ({
      id: item.id,
      name: item.name,
      image: item.image || randomProductImage(item.id),
      description: item.description || "",
      fullDescription: item.fullDescription || "",
      mainCategory: "Medical Checkup",
      price: item.price || 0,
      recommended: item.recommended || "",
      age: item.age || "Semua",
      gender: item.gender || "Semua",
      tests: Array.isArray(item.tests) ? item.tests : [],
    }));
  } catch (e) {
    console.error("Gagal migrasi data checkup lama:", e);
    return null;
  }
}

function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // migrasi field lama (kalau ada) ke bentuk baru
        return parsed.map((item: any) => {
          const { subCategory, icon, ...rest } = item;
          return {
            mainCategory: item.mainCategory ?? "Medical Checkup",
            ...rest,
            image: item.image || randomProductImage(item.id),
          };
        });
      }
    }

    // Belum ada data produk baru → coba migrasi dari data checkup lama
    const migrated = migrateLegacyCheckups();
    if (migrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
      return migrated;
    }
  } catch (e) {
    console.error("Gagal memuat data produk:", e);
  }
  return defaultProducts;
}

const products = ref<Product[]>(loadProducts());

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products.value));
}

export function useProducts() {
  const getProductById = (id: number) =>
    products.value.find((p) => p.id === id);

  const addProduct = (payload: ProductPayload) => {
    const newId =
      products.value.length > 0
        ? Math.max(...products.value.map((p) => p.id)) + 1
        : 1;
    products.value.push({
      id: newId,
      ...payload,
      image: payload.image?.trim() ? payload.image : randomProductImage(newId),
    });
    persist();
    return newId;
  };

  const updateProduct = (id: number, payload: ProductPayload) => {
    const index = products.value.findIndex((p) => p.id === id);
    if (index !== -1) {
      products.value[index] = {
        id,
        ...payload,
        image: payload.image?.trim() ? payload.image : randomProductImage(id),
      };
      persist();
    }
  };

  const deleteProduct = (id: number) => {
    products.value = products.value.filter((p) => p.id !== id);
    persist();
  };

  return {
    products,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}

export const AGE_OPTIONS = [
  "Semua",
  "> 2 tahun",
  "> 25 tahun",
  "> 35 tahun",
  "> 40 tahun",
  "> 50 tahun",
  "> 60 tahun",
  "< 35 tahun",
  "Anak-anak/Remaja",
  "Dewasa",
  "Lansia",
];

export const GENDER_OPTIONS: Array<"Semua" | "Laki-laki" | "Wanita"> = [
  "Semua",
  "Laki-laki",
  "Wanita",
];

export function formatRupiah(value: number): string {
  return "Rp " + value.toLocaleString("id-ID");
}
