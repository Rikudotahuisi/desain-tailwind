import { computed, ref } from "vue";

export interface Facility {
  id: number;
  name: string;
  icon: string;
}

export interface Branch {
  id: number;
  name: string;
  city: string;
  province: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  status: "Aktif" | "Nonaktif";
  image: string;
  lat: number;
  lng: number;
  description: string;
  facilities: Facility[];
}

const branches = ref<Branch[]>([
  {
    id: 1,
    name: "Assyifa Hospital Palu",
    city: "Palu",
    province: "Sulawesi Tengah",
    address: "Jl. Ahmad Yani No. 25, Palu",
    phone: "0451-123456",
    email: "palu@assyifahospital.com",
    hours: "Senin - Minggu, 08:00 - 21:00",
    status: "Aktif",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    lat: -0.8917,
    lng: 119.8707,
    description:
      "Assyifa Hospital Palu merupakan salah satu cabang Assyifa Hospital yang menyediakan berbagai layanan kesehatan untuk masyarakat. Kami berkomitmen memberikan pelayanan kesehatan yang aman, nyaman, dan profesional.",
    facilities: [
      { id: 1, name: "IGD 24 Jam", icon: "fas fa-truck-medical" },
      { id: 2, name: "ICU", icon: "fas fa-bed-pulse" },
      { id: 3, name: "Laboratorium", icon: "fas fa-flask" },
      { id: 4, name: "Apotek", icon: "fas fa-prescription-bottle-medical" },
      { id: 5, name: "Ruang Rawat Inap", icon: "fas fa-bed" },
      { id: 6, name: "Radiologi", icon: "fas fa-x-ray" },
    ],
  },
  {
    id: 2,
    name: "Assyifa Hospital Makassar",
    city: "Makassar",
    province: "Sulawesi Selatan",
    address: "Jl. Sultan Alauddin No. 10, Makassar",
    phone: "0411-654321",
    email: "makassar@assyifahospital.com",
    hours: "Senin - Minggu, 08:00 - 21:00",
    status: "Aktif",
    image:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
    lat: -5.175,
    lng: 119.4238,
    description:
      "Assyifa Hospital Makassar menyediakan layanan kesehatan terpadu dengan fasilitas yang mendukung kebutuhan pasien dan keluarga.",
    facilities: [
      { id: 1, name: "IGD 24 Jam", icon: "fas fa-truck-medical" },
      { id: 2, name: "Ruang Operasi", icon: "fas fa-user-doctor" },
      { id: 3, name: "Laboratorium", icon: "fas fa-flask" },
      { id: 4, name: "Apotek", icon: "fas fa-prescription-bottle-medical" },
      { id: 5, name: "Ruang Rawat Inap", icon: "fas fa-bed" },
      { id: 6, name: "Area Parkir Luas", icon: "fas fa-square-parking" },
    ],
  },
  {
    id: 3,
    name: "Assyifa Hospital Jakarta",
    city: "Jakarta",
    province: "DKI Jakarta",
    address: "Jl. Sudirman No. 100, Jakarta",
    phone: "021-987654",
    email: "jakarta@assyifahospital.com",
    hours: "Senin - Minggu, 08:00 - 21:00",
    status: "Aktif",
    image:
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    lat: -6.2088,
    lng: 106.8456,
    description:
      "Assyifa Hospital Jakarta menyediakan berbagai layanan kesehatan dengan dukungan tenaga medis dan fasilitas kesehatan yang lengkap.",
    facilities: [
      { id: 1, name: "IGD 24 Jam", icon: "fas fa-truck-medical" },
      { id: 2, name: "ICU", icon: "fas fa-bed-pulse" },
      { id: 3, name: "Laboratorium", icon: "fas fa-flask" },
      { id: 4, name: "Radiologi", icon: "fas fa-x-ray" },
      { id: 5, name: "Ruang Rawat Inap", icon: "fas fa-bed" },
      { id: 6, name: "Apotek", icon: "fas fa-prescription-bottle-medical" },
    ],
  },
]);

export function useBranch() {
  const search = ref("");

  const filteredBranches = computed(() => {
    const keyword = search.value.toLowerCase();

    return branches.value.filter((branch) => {
      return (
        branch.name.toLowerCase().includes(keyword) ||
        branch.city.toLowerCase().includes(keyword) ||
        branch.province.toLowerCase().includes(keyword)
      );
    });
  });

  // Cari 1 cabang berdasarkan ID — dipakai di branchDetail.vue & AdminBranchForm.vue
  const getBranchById = (id: number) => {
    return branches.value.find((branch) => branch.id === id);
  };

  // Cabang lain selain yang sedang dibuka — dipakai di bagian "Rumah Sakit Lainnya"
  const getOtherBranches = (id: number) => {
    return branches.value.filter((branch) => branch.id !== id);
  };

  // Bangun link Google Maps otomatis dari koordinat lat/lng cabang
  const getMapsUrl = (branch: Pick<Branch, "lat" | "lng">) => {
    return `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`;
  };

  const addBranch = (branch: Omit<Branch, "id">) => {
    branches.value.unshift({
      id: Date.now(),
      ...branch,
    });
  };

  const updateBranch = (id: number, updatedBranch: Omit<Branch, "id">) => {
    const index = branches.value.findIndex((branch) => branch.id === id);

    if (index !== -1) {
      branches.value[index] = {
        id,
        ...updatedBranch,
      };
    }
  };

  const deleteBranch = (id: number) => {
    branches.value = branches.value.filter((branch) => branch.id !== id);
  };

  return {
    branches,
    search,
    filteredBranches,
    getBranchById,
    getOtherBranches,
    getMapsUrl,
    addBranch,
    updateBranch,
    deleteBranch,
  };
}
