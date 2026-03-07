import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcrypt from "bcryptjs";

import { faker } from "@faker-js/faker";

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');

        // Clear existing data
        await Job.deleteMany({});
        await Company.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data');

        // Create a recruiter user
        const hashedPassword = await bcrypt.hash("password123", 10);
        const recruiter = await User.create({
            fullname: "John Recruiter",
            email: "recruiter@example.com",
            phoneNumber: 1234567890,
            password: hashedPassword,
            role: "recruiter",
            profile: {
                bio: "HR Manager",
                profilePhoto: ""
            }
        });
        console.log('Recruiter created');

        // Create companies
        const companiesData = [
            {
                name: "Tech Innovators Inc",
                description: "Leading technology company specializing in AI and ML solutions",
                website: "https://techinnovators.com",
                location: "Bangalore",
                logo: "https://ui-avatars.com/api/?name=Tech+Innovators&background=6366f1&color=fff&size=150&bold=true",
                userId: recruiter._id
            },
            {
                name: "Digital Solutions Ltd",
                description: "Full-stack web development and digital marketing agency",
                website: "https://digitalsolutions.com",
                location: "Mumbai",
                logo: "https://ui-avatars.com/api/?name=Digital+Solutions&background=8b5cf6&color=fff&size=150&bold=true",
                userId: recruiter._id
            },
            {
                name: "Creative Designs Studio",
                description: "Award-winning design and branding agency",
                website: "https://creativedesigns.com",
                location: "Delhi NCR",
                logo: "https://ui-avatars.com/api/?name=Creative+Designs&background=ec4899&color=fff&size=150&bold=true",
                userId: recruiter._id
            },
            {
                name: "Data Analytics Corp",
                description: "Big data and analytics consulting firm",
                website: "https://dataanalytics.com",
                location: "Hyderabad",
                logo: "https://ui-avatars.com/api/?name=Data+Analytics&background=14b8a6&color=fff&size=150&bold=true",
                userId: recruiter._id
            },
            {
                name: "Cloud Systems Pro",
                description: "Cloud infrastructure and DevOps solutions provider",
                website: "https://cloudsystems.com",
                location: "Pune",
                logo: "https://ui-avatars.com/api/?name=Cloud+Systems&background=f59e0b&color=fff&size=150&bold=true",
                userId: recruiter._id
            }
        ];
        
        const companies = await Company.insertMany(companiesData);
        console.log('Companies created');

        // Generate 150-200 Jobs using Faker
        const jobRoles = [
            { title: "Frontend Developer", reqs: ["React.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Git"] },
            { title: "Backend Developer", reqs: ["Node.js", "Express.js", "MongoDB", "REST API", "Docker"] },
            { title: "Full Stack Developer", reqs: ["React.js", "Node.js", "MongoDB", "Express.js", "TypeScript"] },
            { title: "Data Scientist", reqs: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"] },
            { title: "UI/UX Designer", reqs: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"] },
            { title: "Graphic Designer", reqs: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography"] },
            { title: "DevOps Engineer", reqs: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux"] },
            { title: "Mobile App Developer", reqs: ["React Native", "Flutter", "JavaScript", "Mobile UI", "API Integration"] },
            { title: "QA Engineer", reqs: ["Manual Testing", "Automation Testing", "Selenium", "JIRA", "API Testing"] },
            { title: "Product Manager", reqs: ["Product Strategy", "Agile", "User Stories", "Market Research", "Analytics"] },
            { title: "Business Analyst", reqs: ["Business Analysis", "SQL", "Excel", "Documentation", "Stakeholder"] },
            { title: "Digital Marketing Specialist", reqs: ["SEO", "Google Ads", "Social Media", "Content", "Analytics"] },
            { title: "Content Writer", reqs: ["Content Writing", "SEO Writing", "Research", "Editing", "WordPress"] },
            { title: "Cybersecurity Analyst", reqs: ["Network Security", "Penetration Testing", "SIEM", "Firewall", "Incident"] },
            { title: "Machine Learning Engineer", reqs: ["Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning"] },
            { title: "Data Analyst", reqs: ["SQL", "Excel", "Power BI", "Python", "Statistics"] },
            { title: "Cloud Architect", reqs: ["AWS", "Azure", "Cloud Architecture", "Terraform", "Microservices"] }
        ];

        const locations = ["Bangalore", "Mumbai", "Delhi NCR", "Hyderabad", "Pune", "Chennai", "Gurgaon"];
        const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];

        const jobs = [];
        
        // Create jobs with varied salary ranges
        // 30% jobs in 0-42k range (internships, entry-level)
        // 30% jobs in 42k-1lakh range (junior positions)
        // 40% jobs in 1lakh+ range (experienced positions)
        
        for (let i = 0; i < 10; i++) {
            for (const role of jobRoles) {
                const randomCompany = companies[Math.floor(Math.random() * companies.length)];
                
                // Determine salary range based on iteration
                let salary;
                if (i < 3) {
                    // 0-42k range (internships and entry-level)
                    salary = faker.number.int({ min: 15000, max: 42000 });
                } else if (i < 6) {
                    // 42k-1lakh range (junior positions)
                    salary = faker.number.int({ min: 42000, max: 100000 });
                } else {
                    // 1lakh+ range (experienced positions)
                    salary = faker.number.int({ min: 100000, max: 2500000 });
                }
                
                jobs.push({
                    title: role.title,
                    description: faker.lorem.paragraph(3) + " We are looking for passionate individuals.",
                    requirements: role.reqs,
                    salary: salary,
                    experienceLevel: faker.number.int({ min: 0, max: 8 }),
                    location: faker.helpers.arrayElement(locations),
                    jobType: faker.helpers.arrayElement(jobTypes),
                    position: faker.number.int({ min: 1, max: 10 }),
                    company: randomCompany._id,
                    created_by: recruiter._id
                });
            }
        }

        await Job.insertMany(jobs);
        console.log('Jobs created successfully');

        console.log('\n=== Seed Data Summary ===');
        console.log(`Recruiter Email: recruiter@example.com`);
        console.log(`Recruiter Password: password123`);
        console.log(`Companies Created: ${companies.length}`);
        console.log(`Jobs Created: ${jobs.length}`);
        console.log('========================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
