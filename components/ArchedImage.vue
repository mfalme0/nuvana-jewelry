<template>
  <figure
    class="relative overflow-hidden border border-rule bg-panel shadow-sm"
    :style="style"
  >
    <NuxtImg
      v-if="src"
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      preset="arch"
      class="block w-full h-full object-cover"
      :lazy="lazy"
      :preload="preload"
    />
    <span v-else class="block w-full h-full bg-panel flex items-center justify-center text-ink/40 text-metadata">
      {{ placeholder || 'Image' }}
    </span>

    <!-- Arch ornament line at the base of the photograph -->
    <svg
      class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[220px] h-4 text-ornament-line pointer-events-none"
      viewBox="0 0 220 24"
      preserveAspectRatio="none"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      aria-hidden="true"
    >
      <path d="M0 24 Q 110 0 220 24" />
    </svg>
  </figure>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  width?: number
  height?: number
  lazy?: boolean
  preload?: boolean
  radius?: string
  aspectRatio?: string
  placeholder?: string }>()

const style = computed(() => ({
  borderRadius: props.radius ?? '34px',
  ...(props.aspectRatio ? { aspectRatio: props.aspectRatio } : {}),
}))
</script>
