import styles from './provincegrid.module.css'

export default function ProvinceGrid ({data} : {data ? : any}) {
    return(
        <div className={styles.ProvinceGridWrapper}>
            <div className={styles.ProvineGrid}>
                <div className={styles.UpperPart}>
                    <div className={styles.block1 + " " + styles.block}></div>
                    <div className={styles.block2 + " " + styles.block}></div>
                </div>
                <div className={styles.LowerPart}>
                    <div className={styles.block3 + " " + styles.block}></div>
                    <div className={styles.block4 + " " + styles.block}></div>
                    <div className={styles.block5 + " " + styles.block}></div>
                </div>
                
            </div>
        </div>
    )
}