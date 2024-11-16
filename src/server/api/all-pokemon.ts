import type { AllPokemonData, PokemonData, PokemonDetailData, PokemonSpeciesData } from '@/types/pokemon';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  try {
    // 全体的なエラーハンドリング: ここでは、サーバーサイドの処理全体に対するエラーハンドリングを行います。
    // 主な目的は、最終的なエラーメッセージのカスタマイズや、ステータスコードを設定することです。
    const { results } = await fetchData<PokemonData>(config.POKE_API);
    const allPokemonData: AllPokemonData[] = await Promise.all(
      results.map(async (result) => {
        const detailData = await fetchData<PokemonDetailData>(result.url);
        const speciesData = await fetchData<PokemonSpeciesData>(detailData.species.url);
        return { ...result, detailData, speciesData };
      }),
    );
    return allPokemonData;
  } catch (error) {
    // ここでは、グローバルなエラーハンドリングとして、
    // どのようなエラーが発生しても、統一されたエラーメッセージとステータスコードを返すようにします。
    handleError('Failed to fetch Pokémon data:', error);
    throw createError({ statusCode: 500, message: 'Failed to fetch Pokémon data' });
  }
});

const fetchData = async <T>(url: string): Promise<T> => {
  try {
    // 局所的なエラーハンドリング: ここでは、特定のAPIリクエストに対するエラーハンドリングを行います。
    // 主な目的は、エラーが発生したURLやエラーの詳細をログに残し、問題の発生箇所を明確にすることです。
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json() as Promise<T>;
  } catch (error) {
    // この catch ブロックでは、具体的なリクエストエラーをログに記録し、
    // 必要に応じてリスローして上位で処理を継続できるようにします。
    handleError('Error fetching data:', error);
    throw error; // リスローすることで、上位でさらに処理できます。
  }
};
