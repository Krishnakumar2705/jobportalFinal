import React from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);

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
                        <Show when="signed-out">
                            <div className='flex items-center gap-2'>
                                <SignInButton mode="modal">
                                    <Button variant="outline" size="sm" className="md:text-base">Login</Button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <Button size="sm" className="bg-[#6A38C2] hover:bg-[#5b30a6] md:text-base">Signup</Button>
                                </SignUpButton>
                            </div>
                        </Show>
                        <Show when="signed-in">
                            <div className='flex items-center gap-4'>
                                {user && (
                                    <Link to="/profile" className="text-sm font-medium text-gray-700 hover:text-[#6A38C2]">
                                        Profile
                                    </Link>
                                )}
                                <UserButton afterSignOutUrl="/" />
                            </div>
                        </Show>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar