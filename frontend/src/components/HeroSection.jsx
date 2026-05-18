import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10 px-4'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 dark:bg-red-950/30 dark:text-[#f87171] dark:border dark:border-red-500/20 text-[#F83002] font-semibold text-sm md:text-base shadow-sm transition-all duration-300 hover:scale-105'>
                    No. 1 Job Hunt Website
                </span>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold leading-tight dark:text-white'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2] dark:text-[#8b5cf6]'>Dream Jobs</span>
                </h1>
                <p className='text-sm md:text-base max-w-2xl mx-auto text-gray-600 dark:text-slate-400'>
                    Find your next career opportunity with top companies, connect with recruiters, and apply to jobs that match your skills directly from our platform!
                </p>
                <div className='flex w-full sm:w-[70%] md:w-[40%] shadow-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 backdrop-blur-md pl-3 rounded-full items-center gap-4 mx-auto focus-within:ring-2 focus-within:ring-[#6A38C2]/40 dark:focus-within:ring-[#8b5cf6]/40 transition-all duration-300'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full py-2 text-sm md:text-base bg-transparent dark:text-white dark:placeholder-slate-500'
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2] hover:bg-[#5b2fa7] dark:bg-[#7c3aed] dark:hover:bg-[#6d28d9] h-10 md:h-12 px-5 shadow-md transition-all duration-300 flex items-center justify-center border-none">
                        <Search className='h-5 w-5 text-white' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection