'use client'

import { useEffect, useState } from 'react'
import ImageSlider from './ImageSlider'
import styles from './trendingnow.module.css'

import Image from 'next/image'


export default function TrendingNow() {

    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL
    const[allcampgroundData , setAllCampgroundData] = useState<any>(null)
    const[isReady , setReady] = useState(false)
    
    useEffect(() => {
        fetch(`${backendurl}/api-informations/campgrounds?sort=-rating`, {method : "GET" , cache : 'no-store'})
        .then((res) => res.json())
        .then((data) => {
          setAllCampgroundData(data)
          setReady(true)
        })
    } , [])
    
    return (

        <div data-test = "TrendingNow" className={styles.TrendingSectionWrapper}>
            <div className={styles.HeaderLine}>
                    <div className={styles.line}></div>
                    <div className={styles.HeaderTextWrapper}>Trending Now</div>
                    <div className={styles.line}>
                        <h2 className={styles.FloatingText}>You are on Trend !</h2>
                    </div>
            </div>

            {
                isReady? <ImageSlider campgroundArray={allcampgroundData.data}/> :  <div></div>
            }
           


        </div>
    )
}