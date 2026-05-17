import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2, Moon, Sun, Menu } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '../ui/sheet'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();

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
        <div className='bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 transition-colors duration-300'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-4 md:px-0'>
                <div>
                    <h1 className='text-xl md:text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-2 md:gap-12'>
                    {/* Desktop Navigation */}
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
                                    <li><Link to="/saved-jobs">Saved Jobs</Link></li>
                                    <li><Link to="/analyzer">Analyzer</Link></li>
                                </>
                            )
                        }
                    </ul>
                    
                    <div className='flex items-center gap-2'>
                        {/* Desktop Login/Signup */}
                        {
                            !user ? (
                                <div className='hidden md:flex items-center gap-2'>
                                    <Link to="/login"><Button variant="outline" size="sm" className="md:text-base">Login</Button></Link>
                                    <Link to="/signup"><Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6] md:text-base">Signup</Button></Link>
                                </div>
                            ) : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer border-2 border-gray-800 h-8 w-8 md:h-10 md:w-10 hidden md:block">
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
                        
                        {/* Dark Mode Toggle */}
                        <Button 
                            variant="outline" 
                            size="icon" 
                            className="rounded-full w-8 h-8 md:w-10 md:h-10 ml-2" 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        >
                            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>

                        {/* Mobile Navigation Drawer */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="w-8 h-8">
                                        <Menu className="h-5 w-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                                    <SheetHeader>
                                        <SheetTitle className="text-left">Navigation</SheetTitle>
                                    </SheetHeader>
                                    <div className="flex flex-col mt-6 gap-4">
                                        {user && (
                                            <div className='flex gap-3 items-center mb-4 pb-4 border-b border-gray-200 dark:border-gray-800'>
                                                <Avatar className="border border-gray-300">
                                                    <AvatarImage src={user?.profile?.profilePhoto} />
                                                    {!user?.profile?.profilePhoto && (
                                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                            <User2 className="w-5 h-5 text-gray-600" />
                                                        </div>
                                                    )}
                                                </Avatar>
                                                <div>
                                                    <h4 className='font-medium leading-none'>{user?.fullname}</h4>
                                                    <p className='text-xs text-muted-foreground mt-1'>{user?.email}</p>
                                                </div>
                                            </div>
                                        )}

                                        <ul className='flex flex-col space-y-4 font-medium'>
                                            {user && user.role === 'recruiter' ? (
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
                                                    <li><Link to="/saved-jobs">Saved Jobs</Link></li>
                                                    <li><Link to="/analyzer">Analyzer</Link></li>
                                                </>
                                            )}
                                        </ul>
                                        
                                        {!user ? (
                                            <div className='flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800'>
                                                <Link to="/login"><Button variant="outline" className="w-full">Login</Button></Link>
                                                <Link to="/signup"><Button className="w-full bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                                            </div>
                                        ) : (
                                            <div className='flex flex-col gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800'>
                                                <Link to="/profile"><Button variant="outline" className="w-full flex justify-start gap-2"><User2 className="w-4 h-4"/> Profile</Button></Link>
                                                <Button variant="destructive" className="w-full flex justify-start gap-2" onClick={logoutHandler}><LogOut className="w-4 h-4" /> Logout</Button>
                                            </div>
                                        )}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar