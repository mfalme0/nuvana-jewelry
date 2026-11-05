<template>
  <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
    <!-- Main arched image -->
    <div class="lg:col-span-1 relative">
      <ArchedImage
        :src="primaryImage.url"
        :alt="primaryImage.alt"
        :width="primaryImage.width"
        :height="primaryImage.height"
        radius="34px"
        aspect="3 / 4"
        preload
      />

      <!-- Small circular object overlapping near the base -->
      <div
        v-if="secondaryImage"
        class="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-32 md:w-40 md:h-40"
      >
        <ArchedImage
          :src="secondaryImage.url"
          :alt="secondaryImage.alt"
          :width="secondaryImage.width"
          :height="secondaryImage.height"
          radius="round"
          aspect="1 / 1"
        />
        <svg
          class="absolute inset-0 rounded-full border border-rule/60 pointer-events-none"
          aria-hidden="true"
        />
      </div>
    </div>

    <!-- Thumbnail strip -->
    <div class="flex flex-col gap-4 lg:flex-col-reverse lg:col-span-1">
      <div class="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          v-for="(image, index) in allImages"
          :key="image.id"
          type="button"
          class="shrink-0 rounded-panel border border-rule overflow-hidden"
          :class="{
            'border-accent': selectedImage.id === image.id,
            'border-transparent': selectedImage.id !== image.id,
          }"
          @click="selectImage(image)"
          :aria-label="`Image ${index + 1}`"
        >
          <ArchedImage
            :src="image.url"
            :alt="`${image.alt} (thumbnail)`"
            :width="image.width"
            :height="image.height"
            width="80"
            height="80"
            radius="panel-narrow"
            aspect="1 / 1"
            placeholder=""
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductImage } from '~/types/product'
import ArchedImage from '~/components/ArchedImage.vue'

const props = defineProps<{ images: ProductImage[] }>()

const selectedImage = ref(props.images[0] ?? null)
const allImages = props.images

const primaryImage = computed(() => selectedImage.value ?? allImages[0])
const secondaryImage = computed(() =>
  allImages.find((image) => image.id !== primaryImage.value?.id && !image.primary)
)

function selectImage(image: ProductImage) {
  selectedImage.value = image
}
</script>
