<script setup lang="ts">
import PokemonImage from '@/components/layout/PokemonImage.vue';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { usePokemonSpecificDataStore } from '@/store/pokemonSpecificDataStore';

const { getHeight, getWeight, getImage } = usePokemonSpecificDataStore();
</script>
<template>
  <Card>
    <CardHeader class="flex flex-row justify-center">
      <CardTitle class="text-center text-3xl">ポケモンの名前</CardTitle>
    </CardHeader>
    <CardContent class="flex items-center justify-center gap-8">
      <div class="flex w-2/5 justify-center">
        <PokemonImage :src="getImage" alt="ポケモンの画像" />
      </div>
      <ul class="flex w-2/5 flex-col text-3xl">
        <li>ポケモンの分類</li>
        <br />
        <li>高さ: {{ getHeight }} m</li>
        <li>重さ: {{ getWeight }} kg</li>
        <br />
        <li>説明文</li>
      </ul>
    </CardContent>
  </Card>
</template>
