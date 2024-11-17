import type { AllPokemonData, PokemonData, PokemonDetailData, PokemonSpeciesData } from '@/types/pokemon';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  // クエリパラメータから offset と limit を取得
  const query = getQuery(event);
  const offset = parseInt(query.offset as string, 10);
  const limit = parseInt(query.limit as string, 10);

  try {
    // APIリクエストに offset と limit をクエリパラメータとして渡す
    const { results, count, next, previous } = await fetchData<PokemonData>(
      `${config.POKE_API}?offset=${offset}&limit=${limit}`,
    );

    const allPokemonData: AllPokemonData[] = await Promise.all(
      results.map(async (result) => {
        const detailData = await fetchData<PokemonDetailData>(result.url);
        const speciesData = await fetchData<PokemonSpeciesData>(detailData.species.url);
        return { ...result, detailData, speciesData };
      }),
    );
    return { count, next, previous, allPokemonData };
  } catch (error) {
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
