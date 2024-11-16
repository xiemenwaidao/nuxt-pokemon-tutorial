import { fetchPokemonData } from '@/services/pokemonService';

export const fetchData = async () => {
  const data = fetchPokemonData();
  return data;
};
