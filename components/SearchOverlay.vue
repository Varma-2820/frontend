<script setup lang="ts">
const searchOpen = useSearchOpen()
const q = ref('')
const inputEl = ref<HTMLInputElement | null>(null)

watch(searchOpen, async (open) => {
  if (open) {
    q.value = ''
    await nextTick()
    inputEl.value?.focus()
  }
})

const products = useProductsState()

const results = computed(() => {
  const s = q.value.trim().toLowerCase()
  if (!s) return []
  return products.value.filter(p =>
    (p.name + ' ' + p.sub + ' ' + CAT_LABELS[p.cat]).toLowerCase().includes(s)
  ).slice(0, 8)
})
</script>

<template>
  <div class="search-overlay" :class="{ open: searchOpen }" @click.self="searchOpen = false">
    <div class="search-box">
      <div class="search-head">
        <input ref="inputEl" v-model="q" placeholder="Search sarees, kurtis, lehengas…" @keydown.esc="searchOpen = false" />
        <button class="search-close" aria-label="Close search" @click="searchOpen = false">✕</button>
      </div>
      <div class="search-results">
        <template v-if="q.trim()">
          <NuxtLink v-for="p in results" :key="p.id" class="sr-item" :to="`/product/${p.id}`">
            <span class="sr-thumb" :style="{ background: `linear-gradient(150deg, ${p.g[0]}, ${p.g[1]})` }"></span>
            <span><b>{{ p.name }}</b><span>{{ CAT_LABELS[p.cat] }}</span></span>
            <span class="sr-price">{{ fmt(p.price) }}</span>
          </NuxtLink>
          <div v-if="!results.length" class="sr-none">No matches for “{{ q }}” — try “saree”, “kurti” or “lehenga”.</div>
        </template>
        <div v-else class="sr-none">Start typing to search the collection.</div>
      </div>
    </div>
  </div>
</template>
