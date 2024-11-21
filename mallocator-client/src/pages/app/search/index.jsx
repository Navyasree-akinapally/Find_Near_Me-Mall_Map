import { SearchIcon, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import appSearchService from '../../../services/app/search.service';
import StoreCard from '../../../components/globals/store-card';
import { useTheme } from '../../../context/theme-context';

const SearchPage = () => {
    const navigate = useNavigate();
    const { stateName, cityName } = useParams();
    const [loading, setLoading] = useState(false);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { isDarkMode } = useTheme()

    const handleCloseSearch = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        // Set up debounce for search
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 1000); // Adjust the delay as needed

        // Clear timeout if the search term changes before delay ends
        return () => {
            clearTimeout(handler);
        };
    }, [search]);

    useEffect(() => {
        if (!debouncedSearch) {
            setSearchData([])
        }
    }, [debouncedSearch])



    useEffect(() => {
        const fetchData = async () => {
            if (!debouncedSearch) return; // Avoid fetching if there's no search input
            // setLoading(true);
            try {
                const res = await appSearchService.getStoreDataBySearchKeyword(stateName, cityName, debouncedSearch);
                if (res.data) {
                    setSearchData(res.data);
                }
            } catch (e) {
                console.log(e);
            } finally {
                // setLoading(false);
            }
        };
        fetchData();
    }, [stateName, cityName, debouncedSearch]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (!debouncedSearch) return; // Avoid fetching if there's no search input
    //         setLoading(true);
    //         try {
    //             if (res.data) {
    //                 setSearchData(res.data);
    //             }
    //         } catch (e) {
    //             console.log(e);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    // },[])



    return (
        <div className='px-4'>
            <div className={`flex items-center px-4 ${isDarkMode ? 'bg-slate-400' : 'bg-slate-200'}`}>
                <SearchIcon className='text-black' />
                <input
                    type="text"
                    className={`p-4 outline-none w-full text-black placeholder:text-black ${isDarkMode ? 'bg-slate-400' : 'bg-slate-200'}`}
                    placeholder='search for stores'
                    onChange={handleChange}
                />
                <button onClick={handleCloseSearch}>
                    <X className='text-black' />
                </button>
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='flex items-center justify-center p-8'>
                    {searchData.length > 0 ? (
                        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-8 col-span-2'>
                            {searchData.map((store, index) => {
                                return (
                                    <div className='relative'>
                                        <StoreCard store={store} />
                                    </div>
                                )
                            })}
                        </div>
                    ) : debouncedSearch ? (
                        <div className='flex flex-col gap-4'>
                            <div className='text-4xl font-bold text-start'>Oops..No search results found.</div>
                        </div>
                    ) : (
                        <>

                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
