<script setup lang="ts">
import { usePokemonDataStore } from '@/store/pokemonDataStore';

const pokemonDataStore = usePokemonDataStore();
const { loading: loadingState, getJapanesePokemonNames, getPokemonImageUrls } = storeToRefs(pokemonDataStore);
const { updateAllPokemonData } = pokemonDataStore;

await updateAllPokemonData();
</script>

<template>
  <h1>ポケモン図鑑アプリ</h1>
  <ul class="grid grid-cols-4 gap-2 p-4">
    <template v-for="(name, index) in getJapanesePokemonNames" :key="name">
      <li>
        <Card>
          <CardHeader>
            <img :src="getPokemonImageUrls[index]" :alt="`${name}の画像`" />
          </CardHeader>
          <CardContent>
            <template v-if="loadingState">
              <p>読み込み中...</p>
            </template>
            <template v-else>
              <CardTitle>{{ name }}</CardTitle>
            </template>
          </CardContent>
        </Card>
      </li>
    </template>
  </ul>
</template>
