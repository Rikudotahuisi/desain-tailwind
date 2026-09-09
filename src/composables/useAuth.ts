import { ref, computed } from 'vue'

// TODO: Ganti dengan logic auth asli project (misalnya cek token/session dari backend)
interface CurrentUser {
  nama: string
  email: string
  noHp: string
}

const currentUser = ref<CurrentUser | null>(
  JSON.parse(localStorage.getItem('assyifa_current_user') || 'null')
)

export function useAuth() {
  const isLoggedIn = computed(() => !!currentUser.value)

  function login(user: CurrentUser) {
    currentUser.value = user
    localStorage.setItem('assyifa_current_user', JSON.stringify(user))
  }

  function logout() {
    currentUser.value = null
    localStorage.removeItem('assyifa_current_user')
  }

  return { currentUser, isLoggedIn, login, logout }
}