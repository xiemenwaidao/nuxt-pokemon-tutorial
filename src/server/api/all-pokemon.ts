import type { AllPokemonData, PokemonData, PokemonDetailData, PokemonSpeciesData } from '@/types/pokemon';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const { results } = await fetchPokemonData(config.POKE_API);
  const allPokemonData: AllPokemonData[] = await Promise.all(
    results.map(async (result) => {
      const detailData = await fetchPokemonDetailData(result.url);
      const speciesData = await fetchPokemonSpeciesData(detailData.species.url);
      return { ...result, detailData, speciesData };
    }),
  );
  return allPokemonData;
});

const fetchPokemonData = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  return response.json() as Promise<PokemonData>;
};

const fetchPokemonDetailData = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  return response.json() as Promise<PokemonDetailData>;
};

const fetchPokemonSpeciesData = async (apiUrl: string) => {
  const response = await fetch(apiUrl);
  return response.json() as Promise<PokemonSpeciesData>;
};
