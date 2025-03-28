import React from 'react';

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
    }
  };
}

// Type-to-Color Mapping
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
  // Get the primary type color or use default
  const primaryType = pokemon.types[0]?.toLowerCase() || "default";
  const bgColor = typeColors[primaryType] || typeColors.default;

  return (
    <div className="flex justify-center mt-[25px] md:mt-[50px]">
      <div
        id="pokemonCard"
        className="w-[410px] h-[530px] drop-shadow-xs border-[#4B5563] border-[11px] rounded-[15px] shadow-lg relative overflow-hidden transition-transform"
        style={{ backgroundColor: bgColor }}
      >
        {/* Pokédex Number */}
        <div className="absolute top-4 left-4 bg-[#4B5563] text-white text-sm font-bold px-3 py-1 rounded-full z-10">
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
            className="w-[40px] h-[40px] absolute top-2 right-2 cursor-pointer z-10"
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
        <div className="bg-[#F0F0F0] w-full min-h-[210px] rounded-t-[7px] rounded-b-[6px] flex flex-col items-center z-10">
          <h1 className="text-[18px] font-[Inter] font-bold capitalize">{pokemon.name}</h1>

          <div className="flex gap-3">
            {pokemon.types.map((type) => (
              <p 
                key={type} 
                className="rounded-[14px] p-[5px] text-white font-[Inter] font-bold capitalize"
                style={{ backgroundColor: typeColors[type.toLowerCase()] || typeColors.default }}
              >
                {type}
              </p>
            ))}
          </div>

          <div className="flex justify-around w-full mt-3">
            <div className="text-center">
              <p className="text-[12px]">N/A</p>
              <p className="text-[10px]">Location</p>
            </div>
            <div className="text-center">
              {pokemon.abilities.slice(0, 2).map((ability) => (
                <p key={ability} className="text-[12px] capitalize">{ability}</p>
              ))}
              <p className="text-[10px]">Abilities</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 ">
            <button
              onClick={() => onModalOpen('moves')}
              className="cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold"
              style={{ backgroundColor: bgColor }}
            >
              Moves
            </button>

            <button
              onClick={() => onModalOpen('evolution')}
              className="cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold"
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
          className="absolute bottom-4 left-4 w-[50px] h-[50px] cursor-pointer z-10 transition-transform hover:scale-110"
          alt="Shiny Toggle"
        />
      </div>
    </div>
  );
};

export default PokeCard;
