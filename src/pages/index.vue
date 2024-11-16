<script setup lang="ts">
import HelloWorld from '@/features/sample/components/HelloWorld.vue';

useHead({
  title: 'ポケモン図鑑',
});
</script>
<template>
  <component :is="HelloWorld" />
</template>
