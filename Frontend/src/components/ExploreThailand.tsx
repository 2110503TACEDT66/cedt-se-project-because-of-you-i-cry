import styles from './explorethailand.module.css'
import ProvinceGrid from './ProvinceGrid'
export default async function ExploreThailand() {
    const backendurl = process.env.BACKEND_URL
    const topProvince = await (await fetch(`${backendurl}/api-informations/campgrounds?topProvince=true`)).json()

    return (
        <div className={styles.ExploreThailandSectionWrapper}>      
            <div className={styles.HeaderLine}>
                    <div className={styles.line}>
                        <h2 className={styles.FloatingText}>Immerse Yourself in Thailand: Explore Beyond Expectations</h2>
                    </div>
                    <div className={styles.HeaderTextWrapper}>Explore Thailand</div>
                    <div className={styles.line}> 
                    </div>
            </div>

            <ProvinceGrid data = {topProvince.topProvinces}/>

        </div>
    )
}