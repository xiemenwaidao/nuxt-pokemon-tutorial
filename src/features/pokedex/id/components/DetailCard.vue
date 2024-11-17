<script setup lang="ts">
import PokemonImage from '@/components/layout/PokemonImage.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { usePokemonSpecificDataStore } from '@/store/pokemonSpecificDataStore';

const { getHeight, getWeight, getImage, getPokemonName, getGenera, getFlavorText } = usePokemonSpecificDataStore();
</script>
<template>
  <Card>
    <CardHeader class="flex flex-row justify-center">
      <CardTitle class="text-center text-3xl">{{ getPokemonName }}</CardTitle>
    </CardHeader>
    <CardContent class="flex items-center justify-center gap-8">
      <div class="flex w-2/5 justify-center">
        <PokemonImage :src="getImage" alt="ポケモンの画像" />
      </div>
      <ul class="flex w-2/5 flex-col text-3xl">
        <template v-if="getGenera">
          <li class="mb-8">{{ getGenera }}</li>
        </template>
        <li>高さ: {{ getHeight }} m</li>
        <li>重さ: {{ getWeight }} kg</li>
        <template v-if="getFlavorText">
          <li class="mt-8">{{ getFlavorText }}</li>
        </template>
      </ul>
    </CardContent>
  </Card>
</template>
