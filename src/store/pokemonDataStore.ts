import { fetchData } from '@/features/pokedex/api/pokedex';
import type { AllPokemonData } from '@/types/pokemon';

type State = {
  allPokemonData: AllPokemonData[];
  loading: boolean;
};

export const usePokemonDataStore = defineStore('pokemonDataStore', {
  state: (): State => ({
    allPokemonData: [],
    loading: false,
  }),
  getters: {
    getEnglishPokemonNames(state) {
      return state.allPokemonData.map((pokemon) => pokemon.name);
    },
    getJapanesePokemonNames(state) {
      return state.allPokemonData
        .map(({ speciesData }) => speciesData.names.find(({ language }) => language.name === 'ja')?.name || '')
        .filter((name) => name !== '');
    },
    getPokemonImageUrls(state) {
      return state.allPokemonData.map(
        ({ detailData }) =>
          detailData.sprites.front_default || detailData.sprites.other['official-artwork'].front_default,
      );
    },
  },
  actions: {
    setLoading(loading: boolean) {
      this.loading = loading;
    },
    async updateAllPokemonData() {
      this.setLoading(true);
      const response = await fetchData();
      this.allPokemonData = response;
      this.setLoading(false);
    },
  },
});
