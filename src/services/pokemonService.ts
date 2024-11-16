import type { PokemonData } from '@/types/pokemon';

export const fetchPokemonData = async () => {
  const { data } = await useFetch<PokemonData>('/api/all-pokemon');
  if (!data.value) {
    throw new Error('No data found');
  }
  return data.value;
};
