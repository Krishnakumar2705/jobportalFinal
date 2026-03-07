import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div>
            <Carousel className="w-[85%] md:w-full max-w-xl mx-auto my-12 md:my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="basis-1/2 md:basis-1/2 lg:basis-1/3 text-center">
                                <Button onClick={() => searchJobHandler(cat)} variant="outline" className="rounded-full text-xs md:text-sm">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <div className='hidden md:block'>
                    <CarouselPrevious />
                    <CarouselNext />
                </div>
            </Carousel>
        </div>
    )
}

export default CategoryCarousel