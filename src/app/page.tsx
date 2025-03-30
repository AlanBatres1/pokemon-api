"use client";
import React, { useEffect, useState } from "react";
import PokeCard from "@/components/PokeCard";
import HeaderSection from "@/components/HeaderSection";
import { getPokemon } from "@/lib/dataservices";

export default function Home() {
  const [activeModal, setActiveModal] = useState<"favorites" | "moves" | "evolution" | null>(null);
  const [isShiny, setIsShiny] = useState(false);
  const [pokemon, setPokemon] = useState<any>(null);
  const [pokemonName, setPokemonName] = useState("1");

  useEffect(() => {
    getPokemon(pokemonName.toLowerCase())
      .then(setPokemon);
  }, [pokemonName]);

  const handleModalToggle = (modalType: "favorites" | "moves" | "evolution" | null) => {
    setActiveModal(modalType);
  };

  const handleShinyToggle = () => {
    setIsShiny((prev) => !prev);
  };

  const handleSearch = (name: string) => {
    setPokemonName(name);
  };

  // Generate Random Pokémon
  const handleRandom = () => {
    const randomId = Math.floor(Math.random() * 1010) + 1;  // Pokémon range: 1-1010
    setPokemonName(randomId.toString());
  };

  return (
    <div className="bg-[url(/assets/pokemonBg.png)] bg-no-repeat bg-cover font-[Poppins] bg-fixed bg-center min-h-screen">
      <HeaderSection 
        onFavoritesClick={() => handleModalToggle('favorites')}
        onSearch={handleSearch}
        onRandomClick={handleRandom}  // <-- Pass the random handler
      />
      {pokemon && (
        <PokeCard 
          activeModal={activeModal}
          onModalClose={() => handleModalToggle(null)}
          onModalOpen={(modal) => handleModalToggle(modal)}
          isShiny={isShiny}
          onShinyToggle={handleShinyToggle}
          pokemon={{
            ...pokemon,
            types: pokemon.types.map((t: any) => t.type.name),
            abilities: pokemon.abilities.map((a: any) => a.ability.name)
          }}
        />
      )}
    </div>
  );
}
