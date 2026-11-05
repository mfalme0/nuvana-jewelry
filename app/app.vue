<template>
  <div>
    <NuxtRouteAnnouncer />
    <slot />
  </div>
</template>

<script setup lang="ts">
// Import the Botanical design-system CSS so it is applied globally.
// Nuxt 4 resolves `css` array entries as module IDs, so importing here is the
// reliable way to load the global stylesheet.
import '../assets/css/botanical.css'
</script>
