<template>
  <div class="space-y-12 lg:space-y-16">
    <section class="container mx-auto px-6">
      <h1 class="font-display text-3xl lg:text-4xl tracking-tight text-ink mb-2">Your cart</h1>
      <p class="text-metadata text-ink/70">
        Review your selection before checking out.
      </p>
    </section>

    <CartDrawer :open="true" @checkout="goCheckout" @close="closeCart" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#imports'
import CartDrawer from '~/components/CartDrawer.vue'

const router = useRouter()

const goCheckout = () => {
  router.push('/checkout')
}

const closeCart = () => {
  // drawer stays open on cart page; no-op
}
</script>
