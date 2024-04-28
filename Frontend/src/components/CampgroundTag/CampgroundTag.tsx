import styles from './campgroundtag.module.css'

export default function CampgroundTag({tagName} : {tagName : string}){
    return(
        <div className={styles.tag}>
            {tagName}
        </div>
    )
}