<script setup lang="ts">
useHead({ title: 'Your Bag — Rang Mahal' })

const { cartItems, subtotal, setQty, removeFromCart, clearCart, toast, apiFetch, user } = useShop()

const promo = ref('')
const promoApplied = ref(false)
const discount = computed(() => promoApplied.value ? Math.round(subtotal.value * 0.1) : 0)
const shipping = computed(() => subtotal.value === 0 ? 0 : (subtotal.value >= 1999 ? 0 : 99))
const total = computed(() => subtotal.value - discount.value + shipping.value)

const placed = ref(false)
const orderId = ref('')
const orderTotal = ref(0)

function applyPromo() {
  if (promo.value.trim().toUpperCase() === 'MAHAL10') {
    promoApplied.value = true
    toast('Code applied — 10% off ✦')
  } else {
    promoApplied.value = false
    toast('Invalid code — try MAHAL10')
  }
}

async function checkout() {
  if (!user.value) {
    toast('Please sign in to place an order 👤')
    navigateTo('/account')
    return
  }

  try {
    const res = await apiFetch<{ id: string; total: number }>('/orders', {
      method: 'POST',
      body: {
        email: user.value.email,
        items: cartItems.value.map(i => ({ productId: i.product.id, qty: i.qty })),
        promoCode: promoApplied.value ? 'MAHAL10' : null
      }
    })

    orderId.value = res.id
    orderTotal.value = res.total
    placed.value = true
    clearCart()
    promoApplied.value = false
    promo.value = ''
    if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (err: any) {
    const msg = err.data?.error || 'Failed to place order'
    toast(msg)
  }
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Bag</div>
      <h1>Your <i>Bag</i></h1>
    </section>

    <ClientOnly>
      <section v-if="placed" class="shop">
        <div class="empty-msg">
          <div class="big">🎉</div>
          <h3>Order placed!</h3>
          <p>Thank you for shopping with Rang Mahal.<br>
            Order <b style="color:var(--terracotta)">{{ orderId }}</b> · {{ fmt(orderTotal) }} — confirmation will reach your email shortly.</p>
          <p style="margin-top:-10px">Track it anytime with your order ID.</p>
          <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
            <NuxtLink :to="`/help?tab=track&order=${orderId}`" class="btn-outline">Track Order</NuxtLink>
            <NuxtLink to="/shop" class="btn-terra">Continue Shopping</NuxtLink>
          </div>
        </div>
      </section>

      <section v-else-if="cartItems.length === 0" class="shop">
        <div class="empty-msg">
          <div class="big">🛍️</div>
          <h3>Your bag is empty</h3>
          <p>Beautiful weaves are waiting for you.</p>
          <NuxtLink to="/shop" class="btn-terra">Start Shopping</NuxtLink>
        </div>
      </section>

      <section v-else class="cart-wrap">
        <div class="cart-items">
          <h2>{{ cartItems.length }} item{{ cartItems.length === 1 ? '' : 's' }}</h2>
          <div v-for="item in cartItems" :key="item.product.id" class="cart-item">
            <NuxtLink :to="`/product/${item.product.id}`" class="ci-img">
              <span style="position:absolute;inset:0" :style="{ background: `linear-gradient(150deg, ${item.product.g[0]}, ${item.product.g[1]})` }"></span>
            </NuxtLink>
            <div>
              <NuxtLink class="ci-name" :to="`/product/${item.product.id}`">{{ item.product.name }}</NuxtLink>
              <div class="ci-sub">{{ item.product.sub }} · {{ fmt(item.product.price) }} each</div>
              <div class="ci-qty">
                <div class="qty-box">
                  <button aria-label="Decrease" @click="setQty(item.product.id, item.qty - 1)">−</button>
                  <span>{{ item.qty }}</span>
                  <button aria-label="Increase" @click="setQty(item.product.id, item.qty + 1)">+</button>
                </div>
                <button class="ci-remove" @click="removeFromCart(item.product.id)">Remove</button>
              </div>
            </div>
            <div class="ci-price">{{ fmt(item.product.price * item.qty) }}</div>
          </div>
        </div>

        <aside class="summary">
          <h3>Order Summary</h3>
          <div class="sum-row"><span>Subtotal</span><span>{{ fmt(subtotal) }}</span></div>
          <div v-if="discount" class="sum-row"><span>Promo (MAHAL10)</span><span>−{{ fmt(discount) }}</span></div>
          <div class="sum-row"><span>Shipping</span><span>{{ shipping === 0 ? 'Free' : fmt(shipping) }}</span></div>
          <div class="sum-row total"><span>Total</span><span>{{ fmt(total) }}</span></div>

          <div class="track-form" style="margin:18px 0 6px">
            <input v-model="promo" placeholder="Promo code — try MAHAL10" @keyup.enter="applyPromo" />
            <button class="btn-outline" @click="applyPromo">Apply</button>
          </div>

          <p class="sum-note">{{ subtotal >= 1999 ? '✓ You’ve unlocked free shipping.' : `Add ${fmt(1999 - subtotal)} more for free shipping.` }}<br>COD, UPI, cards &amp; net banking accepted.</p>
          <button class="btn-terra" @click="checkout">Place Order →</button>
        </aside>
      </section>

      <template #fallback>
        <section class="shop"><div class="empty-msg"><p>Loading your bag…</p></div></section>
      </template>
    </ClientOnly>
  </div>
</template>
