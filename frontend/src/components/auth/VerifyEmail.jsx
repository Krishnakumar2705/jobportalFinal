import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const VerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            return toast.error("Please enter a valid 6-digit OTP.");
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/verify-email`, { otp }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    }

    const resendOtpHandler = async () => {
        if (!email) {
            return toast.error("Email not found. Please sign up again.");
        }

        try {
            setResendLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/resend-otp`, { email }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Failed to resend OTP");
        } finally {
            setResendLoading(false);
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-full my-5 px-4'>
                <form onSubmit={submitHandler} className='w-full sm:w-2/3 md:w-1/2 lg:w-1/3 border border-gray-200 rounded-md p-6 my-10 shadow-sm'>
                    <h1 className='font-bold text-2xl mb-2 text-[#6A38C2]'>Verify Your Email</h1>
                    <p className='text-sm text-gray-500 mb-5'>We sent a 6-digit verification code to {email || "your email"}.</p>
                    
                    <div className='my-2'>
                        <Label>Verification Code (OTP)</Label>
                        <Input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit code"
                            className="text-center text-lg tracking-widest"
                            required
                        />
                    </div>
                    
                    {
                        loading ? (
                            <Button className="w-full my-4" disabled>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Verifying
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full my-4">Verify Account</Button>
                        )
                    }

                    <div className='text-center mt-2'>
                        <span className='text-sm text-gray-600'>Didn't receive the code? </span>
                        {
                            resendLoading ? (
                                <span className='text-sm text-[#6A38C2] cursor-wait'><Loader2 className='inline h-3 w-3 animate-spin mr-1'/>Sending...</span>
                            ) : (
                                <span onClick={resendOtpHandler} className='text-sm text-[#6A38C2] hover:underline cursor-pointer font-medium'>Resend OTP</span>
                            )
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail
