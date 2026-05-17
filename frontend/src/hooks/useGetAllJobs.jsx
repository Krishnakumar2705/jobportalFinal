import { setAllJobs, setPagination } from '@/redux/jobSlice'
import { JOB_API_END_POINT, EXTERNAL_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (page = 1) => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const { searchedQuery } = useSelector(store => store.job);
    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                setLoading(true);
                // Fetch from the live external jobs API instead of internal MongoDB jobs
                const res = await axios.get(`${EXTERNAL_JOB_API_END_POINT}/live?page=${page}`, { withCredentials: true });
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
        fetchAllJobs();
    }, [searchedQuery, page, dispatch])

    return { loading };
}

export default useGetAllJobs