import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterData } from '@/redux/jobSlice'
import { Button } from './ui/button'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "Full Stack Developer",
            "Data Scientist",
            "Machine Learning Engineer",
            "DevOps Engineer",
            "UI/UX Designer",
            "Product Manager",
            "Digital Marketing",
            "Data Analyst"
        ]
    },
    {
        filterType: "Employment Type",
        array: ["Full Time", "Part Time", "Contractor", "Internship"]
    },
    {
        filterType: "Work Mode",
        array: ["Remote", "Hybrid", "On-site"]
    },
    {
        filterType: "Experience",
        array: ["Fresher", "0-2 years", "2-5 years", "5-10 years", "10+ years"]
    }
]

const FilterCard = () => {
    const dispatch = useDispatch();
    const { filterData: currentFilters } = useSelector(store => store.job) || {};
    
    // Local state to manage multiple filter categories
    const [selectedFilters, setSelectedFilters] = useState({
        location: currentFilters?.location || "",
        industry: currentFilters?.industry || "",
        salary: currentFilters?.salary || "",
        workMode: currentFilters?.workMode || "",
        experience: currentFilters?.experience || ""
    });

    const changeHandler = (category, value) => {
        const key = category.toLowerCase().replace(" ", "");
        setSelectedFilters(prev => ({
            ...prev,
            [key]: value
        }));
    }

    const clearFilters = () => {
        const cleared = {
            location: "",
            industry: "",
            salary: "",
            workMode: "",
            experience: ""
        };
        setSelectedFilters(cleared);
    }

    useEffect(() => {
        dispatch(setFilterData(selectedFilters));
    }, [selectedFilters, dispatch]);

    return (
        <div className='w-full bg-white dark:bg-gray-900 p-3 rounded-md shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-lg'>Filter Jobs</h1>
                <Button 
                    variant="link" 
                    size="sm" 
                    onClick={clearFilters}
                    className="text-[#6A38C2] h-auto p-0"
                >
                    Clear All
                </Button>
            </div>
            <hr className='mt-3' />
            <div className='mt-3 space-y-4 max-h-[80vh] overflow-y-auto pr-2 custom-scrollbar'>
                {
                    filterData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-md text-gray-700 dark:text-gray-300 mb-2'>{data.filterType}</h1>
                            <RadioGroup 
                                value={selectedFilters[data.filterType.toLowerCase().replace(" ", "")]} 
                                onValueChange={(value) => changeHandler(data.filterType, value)}
                            >
                                {
                                    data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`
                                        return (
                                            <div key={itemId} className='flex items-center space-x-2 my-1 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-1 rounded transition-colors'>
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label htmlFor={itemId} className="text-sm cursor-pointer w-full">{item}</Label>
                                            </div>
                                        )
                                    })
                                }
                            </RadioGroup>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default FilterCard