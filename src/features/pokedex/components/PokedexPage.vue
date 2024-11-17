<script setup lang="ts">
import { usePokemonDataStore } from '@/store/pokemonDataStore';
import PokedexPagination from './PokedexPagination.vue';
import PokemonCardList from './PokemonCardList.vue';

const pokemonDataStore = usePokemonDataStore();
const { getJapanesePokemonNames, getPokemonAllCount } = storeToRefs(pokemonDataStore);
const { updateAllPokemonData } = pokemonDataStore;

const route = useRoute();
const LIMIT = 20;

const page = computed(() => Number(route.query.page) || 1);
const offset = computed(() => (page.value - 1) * LIMIT);

await updateAllPokemonData(offset.value, LIMIT);

watch(page, async () => {
  await updateAllPokemonData(offset.value, LIMIT);
});
</script>
<template>
  <h1 class="text-center text-4xl font-bold">ポケモン図鑑アプリ</h1>
  <ul class="grid grid-cols-4 gap-2 p-4">
    <template v-for="(name, index) in getJapanesePokemonNames" :key="name">
      <PokemonCardList :name="name" :index="index" />
    </template>
  </ul>
  <PokedexPagination class="flex justify-center" :total-count="getPokemonAllCount" :current-page="page" />
</template>
