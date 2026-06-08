import type { Product } from '~/composables/products'

export default defineNuxtPlugin(async () => {
  const { public: { apiBase } } = useRuntimeConfig()
  const cart = useCart()
  const wishlist = useWishlist()
  const user = useUser()
  const token = useToken()
  const products = useProductsState()

  try { cart.value = JSON.parse(localStorage.getItem('rm-cart') || '{}') } catch { cart.value = {} }
  try { wishlist.value = JSON.parse(localStorage.getItem('rm-wish') || '[]') } catch { wishlist.value = [] }
  try { user.value = JSON.parse(localStorage.getItem('rm-user') || 'null') } catch { user.value = null }
  try { token.value = localStorage.getItem('rm-token') || null } catch { token.value = null }

  try {
    const data = await $fetch<Product[]>(`${apiBase}/products`)
    products.value = data
  } catch (err) {
    console.error('Failed to load products from API:', err)
  }

  if (token.value) {
    try {
      const data = await $fetch<{ id: number; name: string; email: string }>(`${apiBase}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      user.value = data

      const dbCart = await $fetch<Array<{ product_id: number; qty: number }>>(`${apiBase}/cart`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      const mergedCart: Record<string, number> = {}
      for (const item of dbCart) {
        mergedCart[item.product_id] = item.qty
      }
      cart.value = mergedCart
      localStorage.setItem('rm-cart', JSON.stringify(cart.value))

      const wishData = await $fetch<number[]>(`${apiBase}/wishlist`, {
        headers: {
          'Authorization': `Bearer ${token.value}`
        }
      })
      wishlist.value = wishData
      localStorage.setItem('rm-wish', JSON.stringify(wishlist.value))

    } catch (err) {
      console.error('Session expired, signing out.')
      token.value = null
      user.value = null
      wishlist.value = []
      cart.value = {}
      localStorage.removeItem('rm-token')
      localStorage.setItem('rm-user', 'null')
      localStorage.setItem('rm-wish', '[]')
      localStorage.setItem('rm-cart', '{}')
    }
  }
})
