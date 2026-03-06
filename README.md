# Job Portal - Full Stack MERN Application

A comprehensive job portal web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that connects job seekers with recruiters.

## 🚀 Features

### For Job Seekers (Students)
- User registration and authentication
- Browse and search jobs
- Filter jobs by location, industry, and salary
- View detailed job descriptions
- Apply for jobs
- Track application status
- Update profile with resume and skills
- View applied jobs history

### For Recruiters
- Recruiter registration and authentication
- Create and manage companies
- Post job openings
- View job applicants
- Update application status (Accept/Reject)
- Manage company profiles

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Redux Toolkit (State Management)
- Redux Persist
- React Router DOM
- Tailwind CSS
- Radix UI Components
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcrypt (Password Hashing)
- Cloudinary (File Upload)
- Multer (File Handling)
- Cookie Parser
- CORS

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- MongoDB Atlas account or local MongoDB
- Cloudinary account for file uploads

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd jobportal-yt-main
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=8000
SECRET_KEY=your_secret_key_here

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Seed Database (Optional)
To populate the database with sample data:
```bash
cd backend
npm run seed
```

This will create:
- 1 Recruiter account (Email: recruiter@example.com, Password: password123)
- 5 Companies
- 20 Job listings

### 5. Run the Application

**Start Backend Server:**
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:8000

**Start Frontend Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

## 📁 Project Structure

```
jobportal-yt-main/
├── backend/
│   ├── controllers/      # Request handlers
│   ├── models/          # Database schemas
│   ├── routes/          # API routes
│   ├── middlewares/     # Authentication & file upload
│   ├── utils/           # Helper functions
│   ├── index.js         # Entry point
│   └── seedJobs.js      # Database seeding script
│
└── frontend/
    ├── src/
    │   ├── components/  # React components
    │   ├── redux/       # State management
    │   ├── hooks/       # Custom hooks
    │   ├── utils/       # Constants & helpers
    │   └── App.jsx      # Main app component
    └── public/
```

## 🔑 API Endpoints

### User Routes
- POST `/api/v1/user/register` - Register new user
- POST `/api/v1/user/login` - User login
- GET `/api/v1/user/logout` - User logout
- POST `/api/v1/user/profile/update` - Update profile

### Company Routes
- POST `/api/v1/company/register` - Register company
- GET `/api/v1/company/get` - Get all companies
- GET `/api/v1/company/get/:id` - Get company by ID
- PUT `/api/v1/company/update/:id` - Update company

### Job Routes
- POST `/api/v1/job/post` - Post new job
- GET `/api/v1/job/get` - Get all jobs
- GET `/api/v1/job/get/:id` - Get job by ID
- GET `/api/v1/job/getadminjobs` - Get recruiter's jobs

### Application Routes
- GET `/api/v1/application/apply/:id` - Apply for job
- GET `/api/v1/application/get` - Get applied jobs
- GET `/api/v1/application/:id/applicants` - Get job applicants
- POST `/api/v1/application/status/:id/update` - Update application status

## 🎨 Key Features Explained

### Authentication
- JWT-based authentication with HTTP-only cookies
- Role-based access control (Student/Recruiter)
- Protected routes on both frontend and backend

### File Upload
- Cloudinary integration for storing images and resumes
- Profile photos, company logos, and resume uploads
- Secure file handling with Multer

### State Management
- Redux Toolkit for global state
- Redux Persist for data persistence across sessions
- Separate slices for auth, jobs, companies, and applications

### Search & Filter
- Real-time job search
- Filter by location, industry, and salary
- Category-based job browsing

## 🐛 Known Issues & Fixes Applied
- ✅ Fixed job fetching on category selection
- ✅ Fixed typos in JobDescription component
- ✅ Added database seeding script

## 🚀 Deployment Tips

### Backend Deployment (Render/Railway/Heroku)
1. Set environment variables
2. Update CORS origin to your frontend URL
3. Deploy backend first

### Frontend Deployment (Vercel/Netlify)
1. Update API endpoints in `utils/constant.js`
2. Build the project: `npm run build`
3. Deploy the `dist` folder

## 📝 Future Enhancements
- Email notifications
- Advanced search filters
- Job recommendations
- Chat feature between recruiter and applicant
- Payment integration for premium job postings
- Analytics dashboard
- Mobile app version

## 👨‍💻 Author
Created as a placement project demonstrating full-stack development skills.

## 📄 License
This project is open source and available for educational purposes.
