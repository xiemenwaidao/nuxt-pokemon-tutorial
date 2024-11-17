<script setup lang="ts">
import DetailPage from '@/features/pokedex/id/components/DetailPage.vue';

const route = useRoute();
const { id } = route.params;

useHead({
  title: `ポケモン図鑑 : No.${id}`,
});
</script>
<template>
  <DetailPage />
</template>
