import { Job } from "../models/job.model.js";

// admin post krega job
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId, workMode } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId,
            workMode: workMode || 'On-site'
        });
        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const location = req.query.location || "";
        const workMode = req.query.workMode || "";
        const experience = req.query.experience || "";
        
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9;
        const skip = (page - 1) * limit;

        let query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        if (location) {
            query.location = { $regex: location, $options: "i" };
        }
        if (workMode) {
            query.workMode = workMode;
        }
        if (experience) {
            // Assuming experience is sent as a number (e.g., "0", "2", "5")
            query.experienceLevel = { $gte: Number(experience) };
        }

        const totalJobs = await Job.countDocuments(query);
        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };

        return res.status(200).json({
            jobs,
            totalJobs,
            totalPages: Math.ceil(totalJobs / limit),
            currentPage: page,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
// student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if (!job) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
    }
}
// admin kitne job create kra hai abhi tk
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        });
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        };
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getRecruiterStats = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: 'applications'
        });

        if (!jobs) {
            return res.status(404).json({
                message: "No jobs found.",
                success: false
            });
        }

        let totalApplications = 0;
        const statusCounts = {
            pending: 0,
            shortlisted: 0,
            interview: 0,
            accepted: 0,
            rejected: 0
        };

        const jobStats = jobs.map(job => {
            const appCount = job.applications.length;
            totalApplications += appCount;
            
            job.applications.forEach(app => {
                if (statusCounts[app.status] !== undefined) {
                    statusCounts[app.status]++;
                }
            });

            return {
                name: job.title.length > 15 ? job.title.substring(0, 15) + "..." : job.title,
                applications: appCount
            };
        });

        // Convert statusCounts to array for pie chart
        const pieData = Object.keys(statusCounts).map(status => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: statusCounts[status]
        })).filter(item => item.value > 0);

        return res.status(200).json({
            success: true,
            stats: {
                totalJobs: jobs.length,
                totalApplications,
                statusCounts,
                jobStats,
                pieData
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
