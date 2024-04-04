'use client'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination';
import './navigation.css'
import './pagination.css'

import { CampgroundJson } from '../../interface';
import { CampgroundItem } from '../../interface';


import Card from './Card2';
import { Link } from '@mui/material';



export default function SlidingCard( {campgroundJson}:{campgroundJson:CampgroundJson}) {
  
    return(
      <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={4}
      navigation
      pagination={{
        dynamicBullets: true,
        clickable: true,
        //currentClass: 'pagination',
        //el: '.swiper-pagination-custom'
      }}
    >
      <div className=''>
    {
      
     campgroundJson.data.map((campgroundItem:CampgroundItem)=>(
      <SwiperSlide >
          <Link href={`/campground/${campgroundItem._id}`} className="w-1/5">
          <Card campgroundName={campgroundItem.name} imgSrc={`/img/${campgroundItem.name} CARD.jpg`}></Card>
          </Link>
      </SwiperSlide>
      
     )) 
     
     }
     </div>
      
    </Swiper>
    )
}