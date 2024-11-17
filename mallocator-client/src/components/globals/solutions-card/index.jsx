import React from 'react';

export default function SolutionsCard() {
    return (
        <div className='bg-[#24282c] w-[24em] h-[20em] rounded-md relative flex items-center justify-center'>
            <div className='absolute -top-8 bg-[#c6b08a] w-48 h-40 text-center rounded-md'></div>
            <div className='absolute bottom-10 flex flex-col justify-center items-center gap-2'>
                <h1 className='text-center text-xl font-bold max-w-[12em]'>Would u like to give a testimonial</h1>
                <p className='text-xs text-slate-400'>We'd love to hear from you</p>
                <div className='flex gap-4 items-center'>
                    <button className='bg-[#7d5dfe] text-white font-medium px-[1em] py-[.5em] rounded-md max-w-[10em] text-sm'>Record a Video</button>
                    <button className='bg-[#32363a] text-white font-medium px-[1em] py-[.5em] rounded-md max-w-[10em] text-sm'>Send in text</button>
                </div>
            </div>
        </div>
    );
}
