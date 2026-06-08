<script setup lang="ts">
useHead({ title: 'Order History — Rang Mahal' })

const { apiFetch, user } = useShop()
const orders = ref<any[]>([])
const loading = ref(true)

async function fetchOrders() {
  if (!user.value) return
  loading.value = true
  try {
    orders.value = await apiFetch<any[]>('/orders')
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

onMounted(() => {
  fetchOrders()
})

watch(user, (u) => {
  if (u) fetchOrders()
  else orders.value = []
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Orders</div>
      <h1>Order <i>History</i></h1>
      <p>Manage and track all your purchases from Rang Mahal.</p>
    </section>

    <ClientOnly>
      <section class="shop">
        <template v-if="!user">
          <div class="empty-msg">
            <div class="big">📋</div>
            <h3>Please Sign In</h3>
            <p>You must be signed in to view your order history.</p>
            <NuxtLink to="/account" class="btn-terra">Go to Account</NuxtLink>
          </div>
        </template>
        <template v-else-if="loading">
          <div class="empty-msg">
            <p>Loading order history…</p>
          </div>
        </template>
        <template v-else-if="orders.length">
          <div class="orders-wrap">
            <div class="orders-list">
              <div v-for="order in orders" :key="order.id" class="order-card">
                <div class="order-header">
                  <div>
                    <span class="oh-label">Order ID</span>
                    <span class="oh-val">{{ order.id }}</span>
                  </div>
                  <div>
                    <span class="oh-label">Date</span>
                    <span class="oh-val">{{ formatDate(order.created_at) }}</span>
                  </div>
                  <div>
                    <span class="oh-label">Total</span>
                    <span class="oh-val">{{ fmt(order.total) }}</span>
                  </div>
                  <div>
                    <span class="oh-label">Status</span>
                    <span class="status-badge" :class="order.status">{{ order.status }}</span>
                  </div>
                </div>

                <div class="order-items">
                  <div v-for="item in order.items" :key="item.id" class="order-item">
                    <NuxtLink :to="`/product/${item.product_id}`" class="oi-thumb">
                      <span style="position:absolute;inset:0" :style="{ background: `linear-gradient(150deg, ${item.g?.[0] || '#c47060'}, ${item.g?.[1] || '#7a2818'})` }"></span>
                    </NuxtLink>
                    <div class="oi-details">
                      <NuxtLink :to="`/product/${item.product_id}`" class="oi-name">{{ item.name }}</NuxtLink>
                      <p class="oi-sub">{{ item.sub }}</p>
                      <span class="oi-qty-price">{{ item.qty }} × {{ fmt(item.price) }}</span>
                    </div>
                    <div class="oi-total-price">{{ fmt(item.price * item.qty) }}</div>
                  </div>
                </div>

                <div class="order-footer">
                  <div class="order-breakdown">
                    <div class="ob-row"><span>Subtotal</span><span>{{ fmt(order.subtotal) }}</span></div>
                    <div v-if="order.discount" class="ob-row"><span>Discount</span><span>−{{ fmt(order.discount) }}</span></div>
                    <div class="ob-row"><span>Shipping</span><span>{{ order.shipping === 0 ? 'Free' : fmt(order.shipping) }}</span></div>
                    <div class="ob-row grand-total"><span>Grand Total</span><span>{{ fmt(order.total) }}</span></div>
                  </div>
                  <div class="order-actions">
                    <NuxtLink :to="`/help?tab=track&order=${order.id}`" class="btn-outline">Track Order</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="empty-msg">
            <div class="big">📦</div>
            <h3>No orders yet</h3>
            <p>You haven’t placed any orders yet.</p>
            <NuxtLink to="/shop" class="btn-terra">Explore the Collection</NuxtLink>
          </div>
        </template>
      </section>

      <template #fallback>
        <section class="shop">
          <div class="empty-msg">
            <p>Loading order history…</p>
          </div>
        </section>
      </template>
    </ClientOnly>
  </div>
</template>
