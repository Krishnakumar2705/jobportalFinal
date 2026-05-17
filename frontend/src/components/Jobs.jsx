import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Jobs = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { loading } = useGetAllJobs(currentPage);

    const { allJobs, searchedQuery, filterData, pagination } = useSelector(store => store.job) || {};
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        let filteredJobs = [...allJobs];

        // 1. Filter by searchedQuery (Keyword from HeroSection or Browse)
        if (searchedQuery) {
            filteredJobs = filteredJobs.filter((job) => {
                return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            });
        }

        // 2. Filter by filterData (Sidebar independent categories)
        if (filterData) {
            const { location, industry, salary, workMode, experience } = filterData;

            if (location) {
                filteredJobs = filteredJobs.filter(job => 
                    job.location.toLowerCase().includes(location.toLowerCase())
                );
            }
            if (industry) {
                filteredJobs = filteredJobs.filter(job => 
                    job.title.toLowerCase().includes(industry.toLowerCase()) || 
                    job.description.toLowerCase().includes(industry.toLowerCase())
                );
            }
            if (salary) {
                filteredJobs = filteredJobs.filter(job => {
                    if (salary === '0-40k') return job.salary >= 0 && job.salary <= 40000;
                    if (salary === '42-1lakh') return job.salary >= 42000 && job.salary <= 100000;
                    if (salary === '1lakh to 5lakh') return job.salary >= 100000 && job.salary <= 500000;
                    if (salary === '5lakh+') return job.salary >= 500000;
                    return true;
                });
            }
            if (workMode) {
                filteredJobs = filteredJobs.filter(job => 
                    job.workMode?.toLowerCase() === workMode.toLowerCase()
                );
            }
            if (experience) {
                filteredJobs = filteredJobs.filter(job => {
                    if (experience === '0-2 years') return job.experienceLevel >= 0 && job.experienceLevel <= 2;
                    if (experience === '2-5 years') return job.experienceLevel > 2 && job.experienceLevel <= 5;
                    if (experience === '5-10 years') return job.experienceLevel > 5 && job.experienceLevel <= 10;
                    if (experience === '10+ years') return job.experienceLevel > 10;
                    return true;
                });
            }
        }

        setFilterJobs(filteredJobs)
    }, [allJobs, searchedQuery, filterData]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            setCurrentPage(newPage);
            // Scroll to top of job list
            const jobContainer = document.getElementById('job-container');
            if (jobContainer) jobContainer.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5 px-4 md:px-0'>
                <div className='flex flex-col md:flex-row gap-5'>
                    <div className='w-full md:w-[20%]'>
                        <FilterCard />
                    </div>
                    {
                        loading ? (
                            <div className='flex-1 flex flex-col h-[88vh]'>
                                <div className='flex-1 overflow-y-auto pb-5 custom-scrollbar'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1'>
                                        {[1, 2, 3, 4, 5, 6].map((item) => (
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : filterJobs.length <= 0 ? <span className='flex-1 h-[88vh] flex items-center justify-center font-bold text-gray-500'>Job not found</span> : (
                            <div className='flex-1 flex flex-col h-[88vh]'>
                                <div id="job-container" className='flex-1 overflow-y-auto pb-5 custom-scrollbar'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1'>
                                        {
                                            filterJobs.map((job) => (
                                                <motion.div
                                                    initial={{ opacity: 0, x: 100 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -100 }}
                                                    transition={{ duration: 0.3 }}
                                                    key={job?._id}>
                                                    <Job job={job} />
                                                </motion.div>
                                            ))
                                        }
                                    </div>
                                </div>
                                {/* Pagination Controls */}
                                {pagination.totalPages > 1 && (
                                    <div className='flex items-center justify-center gap-4 py-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-300'>
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
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs