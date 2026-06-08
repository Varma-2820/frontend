<script setup lang="ts">
useHead({ title: 'Contact — Rang Mahal' })

const { toast } = useShop()
const name = ref('')
const email = ref('')
const topic = ref('Order help')
const message = ref('')
const sent = ref(false)

function send() {
  if (!name.value.trim() || !email.value.includes('@') || !message.value.trim()) {
    toast('Please fill name, email and message')
    return
  }
  sent.value = true
  toast('Message sent ✦')
}

function reset() {
  sent.value = false
  name.value = ''; email.value = ''; message.value = ''; topic.value = 'Order help'
}
</script>

<template>
  <div>
    <section class="page-hero">
      <div class="crumb"><NuxtLink to="/">Home</NuxtLink> / Contact</div>
      <h1>Say <i>Hello</i></h1>
      <p>Questions about an order, a fabric, or a custom blouse? We’d love to help.</p>
    </section>

    <section class="contact-grid">
      <div>
        <div class="info-card">
          <h4>Write to us</h4>
          <p><a href="mailto:care@rangmahal.example">care@rangmahal.example</a><br>We reply within one business day.</p>
        </div>
        <div class="info-card">
          <h4>Call / WhatsApp</h4>
          <p><a href="tel:+919000000000">+91 90000 00000</a><br>Mon–Sat · 10 am – 7 pm IST</p>
        </div>
        <div class="info-card">
          <h4>Flagship Studio</h4>
          <p>12, Weaver’s Lane, Anna Nagar<br>Chennai 600040, Tamil Nadu</p>
        </div>
        <div class="info-card">
          <h4>Help Centre</h4>
          <p>Find quick answers on <NuxtLink to="/help">sizing, shipping &amp; returns</NuxtLink>.</p>
        </div>
      </div>

      <div class="form-card">
        <template v-if="!sent">
          <h2>Send a message</h2>
          <p>Fill in the form and our care team will get back to you.</p>
          <form @submit.prevent="send">
            <div class="field"><label>Your name</label><input v-model="name" placeholder="Full name" /></div>
            <div class="field"><label>Email</label><input v-model="email" type="email" placeholder="you@example.com" /></div>
            <div class="field">
              <label>Topic</label>
              <select v-model="topic">
                <option>Order help</option>
                <option>Returns &amp; exchanges</option>
                <option>Fabric &amp; sizing</option>
                <option>Bulk / wedding orders</option>
                <option>Something else</option>
              </select>
            </div>
            <div class="field"><label>Message</label><textarea v-model="message" placeholder="How can we help?"></textarea></div>
            <button type="submit" class="btn-terra" style="width:100%">Send Message</button>
          </form>
        </template>
        <template v-else>
          <h2>Thank you, {{ name.split(' ')[0] }} ✦</h2>
          <p>Your message about “{{ topic }}” is with our care team. Expect a reply at <b>{{ email }}</b> within one business day.</p>
          <button class="btn-outline" style="width:100%" @click="reset">Send another message</button>
        </template>
      </div>
    </section>

    <NewsletterSection />
  </div>
</template>
