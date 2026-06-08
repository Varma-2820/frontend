<script setup lang="ts">
useHead({ title: 'Lookbook — Rang Mahal' })

const looks = [
  { title: 'Banarasi Mornings', sub: 'Festive Edit 2026', g: ['#c47060', '#7a2818'], to: '/shop?q=banarasi', wide: true },
  { title: 'Garden of Chanderi', sub: 'Daywear', g: ['#a8bca0', '#687850'], to: '/shop?cat=cotton', wide: false },
  { title: 'The Bridal Hour', sub: 'Trousseau', g: ['#b01820', '#600008'], to: '/shop?cat=bridal', wide: false },
  { title: 'Indigo Ikat', sub: 'Heritage Weaves', g: ['#4a5a9a', '#1a2050'], to: '/shop?q=patola', wide: false },
  { title: 'Mirror & Marigold', sub: 'Wedding Guest', g: ['#d8a830', '#9a7008'], to: '/shop?cat=festive', wide: false },
  { title: 'Everyday Poetry', sub: 'Kurtis & Sets', g: ['#d4a09a', '#a06058'], to: '/shop?cat=kurti', wide: true }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Lookbook</div>
      <h1>The <i>Lookbook</i></h1>
      <p>Mood, colour and craft — six stories from the new collection, styled to inspire.</p>
    </section>

    <section class="section-pad" style="padding-bottom:30px"></section>

    <div class="look-grid">
      <div v-for="l in looks" :key="l.title" class="look-tile" :class="{ wide: l.wide }"
           :style="{ background: `linear-gradient(150deg, ${l.g[0]} 0%, ${l.g[1]} 100%)` }">
        <span class="weave"></span>
        <div class="look-cap">
          <span>{{ l.sub }}</span>
          <h3>{{ l.title }}</h3>
          <NuxtLink :to="l.to">Shop the look</NuxtLink>
        </div>
      </div>
    </div>

    <NewsletterSection />
  </div>
</template>
