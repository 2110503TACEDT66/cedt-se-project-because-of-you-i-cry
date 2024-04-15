'use client'

import styles from './imageslide.module.css'

import SliderCard from './SliderCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Mousewheel, Keyboard } from 'swiper/modules';

import 'swiper/css/pagination';
import 'swiper/css';
import 'swiper/css/navigation';


export default function ImageSlider({campgroundArray} : {campgroundArray : any}) {

      const style : any = {
        '--swiper-navigation-color': '#000000',
      }
  
      return (
        <div className={styles.SliderWrapper}>

        <Swiper
        style ={
         style
        }
        slidesPerView={3}
        spaceBetween={0}
        // pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation]}
        loop={true}
        className="mySwiper">


        {campgroundArray.map((campground : any) => (
          <SwiperSlide key={campground.name}>
            <div className='flex items-center justify-center'>
              <SliderCard data={campground}/>
            </div>
          </SwiperSlide>
        ))}


      </Swiper>

            
        </div>
        
      );
}