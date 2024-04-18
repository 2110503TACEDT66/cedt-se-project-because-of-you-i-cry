import styles from './provincegrid.module.css'
import Image from 'next/image'

export default function ProvinceGrid ({data} : {data ? : any}) {
    console.log(data)
    return( 
        //src={'/img/province' + data[0].province + '.jpg'}
        <div className={styles.ProvinceGridWrapper}>
            <div className={styles.ProvineGrid}>
                <div className={styles.UpperPart}>
                    <div className={styles.block1 + " " + styles.block}>
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[0].province.replace(' ' , '') + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter1}>
                            <h2>{data[0].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block2 + " " + styles.block}>
                        <Image  fill={true}  alt='province image' sizes='100vh' src={'/img/province/' + data[1].province.replace(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter2}>
                            <h2>{data[1].province}</h2>
                        </div>
                    </div>
                </div>
                <div className={styles.LowerPart}>
                    <div className={styles.block3 + " " + styles.block}>
                        <Image  fill={true}  alt='province image' sizes='100vh' src={'/img/province/' + data[2].province.replace(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter3}>
                            <h2>{data[2].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block4 + " " + styles.block}>
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[3].province.replace(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter4}>
                            <h2>{data[3].province}</h2>
                        </div>
                    </div>
                    <div className={styles.block5 + " " + styles.block}>
                        <Image  fill={true}   alt='province image' sizes='100vh' src={'/img/province/' + data[4].province.replace(' ' , '')  + '.jpg'}/>
                        <div className={styles.Filter + " " + styles.Filter5}>
                            <h2>{data[4].province}</h2>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}