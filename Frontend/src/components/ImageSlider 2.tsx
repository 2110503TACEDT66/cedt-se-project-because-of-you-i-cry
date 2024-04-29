'use client'

import Slider from 'react-slick';
import styles from './imageslide.module.css'

import SliderCard from './SliderCard';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ImageSlider({campgroundArray} : {campgroundArray : any}) {
    
      var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 2,
        centerMode: true,
        // centerPadding : "2%"
      };
      return (
        <div className='mt-[5%] w-[100%] h-[300px] flex flex-row overflow-scroll'>
            {campgroundArray.map((campground : any) => (
                <div>
                    <SliderCard key={campground.name} data={campground}/>
                </div>
            ))}
        </div>
        
      );
}