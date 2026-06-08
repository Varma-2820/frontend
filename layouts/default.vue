<script setup lang="ts">
const { cartCount, toastMsg, wishlist, user } = useShop()
const searchOpen = useSearchOpen()
const menuOpen = ref(false)
const route = useRoute()
watch(() => route.fullPath, () => { menuOpen.value = false; searchOpen.value = false })
</script>

<template>
  <div>
    <nav>
      <NuxtLink to="/" class="logo">Rang Mahal</NuxtLink>
      <div class="nav-links" :class="{ open: menuOpen }">
        <NuxtLink to="/shop?cat=new">New In</NuxtLink>
        <NuxtLink to="/shop?cat=sarees">Sarees</NuxtLink>
        <NuxtLink to="/shop?cat=kurti">Kurtis &amp; Sets</NuxtLink>
        <NuxtLink to="/shop?cat=festive">Festive</NuxtLink>
        <NuxtLink to="/shop?cat=bridal">Bridal</NuxtLink>
        <NuxtLink to="/shop?cat=sale">Sale</NuxtLink>
        <NuxtLink to="/lookbook">Lookbook</NuxtLink>
      </div>
      <div class="nav-actions">
        <button class="icon-btn" aria-label="Search" @click="searchOpen = true">🔍</button>
        <NuxtLink to="/wishlist" aria-label="Wishlist">♡<ClientOnly><span class="wish-count" :class="{ on: user && wishlist.length > 0 }">{{ user ? wishlist.length : 0 }}</span></ClientOnly></NuxtLink>
        <NuxtLink to="/account" aria-label="Account">👤</NuxtLink>
        <NuxtLink to="/orders" class="btn-nav-outline">Orders</NuxtLink>
        <NuxtLink to="/cart" class="btn-nav">Bag (<ClientOnly fallback="0">{{ cartCount }}</ClientOnly>)</NuxtLink>
        <button class="burger" aria-label="Menu" @click="menuOpen = !menuOpen">☰</button>
      </div>
    </nav>

    <slot />

    <footer>
      <div class="fb">
        <NuxtLink to="/" class="logo">Rang Mahal</NuxtLink>
        <p>Celebrating the artistry of Indian weavers and block printers — one beautiful garment at a time.</p>
      </div>
      <div class="fc">
        <h4>Shop</h4>
        <NuxtLink to="/shop?cat=sarees">Sarees</NuxtLink>
        <NuxtLink to="/shop?cat=kurti">Kurtis</NuxtLink>
        <NuxtLink to="/shop?cat=lehenga">Lehengas</NuxtLink>
        <NuxtLink to="/shop?cat=sale">Sale</NuxtLink>
      </div>
      <div class="fc">
        <h4>Help</h4>
        <NuxtLink to="/help?tab=size">Size Guide</NuxtLink>
        <NuxtLink to="/help?tab=shipping">Shipping</NuxtLink>
        <NuxtLink to="/help?tab=returns">Returns</NuxtLink>
        <NuxtLink to="/help?tab=track">Track Order</NuxtLink>
      </div>
      <div class="fc">
        <h4>About</h4>
        <NuxtLink to="/about">Our Story</NuxtLink>
        <NuxtLink to="/about#artisans">Artisans</NuxtLink>
        <NuxtLink to="/lookbook">Lookbook</NuxtLink>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </div>
      <div class="foot-bottom">
        <span>© 2026 Rang Mahal · Crafted in India</span>
        <span>Free shipping above ₹1,999 · COD available</span>
      </div>
    </footer>

    <SearchOverlay />
    <div class="toast" :class="{ show: !!toastMsg }">{{ toastMsg }}</div>
  </div>
</template>
