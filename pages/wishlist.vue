<script setup lang="ts">
useHead({ title: 'Wishlist — Rang Mahal' })

const { wishlist, moveWishlistToCart, products, user } = useShop()

const items = computed(() => wishlist.value.map(id => products.value.find(p => p.id === id)!).filter(Boolean))

async function moveAllToBag() {
  await moveWishlistToCart()
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Wishlist</div>
      <h1>Your <i>Wishlist</i></h1>
      <p>Pieces you’ve saved for later — tap the heart on any product to add more.</p>
    </section>

    <ClientOnly>
      <section class="shop">
        <template v-if="!user">
          <div class="empty-msg">
            <div class="big">♡</div>
            <h3>Please Sign In</h3>
            <p>You must be signed in to view and manage your wishlist.</p>
            <NuxtLink to="/account" class="btn-terra">Go to Account</NuxtLink>
          </div>
        </template>
        <template v-else-if="items.length">
          <div class="shop-bar">
            <div class="result-count" style="margin:0">{{ items.length }} saved piece{{ items.length === 1 ? '' : 's' }}</div>
            <button class="btn-outline" @click="moveAllToBag">Move all to bag</button>
          </div>
          <div class="prod-grid">
            <ProductCard v-for="p in items" :key="p.id" :product="p" />
          </div>
        </template>
        <template v-else>
          <div class="empty-msg">
            <div class="big">♡</div>
            <h3>No saved pieces yet</h3>
            <p>Tap the heart on any product to keep it here.</p>
            <NuxtLink to="/shop" class="btn-terra">Explore the Collection</NuxtLink>
          </div>
        </template>
      </section>

      <template #fallback>
        <section class="shop"><div class="empty-msg"><p>Loading wishlist…</p></div></section>
      </template>
    </ClientOnly>
  </div>
</template>
