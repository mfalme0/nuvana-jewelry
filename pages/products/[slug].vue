<template>
  <div class="space-y-16 lg:space-y-24">
    <!-- Loading state -->
    <section v-if="pending" class="container mx-auto px-6 py-20 lg:py-24">
      <p class="text-metadata text-ink/60">Loading&hellip;</p>
    </section>

    <!-- Not found / error state -->
    <section
      v-else-if="!product"
      class="container mx-auto px-6 py-20 lg:py-24 text-center"
    >
      <h1 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4">
        {{ error ? 'Something went wrong' : 'Not found' }}
      </h1>
      <p class="text-metadata text-ink/70 mb-8">
        {{ error
          ? 'We could not load the product. Please try again later.'
          : 'The product you\'re looking for doesn\'t exist.' }
      </p>
      <NuxtLink
        to="/products"
        class="inline-flex items-center justify-center gap-2 rounded-full border border-rule bg-transparent text-ink px-8 py-3 font-reading hover:bg-panel transition-colors focus-visible:outline-accent"
      >
        Browse the collection
      </NuxtLink>
    </section>

    <!-- Product content -->
    <section v-else class="container mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Product gallery -->
        <div>
          <ProductGallery :images="product.images" />
        </div>

        <!-- Product details -->
        <div class="space-y-8">
          <div>
            <p class="text-label text-accent font-reading mb-2">{{ product.category }}</p>
            <h1 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-4 leading-[1.15]">
              {{ product.name }}
            </h1>
            <p class="text-ink/70 text-metadata leading-relaxed">
              {{ product.shortDescription }}
            </p>
          </div>

          <div class="pt-6 border-t border-rule">
            <p class="font-display text-2xl tracking-tight text-ink">
              £{(product.price / 100).toFixed(2)}
            </p>
          </div>

          <div class="pt-6 border-t border-rule" v-if="product.materials.length">
            <h3 class="text-label text-ink mb-3">Materials</h3>
            <ul class="flex flex-wrap gap-2 text-metadata text-ink/70">
              <li v-for="material in product.materials" :key="material" class="px-3 py-1 rounded-full bg-panel border border-rule">
                {{ material }}
              </li>
            </ul>
          </div>

          <div class="pt-6 border-t border-rule" v-if="product.care.length">
            <h3 class="text-label text-ink mb-3">Care</h3>
            <ul class="list-disc list-inside text-metadata text-ink/70 leading-relaxed space-y-1">
              <li v-for="care in product.care" :key="care">{{ care }}</li>
            </ul>
          </div>

          <div class="pt-6 border-t border-rule">
            <button
              type="button"
              :disabled="!product.inStock"
              class="w-full flex items-center justify-center gap-2 rounded-full bg-ink text-ground px-8 py-4 font-display text-lg tracking-tight hover:bg-accent transition-colors focus-visible:outline-accent active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
              @click="addToCart"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              {{ product.inStock ? 'Add to cart' : 'Sold out' }}
            </button>

            <button
              v-if="product.inStock"
              type="button"
              class="w-full mt-3 flex items-center justify-center gap-2 rounded-full border border-rule bg-transparent text-ink px-8 py-4 font-reading hover:bg-panel transition-colors focus-visible:outline-accent"
            >
              Save for later
            </button>
          </div>

          <p v-if="!product.inStock" class="text-accent font-reading font-medium text-metadata text-center">
            This piece is currently sold out. Join the workshop mailing list to hear when similar work returns.
          </p>
        </div>
      </div>

      <!-- Full description (sage panel) -->
      <section class="bg-panel rounded-panel border border-rule p-10 lg:p-16 mt-16 lg:mt-24">
        <h2 class="font-display text-2xl tracking-tight text-ink mb-6">About this piece</h2>
        <p class="text-body text-ink/80 leading-relaxed">{{ product.description }}</p>
      </section>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useFetch, useHead } from '#imports'
import type { Product } from '~/types/product'
import { computed } from 'vue'
import { useCart } from '~/composables/useCart'
import ProductGallery from '~/components/ProductGallery.vue'

const route = useRoute()
const slug = route.params.slug as string

const { data: product, pending, error } = await useFetch<Product | null>(`/api/products/${slug}`)

const { add } = useCart()

const addToCart = () => {
  if (product.value && product.value.inStock) {
    add(product.value, 1)
  }
}

// SEO: unique title & meta, Open Graph, structured data
const p = computed(() => product.value)

useHead({
  title: p.value ? `${p.value.name} &mdash; Nuvana Jewellery` : 'Product &mdash; Nuvana Jewellery',
  meta: [
    p.value && {
      name: 'description',
      content: p.value.shortDescription,
    },
    p.value && {
      property: 'og:title',
      content: p.value.name,
    },
    p.value && {
      property: 'og:description',
      content: p.value.shortDescription,
    },
    p.value && {
      property: 'og:type',
      content: 'product',
    },
    p.value && {
      property: 'product:price:amount',
      content: (p.value.price / 100).toString(),
    },
    p.value && {
      property: 'product:price:currency',
      content: p.value.currency,
    },
    p.value && p.value.images[0] && {
      property: 'og:image',
      content: p.value.images[0].url,
    },
  ].filter(Boolean),
})

// Structured data - Product schema (JSON-LD)
useHead({
  script: p.value
    ? [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: p.value.name,
            description: p.value.description,
            image: p.value.images.map((i) => i.url),
            brand: { '@type': 'Brand', name: 'Nuvana Jewellery' },
            offers: {
              '@type': 'Offer',
              url: `https://nuvana-jewellery.example.com/products/${p.value.slug}`,
              priceCurrency: p.value.currency,
              price: (p.value.price / 100).toString(),
              itemCondition: 'https://schema.org/NewCondition',
              availability: p.value.inStock
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
            },
          }),
          type: 'application/ld+json',
        },
      ]
    : [],
})
</script>
