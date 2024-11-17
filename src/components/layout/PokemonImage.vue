<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
  src?: string;
  alt?: string;
};

const isLoading = ref(true);

const handleImageLoad = () => {
  isLoading.value = false;
};

defineProps<Props>();
</script>
<template>
  <template v-if="src">
    <!-- <Skeleton v-if="isLoading" class="h-[100px] w-full rounded-xl" /> -->
    <img :src="src" :alt="alt" @load="handleImageLoad" />
  </template>
  <template v-else>
    <Skeleton class="h-[100px] w-full rounded-xl" />
  </template>
</template>
