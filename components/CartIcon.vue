<template>
  <button
    type="button"
    class="relative p-2 rounded-full text-ink hover:bg-panel transition-colors focus-visible:outline-accent"
    aria-label="Shopping cart"
    :aria-badge="itemCount > 0 ? itemCount : null"
    @click="toggleCart"
  >
    <svg
      class="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
      />
    </svg>

    <span
      v-if="itemCount > 0"
      class="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-ground text-[10px] font-medium font-reading shadow-sm"
      aria-hidden="true"
    >
      {{ itemCount }}
    </span>
  </button>
</template>

<script setup lang="ts">
const { itemCount } = useCart()

const toggleCart = () => { /* handled by parent/emitter */ }
</script>
