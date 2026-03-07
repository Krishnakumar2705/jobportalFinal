import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

// const skills = ["Html", "Css", "Javascript", "Reactjs"]
const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const {user} = useSelector(store=>store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-4 md:p-8 mx-4 sm:mx-auto shadow-sm'>
                <div className='flex flex-col sm:flex-row justify-between gap-4'>
                    <div className='flex items-center gap-4'>
                        <Avatar className="h-20 w-20 md:h-24 md:w-24">
                            <AvatarImage src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} alt="profile" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl md:text-2xl'>{user?.fullname}</h1>
                            <p className='text-gray-600 text-sm md:text-base'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} className="sm:text-right w-fit sm:w-auto" variant="outline"><Pen className='w-4 h-4 mr-1' /> Edit</Button>
                </div>
                <div className='my-5 space-y-3'>
                    <div className='flex items-center gap-3 text-gray-700'>
                        <Mail className='w-5 h-5' />
                        <span className='text-sm md:text-base'>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 text-gray-700'>
                        <Contact className='w-5 h-5' />
                        <span className='text-sm md:text-base'>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1 className='font-bold text-lg mb-2'>Skills</h1>
                    <div className='flex flex-wrap items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index} className="bg-gray-800">{item}</Badge>) : <span className='text-gray-500'>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <Label className="text-md font-bold">Resume</Label>
                    {
                        isResume ? <a target='_blank' rel="noopener noreferrer" href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer text-sm md:text-base'>{user?.profile?.resumeOriginalName || 'Download Resume'}</a> : <span className='text-gray-500'>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl p-4 md:p-0'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <div className='overflow-x-auto'>
                    <AppliedJobTable />
                </div>
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile