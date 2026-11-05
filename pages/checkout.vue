<template>
  <section class="container mx-auto px-6 py-10 lg:py-20">
    <div class="max-w-2xl">
      <h1 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-6">Checkout</h1>

      <div class="bg-panel rounded-panel border border-rule p-8 lg:p-12">
        <div class="mb-8">
          <h2 class="font-display text-xl tracking-tight text-ink mb-4">Order summary</h2>
          <div v-if="cartItems.length === 0" class="text-metadata text-ink/70">
            Your cart is empty.
          </div>
          <div v-else class="space-y-4">
            <div
              v-for="item in cartItems"
              :key="item.product.id"
              class="flex justify-between items-start"
            >
              <div>
                <p class="font-reading text-ink">{{ item.product.name }}</p>
                <p class="text-metadata text-ink/60">
                  &times; {{ item.quantity }}
                </p>
              </div>
              <p class="font-reading text-ink">
                £{{ (item.product.price * item.quantity / 100).toFixed(2) }}
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-rule pt-6">
          <div class="flex justify-between mb-2">
            <span class="text-metadata text-ink/70">Total</span>
            <span class="font-display text-lg text-ink">
              £{{ cartTotal.toFixed(2) }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-10 bg-warm-field rounded-panel border border-rule p-8 lg:p-12 text-center">
        <h2 class="font-display text-2xl tracking-tight text-ink mb-4">Thank you</h2>
        <p class="text-body text-ink/80 leading-relaxed mb-6">
          This is a mock checkout. No payment is processed &mdash; your order has been
          recorded for demonstration purposes.
        </p>

        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ground px-8 py-3 font-display text-lg tracking-tight hover:bg-accent transition-colors focus-visible:outline-accent"
          @click="continueShopping"
        >
          Continue shopping &rarr;
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'
import { useCart } from '~/composables/useCart'
import { computed } from 'vue'

const router = useRouter()
const { items, total, clear } = useCart()

const cartItems = computed(() => items.value)
const cartTotal = computed(() => total.value)

const continueShopping = () => {
  clear()
  router.push('/products')
}
</script>
