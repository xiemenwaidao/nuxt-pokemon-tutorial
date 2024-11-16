<script setup lang="ts">
import { usePokemonDataStore } from '@/store/pokemonDataStore';
import PokemonCardList from './PokemonCardList.vue';

const pokemonDataStore = usePokemonDataStore();
const { getJapanesePokemonNames } = storeToRefs(pokemonDataStore);
const { updateAllPokemonData } = pokemonDataStore;

await updateAllPokemonData();
</script>
<template>
  <h1 class="text-center text-4xl font-bold">ポケモン図鑑アプリ</h1>
  <ul class="grid grid-cols-4 gap-2 p-4">
    <template v-for="(name, index) in getJapanesePokemonNames" :key="name">
      <PokemonCardList :name="name" :index="index" />
    </template>
  </ul>
</template>
