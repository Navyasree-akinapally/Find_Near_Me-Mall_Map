import React from 'react';
import ChavronLeftArrow from '../../components/icons/chavronLeftArrow';
import RightTickIcon from '../../components/icons/rightTickIcon';
import MallIcon from '../../components/icons/mallIcon';
import MapMarker from '../../components/icons/mapMarker';
import { StoreIcon, Tag } from 'lucide-react';

const StoreHours = () => {
    return (
        <div
            className="relative flex size-full min-h-screen flex-col justify-between group/design-root overflow-x-hidden"
        >
            <div>
                <div className="flex items-center justify-between gap-12  p-4 pb-2">
                    <p className="text-3xl font-bold text-center">Store Hours</p>
                </div>

                <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Today</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    {['Nike', 'Apple', 'Uniqlo'].map((store, index) => (
                        <div
                            key={index}
                            className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col"
                        >
                            <div className="text-[#111418]" data-icon="CheckCircle" data-size="24px" data-weight="regular">
                                <RightTickIcon />
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#111418] text-base font-bold leading-tight">{store}</h2>
                                <p className="text-[#60758a] text-sm font-normal leading-normal">8:00 AM - 9:30 PM</p>
                            </div>
                        </div>
                    ))}
                </div>

                <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">Tomorrow</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                    {['Nike', 'Apple', 'Uniqlo'].map((store, index) => (
                        <div
                            key={index}
                            className="flex flex-1 gap-3 rounded-lg border border-[#dbe0e6] bg-white p-4 flex-col"
                        >
                            <div className="text-[#111418]" data-icon="CheckCircle" data-size="24px" data-weight="regular">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24px"
                                    height="24px"
                                    fill="currentColor"
                                    viewBox="0 0 256 256"
                                >
                                    <path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                                </svg>
                            </div>
                            <div className="flex flex-col gap-1">
                                <h2 className="text-[#111418] text-base font-bold leading-tight">{store}</h2>
                                <p className="text-[#60758a] text-sm font-normal leading-normal">8:00 AM - 9:30 PM</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex gap-2 border-t border-[#f0f2f5] bg-white px-4 pb-3 pt-2 mb-4">
                <a
                    className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                    href="/"
                >
                    <div className="text-[#60758a] flex h-8 items-center justify-center" data-icon="Buildings" data-size="24px" data-weight="regular">
                        <MallIcon />
                    </div>
                    <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">Mall</p>
                </a>
                <a
                    className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                    href="/"
                >
                    <div className="text-[#60758a] flex h-8 items-center justify-center" data-icon="MapPin" data-size="24px" data-weight="regular">
                        <MapMarker />
                    </div>
                    <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">Map</p>
                </a>
                <a
                    className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#111418]"
                    href="/"
                >
                    <div className="text-[#111418] flex h-8 items-center justify-center" data-icon="Storefront" data-size="24px" data-weight="regular">
                        <StoreIcon />
                    </div>
                    <p className="text-[#111418] text-xs font-medium leading-normal tracking-[0.015em]">Stores</p>
                </a>
                <a
                    className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#60758a]"
                    href="/"
                >
                    <div className="text-[#60758a] flex h-8 items-center justify-center" data-icon="Tag" data-size="24px" data-weight="regular">
                        <Tag />
                    </div>
                    <p className="text-[#60758a] text-xs font-medium leading-normal tracking-[0.015em]">Deals</p>
                </a>
            </div>
        </div>
    );
}

export default StoreHours;
