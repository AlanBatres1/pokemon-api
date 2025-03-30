import React, { useState, useEffect } from 'react';

interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

interface PokemonSprites {
  other: {
    "official-artwork": {
      front_default: string;
      front_shiny?: string;
    }
  }
}

interface Pokemon {
  name: string;
  id: number;
  types: string[];
  abilities: string[];
  sprites: PokemonSprites;
  location: string;
  species: string;
  moves: PokemonMove[];
}

interface PokeCardProps {
  activeModal: "favorites" | "moves" | "evolution" | null;
  onModalClose: () => void;
  onModalOpen: (modal: "favorites" | "moves" | "evolution") => void;
  isShiny: boolean;
  onShinyToggle: () => void;
  onSearch?: (name: string) => void;
  pokemon: Pokemon;
}

interface FavoritePokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
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
  onSearch,
  pokemon,
}) => {
  const [favorites, setFavorites] = useState<FavoritePokemon[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const primaryType = pokemon.types[0]?.toLowerCase() || "default";
  const bgColor = typeColors[primaryType] || typeColors.default;

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('pokemonFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Check if current pokemon is in favorites
  useEffect(() => {
    const checkIfFavorite = () => {
      const isFav = favorites.some(fav => fav.id === pokemon.id);
      setIsFavorite(isFav);
    };
    
    checkIfFavorite();
  }, [favorites, pokemon.id]);

  // Function to handle adding/removing from favorites
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the modal
    
    let updatedFavorites: FavoritePokemon[];
    
    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav.id !== pokemon.id);
    } else {
      // Add to favorites
      const newFavorite: FavoritePokemon = {
        id: pokemon.id,
        name: pokemon.name,
        image: isShiny 
          ? pokemon.sprites.other["official-artwork"].front_shiny || pokemon.sprites.other["official-artwork"].front_default
          : pokemon.sprites.other["official-artwork"].front_default,
        types: pokemon.types
      };
      updatedFavorites = [...favorites, newFavorite];
    }
    
    // Update state and localStorage
    setFavorites(updatedFavorites);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
  };

  // Function to remove from favorites directly from the list
  const removeFromFavorites = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('pokemonFavorites', JSON.stringify(updatedFavorites));
  };


  const handlePokemonClick = (name: string) => {
    if (onSearch) {
      onSearch(name);
      onModalClose();
    }
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
      
      {favorites.length > 0 ? (
        <div className="flex-grow overflow-y-auto">
          {favorites.map((fav) => (
            <div 
              key={fav.id} 
              className="flex items-center justify-between p-2 border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handlePokemonClick(fav.name)}
            >
              <div className="flex items-center">
                <img src={fav.image} alt={fav.name} className="w-12 h-12 object-contain" />
                <div className="ml-3">
                  <p className="font-bold capitalize">{fav.name}</p>
                </div>
              </div>
              <button 
                className="text-red-500 hover:text-red-700 text-2xl"
                onClick={(e) => removeFromFavorites(e, fav.id)}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-grow flex justify-center items-center">
          <p className="text-center">No favorites yet</p>
        </div>
      )}
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
          {pokemon.moves.slice(0, 20).map((move: PokemonMove, index: number) => (
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
        <p className="text-center">No evolution data available.</p>
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
            src={isFavorite ? "/assets/gaming (1).png" : "/assets/gaming.png"}
            className="w-[40px] h-[40px] absolute top-2 right-2 cursor-pointer z-10 hover:scale-110 drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]"
            alt="Favorite Icon"
            onClick={toggleFavorite}
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
          className="absolute bottom-4 left-4 w-[50px] h-[50px] cursor-pointer z-10 transition-transform hover:scale-110 drop-shadow-[0,0,0,0.25]"
          alt="Shiny Toggle"
        />
        {activeModal === 'favorites' && <FavoritesModal />}
        {activeModal === 'moves' && <MovesModal />}
        {activeModal === 'evolution' && <EvolutionModal />}
      </div>
    </div>
  );
};

export default PokeCard;
