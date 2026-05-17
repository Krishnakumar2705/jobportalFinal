import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import useGetSavedJobs from '@/hooks/useGetSavedJobs'
import { Loader2 } from 'lucide-react'

const SavedJobs = () => {
    const { savedJobs, loading } = useGetSavedJobs();

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 md:px-0'>
                <h1 className='font-bold text-2xl my-5 text-[#6A38C2]'>Your Saved Jobs ({savedJobs.length})</h1>
                {
                    loading ? (
                        <div className='flex items-center justify-center h-[50vh]'>
                            <Loader2 className='h-12 w-12 animate-spin text-[#6A38C2]' />
                        </div>
                    ) : (
                        savedJobs.length <= 0 ? (
                            <div className='flex flex-col items-center justify-center h-[50vh] gap-4'>
                                <span className='text-xl font-medium text-gray-500'>You haven't saved any jobs yet.</span>
                            </div>
                        ) : (
                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                                {
                                    savedJobs.map((job) => (
                                        <Job key={job._id} job={job} />
                                    ))
                                }
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default SavedJobs
