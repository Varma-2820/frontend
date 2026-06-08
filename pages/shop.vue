<script setup lang="ts">
const { public: { apiBase } } = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const cat = computed(() => (route.query.cat as string) || 'all')
const q = computed(() => (route.query.q as string) || '')
const sortBy = ref('featured')

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'new', label: 'New In' },
  { key: 'silk', label: 'Silk Sarees' },
  { key: 'cotton', label: 'Cotton Sarees' },
  { key: 'kurti', label: 'Kurtis & Sets' },
  { key: 'lehenga', label: 'Lehenga Choli' },
  { key: 'salwar', label: 'Salwar Suits' },
  { key: 'bridal', label: 'Bridal' },
  { key: 'festive', label: 'Festive' },
  { key: 'sale', label: 'Sale' }
]

const TITLES: Record<string, string> = {
  all: 'All Pieces', new: 'New In', sarees: 'Sarees', silk: 'Silk Sarees',
  cotton: 'Cotton Sarees', kurti: 'Kurtis & Sets', lehenga: 'Lehenga Choli',
  salwar: 'Salwar Suits', bridal: 'Bridal Wear', festive: 'The Festive Edit', sale: 'On Sale'
}

const title = computed(() => q.value ? `Results for “${q.value}”` : (TITLES[cat.value] || 'All Pieces'))
useHead({ title: computed(() => `${title.value} — Rang Mahal`) })

const { data: filteredProducts } = await useFetch<any[]>(`${apiBase}/products`, {
  query: computed(() => ({
    cat: cat.value !== 'all' ? cat.value : undefined,
    q: q.value || undefined,
    sortBy: sortBy.value
  })),
  watch: [cat, q, sortBy]
})

const filtered = computed(() => filteredProducts.value || [])

function setCat(key: string) {
  router.push({ path: '/shop', query: key === 'all' ? {} : { cat: key } })
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Shop</div>
      <h1>{{ title.split(' ')[0] }} <i>{{ title.split(' ').slice(1).join(' ') }}</i></h1>
      <p>Every piece is handcrafted in small batches by our partner artisan clusters.</p>
    </section>

    <section class="shop">
      <div class="shop-bar">
        <div class="filter-pills">
          <button v-for="f in FILTERS" :key="f.key" class="pill" :class="{ active: cat === f.key && !q }" @click="setCat(f.key)">
            {{ f.label }}
          </button>
        </div>
        <div class="sort-box">
          <span>Sort</span>
          <select v-model="sortBy" class="sort">
            <option value="featured">Featured</option>
            <option value="newest">Newest first</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>
      </div>

      <div class="result-count">{{ filtered.length }} piece{{ filtered.length === 1 ? '' : 's' }}</div>

      <div v-if="filtered.length" class="prod-grid">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
      </div>
      <div v-else class="empty-msg">
        <div class="big">🌸</div>
        <h3>Nothing found</h3>
        <p>Try a different filter or search term.</p>
        <button class="btn-terra" @click="setCat('all')">View everything</button>
      </div>
    </section>
  </div>
</template>
