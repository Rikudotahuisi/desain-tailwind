<template>
  <div class="min-h-screen bg-white">
    <Navbar />
    <main>
      <Hero />
      <MedicalCheckup />
      <About />
      <Doctors />
      <Articles />
    </main>
    <Footer />

    <Chatbot />
  </div>

</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Footer from './components/Footer.vue'  
import About from './components/About.vue' 
import MedicalCheckup from './components/MedicalCheckup.vue';
import Articles from './components/Articles.vue'
import Doctors from './components/Doctors.vue';
import Chatbot from './components/Chatbot.vue';
</script>