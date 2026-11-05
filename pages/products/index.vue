<template>
  <div class="space-y-16 lg:space-y-24">
    <section>
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <h1 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-2">
              The collection
            </h1>
            <p v-if="activeCategory" class="text-metadata text-ink/70">
              {{ activeCategory.name }}
            </p>
          </div>

          <div class="flex flex-wrap gap-2">
            <NuxtLink
              :to="{ path: '/products', query: {} }"
              :class="chipClass(null)"
              class="px-4 py-1.5 rounded-full border border-rule text-label font-reading transition-colors focus-visible:outline-accent no-underline"
            >
              All
            </NuxtLink>
            <NuxtLink
              v-for="category in categories"
              :key="category.slug"
              :to="{ path: '/products', query: { category: category.slug } }"
              :class="chipClass(category.slug)"
              class="px-4 py-1.5 rounded-full border border-rule text-label font-reading transition-colors focus-visible:outline-accent no-underline"
            >
              {{ category.name }}
            </NuxtLink>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filteredProducts.length === 0" class="text-center py-20">
          <p class="text-ink/60 text-metadata">No products found in this category.</p>
          <NuxtLink
            to="/products"
            class="mt-4 inline-block font-reading text-accent underline underline-offset-4 hover:no-underline"
          >
            Browse all products
          </NuxtLink>
        </div>

        <!-- Product grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from '#imports'
import type { Product } from '~/types/product'
import { computed } from 'vue'
import ProductCard from '~/components/ProductCard.vue'

const route = useRoute()
const { data: products } = await useFetch<Product[]>('/api/products')

const allProducts = computed(() => products.value ?? [])
const categoryParam = computed(() => route.query.category as string | undefined)

const categories = [
  { slug: 'necklaces', name: 'Necklaces' },
  { slug: 'earrings', name: 'Earrings' },
  { slug: 'rings', name: 'Rings' },
  { slug: 'brooches', name: 'Brooches' },
  { slug: 'bracelets', name: 'Bracelets' },
  { slug: 'accessories', name: 'Accessories' },
]

const activeCategory = computed(() => categories.find((c) => c.slug === categoryParam.value))

const filteredProducts = computed(() => {
  const list = allProducts.value
  if (!categoryParam.value) return list
  return list.filter((p) => p.category === categoryParam.value)
})

const chipClass = (slug: string | null) => {
  const active = slug === null ? categoryParam.value === undefined : categoryParam.value === slug
  return active ? 'bg-accent text-ground border-accent' : 'bg-ground text-ink/80 hover:bg-panel'
}
</script>
