<template>
  <article class="group rounded-panel border border-rule bg-panel overflow-hidden flex flex-col">
    <div class="relative h-72 lg:h-96">
      <ArchedImage
        :src="product.image.url"
        :alt="product.image.alt"
        :width="product.image.width"
        :height="product.image.height"
        lazy
        preload
      />

      <span
        v-if="!product.inStock"
        class="absolute inset-0 bg-ink/80 flex items-center justify-center text-ground font-display text-lg"
      >
        Sold out
      </span>

      <button
        v-if="product.inStock"
        type="button"
        class="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-full bg-accent text-ground px-6 py-2 font-reading font-medium transition-colors hover:bg-ink hover:text-ground focus-visible:outline-accent active:scale-95"
        @click="addToCart"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        Add
      </button>
    </div>

    <div class="p-6 flex flex-col flex-grow">
      <NuxtLink
        :to="`/products/${product.slug}`"
        class="font-display text-2xl tracking-tight text-ink no-underline line-clamp-1 hover:text-accent transition-colors"
      >
        {{ product.name }}
      </NuxtLink>

      <p class="text-metadata text-ink/70 mt-1 line-clamp-2">
        {{ product.shortDescription }}
      </p>

      <div class="mt-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pt-4 border-t border-rule">
        <span class="font-display text-xl text-ink">
          £{(product.price / 100).toFixed(2)}
        </span>

        <span
          v-if="!product.inStock"
          class="text-accent font-reading font-medium label"
        >
          Unavailable
        </span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/product'
import ArchedImage from '~/components/ArchedImage.vue'
import { useCart } from '~/composables/useCart'

const props = defineProps<{ product: Product }>()

const { add } = useCart()

const addToCart = () => {
  add(props.product, 1)
}
</script>
