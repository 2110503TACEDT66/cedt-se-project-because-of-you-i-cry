'use client'

import Link from "next/link";
import styles from "./provincegrid.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProvinceGrid () {

    const backendurl = process.env.NEXT_PUBLIC_BACKEND_URL

    const [data , setData] = useState<any>(null)
    const [isReady , setReady] = useState(false)
    let newDataArray : any
    useEffect(() => {
        
        fetch(`${backendurl}/api-informations/campgrounds?topProvince=true`).then((res) => res.json())
        .then((tmp) => {
          newDataArray = tmp.topProvinces
        }).then(() => {
            while(newDataArray.length < 5) {
                const index = Math.floor(Math.random() * 76)
                if (!newDataArray.includes(allProvinces[index]))
                    newDataArray.push({province : allProvinces[index]})
            }
            setData(newDataArray)
            setReady(true)
        })

        
    } ,[])
    
    const allProvinces = [
        "Chiang Rai",
        "Chiang Mai",
        "Lamphun",
        "Lampang",
        "Uttaradit",
        "Phrae",
        "Nan",
        "Phayao",
        "Mae Hong Son",
        "Sukhothai",
        "Phitsanulok",
        "Phetchabun",
        "Tak",
        "Kamphaeng Phet",
        "Phichit",
        "Udon Thani",
        "Nong Khai",
        "Nong Bua Lamphu",
        "Loei",
        "Sakon Nakhon",
        "Nakhon Phanom",
        "Mukdahan",
        "Bueng Kan",
        "Khon Kaen",
        "Ubon Ratchathani",
        "Si Sa Ket",
        "Roi Et",
        "Maha Sarakham",
        "Kalasin",
        "Yasothon",
        "Amnat Charoen",
        "Nakhon Ratchasima",
        "Buriram",
        "Surin",
        "Chaiyaphum",
        "Bangkok",
        "Nakhon Pathom",
        "Samut Prakan",
        "Samut Sakhon",
        "Samut Songkhram",
        "Ratchaburi",
        "Kanchanaburi",
        "Suphan Buri",
        "Chai Nat",
        "Lopburi",
        "Sing Buri",
        "Ang Thong",
        "Saraburi",
        "Ayutthaya",
        "Nakorn Sawan",
        "Nonthaburi",
        "Chonburi",
        "Rayong",
        "Chanthaburi",
        "Trat",
        "Sa Kaeo",
        "Prachinburi",
        "Chachoengsao",
        "Nakhon Nayok",
        "Kanchanaburi",
        "Ratchaburi",
        "Phetchaburi",
        "Prachuap Khiri Khan",
        "Chumphon",
        "Ranong",
        "Surat Thani",
        "Nakhon Si Thammarat",
        "Phatthalung",
        "Songkhla",
        "Satun",
        "Yala",
        "Pattani",
        "Narathiwat",
        "Krabi",
        "Phang Nga",
        "Phuket",
        "Trang",
      ]
    
      
    
    return( 
        
        <div data-test="ProvinceGrid" className={styles.ProvinceGridWrapper + " h-[70vh]"} >
            {
                isReady ? <div className="h-[100%]">
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
                    :
                    <div></div>
            }
        </div>
        
        

  );
}
