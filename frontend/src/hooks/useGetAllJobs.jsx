import { setAllJobs, setPagination } from '@/redux/jobSlice'
import { JOB_API_END_POINT, EXTERNAL_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (page = 1) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { searchedQuery, filterData } = useSelector(store => store.job) || {};

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoading(true);
                
                // Build query params for JSearch backend
                const queryParams = new URLSearchParams();
                queryParams.append('page', page);
                
                if (searchedQuery) queryParams.append('keyword', searchedQuery);
                if (filterData) {
                    if (filterData.location) queryParams.append('location', filterData.location);
                    if (filterData.industry) queryParams.append('industry', filterData.industry);
                    if (filterData.workMode) queryParams.append('workMode', filterData.workMode);
                    if (filterData.experience) queryParams.append('experience', filterData.experience);
                    if (filterData.employmentType) queryParams.append('employmentType', filterData.employmentType);
                }

                const res = await axios.get(`${EXTERNAL_JOB_API_END_POINT}/live?${queryParams.toString()}`, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setAllJobs(res.data.jobs));
                    dispatch(setPagination({
                        currentPage: res.data.currentPage,
                        totalPages: res.data.totalPages,
                        totalJobs: res.data.totalJobs
                    }));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        
        // Add a slight debounce to prevent spamming the RapidAPI endpoint
        const timer = setTimeout(() => {
            fetchAllJobs();
        }, 300);
        
        return () => clearTimeout(timer);
    }, [searchedQuery, filterData, page, dispatch])

    return { loading };
}

export default useGetAllJobs