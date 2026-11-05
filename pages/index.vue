<template>
  <div class="space-y-16 lg:space-y-24">
    <!-- Hero: large serif copy left, tall arched photograph right -->
    <section class="relative py-10 lg:py-24 overflow-hidden">
      <div class="container mx-auto px-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div class="lg:pr-10">
            <p class="text-label text-accent font-reading mb-6">Handcrafted in the garden</p>
            <h1 class="font-display text-[3rem] lg:text-[5rem] tracking-tight text-ink leading-[1.1] mb-6">
              Botanical jewellery<br />
              <span class="italic text-accent">for quiet moments.</span>
            </h1>
            <p class="text-body text-ink/80 leading-relaxed mb-8 max-w-lg">
              Each piece is shaped from recycled silver and real botanical forms &mdash;
              dogwood blossoms, fern fronds, wild thyme, ivy trails. Wear the garden.
            </p>

            <div class="flex flex-col sm:flex-row gap-4">
              <NuxtLink
                to="/products"
                class="inline-flex items-center justify-center gap-2 rounded-full bg-ink text-ground px-8 py-3 font-display text-lg tracking-tight hover:bg-accent transition-colors focus-visible:outline-accent active:scale-[0.98]"
              >
                Shop the collection &rarr;
              </NuxtLink>
              <NuxtLink
                to="/products?category=necklaces"
                class="inline-flex items-center justify-center gap-2 rounded-full border border-rule bg-transparent text-ink px-8 py-3 font-reading hover:bg-panel transition-colors focus-visible:outline-accent"
              >
                Necklaces
              </NuxtLink>
            </div>
          </div>

          <div class="relative">
            <ArchedImage
              :src="heroImage.url"
              :alt="heroImage.alt"
              :width="heroImage.width"
              :height="heroImage.height"
              radius="34px"
              aspect="3 / 4"
              preload
            />

            <!-- Small circular object overlapping near the base -->
            <div class="absolute -bottom-8 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40">
              <ArchedImage
                :src="circleImage.url"
                :alt="circleImage.alt"
                :width="circleImage.width"
                :height="circleImage.height"
                radius="round"
                aspect="1 / 1"
              />
              <svg
                class="absolute inset-0 rounded-full border border-rule/60 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sage panel: related explanations / about -->
    <section class="bg-panel rounded-panel border border-rule p-10 lg:p-16 overflow-hidden">
      <div class="container mx-auto px-6 max-w-4xl">
        <h2 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-8">About the workshop</h2>
        <p class="text-body text-ink/80 leading-relaxed mb-6">
          Nuvana is a small jewellery workshop working in recycled sterling silver,
          freshwater pearls, and gently coloured stones. Every piece begins with a
          plant &mdash; a leaf pressed into silver, a blossom traced in wire, a vine
          wrapped around a band.
        </p>
        <p class="text-body text-ink/80 leading-relaxed">
          The results are quiet, durable things for everyday wear &mdash; jewellery
          that feels as though it has always belonged to the hand that wears it.
        </p>
      </div>
    </section>

    <!-- Featured products -->
    <section>
      <div class="container mx-auto px-6">
        <div class="flex items-center justify-between mb-8">
          <h2 class="font-display text-3xl lg:text-4xl tracking-tight text-ink">Featured</h2>
          <NuxtLink
            to="/products"
            class="text-accent font-reading font-medium underline underline-offset-4 hover:no-underline"
          >
            View all &rarr;
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from '#imports'
import type { Product } from '~/types/product'
import { computed } from 'vue'
import ProductCard from '~/components/ProductCard.vue'
import ArchedImage from '~/components/ArchedImage.vue'

const { data: products } = await useFetch<Product[]>('/api/products')

const featuredProducts = computed(() => (products.value ?? []).filter((p) => p.featured))

const heroImage = {
  url: '/images/hero/necklace-hero.jpg',
  alt: 'Dogwood Blossom Necklace arched product portrait on cream background',
  width: 900,
  height: 1200,
}

const circleImage = {
  url: '/images/hero/pearl-circle.jpg',
  alt: 'Freshwater pearl circular object portrait',
  width: 400,
  height: 400,
}
</script>
