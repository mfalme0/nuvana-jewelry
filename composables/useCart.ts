import type { Product, CartItem } from '~/types/product'

const STORAGE_KEY = 'nuvana_cart'

interface CartState {
  items: CartItem[]
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

export const useCart = () => {
  const state = reactive<CartState>({
    items: loadCart(),
  })

  const save = () => saveCart(state.items)

  const add = (product: Product, quantity = 1) => {
    const existing = state.items.find((i) => i.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      state.items.push({ product, quantity })
    }
    save()
  }

  const remove = (productId: string) => {
    state.items = state.items.filter((i) => i.product.id !== productId)
    save()
  }

  const setQuantity = (productId: string, quantity: number) => {
    const item = state.items.find((i) => i.product.id === productId)
    if (!item) return
    if (quantity <= 0) {
      remove(productId)
      return
    }
    item.quantity = quantity
    save()
  }

  const clear = () => {
    state.items = []
    save()
  }

  const itemCount = computed(() => state.items.reduce((sum, i) => sum + i.quantity, 0))
  const total = computed(() =>
    state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  return {
    items: readonly(state.items),
    add,
    remove,
    setQuantity,
    clear,
    itemCount,
    total,
  }
}
