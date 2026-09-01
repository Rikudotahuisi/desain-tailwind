<template>
  <div class="min-h-screen bg-white flex" style="padding-top: 85px;">
    <!-- Left Side - Image -->
    <div class="hidden lg:flex flex-1 bg-gradient-to-br from-teal-600 to-teal-700 items-center justify-center p-12 relative overflow-hidden">
      <div class="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-2xl"></div>
      
      <div class="relative z-10 text-center text-white">
        <div class="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-8">
          <i class="fas fa-plus text-4xl font-bold text-white"></i>
        </div>
        <h2 class="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p class="text-white/80 max-w-sm mx-auto leading-relaxed">
          Sign in to access your account and continue your journey with Assyiffa Hospital.
        </p>
        <div class="mt-8 flex items-center justify-center gap-2">
          <span class="w-2 h-2 rounded-full bg-white/60"></span>
          <span class="w-2 h-2 rounded-full bg-white/30"></span>
          <span class="w-2 h-2 rounded-full bg-white/30"></span>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center px-6 py-10">
      <div class="w-full max-w-md">
        <div class="mb-8">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
              <i class="fas fa-plus text-lg font-bold"></i>
            </div>
            <span class="text-xl font-bold text-slate-900">Medicare</span>
          </div>
          <h1 class="text-3xl font-bold text-slate-900">Sign in</h1>
          <p class="mt-2 text-sm text-slate-500">Welcome Back</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <input
              v-model="form.email"
              type="email"
              required
              placeholder="john@readymadeui.com"
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-400"
            />
          </div>

          <div>
            <div class="flex items-center justify-between mb-1.5">
              <label class="block text-sm font-medium text-slate-700">Password</label>
              <a href="#" class="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline transition">Forgot password?</a>
            </div>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="**********"
                class="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-4 pr-12 py-3.5 text-sm transition-all focus:border-teal-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 placeholder:text-slate-400"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600 transition-colors"
              >
                <i :class="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2.5">
            <input
              v-model="form.remember"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-teal-500 focus:ring-2 focus:ring-teal-500/20 focus:ring-offset-0"
            />
            <label class="text-sm text-slate-600">Remember me</label>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full rounded-xl bg-teal-600 py-3.5 font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:bg-teal-700 hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <i v-if="loading" class="fas fa-spinner fa-spin mr-2"></i>
            <i v-else class="fas fa-sign-in-alt mr-2"></i>
            {{ loading ? 'Processing...' : 'Sign in' }}
          </button>
        </form>

        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-slate-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="bg-white px-4 text-slate-400">or</span>
          </div>
        </div>

        <p class="text-center text-sm text-slate-600">
          Don't have an account? 
          <router-link to="/register" class="font-semibold text-teal-600 hover:text-teal-700 hover:underline transition">
            Sign up
          </router-link>
        </p>

        <p class="mt-6 text-center text-xs text-slate-400 leading-relaxed">
          Join our private network to discover job opportunities and connect with professionals.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

const handleLogin = () => {
  loading.value = true
  
  setTimeout(() => {
    console.log('Data Login:', form.value)
    alert('✅ Login berhasil! Selamat datang kembali.')
    loading.value = false
    router.push('/')
  }, 1500)
}
</script>