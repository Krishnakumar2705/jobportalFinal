import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Browse = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading } = useGetAllJobs(currentPage);

    const { allJobs, pagination } = useSelector(store => store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch])

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 md:px-0'>
                <h1 className='font-bold text-xl my-10'>Search Results ({pagination.totalJobs})</h1>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                        loading ? (
                            [1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item} className='p-5 rounded-md shadow-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-sm text-gray-500 dark:text-gray-400'><Skeleton width={80} /></p>
                                        <div className="rounded-full"><Skeleton circle width={30} height={30} /></div>
                                    </div>
                                    <div className='flex items-center gap-2 my-2'>
                                        <div className="p-1">
                                            <Skeleton circle width={40} height={40} />
                                        </div>
                                        <div>
                                            <h1 className='font-medium text-lg'><Skeleton width={120} /></h1>
                                            <p className='text-sm text-gray-500'><Skeleton width={80} /></p>
                                        </div>
                                    </div>
                                    <div>
                                        <h1 className='font-bold text-lg my-2'><Skeleton width={150} /></h1>
                                        <div className='text-sm text-gray-600'><Skeleton count={2} /></div>
                                    </div>
                                    <div className='flex items-center gap-2 mt-4'>
                                        <Skeleton width={80} height={25} />
                                        <Skeleton width={80} height={25} />
                                        <Skeleton width={80} height={25} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            allJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job} />
                                )
                            })
                        )
                    }
                </div>

                {/* Pagination Controls */}
                {pagination.totalPages > 1 && (
                    <div className='flex items-center justify-center gap-4 mt-12 py-6 border-t border-gray-100 dark:border-gray-800'>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="flex items-center gap-1"
                        >
                            <ChevronLeft className="h-4 w-4" /> Previous
                        </Button>
                        
                        <div className='flex items-center gap-2'>
                            {[...Array(pagination.totalPages)].map((_, index) => (
                                <Button
                                    key={index + 1}
                                    variant={currentPage === index + 1 ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`h-8 w-8 p-0 ${currentPage === index + 1 ? 'bg-[#6A38C2] hover:bg-[#5b30a6]' : ''}`}
                                >
                                    {index + 1}
                                </Button>
                            ))}
                        </div>

                        <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === pagination.totalPages}
                            className="flex items-center gap-1"
                        >
                            Next <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Browse