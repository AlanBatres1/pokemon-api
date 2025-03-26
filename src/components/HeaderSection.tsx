import React from 'react';

interface HeaderSectionProps {
  onFavoritesClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onFavoritesClick }) => {
  return (
    <header className="bg-[#2B73B9] h-[200px] max-w-full">
      <div className="flex justify-center">
        <img src="/assets/Pokemon.png" className="w-80 h-[113px]" alt="Pokemon Logo" />
      </div>

      <div className="flex justify-center mt-4 gap-1">
        <div className="w-[327px] h-[32px]">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img src="/assets/search.png" className="cursor-pointer" alt="Search Icon" />
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-full bg-gray-50"
              placeholder="Search by name/pokedex number"
              required
            />
          </div>
        </div>

        <img
          src="/assets/Adobe Express - file.png"
          className="w-[35px] h-[35px] mt-2 cursor-pointer"
          alt="Random Icon"
        />
        <img
          src="/assets/gaming (1).png"
          className="w-[35px] h-[35px] mt-2 cursor-pointer"
          alt="Favorites"
          onClick={onFavoritesClick}
        />
      </div>
    </header>
  );
};

export default HeaderSection;