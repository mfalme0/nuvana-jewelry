<template>
  <div class="min-h-screen bg-ground text-ink font-reading">
    <header class="sticky top-0 z-50 bg-ground/80 backdrop-blur border-b border-rule">
      <nav class="container mx-auto px-6 py-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <NuxtLink
          to="/"
          class="flex items-center gap-2 font-display text-2xl tracking-tight text-ink no-underline"
          aria-label="Nuvana Jewellery home"
        >
          <span class="font-display font-medium text-ink">Nuvana</span>
          <span class="text-accent font-reading text-sm label">Jewellery</span>
        </NuxtLink>

        <div class="flex w-full lg:w-auto items-center justify-between gap-4 mt-4 lg:mt-0">
          <div class="hidden lg:flex gap-6 text-label font-reading uppercase tracking-widest">
            <NuxtLink to="/products" class="text-ink/80 hover:text-accent transition-colors no-underline">Shop</NuxtLink>
            <NuxtLink to="/cart" class="text-ink/80 hover:text-accent transition-colors no-underline">Cart</NuxtLink>
          </div>

          <CartIcon />
        </div>
      </nav>
    </header>

    <main class="container mx-auto px-6 py-10 lg:py-16">
      <slot />
    </main>

    <footer class="border-t border-rule bg-ground mt-auto py-12 lg:py-20">
      <div class="container mx-auto px-6">
        <p class="text-center text-ink/60 text-metadata">
          Nuvana Jewellery &mdash; handcrafted botanical jewellery. &copy; {{
            new Date().getFullYear()
          }}
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import CartIcon from '~/components/CartIcon.vue'
</script>

<style scoped>
</style>
