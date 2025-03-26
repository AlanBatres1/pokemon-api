import React from 'react';

interface PokeCardProps {
  activeModal: 'favorites' | 'moves' | 'evolution' | null;
  onModalClose: () => void;
  onModalOpen: (modal: 'favorites' | 'moves' | 'evolution') => void;
  isShiny: boolean;
  onShinyToggle: () => void;
}

const PokeCard: React.FC<PokeCardProps> = ({ 
  activeModal, 
  onModalClose, 
  onModalOpen,
  isShiny, 
  onShinyToggle 
}) => {
  return (
    <div className="flex justify-center mt-[25px] md:mt-[50px]">
      <div
        id="pokemonCard"
        className="bg-fire w-[410px] h-[530px] drop-shadow-xs border-[#4B5563] border-[11px] rounded-[15px] shadow-lg relative overflow-hidden"
      >
        {/* Pokédex Number */}
        <div className="absolute top-4 left-4 bg-[#4B5563] text-white text-sm font-bold px-3 py-1 rounded-full z-10">
          #004
        </div>

        {/* Pokemon Image Section */}
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
            src={isShiny ? "/assets/shiny.png" : "/assets/image.png"} 
            className="w-[300px] h-[300px] z-10 transition-transform duration-300 ease-in-out"
            alt="Pokemon"
          />
        </div>

        {/* Pokemon Info Section */}
        <div className="bg-[#F0F0F0] w-full min-h-[210px] rounded-t-[7px] rounded-b-[6px] flex flex-col items-center z-10">
          <h1 className="text-[18px] font-[Inter] font-bold">Charmander</h1>

          <div className="flex gap-3">
            <p className="bg-fire rounded-[14px] p-[5px] text-white font-[Inter] font-bold">Fire</p>
          </div>

          <div className="flex justify-around w-full mt-3">
            <div className="text-center">
              <p className="text-[12px]">N/A</p>
              <p className="text-[10px]">Location</p>
            </div>
            <div className="text-center">
              <p className="text-[12px]">Blaze</p>
              <p className="text-[12px]">Solar-Power</p>
              <p className="text-[10px]">Abilities</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 ">
            <button
              onClick={() => onModalOpen('moves')}
              className="bg-fire cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold"
            >
              Moves
            </button>

            <button
              onClick={() => onModalOpen('evolution')}
              className="bg-fire cursor-pointer text-white rounded-[14px] p-[5px] font-[Inter] font-bold"
            >
              Evolution
            </button>
          </div>
        </div>

        {/* Shiny Image Button */}
        <img
          onClick={onShinyToggle}
          src="/assets/shinyIcon.png"
          className="absolute bottom-4 left-4 w-[50px] h-[50px] cursor-pointer z-10"
          alt="Shiny Toggle"
        />

        {/* Modals inside the card */}
        {activeModal && (
          <div className="absolute inset-0 bg-[#F0F0F0] rounded-[7px] flex flex-col items-center justify-start p-6 z-20">
            <div className="w-full flex justify-between items-center border-b pb-2">
              <h3 className="text-xl font-bold">
                {activeModal === 'favorites' ? "Favorites" : 
                 activeModal === 'moves' ? "Moves" : "Evolution"}
              </h3>
              <button
                onClick={onModalClose}
                className="text-gray-400 hover:text-gray-900"
              >
                ✖️
              </button>
            </div>

            <div className="mt-4 w-full">
              {activeModal === 'favorites' && (
                <p className="text-gray-500">No favorites added yet.</p>
              )}

              {activeModal === 'moves' && (
                <p className="text-gray-500">No moves available.</p>
              )}

              {activeModal === 'evolution' && (
                <p className="text-gray-500">No evolution data available.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PokeCard;