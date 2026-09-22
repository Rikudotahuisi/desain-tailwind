<template>
  <div>
    <Hero />
    <ProductsSection />
    <About />
    <template></template>
    <Doctors />
    <Articles />
    <BranchMap />
  </div>
</template>

<script setup lang="ts">
import Hero from "../components/Hero.vue";
import ProductsSection from "../components/ProductsSection.vue";
import About from "../components/About.vue";
import Doctors from "../components/Doctors.vue";
import Articles from "../components/Articles.vue";
import BranchMap from "../components/BranchMap.vue";
</script>
