import React, { useState } from 'react';

interface HeaderSectionProps {
  onFavoritesClick: () => void;
  onSearch: (name: string) => void;
  onRandomClick: () => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({ onFavoritesClick, onSearch, onRandomClick }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <header className="bg-[#2B73B9] h-[200px] max-w-full">
      <div className="flex justify-center">
        <img src="/assets/Pokemon.png" className="w-80 h-[113px]" alt="Pokemon Logo" />
      </div>

      <div className="flex justify-center mt-4 gap-1">
        {/* Search Bar */}
        <div className="w-[327px] h-[32px]">
          <label htmlFor="search" className="sr-only">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img 
                src="/assets/search.png" 
                className="cursor-pointer hover:scale-110" 
                alt="Search Icon" 
                onClick={handleSearch}
              />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="block w-full p-4 pl-10 text-sm text-gray-900 rounded-full bg-gray-50"
              placeholder="Search by name/pokedex number"
            />
          </div>
        </div>

        {/* Random Button */}
        <img
          src="/assets/Adobe Express - file.png"
          className="w-[35px] h-[35px] mt-2 cursor-pointer hover:scale-110"
          alt="Random Icon"
          onClick={onRandomClick}
        />
        
        <img
          src="/assets/gaming (1).png"
          className="w-[35px] h-[35px] mt-2 cursor-pointer hover:scale-110"
          alt="Favorites"
          onClick={onFavoritesClick}
        />
      </div>
    </header>
  );
};

export default HeaderSection;