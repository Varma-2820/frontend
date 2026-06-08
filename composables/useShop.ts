import type { Product } from './products'

export const useCart = () => useState<Record<string, number>>('cart', () => ({}))
export const useWishlist = () => useState<number[]>('wishlist', () => [])
export const useUser = () => useState<{ name: string; email: string } | null>('user', () => null)
export const useToken = () => useState<string | null>('token', () => null)
export const useProductsState = () => useState<Product[]>('products', () => [])
export const useToastMsg = () => useState<string>('toastMsg', () => '')
export const useSearchOpen = () => useState<boolean>('searchOpen', () => false)

let toastTimer: ReturnType<typeof setTimeout> | null = null

export function useShop() {
  const { public: { apiBase } } = useRuntimeConfig()
  const cart = useCart()
  const wishlist = useWishlist()
  const user = useUser()
  const token = useToken()
  const products = useProductsState()
  const toastMsg = useToastMsg()

  const persist = () => {
    if (import.meta.client) {
      localStorage.setItem('rm-cart', JSON.stringify(cart.value))
      localStorage.setItem('rm-wish', JSON.stringify(wishlist.value))
      localStorage.setItem('rm-user', JSON.stringify(user.value))
      if (token.value) {
        localStorage.setItem('rm-token', token.value)
      } else {
        localStorage.removeItem('rm-token')
      }
    }
  }

  const toast = (msg: string) => {
    toastMsg.value = msg
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(() => { toastMsg.value = '' }, 2200)
  }

  const apiFetch = async <T>(path: string, options: any = {}): Promise<T> => {
    const headers = { ...options.headers }
    if (token.value) {
      headers['Authorization'] = `Bearer ${token.value}`
    }
    return $fetch<T>(`${apiBase}${path}`, {
      ...options,
      headers
    })
  }

  const addToCart = async (id: number, qty = 1) => {
    const newQty = (cart.value[id] || 0) + qty
    cart.value = { ...cart.value, [id]: newQty }
    persist()
    toast('Added to your bag ✦')

    if (token.value) {
      try {
        await apiFetch('/cart/update', {
          method: 'POST',
          body: { productId: id, qty: newQty }
        })
      } catch (err) {
        console.error('Failed to update cart on backend:', err)
      }
    }
  }

  const setQty = async (id: number, qty: number) => {
    const c = { ...cart.value }
    if (qty <= 0) delete c[id]
    else c[id] = qty
    cart.value = c
    persist()

    if (token.value) {
      try {
        await apiFetch('/cart/update', {
          method: 'POST',
          body: { productId: id, qty }
        })
      } catch (err) {
        console.error('Failed to update cart on backend:', err)
      }
    }
  }

  const removeFromCart = async (id: number) => {
    const c = { ...cart.value }
    delete c[id]
    cart.value = c
    persist()
    toast('Removed from bag')

    if (token.value) {
      try {
        await apiFetch('/cart/update', {
          method: 'POST',
          body: { productId: id, qty: 0 }
        })
      } catch (err) {
        console.error('Failed to remove cart item on backend:', err)
      }
    }
  }

  const clearCart = async () => {
    cart.value = {}
    persist()

    if (token.value) {
      try {
        await apiFetch('/cart/sync', {
          method: 'POST',
          body: { items: [] }
        })
      } catch (err) {
        console.error('Failed to clear cart on backend:', err)
      }
    }
  }

  const cartCount = computed(() => Object.values(cart.value).reduce((a, b) => a + b, 0))

  const cartItems = computed(() =>
    Object.entries(cart.value)
      .map(([id, qty]) => ({ product: products.value.find(p => p.id === Number(id))!, qty }))
      .filter(i => i.product)
  )

  const subtotal = computed(() => cartItems.value.reduce((s, i) => s + i.product.price * i.qty, 0))

  const isWished = (id: number) => wishlist.value.includes(id)

  const toggleWish = async (id: number) => {
    if (!token.value) {
      toast('Please sign in to save items to your wishlist ✦')
      return
    }
    if (isWished(id)) {
      wishlist.value = wishlist.value.filter(x => x !== id)
      toast('Removed from wishlist')
    } else {
      wishlist.value = [...wishlist.value, id]
      toast('Saved to wishlist ♥')
    }
    persist()

    try {
      await apiFetch('/wishlist/toggle', {
        method: 'POST',
        body: { productId: id }
      })
    } catch (err) {
      console.error('Failed to sync wishlist on backend:', err)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const data = await apiFetch<{ token: string; user: { name: string; email: string } }>('/auth/login', {
        method: 'POST',
        body: { email, password }
      })
      token.value = data.token
      user.value = data.user
      persist()
      toast(`Welcome back, ${data.user.name} ✦`)

      const currentCartItems = Object.entries(cart.value).map(([id, qty]) => ({
        productId: Number(id),
        qty
      }))
      const syncedCart = await apiFetch<Array<{ product_id: number; qty: number }>>('/cart/sync', {
        method: 'POST',
        body: { items: currentCartItems }
      })
      const mergedCart: Record<string, number> = {}
      for (const item of syncedCart) {
        mergedCart[item.product_id] = item.qty
      }
      cart.value = mergedCart

      const wishData = await apiFetch<number[]>('/wishlist')
      wishlist.value = wishData

      persist()
      return true
    } catch (err: any) {
      const msg = err.data?.error || 'Authentication failed'
      toast(msg)
      return false
    }
  }

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const data = await apiFetch<{ token: string; user: { name: string; email: string } }>('/auth/register', {
        method: 'POST',
        body: { name, email, password }
      })
      token.value = data.token
      user.value = data.user
      persist()
      toast(`Welcome, ${data.user.name} ✦`)

      const currentCartItems = Object.entries(cart.value).map(([id, qty]) => ({
        productId: Number(id),
        qty
      }))
      const syncedCart = await apiFetch<Array<{ product_id: number; qty: number }>>('/cart/sync', {
        method: 'POST',
        body: { items: currentCartItems }
      })
      const mergedCart: Record<string, number> = {}
      for (const item of syncedCart) {
        mergedCart[item.product_id] = item.qty
      }
      cart.value = mergedCart

      wishlist.value = []
      persist()
      return true
    } catch (err: any) {
      const msg = err.data?.error || 'Registration failed'
      toast(msg)
      return false
    }
  }

  const signOut = () => {
    user.value = null
    token.value = null
    wishlist.value = []
    cart.value = {}
    persist()
    toast('Signed out')
  }

  const moveWishlistToCart = async () => {
    if (wishlist.value.length === 0) return
    const itemsCount = wishlist.value.length

    const updatedCart = { ...cart.value }
    for (const id of wishlist.value) {
      updatedCart[id] = (updatedCart[id] || 0) + 1
    }
    cart.value = updatedCart

    wishlist.value = []
    persist()

    toast(`${itemsCount} item${itemsCount === 1 ? '' : 's'} moved to bag ✦`)

    if (token.value) {
      try {
        const currentCartItems = Object.entries(cart.value).map(([id, qty]) => ({
          productId: Number(id),
          qty
        }))
        await apiFetch('/cart/sync', {
          method: 'POST',
          body: { items: currentCartItems }
        })

        await apiFetch('/wishlist', {
          method: 'DELETE'
        })
      } catch (err) {
        console.error('Failed to sync moveWishlistToCart on backend:', err)
      }
    }
  }

  return {
    cart, wishlist, user, token, products, toastMsg,
    addToCart, setQty, removeFromCart, clearCart,
    cartCount, cartItems, subtotal,
    isWished, toggleWish, toast, signIn, signUp, signOut, moveWishlistToCart, apiFetch
  }
}
