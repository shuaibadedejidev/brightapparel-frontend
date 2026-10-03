import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // Directs user to your shop page with the search query attached
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="bg-[#e9e4dc] text-xs px-3 py-2 pl-8 rounded-full focus:outline-none focus:ring-1 focus:ring-[#4a3b32] w-36 sm:w-48 transition-all"
      />
      <button type="submit" className="absolute left-2.5 text-[#6c5d53] hover:text-black">
        <Search size={14} />
      </button>
    </form>
  );
};

export default SearchBar;