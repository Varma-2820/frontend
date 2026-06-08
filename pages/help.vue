<script setup lang="ts">
useHead({ title: 'Help Centre — Rang Mahal' })

const route = useRoute()
const TABS = [
  { key: 'size', label: 'Size Guide' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'returns', label: 'Returns' },
  { key: 'track', label: 'Track Order' }
]

const tab = ref(TABS.some(t => t.key === route.query.tab) ? (route.query.tab as string) : 'size')
watch(() => route.query.tab, (v) => { if (TABS.some(t => t.key === v)) tab.value = v as string })

const orderId = ref((route.query.order as string) || '')
const trackedOrder = ref<any>(null)
const { toast } = useShop()

async function track() {
  if (!orderId.value.trim()) { toast('Enter your order ID'); return }
  try {
    const res = await $fetch<any>(`http://localhost:3001/api/orders/${orderId.value.trim().toUpperCase()}`)
    trackedOrder.value = res
  } catch (err: any) {
    trackedOrder.value = null
    toast(err.data?.error || 'Order not found')
  }
}

onMounted(() => {
  if (orderId.value) {
    track()
  }
})
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Help Centre</div>
      <h1>How can we <i>help?</i></h1>
      <p>Sizing, shipping, returns and order tracking — all in one place.</p>
    </section>

    <div class="help-wrap">
      <div class="tabs">
        <button v-for="t in TABS" :key="t.key" class="pill" :class="{ active: tab === t.key }" @click="tab = t.key">
          {{ t.label }}
        </button>
      </div>

      <div class="tab-panel" :class="{ show: tab === 'size' }">
        <h3>Kurti &amp; Suit Sizing (inches)</h3>
        <table class="size-table">
          <thead><tr><th>Size</th><th>Bust</th><th>Waist</th><th>Hip</th></tr></thead>
          <tbody>
            <tr><td>XS</td><td>34</td><td>28</td><td>37</td></tr>
            <tr><td>S</td><td>36</td><td>30</td><td>39</td></tr>
            <tr><td>M</td><td>38</td><td>32</td><td>41</td></tr>
            <tr><td>L</td><td>40</td><td>34</td><td>43</td></tr>
            <tr><td>XL</td><td>42</td><td>36</td><td>45</td></tr>
            <tr><td>XXL</td><td>44</td><td>38</td><td>47</td></tr>
          </tbody>
        </table>
        <p>Sarees are free size (6.3 m including blouse piece). Lehengas include adjustable waist drawstrings; for bridal pieces we offer made-to-measure — <NuxtLink to="/contact" style="color:var(--terracotta)">contact us</NuxtLink>.</p>
      </div>

      <div class="tab-panel" :class="{ show: tab === 'shipping' }">
        <h3>Shipping</h3>
        <ul>
          <li>Free shipping on all orders above ₹1,999. Below that, a flat ₹99 applies.</li>
          <li>Orders are dispatched in 2–4 business days; handwoven made-to-order pieces can take 7–10 days.</li>
          <li>Delivery across India in 3–7 days after dispatch. Cash on delivery available.</li>
          <li>You’ll receive tracking details by email and SMS the moment your order ships.</li>
        </ul>
      </div>

      <div class="tab-panel" :class="{ show: tab === 'returns' }">
        <h3>Returns &amp; Exchanges</h3>
        <ul>
          <li>Easy 15-day returns from the date of delivery — no questions asked.</li>
          <li>Items must be unused, unwashed, with original tags and fall pico (for sarees) intact.</li>
          <li>Bridal and made-to-measure pieces are exchange-only.</li>
          <li>Refunds are processed to the original payment method within 5–7 business days of pickup.</li>
        </ul>
        <p>To start a return, <NuxtLink to="/contact" style="color:var(--terracotta)">message our care team</NuxtLink> with your order ID.</p>
      </div>

      <div class="tab-panel" :class="{ show: tab === 'track' }">
        <h3>Track your order</h3>
        <p>Enter the order ID from your confirmation (e.g. RM-A1B2C3).</p>
        <div class="track-form">
          <input v-model="orderId" placeholder="Order ID" @keyup.enter="track" />
          <button class="btn-terra" @click="track">Track</button>
        </div>
        <div class="track-result" :class="{ show: !!trackedOrder }">
          <template v-if="trackedOrder">
            <b style="color:var(--text)">Order {{ trackedOrder.id }}</b> · {{ trackedOrder.email }}<br>
            Total: <b>₹{{ trackedOrder.total.toLocaleString('en-IN') }}</b><br>
            Status: <span style="text-transform: capitalize; color: var(--terracotta); font-weight: 500">{{ trackedOrder.status }}</span><br>
            <div style="margin-top: 12px; border-top: 1px solid var(--sand); padding-top: 12px">
              <div v-for="item in trackedOrder.items" :key="item.id" style="display:flex; justify-content: space-between; font-size:12.5px; margin-bottom: 6px">
                <span>{{ item.name }} (x{{ item.qty }})</span>
                <span>₹{{ (item.price * item.qty).toLocaleString('en-IN') }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>

    <NewsletterSection />
  </div>
</template>
