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
  species: Species;
}

export interface Species {
  name: string;
  url: string;
}

export interface PokemonSpeciesData {
  names: Names[];
}

export interface Names {
  name: string;
  language: {
    name: string;
    url: string;
  };
}

export interface AllPokemonData extends PokemonResults {
  detailData: PokemonDetailData;
  speciesData: PokemonSpeciesData;
}
