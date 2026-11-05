<template>
  <div class="fixed inset-0 z-[60]">
    <!-- Backdrop -->
    <div
      v-if="open"
      class="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      @click="close"
      aria-hidden="true"
    />

    <!-- Drawer panel -->
    <div
      ref="drawerRef"
      v-if="open"
      class="fixed top-0 right-0 h-full w-full lg:w-[420px] bg-ground border-l border-rule shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out translate-x-full lg:translate-x-0"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping cart"
    >
      <div class="p-6 flex items-center justify-between border-b border-rule bg-ground">
        <h2 class="font-display text-2xl tracking-tight text-ink">Your cart</h2>
        <button
          type="button"
          class="text-ink/60 hover:text-ink transition-colors focus-visible:outline-accent"
          @click="close"
          aria-label="Close cart"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="overflow-y-auto p-6 flex-grow">
        <div v-if="items.length === 0" class="text-center py-12">
          <p class="text-ink/60 text-metadata">Your cart is empty.</p>
          <NuxtLink
            to="/products"
            class="mt-4 inline-block font-reading text-accent underline underline-offset-4 hover:no-underline"
          >
            Browse the shop
          </NuxtLink>
        </div>

        <div v-else class="space-y-6">
          <div
            v-for="item in items"
            :key="item.product.id"
            class="flex gap-4 items-start"
          >
            <ArchedImage
              :src="item.product.images[0]?.url"
              :alt="item.product.images[0]?.alt || item.product.name"
              :width="item.product.images[0]?.width || 80"
              :height="item.product.images[0]?.height || 80"
              width="80"
              height="80"
              radius="round"
              aspect="1 / 1"
            />

            <div class="flex-grow min-w-0">
              <NuxtLink
                :to="`/products/${item.product.slug}`"
                class="block font-display text-lg tracking-tight text-ink no-underline line-clamp-1 hover:text-accent transition-colors"
              >
                {{ item.product.name }}
              </NuxtLink>
              <p class="text-metadata text-ink/70 mt-1">
                £{(item.product.price / 100).toFixed(2)} &times; {{ item.quantity }}
              </p>

              <div class="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  class="w-8 h-8 rounded-full border border-rule flex items-center justify-center text-ink hover:bg-panel transition-colors focus-visible:outline-accent"
                  @click="decrement(item.product.id)"
                  :aria-label="`Decrease quantity of ${item.product.name}`"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                </button>
                <span class="w-8 text-center text-metadata font-reading">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="w-8 h-8 rounded-full border border-rule flex items-center justify-center text-ink hover:bg-panel transition-colors focus-visible:outline-accent"
                  @click="increment(item.product.id)"
                  :aria-label="`Increase quantity of ${item.product.name}`"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            <button
              type="button"
              class="text-ink/40 hover:text-accent transition-colors focus-visible:outline-accent ml-4"
              @click="removeItem(item.product.id)"
              aria-label={`Remove ${item.product.name} from cart`}
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0 1 16.138 21H7.862a2 2 0 0 1-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="p-6 border-t border-rule bg-ground">
        <div class="flex items-center justify-between mb-4">
          <span class="text-ink font-reading">Total</span>
          <span class="font-display text-xl text-ink">£{{ total.toFixed(2) }}</span>
        </div>

        <button
          type="button"
          class="w-full flex items-center justify-center gap-2 rounded-full bg-ink text-ground px-8 py-3 font-display text-lg tracking-tight hover:bg-accent transition-colors focus-visible:outline-accent active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          :disabled="items.length === 0"
          @click="checkout"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 8h16M2 12h16M2 16h16" />
          </svg>
          Mock checkout &rarr;
        </button>

        <button
          type="button"
          class="w-full mt-3 flex items-center justify-center gap-2 rounded-full border border-rule bg-transparent text-ink px-8 py-3 font-reading hover:bg-panel transition-colors focus-visible:outline-accent"
          @click="clearCart"
        >
          Clear cart
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '~/types/product'
import { useCart } from '~/composables/useCart'
import ArchedImage from '~/components/ArchedImage.vue'

const props = defineProps<{ open: boolean }>()

const emit = defineEmits(['checkout', 'close'])

const { items, total, add, setQuantity, remove, clear } = useCart()

const drawerRef = ref<HTMLElement | null>(null)

function close() {
  emit('close')
}

function increment(productId: string) {
  const item = items.value.find((i) => i.product.id === productId)
  if (item) add(item.product, 1)
}

function decrement(productId: string) {
  const item = items.value.find((i) => i.product.id === productId)
  if (item) setQuantity(productId, item.quantity - 1)
}

function removeItem(productId: string) {
  remove(productId)
}

function clearCart() {
  clear()
}

function checkout() {
  emit('checkout')
}
</script>
