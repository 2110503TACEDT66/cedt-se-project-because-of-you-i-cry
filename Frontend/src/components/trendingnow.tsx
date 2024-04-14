'use server'

import ImageSlider from './ImageSlider'
import styles from './trendingnow.module.css'

import Image from 'next/image'


export default async function TrendingNow() {
    const backendurl = process.env.BACKEND_URL
    const allcampgroundData = await (await fetch(`${backendurl}/api-informations/campgrounds?sort=-rating&limit=6`)).json()
    
    return (
        <div className={styles.TrendingSectionWrapper}>
            <div className={styles.HeaderLine}>
                    <div className={styles.line}></div>
                    <div className={styles.HeaderTextWrapper}>Trending Now</div>
                    <div className={styles.line}>
                        <h2 className={styles.FloatingText}>You are on Trend !</h2>
                    </div>
            </div>

           <ImageSlider campgroundArray={allcampgroundData.data}/>


        </div>
    )
}