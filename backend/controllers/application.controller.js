import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import sendEmail from "../utils/sendEmail.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false
            });
        }

        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });

        job.applications.push(newApplication._id);
        await job.save();

        // Send email notification to student
        const user = await User.findById(userId);
        if (user) {
            const message = `Hello ${user.fullname},\n\nYou have successfully applied for the position of "${job.title}". The recruiter will review your application soon.\n\nBest of luck!\nJobPortal Team`;
            try {
                await sendEmail({
                    email: user.email,
                    subject: `Application Submitted: ${job.title}`,
                    message
                });
            } catch (error) {
                console.log("Application email failed:", error);
            }
        }

        return res.status(201).json({
            message:"Job applied successfully.",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
};
export const getAppliedJobs = async (req,res) => {
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{createdAt:-1}},
            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Applications",
                success:false
            })
        };
        return res.status(200).json({
            application,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message:'status is required',
                success:false
            })
        };

        // find the application by applicantion id
        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found.",
                success:false
            })
        };

        // update the status
        application.status = status.toLowerCase();
        await application.save();

        // Send email notification to student
        const populatedApplication = await Application.findById(applicationId).populate('applicant').populate('job');
        if (populatedApplication && populatedApplication.applicant) {
            const student = populatedApplication.applicant;
            const jobTitle = populatedApplication.job.title;
            const currentStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

            let message = `Hello ${student.fullname},\n\nYour application status for the position of "${jobTitle}" has been updated to: ${currentStatus}.`;
            
            if (status.toLowerCase() === 'accepted') {
                message += "\n\nCongratulations! The recruiter will contact you for the next steps.";
            } else if (status.toLowerCase() === 'shortlisted') {
                message += "\n\nYou have been shortlisted! Keep an eye on your messages.";
            }

            message += "\n\nRegards,\nJobPortal Team";

            try {
                await sendEmail({
                    email: student.email,
                    subject: `Application Status Updated: ${jobTitle}`,
                    message
                });
            } catch (error) {
                console.log("Status update email failed:", error);
            }
        }

        return res.status(200).json({
            message:"Status updated successfully.",
            success:true
        });

    } catch (error) {
        console.log(error);
    }
}