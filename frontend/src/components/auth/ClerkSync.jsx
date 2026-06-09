import React, { useEffect, useState } from 'react';
import { useUser, useClerk } from '@clerk/react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { RadioGroup } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, UserCheck, GraduationCap, Briefcase } from 'lucide-react';

export default function ClerkSync() {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const dispatch = useDispatch();
  const reduxUser = useSelector((state) => state.auth.user);
  
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;

    const syncUser = async () => {
      if (isSignedIn && clerkUser) {
        // Redux user doesn't exist or doesn't match the signed-in clerk user email
        if (!reduxUser || reduxUser.email !== clerkUser.primaryEmailAddress?.emailAddress) {
          try {
            const res = await axios.post(
              `${USER_API_END_POINT}/clerk-sync`,
              {
                email: clerkUser.primaryEmailAddress?.emailAddress,
                fullname: clerkUser.fullName || clerkUser.username || "User",
                imageUrl: clerkUser.imageUrl,
              },
              { withCredentials: true }
            );

            if (res.data.success) {
              if (res.data.needsRole) {
                setShowRoleModal(true);
              } else {
                dispatch(setUser(res.data.user));
              }
            }
          } catch (error) {
            console.error('Clerk Sync Error:', error);
            toast.error('Failed to sync authentication state');
          }
        }
      } else if (!isSignedIn && reduxUser) {
        // Logged out of Clerk, but still logged in Redux
        dispatch(setUser(null));
      }
    };

    syncUser();
  }, [isLoaded, isSignedIn, clerkUser, reduxUser, dispatch]);

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Please select a role');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(
        `${USER_API_END_POINT}/clerk-sync`,
        {
          email: clerkUser.primaryEmailAddress?.emailAddress,
          fullname: clerkUser.fullName || clerkUser.username || "User",
          imageUrl: clerkUser.imageUrl,
          role: selectedRole,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        setShowRoleModal(false);
        toast.success(`Registered successfully as a ${selectedRole}`);
      }
    } catch (error) {
      console.error('Role setup error:', error);
      toast.error('Failed to save selected role');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = async () => {
    await signOut();
    setShowRoleModal(false);
  };

  if (!showRoleModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 animate-in fade-in">
      <div className="w-full max-w-md bg-white border border-gray-100 dark:border-zinc-800 rounded-2xl shadow-2xl p-8 transform transition-all scale-95 hover:scale-100 duration-300 mx-4">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
            <UserCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Complete your profile</h2>
          <p className="text-sm text-gray-500 mt-2">Please select your account type to proceed.</p>
        </div>

        <form onSubmit={handleRoleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Student Role Option */}
            <div
              onClick={() => setSelectedRole('student')}
              className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedRole === 'student'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <GraduationCap className="w-8 h-8 mb-3" />
              <span className="font-semibold text-sm">Student</span>
            </div>

            {/* Recruiter Role Option */}
            <div
              onClick={() => setSelectedRole('recruiter')}
              className={`flex flex-col items-center justify-center p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedRole === 'recruiter'
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-600 scale-[1.02]'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              <Briefcase className="w-8 h-8 mb-3" />
              <span className="font-semibold text-sm">Recruiter</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-6 text-base font-semibold bg-[#6A38C2] hover:bg-[#5b30a6] transition-colors rounded-xl shadow-lg shadow-indigo-100"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving role...
                </>
              ) : (
                'Continue'
              )}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancel}
              className="w-full text-gray-500 hover:text-gray-800"
            >
              Cancel & Sign Out
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
