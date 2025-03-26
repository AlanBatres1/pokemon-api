"use client";
import React, { useState } from "react";
import PokeCard from "@/components/PokeCard";
import HeaderSection from "@/components/HeaderSection";

export default function Home() {
  const [activeModal, setActiveModal] = useState<'favorites' | 'moves' | 'evolution' | null>(null);
  const [isShiny, setIsShiny] = useState(false);

  // Centralized state management
  const handleModalToggle = (modalType: 'favorites' | 'moves' | 'evolution' | null) => {
    setActiveModal(modalType);
  };

  const handleShinyToggle = () => {
    setIsShiny(!isShiny);
  };

  return (
    <div className="bg-[url(/assets/pokemonBg.png)] bg-no-repeat bg-cover font-[Poppins] bg-fixed bg-center min-h-screen">
      <HeaderSection 
        onFavoritesClick={() => handleModalToggle('favorites')}
      />
      <PokeCard 
        activeModal={activeModal}
        onModalClose={() => handleModalToggle(null)}
        onModalOpen={(modal) => handleModalToggle(modal)}
        isShiny={isShiny}
        onShinyToggle={handleShinyToggle}
      />
    </div>
  );
}