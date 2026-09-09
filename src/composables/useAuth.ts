import { ref, computed } from 'vue'

export interface AppUser {
  id: number
  name: string
  email: string
  password: string // dummy plain-text, hanya untuk kebutuhan development (belum ada backend)
  role: 'admin' | 'user'
  phone?: string
}

export type SafeUser = Omit<AppUser, 'password'>

// ===== SHARED STATE (module-level singleton, sama pola dengan useDoctors) =====
// Data dummy: 1 admin + beberapa user biasa
const users = ref<AppUser[]>([
  { id: 1, name: 'Admin', email: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Budi Santoso', email: 'budi@email.com', password: 'user123', role: 'user', phone: '0812-3456-7890' },
  { id: 3, name: 'Siti Rahayu', email: 'siti@email.com', password: 'user123', role: 'user', phone: '0813-4567-8901' },
  { id: 4, name: 'Agus Wijaya', email: 'agus@email.com', password: 'user123', role: 'user', phone: '0814-5678-9012' },
])

function loadCurrentUser(): SafeUser | null {
  try {
    const raw = localStorage.getItem('user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

const currentUser = ref<SafeUser | null>(loadCurrentUser())

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value)
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function login(email: string, password: string): { success: boolean; user?: SafeUser; message?: string } {
    const found = users.value.find((u) => u.email === email && u.password === password)
    if (!found) {
      return { success: false, message: 'Email atau password salah!' }
    }
    const { password: _pw, ...safeUser } = found
    currentUser.value = safeUser
    // Pertahankan key localStorage yang sama seperti versi lama (isAdmin, user)
    // supaya bagian lain aplikasi yang sudah membaca key ini tetap jalan
    localStorage.setItem('user', JSON.stringify(safeUser))
    localStorage.setItem('isAdmin', found.role === 'admin' ? 'true' : 'false')
    return { success: true, user: safeUser }
  }

  function register(data: { name: string; email: string; password: string; phone?: string }) {
    if (users.value.some((u) => u.email === data.email)) {
      return { success: false, message: 'Email sudah terdaftar!' }
    }
    const nextId = users.value.length ? Math.max(...users.value.map((u) => u.id)) + 1 : 1
    const newUser: AppUser = { id: nextId, role: 'user', ...data }
    users.value.push(newUser)
    return { success: true }
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('user')
    localStorage.removeItem('isAdmin')
  }

  return {
    users,
    currentUser,
    isLoggedIn,
    isAdmin,
    login,
    register,
    logout,
  }
}