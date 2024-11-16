<script setup lang="ts">
import Spinner from '@/components/layout/Spinner.vue';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card>
      <template v-if="loadingState">
        <Spinner class="flex h-[250px] items-center justify-center" />
      </template>
      <template v-else>
        <CardHeader>
          <img :src="getPokemonImageUrls[index]" :alt="`${name}の画像`" />
        </CardHeader>
        <CardContent>
          <CardTitle class="text-center">{{ name }}</CardTitle>
        </CardContent>
      </template>
    </Card>
  </li>
</template>
