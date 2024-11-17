import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChavronLeft from '../../components/icons/chavronLeft';
import LinkIcon from '../../components/icons/LinkIcon';
import PhoneIcon from '../../components/icons/PhoneIcon';

const MallList = () => {
    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleWebsiteClick = () => {
        window.open('https://www.westfield.com/valleyfair', '_blank'); // Open mall website
    };

    const handlePhoneClick = () => {
        window.location.href = 'tel:4082484451'; // Dial the phone number
    };
    return (
        <div
            className="relative flex size-full min-h-screen flex-col overflow-x-hidden"
        >
            {/* Header */}
            <div className="flex items-center p-4 pb-2 justify-between">
                <div className="flex size-12 shrink-0 items-center cursor-pointer" onClick={handleBackClick}>
                    <ChavronLeft />
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-grow text-center">
                    Malls
                </h2>
            </div>

            <div className="flex flex-col items-center gap-6 px-4 min-h-[72px] py-2">
                <div className="flex flex-col justify-center items-center">
                    <p className="text-base font-medium leading-normal line-clamp-1 text-center">
                        Westfield Valley Fair
                    </p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal line-clamp-2 text-center">
                        2855 Stevens Creek Blvd, Santa Clara, CA 95050
                    </p>
                </div>
            </div>

            {/* Contact Details */}
            <div className="flex items-center gap-4 px-4 min-h-14 justify-between cursor-pointer" onClick={handleWebsiteClick}>
                <p className="text-base font-normal leading-normal flex-1 truncate">Website</p>
                <div className="shrink-0">
                    <LinkIcon />
                </div>
            </div>

            {/* Social Links */}
            {['Facebook', 'Instagram', 'Twitter'].map((social, index) => (
                <div key={index} className="flex items-center gap-4 px-4 min-h-14 justify-between cursor-pointer">
                    <p className=" text-base font-normal leading-normal flex-1 truncate">{social}</p>
                    <div className="shrink-0">
                        <LinkIcon />
                    </div>
                </div>
            ))}

            {/* Phone Details */}
            <div className="flex gap-4 px-4 py-3 justify-between cursor-pointer" onClick={handlePhoneClick}>
                <div className="flex flex-1 flex-col justify-center">
                    <p className=" text-base font-medium leading-normal">Phone</p>
                    <p className="text-[#60758a] text-sm font-normal leading-normal">408 248 4451</p>
                </div>
                <PhoneIcon />
            </div>

            {/* Hours */}
            <div className="flex items-center gap-4  px-4 py-3 justify-between cursor-pointer">
                <p>Hours</p>
                <div className="shrink-0">
                    <LinkIcon />
                </div>
            </div>
        </div >
    );
}

export default MallList;
