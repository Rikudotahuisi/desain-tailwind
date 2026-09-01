<template>
  <div class="min-h-screen">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Footer />
    <Chatbot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Chatbot from '../components/Chatbot.vue'
</script>