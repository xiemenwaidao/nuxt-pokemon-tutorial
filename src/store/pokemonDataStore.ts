import { fetchPokemonData } from '@/features/pokedex/services/pokedexService';
import type { AllPokemonData } from '@/types/pokemon';

type State = {
  allPokemonData: AllPokemonData[];
  loading: boolean;
  errorMessage: string | null;
};

export const usePokemonDataStore = defineStore('pokemonDataStore', {
  state: (): State => ({
    allPokemonData: [],
    loading: false,
    errorMessage: null, // エラーメッセージを管理するためのステートを追加
  }),
  getters: {
    getEnglishPokemonNames(state): string[] {
      return state.allPokemonData.map((pokemon) => pokemon.name);
    },
    getJapanesePokemonNames(state): string[] {
      return state.allPokemonData
        .map(({ speciesData }) => speciesData.names.find(({ language }) => language.name === 'ja')?.name || '')
        .filter((name) => name !== '');
    },
    getPokemonImageUrls(state): string[] {
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
    setErrorMessage(message: string | null) {
      this.errorMessage = message;
    },
    async updateAllPokemonData() {
      this.setLoading(true);
      this.setErrorMessage(null);
      try {
        const response = await fetchPokemonData();
        if (!response.length) {
          throw new Error('Failed to fetch Pokémon data');
        }
        this.allPokemonData = response;
      } catch (error) {
        this.setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      } finally {
        this.setLoading(false);
      }
    },
  },
});
