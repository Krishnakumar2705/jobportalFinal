import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { UploadCloud, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';
import { ANALYZER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import Job from './Job';

const ResumeAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
        } else {
            toast.error("Please upload a valid PDF file");
        }
    };

    const handleAnalyze = async () => {
        if (!file) return toast.error("Please select a resume first");

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post(`${ANALYZER_API_END_POINT}/analyze`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            if (res.data.success) {
                setResult(res.data);
                toast.success("Resume analyzed successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to analyze resume");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
            <Navbar />
            
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Smart ATS Resume Analyzer
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Upload your resume to get an instant ATS score, discover missing skills, 
                        and find live jobs perfectly matched to your profile.
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                        🔒 Privacy First: Your resume is processed in-memory and never saved to our database.
                    </p>
                </div>

                {!result && (
                    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-8">
                        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-10 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer relative">
                            <input 
                                type="file" 
                                accept="application/pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            {file ? (
                                <>
                                    <FileText className="w-12 h-12 text-[#6A38C2] mb-3" />
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{file.name}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </>
                            ) : (
                                <>
                                    <UploadCloud className="w-12 h-12 text-gray-400 mb-3" />
                                    <p className="font-medium text-gray-900 dark:text-gray-100">Click or drag PDF here</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Max file size: 5MB</p>
                                </>
                            )}
                        </div>
                        
                        <Button 
                            onClick={handleAnalyze} 
                            disabled={!file || loading}
                            className="w-full mt-6 bg-[#6A38C2] hover:bg-[#5b30a6] text-white"
                        >
                            {loading ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
                            ) : "Analyze Resume"}
                        </Button>
                    </div>
                )}

                {result && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Score & Skills Section */}
                        <div className="grid md:grid-cols-3 gap-6">
                            {/* Score Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6 flex flex-col items-center justify-center text-center">
                                <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 mb-4">ATS Compatibility Score</h3>
                                <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-8 border-gray-100 dark:border-gray-800">
                                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                        <circle 
                                            cx="60" cy="60" r="56" 
                                            fill="transparent" 
                                            stroke={result.score >= 75 ? "#10b981" : result.score >= 50 ? "#f59e0b" : "#ef4444"} 
                                            strokeWidth="8" 
                                            strokeDasharray="351" 
                                            strokeDashoffset={351 - (351 * result.score) / 100}
                                            className="transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <span className="text-4xl font-bold text-gray-900 dark:text-white">{result.score}%</span>
                                </div>
                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                    {result.score >= 75 ? "Great job! Your resume is highly ATS-friendly." : "Your resume could use some improvements."}
                                </p>
                            </div>

                            {/* Skills Card */}
                            <div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-6">
                                <div className="mb-6">
                                    <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
                                        <CheckCircle className="w-5 h-5 text-green-500" /> Detected Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.detectedSkills.length > 0 ? (
                                            result.detectedSkills.map(skill => (
                                                <Badge key={skill} className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none hover:bg-green-200 uppercase">
                                                    {skill}
                                                </Badge>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">No core technical skills detected.</p>
                                        )}
                                    </div>
                                </div>
                                
                                <hr className="my-4 border-gray-100 dark:border-gray-800" />

                                <div>
                                    <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-3">
                                        <AlertCircle className="w-5 h-5 text-orange-500" /> Missing High-Value Skills
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {result.missingSkills.map(skill => (
                                            <Badge key={skill} variant="outline" className="text-gray-500 border-gray-300 dark:border-gray-700 uppercase">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">Consider adding these if you have experience with them to boost your score.</p>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Jobs */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Top 5 Recommended Jobs</h2>
                                <Button variant="outline" onClick={() => {setResult(null); setFile(null);}}>Analyze Another Resume</Button>
                            </div>
                            
                            {result.recommendedJobs.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {result.recommendedJobs.map(job => (
                                        <Job key={job._id} job={job} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                                    <p className="text-gray-500">We couldn't find exact job matches for your specific skill set at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResumeAnalyzer;
