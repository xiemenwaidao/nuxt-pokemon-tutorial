import type { PokemonData } from '@/types/pokemon';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const response = await fetch(config.POKE_API);
  return response.json() as Promise<PokemonData>;
});
