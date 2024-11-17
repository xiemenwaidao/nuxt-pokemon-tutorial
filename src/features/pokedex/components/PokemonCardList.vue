<script setup lang="ts">
import PokemonImage from '@/components/layout/PokemonImage.vue';
// import Spinner from '@/components/layout/Spinner.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { usePokemonDataStore } from '@/store/pokemonDataStore';

const pokemonDataStore = usePokemonDataStore();
const { loading: loadingState, getPokemonImageUrls } = storeToRefs(pokemonDataStore);

defineProps<{
  name: string;
  index: number;
}>();
</script>
<template>
  <li>
    <Card class="h-full">
      <template v-if="loadingState">
        <Skeleton class="h-[250px] w-full rounded-xl" />
        <!-- <Spinner class="flex h-[250px] items-center justify-center" /> -->
      </template>
      <template v-else>
        <CardHeader>
          <PokemonImage :src="getPokemonImageUrls[index]" :alt="`${name}の画像`" />
        </CardHeader>
        <CardContent>
          <CardTitle class="text-center">{{ name }}</CardTitle>
        </CardContent>
      </template>
    </Card>
  </li>
</template>
