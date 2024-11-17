import { fetchSpecificPokemonData } from '@/features/pokedex/id/services/pokedexNameService';
import type { SpecificPokemonData } from '@/types/pokemon';

export const usePokemonSpecificDataStore = defineStore('pokemonSpecificDataStore', () => {
  // state
  const pokemon = ref<SpecificPokemonData>({} as SpecificPokemonData);
  const loading = ref<boolean>(false);
  const errorMessage = ref<string | null>(null);

  // getters
  const getHeight = computed(() => divideByTen(pokemon.value.detailData.height));
  const getWeight = computed(() => divideByTen(pokemon.value.detailData.weight));
  const getImage = computed(
    () =>
      pokemon.value.detailData.sprites.other['official-artwork'].front_default ||
      pokemon.value.detailData.sprites.front_default,
  );
  const getPokemonName = computed(
    () => pokemon.value.speciesData.names.find(({ language }) => language.name === 'ja')?.name || '?',
  );
  const getGenera = computed(
    () => pokemon.value.speciesData.genera.find(({ language }) => language.name === 'ja')?.genus,
  );
  const getFlavorText = computed(
    () => pokemon.value.speciesData.flavor_text_entries.find(({ language }) => language.name === 'ja')?.flavor_text,
  );

  // actions
  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading;
  };
  const setErrorMessage = (message: string | null) => {
    errorMessage.value = message;
  };
  const updateSpecificPokemonData = async (nameId: string) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetchSpecificPokemonData<string>(nameId);
      if (!response) {
        throw new Error('Failed to fetch Pokémon data');
      }
      pokemon.value = response;
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    getHeight,
    getWeight,
    getImage,
    updateSpecificPokemonData,
    getPokemonName,
    getGenera,
    getFlavorText,
  };
});
