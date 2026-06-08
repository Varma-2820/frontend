<script setup lang="ts">
import type { Product } from '~/composables/products'

const props = defineProps<{ product: Product }>()
const { addToCart, toggleWish, isWished } = useShop()

const badge = computed(() => {
  if (props.product.tags.includes('sale')) return 'Sale'
  if (props.product.tags.includes('new')) return 'New In'
  if (props.product.tags.includes('festive')) return 'Festive'
  return ''
})
</script>

<template>
  <div class="prod-card">
    <NuxtLink :to="`/product/${product.id}`" class="prod-img" :aria-label="product.name">
      <span class="grad" :style="{ background: `linear-gradient(150deg, ${product.g[0]} 0%, ${product.g[1]} 100%)` }"></span>
      <span class="weave"></span>
      <span v-if="badge" class="prod-badge">{{ badge }}</span>
    </NuxtLink>
    <ClientOnly>
      <button class="wish-btn" :aria-label="isWished(product.id) ? 'Remove from wishlist' : 'Add to wishlist'" @click="toggleWish(product.id)">
        {{ isWished(product.id) ? '♥' : '♡' }}
      </button>
    </ClientOnly>
    <div class="prod-info">
      <NuxtLink class="prod-name" :to="`/product/${product.id}`">{{ product.name }}</NuxtLink>
      <div class="prod-sub">{{ product.sub }}</div>
      <div class="prod-foot">
        <div class="prod-price">{{ fmt(product.price) }}<s v-if="product.mrp">{{ fmt(product.mrp) }}</s></div>
        <button class="add-btn" @click="addToCart(product.id)">Add +</button>
      </div>
    </div>
  </div>
</template>
