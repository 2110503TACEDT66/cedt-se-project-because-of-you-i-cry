'use client'

import Link from "next/link";
import styles from "./provincegrid.module.css";
import Image from "next/image";

export default function ProvinceGrid ({data} : {data ? : any}) {

    return( 
        <div className={styles.ProvinceGridWrapper}>
            <div className={styles.ProvineGrid}>

                <div className={styles.UpperPart}>
                    <div className={styles.block1 + " " + styles.block} onClick={event => window.location.href = `./campground?province=${data[0].province.replaceAll(' ' , '')}`} >
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[0].province.replaceAll(' ' , '') + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter1}>
                            <h2>{data[0].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block2 + " " + styles.block} onClick={event => window.location.href = `./campground?province=${data[1].province.replaceAll(' ' , '')}`}>
                        <Image  fill={true}  alt='province image' sizes='100vh' src={'/img/province/' + data[1].province.replaceAll(' ' , '')  + '.jpg'} />
                        <div className={styles.Filter + " " + styles.Filter2}>
                            <h2>{data[1].province}</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.LowerPart}>
                    <div className={styles.block3 + " " + styles.block} onClick={event => window.location.href = `./campground?province=${data[2].province.replaceAll(' ' , '')}`}>
                        <Image  fill={true}  alt='province image' sizes='100vh' src={'/img/province/' + data[2].province.replaceAll(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter3}>
                            <h2>{data[2].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block4 + " " + styles.block} onClick={event => window.location.href = `./campground?province=${data[3].province.replaceAll(' ' , '')}`}>
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[3].province.replaceAll(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter4}>
                            <h2>{data[3].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block5 + " " + styles.block} onClick={event => window.location.href = `./campground?province=${data[4].province.replaceAll(' ' , '')}`}>
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[4].province.replaceAll(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter5}>
                            <h2>{data[4].province}</h2>
                        </div>
                    </div>
                </div>
                </div>
                </div>

  );
}
