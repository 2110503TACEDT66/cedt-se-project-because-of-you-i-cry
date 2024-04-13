'use client'
import Image from 'next/image'
import InteractiveCard from './InteractiveCard';
import { useState } from 'react';
import { Rating } from '@mui/material';

export default function Card( {campgroundName, imgSrc, onRating} : {campgroundName:string, imgSrc:string, onRating?:Function}) {

    const [rating, setValue] = useState<number|null>(5)

    return (
        <InteractiveCard >
            <div className='w-full h-[60%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Campground Picture'
                fill={true}
                className='object-cover rounded-t-lg'/>
            </div>
            <div className='w-full h-[20%] p-[10px] text-white flex flex-col text-center font-medium'>
                {campgroundName}
            </div>

            {
            onRating? <div className='w-full h-[20%] p-[10px] text-sky-600 flex flex-col' onClick={(e)=>{e.stopPropagation(); onRating(campgroundName, rating)}}>
            <Rating
                id={campgroundName +' '+'Rating'}
                name={campgroundName +' '+'Rating'}
                data-testid={campgroundName +' '+'Rating'}
                value={rating}
                onChange={(event, newValue) => {
                setValue(newValue);
                onRating(campgroundName, newValue)
                }}/>
            </div> : ''
            }
        </InteractiveCard>
    );
}