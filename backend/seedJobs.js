import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";
import bcrypt from "bcryptjs";

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
        const companies = await Company.insertMany([
            {
                name: "Tech Innovators Inc",
                description: "Leading technology company specializing in AI and ML solutions",
                website: "https://techinnovators.com",
                location: "Bangalore",
                logo: "https://via.placeholder.com/150",
                userId: recruiter._id
            },
            {
                name: "Digital Solutions Ltd",
                description: "Full-stack web development and digital marketing agency",
                website: "https://digitalsolutions.com",
                location: "Mumbai",
                logo: "https://via.placeholder.com/150",
                userId: recruiter._id
            },
            {
                name: "Creative Designs Studio",
                description: "Award-winning design and branding agency",
                website: "https://creativedesigns.com",
                location: "Delhi NCR",
                logo: "https://via.placeholder.com/150",
                userId: recruiter._id
            },
            {
                name: "Data Analytics Corp",
                description: "Big data and analytics consulting firm",
                website: "https://dataanalytics.com",
                location: "Hyderabad",
                logo: "https://via.placeholder.com/150",
                userId: recruiter._id
            },
            {
                name: "Cloud Systems Pro",
                description: "Cloud infrastructure and DevOps solutions provider",
                website: "https://cloudsystems.com",
                location: "Pune",
                logo: "https://via.placeholder.com/150",
                userId: recruiter._id
            }
        ]);
        console.log('Companies created');

        // Create jobs
        const jobs = [
            {
                title: "Frontend Developer",
                description: "We are looking for a skilled Frontend Developer to join our team. You will be responsible for building responsive and interactive web applications using modern frameworks.",
                requirements: ["React.js", "JavaScript", "HTML/CSS", "Tailwind CSS", "Git"],
                salary: 800000,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-time",
                position: 3,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases required.",
                requirements: ["Node.js", "Express.js", "MongoDB", "REST API", "Docker"],
                salary: 900000,
                experienceLevel: 3,
                location: "Mumbai",
                jobType: "Full-time",
                position: 2,
                company: companies[1]._id,
                created_by: recruiter._id
            },
            {
                title: "Full Stack Developer",
                description: "Looking for a versatile Full Stack Developer who can work on both frontend and backend technologies.",
                requirements: ["React.js", "Node.js", "MongoDB", "Express.js", "TypeScript"],
                salary: 1200000,
                experienceLevel: 4,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Data Scientist",
                description: "Seeking a Data Scientist to analyze complex datasets and build machine learning models.",
                requirements: ["Python", "Machine Learning", "TensorFlow", "Pandas", "SQL"],
                salary: 1500000,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full-time",
                position: 2,
                company: companies[3]._id,
                created_by: recruiter._id
            },
            {
                title: "UI/UX Designer",
                description: "Creative UI/UX Designer needed to design beautiful and intuitive user interfaces.",
                requirements: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
                salary: 700000,
                experienceLevel: 2,
                location: "Delhi NCR",
                jobType: "Full-time",
                position: 1,
                company: companies[2]._id,
                created_by: recruiter._id
            },
            {
                title: "Graphic Designer",
                description: "Join our creative team as a Graphic Designer to create stunning visual content.",
                requirements: ["Photoshop", "Illustrator", "InDesign", "Branding", "Typography"],
                salary: 600000,
                experienceLevel: 1,
                location: "Delhi NCR",
                jobType: "Full-time",
                position: 2,
                company: companies[2]._id,
                created_by: recruiter._id
            },
            {
                title: "DevOps Engineer",
                description: "DevOps Engineer to manage cloud infrastructure and CI/CD pipelines.",
                requirements: ["AWS", "Docker", "Kubernetes", "Jenkins", "Linux"],
                salary: 1300000,
                experienceLevel: 4,
                location: "Pune",
                jobType: "Full-time",
                position: 2,
                company: companies[4]._id,
                created_by: recruiter._id
            },
            {
                title: "Mobile App Developer",
                description: "Develop cross-platform mobile applications using React Native or Flutter.",
                requirements: ["React Native", "Flutter", "JavaScript", "Mobile UI", "API Integration"],
                salary: 950000,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "QA Engineer",
                description: "Quality Assurance Engineer to ensure software quality through testing.",
                requirements: ["Manual Testing", "Automation Testing", "Selenium", "JIRA", "API Testing"],
                salary: 650000,
                experienceLevel: 2,
                location: "Mumbai",
                jobType: "Full-time",
                position: 3,
                company: companies[1]._id,
                created_by: recruiter._id
            },
            {
                title: "Product Manager",
                description: "Lead product development and strategy for our flagship products.",
                requirements: ["Product Strategy", "Agile", "User Stories", "Market Research", "Analytics"],
                salary: 1800000,
                experienceLevel: 5,
                location: "Bangalore",
                jobType: "Full-time",
                position: 1,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Business Analyst",
                description: "Analyze business requirements and translate them into technical specifications.",
                requirements: ["Business Analysis", "SQL", "Excel", "Documentation", "Stakeholder Management"],
                salary: 850000,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full-time",
                position: 2,
                company: companies[3]._id,
                created_by: recruiter._id
            },
            {
                title: "Digital Marketing Specialist",
                description: "Drive digital marketing campaigns across multiple channels.",
                requirements: ["SEO", "Google Ads", "Social Media Marketing", "Content Marketing", "Analytics"],
                salary: 600000,
                experienceLevel: 2,
                location: "Mumbai",
                jobType: "Full-time",
                position: 2,
                company: companies[1]._id,
                created_by: recruiter._id
            },
            {
                title: "Content Writer",
                description: "Create engaging content for blogs, websites, and marketing materials.",
                requirements: ["Content Writing", "SEO Writing", "Research", "Editing", "WordPress"],
                salary: 450000,
                experienceLevel: 1,
                location: "Delhi NCR",
                jobType: "Full-time",
                position: 3,
                company: companies[2]._id,
                created_by: recruiter._id
            },
            {
                title: "Cybersecurity Analyst",
                description: "Protect our systems and data from security threats.",
                requirements: ["Network Security", "Penetration Testing", "SIEM", "Firewall", "Incident Response"],
                salary: 1100000,
                experienceLevel: 3,
                location: "Pune",
                jobType: "Full-time",
                position: 1,
                company: companies[4]._id,
                created_by: recruiter._id
            },
            {
                title: "Machine Learning Engineer",
                description: "Build and deploy machine learning models at scale.",
                requirements: ["Python", "TensorFlow", "PyTorch", "MLOps", "Deep Learning"],
                salary: 1600000,
                experienceLevel: 4,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Frontend Developer Intern",
                description: "Internship opportunity for aspiring frontend developers to learn and grow.",
                requirements: ["HTML", "CSS", "JavaScript", "React basics", "Git"],
                salary: 200000,
                experienceLevel: 0,
                location: "Mumbai",
                jobType: "Internship",
                position: 5,
                company: companies[1]._id,
                created_by: recruiter._id
            },
            {
                title: "Backend Developer Intern",
                description: "Learn backend development with hands-on projects and mentorship.",
                requirements: ["Node.js basics", "JavaScript", "Database basics", "Git", "Problem Solving"],
                salary: 200000,
                experienceLevel: 0,
                location: "Bangalore",
                jobType: "Internship",
                position: 4,
                company: companies[0]._id,
                created_by: recruiter._id
            },
            {
                title: "Data Analyst",
                description: "Analyze data and create reports to support business decisions.",
                requirements: ["SQL", "Excel", "Power BI", "Python", "Statistics"],
                salary: 700000,
                experienceLevel: 2,
                location: "Hyderabad",
                jobType: "Full-time",
                position: 2,
                company: companies[3]._id,
                created_by: recruiter._id
            },
            {
                title: "Cloud Architect",
                description: "Design and implement cloud infrastructure solutions.",
                requirements: ["AWS", "Azure", "Cloud Architecture", "Terraform", "Microservices"],
                salary: 2000000,
                experienceLevel: 6,
                location: "Pune",
                jobType: "Full-time",
                position: 1,
                company: companies[4]._id,
                created_by: recruiter._id
            },
            {
                title: "React Native Developer",
                description: "Build mobile applications for iOS and Android using React Native.",
                requirements: ["React Native", "JavaScript", "Redux", "Mobile Development", "REST API"],
                salary: 1000000,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full-time",
                position: 2,
                company: companies[0]._id,
                created_by: recruiter._id
            }
        ];

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
