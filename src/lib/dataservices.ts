const getPokemon = async (nameId: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameId}`);
    return response.json();
};

export { getPokemon }