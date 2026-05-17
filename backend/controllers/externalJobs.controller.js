import axios from 'axios';

export const getLiveJobs = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const keyword = req.query.keyword || "Software Developer jobs in India";
        
        let searchQuery = keyword;
        
        // Append filters to search query for JSearch API
        if (req.query.location) searchQuery += ` in ${req.query.location}`;
        if (req.query.industry) searchQuery += ` ${req.query.industry}`;
        if (req.query.workMode) searchQuery += ` ${req.query.workMode}`;
        if (req.query.experience) {
            if (req.query.experience.toLowerCase().includes('fresher')) searchQuery += ` entry level fresher`;
        }
        if (req.query.employmentType) searchQuery += ` ${req.query.employmentType}`;

        const options = {
            method: 'GET',
            url: 'https://jsearch.p.rapidapi.com/search',
            params: {
                query: searchQuery,
                page: page.toString(),
                num_pages: '1',
            },
            headers: {
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        };

        const response = await axios.request(options);
        const data = response.data.data || [];
        
        // Normalize JSearch data to internal format
        const normalizedJobs = data.map(job => {
            // Estimate salary if min/max available
            let salaryStr = 0;
            if (job.job_min_salary && job.job_max_salary) {
                // Approximate monthly INR salary if USD is given, just as a placeholder, or keep original
                // The frontend expects a number for salary filtering, but we can store 0 if unknown
                salaryStr = job.job_min_salary * 80; // Rough conversion for frontend dummy filters
            }

            return {
                _id: job.job_id,
                title: job.job_title,
                description: job.job_description || "No description provided.",
                company: { 
                    name: job.employer_name, 
                    logo: job.employer_logo || "" // JSearch provides real logos!
                },
                location: `${job.job_city || ''} ${job.job_country || ''}`.trim() || 'Remote',
                salary: salaryStr,
                jobType: job.job_employment_type ? job.job_employment_type.replace(/_/g, ' ') : 'Full-time',
                position: 1,
                workMode: job.job_is_remote ? 'Remote' : 'On-site',
                experienceLevel: 0,
                createdAt: job.job_posted_at_datetime_utc ? new Date(job.job_posted_at_datetime_utc).toISOString() : new Date().toISOString(),
                tags: [job.job_employment_type, job.job_is_remote ? 'Remote' : 'On-site'].filter(Boolean),
                url: job.job_apply_link,
                isExternal: true
            };
        });

        return res.status(200).json({
            jobs: normalizedJobs,
            currentPage: parseInt(page),
            totalPages: 10, // JSearch handles pagination, we estimate 10 pages
            totalJobs: 100, 
            success: true
        });

    } catch (error) {
        console.error("JSearch API Error:", error.response?.data || error.message);
        return res.status(500).json({
            message: "Failed to fetch live jobs. Please check your RapidAPI Key.",
            success: false
        });
    }
};
