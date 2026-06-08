<script setup lang="ts">
useHead({ title: 'Our Story — Rang Mahal' })

const artisans = [
  { name: 'Meenakshi Amma', craft: 'Kanjivaram Weaving · Kanchipuram', g: ['#c47060', '#7a2818'], bio: 'A third-generation weaver whose temple borders take up to forty days on the loom.' },
  { name: 'Abdul Rahman', craft: 'Banarasi Brocade · Varanasi', g: ['#4a5a9a', '#1a2050'], bio: 'Keeper of his family’s 150-year-old kadwa weaving tradition in the lanes of Banaras.' },
  { name: 'Lakshmi Devi', craft: 'Block Printing · Bagru', g: ['#d08860', '#904820'], bio: 'Carves and prints with natural dyes — indigo, madder and pomegranate rind.' },
  { name: 'Radha Ben', craft: 'Mirror Embroidery · Kutch', g: ['#8fa888', '#48683e'], bio: 'Hand-sets thousands of tiny mirrors that make every lehenga catch the light.' },
  { name: 'Salim Bhai', craft: 'Zardozi · Lucknow', g: ['#b01820', '#600008'], bio: 'Gold-thread embroidery fit for bridal trousseaus, stitched one motif at a time.' },
  { name: 'Kavitha', craft: 'Chikankari · Lucknow', g: ['#b8cce0', '#7890b0'], bio: 'Shadow-work florals so fine they seem to float over the fabric.' }
]
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Our Story</div>
      <h1>Woven with <i>Love</i></h1>
      <p>Rang Mahal began with one question — what if heritage craft had a modern home?</p>
    </section>

    <section class="story">
      <div class="story-visual">
        <div class="blockA"></div>
        <div class="blockB"></div>
        <div class="blockC"></div>
      </div>
      <div class="story-text">
        <div class="hero-kicker">Since 2018</div>
        <h2>From loom<br>to <i>wardrobe</i></h2>
        <p>We work directly with weaver families and craft clusters across fourteen states — no middlemen, no mass production. Every saree, kurti and lehenga in our collection is made in small batches, the way it has been for generations.</p>
        <p>Fair wages, honest sourcing and a deep respect for the hands behind the handloom: that is the whole business model. When you wear Rang Mahal, you carry a story that began on a loom months before it reached you.</p>
        <NuxtLink to="/shop" class="btn-terra" style="margin-top:10px">Shop the Collection</NuxtLink>
      </div>
    </section>

    <section class="stats-row">
      <div class="stat"><b>120+</b><span>Artisan Families</span></div>
      <div class="stat"><b>28</b><span>Craft Clusters</span></div>
      <div class="stat"><b>14</b><span>States of India</span></div>
      <div class="stat"><b>100%</b><span>Handcrafted</span></div>
    </section>

    <section id="artisans" class="section-pad">
      <div class="cat-header" style="margin-bottom:44px">
        <h2>The <i>Hands</i> Behind the Craft</h2>
        <p>Meet a few of the master artisans whose work fills our shelves.</p>
      </div>
    </section>
    <div class="artisan-grid">
      <div v-for="a in artisans" :key="a.name" class="artisan-card">
        <div class="ava"><span style="position:absolute;inset:0" :style="{ background: `linear-gradient(150deg, ${a.g[0]}, ${a.g[1]})` }"></span></div>
        <h4>{{ a.name }}</h4>
        <div class="craft">{{ a.craft }}</div>
        <p>{{ a.bio }}</p>
      </div>
    </div>

    <NewsletterSection />
  </div>
</template>
