<script setup lang="ts">
import { fetchData } from '../api/pokedex';

const data = await fetchData();
// eslint-disable-next-line no-console
console.log(data);
</script>
<template>
  <h1>ポケモンのページ</h1>
</template>
