import React from 'react';

export default function ManageCard() {
    return (
        <div className='w-[22em] h-72 bg-[#24282c] rounded-md relative flex flex-col justify-end'>
            <div className='absolute w-[14em] h-32 -top-2 right-4 rounded-md bg-[#32363a] p-2 flex flex-col'>
                <div className='flex flex-col justify-between gap-4'>
                    <div className='flex justify-between items-center'>
                        <div className='text-[.4em] text-center text-[#ffa366] font-bold bg-white rounded-full px-[.5em] py-[.2em] w-[4em]'>video</div>
                        <div className='text-[.4em] text-slate-400'>28 minutes ago</div>
                    </div>
                    <div className='bg-white w-[8em] h-[5em] rounded-lg'>
                        {/* vide card */}
                    </div>
                </div>
            </div>
            <div className='flex justify-between items-center absolute bottom-0 right-4 top-0 w-[13em]'>
                <div className='text-[.4em] text-center text-[#ffa366] font-bold bg-white rounded-full px-[.5em] py-[.2em] w-[4em]'>video</div>
                <div className='text-[.4em] text-slate-400'>28 minutes ago</div>
                <div className='flex justify-between items-center bg-white w-[10em] h-[7em] rounded-lg absolute bottom-[1em] '>
                    {/* video card */}
                </div>
            </div>
            <div className='absolute w-[8em] h-[16em] bg-[#31363a] rounded-md -left-6 top-4 p-1 text-slate-300'>
                <div className='flex flex-col gap-1 text-[.5em]'>
                    <span className='text-white px-1'>INBOX</span>
                    <div className='flex flex-col gap-1'>
                        <div className='px-2 py-1 bg-[#414549] rounded-lg flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#a07fb6] w-[.7em] h-[.6em] rounded-full' />
                                <span>All</span>
                            </div>
                            <p>93</p>
                        </div>
                        <div className='px-2 py-1  flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#ffa241] w-[.7em] h-[.6em] rounded-full' />
                                <span>Video</span>
                            </div>
                            <p>43</p>
                        </div>
                        <div className='px-2 py-1 flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#389df8] w-[.7em] h-[.6em] rounded-full' />
                                <span>Text</span>
                            </div>
                            <p>50</p>
                        </div>
                        <div className='px-2 py-1 flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#3d5a68] w-[.7em] h-[.6em] rounded-full' />
                                <span>Archived</span>
                            </div>
                            <p>0</p>
                        </div>
                        <div className='px-2 py-1 flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#ff694c] w-[.7em] h-[.6em] rounded-full' />
                                <span>Liked</span>
                            </div>
                            <p>0</p>
                        </div>
                        <div className='px-2 py-1 flex justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div className='bg-[#129275] w-[.7em] h-[.6em] rounded-full' />
                                <span>Service</span>
                            </div>
                            <p>2</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-1 text-[.5em]'>
                    <span className='text-white px-1'>INBOX</span>
                    <div className='px-2 py-1 flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-[#a07fb6] w-[.7em] h-[.6em] rounded-full' />
                            <span>Social Media</span>
                        </div>
                        <p>93</p>
                    </div>
                    <div className='px-2 py-1  flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-[#ffa241] w-[.7em] h-[.6em] rounded-full' />
                            <span>External Videos</span>
                        </div>
                        <p>43</p>
                    </div>
                    <div className='px-2 py-1 flex justify-between'>
                        <div className='flex gap-2 items-center'>
                            <div className='bg-[#389df8] w-[.7em] h-[.6em] rounded-full' />
                            <span>Other reviews</span>
                        </div>
                        <p>50</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
