import { useEffect, useState } from "react";

const SearchableSelect = ({ options, onChange, value, name, placeholder, dropdownRef }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    // Filter options based on search input
    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectClick = () => {
        setIsOpen(prev => !prev);
        setSearchTerm("");
    };

    const handleOptionClick = (option) => {
        onChange(option.value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef?.current && !dropdownRef?.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className="relative">
            <div
                onClick={handleSelectClick}
                className="w-full px-3 py-2 border rounded cursor-pointer bg-gray-200 text-black"
            >
                {value ? options.find(opt => opt.value === value)?.label : placeholder}
            </div>

            {isOpen && (
                <div className="absolute w-full bg-white text-black border rounded -mt-10 z-40">
                    {/* Search input */}
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-2 py-1 border-b bg-gray-200"
                    />

                    {/* Options list */}
                    <div className="max-h-32 overflow-y-auto">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                >
                                    {option.label}{" "}
                                    {option.locationData && (
                                        <>
                                            <span className="text-sm">{option.locationData.state}, {option.locationData.city}</span>
                                        </>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="px-3 py-2">No matching options</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableSelect;
