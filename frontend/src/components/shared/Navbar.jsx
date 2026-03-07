import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white border-b border-gray-200 sticky top-0 z-50'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-0'>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-2 md:gap-12'>
                    <ul className='hidden md:flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }
                    </ul>
                    <div className='flex items-center gap-2'>
                        {
                            !user ? (
                                <div className='flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline" size="sm" className="md:text-base">Login</Button></Link>
                                    <Link to="/signup"><Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6] md:text-base">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer border-2 border-gray-800 h-8 w-8 md:h-10 md:w-10">
                                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                            {!user?.profile?.profilePhoto && (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <User2 className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                                                </div>
                                            )}
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className=''>
                                            <div className='flex gap-2 items-center'>
                                                <Avatar className="cursor-pointer border-2 border-gray-800">
                                                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                                                    {!user?.profile?.profilePhoto && (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <User2 className="w-6 h-6 text-gray-600" />
                                                        </div>
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium'>{user?.fullname}</h4>
                                                    <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                                </div>
                                            </div>
                                            {/* Mobile specific Links inside Popover */}
                                            <div className='md:hidden border-t border-gray-100 mt-2 pt-2'>
                                                <ul className='text-gray-600 space-y-1 font-medium'>
                                                    {user && user.role === 'recruiter' ? (
                                                        <>
                                                            <li><Link to="/" className="block py-1">Home</Link></li>
                                                            <li><Link to="/admin/companies" className="block py-1">Companies</Link></li>
                                                            <li><Link to="/admin/jobs" className="block py-1">Jobs</Link></li>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <li><Link to="/" className="block py-1">Home</Link></li>
                                                            <li><Link to="/jobs" className="block py-1">Jobs</Link></li>
                                                            <li><Link to="/browse" className="block py-1">Browse</Link></li>
                                                        </>
                                                    )}
                                                </ul>
                                            </div>
                                            <div className='flex flex-col my-2 text-gray-600 border-t border-gray-100 pt-2'>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer hover:text-[#6A38C2]'>
                                                    <User2 className="w-4 h-4"/>
                                                    <Link to="/profile" className="text-sm font-medium">View Profile</Link>
                                                </div>
                                                <div className='flex w-fit items-center gap-2 cursor-pointer mt-2 hover:text-red-500'>
                                                    <LogOut className="w-4 h-4" />
                                                    <span onClick={logoutHandler} className="text-sm font-medium">Logout</span>
                                                </div>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar