<script setup lang="ts">
import { ITEMS_PER_PAGE } from '@/constants/pokedex';
import { usePokemonDataStore } from '@/store/pokemonDataStore';
import PokedexPagination from './PokedexPagination.vue';
import PokemonCardList from './PokemonCardList.vue';

const pokemonDataStore = usePokemonDataStore();
const { getJapanesePokemonNames, getEnglishPokemonNames, getPokemonAllCount } = storeToRefs(pokemonDataStore);
const { updateAllPokemonData } = pokemonDataStore;

const route = useRoute();

const page = computed(() => Number(route.query.page) || 1);
const offset = computed(() => (page.value - 1) * ITEMS_PER_PAGE);

await updateAllPokemonData(offset.value, ITEMS_PER_PAGE);

watch(page, async () => {
  await updateAllPokemonData(offset.value, ITEMS_PER_PAGE);
});

const maxPage = computed(() => Math.ceil(getPokemonAllCount.value / ITEMS_PER_PAGE));

// ページ数が不正な場合にリダイレクト
if (import.meta.server && page.value > maxPage.value && maxPage.value > 0) {
  await navigateTo(`/pokedex?page=${maxPage.value}`);
}
</script>
<template>
  <ul class="grid grid-cols-4 gap-2 p-4">
    <template v-for="(name, index) in getJapanesePokemonNames" :key="`${index}-${name}`">
      <PokemonCardList :name="name" :index="index" :name-id="getEnglishPokemonNames[index]" />
    </template>
  </ul>
  <PokedexPagination class="flex justify-center" :total-count="getPokemonAllCount" :current-page="page" />
</template>
