export interface Pokemon {
  count: number;
  next?: string;
  previous?: string;
  allPokemonData: AllPokemonData[];
}

export interface AllPokemonData extends PokemonResults {
  detailData: PokemonDetailData;
  speciesData: PokemonSpeciesData;
}

export interface PokemonData {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonResults[];
}

export interface PokemonResults {
  name: string;
  url: string;
}

export interface PokemonDetailData {
  id: number;
  species: Species;
  sprites: Sprites;
}

export interface Species {
  name: string;
  url: string;
}

export interface Sprites {
  front_default: string;
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Language;
}

export interface Genera {
  genus: string;
  language: Language;
}

export interface PokemonSpeciesData {
  flavor_text_entries: FlavorTextEntry[];
  genera: Genera[];
  names: Names[];
}

export interface Names {
  name: string;
  language: Language;
}

export interface PokemonDetailData {
  cries: Cries;
  height: number;
  species: Species;
  sprites: Sprites;
  weight: number;
}

export interface Cries {
  latest: string;
  legacy: string;
}

export type SpecificPokemonData = Omit<AllPokemonData, keyof PokemonResults>;

export interface Language {
  name: string;
  url: string;
}
