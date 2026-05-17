import React, { useState } from 'react'
import { Button } from './ui/button'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '@/redux/authSlice'

const Job = ({ job }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    
    // Check if job is already saved
    const [isSaved, setIsSaved] = useState(user?.savedJobs?.includes(job?._id));

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    const saveJobHandler = async () => {
        if (!user) {
            toast.error("Please login to save jobs");
            return navigate("/login");
        }
        try {
            const res = await axios.get(`${USER_API_END_POINT}/save-job/${job?._id}`, { withCredentials: true });
            if (res.data.success) {
                setIsSaved(res.data.isSaved);
                toast.success(res.data.message);
                
                // Update user in Redux
                const updatedSavedJobs = res.data.isSaved 
                    ? [...user.savedJobs, job?._id] 
                    : user.savedJobs.filter(id => id !== job?._id);
                
                dispatch(setUser({ ...user, savedJobs: updatedSavedJobs }));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <div className='p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
            <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
                <Button 
                    variant="outline" 
                    className={`rounded-full ${isSaved ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800' : ''}`} 
                    size="icon"
                    onClick={saveJobHandler}
                >
                    {isSaved ? <BookmarkCheck className='text-[#7209b7]' /> : <Bookmark />}
                </Button>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <Button className="p-6" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo || `https://ui-avatars.com/api/?name=${job?.company?.name}&background=random&size=150`} />
                    </Avatar>
                </Button>
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
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                { !job?.isExternal && <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge> }
                { job?.workMode && <Badge className={'text-green-600 font-bold'} variant="ghost">{job?.workMode}</Badge> }
                { job?.tags?.slice(0, 3).map((tag, idx) => <Badge key={idx} className={'text-purple-600 font-bold'} variant="outline">{tag}</Badge>) }
            </div>
            <div className='flex items-center gap-4 mt-4'>
                {
                    job?.isExternal ? (
                        <a href={job?.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline">Apply Now</Button>
                        </a>
                    ) : (
                        <Button onClick={() => navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
                    )
                }
                <Button 
                    onClick={saveJobHandler}
                    className={`${isSaved ? 'bg-gray-500' : 'bg-[#7209b7]'} text-white`}
                >
                    {isSaved ? 'Saved' : 'Save For Later'}
                </Button>
            </div>
        </div>
    )
}

export default Job