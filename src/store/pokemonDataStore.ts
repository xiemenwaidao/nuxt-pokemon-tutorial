import { fetchData } from '@/features/pokedex/api/pokedex';
import type { PokemonResults } from '@/types/pokemon';

type State = {
  pokemonResults: PokemonResults[];
  loading: boolean;
};

export const usePokemonDataStore = defineStore('pokemonDataStore', {
  state: (): State => ({
    pokemonResults: [],
    loading: false,
  }),
  getters: {
    getEnglishPokemonNames(state) {
      return state.pokemonResults.map((pokemon) => pokemon.name);
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    async updateAllPokemonData() {
      this.setLoading(true);
      const { results } = await fetchData();
      this.pokemonResults = results;
      this.setLoading(false);
    },
  },
});
