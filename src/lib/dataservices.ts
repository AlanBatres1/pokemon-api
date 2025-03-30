interface Pokemon {
    id: number;
    name: string;
    types: { type: { name: string } }[];
    abilities: { ability: { name: string } }[];
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
          front_shiny?: string;
        };
      };
    };
    species: { url: string };
    location: string;
    moves: { move: { name: string } }[];
    evolutionChain?: EvolutionChain;
  }
  
  interface EvolutionChain {
    species: { name: string };
    evolves_to: EvolutionChain[];
  }
  
  const getPokemon = async (nameId: string): Promise<Pokemon> => {
    // Fetch basic Pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}`);
    const pokemonData: Pokemon = await response.json();
  
    // Fetch location data
    const locationResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}/encounters`);
    const locationData = await locationResponse.json();
  
    const location = locationData.length > 0
      ? locationData[0].location_area.name.replace(/-/g, ' ')
      : 'Unknown';
  
    // Fetch species data to get evolution chain URL (unfinished)
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();
  
    // Fetch evolution chain data
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();
  
    return {
      ...pokemonData,
      location: location,
      moves: pokemonData.moves,
      evolutionChain: evolutionData.chain as EvolutionChain,  // Add evolution chain data (unfinished)
    };
  };
  
  export { getPokemon };
  