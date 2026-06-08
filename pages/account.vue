<script setup lang="ts">
useHead({ title: 'Account — Rang Mahal' })

const { user, signIn, signUp, signOut, toast } = useShop()

const tab = ref<'in' | 'up'>('in')
const email = ref('')
const password = ref('')
const name = ref('')

async function doSignIn() {
  if (!email.value.includes('@') || !password.value) { toast('Enter a valid email and password'); return }
  await signIn(email.value, password.value)
}

async function doRegister() {
  if (!name.value.trim()) { toast('Please enter your name'); return }
  if (!email.value.includes('@') || !password.value) { toast('Enter a valid email and password'); return }
  await signUp(name.value.trim(), email.value, password.value)
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Account</div>
      <h1>My <i>Account</i></h1>
    </section>

    <ClientOnly>
      <div class="form-wrap">
        <div v-if="user" class="form-card">
          <h2>Namaste, {{ user.name }} ✦</h2>
          <p>{{ user.email }}</p>
          <div class="field">
            <label>Quick links</label>
            <div style="display:flex;flex-direction:column;gap:10px;margin-top:4px">
              <NuxtLink to="/cart" class="btn-outline" style="text-align:center">My Bag</NuxtLink>
              <NuxtLink to="/wishlist" class="btn-outline" style="text-align:center">My Wishlist</NuxtLink>
              <NuxtLink to="/help?tab=track" class="btn-outline" style="text-align:center">Track an Order</NuxtLink>
            </div>
          </div>
          <button class="btn-terra" style="width:100%" @click="signOut">Sign Out</button>
        </div>

        <div v-else class="form-card">
          <div class="auth-tabs">
            <button class="pill" :class="{ active: tab === 'in' }" @click="tab = 'in'">Sign In</button>
            <button class="pill" :class="{ active: tab === 'up' }" @click="tab = 'up'">Create Account</button>
          </div>

          <template v-if="tab === 'in'">
            <h2>Welcome back</h2>
            <p>Sign in to view your bag, wishlist and orders.</p>
            <form @submit.prevent="doSignIn">
              <div class="field"><label>Email</label><input v-model="email" type="email" placeholder="you@example.com" /></div>
              <div class="field"><label>Password</label><input v-model="password" type="password" placeholder="••••••••" /></div>
              <button type="submit" class="btn-terra" style="width:100%">Sign In</button>
            </form>
          </template>

          <template v-else>
            <h2>Join Rang Mahal</h2>
            <p>Create an account for faster checkout and order tracking.</p>
            <form @submit.prevent="doRegister">
              <div class="field"><label>Full name</label><input v-model="name" placeholder="Your name" /></div>
              <div class="field"><label>Email</label><input v-model="email" type="email" placeholder="you@example.com" /></div>
              <div class="field"><label>Password</label><input v-model="password" type="password" placeholder="Create a password" /></div>
              <button type="submit" class="btn-terra" style="width:100%">Create Account</button>
            </form>
          </template>

          <p class="form-note">This is a demo store — details are secured on your database.</p>
        </div>
      </div>

      <template #fallback>
        <div class="form-wrap"><div class="form-card"><p>Loading…</p></div></div>
      </template>
    </ClientOnly>
  </div>
</template>
