<script setup lang="ts">
const { toast } = useShop()
const email = ref('')

function subscribe() {
  const v = email.value.trim()
  if (!v || !v.includes('@')) { toast('Please enter a valid email'); return }
  toast('Welcome to the Mahal Circle ✦')
  email.value = ''
}
</script>

<template>
  <section class="newsletter">
    <h2>Join the <i>Mahal</i> Circle</h2>
    <p>Get early access to new collections, exclusive offers, and styling inspiration.</p>
    <form class="nl-form" @submit.prevent="subscribe">
      <input v-model="email" type="email" placeholder="your@email.com" />
      <button type="submit">Subscribe</button>
    </form>
  </section>
</template>
