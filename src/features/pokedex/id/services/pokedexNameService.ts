import type { SpecificPokemonData } from '@/types/pokemon';

export const fetchSpecificPokemonData = async <T>(nameId: T) => {
  try {
    // $fetchを使用してAPIからデータを取得
    const data = await $fetch<SpecificPokemonData>('/api/pokemon', {
      query: { nameId },
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {} as SpecificPokemonData;
  }
};
