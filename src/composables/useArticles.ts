import { ref } from 'vue'

export interface Article {
  id: number
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  published: boolean
}

export const categories = [
  'Kardiologi',
  'Kandungan',
  'Anak',
  'Pencegahan',
  'Gizi',
  'Olahraga',
  'Mental Health'
]

// ===== SHARED STATE (module-level singleton) =====
// Dengan mendefinisikan `articles` di luar fungsi composable, semua komponen
// yang meng-import `useArticles()` akan berbagi data yang sama (mirip store sederhana),
// sehingga data tetap ada saat berpindah halaman (list -> form -> list).
const articles = ref<Article[]>([
  {
    id: 1,
    title: '7 Tips Menjaga Kesehatan Jantung di Usia Muda',
    excerpt: 'Pola hidup sehat sangat penting untuk mencegah penyakit jantung koroner. Simak 7 tips yang bisa Anda terapkan mulai sekarang.',
    content: 'Penyakit jantung merupakan salah satu penyebab kematian tertinggi di Indonesia. Namun, banyak orang tidak menyadari bahwa penyakit ini sebenarnya dapat dicegah dengan menerapkan pola hidup sehat sejak dini. Berikut adalah 7 tips yang bisa Anda terapkan untuk menjaga kesehatan jantung: 1. Konsumsi makanan sehat dengan gizi seimbang 2. Rutin berolahraga minimal 30 menit setiap hari 3. Hindari merokok dan konsumsi alkohol 4. Kelola stres dengan baik 5. Periksa tekanan darah secara rutin 6. Jaga berat badan ideal 7. Tidur yang cukup 7-8 jam per hari.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.izyBjaj9XVwm_JSKlPiKPgHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    category: 'Kardiologi',
    author: 'dr. Andi Pratama, Sp.JP',
    date: '28 Agustus 2026',
    readTime: '5 menit',
    published: true
  },
  {
    id: 2,
    title: 'Pentingnya Medical Check Up Tahunan untuk Deteksi Dini',
    excerpt: 'Deteksi dini penyakit melalui pemeriksaan kesehatan rutin setiap tahun dapat menyelamatkan nyawa. Kenali manfaatnya di sini.',
    content: 'Medical check up tahunan adalah investasi kesehatan yang sangat penting. Banyak penyakit serius seperti kanker, diabetes, dan penyakit jantung dapat dideteksi lebih awal melalui pemeriksaan rutin. Dengan deteksi dini, pengobatan dapat dilakukan lebih cepat dan tingkat kesembuhan lebih tinggi. Manfaat medical check up tahunan: Mendeteksi penyakit sejak dini, Memantau kondisi kesehatan secara berkala, Mencegah komplikasi penyakit, Memberikan ketenangan pikiran, Sebagai dasar untuk perubahan gaya hidup.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80',
    category: 'Pencegahan',
    author: 'dr. Budi Santoso, Sp.PD',
    date: '27 Agustus 2026',
    readTime: '4 menit',
    published: true
  },
  {
    id: 3,
    title: 'Nutrisi Tepat untuk Ibu Hamil dan Janin',
    excerpt: 'Panduan lengkap makanan sehat untuk mendukung kehamilan dan perkembangan janin yang optimal.',
    content: 'Kehamilan adalah masa yang penting bagi ibu dan janin. Nutrisi yang tepat sangat diperlukan untuk mendukung pertumbuhan dan perkembangan janin, serta menjaga kesehatan ibu. Konsumsi makanan bergizi seimbang dengan asupan vitamin dan mineral yang cukup sangat dianjurkan. Nutrisi penting untuk ibu hamil: Asam folat untuk perkembangan otak janin, Zat besi untuk mencegah anemia, Kalsium untuk tulang dan gigi janin, Protein untuk pertumbuhan jaringan, Vitamin D untuk sistem kekebalan tubuh.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80',
    category: 'Kandungan',
    author: 'dr. Siti Rahayu, Sp.OG',
    date: '26 Agustus 2026',
    readTime: '6 menit',
    published: false
  },
  {
    id: 4,
    title: 'Olahraga yang Aman untuk Penderita Diabetes',
    excerpt: 'Penderita diabetes tetap bisa berolahraga dengan aman. Simak jenis olahraga yang direkomendasikan dan tipsnya.',
    content: 'Olahraga memiliki peran penting dalam mengontrol kadar gula darah bagi penderita diabetes. Namun, tidak semua jenis olahraga cocok untuk penderita diabetes.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    category: 'Olahraga',
    author: 'dr. Rina Wati, Sp.GK',
    date: '25 Agustus 2026',
    readTime: '5 menit',
    published: true
  },
  {
    id: 5,
    title: 'Mengatasi Stres dan Kecemasan di Era Digital',
    excerpt: 'Tekanan hidup di era digital dapat memicu stres dan kecemasan. Pelajari cara mengelolanya dengan efektif.',
    content: 'Stres dan kecemasan menjadi masalah kesehatan mental yang semakin umum di era digital. Tekanan dari media sosial, pekerjaan, dan kehidupan sehari-hari dapat memicu perasaan cemas dan stres. Penting untuk mengenali tanda-tanda stres dan kecemasan serta menerapkan strategi coping yang sehat. Cara mengatasi stres dan kecemasan: Meditasi dan teknik relaksasi, Olahraga teratur, Tidur yang cukup, Batasi penggunaan media sosial, Konsultasi dengan profesional kesehatan mental jika diperlukan.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80',
    category: 'Mental Health',
    author: 'dr. Eka Sari, Sp.MH',
    date: '24 Agustus 2026',
    readTime: '6 menit',
    published: true
  }
  
])

export function useArticles() {
  const getArticleById = (id: number) => articles.value.find(a => a.id === id)

  const addArticle = (data: Omit<Article, 'id' | 'date' | 'readTime'>) => {
    const today = new Date().toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    const nextId = articles.value.length
      ? Math.max(...articles.value.map(a => a.id)) + 1
      : 1

    const newArticle: Article = {
      id: nextId,
      date: today,
      readTime: '5 menit',
      ...data
    }
    articles.value.push(newArticle)
    return newArticle
  }

  const updateArticle = (id: number, data: Omit<Article, 'id' | 'date' | 'readTime'>) => {
    const index = articles.value.findIndex(a => a.id === id)
    if (index !== -1) {
      articles.value[index] = { ...articles.value[index], ...data }
    }
  }

  const deleteArticle = (id: number) => {
    articles.value = articles.value.filter(a => a.id !== id)
  }

  return {
    articles,
    categories,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle
  }
}
