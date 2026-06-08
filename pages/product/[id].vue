<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const route = useRoute()
const { addToCart, toggleWish, isWished } = useShop()

const { data: product, error } = await useFetch<any>(() => `${apiBase}/products/${route.params.id}`)
if (error.value || !product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Product not found', fatal: true })
}

useHead({ title: computed(() => `${product.value?.name ?? 'Product'} — Rang Mahal`) })

const isSaree = computed(() => product.value!.cat === 'silk' || product.value!.cat === 'cotton')
const sizes = computed(() => isSaree.value ? ['Free Size · 6.3 m'] : ['XS', 'S', 'M', 'L', 'XL', 'XXL'])
const size = ref(sizes.value[0])
const qty = ref(1)

watch(() => route.params.id, () => {
  size.value = sizes.value[0]
  qty.value = 1
})

const discount = computed(() => {
  const p = product.value!
  return p.mrp ? Math.round((1 - p.price / p.mrp) * 100) : 0
})

const { data: relatedProducts } = await useFetch<any[]>(`${apiBase}/products`, {
  query: computed(() => ({
    cat: product.value?.cat
  })),
  watch: [product]
})

const related = computed(() => {
  if (!relatedProducts.value || !product.value) return []
  return relatedProducts.value.filter(p => p.id !== product.value.id).slice(0, 4)
})

function addBag() {
  addToCart(product.value!.id, qty.value)
}

function buyNow() {
  addToCart(product.value!.id, qty.value)
  navigateTo('/cart')
}
</script>

<template>
  <div v-if="product">
    <section class="pd">
      <div class="pd-gallery">
        <div class="pd-tile main">
          <span class="grad" style="position:absolute;inset:0" :style="{ background: `linear-gradient(150deg, ${product.g[0]} 0%, ${product.g[1]} 100%)` }"></span>
          <span class="weave"></span>
        </div>
        <div class="pd-tile">
          <span style="position:absolute;inset:0" :style="{ background: `linear-gradient(330deg, ${product.g[0]} 0%, ${product.g[1]} 100%)` }"></span>
          <span class="weave"></span>
        </div>
        <div class="pd-tile">
          <span style="position:absolute;inset:0" :style="{ background: `radial-gradient(circle at 30% 30%, ${product.g[0]}, ${product.g[1]})` }"></span>
          <span class="weave"></span>
        </div>
      </div>

      <div class="pd-info">
        <div class="pd-cat">
          <NuxtLink :to="`/shop?cat=${product.cat}`">{{ CAT_LABELS[product.cat] }}</NuxtLink>
        </div>
        <h1>{{ product.name }}</h1>
        <p class="pd-sub">{{ product.sub }}</p>
        <div class="pd-price">
          {{ fmt(product.price) }}<s v-if="product.mrp">{{ fmt(product.mrp) }}</s>
          <span v-if="discount" style="font-size:13px;color:var(--terracotta);margin-left:10px;font-family:'DM Sans',sans-serif">({{ discount }}% off)</span>
        </div>
        <p class="pd-tax">Inclusive of all taxes · Free shipping above ₹1,999</p>

        <div class="pd-label">{{ isSaree ? 'Size' : 'Select Size' }}</div>
        <div class="size-row">
          <button v-for="s in sizes" :key="s" class="size-btn" :class="{ sel: size === s }" @click="size = s">{{ s }}</button>
        </div>

        <div class="pd-label">Quantity</div>
        <div class="qty-row">
          <div class="qty-box">
            <button aria-label="Decrease" @click="qty = Math.max(1, qty - 1)">−</button>
            <span>{{ qty }}</span>
            <button aria-label="Increase" @click="qty = Math.min(10, qty + 1)">+</button>
          </div>
        </div>

        <div class="pd-actions">
          <button class="btn-terra" @click="addBag">Add to Bag — {{ fmt(product.price * qty) }}</button>
          <button class="btn-outline" @click="buyNow">Buy Now</button>
          <ClientOnly>
            <button class="btn-outline" @click="toggleWish(product.id)">{{ isWished(product.id) ? '♥ Saved' : '♡ Wishlist' }}</button>
          </ClientOnly>
        </div>

        <div class="pd-perks">
          <div class="perk"><b>Handwoven</b>Made in small batches by artisan clusters</div>
          <div class="perk"><b>Easy returns</b>15-day no-questions returns</div>
          <div class="perk"><b>COD available</b>Pay on delivery across India</div>
          <div class="perk"><b>Secure checkout</b>UPI · Cards · Net banking</div>
        </div>

        <div class="pd-acc">
          <details open>
            <summary>Description</summary>
            <p>{{ product.desc }}</p>
          </details>
          <details>
            <summary>Fabric &amp; Care</summary>
            <p>{{ product.fabric }}</p>
          </details>
          <details>
            <summary>Shipping &amp; Returns</summary>
            <p>Dispatched in 2–4 business days. Free shipping on orders above ₹1,999, otherwise ₹99. Easy 15-day returns — see our <NuxtLink to="/help?tab=returns" style="color:var(--terracotta)">returns policy</NuxtLink>.</p>
          </details>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="related">
      <h2>You may also <i>love</i></h2>
      <div class="prod-grid">
        <ProductCard v-for="p in related" :key="p.id" :product="p" />
      </div>
    </section>
  </div>
</template>
