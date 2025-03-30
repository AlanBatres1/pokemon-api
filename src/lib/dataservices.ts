const getPokemon = async (nameId: string) => {
    // Fetch basic Pokemon data
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}`);
    const pokemonData = await response.json();

    // Fetch location data
    const locationResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}/encounters`);
    const locationData = await locationResponse.json();

    const location = locationData.length > 0 
        ? locationData[0].location_area.name.replace(/-/g, ' ')
        : 'Unknown';

    // Fetch species data to get evolution chain URL
    const speciesResponse = await fetch(pokemonData.species.url);
    const speciesData = await speciesResponse.json();

    // Fetch evolution chain data
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    return {
        ...pokemonData,
        location: location,
        moves: pokemonData.moves,
        evolutionChain: evolutionData.chain  // Add evolution chain data
    };
};

export {getPokemon}