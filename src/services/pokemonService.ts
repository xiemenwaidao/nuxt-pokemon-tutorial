import type { AllPokemonData } from '@/types/pokemon';

export const fetchPokemonData = async () => {
  const { data } = await useFetch<AllPokemonData[]>('/api/all-pokemon');
  if (!data.value) {
    throw new Error('No data found');
  }
  return data.value;
};
