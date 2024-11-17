import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChavronLeftArrow from '../../components/icons/chavronLeftArrow';
import SearchIcon from '../../components/icons/SearchIcon';
import X from '../../components/icons/x';
import ChavronRightArrow from '../../components/icons/chavronRightArrow';

const Search = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState(''); // State for search input
    const [stores] = useState(['Nike', 'Apple', 'Sephora', "Victoria's Secret", 'H&M', 'Zara', 'Uniqlo', 'Adidas', 'Samsung', 'Gucci', 'StarBucks', 'Macdonalds', 'KFC', 'levis', 'U.S POLO', 'IKEA']); // Store list

    // Filter stores based on search query
    const filteredStores = stores.filter((store) =>
        store.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle search input change
    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Clear search input
    const handleClearSearch = () => {
        setSearchQuery('');
    };

    const handleStoreClick = (store) => {
        // Example navigation to a store details page
        navigate(`/store/${store.toLowerCase()}`);
    };
    return (
        <div className="flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{ fontFamily: '"Work Sans", "Noto Sans", sans-serif' }}>
            <div className="flex items-center p-4 pb-2 justify-between">
                <div className=" flex size-12 shrink-0 items-center cursor-pointer" data-icon="ArrowLeft" data-size="24px" data-weight="regular" onClick={() => navigate(-1)}>
                    <ChavronLeftArrow />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">Search</h2>
            </div>

            <div className="px-4 py-3">
                <label className="flex flex-col h-12 w-full">
                    <div className=" flex border-none  items-center justify-center pl-4 rounded-l-xl border-r-0 w-full" data-icon="MagnifyingGlass" data-size="24px" data-weight="regular">
                        <SearchIcon />
                        <input
                            className="flex w-full flex-1 focus:outline-0 h-full px-4 pr-2 pl-2 bg-[#171717]"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder="search for your desire brands"
                        />
                        {searchQuery && (
                            <div className="flex items-center justify-center rounded-r-xl border-none pr-4">
                                <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-transparent gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0"
                                    onClick={handleClearSearch}
                                >
                                    <X />
                                </button>
                            </div>
                        )}
                    </div>
                </label>
            </div>

            {/* List of filtered search items */}
            {searchQuery && (
                filteredStores.map((store, index) => (
                    <div key={index} className="flex items-center gap-4  px-4 min-h-14 justify-between cursor-pointer" onClick={() => handleStoreClick(store)}>
                        <p className="text-base font-normal">{store}</p>
                        <ChavronRightArrow />
                    </div>
                ))
            )}
        </div>
    );
}

export default Search;
