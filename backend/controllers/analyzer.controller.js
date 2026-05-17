import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import axios from 'axios';

const TECH_SKILLS = [
    "javascript", "react", "node", "python", "aws", "docker", "kubernetes", 
    "java", "c++", "sql", "mongodb", "git", "agile", "html", "css", 
    "typescript", "express", "next.js", "tailwind", "redux", "postgresql", 
    "linux", "azure", "gcp", "machine learning", "data science", "devops"
];

export const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Please upload a resume file." });
        }

        // 1. Extract Text
        const pdfData = await pdfParse(req.file.buffer);
        const text = pdfData.text.toLowerCase();

        // 2. Detect Skills
        const detectedSkills = TECH_SKILLS.filter(skill => text.includes(skill.toLowerCase()));
        const missingSkills = TECH_SKILLS.filter(skill => !detectedSkills.includes(skill)).sort(() => 0.5 - Math.random()).slice(0, 5);

        // 3. ATS Score Logic
        let score = 40; // Base score
        score += (detectedSkills.length * 5); // +5 for each tech skill
        
        // Basic heuristics for contact info and sections
        if (text.includes('@') && text.includes('.com')) score += 10;
        if (text.match(/\d{10}/)) score += 5; // Phone number basic check
        if (text.includes('experience') || text.includes('employment')) score += 5;
        if (text.includes('education')) score += 5;

        score = Math.min(score, 100);

        // 4. Suggest Matching Jobs from external API
        let recommendedJobs = [];
        try {
            const response = await axios.get(`https://www.arbeitnow.com/api/job-board-api?page=1`);
            const allJobs = response.data.data;
            
            // Normalize and score jobs based on matched skills
            const scoredJobs = allJobs.map(job => {
                const jobText = (job.description + " " + job.title + " " + (job.tags || []).join(" ")).toLowerCase();
                let matchCount = 0;
                detectedSkills.forEach(skill => {
                    if (jobText.includes(skill)) matchCount++;
                });
                
                return {
                    _id: job.slug,
                    title: job.title,
                    description: job.description,
                    company: { name: job.company_name, logo: "" },
                    location: job.location,
                    salary: 0, 
                    jobType: job.job_types && job.job_types.length > 0 ? job.job_types[0] : 'Full-time',
                    position: 1,
                    workMode: job.remote ? 'Remote' : 'On-site',
                    createdAt: new Date(job.created_at * 1000).toISOString(),
                    tags: job.tags,
                    url: job.url,
                    isExternal: true,
                    matchCount
                };
            });

            // Sort by matchCount descending and take top 5
            recommendedJobs = scoredJobs.sort((a, b) => b.matchCount - a.matchCount).slice(0, 5);

        } catch (error) {
            console.log("Error fetching recommended jobs:", error);
        }

        return res.status(200).json({
            success: true,
            score,
            detectedSkills,
            missingSkills,
            recommendedJobs
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while analyzing the resume."
        });
    }
};
