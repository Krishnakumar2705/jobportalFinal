import axios from 'axios';

export const getLiveJobs = async (req, res) => {
    try {
        const page = req.query.page || 1;
        // Search functionality is limited on this API without premium, 
        // but we'll pass standard pagination.
        const response = await axios.get(`https://www.arbeitnow.com/api/job-board-api?page=${page}`);
        
        const { data, meta } = response.data;
        
        // Normalize external data to internal format
        const normalizedJobs = data.map(job => ({
            _id: job.slug,
            title: job.title,
            description: job.description,
            company: { 
                name: job.company_name, 
                logo: "" 
            },
            location: job.location,
            salary: 0, 
            jobType: job.job_types && job.job_types.length > 0 ? job.job_types[0] : 'Full-time',
            position: 1,
            workMode: job.remote ? 'Remote' : 'On-site',
            experienceLevel: 0,
            createdAt: new Date(job.created_at * 1000).toISOString(),
            tags: job.tags,
            url: job.url,
            isExternal: true
        }));

        // The API meta doesn't provide a strict total, so we estimate based on the pagination.
        // It provides 100 jobs per page.
        return res.status(200).json({
            jobs: normalizedJobs,
            currentPage: meta?.current_page || 1,
            totalPages: 10, // Estimate 10 pages for 1000 jobs
            totalJobs: 1000, 
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to fetch live jobs",
            success: false
        });
    }
};
