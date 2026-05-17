import { JOB_API_END_POINT, USER_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetSavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${USER_API_END_POINT}/saved-jobs`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSavedJobs();
    }, [])

    return { savedJobs, loading };
}

export default useGetSavedJobs
