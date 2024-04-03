import Image from "next/image"
import styles from './bottoninfo.module.css'

export default function BottomInfo() {

    return (

        <div className={styles.menucontainer}>
                <Image src={'/img/logo.png'}
                alt='logo' width={0} height={0} sizes='100vh'/>

                <h2 className="text-white"> Contact </h2>
            
                
        </div>

    )


}