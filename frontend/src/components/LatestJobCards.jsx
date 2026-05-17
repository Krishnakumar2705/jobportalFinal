import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({job}) => {
    const navigate = useNavigate();
    return (
        <div onClick={() => job?.isExternal ? window.open(job.url, '_blank') : navigate(`/description/${job._id}`)} className='p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 cursor-pointer hover:scale-[1.02] transition-all duration-300'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{job?.location || 'Not Specified'}</p>
                </div>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                {
                    job?.isExternal ? (
                        <div className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2' dangerouslySetInnerHTML={{ __html: job?.description }}></div>
                    ) : (
                        <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>{job?.description}</p>
                    )
                }
            </div>
            <div className='flex flex-wrap items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                { !job?.isExternal && <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge> }
                { job?.workMode && <Badge className={'text-green-600 font-bold'} variant="ghost">{job?.workMode}</Badge> }
                { job?.tags?.slice(0, 3).map((tag, idx) => <Badge key={idx} className={'text-purple-600 font-bold'} variant="outline">{tag}</Badge>) }
            </div>
        </div>
    )
}

export default LatestJobCards