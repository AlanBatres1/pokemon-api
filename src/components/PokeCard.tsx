import React, { useState, useEffect } from 'react';

interface PokeCardProps {
  activeModal: "favorites" | "moves" | "evolution" | null;
  onModalClose: () => void;
  onModalOpen: (modal: "favorites" | "moves" | "evolution") => void;
  isShiny: boolean;
  onShinyToggle: () => void;
  pokemon: {
    name: string;
    id: number;
    types: string[];
    abilities: string[];
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
          front_shiny?: string;
        }
      }
    };
    location: string;
    species: string;
    moves: any[];
  };
}

const typeColors: { [key: string]: string } = {
  fire: '#F08030',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  normal: '#A8A878',
  default: '#AAB09F'
};

const PokeCard: React.FC<PokeCardProps> = ({
  activeModal,
  onModalClose,
  onModalOpen,
  isShiny,
  onShinyToggle,
  pokemon,
}) => {
  const [evolution, setEvolution] = useState<any>(null);
  const primaryType = pokemon.types[0]?.toLowerCase() || "default";
  const bgColor = typeColors[primaryType] || typeColors.default;

  // Fetch Evolution data
  useEffect(() => {
    const fetchEvolution = async () => {
      try {
        const speciesRes = await fetch(pokemon.species);
        const speciesData = await speciesRes.json();
        const evolutionRes = await fetch(speciesData.evolution_chain.url);
        const evolutionData = await evolutionRes.json();
        setEvolution(evolutionData.chain);
      } catch (error) {
        console.error('Error fetching evolution data:', error);
      }
    };
    
    if (activeModal === 'evolution') {
      fetchEvolution();
    }
  }, [activeModal, pokemon.species]);

  // Function to render the evolution chain
  const renderEvolutionChain = (chain: any) => {
    if (!chain) return <p>No evolution chain data available.</p>;
    const evolutions = [];
    let current = chain;

    while (current) {
      evolutions.push(current.species.name);
      current = current.evolves_to[0]; // If there are multiple evolutions, you can expand this logic.
    }

    return (
      <div className="flex justify-center gap-2">
        {evolutions.map((evolution: string, index: number) => (
          <p key={index} className="text-lg font-bold capitalize">{evolution}</p>
        ))}
      </div>
    );
  };

  // Modal Components
  const FavoritesModal = () => (
    <div className="absolute inset-0 bg-white flex flex-col z-50 rounded-[7px] p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Favorites</h2>
        <button 
          className="text-2xl font-bold hover:text-red-500"
          onClick={onModalClose}
        >
          ×
        </button>
      </div>
      <hr className="border-gray-300 w-full my-2" />
      <div className="flex-grow flex flex-col justify-center items-center">
        <p className="text-center mb-6">Add {pokemon.name} to favorites?</p>
        <div className="flex gap-4">
          <button 
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
            onClick={onModalClose}
          >
            Add
          </button>
          <button 
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
            onClick={onModalClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const MovesModal = () => (
    <div className="absolute inset-0 bg-white flex flex-col z-50 rounded-[7px] p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Moves</h2>
        <button 
          className="text-2xl font-bold hover:text-red-500"
          onClick={onModalClose}
        >
          ×
        </button>
      </div>
      <hr className="border-gray-300 w-full my-2" />
      <div className="flex-grow overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {pokemon.moves.slice(0, 20).map((move: any, index: number) => (
            <span key={index} className="capitalize bg-gray-200 px-2 py-1 rounded text-sm">
              {move.move.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const EvolutionModal = () => (
    <div className="absolute inset-0 bg-white flex flex-col z-50 rounded-[7px] p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Evolution Chain</h2>
        <button 
          className="text-2xl font-bold hover:text-red-500"
          onClick={onModalClose}
        >
          ×
        </button>
      </div>
      <hr className="border-gray-300 w-full my-2" />
      <div className="flex-grow flex flex-col justify-center items-center">
        {evolution ? (
          renderEvolutionChain(evolution)
        ) : (
          <p className="text-center">Loading evolution data...</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex justify-center mt-[25px] md:mt-[50px]">
      <div
        id="pokemonCard"
        className="w-[410px] h-[530px] border-[#4B5563] border-[11px] rounded-[15px] shadow-lg relative overflow-hidden transition-transform drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: bgColor }}
      >
        {/* Pokédex Number */}
        <div className="absolute top-3 left-3 bg-[#4B5563] text-white text-sm font-bold px-3 py-1 font-[inter] rounded-full z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
          #{pokemon.id.toString().padStart(3, '0')}
        </div>

        {/* Pokémon Image Section */}
        <div className="relative flex justify-center">
          <img
            src="/assets/pokeball.png"
            className="w-[150px] h-[150px] absolute top-[20px] right-[50px] transform z-0"
            alt="Pokeball"
          />
          <img
            src="/assets/gaming.png"
            className="w-[40px] h-[40px] absolute top-2 right-2 cursor-pointer z-10 hover:scale-110 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
            alt="Favorite Icon"
            onClick={() => onModalOpen('favorites')}
          />
        </div>

        <div className="flex justify-center">
          <img
            src={
              isShiny 
                ? pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.other["official-artwork"].front_default
                : pokemon.sprites.other["official-artwork"].front_default
            } 
            className="w-[300px] h-[300px] z-10 transition-transform duration-300 ease-in-out object-contain"
            alt={pokemon.name}
          />
        </div>

        {/* Pokémon Info Section */}
        <div className="bg-white w-full min-h-[210px] rounded-t-[7px] rounded-b-[6px] flex flex-col items-center z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]">
          <h1 className="text-[18px] font-[Inter] font-bold capitalize">{pokemon.name}</h1>

          <div className="flex gap-3">
            {pokemon.types.map((type) => (
              <p 
                key={type} 
                className="rounded-[14px] p-[5px] text-white font-[Inter] font-bold capitalize drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                style={{ backgroundColor: typeColors[type.toLowerCase()] || typeColors.default }}
              >
                {type}
              </p>
            ))}
          </div>

          <div className="flex justify-around w-full mt-3">
            {/* Display Pokémon Location */}
            <div className="text-center ">
              <p className="text-[12px] capitalize font-bold max-w-[100px]">{pokemon.location || 'Unknown'}</p>
              <p className="text-[10px]">Location</p>
            </div>

            <div className="text-center">
              {pokemon.abilities.slice(0, 2).map((ability) => (
                <p key={ability} className="text-[12px] font-bold capitalize">{ability}</p>
              ))}
              <p className="text-[10px]">Abilities</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 ">
            <button
              onClick={() => onModalOpen('moves')}
              className="cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold hover:scale-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              style={{ backgroundColor: bgColor }}
            >
              Moves
            </button>

            <button
              onClick={() => onModalOpen('evolution')}
              className="cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold hover:scale-110 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              style={{ backgroundColor: bgColor }}
            >
              Evolution
            </button>
          </div>
        </div>

        {/* Shiny Image Button */}
        <img
          onClick={onShinyToggle}
          src={isShiny ? "/assets/shinyIconClick.png" : "/assets/shinyIcon.png"}
          className="absolute bottom-4 left-4 w-[50px] h-[50px] cursor-pointer z-10 transition-transform hover:scale-110 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
          alt="Shiny Toggle"
        />

        {/* Modal Rendering - Now taking up the entire card space */}
        {activeModal === 'favorites' && <FavoritesModal />}
        {activeModal === 'moves' && <MovesModal />}
        {activeModal === 'evolution' && <EvolutionModal />}
      </div>
    </div>
  );
};

export default PokeCard;