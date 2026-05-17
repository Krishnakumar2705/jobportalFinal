import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { motion } from 'framer-motion'
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
    PieChart, Pie, Cell, Legend 
} from 'recharts'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { Briefcase, Users, CheckCircle, Clock, Loader2 } from 'lucide-react'

const COLORS = ['#6A38C2', '#10B981', '#F59E0B', '#3B82F6', '#EF4444'];

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/stats`, { withCredentials: true });
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className='flex flex-col min-h-screen'>
                <Navbar />
                <div className='flex-1 flex items-center justify-center'>
                    <Loader2 className='h-12 w-12 animate-spin text-[#6A38C2]' />
                </div>
            </div>
        )
    }

    const summaryCards = [
        { title: 'Total Jobs', value: stats?.totalJobs, icon: <Briefcase className='text-purple-600' />, color: 'bg-purple-50' },
        { title: 'Total Applicants', value: stats?.totalApplications, icon: <Users className='text-blue-600' />, color: 'bg-blue-50' },
        { title: 'Shortlisted', value: stats?.statusCounts?.shortlisted, icon: <Clock className='text-orange-600' />, color: 'bg-orange-50' },
        { title: 'Hired', value: stats?.statusCounts?.accepted, icon: <CheckCircle className='text-green-600' />, color: 'bg-green-50' },
    ];

    return (
        <div className='min-h-screen bg-gray-50/50'>
            <Navbar />
            <div className='max-w-7xl mx-auto py-10 px-4'>
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='font-bold text-3xl mb-8 text-gray-800'
                >
                    Recruiter <span className='text-[#6A38C2]'>Analytics</span>
                </motion.h1>

                {/* Summary Cards */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10'>
                    {summaryCards.map((card, index) => (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            key={index} 
                            className='bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between'
                        >
                            <div>
                                <p className='text-sm text-gray-500 font-medium'>{card.title}</p>
                                <h2 className='text-3xl font-bold mt-1'>{card.value || 0}</h2>
                            </div>
                            <div className={`${card.color} p-4 rounded-xl`}>
                                {card.icon}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
                    {/* Bar Chart */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100'
                    >
                        <h2 className='font-bold text-xl mb-6 text-gray-800'>Applications per Job</h2>
                        <div className='h-80'>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats?.jobStats}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                                    <Tooltip 
                                        cursor={{ fill: '#f8f4ff' }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="applications" fill="#6A38C2" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Pie Chart */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className='bg-white p-8 rounded-2xl shadow-sm border border-gray-100'
                    >
                        <h2 className='font-bold text-xl mb-6 text-gray-800'>Application Status</h2>
                        <div className='h-80'>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={stats?.pieData}
                                        innerRadius={80}
                                        outerRadius={120}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {stats?.pieData?.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend verticalAlign="bottom" height={36}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
