import type { AllPokemonData } from '@/types/pokemon';

export const fetchPokemonData = async (): Promise<AllPokemonData[]> => {
  const { data, error } = await useFetch<AllPokemonData[]>('/api/all-pokemon');

  if (error.value || !data.value) {
    return [];
  }

  return data.value;
};
