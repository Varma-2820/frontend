<script setup lang="ts">
useHead({ title: 'Rang Mahal — Handwoven Sarees & Kurtis' })

const cats = [
  { clr: 'cat-clr1', badge: '142 styles', title: 'Silk Sarees', sub: 'Banarasi · Kanjivaram · Mysore', to: '/shop?cat=silk' },
  { clr: 'cat-clr2', badge: '210 styles', title: 'Kurtis & Sets', sub: 'Cotton · Linen · Rayon', to: '/shop?cat=kurti' },
  { clr: 'cat-clr3', badge: 'New ✦', title: 'Lehenga Choli', sub: 'Festive & Bridal', to: '/shop?cat=lehenga' },
  { clr: 'cat-clr4', badge: '86 styles', title: 'Cotton Sarees', sub: 'Chanderi · Linen · Tant', to: '/shop?cat=cotton' },
  { clr: 'cat-clr5', badge: 'Festive', title: 'Salwar Suits', sub: 'Straight · Phulkari · Palazzo', to: '/shop?cat=salwar' },
  { clr: 'cat-clr6', badge: 'Bridal', title: 'Bridal Wear', sub: 'Lehenga · Saree · Gown', to: '/shop?cat=bridal' }
]
</script>

<template>
  <div>
    <section class="hero">
      <div class="hero-content">
        <div class="hero-kicker">New Collection 2026</div>
        <h1 class="hero-h1">Every Thread<br>Tells a<br><i>Story</i></h1>
        <p class="hero-desc">Handwoven sarees and artisanal kurtis celebrating the soul of Indian textile heritage.</p>
        <div class="hero-btns">
          <NuxtLink to="/shop" class="btn-terra">Shop Now</NuxtLink>
          <NuxtLink to="/lookbook" class="btn-outline">View Lookbook</NuxtLink>
        </div>
        <div class="hero-pills">
          <NuxtLink class="pill" to="/shop?q=banarasi">🌸 Banarasi</NuxtLink>
          <NuxtLink class="pill" to="/shop?q=chanderi">🌿 Chanderi</NuxtLink>
          <NuxtLink class="pill" to="/shop?q=anarkali">✦ Anarkali</NuxtLink>
          <NuxtLink class="pill" to="/shop?q=block">🎨 Block Print</NuxtLink>
        </div>
      </div>
      <div class="hero-image-side">
        <div class="hero-fab-top"></div>
        <div class="hero-fab"></div>
        <div class="hero-block2"></div>
        <div class="hero-block"></div>
        <div class="hero-block3"></div>
      </div>
    </section>

    <div class="strip">Free shipping on orders above ₹1,999 &nbsp;·&nbsp; Easy 15-day returns &nbsp;·&nbsp; COD available</div>

    <section class="categories">
      <div class="cat-header">
        <h2>Shop by <i>Category</i></h2>
        <p>From daily elegance to festive grandeur — discover your perfect weave.</p>
      </div>
      <div class="cat-grid">
        <NuxtLink v-for="c in cats" :key="c.title" class="cat-card" :to="c.to">
          <div class="cat-inner" :class="c.clr"></div>
          <div class="cat-pattern"></div>
          <div class="cat-badge">{{ c.badge }}</div>
          <div class="cat-label"><h3>{{ c.title }}</h3><span>{{ c.sub }}</span></div>
        </NuxtLink>
      </div>
    </section>

    <section class="editorial">
      <div class="ed-cell ed-bg1">
        <div class="ed-num">01</div>
        <div class="ed-text">
          <h3>The Saree<br>Redefined</h3>
          <p>Contemporary drapes for the modern Indian woman.</p>
          <NuxtLink to="/shop?cat=sarees">Explore Sarees →</NuxtLink>
        </div>
      </div>
      <div class="ed-cell ed-bg2">
        <div class="ed-num">02</div>
        <div class="ed-text">
          <h3>Kurti<br>Stories</h3>
          <p>Craft-forward kurtis you'll reach for every day.</p>
          <NuxtLink to="/shop?cat=kurti">Shop Kurtis →</NuxtLink>
        </div>
      </div>
      <div class="ed-cell ed-bg3">
        <div class="ed-num">03</div>
        <div class="ed-text">
          <h3>Festive<br>Edit 2026</h3>
          <p>Dress for the moments that matter most.</p>
          <NuxtLink to="/shop?cat=festive">View Collection →</NuxtLink>
        </div>
      </div>
    </section>

    <NewsletterSection />
  </div>
</template>
